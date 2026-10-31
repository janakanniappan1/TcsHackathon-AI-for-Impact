import React, { useState } from 'react';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Sliders, 
  ChevronDown, 
  ChevronUp, 
  Loader2
} from 'lucide-react';
import { mediaAuthenticityService, REFERENCE_SPECIMENS } from '../../services/mediaAuthenticityService';
import { MediaAnalysisReport } from '../../types/mediaAuthenticity';

export const ImageAnalysisSubmodule: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentReport, setCurrentReport] = useState<MediaAnalysisReport | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isLiveBackend, setIsLiveBackend] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  const referenceSpecimen = REFERENCE_SPECIMENS.find(s => s.category === 'IMAGE');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setCurrentReport(null);
      setStatusMessage(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setStatusMessage(null);

    const result = await mediaAuthenticityService.submitForAnalysis(
      selectedFile,
      null,
      'LYNOTE_IMAGE'
    );

    setIsAnalyzing(false);
    if (result.submittedReport) {
      setCurrentReport(result.submittedReport);
    }
    setStatusMessage(result.statusNote);
    setIsLiveBackend(result.isLiveBackend);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-blue-600" />
            Image Authenticity Analysis (Lynote AI UnivFD)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Evaluates visual manifold embeddings via OpenCLIP ViT-L-14 and trained linear detection head
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg">
            Backend Port: 8000
          </span>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Submit Disaster Photo for Forensic Verification
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload citizen reports, social media posts, or drone images showing flooded bridges or collapsed structures.
          </p>
        </div>

        {/* Dropzone */}
        <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-blue-50/40 hover:border-blue-400 cursor-pointer transition-all">
          <UploadCloud className="h-10 w-10 text-blue-500 mb-2" />
          <span className="text-xs font-semibold text-slate-800">
            {selectedFile ? selectedFile.name : 'Click to select or drag and drop disaster photo'}
          </span>
          <span className="text-[11px] text-slate-400 mt-1">
            Supports JPEG, PNG, WebP (Max 25 MB)
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          <div className="text-xs text-slate-500">
            {selectedFile && `Selected: ${selectedFile.name} (${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)`}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!selectedFile || isAnalyzing}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Running Lynote Inference...</span>
              </>
            ) : (
              <span>Analyze Image Authenticity</span>
            )}
          </button>
        </div>

        {/* Status Alert */}
        {statusMessage && (
          <div className={`rounded-xl border p-3.5 text-xs flex items-start gap-3 ${
            isLiveBackend && currentReport
              ? 'bg-blue-50/70 border-blue-200 text-slate-800'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            <Info className={`h-4 w-4 shrink-0 mt-0.5 ${isLiveBackend && currentReport ? 'text-blue-600' : 'text-amber-600'}`} />
            <div className="space-y-0.5">
              <span className="font-bold block">
                {isLiveBackend && currentReport ? 'Live Backend Execution:' : 'System Integrity Standard:'}
              </span>
              <p className="text-slate-600 leading-relaxed">{statusMessage}</p>
            </div>
          </div>
        )}
      </div>

      {/* Live Result Card */}
      {currentReport && (
        <div className="rounded-2xl border border-blue-200 bg-white p-6 shadow-panel animate-fade-in space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-900">{currentReport.trackingCode}</span>
                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-mono text-[10px] font-bold">
                  ANALYSIS COMPLETE
                </span>
                {currentReport.confidenceScore != null && (
                  <span className="text-xs font-mono font-bold text-blue-600">
                    Confidence: {(currentReport.confidenceScore * 100).toFixed(1)}%
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-1">{currentReport.title}</h3>
            </div>

            <div className="flex items-center gap-2">
              {currentReport.verdict === 'AUTHENTIC' ? (
                <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 font-semibold text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  AUTHENTIC EVIDENCE
                </span>
              ) : currentReport.verdict === 'SYNTHETIC_MANIPULATED' ? (
                <span className="px-3 py-1 rounded-lg bg-red-50 text-red-800 border border-red-300 font-semibold text-xs flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  SYNTHETIC / MANIPULATED
                </span>
              ) : (
                <span className="px-3 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-300 font-semibold text-xs flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  {currentReport.verdict}
                </span>
              )}
            </div>
          </div>

          {/* Forensic Findings */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-800">Forensic Findings:</div>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {currentReport.findings.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold shrink-0">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {currentReport.evidenceCrossReference && (
              <div className="rounded-xl bg-blue-50/60 border border-blue-200 p-3 mt-3 text-xs text-blue-900">
                <span className="font-bold">Evidence Intelligence Impact: </span>
                <span>{currentReport.evidenceCrossReference.reliabilityImpact}</span>
              </div>
            )}

            {/* Technical Metadata Accordion */}
            <div className="pt-2">
              <button
                onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                className="flex items-center gap-1 text-xs font-mono text-slate-500 hover:text-slate-800 transition-colors"
              >
                <Sliders className="h-3.5 w-3.5 text-blue-600" />
                <span>{showTechnicalDetails ? 'Hide Model Metadata' : 'Show Forensic Model Metadata'}</span>
                {showTechnicalDetails ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>

              {showTechnicalDetails && currentReport.technicalMetadata && (
                <div className="mt-2.5 rounded-xl bg-slate-50 border border-slate-200 p-3.5 font-mono text-xs text-slate-600 space-y-1">
                  <div>Model: {currentReport.technicalMetadata.modelUsed}</div>
                  <div>Inference Latency: {currentReport.technicalMetadata.inferenceLatencyMs} ms</div>
                  {currentReport.technicalMetadata.artifactFrequency && (
                    <div>Artifact Confidence: {currentReport.technicalMetadata.artifactFrequency}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reference Specimen Card */}
      {referenceSpecimen && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Reference Specimen
              </span>
              <span className="text-xs font-bold text-slate-800">{referenceSpecimen.title}</span>
            </div>

            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800">
              SYNTHETIC DIFFUSION ARTIFACT
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Forensic benchmark demonstrating synthetic diffusion noise patterns detected in viral bridge collapse images during flood alerts.
          </p>
        </div>
      )}
    </div>
  );
};
