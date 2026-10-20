
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw"
OUT = ROOT / "data" / "processed"
OUT.mkdir(parents=True, exist_ok=True)

KEYS = ["date", "item_id", "store_id"]

print("1/5 Loading price history...", flush=True)

prices = pd.read_csv(
    RAW / "price_history.csv",
    usecols=KEYS + ["price", "code"],
    dtype={"item_id": "string", "code": "string"},
)

prices["date"] = pd.to_datetime(prices["date"], errors="coerce")
prices["price"] = pd.to_numeric(prices["price"], errors="coerce")

print(f"Loaded {len(prices):,} price records.", flush=True)

print("2/5 Finding conflicting keys...", flush=True)

# Count distinct prices per date-product-store without Python lambdas.
key_price_counts = (
    prices.groupby(KEYS, observed=True)["price"]
    .nunique()
    .rename("distinct_prices")
    .reset_index()
)

conflicts = key_price_counts[
    key_price_counts["distinct_prices"] > 1
].copy()

print(f"Keys with multiple prices: {len(conflicts):,}", flush=True)

# Sample a small number of conflicting keys.
sample_keys = conflicts.nlargest(30, "distinct_prices")[KEYS].copy()

# Include the largest price records for investigation.
extreme_keys = (
    prices.nlargest(10, "price")[KEYS]
    .drop_duplicates()
)

sample_keys = pd.concat(
    [sample_keys, extreme_keys],
    ignore_index=True,
).drop_duplicates()

print(f"Selected {len(sample_keys):,} keys.", flush=True)

print("3/5 Extracting price-history examples...", flush=True)

price_samples = prices.merge(
    sample_keys, on=KEYS, how="inner"
)

price_samples.sort_values(KEYS).to_csv(
    OUT / "price_conflict_history_samples.csv",
    index=False,
)

print(
    price_samples.head(40).to_string(index=False),
    flush=True,
)

print("4/5 Scanning sales in chunks...", flush=True)

# Use a set for quick membership checks instead of repeatedly merging
# the entire key table into every sales chunk.
sample_key_set = set(
    sample_keys.itertuples(index=False, name=None)
)

sales_results = []

for chunk_number, chunk in enumerate(
    pd.read_csv(
        RAW / "sales.csv",
        usecols=KEYS + ["price_base", "quantity"],
        dtype={"item_id": "string"},
        chunksize=500_000,
    ),
    start=1,
):
    chunk["date"] = pd.to_datetime(chunk["date"], errors="coerce")

    # Restrict matching to the small sample.
    chunk_keys = pd.MultiIndex.from_frame(chunk[KEYS])
    wanted = pd.MultiIndex.from_tuples(
        list(sample_key_set), names=KEYS
    )

    matched = chunk.loc[chunk_keys.isin(wanted)].copy()

    if not matched.empty:
        sales_results.append(matched)

    print(f"  Scanned sales chunk {chunk_number}.", flush=True)

if sales_results:
    sales = pd.concat(sales_results, ignore_index=True)
    sales["price_base"] = pd.to_numeric(
        sales["price_base"], errors="coerce"
    )

    sales_summary = (
        sales.groupby(KEYS, observed=True)
        .agg(
            sales_rows=("price_base", "size"),
            sales_distinct_prices=("price_base", "nunique"),
            sales_min_price=("price_base", "min"),
            sales_median_price=("price_base", "median"),
            sales_max_price=("price_base", "max"),
        )
        .reset_index()
    )
else:
    sales_summary = pd.DataFrame(
        columns=KEYS + [
            "sales_rows",
            "sales_distinct_prices",
            "sales_min_price",
            "sales_median_price",
            "sales_max_price",
        ]
    )

print("5/5 Saving comparison...", flush=True)

comparison = price_samples.merge(
    sales_summary, on=KEYS, how="left"
)

comparison.to_csv(
    OUT / "price_sales_comparison.csv",
    index=False,
)

print("\n=== PRICE HISTORY SAMPLES ===")
print(price_samples.head(25).to_string(index=False))

print("\n=== PRICE VS SALES ===")
print(
    comparison[
        KEYS + [
            "price", "code", "sales_rows",
            "sales_min_price", "sales_median_price",
            "sales_max_price",
        ]
    ].head(40).to_string(index=False)
)

print("\nSaved files:")
print(OUT / "price_conflict_history_samples.csv")
print(OUT / "price_sales_comparison.csv")
