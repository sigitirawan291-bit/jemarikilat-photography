import React from 'react';
import { X, Camera, MapPin, Calendar, User, Send } from 'lucide-react';

export default function PhotoDetailModal({ photo, onClose, onSelectPackage }) {
  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-10 bg-primary/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-surface border border-outline-variant/40 overflow-hidden flex flex-col lg:flex-row shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-primary text-on-primary rounded-full flex items-center justify-center hover:bg-outline transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Photo Canvas Area */}
        <div className="lg:w-7/12 bg-primary flex items-center justify-center p-4 lg:p-8 min-h-[350px] lg:min-h-[600px] overflow-hidden">
          <img
            src={photo.image}
            alt={photo.title}
            className="max-h-[75vh] w-auto object-contain shadow-2xl"
          />
        </div>

        {/* Details Sidebar */}
        <div className="lg:w-5/12 p-6 lg:p-10 overflow-y-auto flex flex-col justify-between bg-surface border-l border-outline-variant/30">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="font-sans text-[10px] tracking-[0.25em] text-outline uppercase font-semibold">
                {photo.category} — {photo.year}
              </span>
              <span className="font-sans text-[10px] text-outline uppercase tracking-wider">
                REF #{photo.id}
              </span>
            </div>

            <h2 className="font-serif text-2xl lg:text-3xl text-primary mb-4 leading-tight">
              {photo.title}
            </h2>

            <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-6">
              {photo.description}
            </p>

            {/* Info Grid */}
            <div className="space-y-3 py-4 border-t border-b border-outline-variant/40 text-xs font-sans">
              <div className="flex items-center justify-between">
                <span className="text-outline flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" /> Location:
                </span>
                <span className="font-medium text-primary">{photo.location}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-outline flex items-center gap-2">
                  <User className="w-3.5 h-3.5" /> Client / Project:
                </span>
                <span className="font-medium text-primary">{photo.client}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-outline flex items-center gap-2">
                  <Camera className="w-3.5 h-3.5" /> Camera Body:
                </span>
                <span className="font-medium text-primary">{photo.camera}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-outline flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" /> Lens & Specs:
                </span>
                <span className="font-medium text-primary">{photo.lens}</span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-outline">
                <span>EXIF DATA:</span>
                <span>ISO {photo.iso} | {photo.aperture} | {photo.shutter}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 pt-4 flex flex-col gap-3">
            <button
              onClick={() => {
                onClose();
                onSelectPackage(`Inquire style for: ${photo.title}`);
              }}
              className="w-full bg-primary text-on-primary font-sans text-xs tracking-[0.2em] py-3.5 text-center uppercase font-semibold flex items-center justify-center gap-2 hover:bg-on-surface-variant transition-colors"
            >
              <Send className="w-3.5 h-3.5" /> INQUIRE THIS LOOK
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
