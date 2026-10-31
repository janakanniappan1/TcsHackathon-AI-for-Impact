import React from 'react';
import { ShieldCheck, CheckCircle2, Info } from 'lucide-react';
import { serviceConfig } from '../../services';

export const SystemIntegrityStatus: React.FC = () => {
  const sources = [
    {
      name: 'Weather Forecast (Open-Meteo)',
      type: 'Live Public API',
      status: 'Ready',
      detail: 'Public open-meteo gateway enabled (no secret key required)',
      isLive: true,
    },
    {
      name: 'Road Network Routing (OSRM)',
      type: 'Network Service',
      status: 'Ready',
      detail: 'Routing endpoint connected for distance calculations',
      isLive: true,
    },
    {
      name: 'AI Reasoning (Gemini API)',
      type: 'Agent Engine',
      status: serviceConfig.gemini.isConfigured ? 'Connected' : 'Environment Pending',
      detail: serviceConfig.gemini.isConfigured
        ? 'Model configured via secure environment'
        : 'Standby: VITE_GEMINI_API_KEY can be provided in .env',
      isLive: serviceConfig.gemini.isConfigured,
    },
    {
      name: 'Active Incidents & Units',
      type: 'Simulation Scenario',
      status: 'Training Scenario',
      detail: 'Hydrological surge exercise baseline dataset loaded',
      isLive: false,
    },
  ];

  return (
    <div className="rounded-2xl border border-sentinel-700/70 bg-sentinel-900/90 p-5 lg:p-6">
      <div className="flex items-center justify-between pb-4 border-b border-sentinel-800">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-teal-400" />
          Data Sources & System Status
        </h3>
        <span className="text-xs text-teal-300 font-medium">Transparent Integration</span>
      </div>

      <div className="mt-4 space-y-3">
        {sources.map((src) => (
          <div
            key={src.name}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-sentinel-950/60 border border-sentinel-800 gap-2"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white">{src.name}</span>
                <span className="text-[10px] font-mono text-slate-400">({src.type})</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">{src.detail}</p>
            </div>

            <div className="self-start sm:self-center">
              {src.isLive ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                  <CheckCircle2 className="h-3 w-3" />
                  {src.status}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-300 bg-sentinel-800 px-2.5 py-0.5 rounded-md border border-sentinel-700">
                  <Info className="h-3 w-3 text-slate-400" />
                  {src.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-sentinel-800 text-xs text-slate-400 flex items-center gap-2">
        <Info className="h-4 w-4 text-teal-400 shrink-0" />
        <span>
          Data Integrity Policy: Simulated scenario elements are clearly distinguished from live endpoints.
        </span>
      </div>
    </div>
  );
};
