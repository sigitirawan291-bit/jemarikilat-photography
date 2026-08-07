import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, Camera, Award, Shield, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function TeamMemberModal({ isOpen, onClose, member = null }) {
  const { addPhotographer, updateFgProfile } = useData();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phone: '',
    email: '',
    specialty: 'Lead Photographer • Wedding & Fashion',
    gear: 'Sony A7 IV, FE 85mm f/1.4 GM',
    pin: '1234',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'
  });

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || '',
        username: member.username || '',
        phone: member.phone || '',
        email: member.email || '',
        specialty: member.specialty || 'Senior Photographer',
        gear: member.gear || '',
        pin: member.pin || '1234',
        avatar: member.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'
      });
    } else {
      setFormData({
        name: '',
        username: '',
        phone: '',
        email: '',
        specialty: 'Senior Photographer • Wedding & Wisuda',
        gear: 'Sony A7 IV, FE 24-70mm f/2.8 GM II',
        pin: '1234',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600'
      });
    }
  }, [member, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Nama dan Nomor Telepon wajib diisi!');
      return;
    }

    if (member) {
      updateFgProfile(member.id, formData);
    } else {
      addPhotographer(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-high border border-outline-variant/30 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl text-on-surface p-6 sm:p-8 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-primary font-bold">
              Manajemen Tim Photography & Crew
            </span>
            <h2 className="text-2xl font-serif font-bold text-on-surface">
              {member ? `Edit Profile: ${member.name}` : 'Tambah Anggota Tim Baru'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-on-surface-variant font-medium mb-1">Nama Lengkap *</label>
              <input
                type="text"
                required
                placeholder="Contoh: Rian Pratama"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-on-surface-variant font-medium mb-1">Username Login</label>
              <input
                type="text"
                placeholder="rian"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-on-surface-variant font-medium mb-1">Telepon / WhatsApp *</label>
              <input
                type="text"
                required
                placeholder="0812xxxxxxxx"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-on-surface-variant font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="crew@jemarikilat.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-on-surface-variant font-medium mb-1">Spesialisasi & Role Job</label>
            <input
              type="text"
              placeholder="Contoh: Senior Videographer • Drone Pilot & Editor"
              value={formData.specialty}
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs text-on-surface-variant font-medium mb-1">Daftar Peralatan / Gear Utama</label>
            <input
              type="text"
              placeholder="Sony A7 IV, Lens 24-70mm f2.8, Lighting Godox AD300"
              value={formData.gear}
              onChange={(e) => setFormData({ ...formData, gear: e.target.value })}
              className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-on-surface-variant font-medium mb-1">PIN Login Crew (4 Digit)</label>
              <input
                type="text"
                maxLength={4}
                value={formData.pin}
                onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary font-mono"
              />
            </div>
            <div>
              <label className="block text-xs text-on-surface-variant font-medium mb-1">URL Avatar / Foto Profil</label>
              <input
                type="url"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-xs font-mono focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/20">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:text-on-surface rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary text-on-primary hover:bg-outline rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg transition-colors flex items-center gap-2"
            >
              <CheckCircle2 size={16} />
              {member ? 'Simpan Profil' : 'Tambah Tim Crew'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
