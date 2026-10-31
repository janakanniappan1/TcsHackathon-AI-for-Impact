import React from 'react';
import { Clock, MapPin } from 'lucide-react';

interface UpdateItem {
  id: string;
  time: string;
  category: 'ALERT' | 'DISPATCH' | 'WEATHER' | 'SYSTEM';
  message: string;
  location?: string;
}

const RECENT_UPDATES: UpdateItem[] = [
  {
    id: 'u-1',
    time: '10:14',
    category: 'WEATHER',
    message: 'Coastal hydro-station reports tide surge reached +0.4m above baseline. Drainage outflow reduced.',
    location: 'Sector 1 Coastal Ingress',
  },
  {
    id: 'u-2',
    time: '10:02',
    category: 'ALERT',
    message: 'District Hospital requested emergency auxiliary pump unit due to basement drainage backup.',
    location: 'Sector 4 Canal Road',
  },
  {
    id: 'u-3',
    time: '09:48',
    category: 'DISPATCH',
    message: 'NDRF Rescue Unit 04 staged at Community Center Staging Ground. Ready for tasking.',
    location: 'Sector 1 Staging Post',
  },
  {
    id: 'u-4',
    time: '09:30',
    category: 'SYSTEM',
    message: 'Flood response coordination drill initialized for training and evaluation.',
  },
];

export const EmergencyUpdatesStream: React.FC = () => {
  return (
    <div className="rounded-2xl border border-sentinel-700/70 bg-sentinel-900/90 p-5 lg:p-6">
      <div className="flex items-center justify-between pb-4 border-b border-sentinel-800">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Clock className="h-4 w-4 text-teal-400" />
          Recent Emergency Updates
        </h3>
        <span className="text-xs text-slate-400 font-mono">Exercise Log</span>
      </div>

      <div className="mt-4 space-y-4">
        {RECENT_UPDATES.map((update) => (
          <div key={update.id} className="flex items-start gap-3.5 text-xs">
            <span className="font-mono text-slate-400 shrink-0 mt-0.5 font-medium">
              {update.time}
            </span>

            <div className="flex-1 space-y-1">
              <p className="text-slate-300 leading-relaxed font-sans">
                {update.message}
              </p>
              {update.location && (
                <div className="flex items-center gap-1 text-[11px] text-teal-400/90">
                  <MapPin className="h-3 w-3" />
                  <span>{update.location}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
