
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
FILE = ROOT / "data" / "raw" / "price_history.csv"

df = pd.read_csv(
    FILE,
    usecols=["date", "item_id", "store_id", "price", "code"],
    dtype={"item_id": "string", "store_id": "string"},
)

keys = ["date", "item_id", "store_id"]

duplicate_rows = df[df.duplicated(keys, keep=False)]
duplicate_groups = (
    duplicate_rows.groupby(keys)
    .agg(
        row_count=("price", "size"),
        distinct_prices=("price", "nunique"),
        distinct_codes=("code", "nunique"),
        prices=("price", lambda s: list(s.unique())[:5]),
        codes=("code", lambda s: list(s.unique())[:5]),
    )
    .reset_index()
)

print("PRICE HISTORY AUDIT")
print(f"Total rows: {len(df):,}")
print(f"Duplicate-key rows: {len(duplicate_rows):,}")
print(f"Duplicate-key groups: {len(duplicate_groups):,}")
print(
    "Groups with multiple prices:",
    int((duplicate_groups["distinct_prices"] > 1).sum()),
)
print(
    "Groups with multiple codes:",
    int((duplicate_groups["distinct_codes"] > 1).sum()),
)
print(f"Exact duplicate rows: {int(df.duplicated().sum()):,}")

print("\nPRICE DISTRIBUTION")
print(df["price"].describe(percentiles=[0.01, 0.5, 0.95, 0.99]))
print(f"\nZero-price rows: {(df['price'] == 0).sum():,}")
print(f"Negative-price rows: {(df['price'] < 0).sum():,}")

print("\nMOST COMMON CODES")
print(df["code"].value_counts(dropna=False).head(15).to_string())

print("\nEXAMPLES OF DUPLICATE KEY GROUPS")
print(duplicate_groups.head(20).to_string(index=False))

print("\nSAVED AUDIT")
out = ROOT / "data" / "processed" / "price_history_duplicate_groups.csv"
duplicate_groups.to_csv(out, index=False)
print(out)
