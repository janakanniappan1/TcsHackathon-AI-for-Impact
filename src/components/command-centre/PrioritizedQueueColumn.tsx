import React from 'react';
import { 
  AlertCircle, 
  MapPin, 
  Clock, 
  Activity, 
  TrendingUp 
} from 'lucide-react';
import { cn } from '../../utils/cn';

export interface CommandIncident {
  id: string;
  code: string;
  title: string;
  location: string;
  priorityScore: number;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE';
  status: 'PENDING_ALLOCATION' | 'TEAM_ASSIGNED' | 'RESPONDING' | 'RESOLVED';
  statusLabel: string;
  reportedTime: string;
  affectedCount: string;
  lat: number;
  lng: number;
  disruption?: string;
  suggestedTeam?: string;
  originalRoute?: string;
  alternativeRoute?: string;
}

export interface ActivityEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'INCIDENT' | 'EVIDENCE' | 'ROUTE' | 'DISPATCH' | 'OPERATOR';
}

interface PrioritizedQueueProps {
  incidents: CommandIncident[];
  selectedIncidentId: string;
  onSelectIncident: (id: string) => void;
  events: ActivityEvent[];
}

export const PrioritizedQueueColumn: React.FC<PrioritizedQueueProps> = ({
  incidents,
  selectedIncidentId,
  onSelectIncident,
  events,
}) => {
  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Top Section: Prioritized Emergency Queue */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-card p-4 sm:p-5 flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                <AlertCircle className="h-4 w-4 text-red-600" />
                Prioritized Emergency Queue
              </h2>
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 font-mono">
                {incidents.length} Urgent
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Ranked by composite casualty risk & vulnerability
            </p>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
            <span>MCDA Score</span>
          </div>
        </div>

        {/* Incidents Vertical Stack */}
        <div className="space-y-2.5 mt-3 overflow-y-auto max-h-[380px] pr-1">
          {incidents.map((inc) => {
            const isSelected = inc.id === selectedIncidentId;
            const isCritical = inc.severity === 'CRITICAL';

            return (
              <div
                key={inc.id}
                onClick={() => onSelectIncident(inc.id)}
                className={cn(
                  'p-3.5 rounded-xl border transition-all cursor-pointer relative group',
                  isSelected
                    ? 'bg-blue-50/70 border-blue-500 shadow-sm ring-1 ring-blue-500/30'
                    : 'bg-white hover:bg-slate-50 border-slate-200/80 hover:border-slate-300'
                )}
              >
                {/* Header row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900">
                      {inc.code}
                    </span>
                    <span
                      className={cn(
                        'px-2 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider',
                        isCritical
                          ? 'bg-red-100 text-red-700 border border-red-200'
                          : 'bg-amber-100 text-amber-700 border border-amber-200'
                      )}
                    >
                      {inc.severity}
                    </span>
                  </div>

                  {/* Priority score pill */}
                  <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded font-mono text-xs font-bold text-slate-700">
                    <TrendingUp className="h-3 w-3 text-blue-600" />
                    <span>{inc.priorityScore}</span>
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-xs font-semibold text-slate-800 mt-1.5 line-clamp-1 group-hover:text-blue-700 transition-colors">
                  {inc.title}
                </h4>

                {/* Location & Time */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1 line-clamp-1">
                    <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                    <span>{inc.location}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 text-slate-400">
                    <Clock className="h-3 w-3" />
                    <span>{inc.reportedTime}</span>
                  </div>
                </div>

                {/* Status indicator */}
                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <span className={cn(
                    'inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-medium',
                    inc.status === 'TEAM_ASSIGNED' ? 'bg-blue-100 text-blue-700' :
                    inc.status === 'RESPONDING' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-amber-100 text-amber-700'
                  )}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {inc.statusLabel}
                  </span>

                  <span className="text-[10px] text-slate-400 font-mono">
                    {inc.affectedCount}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Recent Event Log */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-card p-4 sm:p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Recent Activity Timeline
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
            Real-time Feed
          </span>
        </div>

        {/* Timeline Items */}
        <div className="mt-3 space-y-3 overflow-y-auto max-h-[300px] pr-1">
          {events.map((evt) => (
            <div key={evt.id} className="flex gap-3 text-xs group">
              <div className="flex flex-col items-center">
                <span className={cn(
                  'w-2 h-2 rounded-full mt-1 shrink-0',
                  evt.type === 'ROUTE' ? 'bg-amber-500' :
                  evt.type === 'DISPATCH' ? 'bg-blue-600' :
                  evt.type === 'OPERATOR' ? 'bg-emerald-600' :
                  'bg-slate-400'
                )} />
                <span className="w-px h-full bg-slate-200 my-1 group-last:hidden" />
              </div>

              <div className="space-y-0.5 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800 text-[11px]">{evt.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{evt.time}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{evt.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
