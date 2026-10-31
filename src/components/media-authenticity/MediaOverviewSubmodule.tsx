import React from 'react';
import { 
  ShieldCheck, 
  Image as ImageIcon, 
  Fingerprint, 
  ArrowRight,
  Server
} from 'lucide-react';
import { mediaAuthenticityService } from '../../services/mediaAuthenticityService';
import { MediaSubmodule } from '../../types/mediaAuthenticity';

interface MediaOverviewSubmoduleProps {
  onNavigateTab: (tab: MediaSubmodule) => void;
}

export const MediaOverviewSubmodule: React.FC<MediaOverviewSubmoduleProps> = ({
  onNavigateTab,
}) => {
  const workers = mediaAuthenticityService.getWorkers();
  const reports = mediaAuthenticityService.getReports();

  return (
    <div className="space-y-6">
      {/* 1. Situation & Purpose Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:p-7 shadow-card">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 font-mono text-xs font-semibold text-blue-700 border border-blue-200">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                DISASTER MEDIA INTEGRITY
              </span>
              <span className="text-xs text-slate-500 font-sans hidden sm:inline">
                Disinformation Damping & Deepfake Verification
              </span>
            </div>

            <h2 className="text-xl font-bold tracking-tight text-slate-900 font-sans">
              Media Authenticity & Provenance Verification
            </h2>

            <p className="text-xs text-slate-600 leading-relaxed">
              Verifies incoming disaster photos, citizen video clips, and forward chains before rescue units mobilize. Differentiates authentic ground-truth evidence from synthetic AI artifacts and viral panic rumors.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
            <button
              onClick={() => onNavigateTab('image')}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-semibold transition-all shadow-sm"
            >
              <ImageIcon className="h-4 w-4" />
              <span>Verify Image</span>
            </button>
            <button
              onClick={() => onNavigateTab('provenance')}
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 px-4 py-2 text-xs font-medium transition-colors"
            >
              <Fingerprint className="h-4 w-4 text-slate-600" />
              <span>Inspect C2PA Credentials</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Backend Detector Workers (Transparent Status) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Server className="h-4 w-4 text-blue-600" />
              Backend Detector Services
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live status for neural forensic image, video, text, and cryptographic C2PA verification workers.
            </p>
          </div>

          <span className="text-xs text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg font-mono">
            4 Detection Engines
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {workers.map((worker) => (
            <div
              key={worker.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col justify-between shadow-card hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {worker.category}
                  </span>
                  <span
                    className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
                      worker.status === 'ONLINE'
                        ? 'bg-emerald-100 text-emerald-800'
                        : worker.status === 'CONNECTING'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {worker.status}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900">{worker.name}</h4>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">{worker.modelEngine}</div>
                <p className="text-[11px] text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {worker.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 flex justify-between">
                <span>{worker.version}</span>
                <span className="font-mono text-blue-600">Port 8000</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Recent Analysis Reports Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent Media Forensics Log</h3>
            <p className="text-xs text-slate-500">Forensic evaluations logged into Evidence Intelligence</p>
          </div>

          <button
            onClick={() => onNavigateTab('history')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>View Full History</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {reports.slice(0, 4).map((report) => (
            <div
              key={report.id}
              className="p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-slate-900">{report.trackingCode}</span>
                <div>
                  <div className="font-semibold text-slate-900">{report.title}</div>
                  <div className="text-[11px] text-slate-500">{report.detectorName} • {report.submittedAt}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                {report.confidenceScore != null && (
                  <span className="font-mono text-[11px] text-slate-500">
                    Conf: {(report.confidenceScore * 100).toFixed(0)}%
                  </span>
                )}
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                    report.verdict === 'AUTHENTIC'
                      ? 'bg-emerald-100 text-emerald-800'
                      : report.verdict === 'SYNTHETIC_MANIPULATED'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {report.verdict.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
