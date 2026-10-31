export type MediaCategory = 'IMAGE' | 'VIDEO' | 'TEXT' | 'PROVENANCE';

export type DetectorId = 
  | 'LYNOTE_IMAGE' 
  | 'AEGIS_VIDEO' 
  | 'C2PA_PROVENANCE' 
  | 'FAST_DETECT_GPT_TEXT';

export type AuthenticityVerdict = 
  | 'AUTHENTIC'
  | 'SUSPICIOUS'
  | 'SYNTHETIC_MANIPULATED'
  | 'INCONCLUSIVE'
  | 'UNPROCESSED';

export type WorkerStatus = 'ONLINE' | 'STANDBY' | 'NOT_CONFIGURED' | 'OFFLINE' | 'UNAVAILABLE' | 'CONNECTING';

export interface BackendWorkerInfo {
  id: DetectorId;
  name: string;
  category: MediaCategory;
  modelEngine: string;
  endpoint: string;
  status: WorkerStatus;
  statusMessage: string;
  version: string;
  description: string;
}

export interface C2PAManifestRecord {
  isSigned: boolean;
  claimGenerator?: string;
  issuer?: string;
  signingTime?: string;
  signatureStatus: 'VALID' | 'INVALID' | 'MISSING' | 'REVOKED';
  hardwareAttestation?: string;
  editActions?: string[];
  certificateIssuer?: string;
}

export interface MediaAnalysisReport {
  id: string;
  trackingCode: string;
  title: string;
  category: MediaCategory;
  detectorId: DetectorId;
  detectorName: string;
  verdict: AuthenticityVerdict;
  confidenceScore?: number; // Only present when genuinely calculated by worker
  submittedAt: string;
  fileName?: string;
  fileSizeBytes?: number;
  textSnippet?: string;
  findings: string[];
  c2paDetails?: C2PAManifestRecord;
  technicalMetadata?: {
    modelUsed: string;
    inferenceLatencyMs?: number;
    artifactFrequency?: string;
    compressionArtifacts?: string;
    temporalFlickerScore?: number;
    perplexityAnomaly?: number;
    curvatureScore?: number;
  };
  evidenceCrossReference?: {
    incidentId: string;
    incidentTitle: string;
    reliabilityImpact: string; // e.g., "Upgrades citizen SOS to verified tier (w=0.42 -> 0.88)" or "Damped rumor"
  };
  isReferenceSpecimen?: boolean; // Clearly demarcates reference specimens from real-world submissions
}

export type MediaSubmodule = 
  | 'overview' 
  | 'image' 
  | 'video' 
  | 'text' 
  | 'provenance' 
  | 'history';

