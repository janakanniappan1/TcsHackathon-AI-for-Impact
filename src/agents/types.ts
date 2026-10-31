export type AgentId = 
  | 'agent-verification'
  | 'agent-prioritization'
  | 'agent-allocation'
  | 'agent-routing'
  | 'agent-guardrail';

export type AgentStatus = 'IDLE' | 'ACTIVE' | 'EVALUATING' | 'STANDBY' | 'ERROR';

export interface AgentManifest {
  id: AgentId;
  name: string;
  role: string;
  version: string;
  status: AgentStatus;
  lastExecutionMs?: number;
  description: string;
  guardrailProtected: boolean;
}

export interface AgentExecutionResult<T = unknown> {
  agentId: AgentId;
  timestamp: string;
  success: boolean;
  durationMs: number;
  output: T;
  auditTrail: string[];
}

