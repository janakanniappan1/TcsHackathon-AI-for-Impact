import uuid
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Request
from typing import Optional

from app.detectors.lynote_image import LynoteImageDetector
from app.detectors.aegis_video import AegisVideoDetector
from app.detectors.fast_detect_gpt import FastDetectGPTTextDetector
from app.detectors.c2pa_provenance import C2PAProvenanceVerifier
from app.models.schemas import AnalysisResultResponse, WorkerHealthResponse, WorkerInfo

router = APIRouter(prefix="/media", tags=["Media Authenticity"])

@router.get("/health", response_model=WorkerHealthResponse)
async def media_health_check():
    """
    Returns actual worker status for all 4 detection engines.
    Status reflects real model initialization state, not static values.
    """
    lynote_status = LynoteImageDetector.get_status()
    c2pa_status = C2PAProvenanceVerifier.get_status()
    aegis_status = AegisVideoDetector.get_status()
    fast_detect_status = FastDetectGPTTextDetector.get_status()

    # System status is READY/ONLINE if at least one operational worker is ready
    system_status = "ONLINE" if any(s == "READY" for s in [lynote_status, c2pa_status]) else "DEGRADED"

    return {
        "status": system_status,
        "workers": {
            "LYNOTE_IMAGE": WorkerInfo(
                name="Lynote AI Image Detector",
                status=lynote_status,
                version=LynoteImageDetector.MODEL_VERSION,
                model_name=LynoteImageDetector.MODEL_NAME,
                capabilities=["univfd_clip_vit_l14", "diffusion_detection", "gan_detection"],
                error=LynoteImageDetector._init_error
            ),
            "AEGIS_VIDEO": WorkerInfo(
                name="AEGIS Video Detector",
                status=aegis_status,
                version=AegisVideoDetector.MODEL_VERSION,
                model_name=AegisVideoDetector.MODEL_NAME,
                capabilities=["spatiotemporal_consistency", "optical_flow"],
                error="Model weights pending integration"
            ),
            "C2PA_PROVENANCE": WorkerInfo(
                name="C2PA Provenance Verification",
                status=c2pa_status,
                version=C2PAProvenanceVerifier.MODEL_VERSION,
                model_name=C2PAProvenanceVerifier.MODEL_NAME,
                capabilities=["jumbf_manifest", "x509_verification", "assertion_lineage"],
                error=None
            ),
            "FAST_DETECT_GPT_TEXT": WorkerInfo(
                name="Fast-DetectGPT Text Detector",
                status=fast_detect_status,
                version=FastDetectGPTTextDetector.MODEL_VERSION,
                model_name=FastDetectGPTTextDetector.MODEL_NAME,
                capabilities=["conditional_probability_curvature"],
                error="Scoring language model weights pending integration"
            ),
        }
    }

# Image Detection Endpoints (both standard and legacy paths)
@router.post("/analyze/image", response_model=AnalysisResultResponse)
@router.post("/lynote", response_model=AnalysisResultResponse)
async def analyze_image_endpoint(file: UploadFile = File(...)):
    """
    Execute Lynote AI UnivFD (ViT-L-14) detection on uploaded image.
    """
    content = await file.read()
    if not content or len(content) == 0:
        raise HTTPException(status_code=400, detail="Empty file payload received.")
    return LynoteImageDetector.analyze(content, file.filename or "image.jpg")


# Video Detection Endpoints
@router.post("/analyze/video", response_model=AnalysisResultResponse)
@router.post("/aegis", response_model=AnalysisResultResponse)
async def analyze_video_endpoint(file: UploadFile = File(...)):
    """
    Analyze video container and return honest status for AEGIS detector.
    """
    content = await file.read()
    if not content or len(content) == 0:
        raise HTTPException(status_code=400, detail="Empty file payload received.")
    return AegisVideoDetector.analyze(content, file.filename or "video.mp4")


# Text Detection Endpoints
@router.post("/analyze/text", response_model=AnalysisResultResponse)
@router.post("/fast-detect-gpt", response_model=AnalysisResultResponse)
async def analyze_text_endpoint(request: Request):
    """
    Analyze text input and return honest status for Fast-DetectGPT.
    """
    target_text = ""
    content_type = request.headers.get("content-type", "")

    if "application/json" in content_type:
        try:
            data = await request.json()
            target_text = data.get("text", "")
        except Exception:
            pass
    elif "form" in content_type:
        try:
            form = await request.form()
            target_text = str(form.get("text", ""))
        except Exception:
            pass
    else:
        raw = await request.body()
        target_text = raw.decode("utf-8", errors="ignore")

    if not target_text or not target_text.strip():
        raise HTTPException(status_code=400, detail="No text provided for analysis.")

    return FastDetectGPTTextDetector.analyze(target_text)


# Provenance Verification Endpoints
@router.post("/analyze/provenance", response_model=AnalysisResultResponse)
@router.post("/c2pa", response_model=AnalysisResultResponse)
async def verify_provenance_endpoint(file: UploadFile = File(...)):
    """
    Parse Content Credentials and verify cryptographic X.509 provenance signatures via official C2PA SDK.
    """
    content = await file.read()
    if not content or len(content) == 0:
        raise HTTPException(status_code=400, detail="Empty file payload received.")
    return C2PAProvenanceVerifier.verify(content, file.filename or "file.jpg")
