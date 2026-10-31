import time
import io
import json
import uuid
from typing import Dict, Any, List, Optional
import c2pa

class C2PAProvenanceVerifier:
    """
    Official C2PA Provenance Verification Engine:
    Validates Coalition for Content Provenance and Authenticity (C2PA) cryptographic
    manifests, assertion lineage, and X.509 signature validity using the official C2PA Python SDK.
    """
    MODEL_NAME = f"C2PA SDK (c2pa-python v{getattr(c2pa, '__version__', '0.38.0')})"
    MODEL_VERSION = getattr(c2pa, "__version__", "0.38.0")

    @classmethod
    def get_status(cls) -> str:
        return "READY"

    @classmethod
    def verify(cls, file_bytes: bytes, filename: str) -> Dict[str, Any]:
        analysis_id = str(uuid.uuid4())
        start_time = time.perf_counter()
        findings: List[str] = []

        if not file_bytes or len(file_bytes) == 0:
            processing_time = round((time.perf_counter() - start_time) * 1000, 2)
            return {
                "analysis_id": analysis_id,
                "worker_name": "C2PA Provenance Verification",
                "worker_status": "ERROR",
                "model_name": cls.MODEL_NAME,
                "model_version": cls.MODEL_VERSION,
                "verdict": "INCONCLUSIVE",
                "confidence": None,
                "confidenceScore": None,
                "detector": "C2PA Provenance Verification",
                "model": cls.MODEL_NAME,
                "findings": ["Empty payload received; cannot extract provenance manifest."],
                "processing_time": processing_time,
                "latencyMs": int(processing_time),
                "c2paDetails": {"isSigned": False, "signatureStatus": "INVALID"},
                "limitations": ["No asset bytes provided."],
                "error": "Empty file bytes."
            }

        reader = None
        try:
            # Official SDK Reader try_create factory
            stream = io.BytesIO(file_bytes)
            reader = c2pa.Reader.try_create(stream=stream)

            processing_time = round((time.perf_counter() - start_time) * 1000, 2)

            if reader is None:
                findings.append("No embedded C2PA/JUMBF Content Credentials container detected in file.")
                findings.append("Media is unsigned consumer capture; lacks cryptographic chain-of-custody.")
                return {
                    "analysis_id": analysis_id,
                    "worker_name": "C2PA Provenance Verification",
                    "worker_status": "READY",
                    "model_name": cls.MODEL_NAME,
                    "model_version": cls.MODEL_VERSION,
                    "verdict": "INCONCLUSIVE",
                    "confidence": None,
                    "confidenceScore": None,
                    "detector": "C2PA Provenance Verification",
                    "model": cls.MODEL_NAME,
                    "findings": findings,
                    "processing_time": processing_time,
                    "latencyMs": int(processing_time),
                    "c2paDetails": {
                        "isSigned": False,
                        "signatureStatus": "MISSING",
                    },
                    "reliabilityImpact": "Unsigned media: Requires neural forensic analysis to verify visual integrity.",
                    "limitations": [
                        "Absence of C2PA manifest does not prove manipulation, as many consumer cameras do not yet sign media."
                    ],
                    "error": None
                }

            # Parse authentic manifest
            manifest_json_str = reader.json()
            manifest_store = json.loads(manifest_json_str) if manifest_json_str else {}
            active_manifest = reader.get_active_manifest() or {}

            claim_generator = active_manifest.get("claim_generator", "Unknown C2PA Generator")
            title = active_manifest.get("title", filename)
            signature_info = active_manifest.get("signature_info", {})
            issuer = signature_info.get("issuer", "Unknown Certificate Issuer")
            signing_time = signature_info.get("time", active_manifest.get("format", "N/A"))
            assertions = active_manifest.get("assertions", [])
            actions = []
            for assertion in assertions:
                if assertion.get("label") == "c2pa.actions":
                    actions_data = assertion.get("data", {}).get("actions", [])
                    actions.extend([a.get("action", "") for a in actions_data if "action" in a])

            validation_status = active_manifest.get("validation_status", [])
            is_valid_sig = len(validation_status) == 0 or all(
                s.get("code") in ("signingCredential.trusted", "claimSignature.validated") 
                for s in validation_status
            )

            if is_valid_sig:
                findings.append(f"Cryptographic manifest verified unbroken by {claim_generator}.")
                findings.append(f"Signed by certificate: {issuer}.")
                if actions:
                    findings.append(f"Recorded edit actions in manifest: {', '.join(actions)}.")
                verdict = "AUTHENTIC"
                confidence = 1.0
                reliability_impact = "Cryptographically authenticated provenance: Unbroken X.509 signature chain."
            else:
                findings.append(f"Manifest validation warnings/errors: {validation_status}")
                verdict = "SYNTHETIC_MANIPULATED"
                confidence = 0.90
                reliability_impact = "Cryptographic signature validation failure: Possible container tampering."

            return {
                "analysis_id": analysis_id,
                "worker_name": "C2PA Provenance Verification",
                "worker_status": "READY",
                "model_name": cls.MODEL_NAME,
                "model_version": cls.MODEL_VERSION,
                "verdict": verdict,
                "confidence": confidence,
                "confidenceScore": confidence,
                "detector": "C2PA Provenance Verification",
                "model": cls.MODEL_NAME,
                "findings": findings,
                "processing_time": processing_time,
                "latencyMs": int(processing_time),
                "c2paDetails": {
                    "isSigned": True,
                    "claimGenerator": claim_generator,
                    "issuer": issuer,
                    "signingTime": signing_time,
                    "signatureStatus": "VALID" if is_valid_sig else "INVALID",
                    "editActions": actions,
                    "manifestTitle": title,
                },
                "reliabilityImpact": reliability_impact,
                "limitations": [
                    "Cryptographic signing proves publisher authenticity at the time of signing, not necessarily physical truth."
                ],
                "error": None
            }

        except Exception as exc:
            processing_time = round((time.perf_counter() - start_time) * 1000, 2)
            return {
                "analysis_id": analysis_id,
                "worker_name": "C2PA Provenance Verification",
                "worker_status": "ERROR",
                "model_name": cls.MODEL_NAME,
                "model_version": cls.MODEL_VERSION,
                "verdict": "INCONCLUSIVE",
                "confidence": None,
                "confidenceScore": None,
                "detector": "C2PA Provenance Verification",
                "model": cls.MODEL_NAME,
                "findings": [f"C2PA SDK manifest parser encountered an error: {str(exc)}"],
                "processing_time": processing_time,
                "latencyMs": int(processing_time),
                "c2paDetails": {"isSigned": False, "signatureStatus": "ERROR"},
                "limitations": ["C2PA parsing error."],
                "error": str(exc)
            }
        finally:
            if reader is not None:
                try:
                    reader.close()
                except Exception:
                    pass
