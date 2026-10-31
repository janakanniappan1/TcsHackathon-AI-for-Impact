import React, { useState } from 'react';
import { 
  FileCheck2, 
  Fingerprint, 
  AlertTriangle, 
  Radio, 
  Cpu, 
  PhoneCall, 
  MessageSquare, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { mediaAuthenticityService } from '../services/mediaAuthenticityService';

interface EvidenceItem {
  id: string;
  code: string;
  incidentCode: string;
  sourceCategory: 'OFFICIAL_FIELD' | 'IOT_SENSOR' | 'HELPLINE' | 'CITIZEN_SOS' | 'SOCIAL_RUMOR';
  sourceCategoryLabel: string;
  sourceDescription: string;
  receivedTime: string;
  lastVerifiedTime: string;
  status: 'VERIFIED' | 'UNDER_EVALUATION' | 'CONFLICTING' | 'DAMPED_RUMOR';
  reliabilityScore: number;
  weight: number;
  summary: string;
  supportingReports: number;
  conflictingReports: number;
  corroborationDetails: string;
}

const EVIDENCE_FEED: EvidenceItem[] = [
  {
    id: 'ev-01',
    code: 'EVD-101',
    incidentCode: 'INC-204',
    sourceCategory: 'OFFICIAL_FIELD',
    sourceCategoryLabel: 'Official Field Radio',
    sourceDescription: 'NDRF Unit Beta Commander (Tactical Channel 2)',
    receivedTime: '12m ago',
    lastVerifiedTime: '3m ago',
    status: 'VERIFIED',
    reliabilityScore: 0.98,
    weight: 1.00,
    summary: 'Water entry in basement generator vault confirmed on-site; emergency pumps requested immediately.',
    supportingReports: 3,
    conflictingReports: 0,
    corroborationDetails: 'Corroborated by S-12 hydro-telemetry and on-ground police patrol.',
  },
  {
    id: 'ev-02',
    code: 'EVD-102',
    incidentCode: 'INC-204',
    sourceCategory: 'IOT_SENSOR',
    sourceCategoryLabel: 'IoT Hydro Sensor',
    sourceDescription: 'Basin Gauge Sensor S-12 (West Canal)',
    receivedTime: '18m ago',
    lastVerifiedTime: '2m ago',
    status: 'VERIFIED',
    reliabilityScore: 0.92,
    weight: 0.88,
    summary: 'Water depth crossed critical threshold (1.24m). Trend rate +8 cm / 15 mins.',
    supportingReports: 2,
    conflictingReports: 0,
    corroborationDetails: 'Continuous calibrated telemetry matching official radio field observation.',
  },
  {
    id: 'ev-03',
    code: 'EVD-103',
    incidentCode: 'INC-205',
    sourceCategory: 'HELPLINE',
    sourceCategoryLabel: '112 Emergency Helpline',
    sourceDescription: 'Operator Triaged Citizen Distress Call',
    receivedTime: '24m ago',
    lastVerifiedTime: '8m ago',
    status: 'VERIFIED',
    reliabilityScore: 0.84,
    weight: 0.76,
    summary: 'Passenger sedan stalled under railway bridge; water reaching car door handle; 3 occupants inside.',
    supportingReports: 2,
    conflictingReports: 0,
    corroborationDetails: 'Corroborated by second motorist call 6 minutes later from railway junction.',
  },
  {
    id: 'ev-04',
    code: 'EVD-104',
    incidentCode: 'INC-209',
    sourceCategory: 'CITIZEN_SOS',
    sourceCategoryLabel: 'Citizen SOS / WhatsApp',
    sourceDescription: 'Public WhatsApp Forward Group (Single Source)',
    receivedTime: '38m ago',
    lastVerifiedTime: '14m ago',
    status: 'UNDER_EVALUATION',
    reliabilityScore: 0.42,
    weight: 0.42,
    summary: 'Water entering ground floor rooms at Senior Care Home. Elder evacuation needed.',
    supportingReports: 1,
    conflictingReports: 0,
    corroborationDetails: 'Scout police unit deployed to ground for confirmation before heavy vehicle dispatch.',
  },
  {
    id: 'ev-05',
    code: 'EVD-105',
    incidentCode: 'INC-208',
    sourceCategory: 'SOCIAL_RUMOR',
    sourceCategoryLabel: 'Social Media Rumor',
    sourceDescription: 'Viral Social Media Broadcast ("Dam Gates Opened")',
    receivedTime: '55m ago',
    lastVerifiedTime: '20m ago',
    status: 'DAMPED_RUMOR',
    reliabilityScore: 0.05,
    weight: 0.22,
    summary: 'Claims that all upstream dam spillways were opened at 09:00 causing 15ft tidal wave.',
    supportingReports: 0,
    conflictingReports: 3,
    corroborationDetails: 'Directly contradicted by State Irrigation Telemetry showing gates closed and regulated at 15%.',
  },
];

export const EvidenceIntelligencePage: React.FC = () => {
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem>(EVIDENCE_FEED[0]);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const reports = mediaAuthenticityService.getReports();

  const filteredEvidence = EVIDENCE_FEED.filter(e => 
    filterCategory === 'ALL' || e.sourceCategory === filterCategory
  );

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Evidence Intelligence & Trust Corroboration
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Bayesian multi-source evidence weighting, conflicting signal detection, and source credibility verification
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-mono font-semibold">
            5-Tier Verification Hierarchy
          </span>
        </div>
      </div>

      {/* 5-Tier Hierarchy Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">Tier 1 • w=1.00</span>
            <Radio className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-xs font-bold text-slate-900">Official Field Radio</div>
          <p className="text-[11px] text-slate-500">NDRF & Police verified on-scene telemetry</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Tier 2 • w=0.88</span>
            <Cpu className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-xs font-bold text-slate-900">IoT Sensors</div>
          <p className="text-[11px] text-slate-500">Calibrated hydro-gauges & weather radar</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">Tier 3 • w=0.76</span>
            <PhoneCall className="h-4 w-4 text-sky-600" />
          </div>
          <div className="text-xs font-bold text-slate-900">112 Helpline Call</div>
          <p className="text-[11px] text-slate-500">Triaged citizen calls via emergency operators</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Tier 4 • w=0.42</span>
            <MessageSquare className="h-4 w-4 text-amber-600" />
          </div>
          <div className="text-xs font-bold text-slate-900">Citizen SOS</div>
          <p className="text-[11px] text-slate-500">Uncorroborated public WhatsApp broadcasts</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded">Tier 5 • w=0.22</span>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </div>
          <div className="text-xs font-bold text-slate-900">Social Rumors</div>
          <p className="text-[11px] text-slate-500">Damped social posts without spatial cluster</p>
        </div>
      </div>

      {/* Main Evidence Feed & Inspection Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Evidence Stream Table (col-span-7) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Live Incoming Evidence Feed</h2>
              <p className="text-xs text-slate-500">Select an evidence item to inspect Bayesian corroboration</p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1">
              {['ALL', 'OFFICIAL_FIELD', 'IOT_SENSOR', 'CITIZEN_SOS'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                    filterCategory === cat
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'ALL' ? 'All' : cat.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Evidence Cards List */}
          <div className="space-y-3">
            {filteredEvidence.map((ev) => {
              const isSelected = selectedEvidence.id === ev.id;
              return (
                <div
                  key={ev.id}
                  onClick={() => setSelectedEvidence(ev)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-400 ring-1 ring-blue-400/30 shadow-sm'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900">{ev.code}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {ev.incidentCode}
                      </span>
                      <span className="text-xs font-semibold text-slate-700">{ev.sourceCategoryLabel}</span>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                      ev.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' :
                      ev.status === 'DAMPED_RUMOR' ? 'bg-red-100 text-red-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {ev.status.replace('_', ' ')}
                    </span>
                  </div>

                  <p className="text-xs text-slate-800 mt-2 font-medium leading-relaxed">{ev.summary}</p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
                    <div>Source: {ev.sourceDescription}</div>
                    <div className="flex items-center gap-3">
                      <span>Reliability: {(ev.reliabilityScore * 100).toFixed(0)}%</span>
                      <span>{ev.receivedTime}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Evidence Deep Investigation & Corroboration Details (col-span-5) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-card p-5 space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              Corroboration Analysis
            </span>
            <h2 className="text-sm font-bold text-slate-900 mt-1">
              {selectedEvidence.code} — {selectedEvidence.sourceCategoryLabel}
            </h2>
          </div>

          {/* Reliability Score Bar */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Bayesian Evidence Reliability:</span>
              <span className="font-mono font-bold text-blue-600 text-sm">
                {(selectedEvidence.reliabilityScore * 100).toFixed(0)}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${selectedEvidence.reliabilityScore * 100}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-400 font-mono flex justify-between">
              <span>Weight: w={selectedEvidence.weight.toFixed(2)}</span>
              <span>Updated: {selectedEvidence.lastVerifiedTime}</span>
            </div>
          </div>

          {/* Corroboration Summary */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Multi-Source Corroboration Status</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedEvidence.corroborationDetails}
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-center">
                <div className="font-bold">{selectedEvidence.supportingReports}</div>
                <div className="text-[10px]">Supporting Proofs</div>
              </div>

              <div className="p-2 rounded-lg bg-slate-50 text-slate-600 border border-slate-200 text-center">
                <div className="font-bold">{selectedEvidence.conflictingReports}</div>
                <div className="text-[10px]">Conflicting Claims</div>
              </div>
            </div>
          </div>

          {/* Media Authenticity Cross-Link */}
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <Fingerprint className="h-4 w-4 text-blue-600" />
                <span>Media Authenticity Verification</span>
              </div>
              <span className="text-[10px] font-mono text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded font-bold">
                {reports.length} Reports Logged
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Forensic neural artifact evaluations (Lynote UnivFD) and cryptographic C2PA provenance records feed directly into Bayesian weight adjustments.
            </p>
            <Link
              to="/media-authenticity"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 pt-1"
            >
              <span>Open Media Authenticity Workspace</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
