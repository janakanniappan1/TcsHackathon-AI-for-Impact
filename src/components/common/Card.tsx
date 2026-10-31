import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  variant?: 'default' | 'elevated' | 'danger' | 'accent';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  title,
  subtitle,
  headerAction,
  variant = 'default',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white/95 border-slate-200/90 shadow-card hover:shadow-md',
    elevated: 'bg-white border-slate-200 shadow-panel',
    danger: 'bg-red-50/60 border-red-200 shadow-card',
    accent: 'bg-white border-blue-200 shadow-card ring-1 ring-blue-500/10',
  }[variant];

  return (
    <div
      className={cn(
        'rounded-2xl border transition-all duration-200',
        variantStyles,
        className
      )}
      {...props}
    >
      {(title || subtitle || headerAction) && (
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            {title && (
              <h3 className="font-semibold text-slate-800 text-sm tracking-tight flex items-center gap-2">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5 font-normal">{subtitle}</p>
            )}
          </div>
          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
};
