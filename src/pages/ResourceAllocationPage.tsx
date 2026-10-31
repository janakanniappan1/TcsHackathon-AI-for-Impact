import React, { useState } from 'react';
import { 
  Truck, 
  ShieldCheck, 
  MapPin, 
  UserCheck
} from 'lucide-react';

interface EmergencyUnit {
  id: string;
  code: string;
  name: string;
  type: 'DE_WATERING' | 'RESCUE_BOAT' | 'MOBILE_POWER' | 'AMBULANCE' | 'POLICE_PATROL';
  typeLabel: string;
  station: string;
  capacitySummary: string;
  status: 'AVAILABLE' | 'DEPLOYED' | 'ASSIGNED' | 'MAINTENANCE';
  assignedIncidentCode?: string;
  etaMinutes?: number;
}

const INITIAL_UNITS: EmergencyUnit[] = [
  {
    id: 'unit-01',
    code: 'PT-02',
    name: 'High-Capacity De-Watering Pump Truck 02',
    type: 'DE_WATERING',
    typeLabel: 'Heavy Pump Truck',
    station: 'NDRF Field Station Sector 4',
    capacitySummary: '5,000 L/min Submersible Suction',
    status: 'ASSIGNED',
    assignedIncidentCode: 'INC-204',
    etaMinutes: 14,
  },
  {
    id: 'unit-02',
    code: 'MP-01',
    name: 'Mobile Generator Power Truck 01',
    type: 'MOBILE_POWER',
    typeLabel: 'Emergency Power Unit',
    station: 'Central Municipal Depot',
    capacitySummary: '250 kVA Diesel Generator Support',
    status: 'ASSIGNED',
    assignedIncidentCode: 'INC-204',
    etaMinutes: 18,
  },
  {
    id: 'unit-03',
    code: 'RB-02',
    name: 'Inflatable Flood Rescue Boat 02',
    type: 'RESCUE_BOAT',
    typeLabel: 'Rescue Boat Unit',
    station: 'SDRF Riverbase Station 1',
    capacitySummary: '8 Persons Rescue Capacity (Oars & Motor)',
    status: 'DEPLOYED',
    assignedIncidentCode: 'INC-205',
    etaMinutes: 6,
  },
  {
    id: 'unit-04',
    code: 'AMB-04',
    name: 'Advanced Life Support Ambulance 04',
    type: 'AMBULANCE',
    typeLabel: 'ALS Ambulance',
    station: 'District Trauma Centre',
    capacitySummary: 'Ventilator & Critical Paramedic Suite',
    status: 'DEPLOYED',
    assignedIncidentCode: 'INC-205',
    etaMinutes: 8,
  },
  {
    id: 'unit-05',
    code: 'PT-01',
    name: 'De-Watering Pump Unit 01',
    type: 'DE_WATERING',
    typeLabel: 'Heavy Pump Truck',
    station: 'North Sector Fire Depot',
    capacitySummary: '3,500 L/min High-Head Pump',
    status: 'AVAILABLE',
  },
  {
    id: 'unit-06',
    code: 'SCOUT-07',
    name: 'Police Rapid Patrol Scout 07',
    type: 'POLICE_PATROL',
    typeLabel: 'Patrol Vehicle',
    station: 'Sector 5 Police Station',
    capacitySummary: 'All-Terrain 4WD Mobility',
    status: 'AVAILABLE',
  },
];

export const ResourceAllocationPage: React.FC = () => {
  const [units] = useState<EmergencyUnit[]>(INITIAL_UNITS);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [selectedUnit, setSelectedUnit] = useState<EmergencyUnit>(INITIAL_UNITS[0]);
  const [authorizedUnits, setAuthorizedUnits] = useState<{ [id: string]: boolean }>({ 'unit-01': true, 'unit-02': true });

  const availableCount = units.filter(u => u.status === 'AVAILABLE').length;
  const deployedCount = units.filter(u => u.status === 'DEPLOYED' || u.status === 'ASSIGNED').length;

  const filteredUnits = units.filter(u => filterType === 'ALL' || u.type === filterType);

  const handleToggleAuthorize = (id: string) => {
    setAuthorizedUnits(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Resource Allocation & Unit Coordination
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Eligible fleet matching, capacity constraints, and human-in-the-loop dispatch authorization
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            {availableCount} Units Available
          </span>
          <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
            {deployedCount} Active Dispatches
          </span>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Fleet Inventory Table (col-span-8) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Emergency Response Fleet Roster</h2>
              <p className="text-xs text-slate-500">Real-time unit readiness and assignment state</p>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-1">
              {['ALL', 'DE_WATERING', 'RESCUE_BOAT', 'MOBILE_POWER'].map(t => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-colors ${
                    filterType === t
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t === 'ALL' ? 'All Units' : t.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            {filteredUnits.map(unit => {
              const isSelected = selectedUnit.id === unit.id;
              const isAvail = unit.status === 'AVAILABLE';

              return (
                <div
                  key={unit.id}
                  onClick={() => setSelectedUnit(unit)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-400 ring-1 ring-blue-400/20 shadow-sm'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl text-white font-bold text-xs shrink-0 ${
                      unit.type === 'DE_WATERING' ? 'bg-blue-600' :
                      unit.type === 'RESCUE_BOAT' ? 'bg-emerald-600' :
                      unit.type === 'MOBILE_POWER' ? 'bg-amber-600' :
                      'bg-purple-600'
                    }`}>
                      {unit.code}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{unit.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({unit.typeLabel})</span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        <span>{unit.station}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="text-right text-[11px]">
                      <div className="font-semibold text-slate-800">{unit.capacitySummary}</div>
                      {unit.assignedIncidentCode && (
                        <div className="text-blue-600 font-mono text-[10px]">
                          Assigned: {unit.assignedIncidentCode} (ETA {unit.etaMinutes}m)
                        </div>
                      )}
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider shrink-0 ${
                      isAvail ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      {unit.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Allocation Detail & Operator Authorization (col-span-4) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-card p-5 space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              Unit Specification
            </span>
            <h2 className="text-sm font-bold text-slate-900 mt-1">
              {selectedUnit.code} — {selectedUnit.typeLabel}
            </h2>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Unit Identification:</span>
              <span className="font-bold text-slate-900">{selectedUnit.code}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Base Depot:</span>
              <span className="font-medium text-slate-800">{selectedUnit.station}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Capacity Profile:</span>
              <span className="font-semibold text-slate-800">{selectedUnit.capacitySummary}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Current Status:</span>
              <span className="font-bold font-mono text-blue-600">{selectedUnit.status}</span>
            </div>
            {selectedUnit.assignedIncidentCode && (
              <div className="flex justify-between pt-1 border-t border-slate-200">
                <span className="text-slate-500">Target Assignment:</span>
                <span className="font-bold text-red-600">{selectedUnit.assignedIncidentCode}</span>
              </div>
            )}
          </div>

          {/* Allocation Recommendation */}
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
            <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span>Coordinator Authorization State</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {authorizedUnits[selectedUnit.id]
                ? 'Dispatch authorized by Emergency Operations Coordinator. Movement tracking active.'
                : 'Unit assignment pending coordinator sign-off before field mobilization.'}
            </p>

            <button
              onClick={() => handleToggleAuthorize(selectedUnit.id)}
              className={`w-full py-2 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                authorizedUnits[selectedUnit.id]
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>{authorizedUnits[selectedUnit.id] ? 'Authorized (Click to Revoke)' : 'Authorize Unit Dispatch'}</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500">
            Constraint Rule: Units cannot be double-allocated while on active response routes.
          </div>
        </div>
      </div>
    </div>
  );
};
