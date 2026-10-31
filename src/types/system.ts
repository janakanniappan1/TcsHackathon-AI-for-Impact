export type SystemHealthStatus = 'OPERATIONAL' | 'DEGRADED' | 'STANDBY' | 'CRITICAL';

export type OperationalMode = 'NORMAL' | 'ELEVATED_ALERT' | 'DISASTER_ACTIVE' | 'DRILL_MODE';

export interface DataFreshness {
  lastUpdated: Date;
  status: 'FRESH' | 'SYNCING' | 'STALE' | 'OFFLINE';
  stalenessSeconds: number;
}

export interface SystemStatusState {
  health: SystemHealthStatus;
  mode: OperationalMode;
  freshness: DataFreshness;
  activeAgents: number;
  totalAgents: number;
  connectedAPIs: {
    name: string;
    status: 'ONLINE' | 'STANDBY' | 'NOT_CONFIGURED';
    latencyMs?: number;
  }[];
}

