import os
from typing import List

class Settings:
    PROJECT_NAME: str = "SENTINEL Media Authenticity Backend"
    VERSION: str = "1.1.0"
    API_PREFIX: str = "/api"
    
    # Server configuration
    HOST: str = os.getenv("SENTINEL_HOST", "127.0.0.1")
    PORT: int = int(os.getenv("SENTINEL_PORT", "8000"))
    
    # CORS Origins: strictly bound to frontend origins (no wildcards with credentials)
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]
    
    # Upload limits (Security guardrails)
    MAX_IMAGE_SIZE_BYTES: int = int(os.getenv("MAX_IMAGE_SIZE_BYTES", str(25 * 1024 * 1024))) # 25 MB
    MAX_VIDEO_SIZE_BYTES: int = int(os.getenv("MAX_VIDEO_SIZE_BYTES", str(100 * 1024 * 1024))) # 100 MB
    MAX_TEXT_LENGTH: int = int(os.getenv("MAX_TEXT_LENGTH", "15000")) # 15,000 characters
    MIN_TEXT_LENGTH: int = int(os.getenv("MIN_TEXT_LENGTH", "5"))

    # Model Weights Paths (Empty means not loaded / unavailable)
    LYNOTE_WEIGHTS_PATH: str = os.getenv("LYNOTE_WEIGHTS_PATH", "")
    AEGIS_WEIGHTS_PATH: str = os.getenv("AEGIS_WEIGHTS_PATH", "")
    FAST_DETECT_GPT_MODEL_NAME: str = os.getenv("FAST_DETECT_GPT_MODEL_NAME", "")

settings = Settings()
