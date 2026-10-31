import React, { useState } from 'react';
import { 
  History, 
  Search, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { mediaAuthenticityService } from '../../services/mediaAuthenticityService';

export const AnalysisHistorySubmodule: React.FC = () => {
  const reports = mediaAuthenticityService.getReports();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredReports = reports.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.trackingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.detectorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'ALL' || r.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <History className="h-5 w-5 text-blue-600" />
            Media Forensics Audit History
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Verifiable record of evaluated images, video files, transcripts, and C2PA manifests
          </p>
        </div>

        <span className="text-xs font-mono text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg">
          {reports.length} Records Logged
        </span>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-card">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search report tracking code, filename..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-center">
          {['ALL', 'IMAGE', 'VIDEO', 'TEXT', 'PROVENANCE'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'ALL' ? 'All' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {filteredReports.map((report) => {
          const isExpanded = expandedId === report.id;

          return (
            <div
              key={report.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden transition-all"
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : report.id)}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/60"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-700 font-mono text-xs font-bold shrink-0">
                    {report.trackingCode}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{report.title}</span>
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-100 text-slate-500 border border-slate-200">
                        {report.category}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Engine: {report.detectorName} • Submitted: {report.submittedAt}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                  {report.confidenceScore != null && (
                    <span className="text-xs font-mono text-slate-500">
                      Conf: {(report.confidenceScore * 100).toFixed(0)}%
                    </span>
                  )}

                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold font-mono ${
                      report.verdict === 'AUTHENTIC'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : report.verdict === 'SYNTHETIC_MANIPULATED'
                        ? 'bg-red-50 text-red-800 border border-red-300'
                        : 'bg-amber-50 text-amber-800 border border-amber-300'
                    }`}
                  >
                    {report.verdict.replace('_', ' ')}
                  </span>

                  {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                </div>
              </div>

              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-3 text-xs animate-fade-in">
                  <div>
                    <div className="font-bold text-slate-900 mb-1">Forensic Findings:</div>
                    <ul className="space-y-1 text-slate-600">
                      {report.findings.map((f, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {report.evidenceCrossReference && (
                    <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200 text-blue-900">
                      <span className="font-bold">Evidence Intelligence Impact: </span>
                      <span>{report.evidenceCrossReference.reliabilityImpact}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
