from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class AnalysisResultResponse(BaseModel):
    analysis_id: Optional[str] = None
    worker_name: Optional[str] = None
    worker_status: Optional[str] = None
    model_name: Optional[str] = None
    model_version: Optional[str] = None
    verdict: str
    confidence: Optional[float] = None
    confidenceScore: Optional[float] = None  # Backward compatibility
    detector: Optional[str] = None
    model: Optional[str] = None
    findings: List[str] = []
    processing_time: Optional[float] = None
    latencyMs: Optional[int] = None
    technicalDetails: Optional[Dict[str, Any]] = None
    c2paDetails: Optional[Dict[str, Any]] = None
    reliabilityImpact: Optional[str] = None
    limitations: Optional[List[str]] = None
    error: Optional[str] = None

class TextAnalysisRequest(BaseModel):
    text: str

class WorkerInfo(BaseModel):
    name: str
    status: str
    version: Optional[str] = None
    model_name: Optional[str] = None
    capabilities: List[str] = []
    error: Optional[str] = None

class WorkerHealthResponse(BaseModel):
    status: str
    workers: Dict[str, WorkerInfo]
