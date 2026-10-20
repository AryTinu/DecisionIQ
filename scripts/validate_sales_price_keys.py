
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw"
PROCESSED = ROOT / "data" / "processed"

sales_file = RAW / "sales.csv"
demand_file = PROCESSED / "daily_demand.csv"

KEYS = ["date", "item_id", "store_id"]

print("Loading processed demand keys...", flush=True)

demand = pd.read_csv(
    demand_file,
    usecols=KEYS,
    dtype={"item_id": "string"},
)
demand["date"] = pd.to_datetime(demand["date"], errors="coerce")

demand_keys = pd.MultiIndex.from_frame(demand[KEYS])

print(f"Demand rows: {len(demand):,}")
print(f"Unique demand keys: {demand_keys.nunique():,}")
print(f"Duplicate demand keys: {demand_keys.duplicated().sum():,}")

print("\nScanning sales source...", flush=True)

seen = set()
duplicate_rows = 0
matched_rows = 0
missing_in_demand = 0
invalid_price_rows = 0
zero_price_rows = 0
negative_price_rows = 0
price_count = 0
ratio_differences = []

for number, chunk in enumerate(
    pd.read_csv(
        sales_file,
        usecols=KEYS + ["quantity", "price_base", "sum_total"],
        dtype={"item_id": "string"},
        chunksize=500_000,
    ),
    start=1,
):
    chunk["date"] = pd.to_datetime(chunk["date"], errors="coerce")

    keys = pd.MultiIndex.from_frame(chunk[KEYS])
    duplicate_rows += keys.duplicated().sum()

    # Count duplicate keys across chunks too.
    for key in keys:
        if key in seen:
            duplicate_rows += 1
        else:
            seen.add(key)

    matched = keys.isin(demand_keys)
    matched_rows += int(matched.sum())
    missing_in_demand += int((~matched).sum())

    price = pd.to_numeric(chunk["price_base"], errors="coerce")
    quantity = pd.to_numeric(chunk["quantity"], errors="coerce")
    total = pd.to_numeric(chunk["sum_total"], errors="coerce")

    invalid_price_rows += int(price.isna().sum())
    zero_price_rows += int(price.eq(0).sum())
    negative_price_rows += int(price.lt(0).sum())

    valid = (
        quantity.notna()
        & total.notna()
        & price.notna()
        & quantity.ne(0)
    )

    # Keep only compact aggregate statistics, not every row.
    difference = (total[valid] / quantity[valid] - price[valid]).abs()
    ratio_differences.append(difference.describe())

    price_count += int(valid.sum())

    print(f"Scanned sales chunk {number}.", flush=True)

print("\n=== VALIDATION RESULTS ===")
print(f"Sales rows: {sum(1 for _ in []) if False else len(seen):,} unique keys observed")
print(f"Duplicate source-key occurrences: {duplicate_rows:,}")
print(f"Sales rows matching demand keys: {matched_rows:,}")
print(f"Sales rows missing from demand keys: {missing_in_demand:,}")
print(f"Missing/non-numeric price_base: {invalid_price_rows:,}")
print(f"Zero price_base: {zero_price_rows:,}")
print(f"Negative price_base: {negative_price_rows:,}")
print(f"Rows with usable quantity/total/price: {price_count:,}")

if ratio_differences:
    combined = pd.concat(ratio_differences, ignore_index=True)
    print("\nAbsolute difference: sum_total / quantity vs price_base")
    print(combined.describe(percentiles=[0.5, 0.95, 0.99]))
