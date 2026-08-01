import React, { useState } from 'react';
import { 
  Play, Film, Calendar, Camera, Sparkles, Send, Music, Zap, Layers, 
  Award, ExternalLink, ArrowUpRight, Volume2, VolumeX, Radio, Eye, Disc, Maximize2 
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function EventView({ onSelectPhoto, onSelectVideo, onOpenBooking }) {
  const { photos = [], videos = [], eventPackages = [], eventSettings } = useData();
  const [activeTab, setActiveTab] = useState('All');
  const [stageVibe, setStageVibe] = useState('purple'); // 'purple' | 'amber' | 'cyan'
  const [isAudioSimulated, setIsAudioSimulated] = useState(false);

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
    year: '2026',
    duration: '03:45',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-concert-crowd-with-raised-hands-41484-large.mp4',
    synopsis: 'Dokumentasi sinematik konser live stage dan festival musik dengan tata cahaya dan audio visual profesional.'
  };

  // Stage Vibe Dynamic Lighting Classes
  const vibeGradients = {
    purple: 'from-purple-950/90 via-neutral-950 to-neutral-950 border-purple-800/50 shadow-purple-950/80',
    amber: 'from-amber-950/90 via-neutral-950 to-neutral-950 border-amber-800/50 shadow-amber-950/80',
    cyan: 'from-cyan-950/90 via-neutral-950 to-neutral-950 border-cyan-800/50 shadow-cyan-950/80'
  };

  const vibeAccents = {
    purple: 'text-purple-400 border-purple-500 bg-purple-600 hover:bg-purple-700 shadow-purple-900/60',
    amber: 'text-amber-400 border-amber-500 bg-amber-600 hover:bg-amber-700 shadow-amber-900/60',
    cyan: 'text-cyan-400 border-cyan-500 bg-cyan-600 hover:bg-cyan-700 shadow-cyan-900/60'
  };

  return (
    <div className="w-full bg-neutral-950 text-neutral-100 min-h-screen pt-24 pb-32 selection:bg-purple-600 selection:text-white font-sans overflow-x-hidden">
      
      {/* IMMERSIVE AMBIENT STAGE LIGHTING BEAMS */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse" />
      <div className="fixed bottom-1/3 right-10 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* FLUID CONTAINER SYSTEM */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 space-y-24 relative z-10">

        {/* --- SECTION 1: IMMERSIVE AUDIO-VISUAL HERO CANVAS --- */}
        <div className={`relative rounded-3xl bg-gradient-to-b ${vibeGradients[stageVibe]} border p-8 lg:p-16 shadow-2xl transition-all duration-700 overflow-hidden`}>
          
          {/* Equalizer Audio Visualizer Sim Bar */}
          <div className="flex justify-between items-center w-full pb-6 border-b border-neutral-800/80 mb-8">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="font-mono text-xs text-neutral-300 uppercase tracking-widest font-bold">
                LIVE STAGE BROADCAST • IMMERSIVE SYSTEM
              </span>
            </div>

            {/* Stage Vibe Ambient Lighting Controller */}
            <div className="flex items-center gap-2 bg-neutral-900/90 p-1.5 rounded-full border border-neutral-800 backdrop-blur-md">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider px-2 hidden sm:inline">STAGE AMBIENCE:</span>
              <button
                onClick={() => setStageVibe('purple')}
                className={`w-5 h-5 rounded-full bg-purple-600 transition-transform ${stageVibe === 'purple' ? 'scale-125 ring-2 ring-white' : 'opacity-60'}`}
                title="Obsidian Laser Purple"
              />
              <button
                onClick={() => setStageVibe('amber')}
                className={`w-5 h-5 rounded-full bg-amber-500 transition-transform ${stageVibe === 'amber' ? 'scale-125 ring-2 ring-white' : 'opacity-60'}`}
                title="Gold Festival Amber"
              />
              <button
                onClick={() => setStageVibe('cyan')}
                className={`w-5 h-5 rounded-full bg-cyan-400 transition-transform ${stageVibe === 'cyan' ? 'scale-125 ring-2 ring-white' : 'opacity-60'}`}
                title="Corporate Summit Cyan"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-700/60 backdrop-blur-md">
                <Radio className={`w-3.5 h-3.5 ${vibeAccents[stageVibe].split(' ')[0]} animate-spin`} />
                <span className="font-mono text-[10px] text-neutral-200 tracking-[0.25em] uppercase font-semibold">
                  {eventSettings?.badgeText || 'HIGH-VOLTAGE STAGE & SUMMIT DOCUMENTARY'}
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-8xl font-normal text-white tracking-tight leading-[0.95]">
                {eventSettings?.headline || 'High-Energy Concerts & Executive Summits.'}
              </h1>

              <p className="font-sans text-xs lg:text-sm text-neutral-300 max-w-2xl leading-relaxed">
                {eventSettings?.description || 'Penuturan dokumenter visual Imersif untuk festival musik live, konser tur panggung utama, seminar simposium internasional, hingga gala celebration dengan grading warna obsidian berseni tinggi.'}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenBooking()}
                  className={`font-sans text-xs tracking-[0.15em] font-semibold px-8 py-4 border text-white transition-all uppercase shadow-xl flex items-center gap-2 group ${vibeAccents[stageVibe]}`}
                >
                  RESERVE EVENT COVERAGE <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => setIsAudioSimulated(!isAudioSimulated)}
                  className="font-sans text-xs tracking-[0.15em] font-semibold px-6 py-4 bg-neutral-900 text-neutral-300 border border-neutral-800 hover:bg-neutral-800 hover:text-white transition-all uppercase flex items-center gap-2"
                >
                  {isAudioSimulated ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4" />}
                  {isAudioSimulated ? 'SOUND SIMULATOR ON' : 'ENABLE SOUND SIMULATOR'}
                </button>
              </div>
            </div>

            {/* IMMERSIVE LIVE AUDIO STAGE TELEMETRY HUD */}
            <div className="lg:col-span-4 bg-neutral-950/80 border border-neutral-800 p-6 rounded-2xl backdrop-blur-md space-y-4">
              <div className="flex justify-between items-center text-xs font-mono border-b border-neutral-800 pb-3">
                <span className="text-neutral-400">AUDIO-VISUAL SPECS</span>
                <span className="text-purple-400 font-bold">4K HDR @ 60FPS</span>
              </div>

              {/* Animated Equalizer Visualizer */}
              <div className="flex items-end justify-between gap-1 h-12 py-1 px-2 bg-neutral-900 rounded border border-neutral-800">
                {[60, 90, 45, 100, 75, 55, 95, 80, 40, 85, 100, 65, 90, 50, 70, 85].map((h, i) => (
                  <div 
                    key={i} 
                    className={`w-full rounded-t transition-all duration-300 ${isAudioSimulated ? 'bg-purple-500 animate-pulse' : 'bg-neutral-700'}`}
                    style={{ height: isAudioSimulated ? `${Math.floor(Math.random() * 80 + 20)}%` : `${h}%` }}
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px] font-mono text-neutral-300">
                <div className="bg-neutral-900 p-2.5 rounded border border-neutral-800">
                  <span className="text-[9px] text-neutral-400 block uppercase">STAGES CAPTURED</span>
                  <span className="font-bold text-white text-sm">{eventSettings?.stagesCaptured || '150+ STAGES'}</span>
                </div>
                <div className="bg-neutral-900 p-2.5 rounded border border-neutral-800">
                  <span className="text-[9px] text-neutral-400 block uppercase">DELIVERY SPEED</span>
                  <span className="font-bold text-purple-400 text-sm">{eventSettings?.deliverySpeed || '24-HOUR PRESS'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: IMMERSIVE THEATER AFTERMOVIE PLAYER SHOWCASE --- */}
        {mainEventVideo && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-900 pb-4">
              <div>
                <span className="font-sans text-[10px] tracking-[0.4em] text-purple-400 uppercase font-semibold block mb-1">
                  01 // CINEMATIC RECAP THEATER
                </span>
                <h2 className="font-serif text-3xl lg:text-4xl text-white font-normal">Featured Stage Cinema</h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-neutral-400">STAGE DURATION: {mainEventVideo.duration}</span>
              </div>
            </div>

            <div 
              onClick={() => onSelectVideo(mainEventVideo)}
              className="relative aspect-[21/9] w-full bg-neutral-900 overflow-hidden group cursor-pointer border border-neutral-800 rounded-2xl shadow-2xl hover:border-purple-500/80 transition-all duration-700"
            >
              <video
                src={`${mainEventVideo.videoUrl}#t=1.0`}
                preload="metadata"
                muted
                playsInline
                className="w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700 pointer-events-none"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-between p-6 md:p-12">
                <div className="flex justify-between items-start">
                  <span className="bg-purple-950/90 text-purple-200 text-[10px] font-sans uppercase font-bold tracking-widest px-3 py-1.5 border border-purple-700/60 backdrop-blur-md">
                    {mainEventVideo.category} • {mainEventVideo.year}
                  </span>
                  <div className="w-14 h-14 rounded-full bg-purple-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl shadow-purple-600/80 ring-4 ring-purple-500/30">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                <div className="space-y-3 max-w-3xl">
                  <div className="inline-flex items-center gap-2 text-xs font-sans text-purple-300 font-semibold uppercase tracking-widest">
                    <Disc className="w-4 h-4 animate-spin text-purple-400" /> CLICK TO LAUNCH IMMERSIVE VIDEO THEATER
                  </div>
                  <h3 className="font-serif text-2xl md:text-5xl text-white font-normal leading-tight">
                    {mainEventVideo.title}
                  </h3>
                  <p className="font-sans text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                    {mainEventVideo.synopsis}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- SECTION 3: IMMERSIVE STAGE PHOTOGRAPHY MASONRY & TELEMETRY --- */}
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-900 pb-6">
            <div>
              <span className="font-sans text-[10px] tracking-[0.4em] text-purple-400 uppercase font-semibold block mb-1">
                02 // LIVE STAGE ARCHIVE
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl text-white font-normal">Stage Photography Telemetry</h2>
            </div>

            {/* Immersive Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 bg-neutral-900/90 p-1.5 rounded-full border border-neutral-800 backdrop-blur-md">
              {categories.map((cat) => {
                const isActive = activeTab === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`font-sans text-[11px] tracking-[0.15em] px-5 py-2.5 rounded-full uppercase transition-all duration-300 ${
                      isActive
                        ? 'bg-purple-600 text-white font-semibold shadow-lg shadow-purple-950/80'
                        : 'bg-transparent text-neutral-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fluid Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {displayPhotos.map((photo, index) => {
              const isWide = index % 3 === 0;
              return (
                <div
                  key={photo.id}
                  onClick={() => onSelectPhoto(photo)}
                  className={`group cursor-pointer bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden relative transition-all duration-500 ease-out hover:border-purple-500/80 hover:shadow-[0_25px_50px_-12px_rgba(147,51,234,0.3)] hover:[transform:perspective(1000px)_rotateX(3deg)_rotateY(-3deg)_translateZ(20px)] ${
                    isWide ? 'md:col-span-8 aspect-[16/10]' : 'md:col-span-4 aspect-[4/5]'
                  }`}
                >
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800'; }}
                  />

                  {/* 3D Laser Sheen Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20" />

                  {/* Telemetry Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                      <span className="bg-neutral-950/90 border border-purple-500/50 text-purple-300 font-mono text-[9px] px-3 py-1 uppercase tracking-wider backdrop-blur-md rounded-full flex items-center gap-1.5 shadow-xl">
                        <Camera className="w-3 h-3 text-purple-400" /> {photo.camera || 'SONY A7R V'} • {photo.lens || '85MM F/1.4'}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-xl">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] font-sans text-purple-300 uppercase tracking-widest font-bold">
                        {photo.category} • {photo.year}
                      </div>
                      <h4 className="font-serif text-2xl text-white font-medium drop-shadow-md">
                        {photo.title}
                      </h4>
                      <p className="font-sans text-xs text-neutral-300">
                        📍 {photo.location || 'Medan, Sumatera Utara'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- SECTION 4: IMMERSIVE EVENT PACKAGES & INVESTMENT --- */}
        <div className="space-y-12 bg-gradient-to-b from-neutral-900/80 to-neutral-950 border border-neutral-800 rounded-3xl p-8 lg:p-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-800 pb-6">
            <div>
              <span className="font-sans text-[10px] tracking-[0.4em] text-purple-400 uppercase font-semibold block mb-1">
                03 // EVENT COVERAGE INVESTMENT
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl text-white font-normal">Investment Packages</h2>
            </div>
            <p className="font-sans text-xs text-neutral-400 max-w-md">
              Paket dokumentasi foto & video profesional untuk seminar korporat, konser musik, dan gala night dengan jaminan penyerahan express.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {safeEventPackages.map((pkg) => (
              <div 
                key={pkg.id}
                className={`bg-neutral-950 border p-8 flex flex-col justify-between rounded-2xl relative transition-all duration-300 ${
                  pkg.recommended ? 'border-purple-500 shadow-2xl shadow-purple-950/80 ring-1 ring-purple-500/50' : 'border-neutral-800'
                }`}
              >
                {pkg.recommended && (
                  <span className="absolute -top-3.5 left-8 bg-purple-600 text-white text-[9px] font-sans tracking-widest px-4 py-1 uppercase font-bold rounded-full">
                    MOST REQUESTED STAGE CHOICE
                  </span>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl text-white font-bold">{pkg.name}</h3>
                    <p className="font-sans text-xs text-neutral-400 mt-2 leading-relaxed min-h-[40px]">
                      {pkg.subtitle}
                    </p>
                  </div>

                  <div className="py-4 border-y border-neutral-800">
                    <div className="font-serif text-3xl font-bold text-purple-400">{pkg.priceIdr}</div>
                    <div className="font-mono text-[10px] text-neutral-400 uppercase mt-0.5">{pkg.priceUsd}</div>
                  </div>

                  <ul className="space-y-3 font-sans text-xs text-neutral-300">
                    {Array.isArray(pkg.features) && pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-purple-400 font-bold">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => onOpenBooking(pkg.id)}
                    className={`w-full font-sans text-xs uppercase tracking-wider py-4 font-bold rounded-none transition-all ${
                      pkg.recommended
                        ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-950/80'
                        : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700 hover:text-white'
                    }`}
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
