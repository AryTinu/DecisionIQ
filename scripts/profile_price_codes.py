
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
INPUT = ROOT / "data" / "raw" / "price_history.csv"
OUTPUT = ROOT / "data" / "processed"

OUTPUT.mkdir(parents=True, exist_ok=True)

df = pd.read_csv(
    INPUT,
    usecols=["date", "item_id", "price", "code", "store_id"],
    dtype={"item_id": "string", "code": "string"},
)

df["date"] = pd.to_datetime(df["date"], errors="coerce")
df["price"] = pd.to_numeric(df["price"], errors="coerce")

print("\n=== OVERALL PRICE PROFILE ===")
print(f"Rows: {len(df):,}")
print(f"Date range: {df['date'].min()} to {df['date'].max()}")
print(f"Missing codes: {df['code'].isna().sum():,}")
print(f"Missing prices: {df['price'].isna().sum():,}")
print(f"Zero prices: {df['price'].eq(0).sum():,}")
print(f"Negative prices: {df['price'].lt(0).sum():,}")

print("\n=== PRICE DISTRIBUTION ===")
print(df["price"].describe(
    percentiles=[0.01, 0.25, 0.50, 0.75, 0.95, 0.99, 0.999]
))

print("\n=== PROFILE BY CODE ===")
profile = (
    df.groupby("code", dropna=False)
    .agg(
        rows=("price", "size"),
        unique_products=("item_id", "nunique"),
        unique_stores=("store_id", "nunique"),
        unique_prices=("price", "nunique"),
        zero_prices=("price", lambda s: s.eq(0).sum()),
        missing_prices=("price", lambda s: s.isna().sum()),
        min_price=("price", "min"),
        median_price=("price", "median"),
        p95_price=("price", lambda s: s.quantile(0.95)),
        max_price=("price", "max"),
    )
    .sort_values("rows", ascending=False)
)

print(profile.to_string())
profile.to_csv(OUTPUT / "price_code_profile.csv")

print("\n=== 20 LARGEST PRICE RECORDS ===")
print(
    df.nlargest(20, "price")[
        ["date", "item_id", "store_id", "price", "code"]
    ].to_string(index=False)
)

print("\n=== PRICE ROWS BY YEAR ===")
print(df.groupby(df["date"].dt.year).size().to_string())

print("\n=== OUTPUT ===")
print(f"Saved code profile to: {OUTPUT / 'price_code_profile.csv'}")
