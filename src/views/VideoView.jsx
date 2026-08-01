import React from 'react';
import { Play, Film, Clock, User, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function VideoView({ onSelectVideo }) {
  const { videos = [] } = useData();
  const activeVideos = videos.filter((v) => !v.isHidden);
  const mainVideo = activeVideos[0] || videos[0];

  return (
    <div className="w-full pt-28 pb-24 bg-[#0d0d0e] text-[#f5f5f7] min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-sans text-[10px] tracking-[0.4em] text-amber-400 uppercase block font-semibold">
            MOTION PICTURES & CINEMA
          </span>
          <h1 className="font-serif text-4xl lg:text-6xl text-white font-normal">
            Cinematic Films
          </h1>
          <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light">
            Film dokumenter pernikahan, prewedding sinematik 35mm, dan video campaign komersial berkelas tinggi.
          </p>
        </div>

        {/* Featured Main Cinema Banner */}
        {mainVideo && (
          <div className="mb-16">
            <div 
              onClick={() => onSelectVideo && onSelectVideo(mainVideo)}
              className="relative aspect-[21/9] w-full bg-[#070708] overflow-hidden group cursor-pointer border border-amber-500/30 rounded-sm shadow-2xl"
            >
              <video
                src={`${mainVideo.videoUrl}#t=1.0`}
                preload="metadata"
                muted
                playsInline
                className="w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-all duration-700 group-hover:scale-105 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0e] via-[#0d0d0e]/30 to-[#0d0d0e]/40" />

              {/* Top Telemetry Overlay Bar */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-center text-[10px] font-mono tracking-widest text-white z-20">
                <span className="bg-[#0d0d0e]/85 backdrop-blur-md px-3.5 py-1.5 border border-amber-500/40 text-amber-300 font-bold uppercase shadow-lg">
                  <Sparkles className="w-3 h-3 inline mr-1 text-amber-400" /> FEATURED FILM • {mainVideo.category} • {mainVideo.year}
                </span>
                <span className="bg-[#0d0d0e]/85 backdrop-blur-md px-3.5 py-1.5 border border-amber-500/40 font-mono text-amber-400">
                  ⏱️ {mainVideo.duration || '05:00'}
                </span>
              </div>

              {/* Big Play Button */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-20 h-20 rounded-full bg-amber-500 text-black flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(212,175,55,0.6)] border border-amber-300">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
              </div>

              {/* Bottom Synopsis Bar */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 text-white z-20">
                <div className="max-w-2xl space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block font-bold">
                    DIRECTOR: {mainVideo.director || 'SIGIT IRAWAN'}
                  </span>
                  <h2 className="font-serif text-2xl lg:text-4xl text-white font-normal group-hover:text-amber-300 transition-colors">
                    {mainVideo.title}
                  </h2>
                  <p className="font-sans text-xs text-neutral-300 line-clamp-1 font-light">
                    {mainVideo.synopsis}
                  </p>
                </div>
                
                <span className="font-sans text-xs tracking-[0.2em] px-6 py-3 bg-amber-500 text-black font-bold uppercase shrink-0 shadow-lg border border-amber-300">
                  WATCH FULL FILM
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => onSelectVideo && onSelectVideo(video)}
              className="group cursor-pointer relative overflow-hidden bg-[#16161a] shadow-xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] transition-all duration-500 border border-neutral-800 hover:border-amber-500/50 rounded-sm aspect-[16/10] flex flex-col justify-between"
            >
              {/* Video Element */}
              <video
                src={`${video.videoUrl}#t=1.0`}
                preload="metadata"
                muted
                playsInline
                className="w-full h-full object-cover opacity-75 group-hover:opacity-90 transition-all duration-700 group-hover:scale-105 pointer-events-none"
              />
              
              {/* Glass Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20" />

              {/* Top Overlay */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[9.5px] font-mono tracking-widest uppercase z-10">
                <span className="bg-[#0d0d0e]/90 backdrop-blur-md px-3 py-1 text-amber-300 border border-amber-500/40 font-bold shadow-lg">
                  🎬 {video.category} • {video.year || '2024'}
                </span>
                <span className="bg-[#0d0d0e]/90 backdrop-blur-md px-2.5 py-1 text-amber-400 font-mono shadow-lg">
                  ⏱️ {video.duration || '04:00'}
                </span>
              </div>

              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-14 h-14 rounded-full bg-amber-500/90 text-black flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current ml-0.5 text-black" />
                </div>
              </div>

              {/* Bottom Title Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0d0d0e] via-[#0d0d0e]/80 to-transparent p-6 text-white space-y-1 z-10">
                <span className="font-sans text-[10px] text-amber-400 uppercase tracking-widest block font-bold">
                  DIRECTOR: {video.director || 'SIGIT IRAWAN'}
                </span>
                <h3 className="font-serif text-xl text-white font-normal leading-snug drop-shadow-md group-hover:text-amber-200 transition-colors">
                  {video.title}
                </h3>
                <p className="font-sans text-xs text-neutral-400 line-clamp-1 font-light">
                  {video.synopsis}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
