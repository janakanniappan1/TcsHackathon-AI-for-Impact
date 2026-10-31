import React, { useState } from 'react';
import { 
  PrioritizedQueueColumn, 
  CommandIncident, 
  ActivityEvent 
} from '../components/command-centre/PrioritizedQueueColumn';
import { CentralMapColumn } from '../components/command-centre/CentralMapColumn';
import { DispatchDecisionColumn } from '../components/command-centre/DispatchDecisionColumn';
import { BottomStatusStrip } from '../components/command-centre/BottomStatusStrip';

const INITIAL_INCIDENTS: CommandIncident[] = [
  {
    id: 'inc-01',
    code: 'INC-204',
    title: 'District Hospital Generator Inundation Risk',
    location: 'Sector 4, West Canal Road',
    priorityScore: 94,
    severity: 'CRITICAL',
    status: 'PENDING_ALLOCATION',
    statusLabel: 'Pending Allocation',
    reportedTime: '12m ago',
    affectedCount: '18 ICU patients on ventilator support',
    lat: 13.075,
    lng: 80.268,
    disruption: 'West Canal Road inundated (water depth > 1.2m). Original direct route blocked for heavy vehicles.',
    suggestedTeam: 'NDRF Unit Beta (PT-02 Pump Truck + MP-01 Mobile Power)',
    originalRoute: 'West Canal Road',
    alternativeRoute: 'Eastern Elevated Flyover (+4 min, +3.8 km)',
  },
  {
    id: 'inc-02',
    code: 'INC-205',
    title: 'Passenger Vehicle Trapped in Railway Underpass',
    location: 'Sector 2 East, Main Subway',
    priorityScore: 88,
    severity: 'CRITICAL',
    status: 'TEAM_ASSIGNED',
    statusLabel: 'Team Assigned',
    reportedTime: '24m ago',
    affectedCount: '3 passengers trapped inside vehicle',
    lat: 13.062,
    lng: 80.252,
    disruption: 'Subway underpass water level rising at 10cm/15min.',
    suggestedTeam: 'SDRF Rapid Rescue (RB-02 Rescue Boat + ALS Ambulance AMB-04)',
    originalRoute: 'Underpass North Ramp',
    alternativeRoute: 'Southern Service Road Bypass',
  },
  {
    id: 'inc-03',
    code: 'INC-209',
    title: 'Water Inundation at Senior Care Home',
    location: 'Sector 5, Lakeview Enclave',
    priorityScore: 71,
    severity: 'MODERATE',
    status: 'RESPONDING',
    statusLabel: 'Responding',
    reportedTime: '38m ago',
    affectedCount: '42 senior residents requiring evacuation support',
    lat: 13.058,
    lng: 80.265,
    disruption: 'Ground floor water ingress reported.',
    suggestedTeam: 'Local Police Patrol Unit 07 + State Bus Transport',
    originalRoute: 'Lakeview Avenue',
    alternativeRoute: 'Main Highway Link',
  },
];

const INITIAL_EVENTS: ActivityEvent[] = [
  {
    id: 'evt-01',
    time: '2m ago',
    title: 'Route Recalculated',
    description: 'Dynamic bypass via Eastern Flyover calculated for PT-02 avoiding West Canal inundation.',
    type: 'ROUTE',
  },
  {
    id: 'evt-02',
    time: '12m ago',
    title: 'Critical SOS Verified',
    description: 'NDRF radio telemetry confirmed water ingress in District Hospital power room.',
    type: 'EVIDENCE',
  },
  {
    id: 'evt-03',
    time: '22m ago',
    title: 'Team Assigned',
    description: 'Rescue Boat RB-02 deployed to Sector 2 Railway Underpass distress call.',
    type: 'DISPATCH',
  },
  {
    id: 'evt-04',
    time: '34m ago',
    title: 'Disruption Detected',
    description: 'Hydro-sensor S-12 reported water level > 1.2m at West Canal Road.',
    type: 'ROUTE',
  },
  {
    id: 'evt-05',
    time: '45m ago',
    title: 'Operator Sign-off',
    description: 'Shelter capacity increased to 300 at Sector 3 Relief Center.',
    type: 'OPERATOR',
  },
];

export const CommandCentrePage: React.FC = () => {
  const [incidents, setIncidents] = useState<CommandIncident[]>(INITIAL_INCIDENTS);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>('inc-01');
  const [authorizedIncidents, setAuthorizedIncidents] = useState<{ [id: string]: boolean }>({});
  const [events, setEvents] = useState<ActivityEvent[]>(INITIAL_EVENTS);
  const [lastSync, setLastSync] = useState<string>('Just now');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const selectedIncident = incidents.find(i => i.id === selectedIncidentId) || incidents[0];
  const isAuthorized = !!authorizedIncidents[selectedIncident.id];

  const handleAuthorize = (incidentId: string) => {
    setAuthorizedIncidents(prev => ({ ...prev, [incidentId]: true }));
    setIncidents(prev =>
      prev.map(i =>
        i.id === incidentId ? { ...i, status: 'TEAM_ASSIGNED', statusLabel: 'Authorized & Dispatched' } : i
      )
    );

    // Add operator event to timeline
    const targetInc = incidents.find(i => i.id === incidentId);
    if (targetInc) {
      setEvents(prev => [
        {
          id: `evt-${Date.now()}`,
          time: 'Just now',
          title: 'Dispatch Plan Authorized',
          description: `Operator authorized dispatch plan for ${targetInc.code} (${targetInc.suggestedTeam}).`,
          type: 'OPERATOR',
        },
        ...prev,
      ]);
    }
  };

  const handleOverride = (incidentId: string) => {
    setAuthorizedIncidents(prev => ({ ...prev, [incidentId]: false }));
    setIncidents(prev =>
      prev.map(i =>
        i.id === incidentId ? { ...i, status: 'PENDING_ALLOCATION', statusLabel: 'Plan Overridden' } : i
      )
    );
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastSync('Just now');
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      {/* 3-Column Desktop Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* LEFT COLUMN: Prioritized Emergency Queue + Timeline (col-span-3) */}
        <div className="lg:col-span-3 flex flex-col">
          <PrioritizedQueueColumn
            incidents={incidents}
            selectedIncidentId={selectedIncidentId}
            onSelectIncident={setSelectedIncidentId}
            events={events}
          />
        </div>

        {/* CENTRE COLUMN: Large Interactive Dispatch Map (col-span-6) */}
        <div className="lg:col-span-6 flex flex-col">
          <CentralMapColumn
            incidents={incidents}
            selectedIncidentId={selectedIncidentId}
            onSelectIncident={setSelectedIncidentId}
          />
        </div>

        {/* RIGHT COLUMN: Active Dispatch Decision & Reassignment (col-span-3) */}
        <div className="lg:col-span-3 flex flex-col">
          <DispatchDecisionColumn
            selectedIncident={selectedIncident}
            onAuthorize={handleAuthorize}
            onOverride={handleOverride}
            isAuthorized={isAuthorized}
          />
        </div>
      </div>

      {/* BOTTOM STATUS STRIP */}
      <BottomStatusStrip
        lastSync={lastSync}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />
    </div>
  );
};
