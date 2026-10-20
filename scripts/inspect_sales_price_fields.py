
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw"
OUT = ROOT / "data" / "processed"

KEYS = ["date", "item_id", "store_id"]

comparison_file = OUT / "price_sales_comparison.csv"

if not comparison_file.exists():
    raise FileNotFoundError(
        f"Missing {comparison_file}. "
        "Run inspect_price_conflicts.py first."
    )

print("Loading existing comparison samples...", flush=True)

keys_df = pd.read_csv(
    comparison_file,
    usecols=KEYS,
    dtype={"item_id": "string"},
)

keys_df["date"] = pd.to_datetime(
    keys_df["date"], errors="coerce"
)

wanted = set(
    keys_df[KEYS].drop_duplicates().itertuples(
        index=False, name=None
    )
)

print(f"Sample keys to inspect: {len(wanted):,}", flush=True)

matches = []

for i, chunk in enumerate(
    pd.read_csv(
        RAW / "sales.csv",
        usecols=KEYS + ["quantity", "price_base", "sum_total"],
        dtype={"item_id": "string"},
        chunksize=500_000,
    ),
    start=1,
):
    chunk["date"] = pd.to_datetime(
        chunk["date"], errors="coerce"
    )

    chunk_keys = pd.MultiIndex.from_frame(chunk[KEYS])
    wanted_index = pd.MultiIndex.from_tuples(
        list(wanted), names=KEYS
    )

    rows = chunk.loc[chunk_keys.isin(wanted_index)].copy()

    if not rows.empty:
        matches.append(rows)

    print(f"Scanned sales chunk {i}.", flush=True)

if not matches:
    print("No matching sales transactions found.")
    raise SystemExit(0)

sales = pd.concat(matches, ignore_index=True)

for col in ["quantity", "price_base", "sum_total"]:
    sales[col] = pd.to_numeric(sales[col], errors="coerce")

sales["total_divided_by_quantity"] = sales["sum_total"].div(
    sales["quantity"].where(sales["quantity"].ne(0))
)

print("\n=== MATCHING TRANSACTIONS ===")
print(
    sales[
        KEYS + [
            "quantity",
            "price_base",
            "sum_total",
            "total_divided_by_quantity",
        ]
    ].head(80).to_string(index=False)
)

print("\n=== PRICE FIELD COMPARISON ===")
print(
    sales[
        ["price_base", "total_divided_by_quantity"]
    ].describe()
)

output = OUT / "sales_price_field_samples.csv"
sales.to_csv(output, index=False)
print(f"\nSaved: {output}")
