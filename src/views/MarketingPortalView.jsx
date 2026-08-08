import React, { useState } from 'react';
import { 
  Megaphone, Calendar, Sparkles, TrendingUp, Hash, Tag, Plus, Trash2, Edit3, 
  ExternalLink, LogOut, CheckCircle2, Lock, Share2, Eye, ThumbsUp, MessageSquare, 
  Copy, Layers, ArrowUpRight, BarChart2, DollarSign, Target, Award, ShieldCheck
} from 'lucide-react';
import { useData } from '../context/DataContext';
import MarketingLoginModal from '../components/studio/MarketingLoginModal';
import EditProfileModal from '../components/studio/EditProfileModal';

export default function MarketingPortalView() {
  const { 
    currentMarketingMember, 
    isMarketingLoggedIn, 
    logoutMarketing,
    socialPosts = [],
    addSocialPost,
    updatePostStatus,
    deleteSocialPost,
    marketingCampaigns = [],
    addMarketingCampaign,
    deleteMarketingCampaign,
    hashtagGroups = [],
    addHashtagGroup,
    deleteHashtagGroup
  } = useData();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('planner'); // planner, campaigns, hashtags, analytics

  // Modal states for creating new items
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
  const [isAddCampaignModalOpen, setIsAddCampaignModalOpen] = useState(false);
  const [isAddHashtagModalOpen, setIsAddHashtagModalOpen] = useState(false);

  // Form states
  const [newPost, setNewPost] = useState({
    title: '',
    platform: 'Instagram',
    postType: 'Reel / Short Video',
    scheduledDate: new Date().toISOString().split('T')[0],
    scheduledTime: '19:00',
    caption: '',
    hashtags: '#JemariKilat #FotograferMedan',
    mediaUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200'
  });

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    code: '',
    discount: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    targetAudience: 'Mahasiswa Akhir & Calon Pengantin Medan',
    status: 'Active'
  });

  const [newHashtagGroup, setNewHashtagGroup] = useState({
    title: '',
    hashtags: ''
  });

  const [copySuccess, setCopySuccess] = useState('');

  // If not logged in, render authentication wall prompt
  if (!isMarketingLoggedIn || !currentMarketingMember) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 max-w-lg shadow-2xl space-y-6 relative overflow-hidden">
          <div className="w-20 h-20 rounded-3xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center mx-auto shadow-inner">
            <Megaphone size={40} />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 bg-purple-100 border border-purple-200 text-purple-800 text-xs font-mono font-bold rounded-full uppercase">
              Protected Area
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900">
              Portal Digital Marketing Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Halaman ini dikhususkan untuk tim **Digital Marketing & Content Specialist** studio Jemari Kilat. Silakan login terlebih dahulu untuk mengakses suite tools pengelolaan media sosial dan campaign iklan.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Lock size={16} /> Login Tim Digital Marketing
            </button>
          </div>

          <div className="text-[11px] text-slate-400 font-mono border-t border-slate-100 pt-4">
            Demo Login PIN: <span className="text-purple-600 font-bold">1234</span> (Username: <span className="text-purple-600 font-bold">maya</span>)
          </div>
        </div>

        <MarketingLoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      </div>
    );
  }

  // Copy helper
  const handleCopyHashtags = (text, title) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(title);
    setTimeout(() => setCopySuccess(''), 2500);
  };

  // Submit handlers
  const handleAddPostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.caption) {
      alert('Judul Post dan Caption wajib diisi!');
      return;
    }
    addSocialPost(newPost);
    setIsAddPostModalOpen(false);
    setNewPost({
      title: '',
      platform: 'Instagram',
      postType: 'Reel / Short Video',
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: '19:00',
      caption: '',
      hashtags: '#JemariKilat #FotograferMedan',
      mediaUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200'
    });
  };

  const handleAddCampaignSubmit = (e) => {
    e.preventDefault();
    if (!newCampaign.name || !newCampaign.code) {
      alert('Nama Kampanye dan Kode Promo wajib diisi!');
      return;
    }
    addMarketingCampaign(newCampaign);
    setIsAddCampaignModalOpen(false);
  };

  const handleAddHashtagSubmit = (e) => {
    e.preventDefault();
    if (!newHashtagGroup.title || !newHashtagGroup.hashtags) {
      alert('Judul dan Hashtag List wajib diisi!');
      return;
    }
    addHashtagGroup(newHashtagGroup);
    setIsAddHashtagModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Marketing Header Banner */}
      <div className="relative bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={currentMarketingMember.avatar}
                alt={currentMarketingMember.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/20 shadow-xl"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-purple-500 border-2 border-slate-900 flex items-center justify-center text-[10px] text-white font-bold" title="Digital Marketing Team">
                ★
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-3xl font-extrabold font-serif tracking-tight">
                  {currentMarketingMember.name}
                </h1>
                <span className="px-2.5 py-0.5 bg-purple-500/20 border border-purple-400/30 text-purple-300 text-[10px] font-mono font-bold rounded-full uppercase">
                  Marketing Specialist
                </span>
              </div>

              <p className="text-xs sm:text-sm text-purple-200 font-medium">
                {currentMarketingMember.role}
              </p>

              <p className="text-xs text-slate-400 italic">
                "{currentMarketingMember.bio}"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditProfileModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md"
            >
              <Edit3 size={14} /> Edit Data Diri & Foto
            </button>

            <button
              onClick={logoutMarketing}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all border border-white/10"
            >
              <LogOut size={14} /> Keluar Portal
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-3d-sm">
        <button
          onClick={() => setActiveTab('planner')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeTab === 'planner'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <Calendar size={15} /> Content Planner ({socialPosts.length})
        </button>

        <button
          onClick={() => setActiveTab('campaigns')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeTab === 'campaigns'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <Target size={15} /> Ad Campaigns & Promo ({marketingCampaigns.length})
        </button>

        <button
          onClick={() => setActiveTab('hashtags')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeTab === 'hashtags'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <Hash size={15} /> Hashtag Vault ({hashtagGroups.length})
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeTab === 'analytics'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <BarChart2 size={15} /> Funnel & Performance Analytics
        </button>
      </div>

      {/* --- TAB 1: CONTENT PLANNER & SOCIAL MEDIA CALENDAR --- */}
      {activeTab === 'planner' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-3d-card">
            <div>
              <h2 className="text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
                <Calendar size={20} className="text-purple-600" /> Content Planner & Social Media Pipeline
              </h2>
              <p className="text-xs text-slate-500">Jadwal tayang konten Instagram, TikTok, dan YouTube Shorts studio</p>
            </div>

            <button
              onClick={() => setIsAddPostModalOpen(true)}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md"
            >
              <Plus size={16} /> + Buat Jadwal Konten Baru
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {socialPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-3d-card space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-purple-100 text-purple-800 border border-purple-200 text-[10px] font-mono font-bold rounded-md">
                      {post.platform} • {post.postType}
                    </span>

                    <select
                      value={post.status}
                      onChange={(e) => updatePostStatus(post.id, e.target.value)}
                      className="text-xs font-mono font-bold rounded-xl px-2.5 py-1 border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none"
                    >
                      <option value="Idea">💡 Idea</option>
                      <option value="Drafting">✏️ Drafting</option>
                      <option value="Assets Ready">🖼️ Assets Ready</option>
                      <option value="Scheduled">📅 Scheduled</option>
                      <option value="Published">✅ Published</option>
                    </select>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 font-serif leading-snug">{post.title}</h3>

                  <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                    <span>📅 {post.scheduledDate} ({post.scheduledTime})</span>
                    <span>👤 {post.assignedCreator}</span>
                  </div>

                  <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100 whitespace-pre-line leading-relaxed">
                    {post.caption}
                  </p>

                  <div className="text-[11px] font-mono text-purple-700 font-semibold truncate">
                    {post.hashtags}
                  </div>
                </div>

                {/* Engagement Metrics footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3 font-mono">
                    <span className="flex items-center gap-1"><Eye size={13} className="text-blue-500" /> {post.metrics?.views || 0}</span>
                    <span className="flex items-center gap-1"><ThumbsUp size={13} className="text-rose-500" /> {post.metrics?.likes || 0}</span>
                    <span className="flex items-center gap-1"><MessageSquare size={13} className="text-emerald-500" /> {post.metrics?.comments || 0}</span>
                  </div>

                  <button
                    onClick={() => deleteSocialPost(post.id)}
                    className="p-1 text-rose-400 hover:text-rose-600 transition-colors"
                    title="Hapus Konten"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 2: AD CAMPAIGNS & PROMO CODES --- */}
      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-3d-card">
            <div>
              <h2 className="text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
                <Target size={20} className="text-purple-600" /> Meta & Google Ads Campaigns + Promo Voucher
              </h2>
              <p className="text-xs text-slate-500">Kelola voucher promosi, target audiens, dan performa penawaran studio</p>
            </div>

            <button
              onClick={() => setIsAddCampaignModalOpen(true)}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md"
            >
              <Plus size={16} /> + Buat Kampanye Iklan Baru
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marketingCampaigns.map((camp) => (
              <div key={camp.id} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-3d-card space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-purple-600 text-white text-xs font-mono font-bold rounded-xl tracking-wider">
                    KODE: {camp.code}
                  </span>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold rounded-full">
                    {camp.status}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-slate-900 font-serif">{camp.name}</h3>

                <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div>🎁 <span className="font-bold text-slate-900">Penawaran:</span> {camp.discount}</div>
                  <div>🎯 <span className="font-bold text-slate-900">Audience:</span> {camp.targetAudience}</div>
                  <div>📅 <span className="font-bold text-slate-900">Periode:</span> {camp.startDate} s/d {camp.endDate}</div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center pt-2 border-t border-slate-100">
                  <div className="p-3 bg-purple-50/50 rounded-2xl border border-purple-100">
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Leads Closing</span>
                    <span className="text-xl font-bold font-mono text-purple-700">{camp.leadsConverted || 0} Deals</span>
                  </div>
                  <div className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Revenue Generated</span>
                    <span className="text-xl font-bold font-mono text-emerald-700">Rp {((camp.totalRevenue || 0) / 1000000).toFixed(1)}M</span>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => deleteMarketingCampaign(camp.id)}
                    className="text-xs text-rose-500 hover:underline font-semibold flex items-center gap-1"
                  >
                    <Trash2 size={13} /> Hapus Kampanye
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 3: HASHTAG VAULT --- */}
      {activeTab === 'hashtags' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-3d-card">
            <div>
              <h2 className="text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
                <Hash size={20} className="text-purple-600" /> Bank Hashtag & Copy Assistant
              </h2>
              <p className="text-xs text-slate-500">Bank hashtag siap pakai 1-click copy untuk Instagram & TikTok</p>
            </div>

            <button
              onClick={() => setIsAddHashtagModalOpen(true)}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md"
            >
              <Plus size={16} /> + Tambah Group Hashtag
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hashtagGroups.map((group) => (
              <div key={group.id} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-3d-card space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-slate-900 font-serif flex items-center gap-2">
                    <Tag size={16} className="text-purple-600" /> {group.title}
                  </h3>
                  <button
                    onClick={() => deleteHashtagGroup(group.id)}
                    className="text-rose-400 hover:text-rose-600 p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="p-4 bg-purple-50/60 border border-purple-100 rounded-2xl font-mono text-xs text-purple-900 leading-relaxed">
                  {group.hashtags}
                </div>

                <button
                  onClick={() => handleCopyHashtags(group.hashtags, group.title)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    copySuccess === group.title
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {copySuccess === group.title ? (
                    <>
                      <CheckCircle2 size={15} /> Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <Copy size={15} /> Copy 1-Click Hashtags
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 4: FUNNEL ANALYTICS --- */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-3d-card space-y-6">
            <h2 className="text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
              <BarChart2 size={20} className="text-purple-600" /> Conversion Funnel Marketing & ROI Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-5 bg-blue-50/60 border border-blue-100 rounded-2xl">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">1. Total Reach / Impresi</span>
                <span className="text-2xl font-bold font-mono text-blue-700 mt-1 block">142,500</span>
                <span className="text-[10px] text-slate-500 font-medium">Pengunjung Website & Sosmed</span>
              </div>

              <div className="p-5 bg-purple-50/60 border border-purple-100 rounded-2xl">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">2. Inquiries / DM WhatsApp</span>
                <span className="text-2xl font-bold font-mono text-purple-700 mt-1 block">385 Leads</span>
                <span className="text-[10px] text-slate-500 font-medium">Tanya Pricelist & Jadwal</span>
              </div>

              <div className="p-5 bg-amber-50/60 border border-amber-100 rounded-2xl">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">3. Booking Deals Closed</span>
                <span className="text-2xl font-bold font-mono text-amber-700 mt-1 block">42 Deals</span>
                <span className="text-[10px] text-slate-500 font-medium">Conversion Rate: 10.9%</span>
              </div>

              <div className="p-5 bg-emerald-50/60 border border-emerald-100 rounded-2xl">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">4. Total Omset Marketing</span>
                <span className="text-2xl font-bold font-mono text-emerald-700 mt-1 block">Rp 68.500.000</span>
                <span className="text-[10px] text-slate-500 font-medium">Total Akumulasi Revenue</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODALS */}
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        member={currentMarketingMember}
        type="marketing"
      />

      {/* CREATE POST MODAL */}
      {isAddPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold font-serif text-slate-900">+ Tambah Konten Baru</h3>
            <form onSubmit={handleAddPostSubmit} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Judul Konten (e.g. Highlight Wedding Ananda)"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-xs"
              />
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={newPost.platform}
                  onChange={(e) => setNewPost({ ...newPost, platform: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs font-bold"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="TikTok">TikTok</option>
                  <option value="YouTube Shorts">YouTube Shorts</option>
                </select>
                <input
                  type="date"
                  value={newPost.scheduledDate}
                  onChange={(e) => setNewPost({ ...newPost, scheduledDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs font-mono"
                />
              </div>
              <textarea
                rows={3}
                placeholder="Caption postingan..."
                value={newPost.caption}
                onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-xs"
              />
              <input
                type="text"
                placeholder="#Hashtag List..."
                value={newPost.hashtags}
                onChange={(e) => setNewPost({ ...newPost, hashtags: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-xs font-mono"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddPostModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-500">Batal</button>
                <button type="submit" className="px-5 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold">Simpan Jadwal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE CAMPAIGN MODAL */}
      {isAddCampaignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold font-serif text-slate-900">+ Buat Kampanye Iklan Baru</h3>
            <form onSubmit={handleAddCampaignSubmit} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Nama Kampanye (e.g. Promo Prewedding 2026)"
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-xs font-bold"
              />
              <input
                type="text"
                required
                placeholder="Kode Promo (e.g. PREWEDJEMARI)"
                value={newCampaign.code}
                onChange={(e) => setNewCampaign({ ...newCampaign, code: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-xs font-mono font-bold"
              />
              <input
                type="text"
                placeholder="Deskripsi Diskon / Bonus"
                value={newCampaign.discount}
                onChange={(e) => setNewCampaign({ ...newCampaign, discount: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-xs"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={newCampaign.startDate}
                  onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs font-mono"
                />
                <input
                  type="date"
                  value={newCampaign.endDate}
                  onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs font-mono"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddCampaignModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-500">Batal</button>
                <button type="submit" className="px-5 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold">Simpan Kampanye</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE HASHTAG MODAL */}
      {isAddHashtagModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold font-serif text-slate-900">+ Group Hashtag Baru</h3>
            <form onSubmit={handleAddHashtagSubmit} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Judul Group (e.g. Wedding Medan Fine Art)"
                value={newHashtagGroup.title}
                onChange={(e) => setNewHashtagGroup({ ...newHashtagGroup, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-xs font-bold"
              />
              <textarea
                rows={3}
                required
                placeholder="#WeddingMedan #FotograferMedan..."
                value={newHashtagGroup.hashtags}
                onChange={(e) => setNewHashtagGroup({ ...newHashtagGroup, hashtags: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-xs font-mono"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddHashtagModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-500">Batal</button>
                <button type="submit" className="px-5 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold">Simpan Group</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
