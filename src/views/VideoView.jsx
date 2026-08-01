import React, { useState } from 'react';
import { Play, Sparkles, Clock, Film, User, Search } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function VideoView({ onSelectVideo, onOpenBooking }) {
  const { videos = [] } = useData();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const safeVideos = Array.isArray(videos) ? videos : [];
  const categories = ['All', 'Wedding Film', 'Prewedding Reel', 'Graduation Film', 'Commercial Film'];

  const filteredVideos = safeVideos.filter((v) => {
    const matchesCat = activeCategory === 'All' || (v.category && v.category.toLowerCase().includes(activeCategory.toLowerCase()));
    const matchesSearch = !searchQuery || 
      v.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      v.director?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full pt-28 pb-24 px-6 lg:px-16 bg-[#0d0d0e] text-white min-h-screen font-sans">
      <div className="max-w-[1440px] mx-auto space-y-14">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="font-sans text-[10px] tracking-[0.4em] text-[#d4af37] uppercase block font-bold">
            MOTION PICTURES & CINEMA
          </span>
          <h1 className="font-sans text-4xl lg:text-6xl text-white font-extrabold">
            Cinematic Highlights
          </h1>
          <p className="font-sans text-xs text-neutral-400 leading-relaxed font-normal">
            Koleksi video klip pernikahan sinematik, film pendek wisuda, dan reel komersial yang di-grading warna analog 35mm.
          </p>
        </div>

        {/* Category Tabs & Search Bar */}
        <div className="py-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-sans text-xs tracking-[0.2em] px-4 py-2.5 uppercase font-bold transition-all rounded-xs ${
                    isActive ? 'bg-[#d4af37] text-black shadow-lg' : 'bg-[#141417] text-neutral-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari video film..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141417] text-xs text-white pl-10 pr-4 py-2.5 rounded-xs focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
            />
          </div>
        </div>

        {/* BORDERLESS VIDEO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => onSelectVideo && onSelectVideo(video)}
              className="bg-[#141417] overflow-hidden group cursor-pointer shadow-2xl transition-all duration-300 flex flex-col justify-between rounded-xs"
            >
              <div className="relative aspect-video bg-black overflow-hidden">
                <video 
                  src={video.videoUrl}
                  poster={video.thumbnail}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  muted
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0e] via-transparent to-black/40" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#d4af37] text-black flex items-center justify-center pl-0.5 group-hover:scale-110 transition-transform shadow-2xl">
                    <Play className="w-6 h-6 fill-current" />
                  </div>
                </div>

                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 text-[#d4af37] text-[9px] font-mono tracking-widest uppercase">
                  {video.category || 'CINEMA'}
                </div>

                {video.duration && (
                  <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-0.5 text-white text-[9px] font-mono">
                    {video.duration}
                  </div>
                )}
              </div>

              <div className="p-6 space-y-2">
                <h3 className="font-sans text-lg text-white font-bold leading-snug group-hover:text-[#d4af37] transition-colors">
                  {video.title}
                </h3>
                <p className="font-sans text-xs text-neutral-400 line-clamp-2 font-normal leading-relaxed">
                  {video.synopsis || 'Cinematic film highlight.'}
                </p>
                <div className="pt-2 flex justify-between items-center text-[10px] font-mono text-neutral-500 border-t border-neutral-800">
                  <span>DIRECTOR: {video.director || 'JEMARI KILAT'}</span>
                  <span>{video.year || '2024'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="py-24 text-center space-y-4 bg-[#141417] p-12 rounded-xs">
            <div className="w-16 h-16 bg-[#0d0d0e] text-neutral-400 rounded-full flex items-center justify-center mx-auto text-2xl">
              🎬
            </div>
            <h3 className="font-sans text-2xl text-white font-bold">Tidak ada video ditemukan</h3>
            <p className="font-sans text-xs text-neutral-400">Coba ubah filter kategori atau kata kunci pencarian.</p>
          </div>
        )}

      </div>
    </div>
  );
}
