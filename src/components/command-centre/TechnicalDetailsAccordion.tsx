import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Code2, Bot, Layers, Sliders, Route, Sparkles } from 'lucide-react';

export const TechnicalDetailsAccordion: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-sentinel-800 bg-sentinel-950/60 overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-sentinel-900/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-sentinel-800 p-2 text-teal-400">
            <Code2 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">
              Technical Architecture & Mathematical Models
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click to view multi-agent decision loop formulations, weights, and constraints
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span>{isOpen ? 'Collapse Reference' : 'Expand Reference'}</span>
          {isOpen ? <ChevronUp className="h-4 w-4 text-teal-400" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-6 pt-2 border-t border-sentinel-800/80 space-y-6 text-xs text-slate-300">
          {/* Decision Loop */}
          <div className="space-y-2">
            <div className="font-semibold text-teal-300 uppercase tracking-wider font-mono text-[11px] flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Six-Stage Agentic Emergency Loop
            </div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] pt-1">
              <span className="rounded bg-sentinel-900 px-3 py-1.5 border border-sentinel-700 text-slate-200">
                1. Evidence Verification
              </span>
              <span className="text-teal-400">→</span>
              <span className="rounded bg-sentinel-900 px-3 py-1.5 border border-sentinel-700 text-slate-200">
                2. Incident Priority
              </span>
              <span className="text-teal-400">→</span>
              <span className="rounded bg-sentinel-900 px-3 py-1.5 border border-sentinel-700 text-slate-200">
                3. Resource Allocation
              </span>
              <span className="text-teal-400">→</span>
              <span className="rounded bg-sentinel-900 px-3 py-1.5 border border-sentinel-700 text-slate-200">
                4. Route Planning
              </span>
              <span className="text-teal-400">→</span>
              <span className="rounded bg-sentinel-900 px-3 py-1.5 border border-sentinel-700 text-slate-200">
                5. Monitoring
              </span>
              <span className="text-teal-400">→</span>
              <span className="rounded bg-teal-500/20 px-3 py-1.5 border border-teal-500/40 text-teal-300">
                6. Route Replanning
              </span>
            </div>
          </div>

          {/* Mathematical Formulations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="rounded-xl bg-sentinel-900/90 border border-sentinel-800 p-4 space-y-2">
              <div className="flex items-center gap-2 text-teal-300 font-semibold font-mono text-xs">
                <Layers className="h-4 w-4" />
                <span>1. Evidence Verification Scoring (R)</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                R_i = min(1.0, (w_lead * S_max) + β(1 - e^(-λ(N_i - 1))))
              </p>
              <div className="text-[11px] text-slate-400 space-y-1 pt-1 font-mono">
                <div>• Official Radio / NDRF: w = 1.00</div>
                <div>• Hydro IoT Sensor: w = 0.88</div>
                <div>• 112 Helpline Call: w = 0.76</div>
                <div>• Citizen SOS: w = 0.42</div>
                <div>• Social Rumor: w = 0.22</div>
              </div>
            </div>

            <div className="rounded-xl bg-sentinel-900/90 border border-sentinel-800 p-4 space-y-2">
              <div className="flex items-center gap-2 text-teal-300 font-semibold font-mono text-xs">
                <Sliders className="h-4 w-4" />
                <span>2. Incident Priority Scoring (P)</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                P_i = (w_c * C_i + w_v * V_i + w_u * U_i) * (γ + (1 - γ) * R_i)
              </p>
              <div className="text-[11px] text-slate-400 space-y-1 pt-1 font-mono">
                <div>• Casualty Risk (C): weight = 0.40</div>
                <div>• Vulnerability (V): weight = 0.30</div>
                <div>• Urgency (U): weight = 0.30</div>
                <div>• Baseline factor (γ): 0.30</div>
              </div>
            </div>

            <div className="rounded-xl bg-sentinel-900/90 border border-sentinel-800 p-4 space-y-2">
              <div className="flex items-center gap-2 text-teal-300 font-semibold font-mono text-xs">
                <Bot className="h-4 w-4" />
                <span>3. Resource Allocation (MILP)</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Mixed-Integer Linear Programming balancing vehicle travel time against hospital bed capacities and flood-elevation shelter safe margins.
              </p>
            </div>

            <div className="rounded-xl bg-sentinel-900/90 border border-sentinel-800 p-4 space-y-2">
              <div className="flex items-center gap-2 text-teal-300 font-semibold font-mono text-xs">
                <Route className="h-4 w-4" />
                <span>4. Route Replanning Engine</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Dynamic road network graph monitoring. Simulates bridge cut-offs and road washouts with immediate alternate corridor calculation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
