import React from 'react';
import { cn } from '../../utils/cn';

interface StatusIndicatorProps {
  status: 'ONLINE' | 'STANDBY' | 'DEGRADED' | 'OFFLINE' | 'ACTIVE';
  label?: string;
  pulse?: boolean;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  pulse = true,
  className,
}) => {
  const getStyles = () => {
    switch (status) {
      case 'ONLINE':
      case 'ACTIVE':
        return {
          dot: 'bg-teal-400',
          ping: 'bg-teal-400',
          text: 'text-teal-300',
          glow: 'shadow-[0_0_8px_rgba(20,184,166,0.6)]',
        };
      case 'STANDBY':
        return {
          dot: 'bg-blue-400',
          ping: 'bg-blue-400',
          text: 'text-blue-300',
          glow: 'shadow-[0_0_8px_rgba(96,165,250,0.5)]',
        };
      case 'DEGRADED':
        return {
          dot: 'bg-amber-400',
          ping: 'bg-amber-400',
          text: 'text-amber-300',
          glow: 'shadow-[0_0_8px_rgba(251,191,36,0.6)]',
        };
      case 'OFFLINE':
      default:
        return {
          dot: 'bg-slate-500',
          ping: 'bg-slate-500',
          text: 'text-slate-400',
          glow: '',
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={cn('inline-flex items-center gap-2 font-mono text-xs', className)}>
      <span className="relative flex h-2 w-2">
        {pulse && (status === 'ONLINE' || status === 'ACTIVE') && (
          <span className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', styles.ping)} />
        )}
        <span className={cn('relative inline-flex rounded-full h-2 w-2', styles.dot, styles.glow)} />
      </span>
      {label && <span className={cn('font-semibold uppercase tracking-wider', styles.text)}>{label}</span>}
    </div>
  );
};

