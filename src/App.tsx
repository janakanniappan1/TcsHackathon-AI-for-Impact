import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { CommandCentrePage } from './pages/CommandCentrePage';
import { IncidentMapPage } from './pages/IncidentMapPage';
import { EvidenceIntelligencePage } from './pages/EvidenceIntelligencePage';
import { MediaAuthenticityPage } from './pages/MediaAuthenticityPage';
import { PriorityAnalysisPage } from './pages/PriorityAnalysisPage';
import { ResourceAllocationPage } from './pages/ResourceAllocationPage';
import { RouteReplanningPage } from './pages/RouteReplanningPage';
import { DecisionHistoryPage } from './pages/DecisionHistoryPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<CommandCentrePage />} />
          <Route path="map" element={<IncidentMapPage />} />
          <Route path="evidence" element={<EvidenceIntelligencePage />} />
          <Route path="media-authenticity" element={<MediaAuthenticityPage />} />
          <Route path="priority" element={<PriorityAnalysisPage />} />
          <Route path="allocation" element={<ResourceAllocationPage />} />
          <Route path="routing" element={<RouteReplanningPage />} />
          <Route path="history" element={<DecisionHistoryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

