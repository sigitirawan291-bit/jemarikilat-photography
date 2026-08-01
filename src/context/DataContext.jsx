import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PHOTOS as INITIAL_PHOTOS, 
  VIDEOS as INITIAL_VIDEOS, 
  PRICING_PACKAGES as INITIAL_WEDDING_PACKAGES, 
  GRADUATION_PRICING_PACKAGES as INITIAL_GRAD_PACKAGES,
  ENGAGEMENT_PRICING_PACKAGES as INITIAL_ENG_PACKAGES,
  PREWEDDING_PRICING_PACKAGES as INITIAL_PREWED_PACKAGES,
  GROUP_PRICING_PACKAGES as INITIAL_GROUP_PACKAGES,
  SPECIAL_PRICING_PACKAGES as INITIAL_SPEC_PACKAGES,
  EVENT_PRICING_PACKAGES as INITIAL_EVENT_PACKAGES
} from '../data/portfolioData';

// Initial sample bookings data for demo & testing
const INITIAL_BOOKINGS_DATA = [
  {
    id: 'b-101',
    bookingRef: 'JMR-892104',
    name: 'Clara Sativa',
    email: 'clara.sativa@example.com',
    phone: '081298765432',
    selectedPkg: 'pkg-wedding-royal',
    date: '2024-11-20',
    location: 'JW Marriott Hotel Medan',
    notes: 'Mohon siapkan 2 videografer untuk liputan acara resepsi malam.',
    status: 'Confirmed',
    createdAt: '2024-08-01T10:15:00Z'
  },
  {
    id: 'b-102',
    bookingRef: 'JMR-341920',
    name: 'Dimas Kurniawan',
    email: 'dimas.kurniawan@gmail.com',
    phone: '082145678901',
    selectedPkg: 'pkg-grad-group',
    date: '2024-09-15',
    location: 'JEMARI KILAT Studio Medan',
    notes: 'Sesi foto graduation dengan 3 anggota keluarga.',
    status: 'Pending',
    createdAt: '2024-08-02T14:30:00Z'
  }
];

const INITIAL_PHOTOGRAPHERS = [
  {
    id: 'fg-1',
    username: 'sigit',
    name: 'Sigit Irawan',
    phone: '081360318361',
    pin: '1234',
    email: 'sigit.photographer@jemarikilat.com',
    specialty: 'Lead Photographer • Wedding & Fashion',
    gear: 'Sony A7R V, FE 85mm f/1.4 GM, FE 35mm f/1.4 GM',
    rating: 4.9,
    completedProjects: 42,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    availability: ['2026-08-02', '2026-08-05', '2026-08-08', '2026-08-10', '2026-08-15', '2026-08-20']
  },
  {
    id: 'fg-2',
    username: 'rian',
    name: 'Rian Pratama',
    phone: '081234567890',
    pin: '1234',
    email: 'rian.pratama@jemarikilat.com',
    specialty: 'Senior Photographer • Graduation & Group',
    gear: 'Sony A7 IV, FE 24-70mm f/2.8 GM II',
    rating: 4.8,
    completedProjects: 29,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    availability: ['2026-08-01', '2026-08-03', '2026-08-07', '2026-08-12', '2026-08-18']
  }
];

const INITIAL_PARTNERSHIPS = [
  {
    id: 'part-1',
    name: 'Titik Tuju Studio',
    categoryTag: 'INDOOR & CREATIVE STUDIO',
    instagram: '@titiktuju.studio',
    instagramUrl: 'https://instagram.com/titiktuju.studio',
    description: 'Studio foto indoor kreatif dengan tata cahaya alami (natural lighting) dan dekorasi backdrop estetik yang sangat cocok untuk foto wisuda, portrait pribadi, serta konsep fine-art.',
    features: [
      'Lighting Pro & Set Dekorasi Estetik',
      'Direkomendasikan untuk Foto Wisuda & Portrait',
      'Lokasi: Kota Medan, Sumatera Utara'
    ]
  },
  {
    id: 'part-2',
    name: 'NATURAL Studio',
    categoryTag: 'MINIMALIST & MODERN STUDIO',
    instagram: '@naturalstudio.mdn',
    instagramUrl: 'https://instagram.com/naturalstudio.mdn',
    description: 'Studio foto bergaya minimalis modern dengan pencahayaan lembut yang menghasilkan nuansa foto bersih, elegan, dan sangat cocok untuk foto wisuda grup, pasangan, serta foto keluarga.',
    features: [
      'Set Backdrop Minimalis & Modern Daylight',
      'Sangat Cocok untuk Foto Grup & Keluarga',
      'Lokasi: Kota Medan, Sumatera Utara'
    ]
  }
];

const DataContext = createContext(null);

const STORAGE_KEYS = {
  PHOTOS: 'jemari_photos_v1',
  VIDEOS: 'jemari_videos_v1',
  PACKAGES: 'jemari_all_pkgs_v2',
  BOOKINGS: 'jemari_bookings_v1',
  ADMIN_PIN: 'jemari_admin_pin_v1',
  PHOTOGRAPHERS: 'jemari_photographers_v1',
  PARTNERSHIPS: 'jemari_partnerships_v1',
  EVENT_SETTINGS: 'jemari_event_settings_v1'
};

const INITIAL_EVENT_SETTINGS = {
  isEventPageHidden: false,
  badgeText: 'HIGH-VOLTAGE STAGE & SUMMIT DOCUMENTARY',
  headline: 'High-Energy Concerts & Executive Summits.',
  description: 'Penuturan dokumenter visual Imersif untuk festival musik live, konser tur panggung utama, seminar simposium internasional, hingga gala celebration dengan grading warna obsidian berseni tinggi.',
  stagesCaptured: '150+ STAGES',
  deliverySpeed: '24-HOUR PRESS'
};

const INITIAL_PACKAGES_MAP = {
  wedding: INITIAL_WEDDING_PACKAGES,
  graduation: INITIAL_GRAD_PACKAGES,
  engagement: INITIAL_ENG_PACKAGES,
  prewedding: INITIAL_PREWED_PACKAGES,
  group: INITIAL_GROUP_PACKAGES,
  special: INITIAL_SPEC_PACKAGES,
  event: INITIAL_EVENT_PACKAGES
};

export function DataProvider({ children }) {
  // Helper to load from localStorage with fallback & type validation
  const loadInitial = (key, fallback) => {
    try {
      const saved = localStorage.getItem(key);
      if (!saved) return fallback;
      const parsed = JSON.parse(saved);
      if (Array.isArray(fallback) && !Array.isArray(parsed)) return fallback;
      if (typeof fallback === 'object' && fallback !== null && (typeof parsed !== 'object' || parsed === null)) return fallback;
      return parsed;
    } catch (e) {
      console.error(`Error loading ${key} from localStorage`, e);
      return fallback;
    }
  };

  const [photos, setPhotos] = useState(() => loadInitial(STORAGE_KEYS.PHOTOS, INITIAL_PHOTOS));
  const [videos, setVideos] = useState(() => loadInitial(STORAGE_KEYS.VIDEOS, INITIAL_VIDEOS));
  const [packagesMap, setPackagesMap] = useState(() => loadInitial(STORAGE_KEYS.PACKAGES, INITIAL_PACKAGES_MAP));
  const [bookings, setBookings] = useState(() => loadInitial(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS_DATA));
  const [adminPin, setAdminPin] = useState(() => loadInitial(STORAGE_KEYS.ADMIN_PIN, '1234'));
  const [photographers, setPhotographers] = useState(() => loadInitial(STORAGE_KEYS.PHOTOGRAPHERS, INITIAL_PHOTOGRAPHERS));
  const [partnerships, setPartnerships] = useState(() => loadInitial(STORAGE_KEYS.PARTNERSHIPS, INITIAL_PARTNERSHIPS));
  const [eventSettings, setEventSettings] = useState(() => loadInitial(STORAGE_KEYS.EVENT_SETTINGS, INITIAL_EVENT_SETTINGS));

  // Helper to safely save to localStorage without throwing QuotaExceededError
  const safeSaveLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn(`[LocalStorage Error] Failed to save key "${key}":`, e);
    }
  };

  // Sync to localStorage on state changes
  useEffect(() => {
    safeSaveLocalStorage(STORAGE_KEYS.PHOTOS, photos);
  }, [photos]);

  useEffect(() => {
    safeSaveLocalStorage(STORAGE_KEYS.VIDEOS, videos);
  }, [videos]);

  useEffect(() => {
    safeSaveLocalStorage(STORAGE_KEYS.PACKAGES, packagesMap);
  }, [packagesMap]);

  useEffect(() => {
    safeSaveLocalStorage(STORAGE_KEYS.BOOKINGS, bookings);
  }, [bookings]);

  useEffect(() => {
    safeSaveLocalStorage(STORAGE_KEYS.PHOTOGRAPHERS, photographers);
  }, [photographers]);

  useEffect(() => {
    safeSaveLocalStorage(STORAGE_KEYS.PARTNERSHIPS, partnerships);
  }, [partnerships]);

  useEffect(() => {
    safeSaveLocalStorage(STORAGE_KEYS.EVENT_SETTINGS, eventSettings);
  }, [eventSettings]);

  useEffect(() => {
    safeSaveLocalStorage(STORAGE_KEYS.ADMIN_PIN, adminPin);
  }, [adminPin]);

  // Helper getters for backward compatibility
  const weddingPackages = (packagesMap && packagesMap.wedding) || [];
  const graduationPackages = (packagesMap && packagesMap.graduation) || [];
  const engagementPackages = (packagesMap && packagesMap.engagement) || [];
  const preweddingPackages = (packagesMap && packagesMap.prewedding) || [];
  const groupPackages = (packagesMap && packagesMap.group) || [];
  const specialPackages = (packagesMap && packagesMap.special) || [];
  const eventPackages = (packagesMap && packagesMap.event) || INITIAL_EVENT_PACKAGES;

  const getPackagesByCategory = (cat) => {
    return (packagesMap && packagesMap[cat]) || [];
  };

  // --- PHOTO CRUD ---
  const addPhoto = (newPhoto) => {
    const created = {
      id: `p-${Date.now()}`,
      year: new Date().getFullYear().toString(),
      isHidden: false,
      isFeaturedHome: false,
      ...newPhoto
    };
    setPhotos((prev) => [created, ...prev]);
  };

  const updatePhoto = (id, updatedData) => {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p)));
  };

  const deletePhoto = (id) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleHidePhoto = (id) => {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, isHidden: !p.isHidden } : p)));
  };

  const toggleHomeFeaturedPhoto = (id) => {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, isFeaturedHome: !p.isFeaturedHome } : p)));
  };

  const toggleGalleryCarouselPhoto = (id) => {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, inGalleryCarousel: !p.inGalleryCarousel } : p)));
  };

  const toggleShowInGallery = (id) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, showInGallery: p.showInGallery === false ? true : false } : p))
    );
  };

  const movePhotoUp = (id) => {
    setPhotos((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx <= 0) return prev;
      const copy = [...prev];
      const temp = copy[idx - 1];
      copy[idx - 1] = copy[idx];
      copy[idx] = temp;
      return copy;
    });
  };

  const movePhotoDown = (id) => {
    setPhotos((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx < 0 || idx >= prev.length - 1) return prev;
      const copy = [...prev];
      const temp = copy[idx + 1];
      copy[idx + 1] = copy[idx];
      copy[idx] = temp;
      return copy;
    });
  };

  // --- VIDEO CRUD ---
  const addVideo = (newVideo) => {
    const created = {
      id: `v-${Date.now()}`,
      year: new Date().getFullYear().toString(),
      isHidden: false,
      isFeaturedHome: false,
      ...newVideo
    };
    setVideos((prev) => [created, ...prev]);
  };

  const updateVideo = (id, updatedData) => {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, ...updatedData } : v)));
  };

  const deleteVideo = (id) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  const toggleHideVideo = (id) => {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, isHidden: !v.isHidden } : v)));
  };

  const toggleHomeFeaturedVideo = (id) => {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, isFeaturedHome: !v.isFeaturedHome } : v)));
  };

  const moveVideoUp = (id) => {
    setVideos((prev) => {
      const idx = prev.findIndex((v) => v.id === id);
      if (idx <= 0) return prev;
      const copy = [...prev];
      const temp = copy[idx - 1];
      copy[idx - 1] = copy[idx];
      copy[idx] = temp;
      return copy;
    });
  };

  const moveVideoDown = (id) => {
    setVideos((prev) => {
      const idx = prev.findIndex((v) => v.id === id);
      if (idx < 0 || idx >= prev.length - 1) return prev;
      const copy = [...prev];
      const temp = copy[idx + 1];
      copy[idx + 1] = copy[idx];
      copy[idx] = temp;
      return copy;
    });
  };

  // --- PRICING PACKAGE CRUD ACROSS ALL CATEGORIES ---
  const addPackage = (category, newPackageData) => {
    const catKey = category || 'wedding';
    const newPkg = {
      id: `pkg-${catKey}-${Date.now()}`,
      recommended: false,
      features: [],
      ...newPackageData
    };
    setPackagesMap((prev) => ({
      ...prev,
      [catKey]: [...(prev[catKey] || []), newPkg]
    }));
  };

  const updatePackage = (category, id, updatedData) => {
    const catKey = category || 'wedding';
    setPackagesMap((prev) => ({
      ...prev,
      [catKey]: (prev[catKey] || []).map((pkg) => (pkg.id === id ? { ...pkg, ...updatedData } : pkg))
    }));
  };

  const deletePackage = (category, id) => {
    const catKey = category || 'wedding';
    setPackagesMap((prev) => ({
      ...prev,
      [catKey]: (prev[catKey] || []).filter((pkg) => pkg.id !== id)
    }));
  };

  // --- BOOKING CRUD ---
  const addBooking = (bookingData) => {
    const newEntry = {
      id: `b-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      ...bookingData
    };
    setBookings((prev) => [newEntry, ...prev]);
    return newEntry;
  };

  const updateBookingStatus = (id, newStatus) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
  };

  const updateBooking = (id, updatedData) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...updatedData } : b)));
  };

  const deleteBooking = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const assignBookingToFg = (bookingId, fgId) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              assignedFgId: fgId,
              projectStatus: b.projectStatus || 'Scheduled'
            }
          : b
      )
    );
  };

  const updateBookingProjectStatus = (bookingId, newProjectStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, projectStatus: newProjectStatus } : b))
    );
  };

  // --- PHOTOGRAPHER TEAM CRUD & AVAILABILITY ---
  const addPhotographer = (fgData) => {
    const generatedUsername = fgData.username || (fgData.name || '').toLowerCase().replace(/[^a-z0-9]/g, '') || `fg${Date.now()}`;
    const newFg = {
      id: `fg-${Date.now()}`,
      username: generatedUsername,
      pin: '1234',
      rating: 5.0,
      completedProjects: 0,
      availability: [],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      ...fgData
    };
    setPhotographers((prev) => [newFg, ...prev]);
    return newFg;
  };

  const updateFgProfile = (fgId, updatedData) => {
    setPhotographers((prev) =>
      prev.map((fg) => (fg.id === fgId ? { ...fg, ...updatedData } : fg))
    );
  };

  const deletePhotographer = (fgId) => {
    setPhotographers((prev) => prev.filter((fg) => fg.id !== fgId));
  };

  const toggleFgAvailability = (fgId, dateStr) => {
    setPhotographers((prev) =>
      prev.map((fg) => {
        if (fg.id !== fgId) return fg;
        const currentDates = fg.availability || [];
        const hasDate = currentDates.includes(dateStr);
        const updatedDates = hasDate
          ? currentDates.filter((d) => d !== dateStr)
          : [...currentDates, dateStr];
        return { ...fg, availability: updatedDates };
      })
    );
  };

  // --- PARTNERSHIP STUDIOS CRUD ---
  const addPartnership = (data) => {
    const newPart = {
      id: `part-${Date.now()}`,
      name: '',
      categoryTag: 'INDOOR STUDIO',
      instagram: '@studio',
      instagramUrl: 'https://instagram.com/',
      description: '',
      features: [],
      ...data
    };
    setPartnerships((prev) => [newPart, ...prev]);
    return newPart;
  };

  const updatePartnership = (id, updatedData) => {
    setPartnerships((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
    );
  };

  const deletePartnership = (id) => {
    setPartnerships((prev) => prev.filter((p) => p.id !== id));
  };

  const changeAdminPin = (newPin) => {
    setAdminPin(newPin);
  };

  const updateEventSettings = (newSettings) => {
    setEventSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const toggleHideEventPage = () => {
    setEventSettings((prev) => ({ ...prev, isEventPageHidden: !prev.isEventPageHidden }));
  };

  // Reset factory data
  const resetAllData = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.PHOTOS);
      localStorage.removeItem(STORAGE_KEYS.VIDEOS);
      localStorage.removeItem(STORAGE_KEYS.PACKAGES);
      localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
      localStorage.removeItem(STORAGE_KEYS.ADMIN_PIN);
      localStorage.removeItem(STORAGE_KEYS.PHOTOGRAPHERS);
      localStorage.removeItem(STORAGE_KEYS.PARTNERSHIPS);
      localStorage.removeItem(STORAGE_KEYS.EVENT_SETTINGS);

      setPhotos(INITIAL_PHOTOS);
      setVideos(INITIAL_VIDEOS);
      setPackagesMap(INITIAL_PACKAGES_MAP);
      setBookings(INITIAL_BOOKINGS_DATA);
      setAdminPin('1234');
      setPhotographers(INITIAL_PHOTOGRAPHERS);
      setPartnerships(INITIAL_PARTNERSHIPS);
      setEventSettings(INITIAL_EVENT_SETTINGS);
    } catch (e) {
      console.error('Error resetting data:', e);
    }
  };

  return (
    <DataContext.Provider
      value={{
        photos,
        videos,
        weddingPackages,
        graduationPackages,
        eventPackages,
        getPackagesByCategory,
        packagesMap,
        bookings,
        adminPin,
        changeAdminPin,
        photographers,
        addPhotographer,
        updateFgProfile,
        deletePhotographer,
        toggleFgAvailability,
        assignBookingToFg,
        updateBookingProjectStatus,
        partnerships,
        addPartnership,
        updatePartnership,
        deletePartnership,
        eventSettings,
        updateEventSettings,
        toggleHideEventPage,
        addPhoto,
        updatePhoto,
        deletePhoto,
        toggleHidePhoto,
        toggleHomeFeaturedPhoto,
        toggleGalleryCarouselPhoto,
        toggleShowInGallery,
        movePhotoUp,
        movePhotoDown,
        addVideo,
        updateVideo,
        deleteVideo,
        toggleHideVideo,
        toggleHomeFeaturedVideo,
        moveVideoUp,
        moveVideoDown,
        addPackage,
        updatePackage,
        deletePackage,
        addBooking,
        updateBooking,
        updateBookingStatus,
        deleteBooking,
        resetAllData
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
