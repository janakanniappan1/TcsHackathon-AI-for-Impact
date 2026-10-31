import React, { useState } from 'react';
import { 
  Video, 
  UploadCloud, 
  Info, 
  Loader2 
} from 'lucide-react';
import { mediaAuthenticityService } from '../../services/mediaAuthenticityService';

export const VideoAnalysisSubmodule: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
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
      'AEGIS_VIDEO'
    );

    setIsAnalyzing(false);
    setStatusMessage(result.statusNote);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Video className="h-5 w-5 text-blue-600" />
            Video Authenticity & Optical Flow Analysis (AEGIS)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Inter-frame temporal coherence and deepfake fluid dynamics verification
          </p>
        </div>

        <span className="text-xs font-mono text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg font-semibold">
          Model Weights Pending
        </span>
      </div>

      {/* Upload Box */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Submit Disaster Footage for Spatiotemporal Verification
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload citizen or drone footage of floodwaters, dams, or rescue operations.
          </p>
        </div>

        <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-blue-50/40 hover:border-blue-400 cursor-pointer transition-all">
          <UploadCloud className="h-10 w-10 text-blue-500 mb-2" />
          <span className="text-xs font-semibold text-slate-800">
            {selectedFile ? selectedFile.name : 'Click to select or drag and drop video'}
          </span>
          <span className="text-[11px] text-slate-400 mt-1">
            Supports MP4, MOV, WebM (Max 100 MB)
          </span>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

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
                <span>Processing Container...</span>
              </>
            ) : (
              <span>Analyze Video Authenticity</span>
            )}
          </button>
        </div>

        {statusMessage && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 flex items-start gap-3">
            <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold block">Integrity Standard Notice:</span>
              <p className="text-slate-600 leading-relaxed">{statusMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
