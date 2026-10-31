import React from 'react';
import { ShieldAlert, UserCheck, FileText } from 'lucide-react';
import { Card } from '../common/Card';

export const ResponsibleAIGuardrailCard: React.FC = () => {
  return (
    <Card
      title="Responsible AI & Human-in-the-Loop (HITL) Guardrails"
      subtitle="Ensuring operational accountability and commander authority during acute crises"
      variant="accent"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-lg border border-sentinel-700 bg-sentinel-950/60 p-3.5">
            <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-semibold">
              <UserCheck className="h-4 w-4" />
              <span>Commander Sign-Off</span>
            </div>
            <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
              Autonomous re-allocation of life-safety units (ICU diversions, NDRF swaps) enforces human operator authorization before mission dispatch.
            </p>
          </div>

          <div className="rounded-lg border border-sentinel-700 bg-sentinel-950/60 p-3.5">
            <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-semibold">
              <FileText className="h-4 w-4" />
              <span>Chain-of-Thought Audit</span>
            </div>
            <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
              Every priority scoring and routing shift generates an immutable, mathematical justification log with clear causal explanations.
            </p>
          </div>

          <div className="rounded-lg border border-sentinel-700 bg-sentinel-950/60 p-3.5">
            <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-semibold">
              <ShieldAlert className="h-4 w-4" />
              <span>False Rumor Damping</span>
            </div>
            <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
              Bayesian verification requires multi-source spatial corroboration (radius r ≤ 800m) to prevent unverified social media panic from diverting convoys.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-teal-500/10 border border-teal-500/20 px-4 py-2.5 text-xs font-mono text-teal-300">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
            Hackathon Guardrail Policy: ACTIVE & ENFORCED
          </span>
          <span className="text-slate-400 text-[11px]">Strict ISO / Responsible AI Principles</span>
        </div>
      </div>
    </Card>
  );
};

