import React, { useState } from 'react';
import { 
  BarChart3, 
  Sparkles, 
  Info,
  MapPin
} from 'lucide-react';

interface PriorityItem {
  id: string;
  code: string;
  title: string;
  location: string;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE';
  priorityScore: number;
  casualtyRisk: number; // 0 - 100
  vulnerabilityIndex: number; // 0 - 100
  timeUrgency: number; // 0 - 100
  accessibilityFactor: number; // 0 - 100
  evidenceConfidence: number; // 0.0 - 1.0
  rationale: string;
}

const PRIORITY_DATA: PriorityItem[] = [
  {
    id: 'pri-01',
    code: 'INC-204',
    title: 'District Hospital Generator Inundation Risk',
    location: 'Sector 4, West Canal Road',
    severity: 'CRITICAL',
    priorityScore: 94,
    casualtyRisk: 96,
    vulnerabilityIndex: 92,
    timeUrgency: 95,
    accessibilityFactor: 80,
    evidenceConfidence: 0.98,
    rationale: 'Extreme life-safety risk: 18 ICU patients dependent on continuous electrical ventilation. Inundation rate gives < 45 min window before backup power fails.',
  },
  {
    id: 'pri-02',
    code: 'INC-205',
    title: 'Passenger Vehicle Trapped in Railway Underpass',
    location: 'Sector 2 East, Main Subway',
    severity: 'CRITICAL',
    priorityScore: 88,
    casualtyRisk: 90,
    vulnerabilityIndex: 78,
    timeUrgency: 92,
    accessibilityFactor: 75,
    evidenceConfidence: 0.84,
    rationale: 'Active submersion: Water level rising rapidly at subway grade dip with 3 civilians trapped inside vehicle cabin.',
  },
  {
    id: 'pri-03',
    code: 'INC-209',
    title: 'Water Inundation at Senior Care Home',
    location: 'Sector 5, Lakeview Enclave',
    severity: 'MODERATE',
    priorityScore: 71,
    casualtyRisk: 65,
    vulnerabilityIndex: 90,
    timeUrgency: 68,
    accessibilityFactor: 60,
    evidenceConfidence: 0.42,
    rationale: 'High demographic vulnerability: 42 non-ambulatory elderly residents. Slower water ingress allows structured group evacuation transport.',
  },
];

export const PriorityAnalysisPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<PriorityItem>(PRIORITY_DATA[0]);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Explainable Priority Analysis (MCDA)
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Multi-Criteria Decision Analysis balancing casualty risk, demographic vulnerability, accessibility, and time urgency
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-mono font-semibold">
            MCDA Engine v2.0
          </span>
        </div>
      </div>

      {/* Main Priority Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Prioritized Incident List (col-span-7) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Computed Incident Priority Rankings</h2>
              <p className="text-xs text-slate-500">Ranked by composite Multi-Criteria Decision formulation</p>
            </div>
            <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              Prototype Formulation
            </span>
          </div>

          <div className="space-y-3">
            {PRIORITY_DATA.map((item, index) => {
              const isSelected = selectedItem.id === item.id;
              const isCritical = item.severity === 'CRITICAL';

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-500 ring-1 ring-blue-500/30 shadow-sm'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold font-mono text-xs flex items-center justify-center">
                        #{index + 1}
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-900">{item.code}</span>
                      <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                        isCritical ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.severity}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-mono">Score:</span>
                      <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200 text-sm">
                        {item.priorityScore} / 100
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 mt-2">{item.title}</h3>

                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                    <MapPin className="h-3 w-3 text-slate-400" />
                    <span>{item.location}</span>
                  </div>

                  {/* Factor mini breakdown bars */}
                  <div className="grid grid-cols-4 gap-2 mt-3 pt-2.5 border-t border-slate-100 text-[10px] font-mono text-slate-500">
                    <div>
                      <div className="text-slate-400">Casualty:</div>
                      <div className="font-bold text-slate-800">{item.casualtyRisk}%</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Vulnerability:</div>
                      <div className="font-bold text-slate-800">{item.vulnerabilityIndex}%</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Urgency:</div>
                      <div className="font-bold text-slate-800">{item.timeUrgency}%</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Confidence:</div>
                      <div className="font-bold text-slate-800">{(item.evidenceConfidence * 100).toFixed(0)}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Explainable Factor Breakdown (col-span-5) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-card p-5 space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              Factor Decomposition
            </span>
            <h2 className="text-sm font-bold text-slate-900 mt-1">
              {selectedItem.code} — Score Decomposition ({selectedItem.priorityScore}/100)
            </h2>
          </div>

          {/* Rationale explanation card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span>Coordinator Explanation</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedItem.rationale}
            </p>
          </div>

          {/* Factor Detail Bars */}
          <div className="space-y-3 pt-1">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-700">Casualty Risk (Weight: 40%):</span>
                <span className="font-mono font-bold text-slate-900">{selectedItem.casualtyRisk}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: `${selectedItem.casualtyRisk}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-700">Demographic Vulnerability (Weight: 30%):</span>
                <span className="font-mono font-bold text-slate-900">{selectedItem.vulnerabilityIndex}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${selectedItem.vulnerabilityIndex}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-700">Time Urgency (Weight: 30%):</span>
                <span className="font-mono font-bold text-slate-900">{selectedItem.timeUrgency}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${selectedItem.timeUrgency}%` }} />
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-100">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-700">Evidence Confidence (Multiplicative):</span>
                <span className="font-mono font-bold text-emerald-600">{(selectedItem.evidenceConfidence * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${selectedItem.evidenceConfidence * 100}%` }} />
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Separate from incident severity: Damps rumors to prevent premature dispatch without unproven evidence.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2">
            <Info className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
            <p>
              MCDA priorities provide advisory decision support. Final authorization remains under emergency coordinator discretion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
