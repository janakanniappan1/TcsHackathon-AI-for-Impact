import { AgentManifest } from './types';

export * from './types';

export const REGISTERED_AGENTS: AgentManifest[] = [
  {
    id: 'agent-verification',
    name: 'Verification & Trust Engine',
    role: 'Agent 1: Evidence Ingestion & Corroboration',
    version: '1.0.0',
    status: 'ACTIVE',
    description: 'Calculates Bayesian source credibility weights and spatial-temporal clustering.',
    guardrailProtected: false,
  },
  {
    id: 'agent-prioritization',
    name: 'Explainable Prioritization Engine',
    role: 'Agent 2: MCDA Priority Matrix',
    version: '1.0.0',
    status: 'ACTIVE',
    description: 'Computes composite priority index balancing casualty risk, demographic vulnerability, and urgency.',
    guardrailProtected: false,
  },
  {
    id: 'agent-allocation',
    name: 'Resource & Shelter Allocator',
    role: 'Agent 3: Constrained MILP Optimization',
    version: '1.0.0',
    status: 'ACTIVE',
    description: 'Optimizes multi-resource dispatch matching ambulances, rescue boats, NDRF, and shelter capacity.',
    guardrailProtected: true,
  },
  {
    id: 'agent-routing',
    name: 'Dynamic Graph & Jury Replanner',
    role: 'Agent 4: Road Network Telemetry & Rerouting',
    version: '1.0.0',
    status: 'ACTIVE',
    description: 'Monitors road graph impedance, triggers autonomous rerouting upon road cut-offs in <100ms.',
    guardrailProtected: true,
  },
  {
    id: 'agent-guardrail',
    name: 'Responsible AI & Guardrail Console',
    role: 'Agent 5: Human-in-the-Loop Audit & Safety',
    version: '1.0.0',
    status: 'ACTIVE',
    description: 'Enforces human authorization for mission-critical overrides, preserving chain of command.',
    guardrailProtected: true,
  },
];

