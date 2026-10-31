import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Truck, 
  MapPin, 
  UserCheck, 
  Sparkles 
} from 'lucide-react';
import { CommandIncident } from './PrioritizedQueueColumn';

interface DispatchDecisionColumnProps {
  selectedIncident: CommandIncident;
  onAuthorize: (incidentId: string) => void;
  onOverride: (incidentId: string) => void;
  isAuthorized: boolean;
}

export const DispatchDecisionColumn: React.FC<DispatchDecisionColumnProps> = ({
  selectedIncident,
  onAuthorize,
  onOverride,
  isAuthorized,
}) => {
  const [showReviewModal, setShowReviewModal] = useState(false);

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Main Dispatch Decision Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-card p-4 sm:p-5 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Active Coordination Decision
            </span>
            <h2 className="text-sm font-bold text-slate-900 mt-1">
              {selectedIncident.code} — Dispatch & Replanning
            </h2>
          </div>

          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
            isAuthorized ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
          }`}>
            {isAuthorized ? 'AUTHORIZED' : 'PENDING APPROVAL'}
          </span>
        </div>

        {/* Selected Incident Snapshot */}
        <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800">{selectedIncident.title}</span>
            <span className="font-mono text-red-600 font-bold">{selectedIncident.severity}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
            <span>{selectedIncident.location}</span>
          </div>
          <div className="text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-200">
            {selectedIncident.affectedCount}
          </div>
        </div>

        {/* Disruption Alert */}
        <div className="mt-3 p-3 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-amber-900">Detected Route Disruption</div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              {selectedIncident.disruption || 'West Canal Road inundated (water depth > 1.2m). Original direct route impassable.'}
            </p>
          </div>
        </div>

        {/* Assigned Team */}
        <div className="mt-3 p-3 rounded-xl bg-blue-50/60 border border-blue-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-600 text-white shadow-sm">
              <Truck className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                {selectedIncident.suggestedTeam || 'NDRF Unit Beta (PT-02 + MP-01)'}
              </div>
              <div className="text-[10px] text-slate-500">
                High-Capacity De-Watering + Mobile Power
              </div>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
            STAGED
          </span>
        </div>

        {/* Visual Route-Change Comparison */}
        <div className="mt-4 space-y-2">
          <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>Route Comparison</span>
            <span className="text-[10px] text-slate-400 font-mono">Routing Engine v2.0</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Current Route (Blocked) */}
            <div className="p-2.5 rounded-xl border border-red-200 bg-red-50/50 space-y-1">
              <div className="flex items-center gap-1 text-[10px] font-bold text-red-700 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                Current Route
              </div>
              <div className="font-semibold text-slate-900 text-[11px]">
                {selectedIncident.originalRoute || 'West Canal Road'}
              </div>
              <div className="text-[10px] text-red-600 font-medium">
                Blocked • Water &gt; 1.2m
              </div>
            </div>

            {/* Alternative Route (Clear) */}
            <div className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50/60 space-y-1 shadow-sm">
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Proposed Bypass
              </div>
              <div className="font-semibold text-slate-900 text-[11px]">
                {selectedIncident.alternativeRoute || 'Eastern Flyover'}
              </div>
              <div className="text-[10px] text-emerald-700 font-medium">
                Clear • +4 mins (+3.8 km)
              </div>
            </div>
          </div>
        </div>

        {/* AI Explainability Rationale */}
        <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800">
            <Sparkles className="h-3 w-3 text-blue-600" />
            <span>Recommendation Rationale</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Elevated flyover bypass avoids low-lying canal basin. Ensures generator arrival before hospital basement battery banks deplete.
          </p>
        </div>

        {/* Action Buttons with Human Authority Requirement */}
        <div className="mt-5 space-y-2 pt-3 border-t border-slate-100">
          <button
            onClick={() => onAuthorize(selectedIncident.id)}
            disabled={isAuthorized}
            className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all ${
              isAuthorized
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isAuthorized ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Dispatch Authorized by Operator</span>
              </>
            ) : (
              <>
                <UserCheck className="h-4 w-4" />
                <span>Authorize Dispatch Plan</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowReviewModal(!showReviewModal)}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs border border-slate-200 transition-colors"
            >
              {showReviewModal ? 'Hide Plan Details' : 'Review Plan Details'}
            </button>

            <button
              onClick={() => onOverride(selectedIncident.id)}
              className="py-2 px-3 rounded-xl hover:bg-red-50 text-red-600 font-medium text-xs border border-red-200 transition-colors"
            >
              Reject / Override
            </button>
          </div>
        </div>

        {/* Human Authority Notice */}
        <div className="mt-3 flex items-center gap-1.5 text-[10px] text-slate-400 justify-center">
          <ShieldCheck className="h-3 w-3 text-slate-400" />
          <span>Life-critical operations require explicit operator authorization</span>
        </div>
      </div>
    </div>
  );
};
