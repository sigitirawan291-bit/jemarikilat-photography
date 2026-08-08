import React, { useState, useEffect } from 'react';
import { 
  X, Calendar, Clock, MapPin, Folder, ExternalLink, Users, Sparkles, 
  CheckCircle2, AlertCircle, Edit3, MessageSquare, Info, ShieldCheck
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function DateDetailModal({ isOpen, onClose, dateStr, photographerId, projects = [], availabilityInfo = null }) {
  const { setPhotographerDateAvailability } = useData();

  const [status, setStatus] = useState('available');
  const [remark, setRemark] = useState('');

  useEffect(() => {
    if (availabilityInfo) {
      setStatus(availabilityInfo.status || 'available');
      setRemark(availabilityInfo.remark || '');
    } else {
      setStatus('available');
      setRemark('');
    }
  }, [availabilityInfo, dateStr, isOpen]);

  if (!isOpen || !dateStr) return null;

  const handleSaveAvailability = (e) => {
    e.preventDefault();
    setPhotographerDateAvailability(photographerId, dateStr, status, remark);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border border-slate-200/90 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl text-slate-900 p-6 sm:p-8 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-mono font-bold text-sm shrink-0">
              📅
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-mono text-blue-600 font-bold">
                Jadwal & Availability Detail
              </span>
              <h2 className="text-xl font-serif font-extrabold text-slate-900">
                Tanggal: {dateStr}
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

        {/* SECTION 1: ASSIGNED PROJECTS FOR THIS DATE */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <Folder size={14} className="text-blue-600" />
            Project Yang Diterima ({projects.length})
          </h3>

          {projects.length === 0 ? (
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs text-slate-500 text-center italic">
              Tidak ada agenda shooting project yang ditugaskan pada tanggal ini.
            </div>
          ) : (
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-blue-600 text-white text-[10px] font-mono font-bold rounded-md">
                        {proj.projectCode}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 font-serif">{proj.clientName}</h4>
                    </div>
                    <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-mono font-bold rounded-full">
                      {proj.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono uppercase font-bold block">Tipe & Waktu</span>
                      <span className="font-semibold text-slate-900 block">{proj.eventType} ({proj.eventTime})</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono uppercase font-bold block">Lokasi Venue</span>
                      <span className="font-semibold text-slate-800 block flex items-center gap-1">
                        <MapPin size={12} className="text-rose-500 shrink-0" /> {proj.location}
                      </span>
                    </div>
                  </div>

                  {proj.notes && (
                    <div className="text-xs bg-white p-2.5 rounded-xl border border-blue-100 text-slate-700 italic">
                      💬 Catatan Client: "{proj.notes}"
                    </div>
                  )}

                  {/* Drive Links */}
                  <div className="flex items-center gap-3 pt-1 border-t border-blue-100/80 text-xs">
                    {proj.rawDriveUrl && (
                      <a
                        href={proj.rawDriveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-700 hover:underline font-bold flex items-center gap-1"
                      >
                        <ExternalLink size={12} /> Raw Photos Drive
                      </a>
                    )}
                    {proj.finalDriveUrl && (
                      <a
                        href={proj.finalDriveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-700 hover:underline font-bold flex items-center gap-1"
                      >
                        <ExternalLink size={12} /> Final Photos Drive
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 2: AVAILABILITY & REMARKS FORM */}
        <form onSubmit={handleSaveAvailability} className="space-y-4 pt-2 border-t border-slate-200">
          <h3 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-600" />
            Status Ketersediaan & Keterangan Tambahan
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Pilih Status Ketersediaan Tanggal Ini:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus('available')}
                className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  status === 'available'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300 shadow-sm'
                    : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>🟢 AVAILABLE</span> (Siap Shooting)
              </button>

              <button
                type="button"
                onClick={() => setStatus('unavailable')}
                className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  status === 'unavailable'
                    ? 'bg-rose-100 text-rose-800 border-rose-300 shadow-sm'
                    : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>🔴 NOT AVAILABLE</span> (Off / Libur)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <MessageSquare size={13} className="text-blue-600" /> Keterangan / Catatan Khusus Tanggal Ini
            </label>
            <input
              type="text"
              placeholder="Contoh: Available Khusus Jam 14.00, atau Off Liburan Keluar Kota..."
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Tutup
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-blue-500/20 active:scale-95"
            >
              Simpan Status & Keterangan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
