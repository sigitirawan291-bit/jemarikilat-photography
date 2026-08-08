import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, LogOut, Plus, Search, Filter, Folder, Users, 
  Share2, Hash, DollarSign, Calendar, Clock, Edit3, Trash2, CheckCircle2, 
  AlertCircle, Link as LinkIcon, ExternalLink, Sparkles, Layers, RefreshCw
} from 'lucide-react';
import { useData } from '../context/DataContext';
import AdminLoginModal from '../components/studio/AdminLoginModal';
import ProjectModal from '../components/studio/ProjectModal';
import ContentPlannerModal from '../components/studio/ContentPlannerModal';
import TeamMemberModal from '../components/studio/TeamMemberModal';

export default function AdminPortalView() {
  const { 
    isAdminLoggedIn, 
    logoutAdmin,
    projects = [], 
    updateProjectStatus, 
    deleteProject, 
    updateProjectCrewPayout,
    photographers = [], 
    deletePhotographer, 
    toggleFgAvailability,
    socialPosts = [], 
    updatePostStatus, 
    deleteSocialPost,
    marketingCampaigns = [], 
    addMarketingCampaign, 
    deleteMarketingCampaign,
    hashtagGroups = [],
    addHashtagGroup,
    deleteHashtagGroup
  } = useData();

  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('projects'); // projects, team, sosmed, campaigns

  // Modals state
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const [selectedPost, setSelectedPost] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const [selectedMember, setSelectedMember] = useState(null);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  // Filters & search
  const [projectFilterStatus, setProjectFilterStatus] = useState('ALL');
  const [projectSearch, setProjectSearch] = useState('');

  // Inline forms
  const [newCampaign, setNewCampaign] = useState({ name: '', code: '', discount: '', targetAudience: '' });
  const [newHashtagGroup, setNewHashtagGroup] = useState({ title: '', hashtags: '' });

  // Unauthenticated / Locked View
  if (!isAdminLoggedIn) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck size={13} /> Studio Admin Control Hub
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-tight">
              Panel Admin <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">Studio</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Halaman khusus pengelola untuk semua **pengaturan project client**, **menentukan fotografer & honorarium crew**, **membagi jadwal shooting**, serta **marketing hub**. Masukkan PIN Keamanan Admin Anda.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => setIsAdminLoginModalOpen(true)}
                className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 shadow-lg shadow-blue-600/30 transition-all active:scale-95"
              >
                <Lock size={16} /> Login ke Panel Admin Studio
              </button>
            </div>
          </div>
        </div>

        {/* Login Modal */}
        <AdminLoginModal
          isOpen={isAdminLoginModalOpen}
          onClose={() => setIsAdminLoginModalOpen(false)}
        />
      </div>
    );
  }

  // --- LOGGED IN ADMIN PORTAL VIEW ---
  const filteredProjects = projects.filter((p) => {
    const matchesStatus = projectFilterStatus === 'ALL' || p.status === projectFilterStatus;
    const matchesSearch = 
      p.clientName?.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.projectCode?.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.location?.toLowerCase().includes(projectSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const KANBAN_STAGES = [
    'Booking / Prospect',
    'Confirmed',
    'Pre-Shoot Prep',
    'Shooting Scheduled',
    'Editing',
    'Client Revision',
    'Final Delivered',
    'Completed'
  ];

  const handleOpenNewProject = () => {
    setSelectedProject(null);
    setIsProjectModalOpen(true);
  };

  const handleEditProject = (proj) => {
    setSelectedProject(proj);
    setIsProjectModalOpen(true);
  };

  const handleOpenNewPost = () => {
    setSelectedPost(null);
    setIsPostModalOpen(true);
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setIsPostModalOpen(true);
  };

  const handleAddCampaignSubmit = (e) => {
    e.preventDefault();
    if (!newCampaign.name || !newCampaign.code) return;
    addMarketingCampaign(newCampaign);
    setNewCampaign({ name: '', code: '', discount: '', targetAudience: '' });
  };

  const handleAddHashtagSubmit = (e) => {
    e.preventDefault();
    if (!newHashtagGroup.title || !newHashtagGroup.hashtags) return;
    addHashtagGroup(newHashtagGroup);
    setNewHashtagGroup({ title: '', hashtags: '' });
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header Banner Logged-in Admin */}
      <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold rounded-full uppercase">
                🟢 Admin Access Active
              </span>
              <span className="text-xs text-slate-400 font-mono">Sigit Irawan — Studio Lead</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight">
              Panel Pengaturan <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">Admin Studio</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300">
              Kelola project client, atur penugasan & honorarium crew fotografer, jadwalkan shooting, dan content planner.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenNewProject}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md shadow-blue-500/30 transition-all active:scale-95"
            >
              <Plus size={16} /> + Project Foto Baru
            </button>

            <button
              onClick={logoutAdmin}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all border border-white/10"
            >
              <LogOut size={14} /> Keluar Panel
            </button>
          </div>
        </div>
      </div>

      {/* Internal Admin Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-3d-sm">
        <button
          onClick={() => setActiveAdminTab('projects')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeAdminTab === 'projects'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <Folder size={15} /> Pengaturan Project Client ({projects.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('team')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeAdminTab === 'team'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <Users size={15} /> Menentukan Fotografer & Honorarium ({photographers.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('sosmed')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeAdminTab === 'sosmed'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <Share2 size={15} /> Marketing & Sosmed ({socialPosts.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('campaigns')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeAdminTab === 'campaigns'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <Hash size={15} /> Promo & Campaign
        </button>
      </div>

      {/* --- TAB 1: PENGATURAN PROJECT CLIENT --- */}
      {activeAdminTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
                <Folder size={20} className="text-blue-600" /> Pengaturan Project Client
              </h2>
              <p className="text-xs text-slate-500">Kelola detail project, status pengerjaan, dan link drive hasil foto</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[200px]">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari client / project..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={projectFilterStatus}
                onChange={(e) => setProjectFilterStatus(e.target.value)}
                className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
              >
                <option value="ALL">Semua Status</option>
                {KANBAN_STAGES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredProjects.map((proj) => (
              <div key={proj.id} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-3d-card space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-slate-900 text-white text-xs font-mono font-bold rounded-xl">
                      {proj.projectCode}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 font-serif">{proj.clientName}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={proj.status}
                      onChange={(e) => updateProjectStatus(proj.id, e.target.value)}
                      className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-mono font-bold rounded-full focus:outline-none cursor-pointer"
                    >
                      {KANBAN_STAGES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>

                    <button
                      onClick={() => handleEditProject(proj)}
                      className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                      title="Edit Project"
                    >
                      <Edit3 size={15} />
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Hapus project ${proj.clientName}?`)) {
                          deleteProject(proj.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                      title="Hapus Project"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-400 font-mono text-[10px] uppercase font-bold block">Detail Event</span>
                    <span className="font-bold text-slate-900 block">{proj.eventType}</span>
                    <span className="text-slate-500 block">📅 {proj.eventDate} ({proj.eventTime})</span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-mono text-[10px] uppercase font-bold block">Lokasi & Nilai</span>
                    <span className="font-semibold text-slate-800 block">{proj.location}</span>
                    <span className="font-mono font-bold text-emerald-600 block">
                      Total: Rp {Number(proj.totalAmount || 0).toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-mono text-[10px] uppercase font-bold block">Fotografer Assigned</span>
                    <span className="font-bold text-blue-700 block">
                      {proj.assignedCrew?.map((c) => c.name).join(', ') || 'Belum Ditentukan'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 2: MENENTUKAN FOTOGRAFER & HONORARIUM --- */}
      {activeAdminTab === 'team' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
                <Users size={20} className="text-blue-600" /> Penugasan Fotografer & Honorarium Crew
              </h2>
              <p className="text-xs text-slate-500">Tentukan tim fotografer per project dan kelola status pembayaran fee crew</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {photographers.map((fg) => (
              <div key={fg.id} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-3d-card space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={fg.avatar} alt={fg.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-200" />
                    <div>
                      <h4 className="font-bold text-base text-slate-900 font-serif">{fg.name}</h4>
                      <span className="text-xs text-slate-500 font-medium block">{fg.specialty}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleFgAvailability(fg.id)}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                      fg.availability?.length > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {fg.availability?.length > 0 ? '🟢 Active' : '🔴 Off'}
                  </button>
                </div>

                <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-2xl">
                  <div className="font-semibold text-slate-800">Gear Spec: {fg.gear}</div>
                  <div className="text-slate-500">Contact: {fg.phone} | {fg.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 3: MARKETING & SOSMED --- */}
      {activeAdminTab === 'sosmed' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
              <Share2 size={20} className="text-purple-600" /> Content Planner Marketing
            </h2>
            <button
              onClick={handleOpenNewPost}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md"
            >
              <Plus size={15} /> + Tambah Konten
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-3d-card space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-purple-100 text-purple-700 text-[10px] font-mono font-bold rounded-lg uppercase">
                    {post.platform}
                  </span>
                  <select
                    value={post.status}
                    onChange={(e) => updatePostStatus(post.id, e.target.value)}
                    className="text-xs font-bold font-mono text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full focus:outline-none"
                  >
                    <option value="Idea">Idea</option>
                    <option value="Drafting">Drafting</option>
                    <option value="Assets Ready">Assets Ready</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Published">Published</option>
                  </select>
                </div>

                <h4 className="font-bold text-sm text-slate-900">{post.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2">{post.caption}</p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                  <span>📅 Scheduled: {post.scheduledDate}</span>
                  <button
                    onClick={() => deleteSocialPost(post.id)}
                    className="text-rose-600 hover:underline font-bold"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 4: PROMO & CAMPAIGNS --- */}
      {activeAdminTab === 'campaigns' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
            <Hash size={20} className="text-indigo-600" /> Promo & Campaign Marketing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inline Add Campaign */}
            <form onSubmit={handleAddCampaignSubmit} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-3d-card space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Buat Kode Promo Baru</h3>
              <input
                type="text"
                placeholder="Nama Promo (e.g. Diskon Wisuda USU)"
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                required
              />
              <input
                type="text"
                placeholder="Kode Promo (e.g. WISUDAUSU10)"
                value={newCampaign.code}
                onChange={(e) => setNewCampaign({ ...newCampaign, code: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold"
                required
              />
              <input
                type="text"
                placeholder="Nilai Diskon (e.g. 10% Off atau Bonus Teaser Video)"
                value={newCampaign.discount}
                onChange={(e) => setNewCampaign({ ...newCampaign, discount: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold"
              >
                + Simpan Promo Campaign
              </button>
            </form>

            {/* Campaign List */}
            <div className="space-y-3">
              {marketingCampaigns.map((camp) => (
                <div key={camp.id} className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-3d-sm flex items-center justify-between">
                  <div>
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 font-mono font-bold text-xs rounded-md">
                      {camp.code}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 mt-1">{camp.name}</h4>
                    <span className="text-[10px] text-slate-500 block">{camp.discount}</span>
                  </div>

                  <button
                    onClick={() => deleteMarketingCampaign(camp.id)}
                    className="p-1 text-rose-600 hover:bg-rose-50 rounded-lg"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        project={selectedProject}
      />

      <ContentPlannerModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        post={selectedPost}
      />

      <TeamMemberModal
        isOpen={isMemberModalOpen}
        onClose={() => setIsMemberModalOpen(false)}
        member={selectedMember}
      />
    </div>
  );
}
