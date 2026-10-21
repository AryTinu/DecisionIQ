
from pathlib import Path
import pandas as pd

PROJECT_ROOT = Path(__file__).resolve().parent.parent
file_path = PROJECT_ROOT / "data" / "processed" / "daily_demand.csv"

df = pd.read_csv(file_path, parse_dates=["date"])

print("Total aggregated rows:", len(df))
print("Date range:", df["date"].min(), "to", df["date"].max())
print("Unique products:", df["item_id"].nunique())
print("Unique stores:", df["store_id"].nunique())

print("\nDemand statistics:")
print(df["demand"].describe())

print("\nDuplicate date-item-store combinations:",
      df.duplicated(["date", "item_id", "store_id"]).sum())

print("\nMissing values:")
print(df.isnull().sum())

print("\nTotal demand by store:")
print(df.groupby("store_id")["demand"].sum().sort_values(ascending=False))
