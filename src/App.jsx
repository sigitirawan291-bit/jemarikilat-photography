import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { DataProvider } from './context/DataContext';
import StudioToolsView from './views/StudioToolsView';

function AppContent() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-blue-600 selection:text-white font-sans">
      
      {/* Top Glassmorphism Navigation Header */}
      <Navbar />

      {/* Core Studio Management Tools Main View */}
      <main className="flex-1">
        <StudioToolsView />
      </main>

      {/* White 3D Studio Footer */}
      <Footer />

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
