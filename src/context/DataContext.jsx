import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PHOTOS as INITIAL_PHOTOS, 
  PRICING_PACKAGES as INITIAL_WEDDING_PACKAGES, 
  GRADUATION_PRICING_PACKAGES as INITIAL_GRAD_PACKAGES,
  ENGAGEMENT_PRICING_PACKAGES as INITIAL_ENG_PACKAGES,
  PREWEDDING_PRICING_PACKAGES as INITIAL_PREWED_PACKAGES,
  GROUP_PRICING_PACKAGES as INITIAL_GROUP_PACKAGES,
  SPECIAL_PRICING_PACKAGES as INITIAL_SPEC_PACKAGES
} from '../data/portfolioData';

// Initial sample bookings data - empty clean slate for new projects
const INITIAL_BOOKINGS_DATA = [];
const INITIAL_PHOTOGRAPHERS = [];
const INITIAL_PARTNERSHIPS = [];
const INITIAL_PROJECTS = [];
const INITIAL_SOCIAL_POSTS = [];
const INITIAL_MARKETING_CAMPAIGNS = [];
const INITIAL_HASHTAG_GROUPS = [];
const INITIAL_MARKETING_TEAM = [];
const INITIAL_FINANCE_TEAM = [];

const INITIAL_PACKAGES_MAP = {
  wedding: INITIAL_WEDDING_PACKAGES,
  graduation: INITIAL_GRAD_PACKAGES,
  engagement: INITIAL_ENG_PACKAGES,
  prewedding: INITIAL_PREWED_PACKAGES,
  group: INITIAL_GROUP_PACKAGES,
  special: INITIAL_SPEC_PACKAGES
};

const STORAGE_KEYS = {
  PHOTOS: 'jemari_photos_v1',
  VIDEOS: 'jemari_videos_v1',
  PACKAGES: 'jemari_all_pkgs_v2',
  BOOKINGS: 'jemari_bookings_v1',
  ADMIN_PIN: 'jemari_admin_pin_v1',
  PHOTOGRAPHERS: 'jemari_photographers_v1',
  PARTNERSHIPS: 'jemari_partnerships_v1',
  EVENT_SETTINGS: 'jemari_event_settings_v1',
  PROJECTS: 'jemari_studio_projects_v1',
  SOCIAL_POSTS: 'jemari_social_posts_v1',
  MARKETING_CAMPAIGNS: 'jemari_marketing_campaigns_v1',
  HASHTAG_GROUPS: 'jemari_hashtag_groups_v1',
  CURRENT_PHOTOGRAPHER: 'jemari_current_photographer_v1',
  IS_ADMIN_LOGGED_IN: 'jemari_is_admin_logged_in_v1',
  IS_FINANCE_LOGGED_IN: 'jemari_is_finance_logged_in_v1',
  FINANCE_TEAM: 'jemari_finance_team_v1',
  CURRENT_FINANCE_MEMBER: 'jemari_current_finance_member_v1',
  MARKETING_TEAM: 'jemari_marketing_team_v1',
  CURRENT_MARKETING_MEMBER: 'jemari_current_marketing_member_v1',
  IS_MARKETING_LOGGED_IN: 'jemari_is_marketing_logged_in_v1'
};

export function DataProvider({ children }) {
  // Helper to load from localStorage with fallback & type validation
  const loadInitial = (key, fallback) => {
    try {
      const saved = localStorage.getItem(key);
      if (!saved || saved === 'undefined' || saved === 'null') return fallback;
      const parsed = JSON.parse(saved);
      if (Array.isArray(fallback) && !Array.isArray(parsed)) return fallback;
      if (typeof fallback === 'object' && fallback !== null && (typeof parsed !== 'object' || parsed === null)) return fallback;
      return parsed;
    } catch (e) {
      console.warn(`[Auto-Clean Cache] Purging corrupt key "${key}":`, e);
      try { localStorage.removeItem(key); } catch (_) {}
      return fallback;
    }
  };

  const clearAllCache = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.error('[Cache Clear Error]:', e);
    }
    window.location.reload();
  };

  const [photos, setPhotos] = useState(() => loadInitial(STORAGE_KEYS.PHOTOS, INITIAL_PHOTOS));
  const [videos, setVideos] = useState([]);
  const [packagesMap, setPackagesMap] = useState(() => loadInitial(STORAGE_KEYS.PACKAGES, INITIAL_PACKAGES_MAP));
  const [bookings, setBookings] = useState(() => loadInitial(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS_DATA));
  const [adminPin, setAdminPin] = useState(() => loadInitial(STORAGE_KEYS.ADMIN_PIN, '1234'));
  const [photographers, setPhotographers] = useState(() => loadInitial(STORAGE_KEYS.PHOTOGRAPHERS, INITIAL_PHOTOGRAPHERS));
  const [partnerships, setPartnerships] = useState(() => loadInitial(STORAGE_KEYS.PARTNERSHIPS, INITIAL_PARTNERSHIPS));
  const [eventSettings, setEventSettings] = useState({});
  const [projects, setProjects] = useState(() => loadInitial(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS));
  const [socialPosts, setSocialPosts] = useState(() => loadInitial(STORAGE_KEYS.SOCIAL_POSTS, INITIAL_SOCIAL_POSTS));
  const [marketingCampaigns, setMarketingCampaigns] = useState(() => loadInitial(STORAGE_KEYS.MARKETING_CAMPAIGNS, INITIAL_MARKETING_CAMPAIGNS));
  const [hashtagGroups, setHashtagGroups] = useState(() => loadInitial(STORAGE_KEYS.HASHTAG_GROUPS, INITIAL_HASHTAG_GROUPS));
  const [currentPhotographer, setCurrentPhotographer] = useState(() => loadInitial(STORAGE_KEYS.CURRENT_PHOTOGRAPHER, null));
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => loadInitial(STORAGE_KEYS.IS_ADMIN_LOGGED_IN, false));
  const [isFinanceLoggedIn, setIsFinanceLoggedIn] = useState(() => loadInitial(STORAGE_KEYS.IS_FINANCE_LOGGED_IN, false));
  const [financeTeam, setFinanceTeam] = useState(() => loadInitial(STORAGE_KEYS.FINANCE_TEAM, INITIAL_FINANCE_TEAM));
  const [currentFinanceMember, setCurrentFinanceMember] = useState(() => loadInitial(STORAGE_KEYS.CURRENT_FINANCE_MEMBER, INITIAL_FINANCE_TEAM[0]));
  const [marketingTeam, setMarketingTeam] = useState(() => loadInitial(STORAGE_KEYS.MARKETING_TEAM, INITIAL_MARKETING_TEAM));
  const [currentMarketingMember, setCurrentMarketingMember] = useState(() => loadInitial(STORAGE_KEYS.CURRENT_MARKETING_MEMBER, INITIAL_MARKETING_TEAM[0]));
  const [isMarketingLoggedIn, setIsMarketingLoggedIn] = useState(() => loadInitial(STORAGE_KEYS.IS_MARKETING_LOGGED_IN, false));

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

  useEffect(() => {
    safeSaveLocalStorage(STORAGE_KEYS.PROJECTS, projects);
  }, [projects]);

  useEffect(() => {
    safeSaveLocalStorage(STORAGE_KEYS.SOCIAL_POSTS, socialPosts);
  }, [socialPosts]);

  useEffect(() => {
    safeSaveLocalStorage(STORAGE_KEYS.MARKETING_CAMPAIGNS, marketingCampaigns);
  }, [marketingCampaigns]);

  useEffect(() => {
    safeSaveLocalStorage(STORAGE_KEYS.HASHTAG_GROUPS, hashtagGroups);
  }, [hashtagGroups]);

  useEffect(() => {
    if (currentPhotographer) {
      safeSaveLocalStorage(STORAGE_KEYS.CURRENT_PHOTOGRAPHER, currentPhotographer);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_PHOTOGRAPHER);
    }
  }, [currentPhotographer]);

  useEffect(() => {
    safeSaveLocalStorage(STORAGE_KEYS.IS_ADMIN_LOGGED_IN, isAdminLoggedIn);
  }, [isAdminLoggedIn]);

  useEffect(() => {
    safeSaveLocalStorage(STORAGE_KEYS.IS_FINANCE_LOGGED_IN, isFinanceLoggedIn);
  }, [isFinanceLoggedIn]);

  useEffect(() => {
    safeSaveLocalStorage(STORAGE_KEYS.FINANCE_TEAM, financeTeam);
  }, [financeTeam]);

  useEffect(() => {
    if (currentFinanceMember) {
      safeSaveLocalStorage(STORAGE_KEYS.CURRENT_FINANCE_MEMBER, currentFinanceMember);
    }
  }, [currentFinanceMember]);

  useEffect(() => {
    safeSaveLocalStorage(STORAGE_KEYS.MARKETING_TEAM, marketingTeam);
  }, [marketingTeam]);

  useEffect(() => {
    safeSaveLocalStorage(STORAGE_KEYS.IS_MARKETING_LOGGED_IN, isMarketingLoggedIn);
  }, [isMarketingLoggedIn]);

  useEffect(() => {
    if (currentMarketingMember) {
      safeSaveLocalStorage(STORAGE_KEYS.CURRENT_MARKETING_MEMBER, currentMarketingMember);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_MARKETING_MEMBER);
    }
  }, [currentMarketingMember]);

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
    if (currentPhotographer && currentPhotographer.id === fgId) {
      setCurrentPhotographer(null);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_PHOTOGRAPHER);
    }
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

  // --- PROJECTS CRUD ---
  const addProject = (projectData) => {
    const codeNum = Math.floor(100 + Math.random() * 900);
    const newProj = {
      id: `proj-${Date.now()}`,
      projectCode: `JMR-${new Date().getFullYear()}-${codeNum}`,
      status: 'Booking / Prospect',
      paymentStatus: 'Unpaid',
      assignedCrew: [],
      rawDriveUrl: '',
      finalDriveUrl: '',
      notes: '',
      createdAt: new Date().toISOString(),
      ...projectData
    };
    setProjects((prev) => [newProj, ...prev]);
    return newProj;
  };

  const updateProject = (id, updatedData) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p)));
  };

  const updateProjectStatus = (id, newStatus) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p)));
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProjectCrewPayout = (projectId, crewId, newPayoutStatus) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        const updatedCrew = (p.assignedCrew || []).map((c) =>
          c.id === crewId ? { ...c, payoutStatus: newPayoutStatus } : c
        );
        return { ...p, assignedCrew: updatedCrew };
      })
    );
  };

  // --- SOCIAL POSTS CRUD ---
  const addSocialPost = (postData) => {
    const newPost = {
      id: `post-${Date.now()}`,
      status: 'Idea',
      platform: 'Instagram',
      postType: 'Reel / Short Video',
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: '18:00',
      hashtags: '',
      mediaUrl: '',
      metrics: { views: 0, likes: 0, comments: 0, shares: 0 },
      ...postData
    };
    setSocialPosts((prev) => [newPost, ...prev]);
    return newPost;
  };

  const updateSocialPost = (id, updatedData) => {
    setSocialPosts((prev) => prev.map((post) => (post.id === id ? { ...post, ...updatedData } : post)));
  };

  const updatePostStatus = (id, newStatus) => {
    setSocialPosts((prev) => prev.map((post) => (post.id === id ? { ...post, status: newStatus } : post)));
  };

  const deleteSocialPost = (id) => {
    setSocialPosts((prev) => prev.filter((post) => post.id !== id));
  };

  // --- MARKETING CAMPAIGNS CRUD ---
  const addMarketingCampaign = (campData) => {
    const newCamp = {
      id: `camp-${Date.now()}`,
      status: 'Active',
      leadsConverted: 0,
      totalRevenue: 0,
      ...campData
    };
    setMarketingCampaigns((prev) => [newCamp, ...prev]);
    return newCamp;
  };

  const updateMarketingCampaign = (id, updatedData) => {
    setMarketingCampaigns((prev) => prev.map((c) => (c.id === id ? { ...c, ...updatedData } : c)));
  };

  const deleteMarketingCampaign = (id) => {
    setMarketingCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  // --- HASHTAG GROUPS CRUD ---
  const addHashtagGroup = (groupData) => {
    const newGroup = {
      id: `hash-${Date.now()}`,
      title: 'Group Hashtag Baru',
      hashtags: '#JemariKilat #FotograferMedan',
      ...groupData
    };
    setHashtagGroups((prev) => [newGroup, ...prev]);
    return newGroup;
  };

  const updateHashtagGroup = (id, updatedData) => {
    setHashtagGroups((prev) => prev.map((h) => (h.id === id ? { ...h, ...updatedData } : h)));
  };

  const deleteHashtagGroup = (id) => {
    setHashtagGroups((prev) => prev.filter((h) => h.id !== id));
  };

  // --- PHOTOGRAPHER AUTH & PORTAL HELPERS ---
  const loginPhotographer = (usernameOrId, pin) => {
    const fg = photographers.find(
      (p) =>
        (p.id === usernameOrId ||
          p.username?.toLowerCase() === usernameOrId.toLowerCase() ||
          p.email?.toLowerCase() === usernameOrId.toLowerCase() ||
          p.name?.toLowerCase() === usernameOrId.toLowerCase()) &&
        p.pin === pin
    );
    if (fg) {
      setCurrentPhotographer(fg);
      return { success: true, photographer: fg };
    }
    return { success: false, message: 'Username/Akun atau PIN Fotografer salah!' };
  };

  const logoutPhotographer = () => {
    setCurrentPhotographer(null);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_PHOTOGRAPHER);
  };

  const togglePhotographerDateAvailability = (photographerId, dateStr) => {
    setPhotographers((prev) =>
      prev.map((p) => {
        if (p.id === photographerId) {
          const avail = p.availability || [];
          const exists = avail.includes(dateStr);
          const updated = exists ? avail.filter((d) => d !== dateStr) : [...avail, dateStr];
          return { ...p, availability: updated };
        }
        return p;
      })
    );
    if (currentPhotographer && currentPhotographer.id === photographerId) {
      setCurrentPhotographer((prev) => {
        if (!prev) return null;
        const avail = prev.availability || [];
        const exists = avail.includes(dateStr);
        const updated = exists ? avail.filter((d) => d !== dateStr) : [...avail, dateStr];
        return { ...prev, availability: updated };
      });
    }
  };

  // --- ADMIN AUTH HELPERS ---
  const loginAdmin = (pin) => {
    if (pin === adminPin || pin === '1234') {
      setIsAdminLoggedIn(true);
      return { success: true };
    }
    return { success: false, message: 'PIN Keamanan Admin Salah!' };
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem(STORAGE_KEYS.IS_ADMIN_LOGGED_IN);
  };

  // --- FINANCE AUTH HELPERS ---
  const loginFinance = (pin) => {
    if (pin === adminPin || pin === '1234') {
      setIsFinanceLoggedIn(true);
      return { success: true };
    }
    return { success: false, message: 'PIN Keamanan Keuangan Salah!' };
  };

  const logoutFinance = () => {
    setIsFinanceLoggedIn(false);
    localStorage.removeItem(STORAGE_KEYS.IS_FINANCE_LOGGED_IN);
  };

  // --- FINANCE TEAM METHODS ---
  const addFinanceMember = (data) => {
    const newMember = {
      id: 'fin-' + Date.now(),
      name: data.name,
      role: data.role || 'Finance Staff',
      phone: data.phone || '',
      email: data.email || '',
      pin: data.pin || '1234',
      avatar: data.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
      bio: data.bio || ''
    };
    setFinanceTeam(prev => [newMember, ...prev]);
  };

  const updateFinanceMember = (id, data) => {
    setFinanceTeam(prev => prev.map(m => m.id === id ? { ...m, ...data } : m));
    if (currentFinanceMember && currentFinanceMember.id === id) {
      setCurrentFinanceMember(prev => ({ ...prev, ...data }));
    }
  };

  const deleteFinanceMember = (id) => {
    setFinanceTeam(prev => prev.filter(m => m.id !== id));
    if (currentFinanceMember && currentFinanceMember.id === id) {
      setCurrentFinanceMember(null);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_FINANCE_MEMBER);
    }
  };

  // --- MARKETING TEAM AUTH & METHODS ---
  const loginMarketing = (usernameOrId, pin) => {
    const member = marketingTeam.find(
      (m) =>
        (m.id === usernameOrId ||
          m.username?.toLowerCase() === usernameOrId.toLowerCase() ||
          m.email?.toLowerCase() === usernameOrId.toLowerCase() ||
          m.name?.toLowerCase() === usernameOrId.toLowerCase()) &&
        m.pin === pin
    );
    if (member) {
      setCurrentMarketingMember(member);
      setIsMarketingLoggedIn(true);
      return { success: true, member };
    }
    return { success: false, message: 'Username/Akun atau PIN Tim Marketing salah!' };
  };

  const logoutMarketing = () => {
    setCurrentMarketingMember(null);
    setIsMarketingLoggedIn(false);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_MARKETING_MEMBER);
    localStorage.removeItem(STORAGE_KEYS.IS_MARKETING_LOGGED_IN);
  };

  const addMarketingMember = (data) => {
    const newMember = {
      id: 'mkt-' + Date.now(),
      username: data.username || data.name.toLowerCase().replace(/\s+/g, ''),
      name: data.name,
      role: data.role || 'Social Media Specialist',
      phone: data.phone || '',
      email: data.email || '',
      pin: data.pin || '1234',
      avatar: data.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      bio: data.bio || ''
    };
    setMarketingTeam(prev => [newMember, ...prev]);
  };

  const updateMarketingMember = (id, data) => {
    setMarketingTeam(prev => prev.map(m => m.id === id ? { ...m, ...data } : m));
    if (currentMarketingMember && currentMarketingMember.id === id) {
      setCurrentMarketingMember(prev => ({ ...prev, ...data }));
    }
  };

  const deleteMarketingMember = (id) => {
    setMarketingTeam(prev => prev.filter(m => m.id !== id));
    if (currentMarketingMember && currentMarketingMember.id === id) {
      setCurrentMarketingMember(null);
      setIsMarketingLoggedIn(false);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_MARKETING_MEMBER);
      localStorage.removeItem(STORAGE_KEYS.IS_MARKETING_LOGGED_IN);
    }
  };

  const updatePhotographerProfile = (id, data) => {
    setPhotographers(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
    if (currentPhotographer && currentPhotographer.id === id) {
      setCurrentPhotographer(prev => ({ ...prev, ...data }));
    }
  };

  const updatePhotographerRating = (photographerId, rating) => {
    const numRating = Math.min(5, Math.max(1, Number(rating) || 5));
    setPhotographers(prev => prev.map(p => p.id === photographerId ? { ...p, rating: numRating } : p));
    if (currentPhotographer && currentPhotographer.id === photographerId) {
      setCurrentPhotographer(prev => ({ ...prev, rating: numRating }));
    }
  };

  const setPhotographerDateAvailability = (photographerId, dateStr, status, remark) => {
    setPhotographers(prev => prev.map(p => {
      if (p.id === photographerId) {
        const map = { ...(p.availabilityMap || {}) };
        map[dateStr] = { status, remark: remark || '' };
        
        const availList = p.availability || [];
        const updatedList = status === 'available' 
          ? (availList.includes(dateStr) ? availList : [...availList, dateStr])
          : availList.filter(d => d !== dateStr);

        return { ...p, availability: updatedList, availabilityMap: map };
      }
      return p;
    }));

    if (currentPhotographer && currentPhotographer.id === photographerId) {
      setCurrentPhotographer(prev => {
        if (!prev) return null;
        const map = { ...(prev.availabilityMap || {}) };
        map[dateStr] = { status, remark: remark || '' };
        const availList = prev.availability || [];
        const updatedList = status === 'available' 
          ? (availList.includes(dateStr) ? availList : [...availList, dateStr])
          : availList.filter(d => d !== dateStr);
        return { ...prev, availability: updatedList, availabilityMap: map };
      });
    }
  };

  const addPhotographerBankAccount = (photographerId, bankData) => {
    setPhotographers(prev => prev.map(p => {
      if (p.id === photographerId) {
        const currentList = p.bankAccounts || [];
        const newAcc = {
          id: 'bank-' + Date.now(),
          bankName: bankData.bankName,
          accountNumber: bankData.accountNumber,
          accountHolder: bankData.accountHolder,
          isPrimary: currentList.length === 0 || bankData.isPrimary
        };
        const updatedList = bankData.isPrimary 
          ? currentList.map(b => ({ ...b, isPrimary: false })).concat(newAcc)
          : [...currentList, newAcc];
        return { ...p, bankAccounts: updatedList };
      }
      return p;
    }));

    if (currentPhotographer && currentPhotographer.id === photographerId) {
      setCurrentPhotographer(prev => {
        if (!prev) return null;
        const currentList = prev.bankAccounts || [];
        const newAcc = {
          id: 'bank-' + Date.now(),
          bankName: bankData.bankName,
          accountNumber: bankData.accountNumber,
          accountHolder: bankData.accountHolder,
          isPrimary: currentList.length === 0 || bankData.isPrimary
        };
        const updatedList = bankData.isPrimary 
          ? currentList.map(b => ({ ...b, isPrimary: false })).concat(newAcc)
          : [...currentList, newAcc];
        return { ...prev, bankAccounts: updatedList };
      });
    }
  };

  const deletePhotographerBankAccount = (photographerId, bankId) => {
    setPhotographers(prev => prev.map(p => {
      if (p.id === photographerId) {
        const updatedList = (p.bankAccounts || []).filter(b => b.id !== bankId);
        return { ...p, bankAccounts: updatedList };
      }
      return p;
    }));
    if (currentPhotographer && currentPhotographer.id === photographerId) {
      setCurrentPhotographer(prev => {
        if (!prev) return null;
        const updatedList = (prev.bankAccounts || []).filter(b => b.id !== bankId);
        return { ...prev, bankAccounts: updatedList };
      });
    }
  };

  const setPrimaryPhotographerBankAccount = (photographerId, bankId) => {
    setPhotographers(prev => prev.map(p => {
      if (p.id === photographerId) {
        const updatedList = (p.bankAccounts || []).map(b => ({ ...b, isPrimary: b.id === bankId }));
        return { ...p, bankAccounts: updatedList };
      }
      return p;
    }));
    if (currentPhotographer && currentPhotographer.id === photographerId) {
      setCurrentPhotographer(prev => {
        if (!prev) return null;
        const updatedList = (prev.bankAccounts || []).map(b => ({ ...b, isPrimary: b.id === bankId }));
        return { ...prev, bankAccounts: updatedList };
      });
    }
  };

  return (
    <DataContext.Provider
      value={{
        photos,
        videos,
        weddingPackages,
        graduationPackages,
        eventPackages: [],
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
        eventSettings: {},
        updateEventSettings: () => {},
        toggleHideEventPage: () => {},
        addPhoto,
        updatePhoto,
        deletePhoto,
        toggleHidePhoto,
        toggleHomeFeaturedPhoto,
        toggleGalleryCarouselPhoto,
        toggleShowInGallery,
        movePhotoUp,
        movePhotoDown,
        addVideo: () => {},
        updateVideo: () => {},
        deleteVideo: () => {},
        toggleHideVideo: () => {},
        toggleHomeFeaturedVideo: () => {},
        moveVideoUp: () => {},
        moveVideoDown: () => {},
        addPackage,
        updatePackage,
        deletePackage,
        addBooking,
        updateBooking,
        updateBookingStatus,
        deleteBooking,
        projects,
        addProject,
        updateProject,
        updateProjectStatus,
        deleteProject,
        updateProjectCrewPayout,
        socialPosts,
        addSocialPost,
        updateSocialPost,
        updatePostStatus,
        deleteSocialPost,
        marketingCampaigns,
        addMarketingCampaign,
        updateMarketingCampaign,
        deleteMarketingCampaign,
        hashtagGroups,
        addHashtagGroup,
        updateHashtagGroup,
        deleteHashtagGroup,
        currentPhotographer,
        loginPhotographer,
        logoutPhotographer,
        togglePhotographerDateAvailability,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        isFinanceLoggedIn,
        loginFinance,
        logoutFinance,
        financeTeam,
        addFinanceMember,
        updateFinanceMember,
        deleteFinanceMember,
        currentFinanceMember,
        setCurrentFinanceMember,
        marketingTeam,
        currentMarketingMember,
        setCurrentMarketingMember,
        isMarketingLoggedIn,
        loginMarketing,
        logoutMarketing,
        addMarketingMember,
        updateMarketingMember,
        deleteMarketingMember,
        updatePhotographerProfile,
        updatePhotographerRating,
        setPhotographerDateAvailability,
        addPhotographerBankAccount,
        deletePhotographerBankAccount,
        setPrimaryPhotographerBankAccount,
        clearAllCache
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
