import React from 'react';
import { SeverityLevel } from '../../types/incident';
import { SEVERITY_CONFIG } from '../../data/constants';
import { cn } from '../../utils/cn';

interface SeverityBadgeProps {
  severity: SeverityLevel;
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({
  severity,
  size = 'md',
  showPulse = true,
}) => {
  const config = SEVERITY_CONFIG[severity] || SEVERITY_CONFIG.LOW;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  }[size];

  const dotClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  }[size];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-mono font-medium rounded-md uppercase tracking-wider border transition-colors',
        config.bg,
        config.color,
        config.border,
        sizeClasses
      )}
    >
      <span className="relative flex">
        {showPulse && severity === 'CRITICAL' && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
        )}
        <span
          className={cn(
            'rounded-full',
            dotClasses,
            severity === 'CRITICAL' && 'bg-red-400',
            severity === 'HIGH' && 'bg-orange-400',
            severity === 'MODERATE' && 'bg-amber-400',
            severity === 'LOW' && 'bg-cyan-400',
            severity === 'NOMINAL' && 'bg-emerald-400'
          )}
        />
      </span>
      {config.label.split(' ')[0]}
    </span>
  );
};

