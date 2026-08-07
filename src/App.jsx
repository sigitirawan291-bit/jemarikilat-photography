import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import VideoModal from './components/VideoModal';
import BookingModal from './components/BookingModal';
import LiveChatWidget from './components/LiveChatWidget';
import { DataProvider, useData } from './context/DataContext';

import HomeView from './views/HomeView';
import GalleryView from './views/GalleryView';
import VideoView from './views/VideoView';
import EventView from './views/EventView';
import PricingView from './views/PricingView';
import ContactView from './views/ContactView';
import AdminView from './views/AdminView';
import FgDashboardView from './views/FgDashboardView';
import StudioToolsView from './views/StudioToolsView';

function AppContent() {
  const [activePage, setActivePage] = useState('studio-tools');

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
