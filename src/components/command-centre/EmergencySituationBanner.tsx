import React from 'react';
import { AlertTriangle, UserCheck, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SeverityBadge } from '../common/SeverityBadge';

interface EmergencySituationBannerProps {
  onScrollToCritical?: () => void;
}

export const EmergencySituationBanner: React.FC<EmergencySituationBannerProps> = ({
  onScrollToCritical,
}) => {
  return (
    <div className="rounded-2xl border border-sentinel-700/80 bg-gradient-to-b from-sentinel-900 to-sentinel-900/90 p-6 lg:p-8 shadow-xl">
      {/* Simulation / Drill Label */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-sentinel-800">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-500/30">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
            SIMULATION EXERCISE — NOT A REAL EMERGENCY
          </span>
          <span className="text-xs text-slate-400 font-sans hidden sm:inline">
            Scenario Code: Hydro-Flood-Phase2
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-teal-300 font-medium bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
          <UserCheck className="h-3.5 w-3.5 text-teal-400" />
          <span>Human Approval Enforced</span>
        </div>
      </div>

      {/* Main Situation Header */}
      <div className="mt-5 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <SeverityBadge severity="CRITICAL" size="lg" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white font-sans">
              Monsoon Flash Flood & Inundation Scenario
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <MapPin className="h-3.5 w-3.5 text-teal-400 shrink-0" />
            <span>Affected Sectors: Sector 4 (Hospital District) & Sector 2 (Transit Underpass)</span>
          </div>

          {/* AI Situation Summary in Simple Language */}
          <div className="rounded-xl bg-sentinel-950/70 border border-sentinel-800 p-4 mt-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-300 flex items-center gap-1.5 mb-1.5">
              <ShieldCheck className="h-4 w-4 text-teal-400" />
              AI Situation Summary
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Intense rainfall (85 mm/hr) has overwhelmed local drainage canals. Two incidents currently pose acute life-safety hazards: power vulnerability at the District Hospital ICU and a trapped passenger vehicle in the railway underpass. All suggested dispatches require your confirmation before vehicles are mobilized.
            </p>
          </div>
        </div>

        {/* Action Buttons for the Emergency Coordinator */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[240px] shrink-0 justify-center">
          <button
            onClick={onScrollToCritical}
            className="flex items-center justify-center gap-2 rounded-xl bg-teal-500 hover:bg-teal-400 px-5 py-3 text-sm font-semibold text-sentinel-950 shadow-lg shadow-teal-500/20 transition-all hover:shadow-teal-500/30"
          >
            <span>Review Critical Incidents (2)</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <Link
            to="/map"
            className="flex items-center justify-center gap-2 rounded-xl bg-sentinel-800 hover:bg-sentinel-750 border border-sentinel-700 px-5 py-3 text-sm font-medium text-slate-200 transition-colors text-center"
          >
            <span>Open Incident Map</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

