import os
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

## Remeber to add api settings here and cros setup

class Settings(BaseSettings) :

    # Resolves needed paths, Regardless where script is running 
    PROJECT_ROOT : Path = Path(__file__).resolve().parent.parent  # Added to identify root of project (DecsionIq)  
    BASE_DIR : Path = PROJECT_ROOT / "Backend"  # Added to have backend base (Backend)

    # App config for Metadatas

    APP_NAME : str = "DscisionIQ" 
    DEBUG : bool = True

    # Further changes are need for the .env setup when needed 

    


settings = Settings()

