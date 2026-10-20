
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw"
OUT = ROOT / "data" / "processed"
OUT.mkdir(parents=True, exist_ok=True)

SOURCE = RAW / "sales.csv"
DESTINATION = OUT / "transaction_price_features.csv"

columns = [
    "date",
    "item_id",
    "store_id",
    "price_base",
    "sum_total",
    "quantity",
]

total_rows = 0
zero_prices = 0
negative_prices = 0
missing_prices = 0

print("Building transaction-price feature table...", flush=True)

with DESTINATION.open("w", encoding="utf-8", newline="") as output_file:
    first_chunk = True

    for number, chunk in enumerate(
        pd.read_csv(
            SOURCE,
            usecols=columns,
            dtype={"item_id": "string"},
            chunksize=500_000,
        ),
        start=1,
    ):
        chunk["date"] = pd.to_datetime(
            chunk["date"], errors="coerce"
        ).dt.strftime("%Y-%m-%d")

        chunk["price_base"] = pd.to_numeric(
            chunk["price_base"], errors="coerce"
        )
        chunk["sum_total"] = pd.to_numeric(
            chunk["sum_total"], errors="coerce"
        )
        chunk["quantity"] = pd.to_numeric(
            chunk["quantity"], errors="coerce"
        )

        zero_prices += int(chunk["price_base"].eq(0).sum())
        negative_prices += int(chunk["price_base"].lt(0).sum())
        missing_prices += int(chunk["price_base"].isna().sum())

        # Keep original values; flags allow later investigation.
        chunk["price_is_zero"] = chunk["price_base"].eq(0)
        chunk["price_is_negative"] = chunk["price_base"].lt(0)

        chunk.to_csv(
            output_file,
            index=False,
            header=first_chunk,
        )

        first_chunk = False
        total_rows += len(chunk)

        print(
            f"Processed chunk {number}; "
            f"rows written: {total_rows:,}",
            flush=True,
        )

print("\n=== FEATURE TABLE SUMMARY ===")
print(f"Rows written: {total_rows:,}")
print(f"Zero prices: {zero_prices:,}")
print(f"Negative prices: {negative_prices:,}")
print(f"Missing prices: {missing_prices:,}")
print(f"Output: {DESTINATION}")
