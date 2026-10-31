import threading
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes.media import router as media_router
from app.detectors.lynote_image import LynoteImageDetector

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="SENTINEL Autonomous Disaster Intelligence - Media Authenticity Neural Detection Service",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Enable CORS for React + Vite Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(media_router, prefix=settings.API_PREFIX)

@app.on_event("startup")
async def startup_event():
    """
    Load detection models in a background daemon thread during startup
    so the FastAPI server is immediately responsive to health checks.
    """
    threading.Thread(target=LynoteImageDetector.initialize, daemon=True).start()

@app.get("/")
async def root():
    return {
        "system": "SENTINEL Disaster Intelligence API",
        "service": "Media Authenticity Service",
        "status": "OPERATIONAL",
        "docs": "/docs",
        "health": "/api/media/health",
    }
