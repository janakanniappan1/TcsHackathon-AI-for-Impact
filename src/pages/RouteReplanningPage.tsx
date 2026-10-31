import React, { useEffect, useRef, useState } from 'react';
import { 
  Route as RouteIcon, 
  RefreshCw, 
  Navigation,
  UserCheck
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const RouteReplanningPage: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const [isReplanning, setIsReplanning] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      scrollWheelZoom: true,
    }).setView([13.068, 80.260], 13);

    L.control.zoom({ position: 'topright' }).addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Blocked route segment (West Canal Road) - Red Dashed
    const blockedPolyline = L.polyline(
      [
        [13.055, 80.245],
        [13.062, 80.252],
        [13.070, 80.260],
        [13.075, 80.268],
      ],
      {
        color: '#ef4444',
        weight: 6,
        dashArray: '8, 8',
        opacity: 0.85,
      }
    ).addTo(map);
    blockedPolyline.bindPopup('<b>BLOCKED:</b> West Canal Road<br/>Inundation depth: 1.24m');

    // Alternative route segment (Eastern Flyover Bypass) - Emerald Solid
    const altPolyline = L.polyline(
      [
        [13.055, 80.245],
        [13.052, 80.265],
        [13.065, 80.278],
        [13.075, 80.268],
      ],
      {
        color: '#10b981',
        weight: 6,
        opacity: 0.95,
      }
    ).addTo(map);
    altPolyline.bindPopup('<b>RECOMMENDED BYPASS:</b> Eastern Elevated Flyover<br/>Clear transit • +4 mins (+3.8 km)');

    // Start Unit Marker (Depot)
    const depotMarker = L.circleMarker([13.055, 80.245], {
      radius: 10,
      color: '#2563eb',
      fillColor: '#3b82f6',
      fillOpacity: 0.9,
      weight: 2,
    }).addTo(map);
    depotMarker.bindPopup('<b>Origin:</b> Staging Depot (PT-02 Pump Truck)');

    // Destination Marker (Hospital)
    const destMarker = L.circleMarker([13.075, 80.268], {
      radius: 12,
      color: '#dc2626',
      fillColor: '#ef4444',
      fillOpacity: 0.9,
      weight: 3,
    }).addTo(map);
    destMarker.bindPopup('<b>Destination:</b> District Hospital (INC-204)');

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const handleSimulateReplan = () => {
    setIsReplanning(true);
    setTimeout(() => {
      setIsReplanning(false);
    }, 800);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <RouteIcon className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Dynamic Route & Replanning Workspace
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time road disruption detection, flood depth bypass calculation, and comparative transit evaluation
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateReplan}
            disabled={isReplanning}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isReplanning ? 'animate-spin' : ''}`} />
            <span>Recalculate Optimal Bypass</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Route Map (col-span-8) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-white">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Navigation className="h-4 w-4 text-blue-600" />
              <span>Transit Corridor Visualization</span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-red-500 rounded border-b border-dashed" />
                <span className="text-red-700 font-medium">Blocked: West Canal Rd</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-emerald-500 rounded" />
                <span className="text-emerald-800 font-medium">Alternative: Flyover</span>
              </span>
            </div>
          </div>

          <div className="relative w-full h-[500px]">
            <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />
          </div>
        </div>

        {/* Right Column: Comparative Route Audit & Operator Sign-off (col-span-4) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-card p-5 space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              Route Re-evaluation
            </span>
            <h2 className="text-sm font-bold text-slate-900 mt-1">
              PT-02 Deployment to INC-204
            </h2>
          </div>

          {/* Comparative Metrics Table */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-slate-800">
              Before & After Route Comparison
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-red-50/60 border border-red-200 space-y-1">
                <div className="text-[10px] font-bold text-red-700">ORIGINAL ROUTE</div>
                <div className="font-semibold text-slate-900 text-[11px]">West Canal Road</div>
                <div className="text-[10px] text-slate-500">Distance: 4.2 km</div>
                <div className="text-[10px] text-red-600 font-bold">STATUS: IMPASSABLE</div>
                <div className="text-[10px] text-slate-500">Water Depth: 1.24m</div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-300 space-y-1 shadow-sm">
                <div className="text-[10px] font-bold text-emerald-800">RECOMMENDED BYPASS</div>
                <div className="font-semibold text-slate-900 text-[11px]">Eastern Flyover</div>
                <div className="text-[10px] text-slate-500">Distance: 8.0 km (+3.8 km)</div>
                <div className="text-[10px] text-emerald-700 font-bold">STATUS: CLEAR ELEVATED</div>
                <div className="text-[10px] text-slate-500">Transit: 14 mins (+4 min)</div>
              </div>
            </div>
          </div>

          {/* Explainable Rationale */}
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
            <div className="text-xs font-bold text-slate-800">
              Why SENTINEL Recommends Flyover Bypass:
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              West Canal Road flood depth exceeds the 0.6m wading limit for heavy pump trucks. The Flyover bypass adds 4 minutes transit but guarantees safe, uninhibited equipment arrival.
            </p>
          </div>

          {/* Operator Sign-off Button */}
          <div className="pt-2">
            <button
              onClick={() => setIsAuthorized(!isAuthorized)}
              className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all ${
                isAuthorized
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <UserCheck className="h-4 w-4" />
              <span>{isAuthorized ? 'Route Authorized & Transmitted to Driver' : 'Authorize Route Rerouting'}</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-400 text-center">
            Simulated Disruption Scenario: Hydro-sensor S-12 simulated breach trigger.
          </div>
        </div>
      </div>
    </div>
  );
};
