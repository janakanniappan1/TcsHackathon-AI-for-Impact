import io
from typing import Tuple
from PIL import Image, UnidentifiedImageError
from fastapi import HTTPException

# Allowed MIME types and Magic Bytes
IMAGE_SIGNATURES = {
    b"\xff\xd8\xff": "image/jpeg",
    b"\x89PNG\r\n\x1a\n": "image/png",
    b"RIFF": "image/webp",  # RIFF....WEBP
    b"GIF87a": "image/gif",
    b"GIF89a": "image/gif",
    b"BM": "image/bmp",
}

VIDEO_SIGNATURES = [
    b"ftyp",  # MP4, MOV container brand box
    b"\x1a\x45\xdf\xa3",  # EBML (WebM, MKV)
    b"RIFF",  # AVI
]

MAX_IMAGE_SIZE_BYTES = 25 * 1024 * 1024  # 25 MB
MAX_VIDEO_SIZE_BYTES = 100 * 1024 * 1024  # 100 MB
MAX_TEXT_CHAR_LENGTH = 15000

def validate_image_file(content: bytes, filename: str = "") -> Image.Image:
    """
    Validates uploaded image bytes:
    - Non-empty check
    - File size check
    - Magic byte signature check
    - Structural decoding integrity via PIL
    Returns opened PIL Image.
    Raises HTTPException(400) on invalid or corrupt input.
    """
    if not content or len(content) == 0:
        raise HTTPException(status_code=400, detail="Empty image payload received.")
    
    if len(content) > MAX_IMAGE_SIZE_BYTES:
        raise HTTPException(
            status_code=400, 
            detail=f"Image file exceeds maximum allowable size of {MAX_IMAGE_SIZE_BYTES // (1024 * 1024)}MB."
        )

    # Magic byte check
    is_valid_magic = any(content.startswith(sig) for sig in IMAGE_SIGNATURES.keys())
    # Special check for WebP (RIFF + WEBP at offset 8)
    if content.startswith(b"RIFF") and len(content) >= 12:
        is_valid_magic = content[8:12] == b"WEBP" or content[8:12] == b"AVI "

    if not is_valid_magic:
        raise HTTPException(
            status_code=400, 
            detail="Unsupported or invalid image file signature. Allowed formats: JPEG, PNG, WebP, BMP, GIF."
        )

    # PIL Structural Decode Verification
    try:
        # First verify container integrity
        verify_stream = io.BytesIO(content)
        img_verify = Image.open(verify_stream)
        img_verify.verify()

        # Reopen for actual processing (verify closes stream in PIL)
        read_stream = io.BytesIO(content)
        img = Image.open(read_stream)
        # Load pixel data to confirm not truncated
        img.load()
        return img
    except (UnidentifiedImageError, OSError, SyntaxError) as exc:
        raise HTTPException(
            status_code=400, 
            detail=f"Corrupted or indecodable image file: {str(exc)}"
        ) from exc


def validate_video_file(content: bytes, filename: str = "") -> dict:
    """
    Validates uploaded video bytes:
    - Non-empty check
    - File size check
    - Container box signature check (MP4/MOV ftyp, WebM/MKV EBML, AVI)
    """
    if not content or len(content) == 0:
        raise HTTPException(status_code=400, detail="Empty video payload received.")
    
    if len(content) > MAX_VIDEO_SIZE_BYTES:
        raise HTTPException(
            status_code=400, 
            detail=f"Video file exceeds maximum allowable size of {MAX_VIDEO_SIZE_BYTES // (1024 * 1024)}MB."
        )

    # Look for common container signatures in the first 256 bytes
    header = content[:256]
    has_signature = (
        b"ftyp" in header or
        header.startswith(b"\x1a\x45\xdf\xa3") or
        (header.startswith(b"RIFF") and b"AVI " in header[:16])
    )

    if not has_signature:
        raise HTTPException(
            status_code=400, 
            detail="Invalid video container format. Supported containers: MP4, WebM, MOV, AVI."
        )

    return {
        "fileSizeBytes": len(content),
        "containerHeaderVerified": True,
    }


def validate_text_input(text: str) -> str:
    """
    Validates text input for linguistic analysis:
    - Non-empty check
    - Length check
    """
    if not text or not text.strip():
        raise HTTPException(status_code=400, detail="Empty text input provided.")
    
    cleaned = text.strip()
    if len(cleaned) > MAX_TEXT_CHAR_LENGTH:
        raise HTTPException(
            status_code=400, 
            detail=f"Text exceeds maximum character limit of {MAX_TEXT_CHAR_LENGTH} characters."
        )
    return cleaned

