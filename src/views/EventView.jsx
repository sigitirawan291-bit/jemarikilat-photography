import React, { useState } from 'react';
import { 
  Play, Film, Calendar, Camera, Sparkles, Send, Music, Zap, Layers, 
  Award, ExternalLink, ArrowUpRight, Volume2, VolumeX, Radio, Eye, Disc, Maximize2 
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function EventView({ onSelectPhoto, onSelectVideo, onOpenBooking }) {
  const { photos = [], videos = [], eventPackages = [], eventSettings } = useData();
  const [activeTab, setActiveTab] = useState('All');

  const safePhotos = Array.isArray(photos) ? photos : [];
  const safeVideos = Array.isArray(videos) ? videos : [];
  const safeEventPackages = Array.isArray(eventPackages) ? eventPackages : [];

  // Filter out hidden items
  const activePhotos = safePhotos.filter((p) => p && !p.isHidden);
  const activeVideos = safeVideos.filter((v) => v && !v.isHidden);

  // Event specific photos & videos
  const eventPhotos = activePhotos.filter(
    (p) => p && (
      (p.category || '').toLowerCase().includes('event') || 
      (p.category || '').toLowerCase().includes('concert') ||
      (p.category || '').toLowerCase().includes('editorial') ||
      (p.category || '').toLowerCase().includes('portrait')
    )
  );

  const eventVideos = activeVideos.filter(
    (v) => v && (
      (v.category || '').toLowerCase().includes('event') ||
      (v.category || '').toLowerCase().includes('cinema') ||
      (v.category || '').toLowerCase().includes('commercial')
    )
  );

  const categories = ['All', 'Concerts & Festivals', 'Corporate & Seminars', 'Private Galas'];

  const filteredPhotos = activeTab === 'All'
    ? eventPhotos
    : activeTab === 'Concerts & Festivals'
    ? eventPhotos.filter(p => (p.title || '').toLowerCase().includes('concert') || (p.category || '').toLowerCase().includes('concert'))
    : activeTab === 'Corporate & Seminars'
    ? eventPhotos.filter(p => (p.title || '').toLowerCase().includes('corporate') || (p.category || '').toLowerCase().includes('portrait'))
    : eventPhotos;

  const displayPhotos = filteredPhotos.length > 0 ? filteredPhotos : (eventPhotos.length > 0 ? eventPhotos : activePhotos);

  const mainEventVideo = eventVideos[0] || activeVideos[0] || {
    title: 'High-Voltage Concert Recap',
    category: 'Event Cinema',
    year: '2024',
    duration: '03:45',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-concert-crowd-with-raised-hands-41484-large.mp4',
    synopsis: 'Dokumentasi sinematik konser live stage dan festival musik dengan tata cahaya dan audio visual profesional.'
  };

  return (
    <div className="w-full bg-[#0d0d0e] text-[#f5f5f7] min-h-screen pt-28 pb-32 font-sans overflow-x-hidden">
      
      {/* IMMERSIVE AMBIENT STAGE LIGHTING */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse" />

      {/* CONTAINER */}
      <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-16 space-y-20 relative z-10">

        {/* HERO CANVAS */}
        <div className="relative rounded-sm bg-[#16161a] border border-amber-500/30 p-8 lg:p-14 shadow-2xl overflow-hidden">
          
          <div className="flex justify-between items-center w-full pb-6 border-b border-neutral-800 mb-8">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
              <span className="font-mono text-xs text-amber-300 uppercase tracking-widest font-bold">
                LIVE STAGE & CORPORATE BROADCAST
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d0d0e] border border-amber-500/30 text-amber-300">
                <Radio className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase font-semibold">
                  {eventSettings?.badgeText || 'HIGH-VOLTAGE STAGE & SUMMIT DOCUMENTARY'}
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[0.95]">
                {eventSettings?.headline || 'High-Energy Concerts & Executive Summits.'}
              </h1>

              <p className="font-sans text-xs lg:text-sm text-neutral-300 max-w-2xl leading-relaxed font-light">
                {eventSettings?.description || 'Penuturan dokumenter visual imersif untuk festival musik live, konser tur panggung utama, seminar simposium internasional, hingga gala celebration dengan grading warna obsidian berseni tinggi.'}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenBooking()}
                  className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-sans text-xs tracking-[0.25em] px-8 py-4 uppercase font-bold hover:from-amber-400 hover:to-amber-300 transition-all shadow-[0_0_25px_rgba(212,175,55,0.4)] border border-amber-300"
                >
                  RESERVE EVENT COVERAGE
                </button>
              </div>
            </div>

            {/* AUDIO-VISUAL SPECS HUD */}
            <div className="lg:col-span-4 bg-[#0d0d0e] border border-neutral-800 p-6 rounded-sm space-y-4">
              <div className="flex justify-between items-center text-xs font-mono border-b border-neutral-800 pb-3">
                <span className="text-neutral-400">AUDIO-VISUAL SPECS</span>
                <span className="text-amber-400 font-bold">4K HDR @ 60FPS</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px] font-mono text-neutral-300">
                <div className="bg-[#16161a] p-3 rounded-xs border border-neutral-800">
                  <span className="text-[9px] text-neutral-400 block uppercase">STAGES CAPTURED</span>
                  <span className="font-bold text-white text-sm">{eventSettings?.stagesCaptured || '150+ STAGES'}</span>
                </div>
                <div className="bg-[#16161a] p-3 rounded-xs border border-neutral-800">
                  <span className="text-[9px] text-neutral-400 block uppercase">DELIVERY SPEED</span>
                  <span className="font-bold text-amber-400 text-sm">{eventSettings?.deliverySpeed || '24-HOUR PRESS'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CINEMATIC AFTERMOVIE PLAYER */}
        {mainEventVideo && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-4">
              <div>
                <span className="font-sans text-[10px] tracking-[0.4em] text-amber-400 uppercase font-semibold block mb-1">
                  01 // CINEMATIC RECAP THEATER
                </span>
                <h2 className="font-serif text-3xl lg:text-4xl text-white font-normal">Featured Stage Cinema</h2>
              </div>
            </div>

            <div 
              onClick={() => onSelectVideo && onSelectVideo(mainEventVideo)}
              className="relative aspect-[21/9] w-full bg-[#070708] overflow-hidden group cursor-pointer border border-amber-500/30 rounded-sm shadow-2xl"
            >
              <video
                src={`${mainEventVideo.videoUrl}#t=1.0`}
                preload="metadata"
                muted
                playsInline
                className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 pointer-events-none"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0e] via-[#0d0d0e]/30 to-transparent flex flex-col justify-between p-6 md:p-12">
                <div className="flex justify-between items-start">
                  <span className="bg-[#0d0d0e]/90 text-amber-300 text-[10px] font-mono uppercase font-bold tracking-widest px-3 py-1.5 border border-amber-500/40 backdrop-blur-md">
                    {mainEventVideo.category} • {mainEventVideo.year || '2024'}
                  </span>
                  <div className="w-14 h-14 rounded-full bg-amber-500 text-black flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg border border-amber-300">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                <div className="space-y-2 max-w-3xl">
                  <h3 className="font-serif text-2xl md:text-4xl text-white font-normal leading-tight group-hover:text-amber-300 transition-colors">
                    {mainEventVideo.title}
                  </h3>
                  <p className="font-sans text-xs text-neutral-300 line-clamp-2 leading-relaxed font-light">
                    {mainEventVideo.synopsis}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STAGE PHOTOGRAPHY MASONRY */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-800 pb-6">
            <div>
              <span className="font-sans text-[10px] tracking-[0.4em] text-amber-400 uppercase font-semibold block mb-1">
                02 // LIVE STAGE ARCHIVE
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl text-white font-normal">Stage Photography</h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = activeTab === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`font-sans text-[11px] tracking-[0.15em] px-5 py-2.5 uppercase transition-all duration-300 rounded-xs ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black font-bold shadow-md'
                        : 'bg-[#16161a] text-neutral-400 hover:text-white border border-neutral-800'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => onSelectPhoto && onSelectPhoto(photo)}
                className="group cursor-pointer bg-[#16161a] border border-neutral-800 hover:border-amber-500/50 rounded-sm overflow-hidden relative transition-all duration-500 aspect-[4/5]"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0e] via-transparent to-transparent p-6 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <span className="bg-[#0d0d0e]/90 border border-amber-500/40 text-amber-300 font-mono text-[9px] px-3 py-1 uppercase tracking-wider backdrop-blur-md rounded-xs">
                      🎥 {photo.camera || 'SONY A7R V'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] font-sans text-amber-400 uppercase tracking-widest font-bold">
                      {photo.category} • {photo.year || '2024'}
                    </div>
                    <h4 className="font-serif text-xl text-white font-normal group-hover:text-amber-200 transition-colors">
                      {photo.title}
                    </h4>
                    <p className="font-sans text-xs text-neutral-400 font-light">
                      📍 {photo.location || 'Medan, Sumatera Utara'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EVENT PACKAGES & INVESTMENT */}
        <div className="space-y-10 bg-[#16161a] border border-neutral-800 rounded-sm p-8 lg:p-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-800 pb-6">
            <div>
              <span className="font-sans text-[10px] tracking-[0.4em] text-amber-400 uppercase font-semibold block mb-1">
                03 // EVENT COVERAGE INVESTMENT
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl text-white font-normal">Investment Packages</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {safeEventPackages.map((pkg) => (
              <div 
                key={pkg.id}
                className={`bg-[#0d0d0e] border p-8 flex flex-col justify-between rounded-sm relative transition-all duration-300 ${
                  pkg.recommended ? 'border-amber-500 shadow-xl' : 'border-neutral-800'
                }`}
              >
                {pkg.recommended && (
                  <span className="absolute -top-3.5 left-6 bg-gradient-to-r from-amber-500 to-amber-400 text-black text-[9px] font-sans tracking-widest px-4 py-1 uppercase font-bold">
                    MOST REQUESTED CHOICE
                  </span>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl text-white font-bold">{pkg.name}</h3>
                    <p className="font-sans text-xs text-neutral-400 mt-2 leading-relaxed min-h-[40px] font-light">
                      {pkg.subtitle}
                    </p>
                  </div>

                  <div className="py-4 border-y border-neutral-800">
                    <div className="font-serif text-3xl font-bold text-amber-300">{pkg.priceIdr}</div>
                    <div className="font-mono text-[10px] text-neutral-400 uppercase mt-0.5">{pkg.priceUsd}</div>
                  </div>

                  <ul className="space-y-3 font-sans text-xs text-neutral-300 font-light">
                    {Array.isArray(pkg.features) && pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => onOpenBooking(pkg.id)}
                    className="w-full font-sans text-xs uppercase tracking-wider py-3.5 font-bold bg-amber-500 text-black border border-amber-300 hover:bg-amber-400 transition-all shadow-md"
                  >
                    BOOK THIS EVENT PACKAGE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
