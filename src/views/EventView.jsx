import React, { useState } from 'react';
import { Lock, Search, Download, Sparkles, ExternalLink, Calendar, MapPin, CheckCircle, ShieldCheck, Film, Image as ImageIcon } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function EventView({ onSelectPhoto, onSelectVideo }) {
  const { eventPortals = [] } = useData();
  const [passcode, setPasscode] = useState('');
  const [activePortal, setActivePortal] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeMediaTab, setActiveMediaTab] = useState('photos'); // 'photos' | 'videos'

  const handleUnlock = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const found = eventPortals.find(
      (p) => p.passcode?.trim().toLowerCase() === passcode.trim().toLowerCase()
    );

    if (found) {
      setActivePortal(found);
    } else {
      setErrorMsg('Kode sandi event tidak valid. Silakan periksa kembali surat konfirmasi / WhatsApp Anda.');
    }
  };

  return (
    <div className="w-full pt-28 pb-24 px-6 lg:px-16 bg-[#0d0d0e] text-white min-h-screen font-sans">
      <div className="max-w-[1440px] mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-sans text-[10px] tracking-[0.4em] text-[#d4af37] uppercase block font-bold">
            PRIVATE CLIENT PORTAL
          </span>
          <h1 className="font-sans text-4xl lg:text-6xl text-white font-extrabold">
            Client Event Access
          </h1>
          <p className="font-sans text-xs text-neutral-400 leading-relaxed font-normal">
            Akses galeri digital privat dan unduh hasil foto & video resolusi tinggi dari acara Anda secara langsung.
          </p>
        </div>

        {!activePortal ? (
          /* Passcode Unlock Form */
          <div className="max-w-md mx-auto bg-[#141417] p-8 lg:p-10 rounded-xs shadow-2xl space-y-6 text-center">
            <div className="w-14 h-14 bg-black text-[#d4af37] rounded-full flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h2 className="font-sans text-xl text-white font-bold">Masukkan Kode Sandi Event</h2>
              <p className="font-sans text-xs text-neutral-400 font-normal">
                Kode sandi 6 digit telah dikirimkan ke WhatsApp / Email Anda oleh Admin Sigit.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4">
              <input
                type="text"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Contoh: JK-WDG-88"
                className="w-full bg-[#0d0d0e] px-4 py-3 text-center text-sm font-mono tracking-widest text-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] rounded-xs uppercase"
                required
              />

              {errorMsg && (
                <p className="text-xs text-red-400 font-sans font-medium">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="w-full bg-[#d4af37] text-black font-sans text-xs tracking-[0.2em] py-3.5 uppercase font-bold hover:bg-[#f3e5ab] transition-all shadow-lg rounded-xs"
              >
                BUKA GALERI EVENT
              </button>
            </form>
          </div>
        ) : (
          /* Event Portal Content */
          <div className="space-y-12 animate-fade-in">
            <div className="bg-[#141417] p-8 lg:p-10 rounded-xs shadow-2xl space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-neutral-800 pb-6">
                <div>
                  <span className="font-mono text-xs text-[#d4af37] tracking-widest uppercase font-bold block mb-1">
                    {activePortal.category || 'EVENT'} • CLIENT ACCESS UNLOCKED
                  </span>
                  <h2 className="font-sans text-3xl lg:text-4xl text-white font-extrabold">
                    {activePortal.eventName}
                  </h2>
                  <p className="font-sans text-xs text-neutral-400 mt-1 font-normal">
                    📍 {activePortal.location} — {activePortal.date}
                  </p>
                </div>

                <button
                  onClick={() => setActivePortal(null)}
                  className="bg-neutral-800 text-white font-sans text-xs tracking-wider px-5 py-2.5 uppercase font-bold hover:bg-neutral-700 transition-colors rounded-xs"
                >
                  KUNCI KEMBALI
                </button>
              </div>

              {/* Media Type Tabs */}
              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={() => setActiveMediaTab('photos')}
                  className={`font-sans text-xs tracking-[0.15em] px-5 py-2.5 uppercase font-bold transition-all rounded-xs flex items-center gap-2 ${
                    activeMediaTab === 'photos' ? 'bg-[#d4af37] text-black shadow-md' : 'bg-[#0d0d0e] text-neutral-400'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" /> Foto ({activePortal.photos?.length || 0})
                </button>

                <button
                  onClick={() => setActiveMediaTab('videos')}
                  className={`font-sans text-xs tracking-[0.15em] px-5 py-2.5 uppercase font-bold transition-all rounded-xs flex items-center gap-2 ${
                    activeMediaTab === 'videos' ? 'bg-[#d4af37] text-black shadow-md' : 'bg-[#0d0d0e] text-neutral-400'
                  }`}
                >
                  <Film className="w-4 h-4" /> Video ({activePortal.videos?.length || 0})
                </button>
              </div>
            </div>

            {/* BORDERLESS PHOTO GRID */}
            {activeMediaTab === 'photos' && (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {(activePortal.photos || []).map((photo, idx) => (
                  <div
                    key={photo.id || idx}
                    onClick={() => onSelectPhoto && onSelectPhoto(photo)}
                    className="break-inside-avoid group cursor-pointer borderless-card overflow-hidden"
                  >
                    <div className="relative w-full overflow-hidden bg-[#0d0d0e]">
                      <img
                        src={photo.image}
                        alt={photo.title}
                        loading="lazy"
                        className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* BORDERLESS VIDEO GRID */}
            {activeMediaTab === 'videos' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(activePortal.videos || []).map((video, idx) => (
                  <div
                    key={video.id || idx}
                    onClick={() => onSelectVideo && onSelectVideo(video)}
                    className="bg-[#141417] overflow-hidden group cursor-pointer shadow-2xl transition-all duration-300 rounded-xs"
                  >
                    <div className="relative aspect-video bg-black overflow-hidden">
                      <video 
                        src={video.videoUrl}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        controls
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
