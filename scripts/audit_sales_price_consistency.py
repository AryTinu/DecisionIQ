
from pathlib import Path

import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw"
OUT = ROOT / "data" / "processed"
OUT.mkdir(parents=True, exist_ok=True)

differences = []
examples = []
total_rows = 0
valid_rows = 0
zero_quantity_rows = 0
zero_price_rows = 0
negative_price_rows = 0

print("Auditing transaction price consistency...", flush=True)

for number, chunk in enumerate(
    pd.read_csv(
        RAW / "sales.csv",
        usecols=["date", "item_id", "store_id",
                 "quantity", "price_base", "sum_total"],
        dtype={"item_id": "string"},
        chunksize=500_000,
    ),
    start=1,
):
    total_rows += len(chunk)

    quantity = pd.to_numeric(chunk["quantity"], errors="coerce")
    price = pd.to_numeric(chunk["price_base"], errors="coerce")
    total = pd.to_numeric(chunk["sum_total"], errors="coerce")

    zero_quantity_rows += int(quantity.eq(0).sum())
    zero_price_rows += int(price.eq(0).sum())
    negative_price_rows += int(price.lt(0).sum())

    valid = (
        quantity.notna()
        & total.notna()
        & price.notna()
        & quantity.ne(0)
    )

    ratio = total[valid] / quantity[valid]
    diff = (ratio - price[valid]).abs()

    valid_rows += len(diff)
    differences.append(diff.to_numpy())

    # Keep a small sample of material discrepancies for investigation.
    bad = diff[diff > 0.05].head(10).index
    if len(bad):
        sample = chunk.loc[
            bad, ["date", "item_id", "store_id",
                  "quantity", "price_base", "sum_total"]
        ].copy()
        sample["absolute_difference"] = diff.loc[bad]
        examples.append(sample)

    print(f"Scanned chunk {number}.", flush=True)

all_diffs = np.concatenate(differences)

print("\n=== OVERALL PRICE CONSISTENCY ===")
print(f"Total sales rows: {total_rows:,}")
print(f"Rows used in ratio check: {valid_rows:,}")
print(f"Rows with zero quantity: {zero_quantity_rows:,}")
print(f"Rows with zero price_base: {zero_price_rows:,}")
print(f"Rows with negative price_base: {negative_price_rows:,}")
print(f"Mean absolute difference: {all_diffs.mean():.6f}")
print(f"Median absolute difference: {np.median(all_diffs):.6f}")
print(f"95th percentile difference: {np.quantile(all_diffs, 0.95):.6f}")
print(f"99th percentile difference: {np.quantile(all_diffs, 0.99):.6f}")
print(f"Maximum difference: {all_diffs.max():.6f}")
print(f"Rows differing by more than 0.05: {(all_diffs > 0.05).sum():,}")
print(f"Rows differing by more than 1.00: {(all_diffs > 1.00).sum():,}")

if examples:
    sample_df = pd.concat(examples, ignore_index=True)
    path = OUT / "sales_price_consistency_examples.csv"
    sample_df.to_csv(path, index=False)
    print(f"\nSaved discrepancy examples to: {path}")
    print(sample_df.head(20).to_string(index=False))
