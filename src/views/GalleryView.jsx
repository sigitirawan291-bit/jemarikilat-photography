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
    <div className="w-full pt-20 pb-24 bg-[#FAF8F5] text-[#1A1A1A] min-h-screen">
      
      {/* ========================================================================= */}
      {/* 1. FULL-BLEED EDITORIAL SLIDESHOW CAROUSEL                                 */}
      {/* ========================================================================= */}
      {activeCarousel.length > 0 && activeSlidePhoto && (
        <div className="w-full relative mb-16 overflow-hidden bg-[#121214] border-b border-[#E5E0D8] shadow-sm">
          
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
                    className="w-full h-full object-cover opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/30 to-[#121214]/40" />
                </div>
              );
            })}

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 text-[#1A1A1A] border border-[#E5E0D8] flex items-center justify-center hover:bg-[#C5A880] hover:text-black transition-all shadow-xl z-30"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 text-[#1A1A1A] border border-[#E5E0D8] flex items-center justify-center hover:bg-[#C5A880] hover:text-black transition-all shadow-xl z-30"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Top Indicator Badge */}
            <div className="absolute top-6 left-6 lg:left-12 right-6 lg:right-12 flex justify-between items-center z-20 text-xs font-sans tracking-wider uppercase text-white">
              <span className="flex items-center gap-2 font-semibold bg-[#1A1A1A]/85 backdrop-blur-md px-4 py-2 border border-[#C5A880]/40 text-[#C5A880] text-[10px] tracking-widest shadow-xl">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880] animate-pulse" /> EDITORIAL CAROUSEL
              </span>
              <span className="font-mono bg-[#1A1A1A]/85 backdrop-blur-md px-4 py-2 border border-[#C5A880]/40 text-[#C5A880] font-bold text-[11px] shadow-xl">
                {String(currentSlide + 1).padStart(2, '0')} / {String(activeCarousel.length).padStart(2, '0')}
              </span>
            </div>

            {/* Slide Metadata Overlay */}
            <div className="absolute bottom-8 left-6 lg:left-12 right-6 lg:right-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-white z-20">
              <div className="space-y-2 max-w-3xl">
                <span className="font-mono text-xs tracking-widest text-[#C5A880] uppercase block font-bold">
                  {activeSlidePhoto.category} • {activeSlidePhoto.year || '2024'} • {activeSlidePhoto.camera || 'SONY A7R V'}
                </span>
                <h2 
                  onClick={() => onSelectPhoto && onSelectPhoto(activeSlidePhoto)}
                  className="font-serif text-3xl lg:text-5xl text-white font-normal leading-tight hover:text-[#C5A880] transition-colors cursor-pointer"
                >
                  {activeSlidePhoto.title}
                </h2>
                <p className="font-sans text-xs text-neutral-300 line-clamp-2 max-w-2xl font-light">
                  📍 {activeSlidePhoto.location} — {activeSlidePhoto.description || 'Fine-art photograph.'}
                </p>
              </div>

              <button
                onClick={() => onSelectPhoto && onSelectPhoto(activeSlidePhoto)}
                className="bg-[#C5A880] text-black px-6 py-2.5 font-sans text-xs tracking-[0.2em] font-bold uppercase hover:bg-[#D8C09D] transition-all border border-[#C5A880] shadow-lg"
              >
                INSPECT PHOTO
              </button>
            </div>
          </div>

          {/* Thumbnail Navigation Bar */}
          <div className="w-full bg-[#1A1A1A] border-t border-neutral-800 py-3 px-6 flex items-center justify-center gap-3 overflow-x-auto">
            {activeCarousel.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`relative w-24 aspect-[16/9] overflow-hidden border-2 transition-all duration-300 shrink-0 ${
                  currentSlide === idx 
                    ? 'border-[#C5A880] scale-105 shadow-xl ring-2 ring-[#C5A880]/50 opacity-100' 
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
      {/* 2. GALLERY ARCHIVE HEADER & BOUNDED AXIOO TAB MENU BAR                    */}
      {/* ========================================================================= */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-sans text-[10px] tracking-[0.4em] text-[#C5A880] uppercase block font-bold">
            PORTFOLIO ARCHIVE
          </span>
          <h1 className="font-serif text-4xl lg:text-6xl text-[#1A1A1A] font-normal">
            Fine Art Gallery
          </h1>
          <p className="font-sans text-xs text-[#666158] leading-relaxed font-light">
            Eksplorasi seluruh koleksi karya fotografi pernikahan, wisuda, pertunangan, dan portraiture berseni tinggi.
          </p>
        </div>

        {/* AXIOO SIGNATURE BOUNDED 1PX SAND TAB MENU BAR */}
        <div className="axioo-tab-border py-4 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 lg:gap-4">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-sans text-xs tracking-[0.2em] px-5 py-2.5 uppercase transition-all duration-300 relative ${
                    isActive
                      ? 'text-[#C5A880] font-bold'
                      : 'text-[#666158] hover:text-[#1A1A1A] font-medium'
                  }`}
                >
                  {cat}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5A880]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#7A756C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search title, client..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E5E0D8] focus:border-[#C5A880] text-xs text-[#1A1A1A] pl-10 pr-4 py-2.5 rounded-xs focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. MASONRY GALLERY GRID (AXIOO FRAMED CARDS)                              */}
        {/* ========================================================================= */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => onSelectPhoto && onSelectPhoto(photo)}
              className="break-inside-avoid group axioo-card cursor-pointer rounded-xs"
            >
              <div className="relative w-full overflow-hidden bg-[#FAF8F5]">
                <img
                  src={photo.image}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-white/95 backdrop-blur-md px-3 py-1 text-[#1A1A1A] border border-[#E5E0D8] text-[9px] font-mono tracking-widest uppercase font-bold shadow-xs">
                    {photo.category}
                  </span>
                </div>

                {/* Bottom Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 text-white space-y-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-sans text-[9px] text-[#C5A880] uppercase tracking-widest block font-bold">
                    {photo.client || 'JEMARI KILAT'}
                  </span>
                  <h3 className="font-serif text-lg text-white font-normal leading-snug">
                    {photo.title}
                  </h3>
                  <div className="text-[9px] font-mono text-neutral-300 pt-1 border-t border-white/20 flex justify-between items-center">
                    <span>📍 {photo.location || 'Indonesia'}</span>
                    <span>LENS {photo.lens || '85MM F/1.4'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 px-1 flex justify-between items-center text-xs">
                <span className="font-serif text-base text-[#1A1A1A] font-normal truncate">{photo.title}</span>
                <span className="font-mono text-[10px] text-[#7A756C] shrink-0 font-medium">📍 {photo.location}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="py-24 text-center space-y-4 bg-white border border-[#E5E0D8] p-12">
            <div className="w-16 h-16 bg-[#FAF8F5] text-[#7A756C] rounded-full flex items-center justify-center mx-auto text-2xl border border-[#E5E0D8]">
              📷
            </div>
            <h3 className="font-serif text-2xl text-[#1A1A1A]">Tidak ada foto ditemukan</h3>
            <p className="font-sans text-xs text-[#666158]">Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
          </div>
        )}

      </div>
    </div>
  );
}
