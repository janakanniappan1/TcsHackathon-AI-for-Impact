import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Video, 
  FileText, 
  Fingerprint, 
  History,
  LayoutDashboard
} from 'lucide-react';
import { MediaSubmodule } from '../types/mediaAuthenticity';
import { MediaOverviewSubmodule } from '../components/media-authenticity/MediaOverviewSubmodule';
import { ImageAnalysisSubmodule } from '../components/media-authenticity/ImageAnalysisSubmodule';
import { VideoAnalysisSubmodule } from '../components/media-authenticity/VideoAnalysisSubmodule';
import { TextAnalysisSubmodule } from '../components/media-authenticity/TextAnalysisSubmodule';
import { ProvenanceVerificationSubmodule } from '../components/media-authenticity/ProvenanceVerificationSubmodule';
import { AnalysisHistorySubmodule } from '../components/media-authenticity/AnalysisHistorySubmodule';

interface TabConfig {
  id: MediaSubmodule;
  label: string;
  icon: React.ElementType;
}

const TABS: TabConfig[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'image', label: 'Image Analysis', icon: ImageIcon },
  { id: 'video', label: 'Video Analysis', icon: Video },
  { id: 'text', label: 'Text Analysis', icon: FileText },
  { id: 'provenance', label: 'Provenance Verification', icon: Fingerprint },
  { id: 'history', label: 'Analysis History', icon: History },
];

export const MediaAuthenticityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MediaSubmodule>('overview');

  const renderActiveSubmodule = () => {
    switch (activeTab) {
      case 'overview':
        return <MediaOverviewSubmodule onNavigateTab={setActiveTab} />;
      case 'image':
        return <ImageAnalysisSubmodule />;
      case 'video':
        return <VideoAnalysisSubmodule />;
      case 'text':
        return <TextAnalysisSubmodule />;
      case 'provenance':
        return <ProvenanceVerificationSubmodule />;
      case 'history':
        return <AnalysisHistorySubmodule />;
      default:
        return <MediaOverviewSubmodule onNavigateTab={setActiveTab} />;
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Submodule Navigation Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Submodule Content */}
      <div className="mt-2">
        {renderActiveSubmodule()}
      </div>
    </div>
  );
};
