import React from 'react';
import { Outlet, Navigate } from 'react-router';
import { useAppState } from '../../context/AppStateContext';
import Sidebar from './Sidebar';
import Header from './Header';
import ResponsiveNav from './ResponsiveNav';

export default function AppShell() {
  const { state } = useAppState();

  // If no user, redirect to onboarding
  if (!state.user) {
    return <Navigate to="/onboarding" replace />;
  }

  // If no project has been initialized, redirect to setup wizard
  if (!state.project) {
    return <Navigate to="/setup" replace />;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-800 font-sans">
      {/* Desktop Sidebar (hidden on mobile/tablet) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header />
        
        {/* Child Routes Content (with padding for mobile navigation bar) */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-6 p-4 md:p-6 bg-slate-50/50">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>

        {/* Mobile bottom nav bar (hidden on desktop) */}
        <ResponsiveNav />
      </div>
    </div>
  );
}
