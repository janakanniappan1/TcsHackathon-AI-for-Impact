import { SeverityLevel, VerificationTier } from '../types/incident';

export const SYSTEM_NAME = 'SENTINEL';
export const SYSTEM_SUBTITLE = 'Disaster Intelligence & Emergency Coordination System';
export const SYSTEM_VERSION = 'v2.0 (Operations)';

export const SEVERITY_CONFIG: Record<
  SeverityLevel,
  { label: string; color: string; bg: string; border: string; glow: string }
> = {
  CRITICAL: {
    label: 'Critical',
    color: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
    glow: 'shadow-red-500/10',
  },
  HIGH: {
    label: 'High',
    color: 'text-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    glow: 'shadow-orange-500/10',
  },
  MODERATE: {
    label: 'Moderate',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    glow: 'shadow-amber-500/10',
  },
  LOW: {
    label: 'Low',
    color: 'text-sky-700',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    glow: 'shadow-sky-500/10',
  },
  NOMINAL: {
    label: 'Nominal',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    glow: 'shadow-emerald-500/10',
  },
};

export const VERIFICATION_TIERS: Record<
  VerificationTier,
  { label: string; baseWeight: number; description: string }
> = {
  TIER_1_OFFICIAL: {
    label: 'Official Field Unit (NDRF / State)',
    baseWeight: 1.00,
    description: 'Ground-truth radio telemetry & official response personnel',
  },
  TIER_2_IOT_SENSOR: {
    label: 'IoT / Hydro-Meteorological Telemetry',
    baseWeight: 0.88,
    description: 'Calibrated river gauge, rain sensor, or structural sensor',
  },
  TIER_3_HELPLINE: {
    label: 'Emergency 112 Helpline Call',
    baseWeight: 0.76,
    description: 'Direct citizen distress calls triaged by emergency dispatch operators',
  },
  TIER_4_CITIZEN_SOS: {
    label: 'Citizen Public SOS / WhatsApp',
    baseWeight: 0.42,
    description: 'Uncorroborated public SOS broadcasts requiring spatial clustering',
  },
  TIER_5_UNVERIFIED: {
    label: 'Uncorroborated Social Media Rumor',
    baseWeight: 0.22,
    description: 'Single-source social posts heavily damped to prevent false dispatches',
  },
};
