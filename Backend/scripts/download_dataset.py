
from pathlib import Path
import shutil
import kagglehub

# Correct dataset from Kaggle
dataset_id = "svizor/retail-sales-forecasting-data"

download_path = Path(
    kagglehub.dataset_download(dataset_id)
)

print("Downloaded from:", download_path)

# Copy all dataset files into DecisionIQ
project_root = Path(__file__).resolve().parent.parent
raw_dir = project_root / "data" / "raw"
raw_dir.mkdir(parents=True, exist_ok=True)

for source in download_path.rglob("*"):
    if source.is_file():
        destination = raw_dir / source.relative_to(download_path)
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, destination)
        print("Copied:", destination.name)

print("\nDataset download and copy completed.")
