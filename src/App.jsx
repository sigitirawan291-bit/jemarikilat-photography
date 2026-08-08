import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { DataProvider } from './context/DataContext';
import MainDashboardView from './views/MainDashboardView';
import AdminPortalView from './views/AdminPortalView';
import FinancePortalView from './views/FinancePortalView';
import PhotographerPortalView from './views/PhotographerPortalView';

function AppContent() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row selection:bg-blue-600 selection:text-white font-sans">
      
      {/* Left Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Studio View Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'admin_portal' ? (
            <AdminPortalView />
          ) : activeTab === 'finance_portal' ? (
            <FinancePortalView />
          ) : activeTab === 'photographer_portal' ? (
            <PhotographerPortalView />
          ) : (
            <MainDashboardView />
          )}
        </main>

        {/* Studio Footer */}
        <Footer />
      </div>

    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}

