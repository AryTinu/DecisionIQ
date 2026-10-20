
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw"
PROCESSED = ROOT / "data" / "processed"

unmatched_df = pd.read_csv(
    PROCESSED / "unmatched_products.csv",
    dtype={"item_id": "string"},
)

unmatched_ids = set(unmatched_df["item_id"].dropna().str.strip())

sources = [
    "price_history.csv",
    "discounts_history.csv",
    "markdowns.csv",
    "online.csv",
    "actual_matrix.csv",
]


def normalize_ids(values):
    return values.dropna().str.strip()


# Check whether simple whitespace differences explain any misses.
catalog = pd.read_csv(
    RAW / "catalog.csv",
    usecols=["item_id"],
    dtype={"item_id": "string"},
)

catalog_ids = set(normalize_ids(catalog["item_id"]))

print("UNMATCHED PRODUCT COVERAGE")
print(f"Unique unmatched IDs: {len(unmatched_ids):,}")
print(
    "IDs matched after trimming whitespace:",
    len(unmatched_ids & catalog_ids),
    "of",
    len(unmatched_ids),
)

for filename in sources:
    path = RAW / filename

    found_ids = set()
    matching_rows = 0

    for chunk in pd.read_csv(
        path,
        usecols=["item_id"],
        dtype={"item_id": "string"},
        chunksize=300_000,
    ):
        ids = normalize_ids(chunk["item_id"])
        mask = ids.isin(unmatched_ids)

        matching_rows += int(mask.sum())
        found_ids.update(ids[mask].unique())

    print(f"\n{filename}")
    print(f"  Unmatched IDs found: {len(found_ids):,}")
    print(f"  Matching source rows: {matching_rows:,}")

    if found_ids:
        print("  Examples:", sorted(found_ids)[:10])
