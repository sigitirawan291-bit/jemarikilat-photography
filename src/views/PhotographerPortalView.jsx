import React, { useState } from 'react';
import { 
  Calendar, Camera, Clock, MapPin, DollarSign, CheckCircle2, AlertCircle, 
  User, ShieldCheck, LogOut, Lock, ChevronLeft, ChevronRight, ExternalLink, 
  FileText, Sparkles, Star, Award, ToggleLeft, ToggleRight, Info, Edit3
} from 'lucide-react';
import { useData } from '../context/DataContext';
import PhotographerLoginModal from '../components/studio/PhotographerLoginModal';
import EditProfileModal from '../components/studio/EditProfileModal';

export default function PhotographerPortalView() {
  const { 
    currentPhotographer, 
    logoutPhotographer, 
    projects = [], 
    togglePhotographerDateAvailability 
  } = useData();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [activePortalTab, setActivePortalTab] = useState('calendar'); // calendar, projects, payouts
  
  // Calendar month state (default to August 2026 based on project sample dates)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(7); // 0-indexed: 7 = August

  const [selectedDateFilter, setSelectedDateFilter] = useState(null);

  // If not logged in, render Locked Auth Banner
  if (!currentPhotographer) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Lock size={13} /> Private Photographer Access
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-tight">
              Portal Personal <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">Fotografer</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Halaman khusus untuk tim fotografer dan videografer JEMARI KILAT. Silakan login menggunakan PIN keamanan Anda untuk mengakses **Kalender Jadwal Shooting**, **Tugas Project Personal**, serta **Ledger Honorarium**.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 shadow-lg shadow-blue-600/30 transition-all active:scale-95"
              >
                <Lock size={16} /> Login ke Portal Fotografer
              </button>
            </div>
          </div>
        </div>

        {/* Login Modal */}
        <PhotographerLoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      </div>
    );
  }

  // --- LOGGED IN PHOTOGRAPHER PORTAL DATA ---
  const myPhotographerId = currentPhotographer.id;

  // Filter projects assigned to this photographer
  const myAssignedProjects = projects.filter((p) =>
    p.assignedCrew?.some(
      (c) => c.id === myPhotographerId || c.name?.toLowerCase() === currentPhotographer.name?.toLowerCase()
    )
  );

  // Financial metrics for this photographer
  let totalEarnings = 0;
  let paidEarnings = 0;
  let unpaidEarnings = 0;

  myAssignedProjects.forEach((p) => {
    const crewInfo = p.assignedCrew?.find(
      (c) => c.id === myPhotographerId || c.name?.toLowerCase() === currentPhotographer.name?.toLowerCase()
    );
    if (crewInfo) {
      const fee = Number(crewInfo.fee) || 0;
      totalEarnings += fee;
      if (crewInfo.payoutStatus === 'Paid') {
        paidEarnings += fee;
      } else {
        unpaidEarnings += fee;
      }
    }
  });

  // Calendar calculations
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Map assigned project dates for quick lookup
  const getShootsForDay = (day) => {
    const monthStr = String(currentMonth + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const targetDateStr = `${currentYear}-${monthStr}-${dayStr}`;

    return myAssignedProjects.filter((p) => p.eventDate === targetDateStr);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Photographer Profile Header Banner */}
      <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={currentPhotographer.avatar}
                alt={currentPhotographer.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/20 shadow-xl"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-[10px] text-white font-bold" title="Active Duty">
                ✓
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-3xl font-extrabold font-serif tracking-tight">
                  {currentPhotographer.name}
                </h1>
                <span className="px-2.5 py-0.5 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-mono font-bold rounded-full uppercase">
                  Verified Crew
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {currentPhotographer.specialty}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-amber-400 font-bold font-mono">
                  <Star size={13} className="fill-amber-400" /> {currentPhotographer.rating} Rating
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-mono">
                  <Award size={13} className="text-blue-400" /> {currentPhotographer.completedProjects} Projects Completed
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditProfileModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md"
            >
              <Edit3 size={14} /> Edit Data Diri & Foto
            </button>

            <button
              onClick={logoutPhotographer}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all border border-white/10"
            >
              <LogOut size={14} /> Keluar Portal
            </button>
          </div>
        </div>

        {/* Gear Spec Sheet */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Camera size={15} className="text-blue-400 shrink-0" />
            <span className="font-semibold text-white">Gear Arsenal:</span>
            <span className="font-mono text-slate-300 truncate">{currentPhotographer.gear}</span>
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            ID: <span className="text-blue-300 font-bold">{currentPhotographer.id}</span> | PIN: ••••
          </div>
        </div>
      </div>

      {/* Internal Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-3d-sm">
        <button
          onClick={() => setActivePortalTab('calendar')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            activePortalTab === 'calendar'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <Calendar size={15} /> Kalender Jadwal Shooting
        </button>

        <button
          onClick={() => setActivePortalTab('projects')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            activePortalTab === 'projects'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <FileText size={15} /> Project & Tugas Saya ({myAssignedProjects.length})
        </button>

        <button
          onClick={() => setActivePortalTab('payouts')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            activePortalTab === 'payouts'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <DollarSign size={15} /> Honorarium Saya (Rp {(totalEarnings / 1000000).toFixed(1)}M)
        </button>
      </div>

      {/* --- TAB 1: KALENDER JADWAL SHOOTING --- */}
      {activePortalTab === 'calendar' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-3d-card space-y-6">
            {/* Calendar Controls & Month Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
                  <Calendar size={20} className="text-blue-600" />
                  Jadwal Shooting & Availability
                </h2>
                <p className="text-xs text-slate-500">
                  Kalender penugasan event fotografi & videografi personal Anda
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>

                <span className="text-sm font-bold font-serif min-w-[140px] text-center text-slate-900">
                  {monthNames[currentMonth]} {currentYear}
                </span>

                <button
                  onClick={handleNextMonth}
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              <span>Min</span>
              <span>Sen</span>
              <span>Sel</span>
              <span>Rab</span>
              <span>Kam</span>
              <span>Jum</span>
              <span>Sab</span>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty leading padding days */}
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="h-24 sm:h-28 rounded-2xl bg-slate-50/50 border border-transparent" />
              ))}

              {/* Month Days */}
              {daysArray.map((day) => {
                const dayShoots = getShootsForDay(day);
                const hasShoots = dayShoots.length > 0;
                const monthStr = String(currentMonth + 1).padStart(2, '0');
                const dayStr = String(day).padStart(2, '0');
                const fullDateStr = `${currentYear}-${monthStr}-${dayStr}`;

                return (
                  <div
                    key={day}
                    onClick={() => setSelectedDateFilter(fullDateStr)}
                    className={`
                      h-24 sm:h-28 p-2 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer relative overflow-hidden group
                      ${hasShoots 
                        ? 'bg-blue-50/80 border-blue-300 shadow-md shadow-blue-500/10 hover:border-blue-500 ring-2 ring-blue-400/20' 
                        : 'bg-white border-slate-200/80 hover:bg-slate-50 hover:border-slate-300'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-bold ${hasShoots ? 'text-blue-700' : 'text-slate-700'}`}>
                        {day}
                      </span>
                      {hasShoots && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                      )}
                    </div>

                    <div className="space-y-1">
                      {hasShoots ? (
                        dayShoots.map((shoot) => (
                          <div
                            key={shoot.id}
                            className="bg-blue-600 text-white p-1.5 rounded-xl text-[10px] font-bold leading-tight truncate shadow-sm"
                            title={`${shoot.clientName} - ${shoot.eventType}`}
                          >
                            📸 {shoot.clientName?.split(' ')[0]}
                          </div>
                        ))
                      ) : (
                        <span className="text-[10px] text-slate-300 font-mono block opacity-0 group-hover:opacity-100 transition-opacity">
                          Kosong
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Assigned Shoots List for Selected Month */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-3d-card space-y-4">
            <h3 className="text-base font-bold font-serif text-slate-900 flex items-center gap-2">
              <Clock size={16} className="text-blue-600" /> Agenda Shooting Bulan {monthNames[currentMonth]} {currentYear}
            </h3>

            {myAssignedProjects.filter(p => {
              const [y, m] = p.eventDate?.split('-') || [];
              return Number(y) === currentYear && Number(m) === currentMonth + 1;
            }).length === 0 ? (
              <div className="p-8 bg-slate-50 rounded-2xl text-center text-slate-500 text-xs">
                Tidak ada agenda shooting yang ditugaskan pada bulan {monthNames[currentMonth]} {currentYear}.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myAssignedProjects
                  .filter(p => {
                    const [y, m] = p.eventDate?.split('-') || [];
                    return Number(y) === currentYear && Number(m) === currentMonth + 1;
                  })
                  .map((proj) => {
                    const myRoleInfo = proj.assignedCrew?.find(c => c.id === myPhotographerId || c.name === currentPhotographer.name);

                    return (
                      <div key={proj.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3 shadow-3d-sm">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-[10px] font-mono font-bold rounded-lg uppercase">
                            📅 {proj.eventDate} ({proj.eventTime})
                          </span>
                          <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-mono font-bold rounded-full">
                            {proj.status}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{proj.clientName}</h4>
                          <p className="text-xs text-slate-500 font-medium">{proj.eventType}</p>
                        </div>

                        <div className="text-xs text-slate-600 space-y-1 pt-1 border-t border-slate-200/60">
                          <div className="flex items-center gap-1.5">
                            <MapPin size={13} className="text-rose-500 shrink-0" />
                            <span className="truncate">{proj.location}</span>
                          </div>
                          {myRoleInfo && (
                            <div className="flex items-center justify-between text-xs pt-1">
                              <span className="font-bold text-blue-700">Peran: {myRoleInfo.role}</span>
                              <span className="font-mono font-bold text-emerald-600">
                                Honor: Rp {Number(myRoleInfo.fee || 0).toLocaleString('id-ID')}
                              </span>
                            </div>
                          )}
                        </div>

                        {proj.notes && (
                          <div className="p-2.5 bg-white border border-slate-200/80 rounded-xl text-[11px] text-slate-600 flex items-start gap-2">
                            <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
                            <span className="italic">{proj.notes}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- TAB 2: PROJECT & TUGAS SAYA --- */}
      {activePortalTab === 'projects' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-serif text-slate-900 flex items-center gap-2">
              <FileText size={18} className="text-blue-600" /> Daftar Tugas & Project Saya
            </h3>
            <span className="text-xs font-mono font-bold text-slate-500">
              Total {myAssignedProjects.length} Project Assigned
            </span>
          </div>

          <div className="space-y-4">
            {myAssignedProjects.map((proj) => {
              const myRoleInfo = proj.assignedCrew?.find(c => c.id === myPhotographerId || c.name === currentPhotographer.name);

              return (
                <div key={proj.id} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-3d-card space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-slate-900 text-white text-xs font-mono font-bold rounded-xl">
                        {proj.projectCode}
                      </span>
                      <h4 className="text-lg font-extrabold text-slate-900 font-serif">{proj.clientName}</h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-mono font-bold rounded-full">
                        {proj.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
                    <div>
                      <span className="text-slate-400 font-mono block text-[10px] uppercase font-bold">Acara & Tanggal</span>
                      <span className="font-bold text-slate-900 block">{proj.eventType}</span>
                      <span className="text-slate-500 block">📅 {proj.eventDate} ({proj.eventTime})</span>
                    </div>

                    <div>
                      <span className="text-slate-400 font-mono block text-[10px] uppercase font-bold">Lokasi Venue</span>
                      <span className="font-semibold text-slate-800 block">{proj.location}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 font-mono block text-[10px] uppercase font-bold">Peran Crew & Fee</span>
                      <span className="font-bold text-blue-700 block">{myRoleInfo?.role || 'Photographer'}</span>
                      <span className="font-mono font-bold text-emerald-600 block">
                        Rp {Number(myRoleInfo?.fee || 0).toLocaleString('id-ID')} ({myRoleInfo?.payoutStatus || 'Unpaid'})
                      </span>
                    </div>
                  </div>

                  {proj.notes && (
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700">
                      <span className="font-bold text-slate-900 block mb-0.5">Catatan Khusus Client:</span>
                      <p className="italic">{proj.notes}</p>
                    </div>
                  )}

                  {/* Drive Links */}
                  <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-100">
                    {proj.rawDriveUrl ? (
                      <a
                        href={proj.rawDriveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-blue-200"
                      >
                        <ExternalLink size={13} /> Raw Photos Google Drive
                      </a>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">Raw Drive Link belum diunggah</span>
                    )}

                    {proj.finalDriveUrl ? (
                      <a
                        href={proj.finalDriveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-emerald-200"
                      >
                        <CheckCircle2 size={13} /> Final Result Drive
                      </a>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">Final Result Link belum diunggah</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* --- TAB 3: HONORARIUM SAYA --- */}
      {activePortalTab === 'payouts' && (
        <div className="space-y-6">
          {/* Earnings Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-3d-sm">
              <span className="text-xs text-slate-500 font-bold block">Total Fee Honorarium</span>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-2">
                Rp {totalEarnings.toLocaleString('id-ID')}
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Akumulasi seluruh project assigned</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-3d-sm">
              <span className="text-xs text-emerald-600 font-bold block">Honorarium Cair (Paid)</span>
              <div className="text-2xl font-bold font-mono text-emerald-600 mt-2">
                Rp {paidEarnings.toLocaleString('id-ID')}
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Sudah ditransfer oleh studio</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-3d-sm">
              <span className="text-xs text-amber-600 font-bold block">Pending Honorarium (Process)</span>
              <div className="text-2xl font-bold font-mono text-amber-600 mt-2">
                Rp {unpaidEarnings.toLocaleString('id-ID')}
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Menunggu penyelesaian event/editing</span>
            </div>
          </div>

          {/* Detailed Payout Ledger Table */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-3d-card space-y-4">
            <h3 className="text-base font-bold font-serif text-slate-900 flex items-center gap-2">
              <DollarSign size={18} className="text-emerald-600" /> Rincian Ledger Honorarium Per Project
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-mono font-bold text-slate-400 uppercase">
                    <th className="py-3 px-4">Project</th>
                    <th className="py-3 px-4">Tanggal Event</th>
                    <th className="py-3 px-4">Peran Saya</th>
                    <th className="py-3 px-4 text-right">Fee Honorarium</th>
                    <th className="py-3 px-4 text-center">Status Cair</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {myAssignedProjects.map((proj) => {
                    const myRoleInfo = proj.assignedCrew?.find(c => c.id === myPhotographerId || c.name === currentPhotographer.name);
                    const fee = Number(myRoleInfo?.fee || 0);
                    const isPaid = myRoleInfo?.payoutStatus === 'Paid';

                    return (
                      <tr key={proj.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          <div>{proj.clientName}</div>
                          <span className="text-[10px] text-slate-400 font-mono font-normal">{proj.projectCode}</span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 font-mono">{proj.eventDate}</td>
                        <td className="py-3.5 px-4 font-semibold text-blue-700">{myRoleInfo?.role}</td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                          Rp {fee.toLocaleString('id-ID')}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                              isPaid
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : 'bg-amber-100 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {isPaid ? 'Paid (Cair)' : 'Process / Unpaid'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        member={currentPhotographer}
        type="photographer"
      />
    </div>
  );
}
