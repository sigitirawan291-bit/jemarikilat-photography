import React, { useState, useEffect } from 'react';
import { 
  Lock, Key, LogOut, LayoutDashboard, CalendarCheck, Image, Video, Tag, Home,
  Plus, Edit, Trash2, Eye, EyeOff, Download, FileSpreadsheet, CheckCircle, 
  XCircle, Clock, Search, Filter, ShieldCheck, Sparkles, RefreshCw, Star, Camera, Send,
  Settings, UserPlus, Copy, Check, AlertTriangle, Shield, Calendar, MapPin, Building2, Instagram,
  Radio, Save
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { exportBookingsToCsv } from '../utils/exportCsv';
import { downloadBookingPdf } from '../utils/adminPdf';
import { compressImageFile } from '../utils/imageCompressor';

export default function AdminView() {
  const {
    photos,
    videos,
    weddingPackages,
    graduationPackages,
    getPackagesByCategory,
    bookings,
    adminPin,
    setAdminPin,
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
    photographers = [],
    addPhotographer,
    updateFgProfile,
    deletePhotographer,
    toggleFgAvailability,
    assignBookingToFg,
    partnerships = [],
    addPartnership,
    updatePartnership,
    deletePartnership,
    eventSettings,
    updateEventSettings,
    toggleHideEventPage,
    eventPackages = [],
    resetAllData
  } = useData();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('jemari_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Toast Feedback System
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Active Admin Sub-Tab: 'overview' | 'bookings' | 'media' | 'pricing' | 'photographers' | 'home' | 'settings'
  const [activeTab, setActiveTab] = useState('overview');

  // Media Tab Sub-Category: 'photos' | 'videos'
  const [mediaType, setMediaType] = useState('photos');
  const [mediaSearch, setMediaSearch] = useState('');
  const [mediaCategoryFilter, setMediaCategoryFilter] = useState('all');

  // Pricing Tab Sub-Category
  const [pricingType, setPricingType] = useState('wedding');

  // Booking Filters
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState('all');

  // Modals State
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const [editingVideo, setEditingVideo] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const [editingPackage, setEditingPackage] = useState(null);
  const [isPkgModalOpen, setIsPkgModalOpen] = useState(false);

  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [isEditBookingModalOpen, setIsEditBookingModalOpen] = useState(false);

  // Photographer Modal State (Add & Edit)
  const [isFgModalOpen, setIsFgModalOpen] = useState(false);
  const [editingFg, setEditingFg] = useState(null);
  const [fgForm, setFgForm] = useState({
    name: '',
    username: '',
    phone: '',
    email: '',
    specialty: 'Lead Photographer • Wedding & Fashion',
    gear: 'Sony A7R V, 85mm f/1.4 GM',
    pin: '1234',
    rating: 5.0,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'
  });

  // FG Calendar View/Manage Modal
  const [selectedFgForCalendar, setSelectedFgForCalendar] = useState(null);
  const [isFgCalendarModalOpen, setIsFgCalendarModalOpen] = useState(false);

  // Partnership Studio Modal State
  const [isPartnershipModalOpen, setIsPartnershipModalOpen] = useState(false);
  const [editingPartnership, setEditingPartnership] = useState(null);
  const [partnershipForm, setPartnershipForm] = useState({
    name: '',
    categoryTag: 'INDOOR & CREATIVE STUDIO',
    instagram: '',
    instagramUrl: '',
    description: '',
    features: ''
  });

  // Event CMS Form State
  const [eventForm, setEventForm] = useState(() => ({
    badgeText: eventSettings?.badgeText || 'HIGH-VOLTAGE STAGE & SUMMIT DOCUMENTARY',
    headline: eventSettings?.headline || 'High-Energy Concerts & Executive Summits.',
    description: eventSettings?.description || 'Penuturan dokumenter visual Imersif untuk festival musik live, konser tur panggung utama, seminar simposium internasional, hingga gala celebration dengan grading warna obsidian berseni tinggi.',
    stagesCaptured: eventSettings?.stagesCaptured || '150+ STAGES',
    deliverySpeed: eventSettings?.deliverySpeed || '24-HOUR PRESS'
  }));

  useEffect(() => {
    if (eventSettings) {
      setEventForm({
        badgeText: eventSettings.badgeText || '',
        headline: eventSettings.headline || '',
        description: eventSettings.description || '',
        stagesCaptured: eventSettings.stagesCaptured || '',
        deliverySpeed: eventSettings.deliverySpeed || ''
      });
    }
  }, [eventSettings]);

  const handleSaveEventSettings = (e) => {
    e.preventDefault();
    updateEventSettings(eventForm);
    showToast('Konten Halaman Event Berhasil Diperbarui!');
  };

  // Form States for Photo Add/Edit
  const [photoForm, setPhotoForm] = useState({
    title: '',
    category: 'Wedding',
    year: '2024',
    location: 'Kota Medan / Indonesia',
    image: '',
    aspect: 'portrait',
    camera: 'Sony A7R V',
    lens: 'FE 85mm f/1.4 GM',
    client: '',
    description: ''
  });

  // Form States for Video Add/Edit
  const [videoForm, setVideoForm] = useState({
    title: '',
    category: 'Wedding Film',
    year: '2024',
    location: 'Kota Medan / Indonesia',
    thumbnail: '',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '03:45',
    description: ''
  });

  // Form States for Package Edit
  const [pkgForm, setPkgForm] = useState({
    name: '',
    priceIdr: '',
    priceUsd: '',
    subtitle: '',
    recommended: false,
    features: ''
  });

  // Form States for New Manual Booking & Edit Booking
  const [newBookingForm, setNewBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    selectedPkg: 'pkg-wedding',
    date: '',
    startTime: '09:00',
    endTime: '17:00',
    location: '',
    notes: '',
    assignedFgId: ''
  });

  const [bookingEditForm, setBookingEditForm] = useState({
    bookingRef: '',
    name: '',
    email: '',
    phone: '',
    selectedPkg: '',
    date: '',
    startTime: '09:00',
    endTime: '17:00',
    location: '',
    notes: '',
    status: 'Pending',
    assignedFgId: ''
  });

  // Security Change PIN State
  const [pinChangeForm, setPinChangeForm] = useState({
    currentPin: '',
    newPin: '',
    confirmPin: ''
  });
  const [pinStatusMsg, setPinStatusMsg] = useState({ type: '', text: '' });

  // YouTube Embed Formatter
  const formatYoutubeEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      const vId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${vId}`;
    }
    if (url.includes('youtu.be/')) {
      const vId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${vId}`;
    }
    return url;
  };

  // Helper to check FG availability for a date
  const isFgAvailableOnDate = (fg, dateStr) => {
    if (!fg || !dateStr) return true; // if no date set, don't flag as conflict
    const dates = fg.availability || [];
    return dates.includes(dateStr);
  };

  // Smart FG assignment handler with availability warning
  const handleAssignFgToBooking = (bookingId, fgId, bookingDate) => {
    if (!fgId) {
      assignBookingToFg(bookingId, '');
      return;
    }

    const fgObj = photographers.find((f) => f.id === fgId);
    if (bookingDate && fgObj) {
      const isAvail = isFgAvailableOnDate(fgObj, bookingDate);
      if (!isAvail) {
        const confirmAssign = window.confirm(
          `⚠️ PERINGATAN JADWAL:\n\nFotografer "${fgObj.name}" TIDAK menandai ketersediaan (Status: LIBUR) pada tanggal ${bookingDate}.\n\nApakah Anda yakin tetap ingin menugaskan fotografer ini?`
        );
        if (!confirmAssign) return;
      }
    }

    assignBookingToFg(bookingId, fgId);
    if (fgObj) {
      showToast(`Booking ditugaskan ke fotografer ${fgObj.name}!`);
    }
  };

  // --- AUTH HANDLER ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === adminPin || pinInput === '1234') {
      setIsAuthenticated(true);
      sessionStorage.setItem('jemari_admin_auth', 'true');
      setPinError('');
      showToast("Selamat datang kembali di Admin Dashboard JEMARI KILAT!");
    } else {
      setPinError(`PIN Admin tidak valid. (Gunakan PIN default: 1234)`);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('jemari_admin_auth');
  };

  // Combine all packages across categories for lookup
  const categoriesList = ['wedding', 'graduation', 'engagement', 'prewedding', 'group', 'special', 'event'];
  const allPackages = categoriesList.flatMap((cat) => getPackagesByCategory(cat));

  const getPackageLabel = (pkgId) => {
    const found = allPackages.find((p) => p.id === pkgId);
    return found ? `${found.name} (${found.priceIdr})` : pkgId;
  };

  // Filter Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = 
      (b.name || '').toLowerCase().includes(bookingSearch.toLowerCase()) ||
      (b.bookingRef || '').toLowerCase().includes(bookingSearch.toLowerCase()) ||
      (b.phone || '').includes(bookingSearch) ||
      (b.email || '').toLowerCase().includes(bookingSearch.toLowerCase()) ||
      (b.location || '').toLowerCase().includes(bookingSearch.toLowerCase());

    const matchesStatus = bookingStatusFilter === 'all' || (b.status || 'pending').toLowerCase() === bookingStatusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Filter Photos
  const filteredPhotos = photos.filter((p) => {
    const matchesSearch = (p.title || '').toLowerCase().includes(mediaSearch.toLowerCase()) ||
                          (p.location || '').toLowerCase().includes(mediaSearch.toLowerCase());
    const matchesCat = mediaCategoryFilter === 'all' || (p.category || '').toLowerCase() === mediaCategoryFilter.toLowerCase();
    return matchesSearch && matchesCat;
  });

  // Filter Videos
  const filteredVideos = videos.filter((v) => {
    const matchesSearch = (v.title || '').toLowerCase().includes(mediaSearch.toLowerCase()) ||
                          (v.location || '').toLowerCase().includes(mediaSearch.toLowerCase());
    const matchesCat = mediaCategoryFilter === 'all' || (v.category || '').toLowerCase() === mediaCategoryFilter.toLowerCase();
    return matchesSearch && matchesCat;
  });

  // Photo Handlers
  const handleOpenPhotoModal = (photoToEdit = null) => {
    if (photoToEdit) {
      setEditingPhoto(photoToEdit);
      setPhotoForm({
        title: photoToEdit.title || '',
        category: photoToEdit.category || 'Wedding',
        year: photoToEdit.year || '2024',
        location: photoToEdit.location || 'Kota Medan / Indonesia',
        image: photoToEdit.image || '',
        aspect: photoToEdit.aspect || 'portrait',
        camera: photoToEdit.camera || 'Sony A7R V',
        lens: photoToEdit.lens || 'FE 85mm f/1.4 GM',
        client: photoToEdit.client || '',
        description: photoToEdit.description || ''
      });
    } else {
      setEditingPhoto(null);
      setPhotoForm({
        title: '',
        category: 'Wedding',
        year: '2024',
        location: 'Kota Medan / Indonesia',
        image: '',
        aspect: 'portrait',
        camera: 'Sony A7R V',
        lens: 'FE 85mm f/1.4 GM',
        client: '',
        description: ''
      });
    }
    setIsPhotoModalOpen(true);
  };

  const handleSavePhoto = (e) => {
    e.preventDefault();
    if (!photoForm.title || !photoForm.image) {
      alert("Harap isi Judul dan URL/File Gambar Foto!");
      return;
    }

    if (editingPhoto) {
      updatePhoto(editingPhoto.id, photoForm);
      showToast(`Foto "${photoForm.title}" berhasil diperbarui!`);
    } else {
      addPhoto(photoForm);
      showToast(`Foto baru "${photoForm.title}" berhasil ditambahkan ke galeri!`);
    }
    setIsPhotoModalOpen(false);
  };

  // Video Handlers
  const handleOpenVideoModal = (videoToEdit = null) => {
    if (videoToEdit) {
      setEditingVideo(videoToEdit);
      setVideoForm({
        title: videoToEdit.title || '',
        category: videoToEdit.category || 'Wedding Film',
        year: videoToEdit.year || '2024',
        location: videoToEdit.location || 'Kota Medan / Indonesia',
        thumbnail: videoToEdit.thumbnail || '',
        videoUrl: videoToEdit.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: videoToEdit.duration || '03:45',
        description: videoToEdit.description || ''
      });
    } else {
      setEditingVideo(null);
      setVideoForm({
        title: '',
        category: 'Wedding Film',
        year: '2024',
        location: 'Kota Medan / Indonesia',
        thumbnail: '',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '03:45',
        description: ''
      });
    }
    setIsVideoModalOpen(true);
  };

  const handleSaveVideo = (e) => {
    e.preventDefault();
    if (!videoForm.title || !videoForm.thumbnail) {
      alert("Harap isi Judul dan URL Thumbnail Video!");
      return;
    }

    const formattedPayload = {
      ...videoForm,
      videoUrl: formatYoutubeEmbedUrl(videoForm.videoUrl)
    };

    if (editingVideo) {
      updateVideo(editingVideo.id, formattedPayload);
      showToast(`Video "${videoForm.title}" berhasil diperbarui!`);
    } else {
      addVideo(formattedPayload);
      showToast(`Video sinematik baru "${videoForm.title}" berhasil ditambahkan!`);
    }
    setIsVideoModalOpen(false);
  };

  // Package Handlers (Add & Edit)
  const handleOpenPkgModal = (pkg = null) => {
    if (pkg) {
      setEditingPackage(pkg);
      setPkgForm({
        name: pkg.name || '',
        priceIdr: pkg.priceIdr || '',
        priceUsd: pkg.priceUsd || '',
        subtitle: pkg.subtitle || '',
        recommended: pkg.recommended || false,
        features: Array.isArray(pkg.features) ? pkg.features.join('\n') : ''
      });
    } else {
      setEditingPackage(null);
      setPkgForm({
        name: '',
        priceIdr: 'Rp 0',
        priceUsd: '$0 USD',
        subtitle: '',
        recommended: false,
        features: ''
      });
    }
    setIsPkgModalOpen(true);
  };

  const handleSavePkg = (e) => {
    e.preventDefault();
    if (!pkgForm.name || !pkgForm.priceIdr) {
      alert("Harap isi Nama Paket dan Harga IDR!");
      return;
    }

    const featuresArray = pkgForm.features
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      name: pkgForm.name,
      priceIdr: pkgForm.priceIdr,
      priceUsd: pkgForm.priceUsd || '$0 USD',
      subtitle: pkgForm.subtitle,
      recommended: pkgForm.recommended,
      features: featuresArray
    };

    if (editingPackage) {
      updatePackage(pricingType, editingPackage.id, payload);
      showToast(`Paket "${pkgForm.name}" berhasil diperbarui!`);
    } else {
      addPackage(pricingType, payload);
      showToast(`Paket baru "${pkgForm.name}" berhasil ditambahkan ke ${pricingType.toUpperCase()}!`);
    }

    setIsPkgModalOpen(false);
  };

  // New Manual Booking Handler
  const handleSaveNewBooking = (e) => {
    e.preventDefault();
    const randomRef = `JMR-${Math.floor(100000 + Math.random() * 900000)}`;

    if (newBookingForm.assignedFgId && newBookingForm.date) {
      const fgObj = photographers.find((f) => f.id === newBookingForm.assignedFgId);
      if (fgObj && !isFgAvailableOnDate(fgObj, newBookingForm.date)) {
        const confirmAssign = window.confirm(
          `⚠️ PERINGATAN JADWAL:\n\nFotografer "${fgObj.name}" TIDAK menandai ketersediaan (LIBUR) pada tanggal ${newBookingForm.date}.\n\nApakah Anda tetap ingin melanjutkan pembuatan booking ini?`
        );
        if (!confirmAssign) return;
      }
    }

    addBooking({
      bookingRef: randomRef,
      ...newBookingForm
    });
    setNewBookingForm({
      name: '',
      email: '',
      phone: '',
      selectedPkg: 'pkg-wedding',
      date: '',
      startTime: '09:00',
      endTime: '17:00',
      location: '',
      notes: '',
      assignedFgId: ''
    });
    setIsNewBookingModalOpen(false);
    showToast(`Booking manual atas nama ${newBookingForm.name} (Ref: ${randomRef}) berhasil dibuat!`);
  };

  // Edit Existing Booking Handler
  const handleOpenEditBookingModal = (booking) => {
    setEditingBooking(booking);
    setBookingEditForm({
      bookingRef: booking.bookingRef || '',
      name: booking.name || '',
      email: booking.email || '',
      phone: booking.phone || '',
      selectedPkg: booking.selectedPkg || '',
      date: booking.date || '',
      startTime: booking.startTime || '09:00',
      endTime: booking.endTime || '17:00',
      location: booking.location || '',
      notes: booking.notes || '',
      status: booking.status || 'Pending',
      assignedFgId: booking.assignedFgId || ''
    });
    setIsEditBookingModalOpen(true);
  };

  const handleSaveEditBooking = (e) => {
    e.preventDefault();
    if (!editingBooking) return;

    if (bookingEditForm.assignedFgId && bookingEditForm.date) {
      const fgObj = photographers.find((f) => f.id === bookingEditForm.assignedFgId);
      if (fgObj && !isFgAvailableOnDate(fgObj, bookingEditForm.date)) {
        const confirmAssign = window.confirm(
          `⚠️ PERINGATAN JADWAL:\n\nFotografer "${fgObj.name}" TIDAK menandai ketersediaan (LIBUR) pada tanggal ${bookingEditForm.date}.\n\nApakah Anda tetap ingin menyimpan perubahan ini?`
        );
        if (!confirmAssign) return;
      }
    }

    updateBooking(editingBooking.id, bookingEditForm);
    setIsEditBookingModalOpen(false);
    showToast(`Data booking ${bookingEditForm.bookingRef} atas nama ${bookingEditForm.name} berhasil diperbarui!`);
  };

  // Photographer Team Modal Handlers (Add & Edit)
  const handleOpenFgModal = (fgToEdit = null) => {
    if (fgToEdit) {
      setEditingFg(fgToEdit);
      setFgForm({
        name: fgToEdit.name || '',
        username: fgToEdit.username || (fgToEdit.name || '').toLowerCase().replace(/[^a-z0-9]/g, ''),
        phone: fgToEdit.phone || '',
        email: fgToEdit.email || '',
        specialty: fgToEdit.specialty || 'Lead Photographer • Wedding & Fashion',
        gear: fgToEdit.gear || 'Sony A7R V, 85mm f/1.4 GM',
        pin: fgToEdit.pin || '1234',
        rating: fgToEdit.rating || 5.0,
        avatar: fgToEdit.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'
      });
    } else {
      setEditingFg(null);
      setFgForm({
        name: '',
        username: '',
        phone: '',
        email: '',
        specialty: 'Lead Photographer • Wedding & Fashion',
        gear: 'Sony A7R V, 85mm f/1.4 GM',
        pin: '1234',
        rating: 5.0,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'
      });
    }
    setIsFgModalOpen(true);
  };

  const handleSaveFg = (e) => {
    e.preventDefault();
    if (!fgForm.name || !fgForm.phone) {
      alert("Harap isi Nama dan Nomor WhatsApp Fotografer!");
      return;
    }

    if (editingFg) {
      updateFgProfile(editingFg.id, fgForm);
      showToast(`Profil fotografer ${fgForm.name} berhasil diperbarui!`);
    } else {
      addPhotographer(fgForm);
      showToast(`Fotografer baru ${fgForm.name} berhasil didaftarkan!`);
    }
    setIsFgModalOpen(false);
  };

  // Partnership Studio Handlers
  const handleOpenPartnershipModal = (part = null) => {
    if (part) {
      setEditingPartnership(part);
      setPartnershipForm({
        name: part.name || '',
        categoryTag: part.categoryTag || 'INDOOR STUDIO',
        instagram: part.instagram || '',
        instagramUrl: part.instagramUrl || '',
        description: part.description || '',
        features: Array.isArray(part.features) ? part.features.join('\n') : ''
      });
    } else {
      setEditingPartnership(null);
      setPartnershipForm({
        name: '',
        categoryTag: 'INDOOR & CREATIVE STUDIO',
        instagram: '@studio',
        instagramUrl: 'https://instagram.com/',
        description: '',
        features: ''
      });
    }
    setIsPartnershipModalOpen(true);
  };

  const handleSavePartnership = (e) => {
    e.preventDefault();
    if (!partnershipForm.name) {
      alert("Harap masukkan Nama Studio Partner!");
      return;
    }

    const featuresArray = partnershipForm.features
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      name: partnershipForm.name,
      categoryTag: partnershipForm.categoryTag,
      instagram: partnershipForm.instagram.startsWith('@') ? partnershipForm.instagram : `@${partnershipForm.instagram}`,
      instagramUrl: partnershipForm.instagramUrl,
      description: partnershipForm.description,
      features: featuresArray
    };

    if (editingPartnership) {
      updatePartnership(editingPartnership.id, payload);
      showToast(`Studio partner "${partnershipForm.name}" berhasil diperbarui!`);
    } else {
      addPartnership(payload);
      showToast(`Studio partner baru "${partnershipForm.name}" berhasil ditambahkan!`);
    }
    setIsPartnershipModalOpen(false);
  };

  // Change Admin PIN Handler
  const handleChangeAdminPin = (e) => {
    e.preventDefault();
    setPinStatusMsg({ type: '', text: '' });

    if (pinChangeForm.currentPin !== adminPin && pinChangeForm.currentPin !== '1234') {
      setPinStatusMsg({ type: 'error', text: 'PIN Admin saat ini tidak sesuai.' });
      return;
    }
    if (pinChangeForm.newPin.length < 4) {
      setPinStatusMsg({ type: 'error', text: 'PIN baru minimal harus 4 digit.' });
      return;
    }
    if (pinChangeForm.newPin !== pinChangeForm.confirmPin) {
      setPinStatusMsg({ type: 'error', text: 'Konfirmasi PIN baru tidak cocok.' });
      return;
    }

    setAdminPin(pinChangeForm.newPin);
    setPinChangeForm({ currentPin: '', newPin: '', confirmPin: '' });
    setPinStatusMsg({ type: 'success', text: 'PIN Admin berhasil diubah dan disimpan!' });
    showToast("PIN Keamanan Admin berhasil diperbarui!");
  };

  // Export JSON Backup Data
  const handleExportJsonBackup = () => {
    const backupData = {
      photos,
      videos,
      allPackages,
      bookings,
      photographers,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `JEMARI_KILAT_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast("Backup data JSON studio berhasil diunduh!");
  };

  // Render Login Lock Screen if unauthenticated
  if (!isAuthenticated) {
    return (
      <div className="w-full pt-32 pb-24 px-6 min-h-screen bg-background flex flex-col items-center justify-center font-sans">
        <div className="w-full max-w-md bg-surface p-8 lg:p-10 border border-outline-variant/40 shadow-2xl text-center">
          <div className="w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Lock className="w-8 h-8" />
          </div>

          <span className="font-sans text-[10px] tracking-[0.3em] text-outline uppercase font-semibold block mb-1">
            SECURE ACCESS PORTAL
          </span>
          <h1 className="font-serif text-3xl text-primary font-normal mb-2">
            Studio Admin Login
          </h1>
          <p className="font-sans text-xs text-on-surface-variant mb-6 leading-relaxed">
            Masukkan PIN Admin untuk mengelola booking, tim fotografer, galeri, video, dan pricelist JEMARI KILAT Studio.
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block font-sans text-[10px] tracking-wider text-outline uppercase mb-1 font-semibold">
                PIN Admin (Default: 1234)
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Masukkan PIN 4 Digit..."
                className="w-full bg-surface-container px-4 py-3 border border-outline-variant/40 text-sm text-primary tracking-widest text-center focus:outline-none focus:border-primary font-mono"
                maxLength={8}
                required
              />
            </div>

            {pinError && (
              <p className="text-red-500 font-sans text-xs text-center">{pinError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-on-primary font-sans text-xs tracking-[0.2em] py-3.5 text-center uppercase font-semibold hover:bg-outline transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <Key className="w-4 h-4" /> MASUK DASHBOARD CMS
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-outline-variant/20 text-[10px] font-sans text-outline">
            OBSIDIAN & IVORY CMS • JEMARI KILAT STUDIO
          </div>
        </div>
      </div>
    );
  }

  // Days in month generator for Admin Calendar Modal
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const monthYearStr = today.toLocaleString('id-ID', { month: 'long', year: 'numeric' });

  return (
    <div className="w-full pt-28 pb-24 px-4 sm:px-6 lg:px-16 bg-background min-h-screen font-sans text-xs">
      
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-5 py-3 shadow-2xl border border-on-primary/20 flex items-center gap-3 animate-fade-in font-medium text-xs">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto">
        
        {/* Top Control Bar */}
        <div className="bg-primary text-on-primary p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-green-500 w-2.5 h-2.5 rounded-full animate-pulse" />
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-outline-variant font-semibold">
                ACTIVE ADMIN CONSOLE
              </span>
            </div>
            <h1 className="font-serif text-2xl lg:text-3xl text-on-primary font-normal mt-1">
              Studio Management Dashboard
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('settings')}
              className="px-4 py-2 bg-on-primary/10 text-on-primary border border-on-primary/20 hover:bg-on-primary/20 text-[11px] uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5"
            >
              <Settings className="w-3.5 h-3.5" /> Security & Settings
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-surface text-primary border border-surface hover:bg-outline-variant text-[11px] uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>

        {/* Dashboard Main Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-8 border-b border-outline-variant/40 pb-4 text-xs scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-3 tracking-[0.15em] uppercase font-semibold transition-all flex items-center gap-2 border whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-primary text-on-primary border-primary shadow-md'
                : 'bg-surface text-on-surface-variant border-outline-variant/30 hover:border-primary'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Overview & Stats
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-5 py-3 tracking-[0.15em] uppercase font-semibold transition-all flex items-center gap-2 border whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'bg-primary text-on-primary border-primary shadow-md'
                : 'bg-surface text-on-surface-variant border-outline-variant/30 hover:border-primary'
            }`}
          >
            <CalendarCheck className="w-4 h-4" /> Kelola Booking ({bookings.length})
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`px-5 py-3 tracking-[0.15em] uppercase font-semibold transition-all flex items-center gap-2 border whitespace-nowrap ${
              activeTab === 'media'
                ? 'bg-primary text-on-primary border-primary shadow-md'
                : 'bg-surface text-on-surface-variant border-outline-variant/30 hover:border-primary'
            }`}
          >
            <Image className="w-4 h-4" /> Galeri & Video ({photos.length + videos.length})
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-5 py-3 tracking-[0.15em] uppercase font-semibold transition-all flex items-center gap-2 border whitespace-nowrap ${
              activeTab === 'pricing'
                ? 'bg-primary text-on-primary border-primary shadow-md'
                : 'bg-surface text-on-surface-variant border-outline-variant/30 hover:border-primary'
            }`}
          >
            <Tag className="w-4 h-4" /> Kelola Pricelist ({allPackages.length})
          </button>

          <button
            onClick={() => setActiveTab('photographers')}
            className={`px-5 py-3 tracking-[0.15em] uppercase font-semibold transition-all flex items-center gap-2 border whitespace-nowrap ${
              activeTab === 'photographers'
                ? 'bg-primary text-on-primary border-primary shadow-md'
                : 'bg-surface text-on-surface-variant border-outline-variant/30 hover:border-primary'
            }`}
          >
            <Camera className="w-4 h-4" /> Tim FG ({photographers.length})
          </button>

          <button
            onClick={() => setActiveTab('partnerships')}
            className={`px-5 py-3 tracking-[0.15em] uppercase font-semibold transition-all flex items-center gap-2 border whitespace-nowrap ${
              activeTab === 'partnerships'
                ? 'bg-primary text-on-primary border-primary shadow-md'
                : 'bg-surface text-on-surface-variant border-outline-variant/30 hover:border-primary'
            }`}
          >
            <Building2 className="w-4 h-4 text-amber-400" /> Studio Partner ({partnerships.length})
          </button>

          <button
            onClick={() => setActiveTab('event-cms')}
            className={`px-5 py-3 tracking-[0.15em] uppercase font-semibold transition-all flex items-center gap-2 border whitespace-nowrap ${
              activeTab === 'event-cms'
                ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                : 'bg-surface text-on-surface-variant border-outline-variant/30 hover:border-purple-500'
            }`}
          >
            <Radio className="w-4 h-4 text-purple-400" /> Kurasi Event {eventSettings?.isEventPageHidden ? '(Hidden)' : ''}
          </button>

          <button
            onClick={() => setActiveTab('home')}
            className={`px-5 py-3 tracking-[0.15em] uppercase font-semibold transition-all flex items-center gap-2 border whitespace-nowrap ${
              activeTab === 'home'
                ? 'bg-primary text-on-primary border-primary shadow-md'
                : 'bg-surface text-on-surface-variant border-outline-variant/30 hover:border-primary'
            }`}
          >
            <Home className="w-4 h-4" /> Kurasi Home
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-3 tracking-[0.15em] uppercase font-semibold transition-all flex items-center gap-2 border whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-primary text-on-primary border-primary shadow-md'
                : 'bg-surface text-on-surface-variant border-outline-variant/30 hover:border-primary'
            }`}
          >
            <Settings className="w-4 h-4" /> Security & Backup
          </button>
        </div>

        {/* TAB 1: OVERVIEW & STATS */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Quick Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-surface p-6 border border-outline-variant/40 shadow-sm">
                <span className="text-[10px] tracking-[0.25em] text-outline uppercase font-semibold block mb-1">TOTAL RESERVASI</span>
                <div className="text-3xl font-serif font-bold text-primary">{bookings.length}</div>
                <div className="text-[11px] text-green-600 mt-2 flex items-center gap-1 font-medium">
                  <CheckCircle className="w-3.5 h-3.5" /> {bookings.filter((b) => b.status === 'Confirmed').length} Terkonfirmasi
                </div>
              </div>

              <div className="bg-surface p-6 border border-outline-variant/40 shadow-sm">
                <span className="text-[10px] tracking-[0.25em] text-outline uppercase font-semibold block mb-1">FOTO GALERI AKTIF</span>
                <div className="text-3xl font-serif font-bold text-primary">
                  {photos.filter((p) => !p.isHidden).length} <span className="text-sm font-normal text-outline">/ {photos.length}</span>
                </div>
                <div className="text-[11px] text-outline mt-2">
                  {photos.filter((p) => p.isHidden).length} Foto Tersembunyi
                </div>
              </div>

              <div className="bg-surface p-6 border border-outline-variant/40 shadow-sm">
                <span className="text-[10px] tracking-[0.25em] text-outline uppercase font-semibold block mb-1">VIDEO CINEMATIC</span>
                <div className="text-3xl font-serif font-bold text-primary">
                  {videos.filter((v) => !v.isHidden).length} <span className="text-sm font-normal text-outline">/ {videos.length}</span>
                </div>
                <div className="text-[11px] text-outline mt-2">
                  {videos.filter((v) => v.isHidden).length} Video Tersembunyi
                </div>
              </div>

              <div className="bg-surface p-6 border border-outline-variant/40 shadow-sm">
                <span className="text-[10px] tracking-[0.25em] text-outline uppercase font-semibold block mb-1">PAKET INVESTASI</span>
                <div className="text-3xl font-serif font-bold text-primary">
                  {allPackages.length}
                </div>
                <div className="text-[11px] text-primary mt-2">
                  {weddingPackages.length} Wedding • {graduationPackages.length} Graduation
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="bg-surface p-6 border border-outline-variant/40 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg text-primary font-semibold">Quick Action Shortcuts</h3>
                <p className="text-xs text-on-surface-variant">Akses cepat pembuatan data baru di studio</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => { setActiveTab('bookings'); setIsNewBookingModalOpen(true); }}
                  className="px-4 py-2.5 bg-primary text-on-primary hover:bg-outline transition-colors uppercase font-semibold tracking-wider flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Input Booking Manual
                </button>
                <button
                  onClick={() => { setActiveTab('media'); setMediaType('photos'); handleOpenPhotoModal(null); }}
                  className="px-4 py-2.5 bg-surface-container border border-outline-variant/40 hover:bg-outline-variant text-primary uppercase font-semibold tracking-wider flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Tambah Foto Portfolio
                </button>
                <button
                  onClick={() => { setActiveTab('photographers'); handleOpenFgModal(null); }}
                  className="px-4 py-2.5 bg-amber-600 text-white hover:bg-amber-700 transition-colors uppercase font-semibold tracking-wider flex items-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" /> Tambah Fotografer
                </button>
              </div>
            </div>

            {/* Recent Bookings Feed */}
            <div className="bg-surface p-6 lg:p-8 border border-outline-variant/40 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-serif text-xl text-primary font-normal">Reservasi Terbaru</h3>
                  <p className="text-xs text-on-surface-variant">Daftar booking terbaru dari pengguna website</p>
                </div>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs text-primary font-semibold hover:underline tracking-wider uppercase"
                >
                  Lihat Semua Booking →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container text-primary uppercase text-[10px] tracking-wider border-b border-outline-variant/40">
                      <th className="p-3">Ref Kode</th>
                      <th className="p-3">Nama Klien</th>
                      <th className="p-3">Kontak WA</th>
                      <th className="p-3">Target Tanggal</th>
                      <th className="p-3">Paket</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20 text-xs">
                    {bookings.slice(0, 5).map((b) => (
                      <tr key={b.id} className="hover:bg-surface-container/40">
                        <td className="p-3 font-mono font-bold text-primary">{b.bookingRef}</td>
                        <td className="p-3 font-medium">{b.name}</td>
                        <td className="p-3">{b.phone}</td>
                        <td className="p-3">{b.date}</td>
                        <td className="p-3">{getPackageLabel(b.selectedPkg)}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 text-[10px] font-semibold uppercase tracking-wider border ${
                            b.status === 'Confirmed' ? 'bg-green-100 text-green-800 border-green-300' :
                            b.status === 'Completed' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                            b.status === 'Cancelled' ? 'bg-red-100 text-red-800 border-red-300' :
                            'bg-yellow-100 text-yellow-800 border-yellow-300'
                          }`}>
                            {b.status || 'Pending'}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => downloadBookingPdf(b, getPackageLabel(b.selectedPkg))}
                            className="p-1.5 bg-primary text-on-primary hover:bg-outline transition-colors text-[10px] uppercase tracking-wider font-semibold"
                            title="Download Receipt PDF"
                          >
                            PDF Receipt
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KELOLA BOOKING & SPREADSHEET */}
        {activeTab === 'bookings' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-surface p-6 border border-outline-variant/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="font-serif text-2xl text-primary font-normal">Manajemen Booking & Availability Check</h2>
                <p className="text-xs text-on-surface-variant mt-1">
                  Kelola data pemesanan, tugaskan fotografer dengan pengecekan tanggal ketersediaan (*Availability Connected*), cetak PDF, & ekspor CSV.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsNewBookingModalOpen(true)}
                  className="px-4 py-3 bg-primary text-on-primary font-sans text-xs uppercase tracking-wider font-semibold hover:bg-on-surface-variant transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Tambah Booking Manual
                </button>

                <button
                  onClick={() => exportBookingsToCsv(bookings, allPackages)}
                  className="px-4 py-3 bg-green-700 text-white font-sans text-xs uppercase tracking-wider font-semibold hover:bg-green-800 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <FileSpreadsheet className="w-4 h-4" /> Export Spreadsheet (.CSV)
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-surface p-4 border border-outline-variant/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  placeholder="Cari nama, ref kode, email, no WA, lokasi..."
                  className="w-full bg-surface-container pl-9 pr-3 py-2 text-xs border border-outline-variant/40 focus:outline-none focus:border-primary text-primary"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-outline" />
                <span className="font-semibold text-primary">Filter Status:</span>
                <select
                  value={bookingStatusFilter}
                  onChange={(e) => setBookingStatusFilter(e.target.value)}
                  className="bg-surface-container px-3 py-2 text-xs border border-outline-variant/40 focus:outline-none focus:border-primary text-primary"
                >
                  <option value="all">Semua Status ({bookings.length})</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="bg-surface border border-outline-variant/40 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-primary text-on-primary uppercase text-[10px] tracking-wider">
                      <th className="p-4">Ref Kode</th>
                      <th className="p-4">Klien & Kontak</th>
                      <th className="p-4">Paket Acara</th>
                      <th className="p-4">Waktu & Lokasi</th>
                      <th className="p-4">Status Booking</th>
                      <th className="p-4">Assigned FG (Check Availability)</th>
                      <th className="p-4 text-center">Aksi / Sync FG</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20 text-xs">
                    {filteredBookings.length > 0 ? (
                      filteredBookings.map((b) => {
                        const assignedFg = photographers.find((fg) => fg.id === b.assignedFgId);
                        const isAssignedFgAvailable = assignedFg ? isFgAvailableOnDate(assignedFg, b.date) : true;

                        return (
                          <tr key={b.id} className="hover:bg-surface-container/50">
                            <td className="p-4 font-mono font-bold text-primary">{b.bookingRef}</td>
                            <td className="p-4 space-y-1">
                              <div className="font-semibold text-primary">{b.name}</div>
                              <div className="text-[11px] text-on-surface-variant">{b.email}</div>
                              <div className="text-[11px] text-green-700 font-medium">{b.phone}</div>
                            </td>
                            <td className="p-4 font-medium">{getPackageLabel(b.selectedPkg)}</td>
                            <td className="p-4 space-y-1">
                              <div className="font-semibold text-primary">📅 {b.date || '-'}</div>
                              <div className="text-[11px] text-amber-700 font-mono">⏱️ {b.startTime || '09:00'} - {b.endTime || '17:00'} WIB</div>
                              <div className="text-[11px] text-outline">📍 {b.location || '-'}</div>
                            </td>
                            <td className="p-4">
                              <select
                                value={b.status || 'Pending'}
                                onChange={(e) => {
                                  updateBookingStatus(b.id, e.target.value);
                                  showToast(`Status booking ${b.bookingRef} diperbarui ke ${e.target.value}`);
                                }}
                                className={`px-2 py-1 text-xs font-semibold uppercase tracking-wider border focus:outline-none ${
                                  b.status === 'Confirmed' ? 'bg-green-100 text-green-800 border-green-300' :
                                  b.status === 'Completed' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                                  b.status === 'Cancelled' ? 'bg-red-100 text-red-800 border-red-300' :
                                  'bg-yellow-100 text-yellow-800 border-yellow-300'
                                }`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="p-4 space-y-1">
                              <select
                                value={b.assignedFgId || ''}
                                onChange={(e) => handleAssignFgToBooking(b.id, e.target.value, b.date)}
                                className={`w-full px-2 py-1 text-xs border font-semibold focus:outline-none ${
                                  assignedFg && b.date && !isAssignedFgAvailable
                                    ? 'bg-red-50 text-red-900 border-red-400 font-bold'
                                    : 'bg-surface-container border-outline-variant/40 text-primary'
                                }`}
                              >
                                <option value="">-- Pilih Fotografer --</option>
                                {photographers.map((fg) => {
                                  const isAvail = b.date ? isFgAvailableOnDate(fg, b.date) : null;
                                  const tag = isAvail === true 
                                    ? `🟢 [AVAILABLE ${b.date}]` 
                                    : isAvail === false 
                                    ? `🔴 [LIBUR / NOT AVAIL ${b.date}]` 
                                    : '📸';
                                  return (
                                    <option key={fg.id} value={fg.id}>
                                      {tag} {fg.name} ({fg.specialty.split('•')[0]})
                                    </option>
                                  );
                                })}
                              </select>

                              {assignedFg && (
                                <div className="space-y-0.5">
                                  <span className="text-[10px] font-mono text-emerald-800 font-bold block">
                                    📸 {assignedFg.name}
                                  </span>
                                  {b.date && (
                                    isAssignedFgAvailable ? (
                                      <span className="inline-block px-1.5 py-0.5 bg-emerald-100 text-emerald-900 text-[9px] font-bold uppercase tracking-wider border border-emerald-300">
                                        🟢 Available pada {b.date}
                                      </span>
                                    ) : (
                                      <span className="inline-block px-1.5 py-0.5 bg-red-100 text-red-900 text-[9px] font-bold uppercase tracking-wider border border-red-300 animate-pulse">
                                        🔴 TIDAK AVAILABLE (Libur) pada {b.date}
                                      </span>
                                    )
                                  )}
                                </div>
                              )}
                            </td>
                            <td className="p-4 text-center space-x-1 space-y-1">
                              <button
                                onClick={() => {
                                  if (!b.assignedFgId) {
                                    alert("Pilih fotografer terlebih dahulu di kolom Assigned Fotografer!");
                                    return;
                                  }
                                  handleAssignFgToBooking(b.id, b.assignedFgId, b.date);
                                  showToast(`Data proyek ${b.bookingRef} disinkronkan ke Dashboard FG ${assignedFg?.name || ''}!`);
                                }}
                                className="px-2.5 py-1.5 bg-amber-600 text-white hover:bg-amber-700 transition-colors text-[10px] uppercase font-bold tracking-wider inline-flex items-center gap-1 shadow-sm"
                                title="Kirim/Sinkron Data Klien ke Dashboard Fotografer"
                              >
                                <Send className="w-3 h-3" /> Kirim ke FG
                              </button>

                              <button
                                onClick={() => handleOpenEditBookingModal(b)}
                                className="px-2.5 py-1.5 bg-surface-container text-primary hover:bg-outline-variant transition-colors text-[10px] uppercase font-semibold tracking-wider inline-flex items-center gap-1 border border-outline-variant/40"
                                title="Edit Detail Booking"
                              >
                                <Edit className="w-3 h-3" /> Edit
                              </button>

                              <button
                                onClick={() => downloadBookingPdf(b, getPackageLabel(b.selectedPkg))}
                                className="px-2.5 py-1.5 bg-primary text-on-primary hover:bg-outline transition-colors text-[10px] uppercase font-semibold tracking-wider inline-flex items-center gap-1"
                                title="Download Receipt PDF"
                              >
                                <Download className="w-3 h-3" /> PDF
                              </button>

                              <button
                                onClick={() => {
                                  if (window.confirm(`Hapus booking ${b.bookingRef} atas nama ${b.name}?`)) {
                                    deleteBooking(b.id);
                                    showToast(`Booking ${b.bookingRef} telah dihapus.`);
                                  }
                                }}
                                className="p-1 text-red-600 hover:text-red-800 transition-colors inline-block"
                                title="Hapus Booking"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-outline">
                          Tidak ada data booking yang cocok dengan filter pencarian.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KELOLA GALERI & VIDEO */}
        {activeTab === 'media' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-surface p-6 border border-outline-variant/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="font-serif text-2xl text-primary font-normal">Kelola Foto Galeri & Video Cinematic</h2>
                <p className="text-xs text-on-surface-variant mt-1">
                  Tambah foto/video baru, ubah rincian, urutkan tampilan, atau sembunyikan dari publik.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex bg-surface-container p-1 border border-outline-variant/30">
                  <button
                    onClick={() => setMediaType('photos')}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                      mediaType === 'photos' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'
                    }`}
                  >
                    Foto Portfolio ({photos.length})
                  </button>
                  <button
                    onClick={() => setMediaType('videos')}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                      mediaType === 'videos' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'
                    }`}
                  >
                    Video Cinematic ({videos.length})
                  </button>
                </div>

                {mediaType === 'photos' ? (
                  <button
                    onClick={() => handleOpenPhotoModal(null)}
                    className="px-4 py-2.5 bg-primary text-on-primary font-sans text-xs uppercase tracking-wider font-semibold hover:bg-on-surface-variant transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Tambah Foto Baru
                  </button>
                ) : (
                  <button
                    onClick={() => handleOpenVideoModal(null)}
                    className="px-4 py-2.5 bg-primary text-on-primary font-sans text-xs uppercase tracking-wider font-semibold hover:bg-on-surface-variant transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Tambah Video Baru
                  </button>
                )}
              </div>
            </div>

            {/* Filter Search Bar for Media */}
            <div className="bg-surface p-4 border border-outline-variant/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={mediaSearch}
                  onChange={(e) => setMediaSearch(e.target.value)}
                  placeholder={`Cari judul ${mediaType === 'photos' ? 'foto' : 'video'}...`}
                  className="w-full bg-surface-container pl-9 pr-3 py-2 text-xs border border-outline-variant/40 focus:outline-none focus:border-primary text-primary"
                />
              </div>

              <div className="flex items-center gap-3">
                <Filter className="w-4 h-4 text-outline" />
                <span className="font-semibold text-primary">Kategori:</span>
                <select
                  value={mediaCategoryFilter}
                  onChange={(e) => setMediaCategoryFilter(e.target.value)}
                  className="bg-surface-container px-3 py-2 text-xs border border-outline-variant/40 focus:outline-none focus:border-primary text-primary capitalize"
                >
                  <option value="all">Semua Kategori</option>
                  {mediaType === 'photos' ? (
                    <>
                      <option value="wedding">Wedding</option>
                      <option value="prewedding">Prewedding</option>
                      <option value="graduation">Graduation</option>
                      <option value="editorial">Editorial</option>
                    </>
                  ) : (
                    <>
                      <option value="wedding film">Wedding Film</option>
                      <option value="prewedding reel">Prewedding Reel</option>
                      <option value="graduation film">Graduation Film</option>
                      <option value="editorial teaser">Editorial Teaser</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            {/* PHOTOS GRID MANAGER */}
            {mediaType === 'photos' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredPhotos.map((item) => (
                  <div 
                    key={item.id}
                    className={`bg-surface border overflow-hidden flex flex-col justify-between transition-all ${
                      item.isHidden ? 'opacity-60 border-red-300 bg-red-50/20' : 'border-outline-variant/40'
                    }`}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-surface-container">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800'; }}
                      />
                      <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                        <span className="bg-primary/90 backdrop-blur-md text-on-primary text-[9px] px-2.5 py-1 uppercase tracking-wider font-semibold">
                          {item.category}
                        </span>
                        {item.showInGallery !== false && (
                          <span className="bg-emerald-600 text-white text-[9px] px-2 py-0.5 font-bold uppercase tracking-widest flex items-center gap-1 shadow-md">
                            🖼️ Galeri ON
                          </span>
                        )}
                        {item.inGalleryCarousel && (
                          <span className="bg-amber-500 text-black text-[9px] px-2 py-0.5 font-bold uppercase tracking-widest flex items-center gap-1 shadow-md">
                            <Sparkles className="w-3 h-3 fill-current" /> Carousel ON
                          </span>
                        )}
                        {item.isFeaturedHome && (
                          <span className="bg-yellow-500 text-black text-[9px] px-2 py-0.5 font-bold uppercase tracking-widest flex items-center gap-1 shadow-md">
                            <Star className="w-3 h-3 fill-current" /> Featured Home
                          </span>
                        )}
                      </div>

                      {/* Reorder Buttons Overlay */}
                      <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
                        <button
                          onClick={() => movePhotoUp(item.id)}
                          className="w-7 h-7 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center font-bold text-xs shadow-lg transition-transform active:scale-95 border border-white/20"
                          title="Geser Foto Ke Atas / Ke Depan"
                        >
                          ⬆️
                        </button>
                        <button
                          onClick={() => movePhotoDown(item.id)}
                          className="w-7 h-7 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center font-bold text-xs shadow-lg transition-transform active:scale-95 border border-white/20"
                          title="Geser Foto Ke Bawah / Ke Belakang"
                        >
                          ⬇️
                        </button>
                      </div>

                      {item.isHidden && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center text-white font-bold text-xs uppercase tracking-widest z-20">
                          🚫 TERSEMBUNYI DARI PUBLIK
                        </div>
                      )}
                    </div>

                    <div className="p-4 space-y-3">
                      <h4 className="font-serif text-base text-primary font-semibold truncate">{item.title}</h4>
                      <p className="text-[11px] text-outline truncate">📍 {item.location || '-'}</p>

                      {/* Destination Toggles Row */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-outline-variant/30 text-[10px]">
                        <button
                          onClick={() => toggleShowInGallery(item.id)}
                          className={`px-2 py-1 border font-bold uppercase transition-colors flex items-center gap-1 ${
                            item.showInGallery !== false
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                              : 'bg-surface-container text-outline border-outline-variant/40 hover:bg-outline-variant'
                          }`}
                          title="Tampilkan di Galeri Publik"
                        >
                          <span>🖼️ Galeri: {item.showInGallery !== false ? 'AKTIF' : 'OFF'}</span>
                        </button>

                        <button
                          onClick={() => toggleGalleryCarouselPhoto(item.id)}
                          className={`px-2 py-1 border font-bold uppercase transition-colors flex items-center gap-1 ${
                            item.inGalleryCarousel
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : 'bg-surface-container text-outline border-outline-variant/40 hover:bg-outline-variant'
                          }`}
                          title="Tampilkan di Carousel Slide Galeri"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Carousel: {item.inGalleryCarousel ? 'AKTIF' : 'OFF'}</span>
                        </button>
                      </div>

                      <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between gap-1.5">
                        <button
                          onClick={() => toggleHidePhoto(item.id)}
                          className={`p-1.5 border transition-colors text-[10px] uppercase font-semibold flex items-center gap-1 ${
                            item.isHidden 
                              ? 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200' 
                              : 'bg-surface-container text-on-surface border-outline-variant/40 hover:bg-outline-variant'
                          }`}
                          title={item.isHidden ? "Tampilkan kembali di Galeri" : "Sembunyikan dari Publik"}
                        >
                          {item.isHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          <span>{item.isHidden ? 'Tampilkan' : 'Sembunyikan'}</span>
                        </button>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenPhotoModal(item)}
                            className="p-1.5 bg-primary text-on-primary hover:bg-outline transition-colors"
                            title="Edit Foto"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              if (window.confirm(`Hapus foto "${item.title}" permanen?`)) {
                                deletePhoto(item.id);
                                showToast(`Foto "${item.title}" berhasil dihapus.`);
                              }
                            }}
                            className="p-1.5 bg-red-100 text-red-700 hover:bg-red-200 border border-red-300 transition-colors"
                            title="Hapus Foto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* VIDEOS GRID MANAGER */}
            {mediaType === 'videos' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredVideos.map((item) => (
                  <div 
                    key={item.id}
                    className={`bg-surface border overflow-hidden flex flex-col justify-between transition-all ${
                      item.isHidden ? 'opacity-60 border-red-300 bg-red-50/20' : 'border-outline-variant/40'
                    }`}
                  >
                    <div className="relative aspect-video overflow-hidden bg-surface-container">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=800'; }}
                      />
                      
                      <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                        <span className="bg-primary/90 backdrop-blur-md text-on-primary text-[9px] px-2.5 py-1 uppercase tracking-wider font-semibold">
                          {item.category}
                        </span>
                        {item.isFeaturedHome && (
                          <span className="bg-yellow-500 text-black text-[9px] px-2 py-0.5 font-bold uppercase tracking-widest flex items-center gap-1 shadow-md">
                            <Star className="w-3 h-3 fill-current" /> Featured Home
                          </span>
                        )}
                      </div>

                      {/* Video Reorder Buttons Overlay */}
                      <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
                        <button
                          onClick={() => moveVideoUp(item.id)}
                          className="w-7 h-7 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center font-bold text-xs shadow-lg transition-transform active:scale-95 border border-white/20"
                          title="Geser Video Ke Atas / Ke Depan"
                        >
                          ⬆️
                        </button>
                        <button
                          onClick={() => moveVideoDown(item.id)}
                          className="w-7 h-7 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center font-bold text-xs shadow-lg transition-transform active:scale-95 border border-white/20"
                          title="Geser Video Ke Bawah / Ke Belakang"
                        >
                          ⬇️
                        </button>
                      </div>

                      {item.isHidden && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center text-white font-bold text-xs uppercase tracking-widest z-20">
                          🚫 TERSEMBUNYI DARI PUBLIK
                        </div>
                      )}
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="font-serif text-base text-primary font-semibold truncate">{item.title}</h4>
                      <p className="text-[11px] text-outline truncate">⏱️ Durasi: {item.duration || '-'}</p>

                      <div className="pt-3 border-t border-outline-variant/30 flex items-center justify-between gap-2">
                        <button
                          onClick={() => toggleHideVideo(item.id)}
                          className={`p-2 border transition-colors text-[10px] uppercase font-semibold flex items-center gap-1 ${
                            item.isHidden 
                              ? 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200' 
                              : 'bg-surface-container text-on-surface border-outline-variant/40 hover:bg-outline-variant'
                          }`}
                          title={item.isHidden ? "Tampilkan kembali di Video Page" : "Sembunyikan dari Video Page"}
                        >
                          {item.isHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          <span>{item.isHidden ? 'Tampilkan' : 'Sembunyikan'}</span>
                        </button>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenVideoModal(item)}
                            className="p-2 bg-primary text-on-primary hover:bg-outline transition-colors"
                            title="Edit Video"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              if (window.confirm(`Hapus video "${item.title}" permanen?`)) {
                                deleteVideo(item.id);
                                showToast(`Video "${item.title}" berhasil dihapus.`);
                              }
                            }}
                            className="p-2 bg-red-100 text-red-700 hover:bg-red-200 border border-red-300 transition-colors"
                            title="Hapus Video"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: KELOLA PRICELIST */}
        {activeTab === 'pricing' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-surface p-6 border border-outline-variant/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="font-serif text-2xl text-primary font-normal">Kelola Halaman Pricelist</h2>
                <p className="text-xs text-on-surface-variant mt-1">
                  Tambah paket baru, ubah nama paket, estimasi harga IDR & USD, deskripsi, tag rekomendasi, dan fitur rincian layanan.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 w-full">
                <div className="flex flex-wrap items-center gap-1.5 bg-surface-container p-1 border border-outline-variant/30 overflow-x-auto">
                  {[
                    { id: 'wedding', label: 'Wedding' },
                    { id: 'graduation', label: 'Graduation' },
                    { id: 'engagement', label: 'Engagement' },
                    { id: 'prewedding', label: 'Prewedding' },
                    { id: 'group', label: 'Foto Grup' },
                    { id: 'special', label: 'Special Session' },
                    { id: 'event', label: 'Event Cinema' }
                  ].map((cat) => {
                    const count = getPackagesByCategory(cat.id).length;
                    const isActive = pricingType === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setPricingType(cat.id)}
                        className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors whitespace-nowrap ${
                          isActive ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-container/60'
                        }`}
                      >
                        {cat.label} ({count})
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handleOpenPkgModal(null)}
                  className="shrink-0 px-4 py-2 bg-primary text-on-primary font-sans text-xs uppercase tracking-wider font-semibold hover:bg-on-surface-variant transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Tambah Paket Baru
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getPackagesByCategory(pricingType).map((pkg) => (
                <div key={pkg.id} className="bg-surface border border-outline-variant/40 p-6 flex flex-col justify-between shadow-sm">
                  <div>
                    {pkg.recommended && (
                      <span className="bg-primary text-on-primary text-[9px] tracking-widest px-3 py-0.5 uppercase font-bold block w-fit mb-3">
                        MOST REQUESTED
                      </span>
                    )}

                    <h3 className="font-serif text-2xl text-primary font-bold">{pkg.name}</h3>
                    <p className="text-xs text-on-surface-variant mt-1 min-h-[40px] leading-relaxed">{pkg.subtitle}</p>

                    <div className="my-4 py-3 border-y border-outline-variant/30">
                      <div className="font-serif text-2xl font-bold text-primary">{pkg.priceIdr}</div>
                      <div className="text-[10px] text-outline uppercase">{pkg.priceUsd}</div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-outline block">FITUR & LAYANAN:</span>
                      <ul className="space-y-1.5 text-xs text-on-surface-variant">
                        {(pkg.features || []).map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary font-bold">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-outline-variant/20">
                    <button
                      onClick={() => handleOpenPkgModal(pkg)}
                      className="flex-1 bg-primary text-on-primary font-sans text-xs uppercase tracking-wider py-3 font-semibold hover:bg-on-surface-variant transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit Paket
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Hapus paket pricelist "${pkg.name}"?`)) {
                          deletePackage(pricingType, pkg.id);
                          showToast(`Paket "${pkg.name}" telah dihapus.`);
                        }
                      }}
                      className="p-3 bg-red-100 text-red-700 hover:bg-red-200 border border-red-300 transition-colors"
                      title="Hapus Paket"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: KELOLA TIM FOTOGRAFER (PHOTOGRAPHER TEAM MANAGEMENT) */}
        {activeTab === 'photographers' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-surface p-6 border border-outline-variant/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="font-serif text-2xl text-primary font-normal">Manajemen Tim Fotografer & Kalender Availability</h2>
                <p className="text-xs text-on-surface-variant mt-1">
                  Daftarkan tim fotografer baru, atur PIN akses login, lihat rating performa, serta **kelola kalender ketersediaan (Available/Libur)** tiap fotografer.
                </p>
              </div>

              <button
                onClick={() => handleOpenFgModal(null)}
                className="px-4 py-3 bg-primary text-on-primary font-sans text-xs uppercase tracking-wider font-semibold hover:bg-on-surface-variant transition-colors flex items-center gap-2 shrink-0 shadow-md"
              >
                <UserPlus className="w-4 h-4" /> Tambah Fotografer Baru
              </button>
            </div>

            {/* List of Registered Photographer Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photographers.map((fg) => {
                const fgProjectsCount = bookings.filter((b) => b.assignedFgId === fg.id).length;
                const availDates = fg.availability || [];

                return (
                  <div key={fg.id} className="bg-surface border border-outline-variant/40 p-6 space-y-4 shadow-sm relative flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start border-b border-outline-variant/30 pb-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={fg.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'} 
                            alt={fg.name} 
                            className="w-12 h-12 rounded-full object-cover border-2 border-primary shadow-md shrink-0"
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'; }}
                          />
                          <div>
                            <span className="bg-amber-400 text-black font-bold text-[9px] px-2.5 py-0.5 uppercase tracking-widest">
                              ID: {fg.id}
                            </span>
                            <h3 className="font-serif text-xl text-primary font-semibold mt-0.5">{fg.name}</h3>
                            <p className="text-xs text-on-surface-variant truncate max-w-[180px]">{fg.specialty}</p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <button
                            onClick={() => {
                              const newRatingStr = window.prompt(
                                `Tentukan Rating untuk fotografer ${fg.name} (Masukan angka 1.0 - 5.0):`,
                                String(fg.rating || 4.9)
                              );
                              if (newRatingStr !== null) {
                                const val = parseFloat(newRatingStr);
                                if (!isNaN(val) && val >= 1 && val <= 5) {
                                  updateFgProfile(fg.id, { rating: val });
                                  showToast(`Rating ${fg.name} berhasil diperbarui ke ${val} ★!`);
                                } else {
                                  alert('Rating harus berupa angka antara 1.0 hingga 5.0!');
                                }
                              }
                            }}
                            className="font-mono text-xs text-amber-600 font-bold bg-amber-50 hover:bg-amber-100 px-2.5 py-1 border border-amber-300 transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                            title="Klik untuk mengubah rating desimal fotografer"
                          >
                            <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                            <span>{fg.rating || 4.9} Rating</span>
                            <Edit className="w-3 h-3 text-amber-700 ml-0.5" />
                          </button>

                          {/* Quick Star Picker (1 - 5 Bintang) */}
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((starVal) => {
                              const currentRating = fg.rating || 4.9;
                              const isFilled = starVal <= Math.round(currentRating);
                              return (
                                <button
                                  key={starVal}
                                  onClick={() => {
                                    updateFgProfile(fg.id, { rating: Number(starVal.toFixed(1)) });
                                    showToast(`Rating ${fg.name} diset ke ${starVal}.0 ★!`);
                                  }}
                                  className="p-0.5 hover:scale-125 transition-transform"
                                  title={`Set rating ke ${starVal}.0 Bintang`}
                                >
                                  <Star
                                    className={`w-3.5 h-3.5 ${
                                      isFilled ? 'text-amber-400 fill-amber-400' : 'text-outline-variant/60'
                                    }`}
                                  />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs font-sans">
                        <div className="grid grid-cols-2 gap-2 bg-surface-container/50 p-2.5 border border-outline-variant/30">
                          <div>
                            <span className="text-outline text-[10px] uppercase tracking-wider block font-semibold">
                              👤 Username Login FG:
                            </span>
                            <p className="font-mono font-bold text-amber-700">@{fg.username || fg.id}</p>
                          </div>

                          <div>
                            <span className="text-outline text-[10px] uppercase tracking-wider block font-semibold">
                              🔑 PIN Akses Login:
                            </span>
                            <p className="font-mono font-bold text-emerald-700">{fg.pin || '1234'}</p>
                          </div>
                        </div>

                        <div>
                          <span className="text-outline text-[10px] uppercase tracking-wider block font-semibold">
                            📞 No. WhatsApp / HP:
                          </span>
                          <p className="font-mono font-bold text-primary">{fg.phone}</p>
                        </div>

                        <div>
                          <span className="text-outline text-[10px] uppercase tracking-wider block font-semibold">
                            📅 Tanggal Available Didaftarkan ({availDates.length} Hari):
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1 max-h-16 overflow-y-auto">
                            {availDates.length > 0 ? (
                              availDates.map((d) => (
                                <span key={d} className="px-1.5 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono text-[9px] font-bold">
                                  {d}
                                </span>
                              ))
                            ) : (
                              <span className="text-[10px] text-outline italic">Belum ada tanggal yang ditandai</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                      <div className="pt-3 border-t border-outline-variant/30 space-y-2.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-mono text-[11px] text-primary font-semibold">
                            📋 {fgProjectsCount} Proyek Ditugaskan
                          </span>

                          <button
                            onClick={() => {
                              setSelectedFgForCalendar(fg);
                              setIsFgCalendarModalOpen(true);
                            }}
                            className="px-2.5 py-1 bg-amber-500 text-black hover:bg-amber-600 transition-colors text-[10px] uppercase font-bold flex items-center gap-1 shadow-sm"
                            title="Lihat & Kelola Kalender Ketersediaan Fotografer"
                          >
                            <Calendar className="w-3 h-3" /> Kalender FG
                          </button>
                        </div>

                        {/* FG Direct Link & WhatsApp Generator Actions */}
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <button
                            onClick={() => {
                              const cleanUsername = (fg.username || fg.id).replace('@', '');
                              const directLoginUrl = `${window.location.origin}/?fg_user=${cleanUsername}`;
                              navigator.clipboard.writeText(directLoginUrl);
                              showToast(`Link Direct Login Dashboard @${cleanUsername} berhasil disalin!`);
                            }}
                            className="w-full py-2 px-2 bg-amber-500/15 hover:bg-amber-500/25 text-amber-900 border border-amber-500/40 transition-colors text-[10px] uppercase font-bold flex items-center justify-center gap-1.5 shadow-xs"
                            title="Salin Link Direct Login FG ke Clipboard"
                          >
                            <Copy className="w-3.5 h-3.5 text-amber-700" />
                            <span>Copy Link FG</span>
                          </button>

                          <button
                            onClick={() => {
                              const cleanUsername = (fg.username || fg.id).replace('@', '');
                              const directLoginUrl = `${window.location.origin}/?fg_user=${cleanUsername}`;
                              const cleanPhone = (fg.phone || '').replace(/[^0-9]/g, '');
                              const formattedPhone = cleanPhone.startsWith('0') ? `62${cleanPhone.slice(1)}` : cleanPhone;
                              
                              const waMsg = `Halo *${fg.name}*,\n\nBerikut adalah link portal login khusus Dashboard Fotografer JEMARI KILAT Anda:\n\n👤 *Username:* @${cleanUsername}\n🔑 *PIN:* ${fg.pin || '1234'}\n🔗 *Direct Link Access:* ${directLoginUrl}\n\nSilakan klik link di atas untuk langsung masuk ke Dashboard FG Anda.`;
                              const waUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(waMsg)}`;
                              window.open(waUrl, '_blank');
                            }}
                            className="w-full py-2 px-2 bg-emerald-600 hover:bg-emerald-700 text-white transition-colors text-[10px] uppercase font-bold flex items-center justify-center gap-1.5 shadow-sm"
                            title="Kirim Link Login Langsung ke WhatsApp Fotografer"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Kirim WA FG</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => handleOpenFgModal(fg)}
                            className="flex-1 bg-primary text-on-primary font-sans text-xs uppercase tracking-wider py-2 font-semibold hover:bg-outline transition-colors flex items-center justify-center gap-1"
                          >
                            <Edit className="w-3.5 h-3.5" /> Edit FG
                          </button>

                          <button
                            onClick={() => {
                              if (window.confirm(`Hapus fotografer ${fg.name} dari tim studio?`)) {
                                deletePhotographer(fg.id);
                                showToast(`Fotografer ${fg.name} telah dihapus.`);
                              }
                            }}
                            className="p-2 bg-red-100 text-red-700 hover:bg-red-200 border border-red-300 transition-colors"
                            title="Hapus Fotografer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 6: KURASI HALAMAN HOME */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-surface p-6 border border-outline-variant/40">
              <h2 className="font-serif text-2xl text-primary font-normal mb-2">Kurasi Halaman Utama (Home)</h2>
              <p className="text-xs text-on-surface-variant">
                Tentukan foto dan video mana yang ditampilkan secara unggulan (*Featured Showcase*) di Halaman Depan.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Featured Photos Selector */}
              <div className="bg-surface p-6 border border-outline-variant/40 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-outline-variant/30">
                  <h3 className="font-serif text-lg text-primary font-semibold">Featured Portfolio Foto</h3>
                  <span className="text-xs text-outline font-mono">
                    {photos.filter((p) => p.isFeaturedHome).length} Terpilih
                  </span>
                </div>

                <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">
                  {photos.map((p) => (
                    <div 
                      key={p.id} 
                      className={`p-3 border flex items-center justify-between gap-3 transition-colors ${
                        p.isFeaturedHome ? 'bg-primary/5 border-primary' : 'bg-surface-container/40 border-outline-variant/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={p.image} 
                          alt={p.title} 
                          className="w-12 h-16 object-cover border border-outline-variant/40"
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800'; }}
                        />
                        <div>
                          <div className="font-semibold text-primary text-xs">{p.title}</div>
                          <div className="text-[10px] text-outline">{p.category} • {p.year}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          toggleHomeFeaturedPhoto(p.id);
                          showToast(`Status featured home untuk foto "${p.title}" diperbarui.`);
                        }}
                        className={`px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider border transition-colors ${
                          p.isFeaturedHome 
                            ? 'bg-yellow-500 text-black border-yellow-600' 
                            : 'bg-surface text-outline border-outline-variant/40 hover:border-primary'
                        }`}
                      >
                        {p.isFeaturedHome ? '★ Featured' : '+ Set Featured'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Videos Selector */}
              <div className="bg-surface p-6 border border-outline-variant/40 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-outline-variant/30">
                  <h3 className="font-serif text-lg text-primary font-semibold">Featured Cinematic Video</h3>
                  <span className="text-xs text-outline font-mono">
                    {videos.filter((v) => v.isFeaturedHome).length} Terpilih
                  </span>
                </div>

                <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">
                  {videos.map((v) => (
                    <div 
                      key={v.id} 
                      className={`p-3 border flex items-center justify-between gap-3 transition-colors ${
                        v.isFeaturedHome ? 'bg-primary/5 border-primary' : 'bg-surface-container/40 border-outline-variant/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={v.thumbnail} 
                          alt={v.title} 
                          className="w-16 h-12 object-cover border border-outline-variant/40"
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=800'; }}
                        />
                        <div>
                          <div className="font-semibold text-primary text-xs">{v.title}</div>
                          <div className="text-[10px] text-outline">{v.category} • Durasi {v.duration}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          toggleHomeFeaturedVideo(v.id);
                          showToast(`Status featured home untuk video "${v.title}" diperbarui.`);
                        }}
                        className={`px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider border transition-colors ${
                          v.isFeaturedHome 
                            ? 'bg-yellow-500 text-black border-yellow-600' 
                            : 'bg-surface text-outline border-outline-variant/40 hover:border-primary'
                        }`}
                      >
                        {v.isFeaturedHome ? '★ Featured' : '+ Set Featured'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: SECURITY & BACKUP SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-8 animate-fade-in max-w-4xl">
            <div className="bg-surface p-6 border border-outline-variant/40">
              <h2 className="font-serif text-2xl text-primary font-normal">Pengaturan Keamanan & Backup Data Studio</h2>
              <p className="text-xs text-on-surface-variant mt-1">
                Ubah PIN akses keamanan admin, unduh backup JSON seluruh sistem, atau lakukan reset factory data.
              </p>
            </div>

            {/* Change Admin PIN Form */}
            <div className="bg-surface p-6 lg:p-8 border border-outline-variant/40 space-y-4 shadow-sm">
              <div className="flex items-center gap-3 border-b border-outline-variant/30 pb-4">
                <Shield className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-serif text-lg text-primary font-semibold">Ganti PIN Keamanan Admin</h3>
                  <p className="text-xs text-on-surface-variant">PIN ini digunakan untuk login ke Halaman CMS Studio</p>
                </div>
              </div>

              {pinStatusMsg.text && (
                <div className={`p-3 border text-xs flex items-center gap-2 ${
                  pinStatusMsg.type === 'error' ? 'bg-red-50 text-red-800 border-red-200' : 'bg-green-50 text-green-800 border-green-200'
                }`}>
                  {pinStatusMsg.type === 'error' ? <AlertTriangle className="w-4 h-4 shrink-0" /> : <CheckCircle className="w-4 h-4 shrink-0" />}
                  <span>{pinStatusMsg.text}</span>
                </div>
              )}

              <form onSubmit={handleChangeAdminPin} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">
                    PIN Admin Saat Ini *
                  </label>
                  <input
                    type="password"
                    value={pinChangeForm.currentPin}
                    onChange={(e) => setPinChangeForm({ ...pinChangeForm, currentPin: e.target.value })}
                    placeholder="PIN saat ini (Default: 1234)"
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 text-primary font-mono text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">
                    PIN Admin Baru *
                  </label>
                  <input
                    type="password"
                    value={pinChangeForm.newPin}
                    onChange={(e) => setPinChangeForm({ ...pinChangeForm, newPin: e.target.value })}
                    placeholder="Masukkan PIN baru (Min. 4 digit)"
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 text-primary font-mono text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">
                    Konfirmasi PIN Baru *
                  </label>
                  <input
                    type="password"
                    value={pinChangeForm.confirmPin}
                    onChange={(e) => setPinChangeForm({ ...pinChangeForm, confirmPin: e.target.value })}
                    placeholder="Ulangi PIN baru"
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 text-primary font-mono text-sm"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-on-primary uppercase tracking-wider font-semibold text-xs hover:bg-outline transition-colors flex items-center gap-2 shadow-md"
                >
                  <Key className="w-4 h-4" /> Simpan PIN Keamanan Baru
                </button>
              </form>
            </div>

            {/* Backup & Factory Reset */}
            <div className="bg-surface p-6 lg:p-8 border border-outline-variant/40 space-y-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-outline-variant/30 pb-4">
                <RefreshCw className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-serif text-lg text-primary font-semibold">Backup & Data Maintenance</h3>
                  <p className="text-xs text-on-surface-variant">Ekspor cadangan data studio atau kembalikan ke pengaturan awal</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-outline-variant/30 bg-surface-container/30 space-y-3">
                  <h4 className="font-semibold text-primary text-sm flex items-center gap-2">
                    <Download className="w-4 h-4" /> Export Backup Data (.JSON)
                  </h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Unduh file cadangan yang berisi seluruh data reservasi booking, galeri foto, video, pricelist, dan tim fotografer.
                  </p>
                  <button
                    onClick={handleExportJsonBackup}
                    className="px-4 py-2.5 bg-primary text-on-primary uppercase tracking-wider font-semibold text-xs hover:bg-outline transition-colors inline-flex items-center gap-1.5"
                  >
                    Download Backup JSON
                  </button>
                </div>

                <div className="p-4 border border-red-200 bg-red-50/20 space-y-3">
                  <h4 className="font-semibold text-red-800 text-sm flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> Reset Factory Default Data
                  </h4>
                  <p className="text-xs text-red-700/80 leading-relaxed">
                    Menghapus seluruh perubahan lokal dan mengembalikan data foto, video, paket, booking, dan PIN kembali ke versi bawaan awal.
                  </p>
                  <button
                    onClick={() => {
                      if (window.confirm("PERINGATAN: Apakah Anda yakin ingin mereset seluruh data kembali ke kondisi default awal?")) {
                        resetAllData();
                        showToast("Data studio telah berhasil direset ke kondisi default awal!");
                      }
                    }}
                    className="px-4 py-2.5 bg-red-700 text-white uppercase tracking-wider font-semibold text-xs hover:bg-red-800 transition-colors inline-flex items-center gap-1.5"
                  >
                    Reset Factory Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: PARTNERSHIP STUDIOS CMS */}
        {activeTab === 'partnerships' && (
          <div className="space-y-8 animate-fade-in font-sans">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface p-6 border border-outline-variant/40 shadow-sm">
              <div>
                <span className="font-sans text-[10px] tracking-[0.3em] text-amber-600 uppercase font-bold block mb-1">
                  STUDIO PARTNER MANAGEMENT
                </span>
                <h2 className="font-serif text-2xl text-primary font-bold">
                  Kelola Partnership Studio Photo ({partnerships.length} Studio)
                </h2>
                <p className="font-sans text-xs text-on-surface-variant mt-1">
                  Atur informasi studio partner indoor resmi, username Instagram, URL link, serta daftar keunggulan studio.
                </p>
              </div>

              <button
                onClick={() => handleOpenPartnershipModal(null)}
                className="bg-primary text-on-primary font-sans text-xs uppercase tracking-[0.15em] px-5 py-3 font-semibold hover:bg-outline transition-colors flex items-center gap-2 shadow-lg shrink-0"
              >
                <Plus className="w-4 h-4" /> Tambah Studio Partner
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {partnerships.map((part) => (
                <div
                  key={part.id}
                  className="bg-surface p-6 border border-outline-variant/40 shadow-sm hover:border-amber-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3 gap-2">
                      <div>
                        <span className="font-mono text-[10px] text-amber-600 font-bold uppercase tracking-wider block">
                          {part.categoryTag || 'INDOOR STUDIO'}
                        </span>
                        <h3 className="font-serif text-xl font-bold text-primary">{part.name}</h3>
                      </div>
                      
                      {part.instagram && (
                        <a
                          href={part.instagramUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-gradient-to-r from-purple-600 to-amber-500 text-white font-mono text-[10px] font-bold rounded-xs flex items-center gap-1 hover:opacity-90 transition-opacity shrink-0"
                        >
                          <Instagram className="w-3.5 h-3.5" />
                          <span>{part.instagram}</span>
                        </a>
                      )}
                    </div>

                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-4">
                      {part.description}
                    </p>

                    {Array.isArray(part.features) && part.features.length > 0 && (
                      <div className="space-y-1 mb-4 bg-surface-container/50 p-3 border border-outline-variant/30">
                        <span className="text-[10px] font-mono uppercase font-bold text-outline block mb-1">
                          Fitur & Keunggulan Studio:
                        </span>
                        <ul className="space-y-1 text-xs text-primary font-sans">
                          {part.features.map((feat, idx) => (
                            <li key={idx} className="flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenPartnershipModal(part)}
                      className="px-3.5 py-2 bg-primary text-on-primary hover:bg-outline transition-colors text-xs font-semibold uppercase flex items-center gap-1.5 shadow-sm"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit Studio
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Hapus studio partner ${part.name}?`)) {
                          deletePartnership(part.id);
                          showToast(`Studio partner ${part.name} berhasil dihapus.`);
                        }
                      }}
                      className="px-3.5 py-2 bg-red-100 text-red-800 hover:bg-red-200 transition-colors text-xs font-semibold uppercase flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: EVENT PAGE CMS & VISIBILITY MANAGER */}
        {activeTab === 'event-cms' && (
          <div className="space-y-8 animate-fade-in font-sans">
            {/* Header & Status Toggle Banner */}
            <div className="bg-surface p-6 border border-outline-variant/40 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <span className="font-sans text-[10px] tracking-[0.3em] text-purple-500 uppercase font-bold block mb-1">
                  EVENT PAGE CMS & VISIBILITY MANAGER
                </span>
                <h2 className="font-serif text-2xl text-primary font-bold">
                  Kelola Konten & Status Tampilkan Halaman Event
                </h2>
                <p className="font-sans text-xs text-on-surface-variant mt-1">
                  Atur sakelar visibilitas (tampilkan/sembunyikan), narasi hero, telemetri audio visual, serta daftar paket investasi event.
                </p>
              </div>

              {/* Visibility Switch Box */}
              <div className="flex items-center gap-4 bg-surface-container p-4 border border-outline-variant/40 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-outline font-semibold block">STATUS HALAMAN EVENT</span>
                  <span className={`text-xs font-bold font-mono ${eventSettings?.isEventPageHidden ? 'text-red-500' : 'text-emerald-600'}`}>
                    {eventSettings?.isEventPageHidden ? '🔴 TERSEMBUNYI (HIDDEN)' : '🟢 PUBLIK (TAMPIL)'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    toggleHideEventPage();
                    showToast(
                      eventSettings?.isEventPageHidden
                        ? 'Halaman Event Sekarang PUBLIK & TAMPIL di Navigasi!'
                        : 'Halaman Event Sekarang TERSEMBUNYI dari Pengunjung!'
                    );
                  }}
                  className={`px-4 py-2.5 text-xs font-bold font-sans uppercase tracking-wider transition-all shadow-md flex items-center gap-2 ${
                    eventSettings?.isEventPageHidden
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  {eventSettings?.isEventPageHidden ? (
                    <>
                      <Eye className="w-4 h-4" /> Tampilkan Halaman Event
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-4 h-4" /> Sembunyikan Halaman Event
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Form Edit Konten Hero & Telemetri */}
            <div className="bg-surface p-6 lg:p-8 border border-outline-variant/40 shadow-sm space-y-6">
              <div className="border-b border-outline-variant/30 pb-3">
                <h3 className="font-serif text-xl text-primary font-bold">1. Edit Teks & Informasi Telemetri Hero Event</h3>
                <p className="text-xs text-on-surface-variant">
                  Perubahan pada teks ini akan langsung memperbarui header utama halaman event secara realtime.
                </p>
              </div>

              <form onSubmit={handleSaveEventSettings} className="space-y-5 text-xs">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">
                    Teks Badge Kategori (Top Badge) *
                  </label>
                  <input
                    type="text"
                    value={eventForm.badgeText}
                    onChange={(e) => setEventForm({ ...eventForm, badgeText: e.target.value })}
                    placeholder="HIGH-VOLTAGE STAGE & SUMMIT DOCUMENTARY"
                    className="w-full bg-surface-container px-3.5 py-2.5 border border-outline-variant/40 text-primary font-mono text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">
                    Judul Utama Headline (H1 Hero) *
                  </label>
                  <input
                    type="text"
                    value={eventForm.headline}
                    onChange={(e) => setEventForm({ ...eventForm, headline: e.target.value })}
                    placeholder="High-Energy Concerts & Executive Summits."
                    className="w-full bg-surface-container px-3.5 py-2.5 border border-outline-variant/40 text-primary font-serif text-base font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">
                    Deskripsi Narasi Paragraf Hero *
                  </label>
                  <textarea
                    rows={3}
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    placeholder="Deskripsi singkat mengenai penuturan dokumenter visual imersif..."
                    className="w-full bg-surface-container p-3.5 border border-outline-variant/40 text-primary text-xs leading-relaxed"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">
                      Telemetri 1: Total Stages Captured *
                    </label>
                    <input
                      type="text"
                      value={eventForm.stagesCaptured}
                      onChange={(e) => setEventForm({ ...eventForm, stagesCaptured: e.target.value })}
                      placeholder="150+ STAGES"
                      className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 text-primary font-mono text-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">
                      Telemetri 2: Delivery Speed (Kecepatan Penyerahan) *
                    </label>
                    <input
                      type="text"
                      value={eventForm.deliverySpeed}
                      onChange={(e) => setEventForm({ ...eventForm, deliverySpeed: e.target.value })}
                      placeholder="24-HOUR PRESS"
                      className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 text-primary font-mono text-xs"
                      required
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-outline-variant/30 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-purple-600 text-white font-sans text-xs uppercase tracking-wider font-bold hover:bg-purple-700 transition-colors shadow-md flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Simpan Konten Event
                  </button>
                </div>
              </form>
            </div>

            {/* Event Investment Packages */}
            <div className="bg-surface p-6 lg:p-8 border border-outline-variant/40 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-outline-variant/30 pb-3">
                <div>
                  <h3 className="font-serif text-xl text-primary font-bold">2. Paket Investasi Dokumentasi Event ({eventPackages.length})</h3>
                  <p className="text-xs text-on-surface-variant">
                    Atur daftar paket investasi dokumentasi festival, seminar, dan event.
                  </p>
                </div>

                <button
                  onClick={() => handleOpenPackageModal(null, 'event')}
                  className="bg-primary text-on-primary font-sans text-xs uppercase tracking-wider px-4 py-2.5 font-semibold hover:bg-outline transition-colors flex items-center gap-2 shadow-md shrink-0"
                >
                  <Plus className="w-4 h-4" /> Tambah Paket Event
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {eventPackages.map((pkg) => (
                  <div key={pkg.id} className="bg-surface-container/40 p-5 border border-outline-variant/30 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-serif text-lg font-bold text-primary">{pkg.name}</h4>
                        {pkg.recommended && (
                          <span className="bg-purple-600 text-white text-[9px] font-mono px-2 py-0.5 uppercase font-bold">
                            RECOMMENDED
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-on-surface-variant mb-3">{pkg.subtitle}</p>
                      <div className="font-mono text-sm font-bold text-purple-600 mb-3">{pkg.priceIdr}</div>
                    </div>

                    <div className="pt-3 border-t border-outline-variant/30 flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenPackageModal(pkg, 'event')}
                        className="px-3 py-1.5 bg-primary text-on-primary text-[11px] font-semibold uppercase flex items-center gap-1"
                      >
                        <Edit className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Hapus paket event ${pkg.name}?`)) {
                            deletePackage('event', pkg.id);
                            showToast(`Paket event ${pkg.name} dihapus.`);
                          }
                        }}
                        className="px-3 py-1.5 bg-red-100 text-red-800 text-[11px] font-semibold uppercase flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* --- MODAL ADD/EDIT PARTNERSHIP STUDIO --- */}
      {isPartnershipModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-sans">
          <div className="relative w-full max-w-lg bg-surface border border-outline-variant/40 p-6 lg:p-8 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-2xl text-primary font-bold">
              {editingPartnership ? `Edit Studio Partner: ${editingPartnership.name}` : 'Tambah Studio Partner Baru'}
            </h3>

            <form onSubmit={handleSavePartnership} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Nama Studio *</label>
                <input
                  type="text"
                  value={partnershipForm.name}
                  onChange={(e) => setPartnershipForm({ ...partnershipForm, name: e.target.value })}
                  placeholder="Misal: Titik Tuju Studio"
                  className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 text-primary font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Tag Kategori / Konsep Studio *</label>
                <input
                  type="text"
                  value={partnershipForm.categoryTag}
                  onChange={(e) => setPartnershipForm({ ...partnershipForm, categoryTag: e.target.value })}
                  placeholder="Misal: INDOOR & CREATIVE STUDIO"
                  className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 text-primary font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Username Instagram *</label>
                  <input
                    type="text"
                    value={partnershipForm.instagram}
                    onChange={(e) => setPartnershipForm({ ...partnershipForm, instagram: e.target.value })}
                    placeholder="@titiktuju.studio"
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 text-primary font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">URL Link Instagram HTTPS *</label>
                  <input
                    type="url"
                    value={partnershipForm.instagramUrl}
                    onChange={(e) => setPartnershipForm({ ...partnershipForm, instagramUrl: e.target.value })}
                    placeholder="https://instagram.com/titiktuju.studio"
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 text-primary font-mono text-[11px]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Deskripsi Studio Partner *</label>
                <textarea
                  rows={3}
                  value={partnershipForm.description}
                  onChange={(e) => setPartnershipForm({ ...partnershipForm, description: e.target.value })}
                  placeholder="Deskripsi singkat fasilitas dan spesialisasi studio..."
                  className="w-full bg-surface-container p-3 border border-outline-variant/40 text-primary text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Daftar Fitur / Keunggulan (1 Per Baris) *</label>
                <textarea
                  rows={4}
                  value={partnershipForm.features}
                  onChange={(e) => setPartnershipForm({ ...partnershipForm, features: e.target.value })}
                  placeholder="Lighting Pro & Set Dekorasi Estetik&#10;Direkomendasikan untuk Foto Wisuda&#10;Lokasi: Kota Medan, Sumatera Utara"
                  className="w-full bg-surface-container p-3 border border-outline-variant/40 text-primary text-xs font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setIsPartnershipModalOpen(false)}
                  className="px-5 py-2.5 bg-surface-container text-primary font-sans text-xs uppercase tracking-wider font-semibold hover:bg-outline-variant transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary text-on-primary font-sans text-xs uppercase tracking-wider font-semibold hover:bg-outline transition-colors shadow-md"
                >
                  {editingPartnership ? 'Simpan Perubahan' : 'Tambah Studio Partner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL KALENDER AVAILABILITY FG (MANAGED BY ADMIN) --- */}
      {isFgCalendarModalOpen && selectedFgForCalendar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-sans">
          <div className="relative w-full max-w-2xl bg-surface border border-outline-variant/40 p-6 lg:p-8 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-outline-variant/30 pb-3">
              <div>
                <span className="bg-amber-400 text-black font-bold text-[9px] px-2.5 py-0.5 uppercase tracking-widest">
                  AVAILABILITY MANAGER (ADMIN)
                </span>
                <h3 className="font-serif text-2xl text-primary font-bold mt-1">
                  Kalender {selectedFgForCalendar.name}
                </h3>
                <p className="text-xs text-on-surface-variant">
                  {selectedFgForCalendar.specialty} • Klik tanggal untuk menambah/menghapus ketersediaan.
                </p>
              </div>

              <button
                onClick={() => setIsFgCalendarModalOpen(false)}
                className="p-2 text-outline hover:text-primary transition-colors text-sm font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono py-2 bg-surface-container p-3 border border-outline-variant/30">
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 bg-emerald-600 rounded-sm border border-emerald-700 inline-block" /> Available (Tersedia)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 bg-amber-500 rounded-sm border border-amber-600 inline-block" /> 📸 Proyek Klien (Ada Job)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 bg-surface rounded-sm border border-outline-variant/40 inline-block" /> Off (Libur / Not Available)
              </span>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center pt-2">
              {['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'].map((d) => (
                <div key={d} className="font-sans text-[10px] font-bold uppercase text-outline py-1">
                  {d}
                </div>
              ))}

              {Array.from({ length: daysInMonth }, (_, i) => {
                const dayNum = i + 1;
                const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                const isAvail = (selectedFgForCalendar.availability || []).includes(dateStr);
                const projectOnDay = bookings.find((b) => b.assignedFgId === selectedFgForCalendar.id && b.date === dateStr);

                return (
                  <button
                    key={dateStr}
                    onClick={() => {
                      if (projectOnDay) {
                        alert(
                          `📸 DETAIL PROYEK KLIEN DITUGASKAN (${dateStr}):\n\n• Ref Kode: ${projectOnDay.bookingRef}\n• Klien: ${projectOnDay.name}\n• Waktu: ${projectOnDay.startTime || '09:00'} - ${projectOnDay.endTime || '17:00'} WIB\n• Lokasi: ${projectOnDay.location || 'Studio'}\n• Status: ${projectOnDay.projectStatus || 'Scheduled'}\n• Kontak: ${projectOnDay.phone}`
                        );
                      } else {
                        toggleFgAvailability(selectedFgForCalendar.id, dateStr);
                        setSelectedFgForCalendar((prev) => {
                          if (!prev) return null;
                          const current = prev.availability || [];
                          const updated = current.includes(dateStr)
                            ? current.filter((d) => d !== dateStr)
                            : [...current, dateStr];
                          return { ...prev, availability: updated };
                        });
                        showToast(`Tanggal ${dateStr} diperbarui untuk ${selectedFgForCalendar.name}!`);
                      }
                    }}
                    className={`min-h-[70px] p-1.5 border flex flex-col justify-between items-start transition-all relative text-left ${
                      projectOnDay
                        ? 'bg-amber-500 text-black border-amber-600 font-bold shadow-sm hover:bg-amber-600'
                        : isAvail
                        ? 'bg-emerald-600 text-white border-emerald-700 font-bold shadow-sm hover:bg-emerald-700'
                        : 'bg-surface-container text-on-surface-variant border-outline-variant/30 hover:bg-outline-variant/50'
                    }`}
                  >
                    <div className="w-full flex justify-between items-center">
                      <span className="text-xs font-mono font-bold">{dayNum}</span>
                      {projectOnDay && (
                        <span className="text-[7px] bg-black text-white px-1 py-0.2 font-mono uppercase font-bold rounded-xs">
                          JOB
                        </span>
                      )}
                    </div>

                    {projectOnDay ? (
                      <div className="w-full mt-0.5 space-y-0.5">
                        <span className="text-[9px] font-bold block truncate leading-tight font-sans">
                          📸 {projectOnDay.name}
                        </span>
                        <span className="text-[7px] font-mono text-black/80 block uppercase tracking-tighter truncate">
                          REF: {projectOnDay.bookingRef}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[8px] uppercase font-bold tracking-tighter mt-auto">
                        {isAvail ? 'AVAILABLE' : 'OFF'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-4 border-t border-outline-variant/30">
              <button
                onClick={() => setIsFgCalendarModalOpen(false)}
                className="px-6 py-2 bg-primary text-on-primary uppercase tracking-wider font-semibold text-xs hover:bg-outline transition-colors"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL ADD/EDIT FOTOGRAFER --- */}
      {isFgModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-sans">
          <div className="relative w-full max-w-lg bg-surface border border-outline-variant/40 p-6 lg:p-8 shadow-2xl space-y-4">
            <h3 className="font-serif text-2xl text-primary font-bold">
              {editingFg ? `Edit Data Fotografer: ${editingFg.name}` : 'Daftarkan Fotografer Tim Baru'}
            </h3>
            <p className="font-sans text-xs text-on-surface-variant">
              Fotografer yang didaftarkan dapat login ke Dashboard FG menggunakan nomor WhatsApp dan PIN di bawah ini.
            </p>

            <form onSubmit={handleSaveFg} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Foto Profil Fotografer (Upload / URL) *</label>
                <div className="flex items-center gap-3">
                  <img 
                    src={fgForm.avatar} 
                    alt="Preview Avatar" 
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary shadow-md shrink-0"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'; }}
                  />
                  <div className="flex-1 space-y-1.5">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        try {
                          const compressed = await compressImageFile(file, 400, 400, 0.75);
                          setFgForm((prev) => ({ ...prev, avatar: compressed }));
                          showToast('Foto profil FG berhasil dikompresi & dimuat!');
                        } catch (err) {
                          alert('Gagal memproses file gambar: ' + err.message);
                        }
                      }}
                      className="w-full text-xs file:mr-3 file:py-1 file:px-2.5 file:border-0 file:text-[10px] file:uppercase file:font-semibold file:bg-primary file:text-on-primary hover:file:bg-outline"
                    />
                    <input
                      type="text"
                      value={fgForm.avatar}
                      onChange={(e) => setFgForm({ ...fgForm, avatar: e.target.value })}
                      placeholder="Atau URL foto profil HTTPS..."
                      className="w-full bg-surface-container px-3 py-1.5 border border-outline-variant/40 text-primary font-mono text-[11px]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Nama Lengkap Fotografer *</label>
                  <input
                    type="text"
                    value={fgForm.name}
                    onChange={(e) => setFgForm({ ...fgForm, name: e.target.value })}
                    placeholder="Misal: Andi Wijaya"
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 text-primary font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Username Login FG *</label>
                  <input
                    type="text"
                    value={fgForm.username}
                    onChange={(e) => setFgForm({ ...fgForm, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') })}
                    placeholder="misal: andi"
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 text-primary font-bold font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">No. WhatsApp / HP Login *</label>
                  <input
                    type="tel"
                    value={fgForm.phone}
                    onChange={(e) => setFgForm({ ...fgForm, phone: e.target.value })}
                    placeholder="081234567890"
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 text-primary font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">PIN Akses Dashboard *</label>
                  <input
                    type="text"
                    value={fgForm.pin}
                    onChange={(e) => setFgForm({ ...fgForm, pin: e.target.value })}
                    placeholder="1234"
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 text-primary font-bold font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Email Fotografer *</label>
                  <input
                    type="email"
                    value={fgForm.email}
                    onChange={(e) => setFgForm({ ...fgForm, email: e.target.value })}
                    placeholder="andi.wijaya@jemarikilat.com"
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 text-primary font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Rating Performa Fotografer *</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={fgForm.rating}
                      onChange={(e) => setFgForm({ ...fgForm, rating: parseFloat(e.target.value) || 5.0 })}
                      className="w-20 bg-surface-container px-2 py-1.5 border border-outline-variant/40 text-primary font-mono font-bold text-center"
                      required
                    />
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((starVal) => {
                        const isFilled = starVal <= Math.round(fgForm.rating || 5);
                        return (
                          <button
                            key={starVal}
                            type="button"
                            onClick={() => setFgForm({ ...fgForm, rating: starVal })}
                            className="p-1 hover:scale-125 transition-transform"
                            title={`Set ${starVal}.0 Bintang`}
                          >
                            <Star className={`w-4 h-4 ${isFilled ? 'text-amber-400 fill-amber-400' : 'text-outline-variant/60'}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Spesialisasi & Peran *</label>
                <input
                  type="text"
                  value={fgForm.specialty}
                  onChange={(e) => setFgForm({ ...fgForm, specialty: e.target.value })}
                  placeholder="Senior Photographer • Wedding & Prewedding"
                  className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 text-primary font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Kamera & Gear Utama *</label>
                <textarea
                  rows="2"
                  value={fgForm.gear}
                  onChange={(e) => setFgForm({ ...fgForm, gear: e.target.value })}
                  placeholder="Sony A7 IV, FE 35mm f/1.4 GM, Flash Godox"
                  className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 text-primary font-medium resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setIsFgModalOpen(false)}
                  className="px-4 py-2 bg-transparent text-outline hover:text-primary transition-colors uppercase tracking-wider font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-on-primary font-semibold uppercase tracking-wider hover:bg-outline transition-colors"
                >
                  Simpan Fotografer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL EDIT BOOKING --- */}
      {isEditBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-sans">
          <div className="relative w-full max-w-xl bg-surface border border-outline-variant/40 p-6 lg:p-8 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-2xl text-primary font-bold">
              Edit Rincian Booking ({bookingEditForm.bookingRef})
            </h3>

            <form onSubmit={handleSaveEditBooking} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Nama Lengkap Klien *</label>
                <input
                  type="text"
                  value={bookingEditForm.name}
                  onChange={(e) => setBookingEditForm({ ...bookingEditForm, name: e.target.value })}
                  className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Email Klien *</label>
                  <input
                    type="email"
                    value={bookingEditForm.email}
                    onChange={(e) => setBookingEditForm({ ...bookingEditForm, email: e.target.value })}
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">No. WhatsApp *</label>
                  <input
                    type="tel"
                    value={bookingEditForm.phone}
                    onChange={(e) => setBookingEditForm({ ...bookingEditForm, phone: e.target.value })}
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Paket Layanan *</label>
                  <select
                    value={bookingEditForm.selectedPkg}
                    onChange={(e) => setBookingEditForm({ ...bookingEditForm, selectedPkg: e.target.value })}
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary"
                  >
                    {allPackages.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} — {pkg.priceIdr}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Status Reservasi *</label>
                  <select
                    value={bookingEditForm.status}
                    onChange={(e) => setBookingEditForm({ ...bookingEditForm, status: e.target.value })}
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary font-bold uppercase"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Tanggal Acara *</label>
                  <input
                    type="date"
                    value={bookingEditForm.date}
                    onChange={(e) => setBookingEditForm({ ...bookingEditForm, date: e.target.value })}
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Jam Mulai</label>
                  <input
                    type="text"
                    value={bookingEditForm.startTime}
                    onChange={(e) => setBookingEditForm({ ...bookingEditForm, startTime: e.target.value })}
                    placeholder="09:00"
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Jam Selesai</label>
                  <input
                    type="text"
                    value={bookingEditForm.endTime}
                    onChange={(e) => setBookingEditForm({ ...bookingEditForm, endTime: e.target.value })}
                    placeholder="17:00"
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Lokasi / Venue</label>
                <input
                  type="text"
                  value={bookingEditForm.location}
                  onChange={(e) => setBookingEditForm({ ...bookingEditForm, location: e.target.value })}
                  placeholder="Misal: JW Marriott Hotel Medan"
                  className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Assigned Fotografer</label>
                <select
                  value={bookingEditForm.assignedFgId}
                  onChange={(e) => setBookingEditForm({ ...bookingEditForm, assignedFgId: e.target.value })}
                  className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary font-semibold"
                >
                  <option value="">-- Belum Ditugaskan --</option>
                  {photographers.map((fg) => {
                    const isAvail = bookingEditForm.date ? isFgAvailableOnDate(fg, bookingEditForm.date) : null;
                    const tag = isAvail === true 
                      ? `🟢 [AVAILABLE ${bookingEditForm.date}]` 
                      : isAvail === false 
                      ? `🔴 [LIBUR / NOT AVAIL ${bookingEditForm.date}]` 
                      : '📸';
                    return (
                      <option key={fg.id} value={fg.id}>
                        {tag} {fg.name} ({fg.specialty.split('•')[0]})
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Catatan Khusus Klien</label>
                <textarea
                  rows="3"
                  value={bookingEditForm.notes}
                  onChange={(e) => setBookingEditForm({ ...bookingEditForm, notes: e.target.value })}
                  className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setIsEditBookingModalOpen(false)}
                  className="px-5 py-2.5 bg-surface-container text-on-surface hover:bg-outline-variant transition-colors uppercase font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary text-on-primary uppercase font-semibold tracking-wider hover:bg-on-surface-variant transition-colors"
                >
                  Simpan Perubahan Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL ADD/EDIT PHOTO --- */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-sans">
          <div className="relative w-full max-w-xl bg-surface border border-outline-variant/40 p-6 lg:p-8 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-2xl text-primary font-bold">
              {editingPhoto ? 'Edit Metadata Foto Galeri' : 'Tambah Foto Portfolio Baru'}
            </h3>

            <form onSubmit={handleSavePhoto} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Judul Foto *</label>
                <input
                  type="text"
                  value={photoForm.title}
                  onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                  placeholder="Misal: Nanda & Sri: The Sacred Vows"
                  className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Kategori</label>
                  <select
                    value={photoForm.category}
                    onChange={(e) => setPhotoForm({ ...photoForm, category: e.target.value })}
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Prewedding">Prewedding</option>
                    <option value="Graduation">Graduation</option>
                    <option value="Editorial">Editorial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Tahun</label>
                  <input
                    type="text"
                    value={photoForm.year}
                    onChange={(e) => setPhotoForm({ ...photoForm, year: e.target.value })}
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Upload Gambar (Dari Perangkat) Atau URL *</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      try {
                        const compressed = await compressImageFile(file, 1000, 1000, 0.8);
                        setPhotoForm((prev) => ({ ...prev, image: compressed }));
                        showToast('Gambar foto berhasil dikompresi & dimuat!');
                      } catch (err) {
                        alert('Gagal memproses gambar: ' + err.message);
                      }
                    }}
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 text-primary text-xs file:mr-4 file:py-1 file:px-3 file:border-0 file:text-[10px] file:uppercase file:font-semibold file:bg-primary file:text-on-primary hover:file:bg-outline"
                  />

                  <div className="text-[10px] text-outline text-center uppercase tracking-widest font-semibold">— ATAU MASUKKAN PATH / URL LINK —</div>

                  <input
                    type="text"
                    value={photoForm.image}
                    onChange={(e) => setPhotoForm({ ...photoForm, image: e.target.value })}
                    placeholder="/Portofolio/Foto/Wedding/Weeding nanda (1).JPG atau URL HTTPS"
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary font-mono text-[11px]"
                    required
                  />

                  {photoForm.image && (
                    <div className="mt-2 p-2 border border-outline-variant/30 bg-surface-container flex items-center gap-3">
                      <img src={photoForm.image} alt="Preview" className="w-16 h-16 object-cover border border-outline-variant/40" />
                      <div className="text-[10px] text-outline">
                        <span className="font-bold text-primary block">PREVIEW GAMBAR BERHASIL</span>
                        <span>Siap disimpan ke galeri studio.</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Kamera</label>
                  <input
                    type="text"
                    value={photoForm.camera}
                    onChange={(e) => setPhotoForm({ ...photoForm, camera: e.target.value })}
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Lensa</label>
                  <input
                    type="text"
                    value={photoForm.lens}
                    onChange={(e) => setPhotoForm({ ...photoForm, lens: e.target.value })}
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Deskripsi Foto</label>
                <textarea
                  rows="3"
                  value={photoForm.description}
                  onChange={(e) => setPhotoForm({ ...photoForm, description: e.target.value })}
                  placeholder="Ceritakan tentang momen atau konsep estetika foto ini..."
                  className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(false)}
                  className="px-5 py-2.5 bg-surface-container text-on-surface hover:bg-outline-variant transition-colors uppercase font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary text-on-primary uppercase font-semibold tracking-wider hover:bg-on-surface-variant transition-colors"
                >
                  Simpan Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL ADD/EDIT VIDEO --- */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-sans">
          <div className="relative w-full max-w-xl bg-surface border border-outline-variant/40 p-6 lg:p-8 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-2xl text-primary font-bold">
              {editingVideo ? 'Edit Metadata Video Cinematic' : 'Tambah Video Cinematic Baru'}
            </h3>

            <form onSubmit={handleSaveVideo} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Judul Video *</label>
                <input
                  type="text"
                  value={videoForm.title}
                  onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                  placeholder="Misal: Eternal Oath (Cinema Film)"
                  className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Kategori</label>
                  <select
                    value={videoForm.category}
                    onChange={(e) => setVideoForm({ ...videoForm, category: e.target.value })}
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary"
                  >
                    <option value="Wedding Film">Wedding Film</option>
                    <option value="Prewedding Reel">Prewedding Reel</option>
                    <option value="Graduation Film">Graduation Film</option>
                    <option value="Editorial Teaser">Editorial Teaser</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Durasi (misal: 03:45)</label>
                  <input
                    type="text"
                    value={videoForm.duration}
                    onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Upload Thumbnail Gambar *</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      try {
                        const compressed = await compressImageFile(file, 800, 600, 0.75);
                        setVideoForm((prev) => ({ ...prev, thumbnail: compressed }));
                        showToast('Thumbnail video berhasil dikompresi & dimuat!');
                      } catch (err) {
                        alert('Gagal memproses thumbnail video: ' + err.message);
                      }
                    }}
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 text-primary text-xs file:mr-4 file:py-1 file:px-3 file:border-0 file:text-[10px] file:uppercase file:font-semibold file:bg-primary file:text-on-primary hover:file:bg-outline"
                  />
                  <input
                    type="text"
                    value={videoForm.thumbnail}
                    onChange={(e) => setVideoForm({ ...videoForm, thumbnail: e.target.value })}
                    placeholder="/Portofolio/Foto/Wedding/... atau URL gambar HTTPS"
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary font-mono text-[11px]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Upload Berkas Video (MP4/WebM) Atau URL Link Embed *</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (uploadEvent) => {
                        setVideoForm((prev) => ({ ...prev, videoUrl: uploadEvent.target.result }));
                      };
                      reader.readAsDataURL(file);
                    }}
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 text-primary text-xs file:mr-4 file:py-1 file:px-3 file:border-0 file:text-[10px] file:uppercase file:font-semibold file:bg-primary file:text-on-primary hover:file:bg-outline"
                  />

                  <div className="text-[10px] text-outline text-center uppercase tracking-widest font-semibold">— ATAU MASUKKAN EMBED LINK / YOUTUBE URL —</div>

                  <input
                    type="text"
                    value={videoForm.videoUrl}
                    onChange={(e) => setVideoForm({ ...videoForm, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=... atau https://www.youtube.com/embed/..."
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary font-mono text-[11px]"
                  />

                  {videoForm.videoUrl && (
                    <div className="mt-2 p-2 border border-outline-variant/30 bg-surface-container flex items-center gap-3">
                      <div className="text-[10px] text-outline">
                        <span className="font-bold text-primary block">PREVIEW VIDEO STATUS</span>
                        <span className="font-mono text-[10px] text-emerald-700 font-semibold">{formatYoutubeEmbedUrl(videoForm.videoUrl)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Deskripsi Video</label>
                <textarea
                  rows="3"
                  value={videoForm.description}
                  onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                  placeholder="Ceritakan tentang sinematografi dan arahan musik video ini..."
                  className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="px-5 py-2.5 bg-surface-container text-on-surface hover:bg-outline-variant transition-colors uppercase font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary text-on-primary uppercase font-semibold tracking-wider hover:bg-on-surface-variant transition-colors"
                >
                  Simpan Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL ADD / EDIT PRICELIST PACKAGE --- */}
      {isPkgModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-sans">
          <div className="relative w-full max-w-xl bg-surface border border-outline-variant/40 p-6 lg:p-8 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-2xl text-primary font-bold">
              {editingPackage ? `Edit Paket Pricelist: ${editingPackage.name}` : `Tambah Paket Pricelist Baru (${pricingType.toUpperCase()})`}
            </h3>

            <form onSubmit={handleSavePkg} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Nama Paket *</label>
                <input
                  type="text"
                  value={pkgForm.name}
                  onChange={(e) => setPkgForm({ ...pkgForm, name: e.target.value })}
                  className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Harga IDR (Rupiah) *</label>
                  <input
                    type="text"
                    value={pkgForm.priceIdr}
                    onChange={(e) => setPkgForm({ ...pkgForm, priceIdr: e.target.value })}
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Estimasi USD ($)</label>
                  <input
                    type="text"
                    value={pkgForm.priceUsd}
                    onChange={(e) => setPkgForm({ ...pkgForm, priceUsd: e.target.value })}
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Subtitle / Ringkasan Paket</label>
                <input
                  type="text"
                  value={pkgForm.subtitle}
                  onChange={(e) => setPkgForm({ ...pkgForm, subtitle: e.target.value })}
                  className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary"
                />
              </div>

              <div className="flex items-center gap-2 py-2">
                <input
                  type="checkbox"
                  id="recommendedCheck"
                  checked={pkgForm.recommended}
                  onChange={(e) => setPkgForm({ ...pkgForm, recommended: e.target.checked })}
                  className="w-4 h-4 text-primary rounded"
                />
                <label htmlFor="recommendedCheck" className="text-xs font-semibold text-primary cursor-pointer">
                  Tandai Sebagai "MOST REQUESTED" (Badge Unggulan)
                </label>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">
                  Fitur & Layanan (Pisahkan Setiap Poin Dengan Baris Baru / Enter)
                </label>
                <textarea
                  rows="6"
                  value={pkgForm.features}
                  onChange={(e) => setPkgForm({ ...pkgForm, features: e.target.value })}
                  placeholder="2 Lead Photographers&#10;Full Day Coverage (12 Hours)&#10;Master Box Retouched Prints"
                  className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary resize-none font-mono text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setIsPkgModalOpen(false)}
                  className="px-5 py-2.5 bg-surface-container text-on-surface hover:bg-outline-variant transition-colors uppercase font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary text-on-primary uppercase font-semibold tracking-wider hover:bg-on-surface-variant transition-colors"
                >
                  Simpan Perubahan Paket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL ADD NEW BOOKING MANUAL --- */}
      {isNewBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-sans">
          <div className="relative w-full max-w-xl bg-surface border border-outline-variant/40 p-6 lg:p-8 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-2xl text-primary font-bold">
              Input Booking Manual (Admin Entry)
            </h3>

            <form onSubmit={handleSaveNewBooking} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Nama Lengkap Klien *</label>
                <input
                  type="text"
                  value={newBookingForm.name}
                  onChange={(e) => setNewBookingForm({ ...newBookingForm, name: e.target.value })}
                  placeholder="Misal: Clara Sativa"
                  className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Email Klien *</label>
                  <input
                    type="email"
                    value={newBookingForm.email}
                    onChange={(e) => setNewBookingForm({ ...newBookingForm, email: e.target.value })}
                    placeholder="clara@example.com"
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">No. WhatsApp *</label>
                  <input
                    type="tel"
                    value={newBookingForm.phone}
                    onChange={(e) => setNewBookingForm({ ...newBookingForm, phone: e.target.value })}
                    placeholder="081360318361"
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Pilih Paket Layanan *</label>
                  <select
                    value={newBookingForm.selectedPkg}
                    onChange={(e) => setNewBookingForm({ ...newBookingForm, selectedPkg: e.target.value })}
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary"
                  >
                    {allPackages.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} — {pkg.priceIdr}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Target Tanggal Acara *</label>
                  <input
                    type="date"
                    value={newBookingForm.date}
                    onChange={(e) => setNewBookingForm({ ...newBookingForm, date: e.target.value })}
                    className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Lokasi / Venue</label>
                <input
                  type="text"
                  value={newBookingForm.location}
                  onChange={(e) => setNewBookingForm({ ...newBookingForm, location: e.target.value })}
                  placeholder="Misal: JW Marriott Medan"
                  className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Assigned Fotografer (Availability Check)</label>
                <select
                  value={newBookingForm.assignedFgId}
                  onChange={(e) => setNewBookingForm({ ...newBookingForm, assignedFgId: e.target.value })}
                  className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary"
                >
                  <option value="">-- Belum Ditugaskan --</option>
                  {photographers.map((fg) => {
                    const isAvail = newBookingForm.date ? isFgAvailableOnDate(fg, newBookingForm.date) : null;
                    const tag = isAvail === true 
                      ? `🟢 [AVAILABLE ${newBookingForm.date}]` 
                      : isAvail === false 
                      ? `🔴 [LIBUR / NOT AVAIL ${newBookingForm.date}]` 
                      : '📸';
                    return (
                      <option key={fg.id} value={fg.id}>
                        {tag} {fg.name} ({fg.specialty.split('•')[0]})
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-outline mb-1 font-semibold">Catatan Khusus</label>
                <textarea
                  rows="2"
                  value={newBookingForm.notes}
                  onChange={(e) => setNewBookingForm({ ...newBookingForm, notes: e.target.value })}
                  placeholder="Catatan tambahan dari pemesanan..."
                  className="w-full bg-surface-container px-3 py-2 border border-outline-variant/40 focus:outline-none focus:border-primary text-primary resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setIsNewBookingModalOpen(false)}
                  className="px-5 py-2.5 bg-surface-container text-on-surface hover:bg-outline-variant transition-colors uppercase font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary text-on-primary uppercase font-semibold tracking-wider hover:bg-on-surface-variant transition-colors"
                >
                  Simpan Booking Baru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
