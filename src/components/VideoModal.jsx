import React from 'react';
import { X, Film, Clock, User } from 'lucide-react';

export default function VideoModal({ video, onClose }) {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-10 bg-primary/95 backdrop-blur-lg animate-fade-in">
      <div className="relative w-full max-w-5xl bg-surface-container-lowest border border-outline-variant/40 overflow-hidden shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 bg-primary text-on-primary rounded-full flex items-center justify-center hover:bg-outline transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black">
          <video
            src={video.videoUrl}
            poster={video.thumbnail}
            controls
            autoPlay
            className="w-full h-full object-contain"
          />
        </div>

        {/* Details Footer */}
        <div className="p-6 lg:p-8 bg-surface border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2 font-sans text-[10px] tracking-[0.2em] text-outline uppercase font-semibold">
              <span className="flex items-center gap-1">
                <Film className="w-3 h-3" /> {video.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {video.duration}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" /> {video.director}
              </span>
            </div>

            <h3 className="font-serif text-2xl text-primary font-normal">
              {video.title}
            </h3>

            <p className="font-sans text-xs text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
              {video.synopsis}
            </p>
          </div>

          <button
            onClick={onClose}
            className="bg-primary text-on-primary font-sans text-xs tracking-[0.15em] px-6 py-3 uppercase font-semibold hover:bg-outline transition-colors whitespace-nowrap"
          >
            CLOSE PLAYER
          </button>
        </div>

      </div>
    </div>
  );
}
