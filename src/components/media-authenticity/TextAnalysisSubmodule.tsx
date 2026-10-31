import React, { useState } from 'react';
import { 
  FileText, 
  Send, 
  Info, 
  Loader2
} from 'lucide-react';
import { mediaAuthenticityService } from '../../services/mediaAuthenticityService';

export const TextAnalysisSubmodule: React.FC = () => {
  const [textInput, setTextInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!textInput.trim()) return;
    setIsAnalyzing(true);
    setStatusMessage(null);

    const result = await mediaAuthenticityService.submitForAnalysis(
      null,
      textInput,
      'FAST_DETECT_GPT_TEXT'
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
            <FileText className="h-5 w-5 text-blue-600" />
            Linguistic Authenticity Analysis (Fast-DetectGPT)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Probability curvature scoring to detect automated LLM panic forward templates
          </p>
        </div>

        <span className="text-xs font-mono text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg font-semibold">
          Scoring LM Pending
        </span>
      </div>

      {/* Text Submission Box */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Submit Broadcast Text or Viral Social Post
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Paste uncorroborated evacuation messages or WhatsApp chains claiming dam collapses or water releases.
          </p>
        </div>

        <textarea
          rows={5}
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Paste message text to analyze probability curvature..."
          className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
        />

        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{textInput.length} characters ({textInput.trim() ? textInput.trim().split(/\s+/).length : 0} words)</span>

          <button
            onClick={handleAnalyze}
            disabled={!textInput.trim() || isAnalyzing}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm flex items-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Evaluating...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Analyze Text Curvature</span>
              </>
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
