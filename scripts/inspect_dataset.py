
from pathlib import Path
import pandas as pd

PROJECT_ROOT = Path(__file__).resolve().parent.parent
RAW_DIR = PROJECT_ROOT / "data" / "raw"

for file_path in sorted(RAW_DIR.glob("*.csv")):
    print(f"\n{'=' * 65}")
    print(f"FILE: {file_path.name}")
    print("=" * 65)

    df = pd.read_csv(file_path, nrows=5)

    print("Columns:", df.columns.tolist())
    print("Sample rows:")
    print(df.to_string(index=False))

    # Get the full row count without loading the whole file
    with file_path.open("rb") as f:
        row_count = sum(1 for _ in f) - 1

    print("Total rows:", row_count)
