import React, { useEffect, useRef, useState } from 'react';
import { 
  Map as MapIcon, 
  Search, 
  X
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapIncident {
  id: string;
  code: string;
  title: string;
  lat: number;
  lng: number;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE';
  desc: string;
  source: string;
  priorityScore: number;
}

const MAP_INCIDENTS: MapIncident[] = [
  {
    id: 'inc-1',
    code: 'INC-204',
    title: 'District Hospital Generator Inundation',
    lat: 13.0827,
    lng: 80.2707,
    severity: 'CRITICAL',
    desc: 'Water accumulation in hospital basement generator vault. 18 ICU patients at risk.',
    source: 'Official Field Radio (NDRF Station 2)',
    priorityScore: 94,
  },
  {
    id: 'inc-2',
    code: 'INC-205',
    title: 'Railway Underpass Trapped Passenger Vehicle',
    lat: 13.0650,
    lng: 80.2450,
    severity: 'CRITICAL',
    desc: 'Rising water level up to car door line. 3 persons inside trapped vehicle.',
    source: 'Emergency 112 Helpline Call (Operator Triaged)',
    priorityScore: 88,
  },
  {
    id: 'inc-3',
    code: 'INC-209',
    title: 'Senior Care Home Water Inundation',
    lat: 13.0450,
    lng: 80.2580,
    severity: 'MODERATE',
    desc: 'Water ingress in ground floor elder residence rooms. Mobility support needed.',
    source: 'Citizen SOS (WhatsApp Multi-Report)',
    priorityScore: 71,
  },
];

const SHELTERS = [
  { name: 'Govt Higher Secondary School Shelter', lat: 13.0900, lng: 80.2800, freeBeds: 220, capacity: 300 },
  { name: 'Community Hall Relief Shelter 02', lat: 13.0550, lng: 80.2300, freeBeds: 150, capacity: 200 },
  { name: 'Indoor Sports Stadium Flood Camp', lat: 13.0380, lng: 80.2700, freeBeds: 80, capacity: 250 },
];

export const IncidentMapPage: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.CircleMarker }>({});

  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [selectedIncident, setSelectedIncident] = useState<MapIncident | null>(MAP_INCIDENTS[0]);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      scrollWheelZoom: true,
    }).setView([13.065, 80.26], 13);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Hazard Polygon
    const floodPolygon = L.polygon(
      [
        [13.085, 80.265],
        [13.090, 80.275],
        [13.075, 80.280],
        [13.060, 80.265],
        [13.070, 80.255],
      ],
      {
        color: '#0284c7',
        fillColor: '#38bdf8',
        fillOpacity: 0.20,
        weight: 2,
        dashArray: '5, 5',
      }
    ).addTo(map);
    floodPolygon.bindPopup('<b>Zone 4 Canal Basin:</b> Elevated Flash Flood Hazard');

    // Shelter Markers
    SHELTERS.forEach(sh => {
      const shMarker = L.circleMarker([sh.lat, sh.lng], {
        radius: 9,
        color: '#0d9488',
        fillColor: '#14b8a6',
        fillOpacity: 0.9,
        weight: 2,
      }).addTo(map);
      shMarker.bindPopup(`<b>${sh.name}</b><br/>Available Beds: ${sh.freeBeds} / ${sh.capacity}`);
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers when filter changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    const filtered = MAP_INCIDENTS.filter(inc => {
      const matchSearch = inc.title.toLowerCase().includes(searchQuery.toLowerCase()) || inc.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSev = severityFilter === 'ALL' || inc.severity === severityFilter;
      return matchSearch && matchSev;
    });

    filtered.forEach(inc => {
      const isCritical = inc.severity === 'CRITICAL';
      const color = isCritical ? '#ef4444' : '#f59e0b';
      const isSelected = selectedIncident?.id === inc.id;

      const marker = L.circleMarker([inc.lat, inc.lng], {
        radius: isSelected ? 14 : 10,
        color: isSelected ? '#2563eb' : color,
        fillColor: color,
        fillOpacity: 0.85,
        weight: isSelected ? 4 : 2,
      }).addTo(map);

      marker.on('click', () => {
        setSelectedIncident(inc);
      });

      markersRef.current[inc.id] = marker;
    });
  }, [searchQuery, severityFilter, selectedIncident]);

  const handleSelect = (inc: MapIncident) => {
    setSelectedIncident(inc);
    mapInstanceRef.current?.panTo([inc.lat, inc.lng], { animate: true });
  };

  return (
    <div className="relative w-full h-[calc(100vh-6rem)] rounded-2xl overflow-hidden border border-slate-200/90 shadow-card bg-white">
      {/* Map Canvas */}
      <div ref={mapContainerRef} className="absolute inset-0 z-0 w-full h-full" />

      {/* Floating Filter Panel (Top Left) */}
      <div className="absolute top-4 left-4 z-10 w-80 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-panel p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <MapIcon className="h-4 w-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Incident Geospatial Explorer</h2>
          </div>
          <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            {MAP_INCIDENTS.length} Plotted
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search incident, location, code..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Severity Filter Pills */}
        <div className="flex items-center gap-1.5">
          {['ALL', 'CRITICAL', 'MODERATE'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                severityFilter === sev
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>

        {/* Incident Quick Selector */}
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 pt-1">
          {MAP_INCIDENTS.map((inc) => (
            <div
              key={inc.id}
              onClick={() => handleSelect(inc)}
              className={`p-2 rounded-xl text-xs cursor-pointer border transition-all ${
                selectedIncident?.id === inc.id
                  ? 'bg-blue-50/70 border-blue-400 ring-1 ring-blue-400/20'
                  : 'bg-white hover:bg-slate-50 border-slate-200/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-slate-900">{inc.code}</span>
                <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                  inc.severity === 'CRITICAL' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {inc.severity}
                </span>
              </div>
              <div className="text-[11px] text-slate-600 font-medium truncate mt-0.5">{inc.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Selected Incident Detail Drawer (Top Right) */}
      {selectedIncident && (
        <div className="absolute top-4 right-4 z-10 w-80 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-panel p-4 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-900">{selectedIncident.code}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                selectedIncident.severity === 'CRITICAL' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {selectedIncident.severity}
              </span>
            </div>
            <button onClick={() => setSelectedIncident(null)} className="text-slate-400 hover:text-slate-700">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-900">{selectedIncident.title}</h3>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{selectedIncident.desc}</p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <div className="text-slate-500 text-[10px] font-mono">Evidence Source:</div>
            <div className="font-medium text-slate-800">{selectedIncident.source}</div>
          </div>

          <div className="flex items-center justify-between pt-1 text-xs">
            <span className="text-slate-500">MCDA Priority:</span>
            <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {selectedIncident.priorityScore} / 100
            </span>
          </div>
        </div>
      )}

      {/* Bottom Floating Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 shadow-sm px-4 py-2 flex items-center gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-red-200" />
          <span>Critical</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-amber-200" />
          <span>Moderate</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-500 ring-2 ring-teal-200" />
          <span>Shelter / Relief Camp</span>
        </div>
      </div>
    </div>
  );
};
