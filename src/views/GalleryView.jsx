import React, { useState, useEffect } from 'react';
import { Eye, Filter, ChevronLeft, ChevronRight, Sliders, Sparkles, Camera, Search } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function GalleryView({ onSelectPhoto }) {
  const { photos } = useData();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = ['All', 'Wedding', 'Graduation', 'Prewedding', 'Editorial'];

  // Non-hidden photos
  const activePhotos = Array.isArray(photos) ? photos.filter((p) => !p.isHidden) : [];

  // Photos allowed to display in the main gallery grid
  const galleryPhotos = activePhotos.filter((p) => p.showInGallery !== false);

  // Carousel set: items marked inGalleryCarousel first, or active photos fallback
  const carouselPhotos = activePhotos.filter((p) => p.inGalleryCarousel);
  const activeCarousel = carouselPhotos.length > 0 ? carouselPhotos : activePhotos.slice(0, 8);

  // Auto-scroll Carousel every 4 seconds
  useEffect(() => {
    if (activeCarousel.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeCarousel.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeCarousel.length]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activeCarousel.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activeCarousel.length) % activeCarousel.length);
  };

  // Filter photos by category and search query
  const filteredPhotos = galleryPhotos.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category?.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = !searchQuery || 
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.client?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeSlidePhoto = activeCarousel[currentSlide] || activeCarousel[0];

  return (
    <div className="w-full pt-20 pb-24 bg-[#0d0d0e] text-[#f5f5f7] min-h-screen">
      
      {/* ========================================================================= */}
      {/* 1. FULL-BLEED EDITORIAL SLIDESHOW CAROUSEL                                 */}
      {/* ========================================================================= */}
      {activeCarousel.length > 0 && activeSlidePhoto && (
        <div className="w-full relative mb-16 overflow-hidden bg-[#070708] border-b border-amber-500/20 shadow-2xl">
          
          <div className="relative h-[60vh] lg:h-[78vh] w-full overflow-hidden group">
            {/* Auto-sliding Images Stack */}
            {activeCarousel.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                    isActive ? 'opacity-100 scale-100 z-10 pointer-events-auto' : 'opacity-0 scale-105 z-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0e] via-[#0d0d0e]/30 to-[#0d0d0e]/40" />
                </div>
              );
            })}

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 text-amber-400 border border-amber-500/30 flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all shadow-2xl z-30"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 text-amber-400 border border-amber-500/30 flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all shadow-2xl z-30"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Top Indicator Badge */}
            <div className="absolute top-6 left-6 lg:left-12 right-6 lg:right-12 flex justify-between items-center z-20 text-xs font-sans tracking-wider uppercase text-white">
              <span className="flex items-center gap-2 font-semibold bg-[#0d0d0e]/85 backdrop-blur-md px-4 py-2 border border-amber-500/30 text-amber-300 text-[10px] tracking-widest shadow-xl">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> EDITORIAL CAROUSEL
              </span>
              <span className="font-mono bg-[#0d0d0e]/85 backdrop-blur-md px-4 py-2 border border-amber-500/30 text-amber-400 font-bold text-[11px] shadow-xl">
                {String(currentSlide + 1).padStart(2, '0')} / {String(activeCarousel.length).padStart(2, '0')}
              </span>
            </div>

            {/* Slide Metadata Overlay */}
            <div className="absolute bottom-8 left-6 lg:left-12 right-6 lg:right-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-white z-20">
              <div className="space-y-2 max-w-3xl">
                <span className="font-mono text-xs tracking-widest text-amber-400 uppercase block font-bold">
                  {activeSlidePhoto.category} • {activeSlidePhoto.year || '2024'} • {activeSlidePhoto.camera || 'SONY A7R V'}
                </span>
                <h2 
                  onClick={() => onSelectPhoto && onSelectPhoto(activeSlidePhoto)}
                  className="font-serif text-3xl lg:text-5xl text-white font-normal leading-tight hover:text-amber-300 transition-colors cursor-pointer"
                >
                  {activeSlidePhoto.title}
                </h2>
                <p className="font-sans text-xs text-neutral-300 line-clamp-2 max-w-2xl font-light">
                  📍 {activeSlidePhoto.location} — {activeSlidePhoto.description || 'Obsidian & Ivory fine-art photograph.'}
                </p>
              </div>

              <button
                onClick={() => onSelectPhoto && onSelectPhoto(activeSlidePhoto)}
                className="bg-amber-500 text-black px-6 py-2.5 font-sans text-xs tracking-[0.2em] font-bold uppercase hover:bg-amber-400 transition-all border border-amber-300/40 shadow-lg"
              >
                INSPECT PHOTO
              </button>
            </div>
          </div>

          {/* Thumbnail Navigation Bar */}
          <div className="w-full bg-[#0a0a0c] border-t border-neutral-800 py-3 px-6 flex items-center justify-center gap-3 overflow-x-auto">
            {activeCarousel.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`relative w-24 aspect-[16/9] overflow-hidden border-2 transition-all duration-300 shrink-0 ${
                  currentSlide === idx 
                    ? 'border-amber-400 scale-105 shadow-xl ring-2 ring-amber-400/50 opacity-100' 
                    : 'border-neutral-800 opacity-40 hover:opacity-100'
                }`}
              >
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. GALLERY ARCHIVE HEADER & FILTERS                                       */}
      {/* ========================================================================= */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-sans text-[10px] tracking-[0.4em] text-amber-400 uppercase block font-semibold">
            PORTFOLIO ARCHIVE
          </span>
          <h1 className="font-serif text-4xl lg:text-6xl text-white font-normal">
            Fine Art Gallery
          </h1>
          <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light">
            Eksplorasi seluruh koleksi karya fotografi pernikahan, wisuda, pertunangan, dan portraiture berseni tinggi.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-neutral-800 pb-6">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-sans text-xs tracking-[0.18em] px-5 py-2.5 uppercase transition-all duration-300 rounded-xs ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black font-bold shadow-md'
                      : 'bg-[#16161a] text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search title, client..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#16161a] border border-neutral-800 focus:border-amber-400 text-xs text-white pl-10 pr-4 py-2.5 rounded-xs focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. MASONRY GALLERY GRID                                                  */}
        {/* ========================================================================= */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => onSelectPhoto && onSelectPhoto(photo)}
              className="break-inside-avoid group relative overflow-hidden bg-[#16161a] shadow-xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] transition-all duration-500 border border-neutral-800 hover:border-amber-500/50 rounded-sm cursor-pointer"
            >
              <div className="relative w-full overflow-hidden">
                <img
                  src={photo.image}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Glass Light Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[9.5px] font-mono tracking-widest uppercase z-10">
                  <span className="bg-[#0d0d0e]/90 backdrop-blur-md px-3 py-1 text-amber-300 border border-amber-500/40 font-bold shadow-lg">
                    {photo.category}
                  </span>
                  <span className="bg-[#0d0d0e]/90 backdrop-blur-md px-2.5 py-1 text-neutral-300 border border-neutral-700 shadow-lg">
                    🎥 {photo.camera || 'SONY A7R V'}
                  </span>
                </div>

                {/* Bottom Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0d0d0e] via-[#0d0d0e]/80 to-transparent p-6 text-white space-y-1 z-10">
                  <span className="font-sans text-[10px] text-amber-400 uppercase tracking-widest block font-semibold">
                    {photo.client || 'JEMARI KILAT'}
                  </span>
                  <h3 className="font-serif text-xl text-white font-normal leading-snug drop-shadow-md group-hover:text-amber-200 transition-colors">
                    {photo.title}
                  </h3>
                  <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 pt-1.5 border-t border-neutral-800">
                    <span>📍 {photo.location || 'Indonesia'}</span>
                    <span>LENS {photo.lens || '85MM F/1.4'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="py-24 text-center space-y-4">
            <div className="w-16 h-16 bg-neutral-900 text-neutral-500 rounded-full flex items-center justify-center mx-auto text-2xl">
              📷
            </div>
            <h3 className="font-serif text-2xl text-amber-400">Tidak ada foto ditemukan</h3>
            <p className="font-sans text-xs text-neutral-400">Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
          </div>
        )}

      </div>
    </div>
  );
}
