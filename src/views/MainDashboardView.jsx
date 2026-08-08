import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, DollarSign, Folder, CheckCircle2, Clock, 
  Calendar, Search, Filter, Sparkles, MapPin, Users, FileText, 
  ChevronRight, ArrowUpRight, ShieldCheck, Layers 
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function MainDashboardView() {
  const { projects = [], photographers = [] } = useData();

  const [projectSearch, setProjectSearch] = useState('');
  const [projectFilterStatus, setProjectFilterStatus] = useState('ALL');
  const [selectedMonthFilter, setSelectedMonthFilter] = useState('2026-08'); // YYYY-MM or ALL

  // Filter projects by selected month
  const monthlyProjects = projects.filter((p) => {
    if (selectedMonthFilter === 'ALL') return true;
    return p.eventDate?.startsWith(selectedMonthFilter);
  });

  // Monthly Non-Monetary Project Metrics
  const monthlyActiveCount = monthlyProjects.filter((p) => p.status !== 'Completed').length;
  const monthlyCompletedCount = monthlyProjects.filter((p) => p.status === 'Completed' || p.status === 'Final Delivered').length;
  const monthlyScheduledCount = monthlyProjects.filter((p) => p.status === 'Shooting Scheduled' || p.status === 'Confirmed').length;
  const activeCrewCount = photographers.filter((p) => p.availability?.length > 0).length;

  // Filtered projects for Status Tracker section
  const filteredStatusProjects = projects.filter((p) => {
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

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Main Header Banner */}
      <div className="relative bg-gradient-to-br from-white via-slate-50 to-blue-50/40 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-3d-card overflow-hidden">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-100/80 text-blue-700 border border-blue-200/80 text-[10px] font-mono font-bold uppercase tracking-widest rounded-full flex items-center gap-1.5 shadow-sm">
                <Sparkles size={12} /> Studio Activity Overview
              </span>
              <span className="text-xs text-slate-500 font-mono font-medium">Medan, Indonesia</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900 tracking-tight">
              Jemari Kilat <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Studio Hub</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Ringkasan aktivitas project bulanan, statistik pengerjaan tim studio, serta status live tracking pengerjaan project photography & film.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-2xl shadow-3d-sm flex items-center gap-2 text-xs font-bold text-slate-700">
              <Calendar size={15} className="text-blue-600" />
              <span>Periode:</span>
              <select
                value={selectedMonthFilter}
                onChange={(e) => setSelectedMonthFilter(e.target.value)}
                className="bg-transparent font-mono text-blue-700 focus:outline-none cursor-pointer"
              >
                <option value="2026-08">Agustus 2026</option>
                <option value="2026-09">September 2026</option>
                <option value="2026-07">Juli 2026</option>
                <option value="ALL">Semua Periode</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3D Elevated Non-Financial Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-200/60">
          <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-3d-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Active Projects</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Folder size={16} />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 mt-2">{monthlyActiveCount} Project</div>
            <div className="text-[10px] text-slate-500 font-medium mt-1">Dalam proses pengerjaan</div>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-3d-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Project Selesai</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 size={16} />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-600 mt-2">{monthlyCompletedCount} Delivered</div>
            <div className="text-[10px] text-slate-500 font-medium mt-1">Final foto & video terkirim</div>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-3d-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Shooting Scheduled</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Clock size={16} />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono text-indigo-600 mt-2">{monthlyScheduledCount} Agenda</div>
            <div className="text-[10px] text-slate-500 font-medium mt-1">Jadwal shooting aktif</div>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-3d-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Tim Crew On Duty</span>
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Users size={16} />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono text-purple-600 mt-2">{activeCrewCount} Member</div>
            <div className="text-[10px] text-slate-500 font-medium mt-1">Fotografer & videografer</div>
          </div>
        </div>
      </div>

      {/* SECTION 1: LAPORAN AKTIVITAS PROJECT BULANAN */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
              <BarChart3 size={20} className="text-blue-600" />
              Laporan Aktivitas Project Bulanan
            </h2>
            <p className="text-xs text-slate-500">
              Distribusi kategori pengerjaan project studio periode {selectedMonthFilter}
            </p>
          </div>

          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-mono font-bold rounded-xl border border-blue-200">
            {monthlyProjects.length} Total Project
          </span>
        </div>

        {/* Category Breakdown Cards (Non-Monetary) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Wedding Series */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-3d-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-blue-600 uppercase tracking-wider">Wedding & Prewed</span>
              <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-bold font-mono rounded-full">
                {monthlyProjects.filter(p => p.eventType?.toLowerCase().includes('wedding') || p.eventType?.toLowerCase().includes('prewedding')).length} Project
              </span>
            </div>

            <div className="text-2xl font-serif font-extrabold text-slate-900">
              {monthlyProjects.filter(p => p.eventType?.toLowerCase().includes('wedding') || p.eventType?.toLowerCase().includes('prewedding')).length} Agendas
            </div>

            <p className="text-xs text-slate-500">
              Layanan pernikahan royal & prewedding cinematic outdoor.
            </p>
          </div>

          {/* Wisuda & Group */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-3d-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-indigo-600 uppercase tracking-wider">Wisuda & Group</span>
              <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 text-xs font-bold font-mono rounded-full">
                {monthlyProjects.filter(p => p.eventType?.toLowerCase().includes('wisuda') || p.eventType?.toLowerCase().includes('group')).length} Project
              </span>
            </div>

            <div className="text-2xl font-serif font-extrabold text-slate-900">
              {monthlyProjects.filter(p => p.eventType?.toLowerCase().includes('wisuda') || p.eventType?.toLowerCase().includes('group')).length} Agendas
            </div>

            <p className="text-xs text-slate-500">
              Dokumentasi kelulusan kampus, studio indoor & squad group.
            </p>
          </div>

          {/* Event & Special */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-3d-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-purple-600 uppercase tracking-wider">Concert & Stage</span>
              <span className="px-2.5 py-0.5 bg-purple-100 text-purple-800 text-xs font-bold font-mono rounded-full">
                {monthlyProjects.filter(p => p.eventType?.toLowerCase().includes('event') || p.eventType?.toLowerCase().includes('stage')).length} Project
              </span>
            </div>

            <div className="text-2xl font-serif font-extrabold text-slate-900">
              {monthlyProjects.filter(p => p.eventType?.toLowerCase().includes('event') || p.eventType?.toLowerCase().includes('stage')).length} Agendas
            </div>

            <p className="text-xs text-slate-500">
              Liputan konser musik panggung utama & summit internasional.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: STATUS PROJECT STUDIO */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-600" />
              Status Project Studio Live Tracker
            </h2>
            <p className="text-xs text-slate-500">
              Lacak tahapan pengerjaan project foto & video dari prospect hingga final delivered
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[200px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari client / kode project..."
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={projectFilterStatus}
              onChange={(e) => setProjectFilterStatus(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="ALL">Semua Status Tahapan</option>
              {KANBAN_STAGES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Project Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStatusProjects.map((proj) => (
            <div key={proj.id} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-3d-card space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 bg-slate-900 text-white text-[10px] font-mono font-bold rounded-lg">
                    {proj.projectCode}
                  </span>
                  <h4 className="font-bold text-base text-slate-900 font-serif">{proj.clientName}</h4>
                </div>

                <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-mono font-bold rounded-full">
                  {proj.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase font-bold block">Tipe Layanan</span>
                  <span className="font-bold text-slate-900 block">{proj.eventType}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase font-bold block">Jadwal Shooting</span>
                  <span className="font-semibold text-slate-800 block">📅 {proj.eventDate} ({proj.eventTime})</span>
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-1 pt-1">
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-rose-500 shrink-0" />
                  <span className="truncate">{proj.location}</span>
                </div>

                {proj.assignedCrew && proj.assignedCrew.length > 0 && (
                  <div className="flex items-center gap-1.5 pt-1 text-slate-500 text-[11px]">
                    <Users size={13} className="text-blue-600 shrink-0" />
                    <span>Crew: {proj.assignedCrew.map(c => c.name).join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
