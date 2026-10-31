import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  FileCheck2,
  Fingerprint,
  BarChart3,
  Truck,
  Route,
  History,
  ShieldCheck,
  Info
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

interface NavItemConfig {
  name: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
}

const NAV_ITEMS: NavItemConfig[] = [
  {
    name: 'Command Centre',
    path: '/',
    icon: LayoutDashboard,
  },
  {
    name: 'Incident Map',
    path: '/map',
    icon: Map,
    badge: 'Map',
  },
  {
    name: 'Evidence Intelligence',
    path: '/evidence',
    icon: FileCheck2,
  },
  {
    name: 'Media Authenticity',
    path: '/media-authenticity',
    icon: Fingerprint,
    badge: 'NEW',
  },
  {
    name: 'Priority Analysis',
    path: '/priority',
    icon: BarChart3,
  },
  {
    name: 'Resource Allocation',
    path: '/allocation',
    icon: Truck,
  },
  {
    name: 'Route & Replanning',
    path: '/routing',
    icon: Route,
  },
  {
    name: 'Decision History',
    path: '/history',
    icon: History,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Main Persistent Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-sentinel-700/70 bg-sentinel-950/95 backdrop-blur-xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 pt-16 lg:pt-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Navigation Category Label */}
        <div className="px-6 pt-6 pb-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Emergency Operations
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 px-3 py-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'group flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-sentinel-850 text-teal-300 font-semibold border-l-4 border-teal-400 shadow-sm'
                    : 'text-slate-300 hover:bg-sentinel-900/80 hover:text-white'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <item.icon
                      className={cn(
                        'h-5 w-5 transition-colors',
                        isActive
                          ? 'text-teal-400'
                          : 'text-slate-400 group-hover:text-slate-200'
                      )}
                    />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span className="rounded bg-sentinel-800 px-2 py-0.5 font-mono text-[10px] font-medium text-slate-300 border border-sentinel-700">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Safety & Governance Note */}
        <div className="border-t border-sentinel-800 p-4 m-3 rounded-xl bg-sentinel-900/80 border border-sentinel-800">
          <div className="flex items-center gap-2 mb-2 text-teal-300 text-xs font-semibold">
            <ShieldCheck className="h-4 w-4 text-teal-400" />
            <span>Operational Guardrail</span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            All AI-suggested vehicle dispatches and route changes require human coordinator confirmation.
          </p>

          <div className="mt-3 pt-2 border-t border-sentinel-800/80 flex items-center gap-1.5 text-[11px] text-slate-400">
            <Info className="h-3 w-3 text-slate-400" />
            <span>Mode: Simulation & Training</span>
          </div>
        </div>
      </aside>
    </>
  );
};
