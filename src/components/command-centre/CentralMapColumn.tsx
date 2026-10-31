import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Navigation2, 
  AlertTriangle, 
  CheckCircle2
} from 'lucide-react';
import { CommandIncident } from './PrioritizedQueueColumn';

interface CentralMapColumnProps {
  incidents: CommandIncident[];
  selectedIncidentId: string;
  onSelectIncident: (id: string) => void;
}

export const CentralMapColumn: React.FC<CentralMapColumnProps> = ({
  incidents,
  selectedIncidentId,
  onSelectIncident,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.CircleMarker }>({});
  const [showAlternativeRoutes, setShowAlternativeRoutes] = useState(true);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      scrollWheelZoom: true,
    }).setView([13.068, 80.258], 13);

    L.control.zoom({ position: 'topright' }).addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Hazard Zone
    const floodPolygon = L.polygon(
      [
        [13.085, 80.265],
        [13.090, 80.278],
        [13.072, 80.282],
        [13.058, 80.268],
        [13.068, 80.252],
      ],
      {
        color: '#0284c7',
        fillColor: '#38bdf8',
        fillOpacity: 0.20,
        weight: 2,
        dashArray: '6, 6',
      }
    ).addTo(map);
    floodPolygon.bindPopup('<b>Zone 4 Low-lying Canal Basin:</b> Severe Flash Flood Inundation Area');

    // Blocked Route (Red Dashed)
    const blockedRoute = L.polyline(
      [
        [13.055, 80.245],
        [13.062, 80.252],
        [13.070, 80.260],
        [13.075, 80.268],
      ],
      {
        color: '#ef4444',
        weight: 5,
        dashArray: '8, 8',
        opacity: 0.85,
      }
    ).addTo(map);
    blockedRoute.bindPopup('<b style="color:#ef4444">BLOCKED DISRUPTION:</b> West Canal Road<br/>Water depth > 1.2m. Inaccessible to heavy vehicles.');

    // Alternative Route (Green Solid)
    const alternativeRoute = L.polyline(
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
    alternativeRoute.bindPopup('<b style="color:#10b981">RECOMMENDED ROUTE:</b> Eastern Elevated Flyover<br/>Clear transit • +4 mins (+3.8 km) • Safe elevation.');

    // Hospital Marker
    const hospitalMarker = L.circleMarker([13.075, 80.268], {
      radius: 12,
      color: '#7c3aed',
      fillColor: '#8b5cf6',
      fillOpacity: 0.9,
      weight: 3,
    }).addTo(map);
    hospitalMarker.bindPopup('<b>District Hospital</b><br/>ICU Generator Basement Risk • 18 Patients on Ventilators');

    // Shelter Marker
    const shelterMarker = L.circleMarker([13.052, 80.265], {
      radius: 10,
      color: '#0d9488',
      fillColor: '#14b8a6',
      fillOpacity: 0.85,
      weight: 2,
    }).addTo(map);
    shelterMarker.bindPopup('<b>Sector 3 Relief Shelter:</b> 240 / 300 Capacity (Operational)');

    // Team Marker
    const team1Marker = L.circleMarker([13.055, 80.245], {
      radius: 9,
      color: '#2563eb',
      fillColor: '#3b82f6',
      fillOpacity: 0.9,
      weight: 2,
    }).addTo(map);
    team1Marker.bindPopup('<b>Pump Truck PT-02 (NDRF Unit Beta):</b> Staged for Hospital Generator Dispatch');

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Incident Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    incidents.forEach((inc) => {
      const isSelected = inc.id === selectedIncidentId;
      const isCritical = inc.severity === 'CRITICAL';
      const color = isCritical ? '#ef4444' : '#f59e0b';

      const marker = L.circleMarker([inc.lat, inc.lng], {
        radius: isSelected ? 14 : 10,
        color: isSelected ? '#2563eb' : color,
        fillColor: color,
        fillOpacity: 0.9,
        weight: isSelected ? 4 : 2,
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family:sans-serif; min-width: 180px;">
          <div style="font-size:11px; font-weight:bold; color:#64748b;">${inc.code}</div>
          <div style="font-size:13px; font-weight:bold; color:#0f172a; margin-top:2px;">${inc.title}</div>
          <div style="font-size:11px; color:#475569; margin-top:4px;">📍 ${inc.location}</div>
          <div style="font-size:11px; font-weight:600; color:${color}; margin-top:4px;">Priority: ${inc.priorityScore}/100 • ${inc.severity}</div>
        </div>
      `);

      marker.on('click', () => {
        onSelectIncident(inc.id);
      });

      markersRef.current[inc.id] = marker;
    });

    const selected = incidents.find(i => i.id === selectedIncidentId);
    if (selected) {
      map.panTo([selected.lat, selected.lng], { animate: true });
    }
  }, [incidents, selectedIncidentId, onSelectIncident]);

  return (
    <div className="relative flex flex-col h-full bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-card overflow-hidden">
      {/* Top Map Header & Controls */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-white/90 z-10 shrink-0">
        <div className="flex items-center gap-2">
          <Navigation2 className="h-4 w-4 text-blue-600 rotate-45" />
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            Interactive Tactical Dispatch Map
          </h2>
          <span className="text-xs text-slate-400">|</span>
          <span className="text-xs text-slate-500 font-medium">Real-Time Routing Engine</span>
        </div>

        {/* Quick Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAlternativeRoutes(!showAlternativeRoutes)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
              showAlternativeRoutes ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'
            }`}
          >
            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
            <span>Alt Routes</span>
          </button>

          <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
            OSM Live Layer
          </span>
        </div>
      </div>

      {/* Floating Tactical Alert Banner on Map */}
      <div className="absolute top-16 left-5 right-5 z-[500] pointer-events-none">
        <div className="pointer-events-auto max-w-xl mx-auto rounded-xl bg-white/95 backdrop-blur-md border border-amber-300 shadow-md p-3 flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                Disruption Detected: West Canal Road Inundated (1.2m Water)
              </div>
              <div className="text-[11px] text-slate-600">
                Alternative Flyover Bypass active: Recommended for Heavy Response Units (+4 mins).
              </div>
            </div>
          </div>
          <span className="rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold px-2 py-1 border border-emerald-300 shrink-0">
            ROUTE READY
          </span>
        </div>
      </div>

      {/* Leaflet Map Canvas */}
      <div className="relative flex-1 w-full min-h-[460px] lg:min-h-[560px]">
        <div ref={mapContainerRef} className="absolute inset-0 z-0 w-full h-full" />
      </div>

      {/* Bottom Map Legend */}
      <div className="px-5 py-3 bg-white/95 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 z-10 shrink-0">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-red-200" />
            <span>Critical Incident</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 ring-2 ring-blue-200" />
            <span>Deployed Team</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 ring-2 ring-purple-200" />
            <span>Hospital / Shelter</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-4 h-1 bg-emerald-500 rounded" />
            <span className="font-medium text-emerald-800">Recommended Route (Flyover)</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-4 h-1 bg-red-500 rounded border-b border-dashed" />
            <span className="font-medium text-red-700">Blocked Road</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 font-mono">
          Lat 13.068° N, Long 80.258° E
        </div>
      </div>
    </div>
  );
};
