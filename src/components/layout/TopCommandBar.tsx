import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  RefreshCw, 
  Clock, 
  AlertTriangle,
  Menu,
  X,
  UserCheck
} from 'lucide-react';
import { formatTimestamp, formatTimeAgo } from '../../utils/formatters';

interface TopCommandBarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const TopCommandBar: React.FC<TopCommandBarProps> = ({
  onToggleSidebar,
  isSidebarOpen,
}) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());
  const [secondsAgo, setSecondsAgo] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setSecondsAgo(Math.floor((now.getTime() - lastSyncTime.getTime()) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [lastSyncTime]);

  const handleManualSync = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastSyncTime(new Date());
      setSecondsAgo(0);
      setIsRefreshing(false);
    }, 500);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-sentinel-700/70 bg-sentinel-950/95 px-4 lg:px-8 backdrop-blur-xl">
      {/* Left: Branding & Mobile Toggle */}
      <div className="flex items-center gap-3 lg:gap-5">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="rounded-lg p-2 text-slate-400 hover:bg-sentinel-850 hover:text-white lg:hidden border border-sentinel-700 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        )}

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 shadow-[0_0_12px_rgba(20,184,166,0.2)]">
            <ShieldAlert className="h-5 w-5 text-teal-400" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base lg:text-lg font-bold tracking-wider text-white">
                SENTINEL
              </span>
              <span className="rounded bg-sentinel-800 px-2 py-0.5 font-mono text-[11px] font-medium text-teal-300 border border-sentinel-700">
                Operations
              </span>
            </div>
            <p className="hidden sm:block text-xs text-slate-400 font-sans">
              Disaster Intelligence & Emergency Coordination
            </p>
          </div>
        </div>
      </div>

      {/* Middle: Clear Emergency Status & Simulation Banner */}
      <div className="hidden md:flex items-center gap-3">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
          <span>Exercise Scenario: Urban Flooding Response</span>
          <span className="rounded bg-amber-500/20 px-1.5 py-0.2 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-200">
            Demo Data
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sentinel-900 border border-sentinel-700/80 text-xs text-slate-300">
          <UserCheck className="h-3.5 w-3.5 text-teal-400" />
          <span>Human Approval Required</span>
        </div>
      </div>

      {/* Right: Data Sync & Live Clock */}
      <div className="flex items-center gap-3">
        {/* Data Freshness Indicator */}
        <div className="flex items-center gap-2 rounded-lg bg-sentinel-900 border border-sentinel-700/80 px-3 py-1.5 text-xs">
          <Activity className="h-3.5 w-3.5 text-teal-400" />
          <span className="hidden sm:inline text-slate-400">Updated:</span>
          <span className="text-teal-300 font-mono font-medium">
            {formatTimeAgo(secondsAgo)}
          </span>
          <button
            onClick={handleManualSync}
            disabled={isRefreshing}
            title="Refresh local scenario state"
            className="ml-1 text-slate-400 hover:text-teal-300 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin text-teal-400' : ''}`} />
          </button>
        </div>

        {/* Tactical Clock */}
        <div className="hidden xl:flex items-center gap-2 rounded-lg bg-sentinel-900 border border-sentinel-700/80 px-3 py-1.5 text-xs font-mono text-slate-300">
          <Clock className="h-3.5 w-3.5 text-slate-400" />
          <span>{formatTimestamp(currentTime)}</span>
        </div>
      </div>
    </header>
  );
};
