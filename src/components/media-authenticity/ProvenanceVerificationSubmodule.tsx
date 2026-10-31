import React, { useState } from 'react';
import { 
  Fingerprint, 
  UploadCloud, 
  Info, 
  Loader2 
} from 'lucide-react';
import { mediaAuthenticityService } from '../../services/mediaAuthenticityService';
import { MediaAnalysisReport } from '../../types/mediaAuthenticity';

export const ProvenanceVerificationSubmodule: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [report, setReport] = useState<MediaAnalysisReport | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setReport(null);
      setStatusMessage(null);
    }
  };

  const handleVerify = async () => {
    if (!selectedFile) return;
    setIsVerifying(true);
    setStatusMessage(null);

    const result = await mediaAuthenticityService.submitForAnalysis(
      selectedFile,
      null,
      'C2PA_PROVENANCE'
    );

    setIsVerifying(false);
    if (result.submittedReport) {
      setReport(result.submittedReport);
    }
    setStatusMessage(result.statusNote);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Fingerprint className="h-5 w-5 text-blue-600" />
            C2PA Provenance & Cryptographic Attestation Verification
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Parses Content Credentials, JUMBF assertion boxes, and X.509 signature chains via official C2PA SDK
          </p>
        </div>

        <span className="text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-lg font-semibold">
          c2pa-python SDK Active
        </span>
      </div>

      {/* Upload Box */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Submit Media File to Validate Embedded Content Credentials
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Checks for authentic camera hardware cryptographic attestations and official emergency agency signatures.
          </p>
        </div>

        <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-blue-50/40 hover:border-blue-400 cursor-pointer transition-all">
          <UploadCloud className="h-10 w-10 text-blue-500 mb-2" />
          <span className="text-xs font-semibold text-slate-800">
            {selectedFile ? selectedFile.name : 'Click to select or drag and drop image/video'}
          </span>
          <span className="text-[11px] text-slate-400 mt-1">
            Supports JPEG, PNG, MP4, WebP
          </span>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          <div className="text-xs text-slate-500">
            {selectedFile && `Selected: ${selectedFile.name} (${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)`}
          </div>

          <button
            onClick={handleVerify}
            disabled={!selectedFile || isVerifying}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-2"
          >
            {isVerifying ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Reading Manifest...</span>
              </>
            ) : (
              <span>Verify C2PA Provenance</span>
            )}
          </button>
        </div>

        {statusMessage && (
          <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-xs text-blue-900 flex items-start gap-3">
            <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold block">Provenance Verification Result:</span>
              <p className="text-slate-600 leading-relaxed">{statusMessage}</p>
            </div>
          </div>
        )}
      </div>

      {/* Verified Provenance Card */}
      {report && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-panel space-y-4 animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono font-bold text-slate-900">{report.trackingCode}</span>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5">{report.title}</h3>
            </div>

            <span className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono ${
              report.verdict === 'AUTHENTIC'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-amber-100 text-amber-800 border border-amber-300'
            }`}>
              {report.verdict === 'AUTHENTIC' ? 'CRYPTOGRAPHICALLY VALID' : 'UNSIGNED / INCONCLUSIVE'}
            </span>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-800">Manifest Assessment:</div>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {report.findings.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold shrink-0">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {report.c2paDetails && (
              <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-1 text-slate-700">
                <div>Manifest Container: {report.c2paDetails.isSigned ? 'Present (JUMBF embedded)' : 'None detected'}</div>
                <div>Signature Status: {report.c2paDetails.signatureStatus}</div>
                {report.c2paDetails.claimGenerator && (
                  <div>Generator: {report.c2paDetails.claimGenerator}</div>
                )}
                {report.c2paDetails.issuer && (
                  <div>Issuer: {report.c2paDetails.issuer}</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
