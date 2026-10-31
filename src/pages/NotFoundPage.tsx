import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="max-w-md w-full text-center p-8 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-panel">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 mb-4">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2 font-mono">404: SECTOR UNMAPPED</h2>
        <p className="text-xs text-slate-500 mb-6">
          The requested coordinate or operations view is not recognized in the active tactical grid.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Command Centre
        </Link>
      </div>
    </div>
  );
};
