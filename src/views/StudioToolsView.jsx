import React, { useState } from 'react';
import { 
  Folder, Calendar, Users, Share2, DollarSign, Plus, Search, Filter, 
  CheckCircle2, Clock, AlertCircle, Link as LinkIcon, ExternalLink, 
  Trash2, Edit3, Eye, FileText, ChevronRight, Hash, ArrowUpRight, 
  Sparkles, Layers, ShieldCheck, Download, RefreshCw, BarChart3, TrendingUp
} from 'lucide-react';
import { useData } from '../context/DataContext';

import ProjectModal from '../components/studio/ProjectModal';
import ContentPlannerModal from '../components/studio/ContentPlannerModal';
import TeamMemberModal from '../components/studio/TeamMemberModal';

export default function StudioToolsView() {
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

  // Inline forms
  const [newCampaign, setNewCampaign] = useState({ name: '', code: '', discount: '', targetAudience: '' });
  const [newHashtagGroup, setNewHashtagGroup] = useState({ title: '', hashtags: '' });

  // Metrics
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
    <div className="min-h-screen bg-slate-50/60 text-slate-900 pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 font-sans">
      
      {/* 3D Atmospheric Hero Banner Header */}
      <div className="relative bg-gradient-to-br from-white via-slate-50 to-blue-50/40 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-3d-card overflow-hidden">
        {/* Ambient 3D Glow Blobs */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-100/80 text-blue-700 border border-blue-200/80 text-[10px] font-mono font-bold uppercase tracking-widest rounded-full flex items-center gap-1.5 shadow-sm">
                <Sparkles size={12} /> Studio Management Suite
              </span>
              <span className="text-xs text-slate-500 font-mono font-medium">Medan, Indonesia</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900 tracking-tight">
              Jemari Kilat <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Studio Hub</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Platform terpadu untuk mengelola project photography, penugasan tim crew & honorarium, serta digital marketing content planner.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleOpenNewProject}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-blue-500/25 active:scale-95"
            >
              <Plus size={16} /> + Project Foto Baru
            </button>
          </div>
        </div>

        {/* 3D Elevated Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-200/60">
          
          <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-3d-sm hover:shadow-3d-card transition-all">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Active Projects</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Folder size={16} />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 mt-2">{activeProjectsCount}</div>
            <div className="text-[10px] text-slate-500 font-medium mt-1">Dalam proses pengerjaan</div>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-3d-sm hover:shadow-3d-card transition-all">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Total Revenue</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <DollarSign size={16} />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 mt-2">
              Rp {(totalRevenue / 1000000).toFixed(1)}M
            </div>
            <div className="text-[10px] text-slate-500 font-medium mt-1">Terbayar: Rp {(totalPaid / 1000000).toFixed(1)}M</div>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-3d-sm hover:shadow-3d-card transition-all">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Tim Crew Roster</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Users size={16} />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 mt-2">{photographers.length} Member</div>
            <div className="text-[10px] text-slate-500 font-medium mt-1">Photographer & Editor</div>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-3d-sm hover:shadow-3d-card transition-all">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Scheduled Posts</span>
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Share2 size={16} />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono text-purple-600 mt-2">{scheduledPostsCount} Post</div>
            <div className="text-[10px] text-slate-500 font-medium mt-1">Digital Marketing Pipeline</div>
          </div>

        </div>
      </div>

      {/* Main Tab Bar - Floating 3D Pill Navigation */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-3d-sm overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <Layers size={15} /> Overview Dashboard
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'projects'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <Folder size={15} /> Project Photography ({projects.length})
        </button>

        <button
          onClick={() => setActiveTab('team')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'team'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <Users size={15} /> Tim Crew & Honorarium ({photographers.length})
        </button>

        <button
          onClick={() => setActiveTab('sosmed')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'sosmed'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <Share2 size={15} /> Marketing & Sosmed ({socialPosts.length})
        </button>

        <button
          onClick={() => setActiveTab('campaigns')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'campaigns'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <Hash size={15} /> Marketing Campaigns
        </button>
      </div>

      {/* TAB 1: OVERVIEW DASHBOARD */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Upcoming Shoots */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Calendar size={18} className="text-blue-600" /> Upcoming Shooting Schedule
                </h3>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1"
                >
                  Lihat Semua Project <ChevronRight size={14} />
                </button>
              </div>

              <div className="space-y-3">
                {projects.slice(0, 4).map(proj => (
                  <div 
                    key={proj.id}
                    onClick={() => handleEditProject(proj)}
                    className="bg-white border border-slate-200/80 hover:border-blue-300 rounded-2xl p-4 transition-all cursor-pointer shadow-3d-sm hover:shadow-3d-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-bold border border-blue-200">
                          {proj.projectCode}
                        </span>
                        <span className="text-sm font-bold text-slate-900">{proj.clientName}</span>
                      </div>
                      <p className="text-xs text-slate-500 flex items-center gap-3">
                        <span>📅 {proj.eventDate} ({proj.eventTime})</span>
                        <span>📍 {proj.location || 'Medan Studio'}</span>
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 pt-1">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-medium">
                          {proj.packageName || proj.eventType}
                        </span>
                        <span>• Crew Assigned: {proj.assignedCrew?.length || 0} orang</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-1">
                      <span className={`px-2.5 py-1 rounded-xl text-[10px] uppercase tracking-wider font-bold text-center ${
                        proj.status === 'Completed' || proj.status === 'Final Delivered' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        proj.status === 'Editing' ? 'bg-cyan-50 text-cyan-700 border border-cyan-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {proj.status}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-900">
                        Rp {Number(proj.totalAmount || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Marketing Preview Widget */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Share2 size={18} className="text-purple-600" /> Sosmed Schedule Preview
                </h3>
                <button
                  onClick={handleOpenNewPost}
                  className="px-3 py-1 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-xl text-xs font-bold border border-purple-200"
                >
                  + Post Baru
                </button>
              </div>

              <div className="space-y-3 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-3d-sm">
                {socialPosts.slice(0, 3).map(post => (
                  <div key={post.id} className="p-3 bg-slate-50/70 rounded-xl border border-slate-200/60 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-blue-600 font-mono">{post.platform}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-bold">
                        {post.status}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 line-clamp-2">{post.title}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200/60">
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-3d-sm">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari nama klien, kode, lokasi..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <select
                value={projectFilterStatus}
                onChange={(e) => setProjectFilterStatus(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
              >
                <option value="ALL">Semua Status (Kanban)</option>
                {KANBAN_STAGES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleOpenNewProject}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Plus size={16} /> Tambah Project Baru
            </button>
          </div>

          {/* Kanban Columns View */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-4">
            {KANBAN_STAGES.map(stage => {
              const stageProjects = filteredProjects.filter(p => p.status === stage);

              return (
                <div key={stage} className="bg-slate-100/70 border border-slate-200/70 rounded-2xl p-4 flex flex-col min-w-[260px] space-y-3 shadow-3d-sm">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 font-mono">
                      {stage}
                    </h4>
                    <span className="px-2 py-0.5 bg-white text-slate-600 text-[10px] font-bold rounded-full border border-slate-200">
                      {stageProjects.length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1">
                    {stageProjects.map(proj => (
                      <div
                        key={proj.id}
                        className="bg-white border border-slate-200/80 hover:border-blue-400 rounded-2xl p-4 space-y-3 transition-all shadow-3d-sm hover:shadow-3d-hover group"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-bold border border-blue-200">
                              {proj.projectCode}
                            </span>
                            <h5 className="font-bold text-sm text-slate-900 mt-1.5 group-hover:text-blue-600 transition-colors">
                              {proj.clientName}
                            </h5>
                          </div>
                          <button
                            onClick={() => handleEditProject(proj)}
                            className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700"
                          >
                            <Edit3 size={14} />
                          </button>
                        </div>

                        <div className="text-xs text-slate-600 space-y-1">
                          <p>📷 {proj.packageName || proj.eventType}</p>
                          <p>🗓️ {proj.eventDate} ({proj.eventTime || '09:00'})</p>
                          <p className="truncate">📍 {proj.location || 'Medan'}</p>
                        </div>

                        {/* Drive Links Badge */}
                        {(proj.rawDriveUrl || proj.finalDriveUrl) && (
                          <div className="flex items-center gap-2 pt-1 border-t border-slate-100 text-[10px]">
                            {proj.rawDriveUrl && (
                              <a
                                href={proj.rawDriveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-200 hover:underline rounded-lg flex items-center gap-1 font-mono font-bold"
                              >
                                <Folder size={10} /> RAW Drive
                              </a>
                            )}
                            {proj.finalDriveUrl && (
                              <a
                                href={proj.finalDriveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-200 hover:underline rounded-lg flex items-center gap-1 font-mono font-bold"
                              >
                                <LinkIcon size={10} /> Final Drive
                              </a>
                            )}
                          </div>
                        )}

                        {/* Footer Status Switcher */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                          <span className="font-mono text-xs font-bold text-emerald-600">
                            Rp {Number(proj.totalAmount || 0).toLocaleString()}
                          </span>
                          
                          <select
                            value={proj.status}
                            onChange={(e) => updateProjectStatus(proj.id, e.target.value)}
                            className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-800 focus:outline-none"
                          >
                            {KANBAN_STAGES.map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}

                    {stageProjects.length === 0 && (
                      <div className="text-center py-6 border border-dashed border-slate-300 rounded-2xl text-xs text-slate-400">
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
              <h3 className="text-xl font-bold text-slate-900">Direktori Tim & Scheduling Crew</h3>
              <p className="text-xs text-slate-500">Atur tim fotografer, videografer, editor, dan lacak honorarium per project.</p>
            </div>
            <button
              onClick={handleOpenNewMember}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md shadow-blue-500/20"
            >
              <Plus size={16} /> Tambah Member Crew
            </button>
          </div>

          {/* Roster Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photographers.map(fg => {
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
                <div key={fg.id} className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-3d-card hover:shadow-3d-hover transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={fg.avatar}
                        alt={fg.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-blue-500/30"
                      />
                      <div>
                        <h4 className="font-bold text-base text-slate-900">{fg.name}</h4>
                        <p className="text-xs text-blue-600 font-semibold">{fg.specialty}</p>
                        <p className="text-[10px] font-mono text-slate-400">ID: {fg.id} • Username: @{fg.username}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleEditMember(fg)}
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700"
                    >
                      <Edit3 size={16} />
                    </button>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
                    <p className="flex items-center gap-2">📞 <span>{fg.phone}</span></p>
                    <p className="flex items-center gap-2">📷 <span>{fg.gear || 'Sony A7 IV'}</span></p>
                  </div>

                  {/* Summary */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
                      <span className="text-[10px] text-slate-500 block font-medium">Total Honor</span>
                      <span className="font-mono font-bold text-slate-900">Rp {totalEarnings.toLocaleString()}</span>
                    </div>
                    <div className="bg-amber-50/80 p-3 rounded-2xl border border-amber-200">
                      <span className="text-[10px] text-amber-700 block font-semibold">Pending Payout</span>
                      <span className="font-mono font-bold text-amber-700">Rp {pendingEarnings.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Assigned Jobs & Payout Action */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Job Assignments:</span>
                    {projects.filter(p => (p.assignedCrew || []).some(c => c.id === fg.id)).map(p => {
                      const crewObj = p.assignedCrew.find(c => c.id === fg.id);
                      return (
                        <div key={p.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl text-xs border border-slate-200/60">
                          <div>
                            <span className="font-bold text-slate-900">{p.clientName}</span>
                            <span className="ml-1 text-[10px] text-slate-500">({p.eventDate})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-blue-600 font-bold text-[10px]">Rp {Number(crewObj?.fee || 0).toLocaleString()}</span>
                            <button
                              onClick={() => updateProjectCrewPayout(p.id, fg.id, crewObj?.payoutStatus === 'Paid' ? 'Unpaid' : 'Paid')}
                              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                                crewObj?.payoutStatus === 'Paid' ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' : 'bg-amber-100 text-amber-700 border border-amber-300'
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
              <h3 className="text-xl font-bold text-slate-900">Digital Marketing & Social Media Planner</h3>
              <p className="text-xs text-slate-500">Rencanakan konten Instagram Reels, TikTok, Carousel, dan kelola hashtag preseting studio.</p>
            </div>
            <button
              onClick={handleOpenNewPost}
              className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-purple-700 transition-colors flex items-center gap-2 shadow-md shadow-purple-500/20"
            >
              <Plus size={16} /> + Buat Post Content
            </button>
          </div>

          {/* Social Pipeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
            {POST_STAGES.map(stage => {
              const stagePosts = socialPosts.filter(s => s.status === stage);

              return (
                <div key={stage} className="bg-slate-100/70 border border-slate-200/70 rounded-2xl p-4 flex flex-col min-w-[240px] space-y-3 shadow-3d-sm">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700 font-mono">
                      {stage}
                    </h4>
                    <span className="px-2 py-0.5 bg-white text-slate-600 text-[10px] font-bold rounded-full border border-slate-200">
                      {stagePosts.length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1">
                    {stagePosts.map(post => (
                      <div key={post.id} className="bg-white border border-slate-200/80 rounded-2xl p-3.5 space-y-3 shadow-3d-sm hover:shadow-3d-hover transition-all">
                        {post.mediaUrl && (
                          <img
                            src={post.mediaUrl}
                            alt={post.title}
                            className="w-full h-28 object-cover rounded-xl border border-slate-200"
                          />
                        )}
                        <div>
                          <span className="text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded font-mono">
                            {post.platform} • {post.postType}
                          </span>
                          <h5 className="font-bold text-xs text-slate-900 mt-1.5 line-clamp-2">
                            {post.title}
                          </h5>
                        </div>

                        <p className="text-[10px] text-slate-500 line-clamp-2 italic">
                          "{post.caption}"
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px]">
                          <span className="text-slate-500 font-medium">📆 {post.scheduledDate}</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleEditPost(post)}
                              className="p-1 hover:bg-slate-100 rounded text-slate-400"
                            >
                              <Edit3 size={13} />
                            </button>
                            <select
                              value={post.status}
                              onChange={(e) => updatePostStatus(post.id, e.target.value)}
                              className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-[10px] font-bold text-purple-700"
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
                      <div className="text-center py-6 border border-dashed border-slate-300 rounded-2xl text-xs text-slate-400">
                        Belum ada post
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hashtag Groups Manager */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-6 shadow-3d-card">
            <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Hash size={18} className="text-blue-600" /> Hashtag Library & Preset Manager
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {hashtagGroups.map(h => (
                <div key={h.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-xs text-blue-700">{h.title}</h5>
                    <button
                      onClick={() => deleteHashtagGroup(h.id)}
                      className="text-red-500 hover:text-red-600 text-xs"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-xs font-mono text-slate-600 leading-relaxed break-words">{h.hashtags}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddHashtagSubmit} className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
              <input
                type="text"
                required
                placeholder="Judul Group Hashtag Baru (e.g. Prewedding Outdoor)"
                value={newHashtagGroup.title}
                onChange={(e) => setNewHashtagGroup({ ...newHashtagGroup, title: e.target.value })}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 flex-1"
              />
              <input
                type="text"
                required
                placeholder="#PreweddingMedan #FotoPrewed"
                value={newHashtagGroup.hashtags}
                onChange={(e) => setNewHashtagGroup({ ...newHashtagGroup, hashtags: e.target.value })}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600 flex-1"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              >
                + Simpan Preset
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
              <h3 className="text-xl font-bold text-slate-900">Marketing Campaigns & Promotional Passes</h3>
              <p className="text-xs text-slate-500">Lacak campaign promosi, diskon musiman, dan leads konversi.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marketingCampaigns.map(camp => (
              <div key={camp.id} className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-3d-card">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 border border-emerald-300 text-[10px] font-mono font-bold rounded uppercase">
                      {camp.status}
                    </span>
                    <h4 className="font-bold text-lg text-slate-900 mt-2">{camp.name}</h4>
                  </div>
                  <button
                    onClick={() => deleteMarketingCampaign(camp.id)}
                    className="text-red-400 hover:text-red-600 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 space-y-2 text-xs">
                  <p className="flex justify-between">
                    <span className="text-slate-500">Kode Voucher:</span>
                    <span className="font-mono font-bold text-blue-600">{camp.code}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-500">Diskon / Bonus:</span>
                    <span className="font-bold text-slate-900">{camp.discount}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-500">Periode Promo:</span>
                    <span>{camp.startDate} s/d {camp.endDate}</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
                    <span className="text-[10px] text-slate-500 block font-medium">Leads Converted</span>
                    <span className="font-mono text-lg font-bold text-emerald-600">{camp.leadsConverted} Klien</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
                    <span className="text-[10px] text-slate-500 block font-medium">Revenue Generated</span>
                    <span className="font-mono text-lg font-bold text-blue-600">Rp {Number(camp.totalRevenue || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Campaign Form */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-3d-card">
            <h4 className="text-base font-bold text-slate-900">Buat Marketing Campaign Baru</h4>
            <form onSubmit={handleAddCampaignSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <input
                type="text"
                required
                placeholder="Nama Campaign (e.g. Promo Wisuda)"
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
              <input
                type="text"
                placeholder="Kode Promo (e.g. GRAD2026)"
                value={newCampaign.code}
                onChange={(e) => setNewCampaign({ ...newCampaign, code: e.target.value })}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600"
              />
              <input
                type="text"
                placeholder="Benefit Diskon / Free Frame"
                value={newCampaign.discount}
                onChange={(e) => setNewCampaign({ ...newCampaign, discount: e.target.value })}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
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
