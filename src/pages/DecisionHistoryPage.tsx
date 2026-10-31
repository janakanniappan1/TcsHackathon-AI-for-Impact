import React, { useState } from 'react';
import { 
  History, 
  Search, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp
} from 'lucide-react';

interface DecisionRecord {
  id: string;
  code: string;
  incidentCode: string;
  incidentTitle: string;
  decisionType: 'DISPATCH_ALLOCATION' | 'ROUTE_REPLAN' | 'PRIORITY_EVALUATION' | 'SHELTER_EXPANSION';
  decisionTypeLabel: string;
  recommendedAction: string;
  operatorAction: 'APPROVED' | 'OVERRIDDEN' | 'PENDING';
  operatorName: string;
  timestamp: string;
  rationale: string;
  evidenceWeight: string;
}

const HISTORICAL_DECISIONS: DecisionRecord[] = [
  {
    id: 'dec-101',
    code: 'DEC-401',
    incidentCode: 'INC-204',
    incidentTitle: 'District Hospital Generator Inundation Risk',
    decisionType: 'ROUTE_REPLAN',
    decisionTypeLabel: 'Dynamic Route Replanning',
    recommendedAction: 'Reroute Pump Truck PT-02 via Eastern Flyover Bypass (+4 min, +3.8 km) due to 1.2m water on West Canal Road.',
    operatorAction: 'APPROVED',
    operatorName: 'EOC Officer (Authorized)',
    timestamp: 'Today, 10:14',
    rationale: 'Avoids impassable low-lying canal basin; guarantees equipment arrival before ICU generator battery depletion.',
    evidenceWeight: 'Official Field Radio (w=1.00) + Hydro Sensor S-12 (w=0.88)',
  },
  {
    id: 'dec-102',
    code: 'DEC-402',
    incidentCode: 'INC-204',
    incidentTitle: 'District Hospital Generator Inundation Risk',
    decisionType: 'DISPATCH_ALLOCATION',
    decisionTypeLabel: 'Resource Fleet Dispatch',
    recommendedAction: 'Deploy High-Capacity Pump Truck PT-02 and Mobile Generator MP-01 simultaneously.',
    operatorAction: 'APPROVED',
    operatorName: 'EOC Officer (Authorized)',
    timestamp: 'Today, 09:58',
    rationale: 'Combined de-watering and auxiliary power needed to keep ventilator support active.',
    evidenceWeight: 'Tier 1 Official NDRF Report (w=1.00)',
  },
  {
    id: 'dec-103',
    code: 'DEC-403',
    incidentCode: 'INC-205',
    incidentTitle: 'Passenger Vehicle Trapped in Railway Underpass',
    decisionType: 'DISPATCH_ALLOCATION',
    decisionTypeLabel: 'Water Rescue Dispatch',
    recommendedAction: 'Dispatch Rescue Boat RB-02 and 1 Advanced Life Support Ambulance AMB-04.',
    operatorAction: 'APPROVED',
    operatorName: 'EOC Officer (Authorized)',
    timestamp: 'Today, 09:36',
    rationale: 'Subway water level at 1.4m; 3 civilians inside vehicle require immediate boat extraction.',
    evidenceWeight: '112 Emergency Helpline (w=0.76)',
  },
  {
    id: 'dec-104',
    code: 'DEC-404',
    incidentCode: 'INC-208',
    incidentTitle: 'Dam Gate Opening Viral Broadcast',
    decisionType: 'PRIORITY_EVALUATION',
    decisionTypeLabel: 'Rumor Damping & Priority Nullification',
    recommendedAction: 'Withhold heavy convoy deployment to Sector 1 dam spillway; classify broadcast as uncorroborated disinformation.',
    operatorAction: 'APPROVED',
    operatorName: 'EOC Officer (Authorized)',
    timestamp: 'Today, 09:22',
    rationale: 'Dam hydro-telemetry confirms spillway gates regulated at 15%. Prevented unnecessary diversion of emergency teams.',
    evidenceWeight: 'Fast-DetectGPT Negative Curvature + State Irrigation Telemetry',
  },
];

export const DecisionHistoryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAction, setFilterAction] = useState<string>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>('dec-101');

  const filteredDecisions = HISTORICAL_DECISIONS.filter(d => {
    const matchesSearch = d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.incidentCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.incidentTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = filterAction === 'ALL' || d.operatorAction === filterAction;
    return matchesSearch && matchesAction;
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <History className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Decision History & Operational Audit Trail
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Verifiable record of agentic AI recommendations, operator approvals, and evidence basis
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-mono font-semibold">
            {HISTORICAL_DECISIONS.length} Audited Logs
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-card">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by decision ID, incident code, title..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-center">
          {['ALL', 'APPROVED', 'OVERRIDDEN'].map(action => (
            <button
              key={action}
              onClick={() => setFilterAction(action)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                filterAction === action
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {action === 'ALL' ? 'All Actions' : action}
            </button>
          ))}
        </div>
      </div>

      {/* Decision Audit List */}
      <div className="space-y-3">
        {filteredDecisions.map((decision) => {
          const isExpanded = expandedId === decision.id;

          return (
            <div
              key={decision.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden transition-all"
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : decision.id)}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/60"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-700 font-mono text-xs font-bold shrink-0">
                    {decision.code}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900">{decision.incidentCode}</span>
                      <span className="text-xs font-bold text-slate-800">{decision.incidentTitle}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {decision.decisionTypeLabel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1">{decision.recommendedAction}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>{decision.operatorAction}</span>
                  </span>

                  <span className="text-xs text-slate-400 font-mono">{decision.timestamp}</span>

                  {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                </div>
              </div>

              {/* Expanded Detail Panel */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-3 text-xs animate-fade-in">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <div className="font-bold text-slate-900">Recommended Action Plan:</div>
                    <p className="text-slate-700 leading-relaxed">{decision.recommendedAction}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-900">Explainable Decision Rationale:</div>
                      <p className="text-slate-600 leading-relaxed">{decision.rationale}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-900">Underlying Evidence Basis:</div>
                      <p className="text-slate-600 leading-relaxed">{decision.evidenceWeight}</p>
                      <div className="pt-1 text-[11px] text-slate-400">Sign-off by: {decision.operatorName}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
