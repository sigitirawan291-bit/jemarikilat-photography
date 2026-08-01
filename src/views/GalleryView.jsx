import React, { useState, useEffect } from 'react';
import { Eye, Filter, ChevronLeft, ChevronRight, Sliders, Sparkles, Camera } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function GalleryView({ onSelectPhoto }) {
  const { photos } = useData();
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = ['All', 'Wedding', 'Graduation', 'Prewedding', 'Editorial'];

  // Non-hidden photos
  const activePhotos = photos.filter((p) => !p.isHidden);

  // Photos allowed to display in the main gallery grid
  const galleryPhotos = activePhotos.filter((p) => p.showInGallery !== false);

  // Carousel set: items marked inGalleryCarousel first, or active photos fallback
  const carouselPhotos = activePhotos.filter((p) => p.inGalleryCarousel);
  const activeCarousel = carouselPhotos.length > 0 ? carouselPhotos : activePhotos.slice(0, 8);

  // Auto-scroll Carousel every 3.5 seconds
  useEffect(() => {
    if (activeCarousel.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeCarousel.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [activeCarousel.length]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activeCarousel.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activeCarousel.length) % activeCarousel.length);
  };

  const filteredPhotos = activeCategory === 'All'
    ? galleryPhotos
    : galleryPhotos.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());

  const activeSlidePhoto = activeCarousel[currentSlide] || activeCarousel[0];

  return (
    <div className="w-full pt-20 pb-24 bg-background min-h-screen">
      
      {/* --- FULL-BLEED EDGE-TO-EDGE 100% SCREEN CAROUSEL SHOWCASE (TANPA MARGIN KANAN-KIRIN) --- */}
      {activeCarousel.length > 0 && activeSlidePhoto && (
        <div className="w-full relative mb-16 overflow-hidden bg-primary border-b border-outline-variant/40 shadow-2xl">
          
          <div className="relative h-[65vh] lg:h-[82vh] w-full overflow-hidden group">
            {/* Auto-sliding Images Stack with Smooth Opacity/Scale Transition */}
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
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-primary/30" />
                </div>
              );
            })}

            {/* Prev / Next Navigation Controls */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-surface/80 text-primary flex items-center justify-center hover:bg-surface hover:scale-110 transition-all shadow-2xl z-30"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <button
              onClick={handleNextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-surface/80 text-primary flex items-center justify-center hover:bg-surface hover:scale-110 transition-all shadow-2xl z-30"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Top Indicator Badge */}
            <div className="absolute top-6 left-6 lg:left-12 right-6 lg:right-12 flex justify-between items-center z-20 text-xs font-sans tracking-wider uppercase text-on-primary">
              <span className="flex items-center gap-2 font-semibold bg-primary/80 backdrop-blur-md px-4 py-2 border border-on-primary/20 shadow-xl">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" /> FULL-BLEED SLIDE CAROUSEL
              </span>
              <span className="font-mono bg-primary/80 backdrop-blur-md px-4 py-2 border border-on-primary/20 text-amber-300 font-bold shadow-xl">
                {String(currentSlide + 1).padStart(2, '0')} / {String(activeCarousel.length).padStart(2, '0')}
              </span>
            </div>

            {/* Slide Metadata Overlay */}
            <div className="absolute bottom-8 left-6 lg:left-12 right-6 lg:right-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-on-primary z-20">
              <div className="space-y-2 max-w-3xl">
                <span className="font-mono text-xs tracking-widest text-amber-300 uppercase block font-bold">
                  {activeSlidePhoto.category} • {activeSlidePhoto.year} • {activeSlidePhoto.camera || 'SONY A7R V'}
                </span>
                <h2 className="font-serif text-3xl lg:text-5xl text-on-primary font-normal leading-tight">
                  {activeSlidePhoto.title}
                </h2>
                <p className="font-sans text-xs text-outline-variant line-clamp-2 max-w-2xl">
                  📍 {activeSlidePhoto.location} — {activeSlidePhoto.description || 'Obsidian & Ivory fine-art photograph.'}
                </p>
              </div>
            </div>
          </div>

          {/* Full Width Thumbnail Navigation Bar */}
          <div className="w-full bg-primary/95 border-t border-outline-variant/30 py-3 px-6 flex items-center justify-center gap-3 overflow-x-auto">
            {activeCarousel.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`relative w-24 aspect-[16/9] overflow-hidden border-2 transition-all duration-300 shrink-0 ${
                  currentSlide === idx 
                    ? 'border-amber-400 scale-105 shadow-xl ring-2 ring-amber-400/50 opacity-100' 
                    : 'border-outline-variant/30 opacity-50 hover:opacity-100'
                }`}
              >
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* --- ELEGANT BALANCED CONTENT SECTION FOR ARCHIVE & FILTERS --- */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="font-sans text-[10px] tracking-[0.4em] text-outline uppercase block font-semibold">
            PORTFOLIO ARCHIVE
          </span>
          <h2 className="font-serif text-4xl lg:text-6xl text-primary font-normal">
            Photography Gallery
          </h2>
          <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
            Photography archive featuring wedding sanctuary moments, graduation milestones, and fine-art editorials.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 border-b border-outline-variant/30 pb-6">
          <span className="font-sans text-xs text-outline flex items-center gap-1.5 mr-2 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-sans text-xs tracking-[0.15em] px-5 py-2 uppercase transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-on-primary font-semibold'
                    : 'bg-transparent text-on-surface-variant hover:text-primary hover:bg-surface-container'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Masonry Pure Photo Layout (Tanpa Border/Box Bawah) */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="break-inside-avoid group relative overflow-hidden bg-primary shadow-xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] transition-all duration-500 ease-out border border-outline-variant/30 hover:[transform:perspective(1000px)_rotateX(3deg)_rotateY(-3deg)_translateZ(18px)] rounded-sm"
            >
              <div className="relative w-full overflow-hidden">
                <img
                  src={photo.image}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.04]"
                />
                
                {/* 3D Glass Light Reflection Sheen Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20" />

                {/* Top 3D Telemetry HUD Badge */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono tracking-widest uppercase z-10">
                  <span className="bg-primary/85 backdrop-blur-md px-3 py-1 text-on-primary border border-on-primary/20 shadow-xl">
                    {photo.category}
                  </span>
                  <span className="bg-primary/85 backdrop-blur-md px-3 py-1 text-amber-300 font-bold border border-on-primary/20 shadow-xl">
                    🎥 {photo.camera || 'SONY A7R V'}
                  </span>
                </div>

                {/* Bottom Permanent 3D Shaded Title & Description Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent p-6 text-on-primary space-y-1 z-10">
                  <span className="font-sans text-[10px] text-amber-300 uppercase tracking-widest block font-bold">
                    {photo.client || 'JEMARI KILAT'}
                  </span>
                  <h3 className="font-serif text-xl text-on-primary font-normal leading-snug drop-shadow-md">
                    {photo.title}
                  </h3>
                  <div className="flex justify-between items-center text-[10px] font-mono text-outline-variant pt-1.5 border-t border-on-primary/15">
                    <span>📍 {photo.location || 'Indonesia'}</span>
                    <span>LENS {photo.lens || '85MM F/1.4'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
