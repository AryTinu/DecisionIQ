
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]

DEMAND_FILE = ROOT / "data" / "processed" / "daily_demand.csv"
CATALOG_FILE = ROOT / "data" / "raw" / "catalog.csv"
STORES_FILE = ROOT / "data" / "raw" / "stores.csv"
OUTPUT_FILE = ROOT / "data" / "processed" / "demand_enriched.csv"

CATALOG_COLUMNS = [
    "item_id",
    "dept_name",
    "class_name",
    "subclass_name",
    "item_type",
    "weight_volume",
    "weight_netto",
    "fatness",
]

STORE_COLUMNS = [
    "store_id",
    "division",
    "format",
    "city",
    "area",
]


def load_lookup(path, columns, key):
    lookup = pd.read_csv(
        path,
        usecols=columns,
        dtype={key: "string"},
    )

    if lookup[key].isna().any():
        raise ValueError(f"Missing values in lookup key: {key}")

    duplicates = lookup[key].duplicated(keep=False)

    if duplicates.any():
        examples = lookup.loc[duplicates, key].head(10).tolist()
        raise ValueError(
            f"{path.name} has duplicate {key} values. "
            f"Examples: {examples}. Resolve these before joining."
        )

    print(f"{path.name}: {len(lookup):,} unique lookup records")
    return lookup


def main():
    if not DEMAND_FILE.exists():
        raise FileNotFoundError(DEMAND_FILE)

    catalog = load_lookup(
        CATALOG_FILE,
        CATALOG_COLUMNS,
        "item_id",
    )

    stores = load_lookup(
        STORES_FILE,
        STORE_COLUMNS,
        "store_id",
    )

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

    if OUTPUT_FILE.exists():
        OUTPUT_FILE.unlink()

    total_rows = 0
    unmatched_products = 0
    unmatched_stores = 0
    first_chunk = True

    for chunk in pd.read_csv(
        DEMAND_FILE,
        dtype={
            "item_id": "string",
            "store_id": "string",
        },
        chunksize=300_000,
    ):
        original_rows = len(chunk)

        chunk = chunk.merge(
            catalog,
            on="item_id",
            how="left",
            validate="many_to_one",
            indicator="_product_match",
        )

        unmatched_products += (
            chunk["_product_match"] == "left_only"
        ).sum()

        chunk = chunk.drop(columns="_product_match")

        chunk = chunk.merge(
            stores,
            on="store_id",
            how="left",
            validate="many_to_one",
            indicator="_store_match",
        )

        unmatched_stores += (
            chunk["_store_match"] == "left_only"
        ).sum()

        chunk = chunk.drop(columns="_store_match")

        if len(chunk) != original_rows:
            raise RuntimeError(
                "Join changed the number of demand records."
            )

        chunk.to_csv(
            OUTPUT_FILE,
            mode="w" if first_chunk else "a",
            header=first_chunk,
            index=False,
        )

        total_rows += len(chunk)
        first_chunk = False

        print(f"Processed {total_rows:,} demand records")

    print("\nREFERENCE DATA INTEGRATION SUMMARY")
    print(f"Output: {OUTPUT_FILE}")
    print(f"Demand rows processed: {total_rows:,}")
    print(f"Unmatched product rows: {unmatched_products:,}")
    print(f"Unmatched store rows: {unmatched_stores:,}")

    if unmatched_products or unmatched_stores:
        print(
            "WARNING: Investigate unmatched keys before "
            "using the enriched dataset for modeling."
        )
    else:
        print("All product and store keys matched.")


if __name__ == "__main__":
    main()
