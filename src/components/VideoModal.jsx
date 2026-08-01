import React from 'react';
import { X, Film, Clock, User } from 'lucide-react';

export default function VideoModal({ video, onClose }) {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-10 bg-[#0d0d0e]/85 backdrop-blur-2xl animate-fade-in font-sans text-white">
      <div className="relative w-full max-w-5xl bg-[#141417] overflow-hidden shadow-2xl rounded-xs">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 bg-[#0d0d0e] text-[#d4af37] rounded-full flex items-center justify-center hover:bg-[#d4af37] hover:text-black transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player (Borderless) */}
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
        <div className="p-6 lg:p-8 bg-[#141417] border-t border-neutral-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2 font-sans text-[10px] tracking-[0.2em] text-[#d4af37] uppercase font-bold">
              <span className="flex items-center gap-1 font-mono">
                <Film className="w-3.5 h-3.5" /> {video.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5" /> {video.duration || '04:30'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono">
                <User className="w-3.5 h-3.5" /> DIR: {video.director || 'SIGIT IRAWAN'}
              </span>
            </div>

            <h3 className="font-sans text-2xl text-white font-extrabold">
              {video.title}
            </h3>

            <p className="font-sans text-xs text-neutral-400 max-w-2xl mt-1 leading-relaxed font-normal">
              {video.synopsis || 'Cinematic wedding highlight film color-graded with 35mm analogue tones.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="bg-[#d4af37] text-black font-sans text-xs tracking-[0.18em] px-6 py-3 uppercase font-bold hover:bg-[#f3e5ab] transition-colors whitespace-nowrap rounded-xs shadow-lg"
          >
            CLOSE PLAYER
          </button>
        </div>

      </div>
    </div>
  );
}
