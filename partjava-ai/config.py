import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent
PARTJAVADATA_SECRETS = PROJECT_ROOT.parent / "partjavadata" / "secrets"

# 优先从 partjavadata/secrets/ 统一密钥仓库加载 API Key
load_dotenv(PARTJAVADATA_SECRETS / "partjava-ai.env")
load_dotenv(PARTJAVADATA_SECRETS / ".env.local")
load_dotenv(PARTJAVADATA_SECRETS / ".env.production")
# 兼容本地及服务器根目录由 restore.sh 恢复的 .env.local / .env.production
load_dotenv(PROJECT_ROOT / ".env.local")
load_dotenv(PROJECT_ROOT / ".env.production")


class Settings:
    DEEPSEEK_API_KEY: str = (
        os.getenv("DEEPSEEK_API_KEY", "") or os.getenv("AI_API_KEY", "")
    )
    DEEPSEEK_BASE_URL: str = os.getenv(
        "DEEPSEEK_BASE_URL", "https://api.deepseek.com/v1"
    ).rstrip("/")
    DEEPSEEK_MODEL_FLASH: str = os.getenv("DEEPSEEK_MODEL_FLASH", "deepseek-flash")
    DEEPSEEK_MODEL_PRO: str = os.getenv("DEEPSEEK_MODEL_PRO", "deepseek-v4-pro")
    DEEPSEEK_SEARCH_URL: str = os.getenv(
        "DEEPSEEK_SEARCH_URL", "https://api.deepseek.com/v1/tools/search"
    )
    DEEPSEEK_FETCH_URL: str = os.getenv(
        "DEEPSEEK_FETCH_URL", "https://api.deepseek.com/v1/tools/fetch"
    )
    PORT: int = int(os.getenv("PORT", "8000"))
    NAVIGATION_TS_PATH: Path = (
        PROJECT_ROOT / "app" / "_shared" / "data" / "navigation.ts"
    )


settings = Settings()
