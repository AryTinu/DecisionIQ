
from pathlib import Path
from collections import Counter

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]

DEMAND_FILE = ROOT / "data" / "processed" / "daily_demand.csv"
CATALOG_FILE = ROOT / "data" / "raw" / "catalog.csv"
OUTPUT_FILE = ROOT / "data" / "processed" / "unmatched_products.csv"


def main():
    catalog = pd.read_csv(
        CATALOG_FILE,
        usecols=["item_id"],
        dtype={"item_id": "string"},
    )

    catalog_ids = set(catalog["item_id"].dropna())

    counts = Counter()
    total_unmatched_rows = 0

    for chunk in pd.read_csv(
        DEMAND_FILE,
        usecols=["item_id"],
        dtype={"item_id": "string"},
        chunksize=300_000,
    ):
        missing = chunk.loc[
            ~chunk["item_id"].isin(catalog_ids),
            "item_id",
        ]

        counts.update(missing.value_counts().to_dict())
        total_unmatched_rows += len(missing)

    result = pd.DataFrame(
        [
            {"item_id": item_id, "demand_rows": count}
            for item_id, count in counts.items()
        ]
    )

    if not result.empty:
        result = result.sort_values(
            "demand_rows", ascending=False
        )

    result.to_csv(OUTPUT_FILE, index=False)

    print(f"Catalog product IDs: {len(catalog_ids):,}")
    print(f"Unmatched demand rows: {total_unmatched_rows:,}")
    print(f"Unique unmatched product IDs: {len(result):,}")
    print("\nTop 20 unmatched product IDs:")
    print(result.head(20).to_string(index=False))
    print(f"\nFull audit saved to: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
