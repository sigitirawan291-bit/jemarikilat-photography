import React, { useState } from 'react';
import { 
  Camera, Calendar, User, Clock, CheckCircle, MapPin, 
  Phone, Mail, Star, Award, Shield, AlertCircle, LogOut, 
  Send, Edit, Check, Lock, ChevronRight
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { compressImageFile } from '../utils/imageCompressor';

export default function FgDashboardView({ setActivePage }) {
  const { 
    photographers, 
    bookings, 
    toggleFgAvailability, 
    updateFgProfile, 
    updateBookingProjectStatus 
  } = useData();

  // Authentication State for Photographer
  const [activeFgId, setActiveFgId] = useState(() => {
    return sessionStorage.getItem('jemari_fg_auth_id') || '';
  });

  const [inputPhone, setInputPhone] = useState('082273319677');
  const [inputPin, setInputPin] = useState('1234');
  const [loginError, setLoginError] = useState('');

  // Dashboard Active Tab
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'availability' | 'profile'

  // Edit Profile Form State
  const currentFg = photographers.find((fg) => fg.id === activeFgId);

  const [profileForm, setProfileForm] = useState({
    name: currentFg?.name || '',
    phone: currentFg?.phone || '',
    email: currentFg?.email || '',
    specialty: currentFg?.specialty || '',
    gear: currentFg?.gear || '',
    avatar: currentFg?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'
  });

  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    const cleanInput = (inputPhone || '').trim().toLowerCase().replace('@', '');
    const found = photographers.find((fg) => {
      const fgUser = (fg.username || '').toLowerCase();
      const fgPhone = (fg.phone || '').trim();
      const fgEmail = (fg.email || '').toLowerCase();
      const fgId = (fg.id || '').toLowerCase();

      const isMatch = fgUser === cleanInput || fgPhone === cleanInput || fgEmail === cleanInput || fgId === cleanInput;
      return isMatch && fg.pin === inputPin.trim();
    });

    if (found) {
      sessionStorage.setItem('jemari_fg_auth_id', found.id);
      setActiveFgId(found.id);
      setProfileForm({
        name: found.name,
        phone: found.phone,
        email: found.email,
        specialty: found.specialty,
        gear: found.gear,
        avatar: found.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'
      });
    } else {
      setLoginError('Username/No HP atau PIN Fotografer salah. (PIN Default: 1234)');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('jemari_fg_auth_id');
    setActiveFgId('');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!currentFg) return;
    updateFgProfile(currentFg.id, profileForm);
    setSaveSuccessMsg('Profil fotografer berhasil diperbarui!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  // If not logged in, show Photographer Login Portal
  if (!activeFgId || !currentFg) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-6 bg-background flex flex-col justify-center items-center">
        <div className="w-full max-w-md bg-surface border border-outline-variant/40 p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Camera className="w-6 h-6" />
            </div>
            <span className="font-sans text-[10px] tracking-[0.3em] text-outline uppercase font-semibold block">
              PHOTOGRAPHER PORTAL
            </span>
            <h1 className="font-serif text-2xl text-primary font-normal">
              Login Tim Fotografer
            </h1>
            <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
              Portal khusus fotografer JEMARI KILAT Studio. Masukkan Username & PIN untuk mengelola jadwal photoshoot Anda.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 text-red-800 border border-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-wider text-outline mb-1 font-semibold">
                Username / No. WhatsApp *
              </label>
              <input
                type="text"
                value={inputPhone}
                onChange={(e) => setInputPhone(e.target.value)}
                placeholder="misal: sigit atau 081360318361"
                required
                className="w-full input-underline text-xs text-primary placeholder:text-outline-variant font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-sans text-[11px] uppercase tracking-wider text-outline mb-1 font-semibold">
                PIN Akses (Default: 1234) *
              </label>
              <input
                type="password"
                value={inputPin}
                onChange={(e) => setInputPin(e.target.value)}
                placeholder="Masukkan PIN (Default: 1234)"
                required
                className="w-full input-underline text-xs text-primary placeholder:text-outline-variant font-mono font-bold"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-primary text-on-primary font-sans text-xs tracking-[0.2em] py-3.5 text-center uppercase font-semibold hover:bg-outline transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <Shield className="w-4 h-4" /> MASUK DASHBOARD FOTOGRAFER
            </button>
          </form>

          <div className="text-center pt-4 border-t border-outline-variant/20 font-sans text-[11px] text-outline">
            Butuh akun baru atau bantuan login? Hubungi Super Admin.
          </div>
        </div>
      </div>
    );
  }

  // Filter assigned client projects for this photographer
  const assignedProjects = bookings.filter((b) => b.assignedFgId === currentFg.id);

  // Generate Calendar Days for Current Month
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const monthYearStr = today.toLocaleString('id-ID', { month: 'long', year: 'numeric' });

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    const isAvailable = (currentFg.availability || []).includes(dateStr);
    return { dayNum, dateStr, isAvailable };
  });

  return (
    <div className="w-full pt-28 pb-24 bg-background min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        
        {/* Photographer Header Console */}
        <div className="bg-primary text-on-primary p-6 lg:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl border border-on-primary/10">
          <div className="flex items-center gap-4">
            {currentFg.avatar ? (
              <img 
                src={currentFg.avatar} 
                alt={currentFg.name} 
                className="w-16 h-16 rounded-full object-cover shadow-xl ring-4 ring-on-primary/20"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'; }}
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold text-2xl shadow-xl ring-4 ring-on-primary/20">
                <Camera className="w-8 h-8" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-black text-[9px] px-2.5 py-0.5 font-bold uppercase tracking-widest">
                  TEAM PHOTOGRAPHER
                </span>
                <span className="font-mono text-xs text-on-primary/70 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-300 fill-current" /> {currentFg.rating || 4.9} Rating
                </span>
              </div>
              <h1 className="font-serif text-2xl lg:text-3xl font-normal mt-1 flex flex-wrap items-center gap-2">
                <span>{currentFg.name}</span>
                <span className="text-xs font-mono text-amber-300 font-bold bg-black/30 px-2 py-0.5 rounded-xs">
                  @{currentFg.username || currentFg.id}
                </span>
              </h1>
              <p className="font-sans text-xs text-on-primary/80 truncate">{currentFg.specialty}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 bg-on-primary/10 border border-on-primary/20 text-xs font-mono">
              📋 {assignedProjects.length} Proyek Klien • 🏆 {currentFg.completedProjects || 0} Selesai
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-surface text-primary text-xs uppercase font-bold hover:bg-outline-variant transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout FG
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-outline-variant/40 text-xs font-sans">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 font-semibold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'border-primary text-primary font-bold'
                : 'border-transparent text-outline hover:text-primary'
            }`}
          >
            <Camera className="w-4 h-4" /> Proyek Klien ({assignedProjects.length})
          </button>

          <button
            onClick={() => setActiveTab('availability')}
            className={`px-6 py-3 font-semibold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'availability'
                ? 'border-primary text-primary font-bold'
                : 'border-transparent text-outline hover:text-primary'
            }`}
          >
            <Calendar className="w-4 h-4" /> Kalender Availability
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 font-semibold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-primary text-primary font-bold'
                : 'border-transparent text-outline hover:text-primary'
            }`}
          >
            <User className="w-4 h-4" /> Profil & Gear Fotografer
          </button>
        </div>

        {/* TAB 1: ASSIGNED CLIENT PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-serif text-2xl text-primary font-normal">Daftar Proyek Klien Ditugaskan</h2>
                <p className="font-sans text-xs text-on-surface-variant">
                  Informasi data foto & kontak klien yang dikirim dari Admin. <i>(Harga proyek disembunyikan)</i>.
                </p>
              </div>
            </div>

            {assignedProjects.length === 0 ? (
              <div className="p-12 text-center bg-surface border border-outline-variant/40 space-y-3">
                <Camera className="w-10 h-10 mx-auto text-outline" />
                <p className="font-serif text-lg text-primary">Belum Ada Proyek Klien yang Ditugaskan</p>
                <p className="font-sans text-xs text-outline max-w-md mx-auto">
                  Saat Admin mengalokasikan proyek klien kepada Anda di menu Kelola Booking, detail tugas photoshoot akan otomatis muncul di sini.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {assignedProjects.map((project) => (
                  <div 
                    key={project.id}
                    className="bg-surface border border-outline-variant/40 p-6 space-y-4 shadow-md relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start border-b border-outline-variant/30 pb-3">
                      <div>
                        <span className="font-mono text-[10px] bg-primary text-on-primary px-2.5 py-0.5 uppercase tracking-widest font-bold">
                          REF: {project.bookingRef}
                        </span>
                        <h3 className="font-serif text-xl text-primary font-semibold mt-1">
                          {project.name}
                        </h3>
                      </div>

                      {/* Project Status Selector */}
                      <div>
                        <span className="text-[10px] font-mono text-outline block uppercase tracking-wider mb-1">
                          Status Proyek:
                        </span>
                        <select
                          value={project.projectStatus || 'Scheduled'}
                          onChange={(e) => updateBookingProjectStatus(project.id, e.target.value)}
                          className={`text-xs font-bold px-3 py-1 border transition-colors ${
                            project.projectStatus === 'Completed'
                              ? 'bg-green-100 text-green-900 border-green-300'
                              : project.projectStatus === 'Editing'
                              ? 'bg-purple-100 text-purple-900 border-purple-300'
                              : project.projectStatus === 'Shooting'
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : 'bg-blue-100 text-blue-900 border-blue-300'
                          }`}
                        >
                          <option value="Scheduled">📅 Scheduled (Terjadwal)</option>
                          <option value="Shooting">📸 Shooting (Sesi Foto)</option>
                          <option value="Editing">💻 Editing (Proses Edit)</option>
                          <option value="Completed">✅ Completed (Selesai)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                      <div>
                        <span className="text-outline uppercase text-[10px] tracking-wider block font-semibold">
                          📅 Tanggal Foto:
                        </span>
                        <p className="font-medium text-primary text-sm">{project.date}</p>
                      </div>

                      <div>
                        <span className="text-outline uppercase text-[10px] tracking-wider block font-semibold">
                          ⏱️ Waktu Sesi Foto:
                        </span>
                        <p className="font-medium text-primary">
                          {project.startTime || '09:00'} - {project.endTime || '17:00'} WIB
                        </p>
                      </div>

                      <div>
                        <span className="text-outline uppercase text-[10px] tracking-wider block font-semibold">
                          📍 Lokasi / Venue:
                        </span>
                        <p className="font-medium text-primary">{project.location || 'Studio Jemari Kilat'}</p>
                      </div>

                      <div>
                        <span className="text-outline uppercase text-[10px] tracking-wider block font-semibold">
                          📞 Kontak Klien:
                        </span>
                        <p className="font-medium text-primary">
                          {project.phone} ({project.email || '-'})
                        </p>
                      </div>
                    </div>

                    {project.notes && (
                      <div className="bg-surface-container p-3 text-xs text-on-surface-variant border border-outline-variant/30">
                        <span className="font-bold text-primary block mb-0.5">Catatan Khusus Klien:</span>
                        <p className="italic">"{project.notes}"</p>
                      </div>
                    )}

                    <div className="pt-3 border-t border-outline-variant/30 flex justify-between items-center text-[11px] font-mono text-outline">
                      <span>WhatsApp Direct: {project.phone}</span>
                      <a
                        href={`https://wa.me/${project.phone.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(project.name)},%20saya%20${encodeURIComponent(currentFg.name)}%20fotografer%20dari%20JEMARI%20KILAT%20Studio.`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 bg-green-700 text-white font-sans font-bold hover:bg-green-800 transition-colors flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" /> Hubungi Klien
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: KALENDER AVAILABILITY */}
        {activeTab === 'availability' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-serif text-2xl text-primary font-normal">Kalender Availability ({monthYearStr})</h2>
                <p className="font-sans text-xs text-on-surface-variant">
                  Klik pada tanggal untuk beralih antara <strong>AVAILABLE (Siap Photoshoot)</strong> atau <strong>OFF (Libur)</strong>.
                </p>
              </div>
            </div>

            <div className="bg-surface border border-outline-variant/40 p-6 space-y-6 shadow-md">
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-4 h-4 bg-emerald-600 rounded-sm border border-emerald-700 inline-block" /> Available (Siap Foto)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-4 h-4 bg-amber-500 rounded-sm border border-amber-600 inline-block" /> 📸 Proyek Klien (Ada Job)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-4 h-4 bg-surface-container rounded-sm border border-outline-variant/40 inline-block" /> Off (Libur / Not Available)
                </span>
              </div>

              <div className="grid grid-cols-7 gap-2 sm:gap-3 text-center">
                {['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'].map((d) => (
                  <div key={d} className="font-sans text-[11px] font-bold uppercase text-outline py-2">
                    {d}
                  </div>
                ))}

                {calendarDays.map((item) => {
                  const projectOnDay = assignedProjects.find((p) => p.date === item.dateStr);

                  return (
                    <button
                      key={item.dateStr}
                      onClick={() => {
                        if (projectOnDay) {
                          alert(
                            `📸 DETAL PROYEK KLIEN (${item.dateStr}):\n\n• Ref Kode: ${projectOnDay.bookingRef}\n• Nama Klien: ${projectOnDay.name}\n• Waktu: ${projectOnDay.startTime || '09:00'} - ${projectOnDay.endTime || '17:00'} WIB\n• Lokasi: ${projectOnDay.location || 'Studio Jemari Kilat'}\n• Status: ${projectOnDay.projectStatus || 'Scheduled'}\n• Kontak: ${projectOnDay.phone}`
                          );
                        } else {
                          toggleFgAvailability(currentFg.id, item.dateStr);
                        }
                      }}
                      className={`min-h-[75px] p-2 border flex flex-col justify-between items-start transition-all duration-300 relative text-left ${
                        projectOnDay
                          ? 'bg-amber-500 text-black border-amber-600 shadow-md font-bold hover:bg-amber-600'
                          : item.isAvailable
                          ? 'bg-emerald-600 text-white border-emerald-700 shadow-md font-bold hover:bg-emerald-700'
                          : 'bg-surface-container text-on-surface-variant border-outline-variant/30 hover:bg-outline-variant/40'
                      }`}
                      title={projectOnDay ? `Proyek Klien: ${projectOnDay.name} (${projectOnDay.bookingRef})` : item.isAvailable ? 'Status: Available (Siap Foto)' : 'Status: Off (Libur)'}
                    >
                      <div className="w-full flex justify-between items-center">
                        <span className="font-serif text-sm font-bold">{item.dayNum}</span>
                        {projectOnDay && (
                          <span className="text-[8px] bg-black text-white px-1 py-0.5 font-mono uppercase font-bold rounded-xs">
                            JOB
                          </span>
                        )}
                      </div>

                      {projectOnDay ? (
                        <div className="w-full mt-1 space-y-0.5">
                          <span className="text-[10px] font-bold block truncate leading-tight font-sans">
                            📸 {projectOnDay.name}
                          </span>
                          <span className="text-[8px] font-mono text-black/80 block uppercase tracking-tighter truncate">
                            REF: {projectOnDay.bookingRef}
                          </span>
                          <span className="text-[8px] font-mono bg-black/15 px-1 py-0.2 inline-block font-bold uppercase">
                            {projectOnDay.projectStatus || 'Scheduled'}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[9px] uppercase font-mono tracking-wider mt-auto">
                          {item.isAvailable ? 'AVAILABLE' : 'OFF'}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EDIT PROFIL FOTOGRAFER */}
        {activeTab === 'profile' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="font-serif text-2xl text-primary font-normal">Edit Profil & Gear Fotografer</h2>
              <p className="font-sans text-xs text-on-surface-variant">
                Perbarui biodata, spesialisasi foto, dan daftar perlengkapan kamera Anda.
              </p>
            </div>

            {saveSuccessMsg && (
              <div className="p-4 bg-green-100 text-green-900 border border-green-300 text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4" /> {saveSuccessMsg}
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="bg-surface border border-outline-variant/40 p-6 space-y-4 shadow-md">
              <div>
                <label className="block font-sans text-[11px] tracking-wider text-outline uppercase mb-1 font-semibold">
                  Foto Profil Diri (Upload dari Perangkat / URL) *
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <img 
                      src={profileForm.avatar} 
                      alt="Preview Avatar" 
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary shadow-md"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'; }}
                    />
                    <div className="flex-1 space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          try {
                            const compressed = await compressImageFile(file, 400, 400, 0.75);
                            setProfileForm((prev) => ({ ...prev, avatar: compressed }));
                          } catch (err) {
                            alert('Gagal memproses gambar profil: ' + err.message);
                          }
                        }}
                        className="w-full text-xs file:mr-4 file:py-1 file:px-3 file:border-0 file:text-[10px] file:uppercase file:font-semibold file:bg-primary file:text-on-primary hover:file:bg-outline"
                      />
                      <input
                        type="text"
                        value={profileForm.avatar}
                        onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                        placeholder="Atau masukkan URL gambar profil HTTPS..."
                        className="w-full input-underline text-xs text-primary font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-sans text-[11px] tracking-wider text-outline uppercase mb-1 font-semibold">
                  Nama Lengkap Fotografer *
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  required
                  className="w-full input-underline text-xs text-primary font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[11px] tracking-wider text-outline uppercase mb-1 font-semibold">
                    Nomor WhatsApp / HP *
                  </label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    required
                    className="w-full input-underline text-xs text-primary font-medium"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[11px] tracking-wider text-outline uppercase mb-1 font-semibold">
                    Email Kontak *
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    required
                    className="w-full input-underline text-xs text-primary font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans text-[11px] tracking-wider text-outline uppercase mb-1 font-semibold">
                  Spesialisasi & Peran Fotografer *
                </label>
                <input
                  type="text"
                  value={profileForm.specialty}
                  onChange={(e) => setProfileForm({ ...profileForm, specialty: e.target.value })}
                  placeholder="e.g. Lead Photographer • Wedding & Fashion"
                  required
                  className="w-full input-underline text-xs text-primary font-medium"
                />
              </div>

              <div>
                <label className="block font-sans text-[11px] tracking-wider text-outline uppercase mb-1 font-semibold">
                  Daftar Kamera & Perlengkapan Gear *
                </label>
                <textarea
                  rows="3"
                  value={profileForm.gear}
                  onChange={(e) => setProfileForm({ ...profileForm, gear: e.target.value })}
                  placeholder="e.g. Sony A7R V, FE 85mm f/1.4 GM, Blitz Godox V1"
                  className="w-full input-underline text-xs text-primary font-medium resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-primary text-on-primary font-sans text-xs tracking-[0.2em] py-3.5 text-center uppercase font-semibold hover:bg-outline transition-colors flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" /> SIMPAN PERUBAHAN PROFIL
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
