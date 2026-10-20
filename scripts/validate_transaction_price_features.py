
from pathlib import Path
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
FILE = ROOT / "data" / "processed" / "transaction_price_features.csv"

print("Validating transaction-price feature table...")

df = pd.read_csv(
    FILE,
    usecols=[
        "date",
        "item_id",
        "store_id",
        "price_base",
        "sum_total",
        "quantity",
        "price_is_zero",
        "price_is_negative",
    ],
    dtype={
        "item_id": "string",
        "store_id": "string",
    },
)

keys = ["date", "item_id", "store_id"]

print("\n=== VALIDATION SUMMARY ===")
print("Rows:", len(df))
print("Columns:", df.columns.tolist())
print("Date range:", df["date"].min(), "to", df["date"].max())
print("Unique dates:", df["date"].nunique())
print("Unique products:", df["item_id"].nunique())
print("Unique stores:", df["store_id"].nunique())
print("Duplicate keys:", df.duplicated(keys).sum())
print("Missing key values:", df[keys].isna().sum().sum())
print("Missing price values:", df["price_base"].isna().sum())
print("Zero-price flags:", (df["price_is_zero"] == 1).sum())
print("Negative-price flags:", (df["price_is_negative"] == 1).sum())

print("\nSample records:")
print(df.head(5).to_string(index=False))

if len(df) != 7_432_685:
    print("\nWARNING: Row count differs from the expected sales count.")

if df.duplicated(keys).any():
    print("\nWARNING: Duplicate date-item-store keys detected.")

if df[keys].isna().any().any():
    print("\nWARNING: Missing key values detected.")

print("\nValidation finished.")
