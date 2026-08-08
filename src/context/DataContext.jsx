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
    availability: ['2026-08-02', '2026-08-05', '2026-08-08', '2026-08-10', '2026-08-15', '2026-08-20'],
    availabilityMap: {
      '2026-08-15': { status: 'available', remark: 'Available - Sesi Shooting Pagi & Siang' },
      '2026-08-20': { status: 'unavailable', remark: 'Off Duty - Liburan Keluar Kota' }
    },
    bankAccounts: [
      { id: 'b-1', bankName: 'Bank BCA', accountNumber: '8000123991', accountHolder: 'Sigit Irawan', isPrimary: true },
      { id: 'b-2', bankName: 'GoPay / E-Wallet', accountNumber: '081360318361', accountHolder: 'Sigit Irawan', isPrimary: false }
    ]
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
    availability: ['2026-08-01', '2026-08-03', '2026-08-07', '2026-08-12', '2026-08-18'],
    availabilityMap: {},
    bankAccounts: [
      { id: 'b-3', bankName: 'Bank Mandiri', accountNumber: '1100089210293', accountHolder: 'Rian Pratama', isPrimary: true }
    ]
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

const INITIAL_PROJECTS = [
  {
    id: 'proj-101',
    projectCode: 'JMR-2026-081',
    clientName: 'Ananda & Rizky',
    clientPhone: '081298765432',
    clientEmail: 'ananda.rizky@gmail.com',
    eventType: 'Wedding Photography & Cinematic Film',
    packageId: 'pkg-wedding-royal',
    packageName: 'Royal Platinum Wedding Package',
    eventDate: '2026-08-25',
    eventTime: '08:00 WIB',
    location: 'Grand Aston Cityhall Ballroom Medan',
    status: 'Shooting Scheduled', // Prospect, Confirmed, Pre-Shoot, Shooting Scheduled, Editing, Revision, Final Delivered, Completed
    totalAmount: 12500000,
    paidAmount: 5000000,
    paymentStatus: 'DP Paid', // Unpaid, DP Paid, Paid Full
    assignedCrew: [
      { id: 'fg-1', name: 'Sigit Irawan', role: 'Lead Photographer', fee: 2500000, payoutStatus: 'Unpaid' },
      { id: 'fg-2', name: 'Rian Pratama', role: 'Videographer & Drone', fee: 2000000, payoutStatus: 'Unpaid' }
    ],
    rawDriveUrl: 'https://drive.google.com/drive/folders/jemari-raw-ananda-rizky',
    finalDriveUrl: 'https://drive.google.com/drive/folders/jemari-final-ananda-rizky',
    notes: 'Prioritaskan dokumentasi momen sungkeman dan lighting pesta malam warna warm gold.',
    createdAt: '2026-08-01T10:15:00Z'
  },
  {
    id: 'proj-102',
    projectCode: 'JMR-2026-082',
    clientName: 'Siti Sarah & Group USU 2026',
    clientPhone: '082145678901',
    clientEmail: 'siti.sarah@usu.ac.id',
    eventType: 'Wisuda Group Studio & Outdoor',
    packageId: 'pkg-grad-group',
    packageName: 'Graduation VIP Group Package',
    eventDate: '2026-08-18',
    eventTime: '13:00 WIB',
    location: 'Studio Titik Tuju & Taman Kampus USU',
    status: 'Editing',
    totalAmount: 3500000,
    paidAmount: 3500000,
    paymentStatus: 'Paid Full',
    assignedCrew: [
      { id: 'fg-2', name: 'Rian Pratama', role: 'Senior Photographer', fee: 1000000, payoutStatus: 'Paid' }
    ],
    rawDriveUrl: 'https://drive.google.com/drive/folders/jemari-raw-sitisarah-grad',
    finalDriveUrl: '',
    notes: 'Foto grup 8 orang, butuh color grading cerah & tone pastel estetik.',
    createdAt: '2026-08-03T14:30:00Z'
  },
  {
    id: 'proj-103',
    projectCode: 'JMR-2026-083',
    clientName: 'Bagas & Clarissa',
    clientPhone: '081399887766',
    clientEmail: 'bagas.clarissa@hotmail.com',
    eventType: 'Prewedding Cinematic Outdoor',
    packageId: 'pkg-prewed-luxe',
    packageName: 'Luxe Cinematic Prewedding',
    eventDate: '2026-09-02',
    eventTime: '06:00 WIB',
    location: 'Danau Toba & Bukit Holbung',
    status: 'Confirmed',
    totalAmount: 8500000,
    paidAmount: 3000000,
    paymentStatus: 'DP Paid',
    assignedCrew: [
      { id: 'fg-1', name: 'Sigit Irawan', role: 'Lead Director & Photographer', fee: 2000000, payoutStatus: 'Unpaid' }
    ],
    rawDriveUrl: '',
    finalDriveUrl: '',
    notes: 'Konsep romantic sunrise moody cinematic tone. Izin drone lokasi dan transportasi crew disiapkan.',
    createdAt: '2026-08-05T09:00:00Z'
  },
  {
    id: 'proj-104',
    projectCode: 'JMR-2026-084',
    clientName: 'Festival Musik Soundwave Medan',
    clientPhone: '085211223344',
    clientEmail: 'event@soundwavemedan.com',
    eventType: 'Event Stage & Concert Photo',
    packageId: 'pkg-event-stage',
    packageName: 'High-Voltage Stage & Summit Pass',
    eventDate: '2026-08-12',
    eventTime: '16:00 WIB',
    location: 'Lapangan Pancing Medan',
    status: 'Final Delivered',
    totalAmount: 15000000,
    paidAmount: 15000000,
    paymentStatus: 'Paid Full',
    assignedCrew: [
      { id: 'fg-1', name: 'Sigit Irawan', role: 'Stage Lead Photographer', fee: 3500000, payoutStatus: 'Paid' },
      { id: 'fg-2', name: 'Rian Pratama', role: 'Crowd & Stage Videographer', fee: 3000000, payoutStatus: 'Paid' }
    ],
    rawDriveUrl: 'https://drive.google.com/drive/folders/soundwave-raw',
    finalDriveUrl: 'https://drive.google.com/drive/folders/soundwave-final-delivered',
    notes: 'Delivery foto press 24 jam selesai tepat waktu!',
    createdAt: '2026-07-28T11:00:00Z'
  }
];

const INITIAL_SOCIAL_POSTS = [
  {
    id: 'post-201',
    title: 'Behind The Lens: Cinematic Wedding Highlight Ananda & Rizky',
    platform: 'Instagram', // Instagram, TikTok, YouTube Shorts, Facebook
    postType: 'Reel / Short Video', // Reel / Short Video, Carousel Photo, Single Feed, Story
    status: 'Scheduled', // Idea, Drafting, Assets Ready, Scheduled, Published
    scheduledDate: '2026-08-10',
    scheduledTime: '19:00',
    caption: `Momen haru & kehangatan pernikahan Ananda & Rizky di Grand Aston Medan. 💍✨\n\nSetiap senyuman dan tatapan penuh makna diabadikan dengan color grading obsidian warm signature Jemari Kilat.\n\nLooking for timeless wedding documentation? DM us or click link in bio for 2026 pricelist!`,
    hashtagGroupId: 'hash-1',
    hashtags: '#WeddingMedan #FotograferMedan #CinematicWedding #JemariKilat #BridalMedan #WeddingDokumentasi',
    mediaUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
    assignedCreator: 'Sigit Irawan',
    metrics: { views: 4200, likes: 380, comments: 45, shares: 28 }
  },
  {
    id: 'post-202',
    title: 'Spill Studio Wisuda Estetik Medan: Titik Tuju x Jemari Kilat',
    platform: 'TikTok',
    postType: 'Reel / Short Video',
    status: 'Published',
    scheduledDate: '2026-08-06',
    scheduledTime: '18:30',
    caption: `Tips foto wisuda bareng geng kuliah biar nggak kaku! 🎓🔥 Pakai lighting natural & angle estetik di Studio Titik Tuju Medan.\n\nTag geng kelulusan kamu sekarang!`,
    hashtagGroupId: 'hash-2',
    hashtags: '#WisudaMedan #FotoWisudaMedan #GraduationPhotoshoot #JemariKilat #USU #Unimed #PancaBudi',
    mediaUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    assignedCreator: 'Rian Pratama',
    metrics: { views: 18500, likes: 1420, comments: 89, shares: 230 }
  },
  {
    id: 'post-203',
    title: 'Carousel 5 Pose Prewedding Indoor Elegant Minimalis',
    platform: 'Instagram',
    postType: 'Carousel Photo',
    status: 'Drafting',
    scheduledDate: '2026-08-14',
    scheduledTime: '20:00',
    caption: `Bingung pilih pose prewedding biar keliatan natural dan tidak berlebihan? Swipe left buat inspirasi 5 pose favorit tim Jemari Kilat! 🖤📸`,
    hashtagGroupId: 'hash-1',
    hashtags: '#PreweddingMedan #PoseInspirasi #PreweddingMinimalis #JemariKilatPhotography',
    mediaUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200',
    assignedCreator: 'Sigit Irawan',
    metrics: { views: 0, likes: 0, comments: 0, shares: 0 }
  }
];

const INITIAL_MARKETING_CAMPAIGNS = [
  {
    id: 'camp-301',
    name: 'Promo Wisuda Spesial Semester Akhir 2026',
    code: 'GRADJEMARI2026',
    discount: 'Diskon 15% + Gratis 1 Cetak Frame 12R',
    startDate: '2026-08-01',
    endDate: '2026-09-30',
    targetAudience: 'Mahasiswa Akhir USU, UNIMED, UMSU, Panca Budi',
    status: 'Active',
    leadsConverted: 18,
    totalRevenue: 28500000
  },
  {
    id: 'camp-302',
    name: 'Early Bird Wedding Package Booking 2027',
    code: 'EARLYWED2027',
    discount: 'Bonus Prewedding Video Teaser 1 Menit',
    startDate: '2026-08-15',
    endDate: '2026-10-31',
    targetAudience: 'Pasangan Tunangan & Calon Pengantin Medan',
    status: 'Upcoming',
    leadsConverted: 0,
    totalRevenue: 0
  }
];

const INITIAL_HASHTAG_GROUPS = [
  {
    id: 'hash-1',
    title: 'Wedding & Prewedding Medan',
    hashtags: '#WeddingMedan #FotograferMedan #CinematicWedding #JemariKilat #BridalMedan #WeddingDokumentasi #PreweddingMedan'
  },
  {
    id: 'hash-2',
    title: 'Wisuda & Studio Photoshoot',
    hashtags: '#WisudaMedan #FotoWisudaMedan #GraduationPhotoshoot #JemariKilat #USU #Unimed #StudioFotoMedan'
  },
  {
    id: 'hash-3',
    title: 'Event Concert & Stage Festival',
    hashtags: '#StagePhotography #ConcertMedan #EventDokumentasi #JemariKilat #StageID #MusicPhotographer'
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

const INITIAL_MARKETING_TEAM = [
  {
    id: 'mkt-1',
    username: 'maya',
    name: 'Maya Safitri',
    phone: '081398765432',
    email: 'maya.marketing@jemarikilat.com',
    role: 'Lead Social Media & Performance Marketer',
    pin: '1234',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    bio: 'Perencana konten kreatif, pengelola iklan Meta Ads & Google Ads studio Jemari Kilat.'
  }
];

const INITIAL_FINANCE_TEAM = [
  {
    id: 'fin-1',
    name: 'Siti Rahma',
    role: 'Head of Finance & Accounting',
    phone: '081234567890',
    email: 'siti.finance@jemarikilat.com',
    pin: '1234',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    bio: 'Pengelola arus kas studio, payroll honorarium crew, dan pencatatan laba bersih.'
  }
];

const INITIAL_PACKAGES_MAP = {
  wedding: INITIAL_WEDDING_PACKAGES,
  graduation: INITIAL_GRAD_PACKAGES,
  engagement: INITIAL_ENG_PACKAGES,
  prewedding: INITIAL_PREWED_PACKAGES,
  group: INITIAL_GROUP_PACKAGES,
  special: INITIAL_SPEC_PACKAGES
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
        setPrimaryPhotographerBankAccount
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
