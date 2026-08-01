import React from 'react';
import { X, Camera, MapPin, Calendar, User, Send, Sparkles } from 'lucide-react';

export default function PhotoDetailModal({ photo, onClose, onSelectPackage }) {
  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-10 bg-[#0d0d0e]/85 backdrop-blur-2xl animate-fade-in font-sans text-white">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-[#141417] overflow-hidden flex flex-col lg:flex-row shadow-2xl rounded-xs">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-[#0d0d0e] text-white rounded-full flex items-center justify-center hover:bg-[#d4af37] hover:text-black transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Photo Canvas Area (Borderless) */}
        <div className="lg:w-7/12 bg-[#0d0d0e] flex items-center justify-center p-4 lg:p-8 min-h-[350px] lg:min-h-[600px] overflow-hidden relative">
          <img
            src={photo.image}
            alt={photo.title}
            className="max-h-[78vh] w-auto object-contain shadow-2xl"
          />
        </div>

        {/* Details Sidebar */}
        <div className="lg:w-5/12 p-6 lg:p-10 overflow-y-auto flex flex-col justify-between bg-[#141417]">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="font-sans text-[10px] tracking-[0.25em] text-[#d4af37] uppercase font-bold">
                {photo.category} — {photo.year || '2024'}
              </span>
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                REF #{photo.id}
              </span>
            </div>

            <h2 className="font-sans text-2xl lg:text-3xl text-white mb-3 leading-tight font-extrabold">
              {photo.title}
            </h2>

            <p className="font-sans text-xs text-neutral-400 leading-relaxed mb-6 font-normal">
              {photo.description || 'Fine art photograph by JEMARI KILAT.'}
            </p>

            {/* Info Grid */}
            <div className="space-y-3 py-4 border-t border-b border-neutral-800 text-xs font-sans">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#d4af37]" /> Location:
                </span>
                <span className="font-medium text-white">{photo.location}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-400 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-[#d4af37]" /> Client / Project:
                </span>
                <span className="font-medium text-white">{photo.client}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-400 flex items-center gap-2">
                  <Camera className="w-3.5 h-3.5 text-[#d4af37]" /> Camera Body:
                </span>
                <span className="font-medium text-white">{photo.camera}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-400 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#d4af37]" /> Lens & Optics:
                </span>
                <span className="font-medium text-white">{photo.lens}</span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-2 border-t border-neutral-800">
                <span>EXIF TELEMETRY:</span>
                <span className="text-[#d4af37] font-bold">ISO {photo.iso} | {photo.aperture} | {photo.shutter}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 pt-4 flex flex-col gap-3">
            <button
              onClick={() => {
                onClose();
                if (onSelectPackage) onSelectPackage(`Inquire style for: ${photo.title}`);
              }}
              className="w-full bg-[#d4af37] text-black font-sans text-xs tracking-[0.2em] py-3.5 text-center uppercase font-bold flex items-center justify-center gap-2 hover:bg-[#f3e5ab] transition-all shadow-lg rounded-xs"
            >
              <Send className="w-3.5 h-3.5" /> INQUIRE THIS VISUAL STYLE
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
