import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Card } from '../components/common/Card';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Card className="max-w-md text-center p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-4">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2 font-mono">404: SECTOR UNMAPPED</h2>
        <p className="text-xs text-slate-400 mb-6">
          The requested coordinate or operations view is not recognized in the active tactical grid.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-teal-500/20 px-4 py-2 font-mono text-xs font-semibold text-teal-300 border border-teal-500/40 hover:bg-teal-500/30 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Command Centre
        </Link>
      </Card>
    </div>
  );
};

