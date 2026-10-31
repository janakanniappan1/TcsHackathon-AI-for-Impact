import React from 'react';
import { AlertCircle, Truck, Home, CloudRain } from 'lucide-react';

export const OperationsOverviewCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* 1. Incident Count & Verification */}
      <div className="rounded-2xl border border-sentinel-700/70 bg-sentinel-900/90 p-5 shadow-sm hover:border-sentinel-600 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Incidents
          </span>
          <div className="rounded-lg bg-red-500/10 p-2 text-red-400">
            <AlertCircle className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-white font-mono">
            8
          </span>
          <span className="text-xs text-red-400 font-medium">
            2 Critical
          </span>
        </div>

        <div className="mt-4 pt-3 border-t border-sentinel-800 text-xs text-slate-400 space-y-1">
          <div className="flex justify-between">
            <span>Operator Verified:</span>
            <span className="text-slate-200 font-medium">5 incidents</span>
          </div>
          <div className="flex justify-between">
            <span>Pending Verification:</span>
            <span className="text-amber-400 font-medium">3 unverified SOS</span>
          </div>
        </div>
      </div>

      {/* 2. Emergency Resources Available */}
      <div className="rounded-2xl border border-sentinel-700/70 bg-sentinel-900/90 p-5 shadow-sm hover:border-sentinel-600 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Emergency Resources
          </span>
          <div className="rounded-lg bg-teal-500/10 p-2 text-teal-400">
            <Truck className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-teal-300 font-mono">
            14
          </span>
          <span className="text-xs text-slate-400 font-medium">
            of 18 ready
          </span>
        </div>

        <div className="mt-4 pt-3 border-t border-sentinel-800 text-xs text-slate-400 space-y-1">
          <div className="flex justify-between">
            <span>Ambulances:</span>
            <span className="text-slate-200 font-medium">4 available (1 deployed)</span>
          </div>
          <div className="flex justify-between">
            <span>Rescue Boats:</span>
            <span className="text-slate-200 font-medium">3 available (1 on standby)</span>
          </div>
        </div>
      </div>

      {/* 3. Shelter Availability */}
      <div className="rounded-2xl border border-sentinel-700/70 bg-sentinel-900/90 p-5 shadow-sm hover:border-sentinel-600 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Shelter Capacity
          </span>
          <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400">
            <Home className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-white font-mono">
            56%
          </span>
          <span className="text-xs text-emerald-400 font-medium">
            Capacity Free
          </span>
        </div>

        <div className="mt-4 pt-3 border-t border-sentinel-800 text-xs text-slate-400 space-y-1">
          <div className="flex justify-between">
            <span>Open Shelters:</span>
            <span className="text-slate-200 font-medium">3 flood-safe centers</span>
          </div>
          <div className="flex justify-between">
            <span>Available Beds:</span>
            <span className="text-slate-200 font-medium">450 / 800 beds</span>
          </div>
        </div>
      </div>

      {/* 4. Weather Advisory */}
      <div className="rounded-2xl border border-sentinel-700/70 bg-sentinel-900/90 p-5 shadow-sm hover:border-sentinel-600 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Weather Warning
          </span>
          <div className="rounded-lg bg-amber-500/10 p-2 text-amber-400">
            <CloudRain className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-amber-300 font-sans">
            Heavy Rain
          </span>
        </div>

        <div className="mt-4 pt-3 border-t border-sentinel-800 text-xs text-slate-400 space-y-1">
          <div className="flex justify-between">
            <span>Rainfall Rate:</span>
            <span className="text-slate-200 font-medium">65–85 mm/hr</span>
          </div>
          <div className="flex justify-between">
            <span>High Tide Advisory:</span>
            <span className="text-amber-400 font-medium">14:30 (+0.4m surge)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

