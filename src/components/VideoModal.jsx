import React from 'react';
import { X, Film, Clock, User, Sparkles } from 'lucide-react';

export default function VideoModal({ video, onClose }) {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-10 bg-black/95 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#16161a] border border-amber-500/40 overflow-hidden shadow-2xl rounded-sm text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 bg-[#0d0d0e] text-amber-400 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-black transition-colors border border-amber-500/40"
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
        <div className="p-6 lg:p-8 bg-[#16161a] border-t border-neutral-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2 font-sans text-[10px] tracking-[0.2em] text-amber-400 uppercase font-semibold">
              <span className="flex items-center gap-1 font-mono">
                <Film className="w-3.5 h-3.5 text-amber-400" /> {video.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> {video.duration || '04:30'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono">
                <User className="w-3.5 h-3.5 text-amber-400" /> DIR: {video.director || 'SIGIT IRAWAN'}
              </span>
            </div>

            <h3 className="font-serif text-2xl text-white font-normal">
              {video.title}
            </h3>

            <p className="font-sans text-xs text-neutral-400 max-w-2xl mt-1 leading-relaxed font-light">
              {video.synopsis || 'Cinematic wedding highlight film color-graded with 35mm analogue tones.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="bg-amber-500 text-black font-sans text-xs tracking-[0.18em] px-6 py-3 uppercase font-bold hover:bg-amber-400 transition-colors whitespace-nowrap border border-amber-300 rounded-xs shadow-md"
          >
            CLOSE PLAYER
          </button>
        </div>

      </div>
    </div>
  );
}
