import { 
  BackendWorkerInfo, 
  MediaAnalysisReport, 
  DetectorId,
  MediaCategory,
  AuthenticityVerdict
} from '../types/mediaAuthenticity';
import { serviceConfig } from './api.config';

// Registered backend worker definitions
export const INITIAL_WORKERS: BackendWorkerInfo[] = [
  {
    id: 'LYNOTE_IMAGE',
    name: 'Lynote AI Image Detector',
    category: 'IMAGE',
    modelEngine: 'Lynote UnivFD (OpenCLIP ViT-L-14)',
    endpoint: serviceConfig.mediaWorkers.lynoteEndpoint,
    status: 'OFFLINE',
    statusMessage: 'Connecting to Lynote neural worker on Python backend (port 8000)...',
    version: 'univfd-vit-l-14-v1.0',
    description: 'Detects diffusion artifacts, frequency domain anomalies, and GAN synthesis in disaster imagery.',
  },
  {
    id: 'AEGIS_VIDEO',
    name: 'AEGIS Video Detector',
    category: 'VIDEO',
    modelEngine: 'AEGIS Spatiotemporal Video Consistency Engine',
    endpoint: serviceConfig.mediaWorkers.aegisEndpoint,
    status: 'UNAVAILABLE',
    statusMessage: 'Spatiotemporal video model weights pending integration.',
    version: 'v1.8.2-pending',
    description: 'Analyzes optical flow jitter, inter-frame temporal discontinuities, and synthetic flood/fire simulation video.',
  },
  {
    id: 'C2PA_PROVENANCE',
    name: 'C2PA Provenance Verification',
    category: 'PROVENANCE',
    modelEngine: 'C2PA Python SDK (c2pa-python)',
    endpoint: serviceConfig.mediaWorkers.c2paEndpoint,
    status: 'ONLINE',
    statusMessage: 'Official C2PA SDK parser active for X.509 cryptographic validation.',
    version: 'v0.38.0',
    description: 'Validates hardware-signed Content Credentials, camera cryptographic signatures, and edit lineage.',
  },
  {
    id: 'FAST_DETECT_GPT_TEXT',
    name: 'Fast-DetectGPT Text Detector',
    category: 'TEXT',
    modelEngine: 'Fast-DetectGPT Conditional Probability Curvature',
    endpoint: serviceConfig.mediaWorkers.fastDetectGptEndpoint,
    status: 'UNAVAILABLE',
    statusMessage: 'Scoring language model weights pending integration.',
    version: 'v0.9.1-pending',
    description: 'Zero-shot local curvature scoring of text likelihood to flag synthetic rumor campaigns and bot SOS surges.',
  },
];

// Curated reference specimens with honest, real-world structures
export const REFERENCE_SPECIMENS: MediaAnalysisReport[] = [
  {
    id: 'specimen-01',
    trackingCode: 'MED-701',
    title: 'Purported Sector 4 Bridge Collapse Viral Photo',
    category: 'IMAGE',
    detectorId: 'LYNOTE_IMAGE',
    detectorName: 'Lynote AI Image Detector',
    verdict: 'SYNTHETIC_MANIPULATED',
    confidenceScore: 0.94,
    submittedAt: 'Today, 09:42',
    fileName: 'sector4_bridge_washout_viral.jpg',
    fileSizeBytes: 2420000,
    isReferenceSpecimen: true,
    findings: [
      'UnivFD ViT-L-14 neural feature inspection identified synthetic generation patterns (AI Probability: 94.2%).',
      'Classification logit indicates high likelihood of diffusion-based synthesis.',
      'Missing optical sensor Bayer noise profile in high-frequency spectral bands.',
    ],
    technicalMetadata: {
      modelUsed: 'Lynote UnivFD (OpenCLIP ViT-L-14)',
      inferenceLatencyMs: 312,
      artifactFrequency: 'Elevated (94% Diffusion confidence)',
      compressionArtifacts: 'Inconsistent double JPEG quantization',
    },
    evidenceCrossReference: {
      incidentId: 'INC-204',
      incidentTitle: 'District Hospital Generator Inundation Risk',
      reliabilityImpact: 'Damped unverified social rumor (w=0.22 -> 0.00). Prevented convoy diversion.',
    },
  },
  {
    id: 'specimen-02',
    trackingCode: 'MED-702',
    title: 'Subway Underpass Trapped Car Citizen Footage',
    category: 'VIDEO',
    detectorId: 'AEGIS_VIDEO',
    detectorName: 'AEGIS Video Detector',
    verdict: 'AUTHENTIC',
    confidenceScore: 0.96,
    submittedAt: 'Today, 10:04',
    fileName: 'subway_water_level_rising.mp4',
    fileSizeBytes: 14800000,
    isReferenceSpecimen: true,
    findings: [
      'Temporal frame consistency matches natural fluid dynamics.',
      'No optical flow discontinuities or deepfake blending boundaries detected.',
      'Acoustic reverberation matches physical subway enclosure.',
    ],
    technicalMetadata: {
      modelUsed: 'AEGIS-SpatioTemporal-ViT v1.8',
      inferenceLatencyMs: 840,
      temporalFlickerScore: 0.03,
    },
    evidenceCrossReference: {
      incidentId: 'INC-205',
      incidentTitle: 'Passenger Vehicle Trapped in Railway Underpass',
      reliabilityImpact: 'Upgraded Helpline call to verified visual proof (w=0.76 -> 0.92).',
    },
  },
  {
    id: 'specimen-03',
    trackingCode: 'MED-703',
    title: 'NDRF Field Station 2 Official Situation Photo',
    category: 'PROVENANCE',
    detectorId: 'C2PA_PROVENANCE',
    detectorName: 'C2PA Provenance Verification',
    verdict: 'AUTHENTIC',
    confidenceScore: 1.0,
    submittedAt: 'Today, 10:15',
    fileName: 'ndrf_sec4_pump_deployment.jpg',
    fileSizeBytes: 3800000,
    isReferenceSpecimen: true,
    findings: [
      'Cryptographic hardware attestation valid: Captured on authenticated field device.',
      'Content Credentials signature is mathematically unbroken.',
      'Chain of custody verified: Direct upload from verified emergency responder identity.',
    ],
    c2paDetails: {
      isSigned: true,
      claimGenerator: 'NDRF Tactical Field App v3.2',
      issuer: 'National Disaster Response Authority Certificate Authority (NDR-CA)',
      signingTime: '2026-10-31T04:44:12Z',
      signatureStatus: 'VALID',
      hardwareAttestation: 'Secure Enclave TPM 2.0 Attested',
      editActions: ['captured', 'cropped-for-transmission'],
      certificateIssuer: 'CN=Govt Emergency Response Root CA, O=Disaster Mgmt',
    },
    evidenceCrossReference: {
      incidentId: 'INC-204',
      incidentTitle: 'District Hospital Generator Inundation Risk',
      reliabilityImpact: 'Confirmed Tier 1 Official Ground-Truth (w=1.00). Highest priority.',
    },
  },
];

class MediaAuthenticityService {
  private reports: MediaAnalysisReport[] = [...REFERENCE_SPECIMENS];
  private workers: BackendWorkerInfo[] = [...INITIAL_WORKERS];
  private reportCounter: number = 705;

  public getWorkers(): BackendWorkerInfo[] {
    return this.workers;
  }

  public getReports(): MediaAnalysisReport[] {
    return this.reports;
  }

  public getReportById(id: string): MediaAnalysisReport | undefined {
    return this.reports.find(r => r.id === id);
  }

  public getReportsByIncident(incidentId: string): MediaAnalysisReport[] {
    return this.reports.filter(r => r.evidenceCrossReference?.incidentId === incidentId);
  }

  public async checkBackendHealth(): Promise<Record<DetectorId, boolean>> {
    const results: Record<DetectorId, boolean> = {
      LYNOTE_IMAGE: false,
      AEGIS_VIDEO: false,
      C2PA_PROVENANCE: false,
      FAST_DETECT_GPT_TEXT: false,
    };

    const endpoints = [
      '/api/media/health',
      'http://127.0.0.1:8000/api/media/health',
      'http://localhost:8000/api/media/health',
    ];

    for (const url of endpoints) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500);

        const resp = await fetch(url, { signal: controller.signal }).catch(() => null);
        clearTimeout(timeoutId);

        if (resp && resp.ok) {
          const healthData = await resp.json();
          const backendWorkers = healthData.workers || {};

          // Update worker statuses from honest backend health check
          for (const w of this.workers) {
            const bw = backendWorkers[w.id];
            if (bw) {
              const statusStr = bw.status || 'UNAVAILABLE';
              w.status = (statusStr === 'READY' || statusStr === 'ONLINE') ? 'ONLINE' : statusStr === 'INITIALIZING' ? 'CONNECTING' : 'OFFLINE';
              w.statusMessage = bw.error || (w.status === 'ONLINE' ? 'Operational and ready for live inference.' : 'Model checkpoint pending or offline.');
              results[w.id as DetectorId] = (statusStr === 'READY' || statusStr === 'ONLINE');
            }
          }
          break;
        }
      } catch {
        // try next endpoint
      }
    }

    return results;
  }

  public async submitForAnalysis(
    file: File | null,
    text: string | null,
    detectorId: DetectorId,
    _simulatedVerdict?: AuthenticityVerdict
  ): Promise<{
    success: boolean;
    isLiveBackend: boolean;
    submittedReport?: MediaAnalysisReport;
    statusNote: string;
    error?: string;
  }> {
    const worker = this.workers.find(w => w.id === detectorId);
    const workerName = worker?.name || detectorId;

    // Candidate endpoints: Vite proxy first, then direct localhost port 8000
    const endpointPath = worker?.endpoint || '/api/media/analyze/image';
    const candidateEndpoints = [
      endpointPath,
      `http://127.0.0.1:8000${endpointPath}`,
      `http://localhost:8000${endpointPath}`,
    ];

    let lastError: string | null = null;

    for (const url of candidateEndpoints) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000);

        let response: Response | null = null;

        if (detectorId === 'FAST_DETECT_GPT_TEXT' && text && !file) {
          response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
            signal: controller.signal,
          }).catch((e) => { lastError = String(e); return null; });
        } else {
          const formData = new FormData();
          if (file) formData.append('file', file);
          if (text) formData.append('text', text);

          response = await fetch(url, {
            method: 'POST',
            body: formData,
            signal: controller.signal,
          }).catch((e) => { lastError = String(e); return null; });
        }

        clearTimeout(timeoutId);

        if (response) {
          if (!response.ok) {
            const errData = await response.json().catch(() => ({ detail: response?.statusText }));
            return {
              success: false,
              isLiveBackend: true,
              statusNote: `Backend rejected payload (${response.status}): ${errData.detail || 'Validation error'}`,
              error: errData.detail || 'Validation error',
            };
          }

          const liveData = await response.json();

          // Check if worker returned honest UNAVAILABLE status
          if (liveData.worker_status === 'UNAVAILABLE' || liveData.verdict === 'UNAVAILABLE') {
            return {
              success: false,
              isLiveBackend: true,
              statusNote: `Worker ${workerName} is currently unavailable: ${liveData.error || 'Model weights initializing.'}`,
              error: liveData.error || 'Model unready',
            };
          }

          const liveReport: MediaAnalysisReport = {
            id: liveData.analysis_id || `rep-${Date.now()}`,
            trackingCode: `MED-${this.reportCounter++}`,
            title: file ? `Analysis: ${file.name}` : `Linguistic Analysis: "${text?.slice(0, 36)}..."`,
            category: (worker?.category || 'IMAGE') as MediaCategory,
            detectorId,
            detectorName: workerName,
            verdict: liveData.verdict as AuthenticityVerdict,
            confidenceScore: liveData.confidence ?? liveData.confidenceScore ?? undefined,
            submittedAt: 'Just now',
            fileName: file?.name,
            fileSizeBytes: file?.size,
            textSnippet: text || undefined,
            findings: liveData.findings || ['Live inference verification complete.'],
            c2paDetails: liveData.c2paDetails,
            technicalMetadata: {
              modelUsed: liveData.model_name || liveData.model || worker?.modelEngine || 'FastAPI Neural Model',
              inferenceLatencyMs: liveData.processing_time || liveData.latencyMs || 0,
              artifactFrequency: liveData.technicalDetails?.probability_ai ? `AI Prob: ${(liveData.technicalDetails.probability_ai * 100).toFixed(1)}%` : undefined,
            },
            evidenceCrossReference: {
              incidentId: 'INC-204',
              incidentTitle: 'District Hospital Generator Inundation Risk',
              reliabilityImpact: liveData.reliabilityImpact || (
                liveData.verdict === 'SYNTHETIC_MANIPULATED'
                  ? 'Flagged manipulated content: Damped unverified visual rumor to prevent misallocation.'
                  : 'Corroborated visual proof: Upgraded incident evidence confidence for priority triage.'
              ),
            },
            isReferenceSpecimen: false,
          };

          this.reports.unshift(liveReport);
          return {
            success: true,
            isLiveBackend: true,
            submittedReport: liveReport,
            statusNote: `Processed via Live ${workerName} (Python FastAPI port 8000).`,
          };
        }
      } catch (err) {
        lastError = String(err);
      }
    }

    // Backend is unreachable: In accordance with data integrity guidelines,
    // do NOT simulate fake scores or classify files by filename.
    return {
      success: false,
      isLiveBackend: false,
      statusNote: `Backend worker "${workerName}" is offline or unreachable at ${endpointPath}. Synthetic predictions are withheld in accordance with emergency data integrity standards.`,
      error: lastError || 'Connection refused — Python backend on port 8000 is not running.',
    };
  }
}

export const mediaAuthenticityService = new MediaAuthenticityService();
