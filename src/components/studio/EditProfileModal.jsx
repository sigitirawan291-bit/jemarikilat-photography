import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, Camera, KeyRound, Sparkles, Image, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

const PRESET_AVATARS = [
  { label: 'Avatar 1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600' },
  { label: 'Avatar 2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600' },
  { label: 'Avatar 3', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600' },
  { label: 'Avatar 4', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600' },
  { label: 'Avatar 5', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600' }
];

export default function EditProfileModal({ isOpen, onClose, member, type = 'photographer' }) {
  const { updatePhotographerProfile, updateFinanceMember } = useData();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    specialty: '',
    role: '',
    gear: '',
    bio: '',
    pin: '1234',
    avatar: ''
  });

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || '',
        phone: member.phone || '',
        email: member.email || '',
        specialty: member.specialty || '',
        role: member.role || '',
        gear: member.gear || '',
        bio: member.bio || '',
        pin: member.pin || '1234',
        avatar: member.avatar || PRESET_AVATARS[0].url
      });
    }
  }, [member, isOpen]);

  if (!isOpen || !member) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Nama dan Nomor Telepon wajib diisi!');
      return;
    }

    if (type === 'finance') {
      updateFinanceMember(member.id, formData);
    } else {
      updatePhotographerProfile(member.id, formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border border-slate-200/90 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl text-slate-900 p-6 sm:p-8 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-slate-200 shadow-sm shrink-0">
              <img src={formData.avatar} alt={formData.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-mono text-blue-600 font-bold">
                Self Profile Settings
              </span>
              <h2 className="text-xl font-serif font-extrabold text-slate-900">
                Edit Data Diri & Foto Tim
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs text-slate-600 font-medium mb-1">Nama Lengkap *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 font-bold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-600 font-medium mb-1">Telepon / WhatsApp *</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-600 font-medium mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {type === 'photographer' ? (
            <>
              <div>
                <label className="block text-xs text-slate-600 font-medium mb-1">Spesialisasi & Peran Crew</label>
                <input
                  type="text"
                  placeholder="e.g. Lead Photographer • Wedding & Prewedding"
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 font-medium mb-1">Peralatan Kamera & Gear</label>
                <input
                  type="text"
                  placeholder="e.g. Sony A7 IV, FE 85mm f/1.4 GM"
                  value={formData.gear}
                  onChange={(e) => setFormData({ ...formData, gear: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs text-slate-600 font-medium mb-1">Jabatan Tim Keuangan</label>
                <input
                  type="text"
                  placeholder="e.g. Head of Finance & Accounting"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 font-medium mb-1">Catatan Bio / Tugas</label>
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
              <label className="block text-xs text-slate-600 font-medium mb-1">PIN Login (4 Digit)</label>
              <input
                type="text"
                maxLength={4}
                value={formData.pin}
                onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-600 font-medium mb-1">URL Foto Profil Avatar</label>
              <input
                type="url"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Preset Photo Selection */}
          <div>
            <label className="block text-[11px] text-slate-500 font-mono font-bold uppercase mb-2">Pilih Foto Profil Preset:</label>
            <div className="flex items-center gap-3">
              {PRESET_AVATARS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormData({ ...formData, avatar: p.url })}
                  className={`w-11 h-11 rounded-xl overflow-hidden border-2 transition-all ${
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
              Simpan Profil Saya
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
