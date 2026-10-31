import os
import io
import pytest
from fastapi.testclient import TestClient
from PIL import Image

from app.main import app

client = TestClient(app)

FIXTURES_DIR = os.path.join(os.path.dirname(__file__), "fixtures")
HUMAN_IMAGE_PATH = os.path.join(FIXTURES_DIR, "human.jpeg")
AI_IMAGE_PATH = os.path.join(FIXTURES_DIR, "ai-generated.png")


def test_health_check_returns_honest_statuses():
    """
    Health check must return actual worker statuses,
    reflecting real model state without static fabricated ONLINE strings.
    """
    response = client.get("/api/media/health")
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert "workers" in data

    workers = data["workers"]
    assert "LYNOTE_IMAGE" in workers
    assert "C2PA_PROVENANCE" in workers
    assert "AEGIS_VIDEO" in workers
    assert "FAST_DETECT_GPT_TEXT" in workers

    # Unintegrated workers must report UNAVAILABLE
    assert workers["AEGIS_VIDEO"]["status"] == "UNAVAILABLE"
    assert workers["FAST_DETECT_GPT_TEXT"]["status"] == "UNAVAILABLE"

    # C2PA SDK is installed and ready
    assert workers["C2PA_PROVENANCE"]["status"] == "READY"


def test_image_analysis_empty_file():
    """Empty payload must return HTTP 400 Bad Request."""
    response = client.post(
        "/api/media/analyze/image",
        files={"file": ("empty.jpg", b"", "image/jpeg")}
    )
    assert response.status_code == 400
    assert "Empty" in response.json()["detail"]


def test_image_analysis_corrupted_file():
    """Corrupted bytes with jpeg extension must return HTTP 400."""
    response = client.post(
        "/api/media/analyze/image",
        files={"file": ("corrupt.jpg", b"NOT_A_REAL_JPEG_IMAGE_HEADER", "image/jpeg")}
    )
    assert response.status_code == 400


def test_image_analysis_unsupported_format():
    """Unsupported format (e.g. text or audio) must return HTTP 400."""
    response = client.post(
        "/api/media/analyze/image",
        files={"file": ("test.txt", b"plain text payload disguised as image", "text/plain")}
    )
    assert response.status_code == 400


def test_image_analysis_oversized_file():
    """Files exceeding maximum allowed size (25MB) must return HTTP 400."""
    large_payload = b"\xff\xd8\xff\xe0" + (b"\x00" * (26 * 1024 * 1024))
    response = client.post(
        "/api/media/analyze/image",
        files={"file": ("huge.jpg", large_payload, "image/jpeg")}
    )
    assert response.status_code == 400
    assert "exceeds" in response.json()["detail"].lower()


def test_image_analysis_valid_fixtures():
    """
    Valid image fixtures must produce structured response
    with analysis_id, worker_name, verdict, and genuine model details.
    """
    if os.path.exists(HUMAN_IMAGE_PATH):
        with open(HUMAN_IMAGE_PATH, "rb") as f:
            content = f.read()
        response = client.post(
            "/api/media/analyze/image",
            files={"file": ("human.jpeg", content, "image/jpeg")}
        )
        assert response.status_code == 200
        data = response.json()
        assert "analysis_id" in data
        assert "worker_name" in data
        assert "verdict" in data
        assert "processing_time" in data
        assert "limitations" in data

    if os.path.exists(AI_IMAGE_PATH):
        with open(AI_IMAGE_PATH, "rb") as f:
            content = f.read()
        response = client.post(
            "/api/media/analyze/image",
            files={"file": ("ai-generated.png", content, "image/png")}
        )
        assert response.status_code == 200
        data = response.json()
        assert "analysis_id" in data
        assert "verdict" in data


def test_c2pa_provenance_unsigned_image():
    """
    Standard unsigned image must return INCONCLUSIVE verdict with MISSING signature status,
    not fake government attestation.
    """
    img = Image.new("RGB", (64, 64), color="red")
    buf = io.BytesIO()
    img.save(buf, format="JPEG")
    content = buf.getvalue()

    response = client.post(
        "/api/media/c2pa",
        files={"file": ("unsigned_photo.jpg", content, "image/jpeg")}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["verdict"] == "INCONCLUSIVE"
    assert data["c2paDetails"]["signatureStatus"] == "MISSING"
    assert data["confidence"] is None


def test_video_analysis_empty_file():
    """Empty video payload must return HTTP 400."""
    response = client.post(
        "/api/media/analyze/video",
        files={"file": ("empty.mp4", b"", "video/mp4")}
    )
    assert response.status_code == 400


def test_video_analysis_invalid_container():
    """Invalid video container must return HTTP 400."""
    response = client.post(
        "/api/media/analyze/video",
        files={"file": ("invalid.mp4", b"NOT_A_VALID_MP4_CONTAINER", "video/mp4")}
    )
    assert response.status_code == 400


def test_video_analysis_honest_unavailable_worker():
    """Valid video container with unintegrated worker must return honest UNAVAILABLE."""
    # Construct minimal MP4 header: 4 bytes length + 'ftyp'
    valid_mp4_header = b"\x00\x00\x00\x20ftypisom\x00\x00\x02\x00isomiso2mp41" + (b"\x00" * 128)
    response = client.post(
        "/api/media/analyze/video",
        files={"file": ("valid_container.mp4", valid_mp4_header, "video/mp4")}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["worker_status"] == "UNAVAILABLE"
    assert data["verdict"] == "UNAVAILABLE"
    assert data["confidence"] is None


def test_text_analysis_empty():
    """Empty text must return HTTP 400."""
    response = client.post(
        "/api/media/analyze/text",
        json={"text": "   "}
    )
    assert response.status_code == 400


def test_text_analysis_honest_unavailable_worker():
    """Valid text with unintegrated worker must return honest UNAVAILABLE."""
    response = client.post(
        "/api/media/analyze/text",
        json={"text": "Emergency report: Water level rising at Sector 4 bridge."}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["worker_status"] == "UNAVAILABLE"
    assert data["verdict"] == "UNAVAILABLE"
    assert data["confidence"] is None

