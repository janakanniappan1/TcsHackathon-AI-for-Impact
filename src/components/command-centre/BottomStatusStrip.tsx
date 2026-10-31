import React from 'react';
import { RefreshCw, Clock, Database } from 'lucide-react';

interface BottomStatusStripProps {
  lastSync: string;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const BottomStatusStrip: React.FC<BottomStatusStripProps> = ({
  lastSync,
  onRefresh,
  isRefreshing = false,
}) => {
  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-card px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
      {/* Left: Operational status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 font-medium text-slate-900">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>SENTINEL Operations Engine: Online</span>
        </div>
        <span className="text-slate-300">|</span>
        <div className="flex items-center gap-1 text-slate-500">
          <Database className="h-3.5 w-3.5 text-slate-400" />
          <span>Local FastAPI (Port 8000) Connected</span>
        </div>
      </div>

      {/* Center: Active Job Indicators */}
      <div className="hidden md:flex items-center gap-3 font-mono text-[11px] text-slate-500">
        <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
          Queue: 3 Incidents
        </span>
        <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
          MCDA: Optimized
        </span>
        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
          Leaflet OSM: Synced
        </span>
      </div>

      {/* Right: Last Sync & Refresh Button */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1 text-slate-400 text-[11px]">
          <Clock className="h-3 w-3" />
          <span>Last synced: {lastSync}</span>
        </div>

        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
          title="Synchronize with backend"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
        </button>
      </div>
    </div>
  );
};
