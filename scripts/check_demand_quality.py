
from pathlib import Path
import pandas as pd

PROJECT_ROOT = Path(__file__).resolve().parent.parent

SALES_PATH = PROJECT_ROOT / "data" / "raw" / "sales.csv"
DEMAND_PATH = PROJECT_ROOT / "data" / "processed" / "daily_demand.csv"


# 1. Inspect negative and zero sales quantities

negative_count = 0
zero_count = 0
total_rows = 0
negative_samples = []

for chunk in pd.read_csv(
    SALES_PATH,
    usecols=["date", "item_id", "quantity", "store_id"],
    chunksize=500_000,
):
    total_rows += len(chunk)

    negative = chunk[chunk["quantity"] < 0]
    negative_count += len(negative)

    zero_count += (chunk["quantity"] == 0).sum()

    if len(negative_samples) < 10 and not negative.empty:
        remaining = 10 - len(negative_samples)

        negative_samples.extend(
            negative.head(remaining).to_dict("records")
        )

print("=" * 60)
print("SALES QUALITY CHECK")
print("=" * 60)

print("Total sales rows:", total_rows)
print("Negative quantity rows:", negative_count)
print("Zero quantity rows:", zero_count)

print("\nSample negative records:")

if negative_samples:
    print(pd.DataFrame(negative_samples).to_string(index=False))
else:
    print("No negative quantities found.")


# 2. Inspect date coverage in processed demand

df = pd.read_csv(
    DEMAND_PATH,
    usecols=["date", "item_id", "store_id"],
    parse_dates=["date"],
)

print("\n" + "=" * 60)
print("DATE COVERAGE")
print("=" * 60)

print("Overall date range:", df["date"].min(), "to", df["date"].max())
print("Distinct dates:", df["date"].nunique())
print("Total processed rows:", len(df))


# 3. Check product-store observation coverage

coverage = (
    df.groupby(["item_id", "store_id"])["date"]
    .agg(["min", "max", "nunique"])
    .reset_index()
)

coverage.columns = [
    "item_id",
    "store_id",
    "first_date",
    "last_date",
    "observed_days",
]

coverage = coverage.sort_values(
    "observed_days",
    ascending=False,
)

print("\n" + "=" * 60)
print("PRODUCT-STORE COVERAGE")
print("=" * 60)

print("\nProduct-store combinations with the most observed dates:")

print(
    coverage.head(10).to_string(index=False)
)

# 4. Calculate the number of calendar days in each observed range

coverage["calendar_days"] = (
    coverage["last_date"] - coverage["first_date"]
).dt.days + 1

coverage["days_without_records_in_range"] = (
    coverage["calendar_days"] - coverage["observed_days"]
)

print("\nDate-gap summary for the 10 most-observed combinations:")

print(
    coverage[
        [
            "item_id",
            "store_id",
            "observed_days",
            "calendar_days",
            "days_without_records_in_range",
        ]
    ]
    .head(10)
    .to_string(index=False)
)

print("\nQuality checks completed.")


# 5. Overall product-store coverage summary

print("\n" + "=" * 60)
print("OVERALL COVERAGE SUMMARY")
print("=" * 60)

print("Total product-store combinations:", len(coverage))

print(
    "Combinations with no date gaps:",
    (coverage["days_without_records_in_range"] == 0).sum(),
)

print(
    "Combinations with date gaps:",
    (coverage["days_without_records_in_range"] > 0).sum(),
)

print("\nObserved days per combination:")
print(coverage["observed_days"].describe())
