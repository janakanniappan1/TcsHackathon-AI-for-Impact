import React from 'react';
import { 
  Bot, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  SlidersHorizontal,
  Route,
  Layers,
  Sparkles
} from 'lucide-react';
import { Card } from '../common/Card';
import { REGISTERED_AGENTS } from '../../agents';
import { StatusIndicator } from '../common/StatusIndicator';

export const AgentStatusMatrix: React.FC = () => {
  const getAgentIcon = (id: string) => {
    switch (id) {
      case 'agent-verification':
        return ShieldCheck;
      case 'agent-prioritization':
        return Layers;
      case 'agent-allocation':
        return SlidersHorizontal;
      case 'agent-routing':
        return Route;
      case 'agent-guardrail':
        return Lock;
      default:
        return Bot;
    }
  };

  return (
    <Card
      title="Autonomous Multi-Agent Operational Grid"
      subtitle="Decoupled intelligent engines operating in autonomous coordination loop"
      headerAction={
        <div className="flex items-center gap-2">
          <StatusIndicator status="ACTIVE" label="ALL AGENTS SYNCED" />
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {REGISTERED_AGENTS.map((agent) => {
          const Icon = getAgentIcon(agent.id);
          return (
            <div
              key={agent.id}
              className="flex flex-col justify-between rounded-xl border border-sentinel-700/80 bg-sentinel-950/60 p-4 transition-all hover:border-teal-500/40 hover:bg-sentinel-900/90"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-sentinel-850 border border-sentinel-700 text-teal-400">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white tracking-wide">
                        {agent.name}
                      </h4>
                      <p className="text-[10px] font-mono text-teal-400/90 mt-0.5">
                        {agent.role}
                      </p>
                    </div>
                  </div>

                  <span className="rounded bg-sentinel-800 px-1.5 py-0.5 font-mono text-[9px] text-slate-300 border border-sentinel-700">
                    v{agent.version}
                  </span>
                </div>

                <p className="mt-3 text-xs text-slate-400 leading-relaxed font-sans">
                  {agent.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-sentinel-850 flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>STANDBY READY</span>
                </div>

                {agent.guardrailProtected && (
                  <div className="flex items-center gap-1 text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    <Lock className="h-2.5 w-2.5" />
                    <span>HITL GUARDRAIL</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Six-Stage Loop Summary Card */}
        <div className="rounded-xl border border-dashed border-teal-500/30 bg-teal-500/5 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-teal-300 font-mono text-xs font-bold uppercase">
              <Sparkles className="h-4 w-4 text-teal-400" />
              Autonomous Decision Loop
            </div>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Every critical event cascades systematically across the six-stage loop:
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-1.5 font-mono text-[10px] text-slate-200">
              <span className="px-2 py-1 rounded bg-sentinel-900 border border-sentinel-700">Verify</span>
              <span className="text-teal-400 font-bold">→</span>
              <span className="px-2 py-1 rounded bg-sentinel-900 border border-sentinel-700">Prioritize</span>
              <span className="text-teal-400 font-bold">→</span>
              <span className="px-2 py-1 rounded bg-sentinel-900 border border-sentinel-700">Allocate</span>
              <span className="text-teal-400 font-bold">→</span>
              <span className="px-2 py-1 rounded bg-sentinel-900 border border-sentinel-700">Route</span>
              <span className="text-teal-400 font-bold">→</span>
              <span className="px-2 py-1 rounded bg-sentinel-900 border border-sentinel-700">Monitor</span>
              <span className="text-teal-400 font-bold">→</span>
              <span className="px-2 py-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/40">Replan</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-teal-500/20 text-[10px] font-mono text-slate-400">
            Jury Challenge Replanning: Sub-100ms trigger
          </div>
        </div>
      </div>
    </Card>
  );
};

