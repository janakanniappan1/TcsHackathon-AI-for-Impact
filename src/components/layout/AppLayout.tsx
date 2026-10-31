import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from './AppHeader';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#f1f5f9] text-slate-800 font-sans antialiased">
      {/* Global Modern Horizontal Header */}
      <AppHeader />

      {/* Main Viewport Container */}
      <main className="flex-1 w-full px-3 py-5 sm:px-6 lg:px-8 max-w-[1720px] mx-auto">
        <Outlet />
      </main>
    </div>
  );
};
