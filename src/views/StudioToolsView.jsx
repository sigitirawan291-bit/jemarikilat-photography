import React, { useState } from 'react';
import { 
  Folder, Calendar, Users, Share2, DollarSign, Plus, Search, Filter, 
  CheckCircle2, Clock, AlertCircle, Link as LinkIcon, ExternalLink, 
  Trash2, Edit3, Eye, FileText, ChevronRight, Hash, ArrowUpRight, 
  Sparkles, Layers, ShieldCheck, Download, RefreshCw
} from 'lucide-react';
import { useData } from '../context/DataContext';

import ProjectModal from '../components/studio/ProjectModal';
import ContentPlannerModal from '../components/studio/ContentPlannerModal';
import TeamMemberModal from '../components/studio/TeamMemberModal';

export default function StudioToolsView({ setActivePage }) {
  const { 
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

  const [activeTab, setActiveTab] = useState('overview'); // overview, projects, team, sosmed, campaigns
  const [projectFilterStatus, setProjectFilterStatus] = useState('ALL');
  const [projectSearch, setProjectSearch] = useState('');
  
  // Modals state
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const [selectedPost, setSelectedPost] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const [selectedMember, setSelectedMember] = useState(null);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  // New Campaign Form Inline
  const [newCampaign, setNewCampaign] = useState({ name: '', code: '', discount: '', targetAudience: '' });
  const [newHashtagGroup, setNewHashtagGroup] = useState({ title: '', hashtags: '' });

  // Calculation Metrics
  const totalRevenue = projects.reduce((acc, p) => acc + (Number(p.totalAmount) || 0), 0);
  const totalPaid = projects.reduce((acc, p) => acc + (Number(p.paidAmount) || 0), 0);
  const totalPendingBalance = totalRevenue - totalPaid;

  const activeProjectsCount = projects.filter(p => p.status !== 'Completed').length;
  const scheduledPostsCount = socialPosts.filter(s => s.status === 'Scheduled' || s.status === 'Assets Ready').length;

  const filteredProjects = projects.filter(p => {
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

  const POST_STAGES = ['Idea', 'Drafting', 'Assets Ready', 'Scheduled', 'Published'];

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

  const handleOpenNewMember = () => {
    setSelectedMember(null);
    setIsMemberModalOpen(true);
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setIsMemberModalOpen(true);
  };

  const handleAddCampaignSubmit = (e) => {
    e.preventDefault();
    if (!newCampaign.name) return;
    addMarketingCampaign(newCampaign);
    setNewCampaign({ name: '', code: '', discount: '', targetAudience: '' });
  };

  const handleAddHashtagSubmit = (e) => {
    e.preventDefault();
    if (!newHashtagGroup.title) return;
    addHashtagGroup(newHashtagGroup);
    setNewHashtagGroup({ title: '', hashtags: '' });
  };

  return (
    <div className="min-h-screen bg-background text-on-surface pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 font-sans">
      
      {/* Header Banner */}
      <div className="bg-surface-container-high border border-outline-variant/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 text-[10px] uppercase font-mono font-bold tracking-widest rounded-full flex items-center gap-1.5">
                <Sparkles size={12} /> Studio All-In-One Hub
              </span>
              <span className="text-xs text-on-surface-variant font-mono">v2.5 • Medan, Indonesia</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-on-surface tracking-tight">
              Jemari Kilat <span className="text-primary font-light italic">Studio & Marketing Tools</span>
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
              Kelola seluruh siklus project fotografi, tim crew & honorarium, hingga jadwal postingan digital marketing sosial media dalam satu dashboard interaktif.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActivePage('home')}
              className="px-4 py-2.5 bg-surface-container border border-outline-variant/40 hover:bg-surface text-on-surface rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm"
            >
              <ExternalLink size={14} /> Lihat Website Client
            </button>
            <button
              onClick={handleOpenNewProject}
              className="px-5 py-2.5 bg-primary text-on-primary hover:bg-outline rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg hover:shadow-primary/20"
            >
              <Plus size={16} /> + Project Foto Baru
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-outline-variant/20">
          <div className="bg-surface/50 p-4 rounded-xl border border-outline-variant/20">
            <div className="flex items-center justify-between text-xs text-on-surface-variant font-medium">
              <span>Active Projects</span>
              <Folder size={16} className="text-primary" />
            </div>
            <div className="text-2xl font-bold font-mono text-on-surface mt-1">{activeProjectsCount}</div>
            <div className="text-[10px] text-on-surface-variant mt-1">Dalam proses pengerjaan</div>
          </div>

          <div className="bg-surface/50 p-4 rounded-xl border border-outline-variant/20">
            <div className="flex items-center justify-between text-xs text-on-surface-variant font-medium">
              <span>Total Omset Project</span>
              <DollarSign size={16} className="text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mt-1">
              Rp {(totalRevenue / 1000000).toFixed(1)}M
            </div>
            <div className="text-[10px] text-on-surface-variant mt-1">DP: Rp {(totalPaid / 1000000).toFixed(1)}M</div>
          </div>

          <div className="bg-surface/50 p-4 rounded-xl border border-outline-variant/20">
            <div className="flex items-center justify-between text-xs text-on-surface-variant font-medium">
              <span>Tim Crew Aktif</span>
              <Users size={16} className="text-cyan-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-on-surface mt-1">{photographers.length} Member</div>
            <div className="text-[10px] text-on-surface-variant mt-1">Photographer & Editor</div>
          </div>

          <div className="bg-surface/50 p-4 rounded-xl border border-outline-variant/20">
            <div className="flex items-center justify-between text-xs text-on-surface-variant font-medium">
              <span>Scheduled Posts</span>
              <Share2 size={16} className="text-purple-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-purple-400 mt-1">{scheduledPostsCount} Post</div>
            <div className="text-[10px] text-on-surface-variant mt-1">Sosmed marketing pipeline</div>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-outline-variant/20 pb-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-primary text-on-primary shadow-md'
              : 'bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <Layers size={15} /> Overview Dashboard
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'projects'
              ? 'bg-primary text-on-primary shadow-md'
              : 'bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <Folder size={15} /> Kelola Project Photography ({projects.length})
        </button>

        <button
          onClick={() => setActiveTab('team')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'team'
              ? 'bg-primary text-on-primary shadow-md'
              : 'bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <Users size={15} /> Kelola Tim & Honorarium ({photographers.length})
        </button>

        <button
          onClick={() => setActiveTab('sosmed')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'sosmed'
              ? 'bg-primary text-on-primary shadow-md'
              : 'bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <Share2 size={15} /> Digital Marketing & Sosmed ({socialPosts.length})
        </button>

        <button
          onClick={() => setActiveTab('campaigns')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'campaigns'
              ? 'bg-primary text-on-primary shadow-md'
              : 'bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <Hash size={15} /> Marketing Campaigns & Promo
        </button>
      </div>

      {/* TAB 1: OVERVIEW DASHBOARD */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Upcoming Shoots Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-serif font-bold text-on-surface flex items-center gap-2">
                  <Calendar size={18} className="text-primary" /> Upcoming Shooting Schedule
                </h3>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
                >
                  Lihat Semua Project <ChevronRight size={14} />
                </button>
              </div>

              <div className="space-y-3">
                {projects.slice(0, 4).map(proj => (
                  <div 
                    key={proj.id}
                    onClick={() => handleEditProject(proj)}
                    className="bg-surface-container-high border border-outline-variant/20 hover:border-primary/40 rounded-xl p-4 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded font-bold">
                          {proj.projectCode}
                        </span>
                        <span className="text-xs font-bold text-on-surface">{proj.clientName}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant flex items-center gap-3">
                        <span>📅 {proj.eventDate} ({proj.eventTime})</span>
                        <span>📍 {proj.location || 'Medan Studio'}</span>
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-on-surface-variant pt-1">
                        <span className="px-2 py-0.5 bg-surface rounded border border-outline-variant/20">
                          {proj.packageName || proj.eventType}
                        </span>
                        <span>• Crew Assigned: {proj.assignedCrew?.length || 0} orang</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-1">
                      <span className={`px-2.5 py-1 rounded text-[10px] uppercase tracking-wider font-bold text-center ${
                        proj.status === 'Completed' || proj.status === 'Final Delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                        proj.status === 'Editing' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {proj.status}
                      </span>
                      <span className="font-mono text-xs font-bold text-on-surface">
                        Rp {Number(proj.totalAmount || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Planner Quick Widget */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-serif font-bold text-on-surface flex items-center gap-2">
                  <Share2 size={18} className="text-purple-400" /> Content Schedule Preview
                </h3>
                <button
                  onClick={handleOpenNewPost}
                  className="px-2.5 py-1 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 rounded text-xs font-bold"
                >
                  + Post Baru
                </button>
              </div>

              <div className="space-y-3 bg-surface-container-high border border-outline-variant/20 rounded-xl p-4">
                {socialPosts.slice(0, 3).map(post => (
                  <div key={post.id} className="p-3 bg-surface rounded-lg border border-outline-variant/20 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-primary font-mono">{post.platform}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-purple-500/10 text-purple-300 rounded font-bold">
                        {post.status}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-on-surface line-clamp-2">{post.title}</p>
                    <div className="flex items-center justify-between text-[10px] text-on-surface-variant pt-1 border-t border-outline-variant/10">
                      <span>📆 {post.scheduledDate} ({post.scheduledTime})</span>
                      <span>{post.postType}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: PROJECTS KANBAN & MANAGEMENT */}
      {activeTab === 'projects' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container-high p-4 rounded-xl border border-outline-variant/20">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input
                  type="text"
                  placeholder="Cari nama klien, kode, lokasi..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <select
                value={projectFilterStatus}
                onChange={(e) => setProjectFilterStatus(e.target.value)}
                className="px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-xs font-medium focus:outline-none focus:border-primary"
              >
                <option value="ALL">Semua Status (Kanban)</option>
                {KANBAN_STAGES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleOpenNewProject}
              className="px-4 py-2 bg-primary text-on-primary rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-outline transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Plus size={16} /> Tambah Project Baru
            </button>
          </div>

          {/* Kanban Columns View */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-4">
            {KANBAN_STAGES.map(stage => {
              const stageProjects = filteredProjects.filter(p => p.status === stage);

              return (
                <div key={stage} className="bg-surface-container-high/60 border border-outline-variant/20 rounded-xl p-4 flex flex-col min-w-[260px] space-y-3">
                  <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary font-mono">
                      {stage}
                    </h4>
                    <span className="px-2 py-0.5 bg-surface text-on-surface-variant text-[10px] font-bold rounded-full border border-outline-variant/30">
                      {stageProjects.length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1">
                    {stageProjects.map(proj => (
                      <div
                        key={proj.id}
                        className="bg-surface border border-outline-variant/30 hover:border-primary/50 rounded-xl p-3.5 space-y-3 transition-all shadow-sm hover:shadow-md group"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded font-bold">
                              {proj.projectCode}
                            </span>
                            <h5 className="font-bold text-sm text-on-surface mt-1.5 group-hover:text-primary transition-colors">
                              {proj.clientName}
                            </h5>
                          </div>
                          <button
                            onClick={() => handleEditProject(proj)}
                            className="p-1 hover:bg-surface-container rounded text-on-surface-variant hover:text-on-surface"
                          >
                            <Edit3 size={14} />
                          </button>
                        </div>

                        <div className="text-xs text-on-surface-variant space-y-1">
                          <p>📷 {proj.packageName || proj.eventType}</p>
                          <p>🗓️ {proj.eventDate} ({proj.eventTime || '09:00'})</p>
                          <p className="truncate">📍 {proj.location || 'Medan'}</p>
                        </div>

                        {/* Drive Links Badge */}
                        {(proj.rawDriveUrl || proj.finalDriveUrl) && (
                          <div className="flex items-center gap-2 pt-1 border-t border-outline-variant/10 text-[10px]">
                            {proj.rawDriveUrl && (
                              <a
                                href={proj.rawDriveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-2 py-0.5 bg-blue-500/10 text-blue-400 hover:underline rounded flex items-center gap-1 font-mono"
                              >
                                <Folder size={10} /> RAW Drive
                              </a>
                            )}
                            {proj.finalDriveUrl && (
                              <a
                                href={proj.finalDriveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 hover:underline rounded flex items-center gap-1 font-mono"
                              >
                                <LinkIcon size={10} /> Final Drive
                              </a>
                            )}
                          </div>
                        )}

                        {/* Footer Status Switcher */}
                        <div className="flex items-center justify-between pt-2 border-t border-outline-variant/15 text-xs">
                          <span className="font-mono text-xs font-bold text-emerald-400">
                            Rp {Number(proj.totalAmount || 0).toLocaleString()}
                          </span>
                          
                          <select
                            value={proj.status}
                            onChange={(e) => updateProjectStatus(proj.id, e.target.value)}
                            className="px-2 py-1 bg-surface-container border border-outline-variant/40 rounded text-[10px] font-bold text-on-surface"
                          >
                            {KANBAN_STAGES.map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}

                    {stageProjects.length === 0 && (
                      <div className="text-center py-6 border border-dashed border-outline-variant/30 rounded-xl text-xs text-on-surface-variant">
                        Kosong
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* TAB 3: TEAM OPERATIONS & PAYOUTS */}
      {activeTab === 'team' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-serif font-bold text-on-surface">Direktori Tim & Scheduling Crew</h3>
              <p className="text-xs text-on-surface-variant">Atur tim fotografer, videografer, editor, dan lacak honorarium per project.</p>
            </div>
            <button
              onClick={handleOpenNewMember}
              className="px-4 py-2 bg-primary text-on-primary rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-outline transition-colors flex items-center gap-2"
            >
              <Plus size={16} /> Tambah Member Crew
            </button>
          </div>

          {/* Roster Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photographers.map(fg => {
              // Calculate total fee earned by this crew across all projects
              let totalEarnings = 0;
              let pendingEarnings = 0;

              projects.forEach(p => {
                (p.assignedCrew || []).forEach(c => {
                  if (c.id === fg.id) {
                    const feeVal = Number(c.fee) || 0;
                    totalEarnings += feeVal;
                    if (c.payoutStatus !== 'Paid') {
                      pendingEarnings += feeVal;
                    }
                  }
                });
              });

              return (
                <div key={fg.id} className="bg-surface-container-high border border-outline-variant/30 rounded-2xl p-6 space-y-4 shadow-lg hover:border-primary/40 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={fg.avatar}
                        alt={fg.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
                      />
                      <div>
                        <h4 className="font-bold text-base text-on-surface">{fg.name}</h4>
                        <p className="text-xs text-primary font-medium">{fg.specialty}</p>
                        <p className="text-[10px] font-mono text-on-surface-variant">ID: {fg.id} • Username: @{fg.username}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleEditMember(fg)}
                      className="p-1.5 hover:bg-surface rounded text-on-surface-variant hover:text-on-surface"
                    >
                      <Edit3 size={16} />
                    </button>
                  </div>

                  <div className="text-xs text-on-surface-variant space-y-1.5 bg-surface p-3 rounded-xl border border-outline-variant/20">
                    <p className="flex items-center gap-2">📞 <span>{fg.phone}</span></p>
                    <p className="flex items-center gap-2">📷 <span>{fg.gear || 'Sony A7 IV'}</span></p>
                  </div>

                  {/* Earnings & Payout Summary */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-outline-variant/20 text-xs">
                    <div className="bg-surface p-2.5 rounded-lg border border-outline-variant/20">
                      <span className="text-[10px] text-on-surface-variant block">Total Honor</span>
                      <span className="font-mono font-bold text-on-surface">Rp {totalEarnings.toLocaleString()}</span>
                    </div>
                    <div className="bg-surface p-2.5 rounded-lg border border-outline-variant/20">
                      <span className="text-[10px] text-on-surface-variant block">Pending Payout</span>
                      <span className="font-mono font-bold text-amber-400">Rp {pendingEarnings.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Assigned Jobs & Payout Action */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">Job Assignments:</span>
                    {projects.filter(p => (p.assignedCrew || []).some(c => c.id === fg.id)).map(p => {
                      const crewObj = p.assignedCrew.find(c => c.id === fg.id);
                      return (
                        <div key={p.id} className="flex items-center justify-between p-2 bg-surface rounded text-xs">
                          <div>
                            <span className="font-bold text-on-surface">{p.clientName}</span>
                            <span className="ml-1 text-[10px] text-on-surface-variant">({p.eventDate})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-primary font-bold text-[10px]">Rp {Number(crewObj?.fee || 0).toLocaleString()}</span>
                            <button
                              onClick={() => updateProjectCrewPayout(p.id, fg.id, crewObj?.payoutStatus === 'Paid' ? 'Unpaid' : 'Paid')}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                crewObj?.payoutStatus === 'Paid' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                              }`}
                            >
                              {crewObj?.payoutStatus || 'Unpaid'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* TAB 4: DIGITAL MARKETING & SOSMED CONTENT PLANNER */}
      {activeTab === 'sosmed' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-serif font-bold text-on-surface">Digital Marketing & Social Media Planner</h3>
              <p className="text-xs text-on-surface-variant">Rencanakan konten Instagram Reels, TikTok, Carousel, dan kelola hashtag preseting studio.</p>
            </div>
            <button
              onClick={handleOpenNewPost}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Plus size={16} /> + Buat Post Content
            </button>
          </div>

          {/* Social Pipeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
            {POST_STAGES.map(stage => {
              const stagePosts = socialPosts.filter(s => s.status === stage);

              return (
                <div key={stage} className="bg-surface-container-high/60 border border-outline-variant/20 rounded-xl p-4 flex flex-col min-w-[240px] space-y-3">
                  <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">
                      {stage}
                    </h4>
                    <span className="px-2 py-0.5 bg-surface text-on-surface-variant text-[10px] font-bold rounded-full border border-outline-variant/30">
                      {stagePosts.length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1">
                    {stagePosts.map(post => (
                      <div key={post.id} className="bg-surface border border-outline-variant/30 rounded-xl p-3.5 space-y-3 shadow-sm hover:border-purple-400/50 transition-all">
                        {post.mediaUrl && (
                          <img
                            src={post.mediaUrl}
                            alt={post.title}
                            className="w-full h-28 object-cover rounded-lg border border-outline-variant/20"
                          />
                        )}
                        <div>
                          <span className="text-[10px] font-bold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded font-mono">
                            {post.platform} • {post.postType}
                          </span>
                          <h5 className="font-bold text-xs text-on-surface mt-1.5 line-clamp-2">
                            {post.title}
                          </h5>
                        </div>

                        <p className="text-[10px] text-on-surface-variant line-clamp-2 font-sans italic">
                          "{post.caption}"
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-outline-variant/15 text-[10px]">
                          <span className="text-on-surface-variant">📆 {post.scheduledDate}</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleEditPost(post)}
                              className="p-1 hover:bg-surface-container rounded text-on-surface-variant"
                            >
                              <Edit3 size={13} />
                            </button>
                            <select
                              value={post.status}
                              onChange={(e) => updatePostStatus(post.id, e.target.value)}
                              className="px-2 py-0.5 bg-surface-container border border-outline-variant/40 rounded text-[10px] font-bold text-purple-300"
                            >
                              {POST_STAGES.map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}

                    {stagePosts.length === 0 && (
                      <div className="text-center py-6 border border-dashed border-outline-variant/30 rounded-xl text-xs text-on-surface-variant">
                        Belum ada post
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hashtag Groups Manager */}
          <div className="bg-surface-container-high border border-outline-variant/30 rounded-2xl p-6 space-y-6">
            <h4 className="text-lg font-serif font-bold text-on-surface flex items-center gap-2">
              <Hash size={18} className="text-primary" /> Hashtag Library & Preset
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {hashtagGroups.map(h => (
                <div key={h.id} className="bg-surface p-4 rounded-xl border border-outline-variant/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-xs text-primary">{h.title}</h5>
                    <button
                      onClick={() => deleteHashtagGroup(h.id)}
                      className="text-red-400 hover:text-red-300 text-xs"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-xs font-mono text-on-surface-variant leading-relaxed break-words">{h.hashtags}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddHashtagSubmit} className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-outline-variant/20">
              <input
                type="text"
                required
                placeholder="Judul Group Hashtag Baru (e.g. Prewedding Outdoor)"
                value={newHashtagGroup.title}
                onChange={(e) => setNewHashtagGroup({ ...newHashtagGroup, title: e.target.value })}
                className="px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-xs focus:outline-none focus:border-primary flex-1"
              />
              <input
                type="text"
                required
                placeholder="#PreweddingMedan #FotoPrewed"
                value={newHashtagGroup.hashtags}
                onChange={(e) => setNewHashtagGroup({ ...newHashtagGroup, hashtags: e.target.value })}
                className="px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-xs font-mono focus:outline-none focus:border-primary flex-1"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-on-primary font-bold text-xs rounded-lg hover:bg-outline transition-colors"
              >
                + Simpan Group Hashtag
              </button>
            </form>
          </div>

        </div>
      )}

      {/* TAB 5: MARKETING CAMPAIGNS */}
      {activeTab === 'campaigns' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-serif font-bold text-on-surface">Marketing Campaigns & Promotional Passes</h3>
              <p className="text-xs text-on-surface-variant">Lacak campaign promosi, diskon musiman, dan leads konversi.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marketingCampaigns.map(camp => (
              <div key={camp.id} className="bg-surface-container-high border border-outline-variant/30 rounded-2xl p-6 space-y-4 shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold rounded uppercase">
                      {camp.status}
                    </span>
                    <h4 className="font-bold text-lg text-on-surface mt-2">{camp.name}</h4>
                  </div>
                  <button
                    onClick={() => deleteMarketingCampaign(camp.id)}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="bg-surface p-4 rounded-xl border border-outline-variant/20 space-y-2 text-xs">
                  <p className="flex justify-between">
                    <span className="text-on-surface-variant">Kode Voucher:</span>
                    <span className="font-mono font-bold text-primary">{camp.code}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-on-surface-variant">Diskon / Bonus:</span>
                    <span className="font-bold text-on-surface">{camp.discount}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-on-surface-variant">Periode Promo:</span>
                    <span>{camp.startDate} s/d {camp.endDate}</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-surface p-3 rounded-lg border border-outline-variant/20">
                    <span className="text-[10px] text-on-surface-variant block">Leads Converted</span>
                    <span className="font-mono text-lg font-bold text-emerald-400">{camp.leadsConverted} Klien</span>
                  </div>
                  <div className="bg-surface p-3 rounded-lg border border-outline-variant/20">
                    <span className="text-[10px] text-on-surface-variant block">Revenue Generated</span>
                    <span className="font-mono text-lg font-bold text-primary">Rp {Number(camp.totalRevenue || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Campaign Form */}
          <div className="bg-surface-container-high border border-outline-variant/30 rounded-2xl p-6 space-y-4">
            <h4 className="text-base font-bold text-on-surface">Buat Marketing Campaign Baru</h4>
            <form onSubmit={handleAddCampaignSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <input
                type="text"
                required
                placeholder="Nama Campaign (e.g. Promo Wisuda)"
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                className="px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-xs focus:outline-none focus:border-primary"
              />
              <input
                type="text"
                placeholder="Kode Promo (e.g. GRAD2026)"
                value={newCampaign.code}
                onChange={(e) => setNewCampaign({ ...newCampaign, code: e.target.value })}
                className="px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-xs font-mono focus:outline-none focus:border-primary"
              />
              <input
                type="text"
                placeholder="Benefit Diskon / Free Frame"
                value={newCampaign.discount}
                onChange={(e) => setNewCampaign({ ...newCampaign, discount: e.target.value })}
                className="px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-xs focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-on-primary font-bold text-xs rounded-lg hover:bg-outline transition-colors"
              >
                + Aktifkan Campaign
              </button>
            </form>
          </div>

        </div>
      )}

      {/* Render Modals */}
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
