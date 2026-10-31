import React from 'react';
import { 
  AlertOctagon, 
  Layers, 
  ShieldCheck, 
  Compass
} from 'lucide-react';
import { MetricCard } from '../common/MetricCard';
import { SeverityBadge } from '../common/SeverityBadge';

export const MissionReadinessOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Tactical Incident Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-sentinel-700/80 bg-gradient-to-r from-sentinel-900 via-sentinel-850 to-sentinel-900 p-6 shadow-2xl">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal-400">
                TACTICAL EOC DISASTER COMMAND
              </span>
              <span className="text-slate-600">•</span>
              <SeverityBadge severity="CRITICAL" />
              <span className="inline-flex items-center gap-1.5 rounded-md bg-sentinel-800 px-2 py-0.5 font-mono text-[11px] text-slate-300 border border-sentinel-700">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                MONSOON SURGE SCENARIO
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl font-sans">
              SENTINEL Emergency Command Centre
            </h2>

            <p className="max-w-3xl text-sm text-slate-300">
              Autonomous multi-agent disaster intelligence loop executing Bayesian evidence corroboration, 
              multi-criteria triage, constrained MILP resource allocation, and instant road-impedance rerouting.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch lg:items-center gap-2.5">
            <div className="rounded-xl border border-sentinel-700 bg-sentinel-950/80 px-4 py-3 text-center sm:text-left">
              <div className="text-[10px] font-mono uppercase text-slate-400">Response Loop Latency</div>
              <div className="text-lg font-mono font-bold text-teal-300">&lt; 100 ms</div>
              <div className="text-[10px] text-slate-500 font-mono">Dynamic Graph Replanning</div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Verification Tiers"
          value="5 Tiers"
          subValue="w=1.00 to 0.22"
          icon={ShieldCheck}
          variant="teal"
          footnote="Bayesian Corroboration Engine"
        />

        <MetricCard
          label="Priority Formulation"
          value="MCDA"
          subValue="P = (wC + wV + wU) × R"
          icon={Layers}
          variant="amber"
          footnote="Casualty, Vulnerability & Urgency"
        />

        <MetricCard
          label="Resource Optimization"
          value="MILP"
          subValue="Ambulance / Boat / NDRF"
          icon={AlertOctagon}
          variant="red"
          footnote="Constrained Supply-Demand Match"
        />

        <MetricCard
          label="Dynamic Replanning"
          value="Active"
          subValue="Subgraph Rerouting"
          icon={Compass}
          variant="blue"
          footnote="Dynamic Jury Challenge Ready"
        />
      </div>
    </div>
  );
};

