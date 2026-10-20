
from pathlib import Path

import pandas as pd

from src.decisioniq.data_pipeline.File_loader import load_sales_data


def aggregate_daily_demand(
    sales_df: pd.DataFrame,
) -> pd.DataFrame:
    """Aggregate daily sales while preserving negative quantities."""

    required_columns = {
        "date",
        "item_id",
        "store_id",
        "quantity",
    }

    missing = required_columns - set(sales_df.columns)

    if missing:
        raise ValueError(
            f"Missing required columns: {sorted(missing)}"
        )

    df = sales_df.copy()

    df["date"] = pd.to_datetime(df["date"], errors="raise")
    df["quantity"] = pd.to_numeric(
        df["quantity"], errors="raise"
    )

    # Separate positive, negative, and zero quantities.
    # Do not discard negative or zero transactions.
    df["gross_sales_quantity"] = df["quantity"].clip(lower=0)
    df["negative_quantity"] = df["quantity"].clip(upper=0)

    df["is_negative_transaction"] = df["quantity"] < 0
    df["is_zero_transaction"] = df["quantity"] == 0

    daily_demand = (
        df.groupby(
            ["date", "item_id", "store_id"],
            as_index=False,
        )
        .agg(
            demand=("quantity", "sum"),
            gross_sales_quantity=("gross_sales_quantity", "sum"),
            negative_quantity=("negative_quantity", "sum"),
            negative_transaction_count=(
                "is_negative_transaction", "sum"
            ),
            zero_transaction_count=(
                "is_zero_transaction", "sum"
            ),
            transaction_count=("quantity", "size"),
        )
        .sort_values(
            ["item_id", "store_id", "date"]
        )
        .reset_index(drop=True)
    )

    return daily_demand


if __name__ == "__main__":
    sales_df = load_sales_data()
    daily_demand = aggregate_daily_demand(sales_df)

    print("Original sales rows:", len(sales_df))
    print("Daily demand rows:", len(daily_demand))

    print(
        "Rows with negative net demand:",
        (daily_demand["demand"] < 0).sum(),
    )

    print(
        "Rows containing negative transactions:",
        (daily_demand["negative_transaction_count"] > 0).sum(),
    )

    print(
        "Rows containing zero transactions:",
        (daily_demand["zero_transaction_count"] > 0).sum(),
    )

    print("\nSample aggregated data:")
    print(daily_demand.head(10).to_string(index=False))

    project_root = Path(__file__).resolve().parents[3]

    output_path = (
        project_root
        / "data"
        / "processed"
        / "daily_demand.csv"
    )

    output_path.parent.mkdir(parents=True, exist_ok=True)
    daily_demand.to_csv(output_path, index=False)

    print("\nSaved to:", output_path)
