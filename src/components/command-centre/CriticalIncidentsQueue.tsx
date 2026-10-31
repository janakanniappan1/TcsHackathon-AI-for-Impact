import React, { useState } from 'react';
import { 
  AlertCircle, 
  MapPin, 
  CheckCircle2, 
  UserCheck, 
  Clock, 
  Truck, 
  ShieldCheck,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { SeverityBadge } from '../common/SeverityBadge';

interface CriticalIncidentItem {
  id: string;
  code: string;
  title: string;
  location: string;
  reportedTime: string;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE';
  verificationSource: string;
  verificationTier: string;
  isOperatorVerified: boolean;
  affectedSummary: string;
  suggestedAction: string;
  recommendedUnits: string[];
  status: 'AWAITING_APPROVAL' | 'APPROVED' | 'PENDING_VERIFICATION';
}

const INITIAL_CRITICAL_INCIDENTS: CriticalIncidentItem[] = [
  {
    id: 'inc-01',
    code: 'INC-204',
    title: 'District Hospital Generator Inundation Risk',
    location: 'Sector 4, West Canal Road',
    reportedTime: '12 mins ago',
    severity: 'CRITICAL',
    verificationSource: 'Official Field Radio (NDRF Station 2)',
    verificationTier: 'Verified Official Report',
    isOperatorVerified: true,
    affectedSummary: 'Water entering hospital basement generator room; 18 ICU patients on critical ventilator support.',
    suggestedAction: 'Deploy 1 High-Capacity De-Watering Team and 2 Mobile Generator Trucks.',
    recommendedUnits: ['Pump Truck PT-02', 'Mobile Power MP-01'],
    status: 'AWAITING_APPROVAL',
  },
  {
    id: 'inc-02',
    code: 'INC-205',
    title: 'Passenger Vehicle Trapped in Railway Underpass',
    location: 'Sector 2 East, Main Subway',
    reportedTime: '24 mins ago',
    severity: 'CRITICAL',
    verificationSource: 'Emergency 112 Helpline Call (Operator Triaged)',
    verificationTier: 'Verified Helpline Call',
    isOperatorVerified: true,
    affectedSummary: 'Rising water level reaching vehicle window line; 3 passengers trapped inside vehicle.',
    suggestedAction: 'Dispatch Rescue Boat 02 and 1 Advanced Life Support Ambulance via elevated bypass.',
    recommendedUnits: ['Rescue Boat RB-02', 'Ambulance AMB-04'],
    status: 'AWAITING_APPROVAL',
  },
  {
    id: 'inc-03',
    code: 'INC-209',
    title: 'Reported Water Inundation at Senior Care Home',
    location: 'Sector 5, Lakeview Enclave',
    reportedTime: '38 mins ago',
    severity: 'MODERATE',
    verificationSource: 'Citizen SOS via WhatsApp (Single Report)',
    verificationTier: 'Pending Verification',
    isOperatorVerified: false,
    affectedSummary: 'Ground floor water ingress reported; unverified citizen post requesting transport support.',
    suggestedAction: 'Deploy nearby police patrol unit to verify on-site before mobilizing heavy rescue teams.',
    recommendedUnits: ['Police Patrol Scout 07'],
    status: 'PENDING_VERIFICATION',
  },
];

export const CriticalIncidentsQueue: React.FC = () => {
  const [incidents, setIncidents] = useState<CriticalIncidentItem[]>(INITIAL_CRITICAL_INCIDENTS);
  const [signedOffId, setSignedOffId] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    setIncidents(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: 'APPROVED' } : item
      )
    );
    setSignedOffId(id);
    setTimeout(() => setSignedOffId(null), 3000);
  };

  return (
    <div className="space-y-4" id="critical-incidents-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-400" />
            Urgent Incidents Requiring Coordinator Attention
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Consequential dispatches remain held until confirmed by the incident coordinator.
          </p>
        </div>

        <span className="text-xs text-slate-400 bg-sentinel-900 border border-sentinel-800 px-3 py-1.5 rounded-lg font-mono">
          {incidents.filter(i => i.status === 'AWAITING_APPROVAL').length} Pending Human Sign-Off
        </span>
      </div>

      <div className="space-y-4">
        {incidents.map((incident) => {
          const isPending = incident.status === 'AWAITING_APPROVAL';
          const isApproved = incident.status === 'APPROVED';

          return (
            <div
              key={incident.id}
              className={`rounded-2xl border transition-all p-5 lg:p-6 ${
                isApproved
                  ? 'border-emerald-500/40 bg-sentinel-900/60'
                  : incident.severity === 'CRITICAL'
                  ? 'border-red-500/40 bg-gradient-to-r from-sentinel-900 via-sentinel-900 to-sentinel-850 shadow-md'
                  : 'border-sentinel-700/80 bg-sentinel-900/90'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Left: Incident Details */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-slate-300">
                      {incident.code}
                    </span>
                    <SeverityBadge severity={incident.severity} size="sm" />
                    
                    <span className="flex items-center gap-1 text-xs text-slate-400 font-sans">
                      <Clock className="h-3 w-3" />
                      {incident.reportedTime}
                    </span>

                    {incident.isOperatorVerified ? (
                      <span className="inline-flex items-center gap-1 rounded bg-teal-500/10 px-2 py-0.5 text-[11px] font-medium text-teal-300 border border-teal-500/20">
                        <ShieldCheck className="h-3 w-3 text-teal-400" />
                        {incident.verificationTier}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-300 border border-amber-500/20">
                        <HelpCircle className="h-3 w-3 text-amber-400" />
                        {incident.verificationTier}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-semibold text-white">
                    {incident.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                    <MapPin className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                    <span>{incident.location}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {incident.affectedSummary}
                  </p>

                  {/* AI Recommendation in Plain English */}
                  <div className="mt-3 rounded-xl bg-sentinel-950/80 border border-sentinel-800 p-3 text-xs">
                    <span className="text-teal-300 font-medium font-sans">
                      Suggested Action:
                    </span>
                    <span className="text-slate-300 ml-1.5 font-sans">
                      {incident.suggestedAction}
                    </span>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] text-slate-400">Assigned units:</span>
                      {incident.recommendedUnits.map((unit) => (
                        <span
                          key={unit}
                          className="inline-flex items-center gap-1 rounded bg-sentinel-800 px-2 py-0.5 font-mono text-[11px] text-slate-200 border border-sentinel-700"
                        >
                          <Truck className="h-3 w-3 text-teal-400" />
                          {unit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Human Sign-off CTA */}
                <div className="flex flex-col items-start lg:items-end justify-between self-stretch gap-3 border-t lg:border-t-0 lg:border-l border-sentinel-800 pt-3 lg:pt-0 lg:pl-6 min-w-[200px]">
                  {isApproved ? (
                    <div className="flex items-center gap-2 text-emerald-400 font-medium text-xs bg-emerald-500/10 border border-emerald-500/30 px-3 py-2 rounded-xl">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Approved by Coordinator</span>
                    </div>
                  ) : isPending ? (
                    <div className="space-y-2 w-full">
                      <div className="text-[11px] text-amber-300 font-medium flex items-center gap-1">
                        <UserCheck className="h-3.5 w-3.5" />
                        <span>Sign-off Required</span>
                      </div>
                      <button
                        onClick={() => handleApprove(incident.id)}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-sentinel-950 px-4 py-2.5 text-xs font-semibold shadow-md transition-all"
                      >
                        <span>Approve Dispatch</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400">
                      <span>Awaiting verification before unit commitment</span>
                    </div>
                  )}

                  {signedOffId === incident.id && (
                    <span className="text-[11px] font-mono text-emerald-300 animate-fade-in">
                      Logged to Decision History
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

