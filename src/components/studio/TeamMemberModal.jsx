import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, Camera, Award, Shield, CheckCircle2, DollarSign, Image } from 'lucide-react';
import { useData } from '../../context/DataContext';

const PRESET_AVATARS = [
  { label: 'Male FG 1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600' },
  { label: 'Male FG 2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600' },
  { label: 'Male FG 3', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600' },
  { label: 'Female FG 1', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600' },
  { label: 'Female FG 2', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600' }
];

export default function TeamMemberModal({ isOpen, onClose, member = null, defaultType = 'photographer' }) {
  const { 
    addPhotographer, 
    updateFgProfile, 
    addFinanceMember, 
    updateFinanceMember,
    addMarketingMember,
    updateMarketingMember
  } = useData();

  const [memberType, setMemberType] = useState(defaultType); // photographer, finance, marketing
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phone: '',
    email: '',
    specialty: 'Senior Photographer • Wedding & Wisuda',
    role: 'Finance Officer & Accounting',
    gear: 'Sony A7 IV, FE 24-70mm f/2.8 GM II',
    bio: 'Pengelola kas studio dan payroll honorarium crew.',
    pin: '1234',
    avatar: PRESET_AVATARS[0].url
  });

  useEffect(() => {
    if (member) {
      const type = member.role && member.role.toLowerCase().includes('marketing') 
        ? 'marketing' 
        : member.role ? 'finance' : 'photographer';
      setMemberType(type);
      setFormData({
        name: member.name || '',
        username: member.username || '',
        phone: member.phone || '',
        email: member.email || '',
        specialty: member.specialty || 'Senior Photographer',
        role: member.role || (type === 'marketing' ? 'Social Media Specialist' : 'Finance Staff'),
        gear: member.gear || '',
        bio: member.bio || '',
        rating: member.rating || 4.9,
        pin: member.pin || '1234',
        avatar: member.avatar || PRESET_AVATARS[0].url
      });
    } else {
      setMemberType(defaultType);
      setFormData({
        name: '',
        username: '',
        phone: '',
        email: '',
        specialty: defaultType === 'finance' ? 'Finance Officer' : defaultType === 'marketing' ? 'Social Media & Ad Strategist' : 'Senior Photographer • Wedding & Wisuda',
        role: defaultType === 'finance' ? 'Head of Finance & Accounting' : defaultType === 'marketing' ? 'Lead Social Media & Performance Marketer' : 'Senior Photographer',
        gear: 'Sony A7 IV, FE 24-70mm f/2.8 GM II',
        bio: defaultType === 'marketing' ? 'Perencana konten kreatif, pengelola iklan Meta Ads & Google Ads studio.' : 'Pengelola arus kas studio, payroll honorarium crew, dan pencatatan laba bersih.',
        rating: 4.9,
        pin: '1234',
        avatar: defaultType === 'finance' ? PRESET_AVATARS[3].url : defaultType === 'marketing' ? PRESET_AVATARS[4].url : PRESET_AVATARS[1].url
      });
    }
  }, [member, isOpen, defaultType]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Nama Lengkap dan Nomor Telepon wajib diisi!');
      return;
    }

    if (member) {
      if (memberType === 'finance') {
        updateFinanceMember(member.id, formData);
      } else if (memberType === 'marketing') {
        updateMarketingMember(member.id, formData);
      } else {
        updateFgProfile(member.id, formData);
      }
    } else {
      if (memberType === 'finance') {
        addFinanceMember(formData);
      } else if (memberType === 'marketing') {
        addMarketingMember(formData);
      } else {
        addPhotographer(formData);
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border border-slate-200/90 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-3d-floating text-slate-900 p-6 sm:p-8 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-blue-600 font-bold">
              Manajemen Tim & Akun Studio
            </span>
            <h2 className="text-2xl font-serif font-extrabold text-slate-900">
              {member ? `Edit Akun: ${member.name}` : 'Buat Akun Tim Baru'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Member Type Switcher */}
        {!member && (
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => setMemberType('photographer')}
              className={`flex-1 min-w-[140px] py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                memberType === 'photographer'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Camera size={14} /> Fotografer
            </button>
            <button
              type="button"
              onClick={() => setMemberType('finance')}
              className={`flex-1 min-w-[140px] py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                memberType === 'finance'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <DollarSign size={14} /> Keuangan
            </button>
            <button
              type="button"
              onClick={() => setMemberType('marketing')}
              className={`flex-1 min-w-[140px] py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                memberType === 'marketing'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award size={14} /> Digital Marketing
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-600 font-medium mb-1">Nama Lengkap *</label>
              <input
                type="text"
                required
                placeholder="Contoh: Rian Pratama"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-600 font-medium mb-1">Username Login</label>
              <input
                type="text"
                placeholder="rian"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-600 font-medium mb-1">Telepon / WhatsApp *</label>
              <input
                type="text"
                required
                placeholder="0812xxxxxxxx"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-600 font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="tim@jemarikilat.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {memberType === 'photographer' ? (
            <>
              <div>
                <label className="block text-xs text-slate-600 font-medium mb-1">Spesialisasi & Role Job</label>
                <input
                  type="text"
                  placeholder="Contoh: Senior Videographer • Drone Pilot & Editor"
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 font-medium mb-1">Daftar Peralatan / Gear Utama</label>
                <input
                  type="text"
                  placeholder="Sony A7 IV, Lens 24-70mm f2.8, Lighting Godox AD300"
                  value={formData.gear}
                  onChange={(e) => setFormData({ ...formData, gear: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 font-medium mb-1">Rating Perfomance Fotografer (1.0 - 5.0 ⭐)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.1"
                    min="1.0"
                    max="5.0"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 5.0 })}
                    className="w-28 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-bold text-amber-600 focus:outline-none focus:border-blue-600"
                  />
                  <div className="flex items-center gap-1 text-amber-400 font-mono font-bold text-xs">
                    ★ {formData.rating} Stars Rating
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs text-slate-600 font-medium mb-1">Jabatan Keuangan Studio</label>
                <input
                  type="text"
                  placeholder="Contoh: Head of Finance & Accounting"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 font-medium mb-1">Tugas & Catatan Bio</label>
                <input
                  type="text"
                  placeholder="Pengelola kas studio dan payroll honorarium crew"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                />
              </div>
            </>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-600 font-medium mb-1">PIN Login Tim (4 Digit)</label>
              <input
                type="text"
                maxLength={4}
                value={formData.pin}
                onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-600 font-medium mb-1">URL Avatar Foto Profil</label>
              <input
                type="url"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Preset Avatars */}
          <div>
            <label className="block text-[11px] text-slate-500 font-mono font-bold uppercase mb-2">Pilih Foto Preset:</label>
            <div className="flex items-center gap-3">
              {PRESET_AVATARS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormData({ ...formData, avatar: p.url })}
                  className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-all ${
                    formData.avatar === p.url ? 'border-blue-600 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-blue-500/20 active:scale-95"
            >
              {member ? 'Simpan Perubahan' : 'Buat Akun Tim'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
