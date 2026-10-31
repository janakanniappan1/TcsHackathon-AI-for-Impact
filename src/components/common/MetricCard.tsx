import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon: LucideIcon;
  variant?: 'teal' | 'red' | 'amber' | 'blue' | 'slate';
  footnote?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subValue,
  icon: Icon,
  variant = 'teal',
  footnote,
}) => {
  const variantStyles = {
    teal: {
      border: 'border-teal-500/30 hover:border-teal-500/50',
      iconBg: 'bg-teal-500/10 text-teal-400',
      glow: 'group-hover:shadow-[0_0_20px_rgba(20,184,166,0.15)]',
    },
    red: {
      border: 'border-red-500/30 hover:border-red-500/50',
      iconBg: 'bg-red-500/10 text-red-400',
      glow: 'group-hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]',
    },
    amber: {
      border: 'border-amber-500/30 hover:border-amber-500/50',
      iconBg: 'bg-amber-500/10 text-amber-400',
      glow: 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]',
    },
    blue: {
      border: 'border-blue-500/30 hover:border-blue-500/50',
      iconBg: 'bg-blue-500/10 text-blue-400',
      glow: 'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]',
    },
    slate: {
      border: 'border-sentinel-700 hover:border-sentinel-600',
      iconBg: 'bg-sentinel-800 text-slate-300',
      glow: '',
    },
  }[variant];

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl border bg-sentinel-900/90 p-4 transition-all duration-300 backdrop-blur-md',
        variantStyles.border,
        variantStyles.glow
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400 font-mono">
            {label}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-bold tracking-tight text-white font-mono">
              {value}
            </span>
            {subValue && (
              <span className="text-xs text-slate-400 font-mono">{subValue}</span>
            )}
          </div>
        </div>
        <div className={cn('p-2.5 rounded-lg border border-white/5', variantStyles.iconBg)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {footnote && (
        <div className="mt-3 border-t border-sentinel-800/80 pt-2 text-[11px] text-slate-400 font-mono flex items-center justify-between">
          <span>{footnote}</span>
        </div>
      )}
    </div>
  );
};

