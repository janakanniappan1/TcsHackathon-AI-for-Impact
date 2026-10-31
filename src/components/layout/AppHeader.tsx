import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  ShieldAlert, 
  Map, 
  FileCheck2, 
  Fingerprint, 
  BarChart3, 
  Truck, 
  Route, 
  History, 
  LayoutDashboard,
  CloudRain,
  Wind,
  AlertCircle,
  Users,
  Wifi,
  Menu,
  X,
  MapPin
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Command Centre', path: '/', icon: LayoutDashboard },
  { label: 'Incident Map', path: '/map', icon: Map },
  { label: 'Evidence Intelligence', path: '/evidence', icon: FileCheck2 },
  { label: 'Media Authenticity', path: '/media-authenticity', icon: Fingerprint, badge: 'AI' },
  { label: 'Priority Analysis', path: '/priority', icon: BarChart3 },
  { label: 'Resource Allocation', path: '/allocation', icon: Truck },
  { label: 'Route & Replanning', path: '/routing', icon: Route },
  { label: 'Decision History', path: '/history', icon: History },
];

export const AppHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm">
      {/* Top Main Navigation Bar */}
      <div className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Section: Logo & Operational Area */}
        <div className="flex items-center gap-3 xl:gap-4 shrink-0">
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm group-hover:bg-blue-700 transition-colors">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 tracking-tight text-base font-sans">
                  SENTINEL
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500">
                <MapPin className="h-3 w-3 text-slate-400" />
                <span>Sector 4 Operational Zone</span>
              </div>
            </div>
          </NavLink>
        </div>

        {/* Center Section: Horizontal Navigation Tabs */}
        <nav className="hidden xl:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-150',
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                )}
              >
                <Icon className={cn('h-3.5 w-3.5', isActive ? 'text-white' : 'text-slate-400')} />
                <span>{item.label}</span>
                {item.badge && !isActive && (
                  <span className="rounded-full bg-blue-100 px-1.5 py-0.2 text-[9px] font-bold text-blue-700 font-mono">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Right Section: Real Indicators & Operator Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Weather Widget */}
          <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
            <div className="flex items-center gap-1 text-slate-700 font-medium">
              <CloudRain className="h-3.5 w-3.5 text-blue-500" />
              <span>Heavy Rain 28°C</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1 text-slate-500">
              <Wind className="h-3.5 w-3.5 text-slate-400" />
              <span>38 km/h</span>
            </div>
          </div>

          {/* Incident / Deployed Counter Badges */}
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs font-semibold">
              <AlertCircle className="h-3.5 w-3.5 text-red-500" />
              <span>3 Active</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              <Users className="h-3.5 w-3.5 text-emerald-600" />
              <span>5 Deployed</span>
            </span>
          </div>

          {/* System Connectivity */}
          <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-mono" title="FastAPI Backend Online">
            <Wifi className="h-3 w-3 text-emerald-500" />
            <span className="text-[11px]">8000</span>
          </div>

          {/* Operator Profile */}
          <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
            <div className="h-8 w-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs">
              EO
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-semibold text-slate-800 leading-tight">EOC Officer</div>
              <div className="text-[10px] text-slate-500">Authorized</div>
            </div>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Navigation Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1 shadow-lg animate-fade-in">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors',
                  isActive
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={cn('h-4 w-4', isActive ? 'text-white' : 'text-slate-400')} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={cn('rounded px-1.5 py-0.2 text-[10px] font-mono', isActive ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600')}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      )}
    </header>
  );
};
