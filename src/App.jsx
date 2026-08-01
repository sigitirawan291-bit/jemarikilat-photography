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

function AppContent() {
  const [activePage, setActivePage] = useState('home');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [initialPackage, setInitialPackage] = useState('');

  const { eventSettings, photographers = [] } = useData();

  // Auto-login FG if URL contains ?fg_user=username or ?fg_id=fg-1
  React.useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const fgParam = urlParams.get('fg_user') || urlParams.get('fg_id') || urlParams.get('fg');
      if (fgParam && photographers.length > 0) {
        const cleanVal = fgParam.trim().toLowerCase().replace('@', '');
        const foundFg = photographers.find(
          (f) =>
            f.username?.toLowerCase().replace('@', '') === cleanVal ||
            f.id === cleanVal ||
            f.phone?.replace(/[^0-9]/g, '') === cleanVal
        );
        if (foundFg) {
          sessionStorage.setItem('jemari_fg_auth_id', foundFg.id);
          setActivePage('fg-dashboard');
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    } catch (e) {
      console.error('Error auto-logging in FG via URL parameter:', e);
    }
  }, [photographers]);

  const handleOpenBookingWithPackage = (pkgId) => {
    setInitialPackage(pkgId || '');
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col justify-between selection:bg-primary selection:text-on-primary font-sans">
      
      {/* Top Glassmorphism Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenBooking={() => handleOpenBookingWithPackage('')}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomeView
            setActivePage={setActivePage}
            onSelectPhoto={(photo) => setSelectedPhoto(photo)}
            onSelectVideo={(video) => setSelectedVideo(video)}
            onOpenBooking={() => handleOpenBookingWithPackage('')}
          />
        )}

        {activePage === 'gallery' && (
          <GalleryView
            onSelectPhoto={(photo) => setSelectedPhoto(photo)}
          />
        )}

        {activePage === 'video' && (
          <VideoView
            onSelectVideo={(video) => setSelectedVideo(video)}
          />
        )}

        {activePage === 'event' && (
          eventSettings?.isEventPageHidden ? (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8 space-y-4 font-sans pt-32">
              <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center text-2xl border border-outline-variant/40 shadow-inner">
                🔒
              </div>
              <h2 className="font-serif text-3xl text-primary font-bold">Halaman Event Sedang Non-Aktif</h2>
              <p className="text-xs text-on-surface-variant max-w-md leading-relaxed">
                Halaman Event saat ini disembunyikan oleh Administrator. Silakan jelajahi galeri foto dan video sinematik kami yang lain.
              </p>
              <button
                onClick={() => setActivePage('home')}
                className="px-6 py-3 bg-primary text-on-primary font-sans text-xs tracking-widest font-bold uppercase hover:bg-outline transition-colors shadow-lg mt-2"
              >
                Kembali ke Halaman Utama (Home)
              </button>
            </div>
          ) : (
            <EventView
              onSelectPhoto={(photo) => setSelectedPhoto(photo)}
              onSelectVideo={(video) => setSelectedVideo(video)}
              onOpenBooking={(pkgId) => handleOpenBookingWithPackage(pkgId)}
            />
          )
        )}

        {activePage === 'pricing' && (
          <PricingView
            onSelectPackage={(pkgId) => handleOpenBookingWithPackage(pkgId)}
            onOpenBooking={() => handleOpenBookingWithPackage('')}
          />
        )}

        {activePage === 'contact' && (
          <ContactView
            onOpenBooking={() => handleOpenBookingWithPackage('')}
          />
        )}

        {activePage === 'fg-dashboard' && (
          <FgDashboardView setActivePage={setActivePage} />
        )}

        {activePage === 'admin' && (
          <AdminView />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenBooking={() => handleOpenBookingWithPackage('')}
      />

      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialPackage={initialPackage}
      />

      {/* Global Floating Live Chat Widget */}
      <LiveChatWidget
        onOpenBooking={() => handleOpenBookingWithPackage('')}
      />

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
