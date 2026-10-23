import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent

# 依次尝试加载 partjava-ai/.env 与项目根目录 .env.local / .env
load_dotenv(BASE_DIR / ".env")
load_dotenv(PROJECT_ROOT / ".env.local")
load_dotenv(PROJECT_ROOT / ".env")


class Settings:
    DEEPSEEK_API_KEY: str = os.getenv("DEEPSEEK_API_KEY", "") or os.getenv("AI_API_KEY", "")
    DEEPSEEK_BASE_URL: str = os.getenv("DEEPSEEK_BASE_URL", "https://api.deepseek.com/v1").rstrip("/")
    DEEPSEEK_MODEL_FLASH: str = os.getenv("DEEPSEEK_MODEL_FLASH", "deepseek-flash")
    DEEPSEEK_MODEL_PRO: str = os.getenv("DEEPSEEK_MODEL_PRO", "deepseek-v4-pro")
    DEEPSEEK_SEARCH_URL: str = os.getenv(
        "DEEPSEEK_SEARCH_URL", "https://api.deepseek.com/v1/tools/search"
    )
    DEEPSEEK_FETCH_URL: str = os.getenv(
        "DEEPSEEK_FETCH_URL", "https://api.deepseek.com/v1/tools/fetch"
    )
    PORT: int = int(os.getenv("PORT", "8000"))
    NAVIGATION_TS_PATH: Path = PROJECT_ROOT / "app" / "_shared" / "data" / "navigation.ts"


settings = Settings()
