
from pathlib import Path

import pandas as pd


PROJECT_ROOT = Path(__file__).resolve().parents[3]
RAW_DIR = PROJECT_ROOT / "data" / "raw"

SALES_COLUMNS = {
    "date",
    "item_id",
    "quantity",
    "price_base",
    "sum_total",
    "store_id",
}


def load_sales_data() -> pd.DataFrame:
    """Load and validate the sales dataset."""

    file_path = RAW_DIR / "sales.csv"

    if not file_path.exists():
        raise FileNotFoundError(
            f"Sales dataset not found: {file_path}"
        )

    df = pd.read_csv(
        file_path,
        usecols=lambda column: column != "Unnamed: 0",
    )

    missing_columns = SALES_COLUMNS - set(df.columns)

    if missing_columns:
        raise ValueError(
            f"Missing required columns: {sorted(missing_columns)}"
        )

    df["date"] = pd.to_datetime(
        df["date"],
        errors="coerce",
    )

    if df["date"].isna().any():
        raise ValueError(
            "Sales dataset contains invalid or missing dates."
        )

    if df["item_id"].isna().any():
        raise ValueError(
            "Sales dataset contains missing item IDs."
        )

    if df["store_id"].isna().any():
        raise ValueError(
            "Sales dataset contains missing store IDs."
        )

    return df


if __name__ == "__main__":
    sales_df = load_sales_data()

    print("Sales data loaded successfully.")
    print("Shape:", sales_df.shape)
    print("Columns:", sales_df.columns.tolist())
    print("\nSample:")
    print(sales_df.head())
