import React from 'react';
import { Play, Film, Clock, User } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function VideoView({ onSelectVideo }) {
  const { videos } = useData();
  const activeVideos = videos.filter((v) => !v.isHidden);
  const mainVideo = activeVideos[0] || videos[0];

  return (
    <div className="w-full pt-28 pb-24 bg-background min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="font-sans text-[10px] tracking-[0.4em] text-outline uppercase block mb-2 font-semibold">
            MOTION PICTURES
          </span>
          <h1 className="font-serif text-4xl lg:text-6xl text-primary font-normal mb-4">
            Cinematic Films
          </h1>
          <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
            35mm analogue-inspired motion pictures, documentary wedding cinema, and editorial fashion films.
          </p>
        </div>

        {/* Featured Video Showcase Banner with Immersive Motion HUD */}
        <div className="mb-20">
          <div 
            onClick={() => onSelectVideo(mainVideo)}
            className="relative aspect-[21/9] w-full bg-primary overflow-hidden group cursor-pointer border border-outline-variant/40 shadow-2xl"
          >
            <video
              src={`${mainVideo.videoUrl}#t=1.0`}
              preload="metadata"
              muted
              playsInline
              className="w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-all duration-700 group-hover:scale-105 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-primary/40" />

            {/* Top Telemetry Overlay Bar */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center text-[10px] font-mono tracking-widest text-on-primary/90">
              <span className="bg-primary/80 px-3 py-1 border border-on-primary/20 uppercase font-bold">
                {mainVideo.category} • {mainVideo.year}
              </span>
              <span className="bg-primary/80 px-3 py-1 border border-on-primary/20 font-mono">
                ⏱️ DURATION: {mainVideo.duration}
              </span>
            </div>

            {/* Centered Big Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-surface/90 text-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl ring-4 ring-on-primary/20">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
            </div>

            {/* Bottom Synopsis Bar */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 text-on-primary">
              <div className="max-w-2xl space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 block font-bold">
                  DIRECTOR: {mainVideo.director || 'SIGIT IRAWAN'}
                </span>
                <h2 className="font-serif text-2xl lg:text-4xl text-on-primary font-normal">{mainVideo.title}</h2>
                <p className="font-sans text-xs text-outline-variant line-clamp-1">{mainVideo.synopsis}</p>
              </div>
              
              <span className="font-sans text-xs tracking-[0.2em] px-5 py-2.5 bg-on-primary text-primary font-semibold uppercase shrink-0 shadow-lg">
                WATCH FILM NOW
              </span>
            </div>
          </div>
        </div>

        {/* Pure Video Grid Layout (Tanpa Border/Box Bawah) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => onSelectVideo(video)}
              className="group cursor-pointer relative overflow-hidden bg-primary shadow-xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] transition-all duration-500 ease-out border border-outline-variant/30 aspect-[16/10] hover:[transform:perspective(1000px)_rotateX(3deg)_rotateY(-3deg)_translateZ(18px)] rounded-sm"
            >
              {/* Video Element */}
              <video
                src={`${video.videoUrl}#t=1.0`}
                preload="metadata"
                muted
                playsInline
                className="w-full h-full object-cover opacity-75 group-hover:opacity-90 transition-all duration-700 group-hover:scale-105 pointer-events-none"
              />
              
              {/* 3D Glass Light Sheen Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20" />

              {/* Top 3D Telemetry Overlay */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono tracking-widest uppercase z-10">
                <span className="bg-primary/85 backdrop-blur-md px-3 py-1 text-on-primary border border-on-primary/20 shadow-xl">
                  🎬 {video.category} • {video.year}
                </span>
                <span className="bg-primary/85 backdrop-blur-md px-3 py-1 text-amber-300 font-bold border border-on-primary/20 shadow-xl">
                  ⏱️ {video.duration}
                </span>
              </div>

              {/* Centered 3D Hover Play Ring */}
              <div className="absolute inset-0 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-all group-hover:scale-110 z-10">
                <div className="w-14 h-14 rounded-full bg-surface/90 text-primary flex items-center justify-center shadow-2xl ring-4 ring-on-primary/30">
                  <Play className="w-6 h-6 fill-current ml-1 text-primary" />
                </div>
              </div>

              {/* Bottom Permanent 3D Shaded Title & Director Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent p-6 text-on-primary space-y-1 z-10">
                <span className="font-sans text-[10px] text-amber-300 uppercase tracking-widest block font-bold">
                  DIRECTOR: {video.director || 'SIGIT IRAWAN'}
                </span>
                <h3 className="font-serif text-xl text-on-primary font-normal leading-snug drop-shadow-md">
                  {video.title}
                </h3>
                <p className="font-sans text-xs text-outline-variant line-clamp-1">
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
