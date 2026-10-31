export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW' | 'NOMINAL';

export type VerificationTier = 
  | 'TIER_1_OFFICIAL'     // NDRF / Govt (w=1.00)
  | 'TIER_2_IOT_SENSOR'   // Sensors / Telemetry (w=0.88)
  | 'TIER_3_HELPLINE'     // 112 / State Operators (w=0.76)
  | 'TIER_4_CITIZEN_SOS'  // Public SOS / WhatsApp (w=0.42)
  | 'TIER_5_UNVERIFIED';  // Social rumors (w=0.22)

export interface IncidentSummary {
  id: string;
  trackingCode: string;
  title: string;
  locationName: string;
  latitude: number;
  longitude: number;
  severity: SeverityLevel;
  verificationTier: VerificationTier;
  confidenceScore: number;
  casualtyRisk: number;
  urgencyScore: number;
  reportedAt: string;
  affectedCount: number;
  status: 'REPORTED' | 'VERIFIED' | 'DISPATCHED' | 'RESOLVED';
}

