import React, { useEffect, useState } from 'react';
import { ArrowRight, Heart, GraduationCap, Camera, Sparkles, Building2, CheckCircle, MapPin, Instagram, Play, Star, Award, Film, UserCheck, Eye } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function HomeView({ setActivePage, onSelectPhoto, onSelectVideo, onOpenBooking }) {
  const { photos = [], videos = [], partnerships = [], photographers = [] } = useData();

  const safePhotos = Array.isArray(photos) ? photos : [];
  const safeVideos = Array.isArray(videos) ? videos : [];
  const safePartnerships = Array.isArray(partnerships) ? partnerships : [];
  const safePhotographers = Array.isArray(photographers) ? photographers : [];

  // Filter out hidden photos
  const activePhotos = safePhotos.filter((p) => p && !p.isHidden);

  // Curate featured set for hero carousel & main masonry grid
  const homeFeatured = activePhotos.filter((p) => p && p.isFeaturedHome);
  const featuredSet = (homeFeatured.length > 0 ? homeFeatured : activePhotos).slice(0, 12);

  // Categories
  const weddingPhotos = activePhotos.filter((p) => p && p.category === 'Wedding');
  const graduationPhotos = activePhotos.filter((p) => p && p.category === 'Graduation');
  const preweddingPhotos = activePhotos.filter((p) => p && p.category === 'Prewedding');
  const editorialPhotos = activePhotos.filter((p) => p && (p.category === 'Editorial' || p.category === 'High Fashion' || p.category === 'Portrait'));

  // Hero slideshow state
  const heroSlides = featuredSet.slice(0, 5).map((p) => p.image);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <div className="w-full bg-[#FAF8F5] text-[#1A1A1A] selection:bg-[#C5A880] selection:text-black font-sans">
      
      {/* ========================================================================= */}
      {/* 1. AXIOO-STYLE FULL-BLEED HERO SLIDESHOW SECTION                          */}
      {/* ========================================================================= */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#121214]">

        {/* Background Image Carousel with Vignette Overlay */}
        {heroSlides.map((imgUrl, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              idx === currentSlideIndex ? 'opacity-65 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{ backgroundImage: `url('${imgUrl}')` }}
          />
        ))}

        {/* Radial Dark Vignette Shader */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#121214]/80 via-[#121214]/40 to-[#121214]" />

        {/* Hero Content Overlay */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto space-y-6 pt-16">
          <span className="inline-flex items-center gap-2.5 font-sans text-xs tracking-[0.35em] uppercase text-[#C5A880] bg-[#1A1A1A]/80 backdrop-blur-md px-5 py-2 border border-[#C5A880]/40 rounded-full shadow-2xl">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" /> STORIES WORTH REMEMBERING
          </span>
          
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-9xl text-white tracking-tight font-normal leading-none drop-shadow-2xl">
            JEMARI KILAT
          </h1>
          
          <p className="font-sans text-xs sm:text-sm text-neutral-300 tracking-[0.25em] uppercase max-w-2xl mx-auto font-light leading-relaxed">
            Luxury Fine Art Wedding, Graduation Milestones & Cinematic Editorial Photography
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
            <button
              onClick={() => { setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full sm:w-auto bg-[#C5A880] text-black font-sans text-xs tracking-[0.25em] px-9 py-4 uppercase font-bold hover:bg-[#D8C09D] transition-all duration-300 shadow-xl border border-[#C5A880]"
            >
              EXPLORE STORIES
            </button>
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto bg-transparent border border-white/60 text-white font-sans text-xs tracking-[0.25em] px-9 py-4 uppercase font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-xs"
            >
              RESERVE SESSION
            </button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-16 right-8 lg:right-16 flex items-center gap-2 z-20">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                idx === currentSlideIndex ? 'w-8 bg-[#C5A880]' : 'w-2 bg-neutral-600 hover:bg-neutral-400'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
          <span className="font-sans text-[9px] text-[#C5A880] tracking-[0.3em] uppercase font-mono">EXPLORE ↓</span>
          <div className="w-[1.5px] h-10 bg-gradient-to-b from-[#C5A880] via-[#C5A880]/40 to-transparent animate-pulse" />
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 2. AXIOO EDITORIAL PHILOSOPHY BANNER                                     */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#FAF8F5] py-24 px-6 lg:px-16 border-b border-[#E5E0D8] text-center relative">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="font-sans text-[10px] tracking-[0.4em] text-[#C5A880] uppercase block font-bold">
            THE EDITORIAL PHILOSOPHY
          </span>
          
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#1A1A1A] leading-tight font-normal italic">
            "In the absence of color, the essence of the <span className="not-italic text-[#C5A880]">soul</span> reveals itself through light and shadow."
          </h2>

          <p className="font-sans text-xs text-[#666158] leading-relaxed max-w-2xl mx-auto font-light pt-2">
            Kami memperlakukan setiap momen pernikahan, prosesi wisuda, dan potret diri bukan sekadar dokumentasi biasa, melainkan sebuah karya seni visual abadi yang menceritakan keintiman, rasa haru, dan keanggunan sejati.
          </p>

          <div className="w-24 h-[1px] bg-[#C5A880] mx-auto my-8" />
          
          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-[#E5E0D8] max-w-3xl mx-auto">
            <div className="p-4 bg-white border border-[#E5E0D8] rounded-xs shadow-xs">
              <span className="font-serif text-3xl text-[#1A1A1A] font-bold block">500+</span>
              <span className="font-sans text-[10px] text-[#7A756C] tracking-widest uppercase font-semibold">Sacred Vows</span>
            </div>
            <div className="p-4 bg-white border border-[#E5E0D8] rounded-xs shadow-xs">
              <span className="font-serif text-3xl text-[#1A1A1A] font-bold block">100%</span>
              <span className="font-sans text-[10px] text-[#7A756C] tracking-widest uppercase font-semibold">Master Prints</span>
            </div>
            <div className="p-4 bg-white border border-[#E5E0D8] rounded-xs shadow-xs">
              <span className="font-serif text-3xl text-[#1A1A1A] font-bold block">48H</span>
              <span className="font-sans text-[10px] text-[#7A756C] tracking-widest uppercase font-semibold">Express Teasers</span>
            </div>
            <div className="p-4 bg-white border border-[#E5E0D8] rounded-xs shadow-xs">
              <span className="font-serif text-3xl text-[#C5A880] font-bold block">4.9★</span>
              <span className="font-sans text-[10px] text-[#7A756C] tracking-widest uppercase font-semibold">Client Rating</span>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 3. AXIOO SIGNATURE ASYMMETRIC PHOTO COLLAGE SHOWCASE (KOLASE FOTO AXIOO)  */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#F5F2EB] py-24 px-6 lg:px-16 border-b border-[#E5E0D8]">
        <div className="max-w-[1600px] mx-auto space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-sans text-[10px] tracking-[0.4em] text-[#C5A880] uppercase block font-bold">
              01 // EDITORIAL COLLAGE SPREAD
            </span>
            <h2 className="font-serif text-3xl lg:text-5xl text-[#1A1A1A] font-normal">
              Featured Story Collages
            </h2>
            <p className="font-sans text-xs text-[#666158] font-light">
              Kolase foto bergaya majalah editorial Axioo yang menyatukan momen emosional dalam tata letak artistik.
            </p>
          </div>

          {/* Collage 1: Wedding & Couple Story Spread */}
          {weddingPhotos.length >= 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 lg:p-10 border border-[#E5E0D8] shadow-sm rounded-xs">
              {/* Left Tall Portrait */}
              <div 
                onClick={() => onSelectPhoto(weddingPhotos[0])}
                className="lg:col-span-6 overflow-hidden bg-[#F5F2EB] border border-[#E5E0D8] p-3 group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={weddingPhotos[0].image}
                    alt={weddingPhotos[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[9px] font-mono tracking-widest uppercase border border-[#E5E0D8] font-bold text-[#1A1A1A]">
                    {weddingPhotos[0].category}
                  </div>
                </div>
                <div className="pt-4 text-left">
                  <span className="font-sans text-[10px] text-[#C5A880] tracking-widest uppercase font-bold block">
                    {weddingPhotos[0].client}
                  </span>
                  <h3 className="font-serif text-2xl text-[#1A1A1A] font-normal">
                    {weddingPhotos[0].title}
                  </h3>
                </div>
              </div>

              {/* Right Column Collaged Photos + Story Quote */}
              <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
                
                {/* Top Landscape */}
                <div 
                  onClick={() => onSelectPhoto(weddingPhotos[1])}
                  className="bg-[#F5F2EB] border border-[#E5E0D8] p-3 group cursor-pointer"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={weddingPhotos[1].image}
                      alt={weddingPhotos[1].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="pt-3 text-left">
                    <h4 className="font-serif text-lg text-[#1A1A1A] font-normal">{weddingPhotos[1].title}</h4>
                    <span className="font-mono text-[9px] text-[#7A756C]">📍 {weddingPhotos[1].location}</span>
                  </div>
                </div>

                {/* Editorial Quote Box */}
                <div className="p-6 bg-[#FAF8F5] border-l-2 border-[#C5A880] space-y-2">
                  <span className="font-serif text-2xl text-[#C5A880] block font-bold">“</span>
                  <p className="font-serif text-base italic text-[#1A1A1A] leading-relaxed">
                    "Setiap helai gaun, lirikan mata, dan senyuman tulus diabadikan dalam bingkai yang tak akan pernah pudar oleh waktu."
                  </p>
                  <span className="font-sans text-[10px] text-[#7A756C] tracking-widest uppercase block font-semibold pt-2">
                    — JEMARI KILAT WEDDING ARCHIVE
                  </span>
                </div>

                {/* Bottom Small Grid Pair */}
                <div className="grid grid-cols-2 gap-4">
                  {weddingPhotos.slice(2, 4).map((p) => (
                    <div 
                      key={p.id}
                      onClick={() => onSelectPhoto(p)}
                      className="bg-[#F5F2EB] border border-[#E5E0D8] p-2 group cursor-pointer"
                    >
                      <div className="aspect-square overflow-hidden">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <span className="font-serif text-xs text-[#1A1A1A] block mt-2 truncate font-normal">{p.title}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 4. FRAMED CURATED PORTFOLIO MASONRY GRID                                  */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#FAF8F5] py-24 border-b border-[#E5E0D8]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-14 border-b border-[#E5E0D8] pb-6">
            <div>
              <span className="font-sans text-[10px] text-[#C5A880] tracking-[0.3em] uppercase block mb-2 font-bold">
                02 / CURATED WORKS
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl text-[#1A1A1A] font-normal">
                Featured Portfolio
              </h2>
            </div>
            
            <button
              onClick={() => { setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="mt-4 lg:mt-0 font-sans text-xs tracking-[0.25em] text-[#1A1A1A] hover:text-[#C5A880] transition-colors flex items-center gap-2 group uppercase font-bold"
            >
              VIEW FULL GALLERY <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Axioo 1px Framed Masonry Cards */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {featuredSet.map((photo) => (
              <div
                key={photo.id}
                onClick={() => onSelectPhoto(photo)}
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

                  {/* Bottom Metadata Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 text-white space-y-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-sans text-[9px] text-[#C5A880] uppercase tracking-widest block font-bold">
                      {photo.client || 'JEMARI KILAT'}
                    </span>
                    <h3 className="font-serif text-lg text-white font-normal leading-snug">
                      {photo.title}
                    </h3>
                    <div className="text-[9px] font-mono text-neutral-300 pt-1 border-t border-white/20 flex justify-between items-center">
                      <span>📍 {photo.location || 'Indonesia'}</span>
                      <span className="text-[#C5A880] font-bold">{photo.year || '2024'}</span>
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

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 5. MULTI-CATEGORY OVERVIEW                                                */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#F5F2EB] py-24 px-6 lg:px-16 border-b border-[#E5E0D8]">
        <div className="max-w-[1440px] mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-sans text-[10px] tracking-[0.4em] text-[#C5A880] uppercase block mb-2 font-bold">
              EXPLORE BY GENRE
            </span>
            <h2 className="font-serif text-3xl lg:text-5xl text-[#1A1A1A] font-normal">
              Tailored Visual Storytelling
            </h2>
            <p className="font-sans text-xs text-[#666158] mt-2 font-light">
              Pelajari kategori fotografi unggulan kami, disesuaikan untuk setiap momen bersejarah hidup Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Category 1: Wedding Sanctuary */}
            <div className="bg-white p-6 border border-[#E5E0D8] hover:border-[#C5A880] transition-all flex flex-col justify-between rounded-xs shadow-xs">
              <div>
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#E5E0D8]">
                  <span className="font-sans text-xs tracking-[0.2em] font-bold text-[#1A1A1A] uppercase flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-[#C5A880]" /> WEDDING
                  </span>
                  <span className="font-sans text-[10px] text-[#7A756C]">{weddingPhotos.length} Works</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {weddingPhotos.slice(0, 3).map((photo) => (
                    <div 
                      key={photo.id}
                      onClick={() => onSelectPhoto(photo)}
                      className="aspect-[3/4] overflow-hidden bg-[#FAF8F5] cursor-pointer group relative border border-[#E5E0D8]"
                    >
                      <img
                        src={photo.image}
                        alt="Wedding Photo"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif text-lg text-[#1A1A1A] font-normal mb-1">Sanctuary Vows</h3>
                <p className="font-sans text-[11px] text-[#666158] leading-relaxed mb-4 font-light">
                  Dokumentasi sakral pernikahan dengan nuansa keintiman dan pencahayaan natural.
                </p>
                <button
                  onClick={() => { setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full font-sans text-[10px] tracking-[0.2em] py-2.5 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors uppercase font-bold"
                >
                  VIEW WEDDINGS
                </button>
              </div>
            </div>

            {/* Category 2: Graduation Milestones */}
            <div className="bg-white p-6 border border-[#E5E0D8] hover:border-[#C5A880] transition-all flex flex-col justify-between rounded-xs shadow-xs">
              <div>
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#E5E0D8]">
                  <span className="font-sans text-xs tracking-[0.2em] font-bold text-[#1A1A1A] uppercase flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#C5A880]" /> GRADUATION
                  </span>
                  <span className="font-sans text-[10px] text-[#7A756C]">{graduationPhotos.length} Works</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {graduationPhotos.slice(0, 3).map((photo) => (
                    <div 
                      key={photo.id}
                      onClick={() => onSelectPhoto(photo)}
                      className="aspect-[3/4] overflow-hidden bg-[#FAF8F5] cursor-pointer group relative border border-[#E5E0D8]"
                    >
                      <img
                        src={photo.image}
                        alt="Graduation Photo"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif text-lg text-[#1A1A1A] font-normal mb-1">Academic Honors</h3>
                <p className="font-sans text-[11px] text-[#666158] leading-relaxed mb-4 font-light">
                  Potret wisuda individual, keluarga, & grup sahabat berkesan mendalam.
                </p>
                <button
                  onClick={() => { setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full font-sans text-[10px] tracking-[0.2em] py-2.5 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors uppercase font-bold"
                >
                  VIEW GRADUATION
                </button>
              </div>
            </div>

            {/* Category 3: Prewedding & Couples */}
            <div className="bg-white p-6 border border-[#E5E0D8] hover:border-[#C5A880] transition-all flex flex-col justify-between rounded-xs shadow-xs">
              <div>
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#E5E0D8]">
                  <span className="font-sans text-xs tracking-[0.2em] font-bold text-[#1A1A1A] uppercase flex items-center gap-2">
                    <Camera className="w-3.5 h-3.5 text-[#C5A880]" /> PREWEDDING
                  </span>
                  <span className="font-sans text-[10px] text-[#7A756C]">{preweddingPhotos.length} Works</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {preweddingPhotos.slice(0, 3).map((photo) => (
                    <div 
                      key={photo.id}
                      onClick={() => onSelectPhoto(photo)}
                      className="aspect-[3/4] overflow-hidden bg-[#FAF8F5] cursor-pointer group relative border border-[#E5E0D8]"
                    >
                      <img
                        src={photo.image}
                        alt="Prewedding Photo"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif text-lg text-[#1A1A1A] font-normal mb-1">Timeless Romance</h3>
                <p className="font-sans text-[11px] text-[#666158] leading-relaxed mb-4 font-light">
                  Sesi foto pertunangan dan outdoor prewedding sinematik berkonsep.
                </p>
                <button
                  onClick={() => { setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full font-sans text-[10px] tracking-[0.2em] py-2.5 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors uppercase font-bold"
                >
                  VIEW PREWEDDING
                </button>
              </div>
            </div>

            {/* Category 4: Editorial & Fine Art */}
            <div className="bg-white p-6 border border-[#E5E0D8] hover:border-[#C5A880] transition-all flex flex-col justify-between rounded-xs shadow-xs">
              <div>
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#E5E0D8]">
                  <span className="font-sans text-xs tracking-[0.2em] font-bold text-[#1A1A1A] uppercase flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" /> EDITORIAL
                  </span>
                  <span className="font-sans text-[10px] text-[#7A756C]">{editorialPhotos.length} Works</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {editorialPhotos.slice(0, 3).map((photo) => (
                    <div 
                      key={photo.id}
                      onClick={() => onSelectPhoto(photo)}
                      className="aspect-[3/4] overflow-hidden bg-[#FAF8F5] cursor-pointer group relative border border-[#E5E0D8]"
                    >
                      <img
                        src={photo.image}
                        alt="Editorial Photo"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif text-lg text-[#1A1A1A] font-normal mb-1">High Fashion</h3>
                <p className="font-sans text-[11px] text-[#666158] leading-relaxed mb-4 font-light">
                  Potret komersial brand, lookbook, dan fashion editorial tingkat tinggi.
                </p>
                <button
                  onClick={() => { setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full font-sans text-[10px] tracking-[0.2em] py-2.5 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors uppercase font-bold"
                >
                  VIEW EDITORIAL
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 6. CINEMATIC VIDEO SHOWCASE SECTION (DARK CONTRAST)                        */}
      {/* ========================================================================= */}
      {safeVideos.length > 0 && (
        <section className="w-full bg-[#121214] text-white py-24 px-6 lg:px-16 border-b border-neutral-800">
          <div className="max-w-[1440px] mx-auto">
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-14 border-b border-[#C5A880]/30 pb-6">
              <div>
                <span className="font-sans text-[10px] text-[#C5A880] tracking-[0.3em] uppercase block mb-2 font-bold">
                  03 / MOTION PICTURES
                </span>
                <h2 className="font-serif text-3xl lg:text-5xl text-white font-normal">
                  Cinematic Films & Highlights
                </h2>
              </div>
              
              <button
                onClick={() => { setActivePage('video'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="mt-4 lg:mt-0 font-sans text-xs tracking-[0.25em] text-[#C5A880] hover:text-white transition-colors flex items-center gap-2 group uppercase font-bold"
              >
                VIEW ALL CINEMA <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {safeVideos.slice(0, 3).map((video) => (
                <div 
                  key={video.id}
                  onClick={() => onSelectVideo && onSelectVideo(video)}
                  className="bg-[#16161a] border border-neutral-800 hover:border-[#C5A880] rounded-xs overflow-hidden group cursor-pointer shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-video bg-neutral-950 overflow-hidden">
                    <video 
                      src={video.videoUrl}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                      muted
                      preload="metadata"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-black/40" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#C5A880] text-black flex items-center justify-center pl-0.5 group-hover:scale-110 transition-transform shadow-lg">
                        <Play className="w-6 h-6 fill-current" />
                      </div>
                    </div>

                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 text-[#C5A880] text-[9px] font-mono tracking-widest uppercase border border-[#C5A880]/30">
                      {video.category || 'CINEMA'}
                    </div>

                    {video.duration && (
                      <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-0.5 text-white text-[9px] font-mono">
                        {video.duration}
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="font-serif text-xl text-white font-normal leading-snug group-hover:text-[#C5A880] transition-colors">
                      {video.title}
                    </h3>
                    <p className="font-sans text-xs text-neutral-400 line-clamp-2 font-light leading-relaxed">
                      {video.synopsis || 'Cinematic wedding highlight film color-graded with 35mm analogue tones.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}


      {/* ========================================================================= */}
      {/* 7. OFFICIAL MEDAN STUDIO PARTNERSHIPS                                     */}
      {/* ========================================================================= */}
      {safePartnerships.length > 0 && (
        <section className="w-full bg-[#FAF8F5] py-24 px-6 lg:px-16 border-b border-[#E5E0D8]">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="font-sans text-[10px] tracking-[0.4em] text-[#C5A880] uppercase block font-bold">
                OFFICIAL STUDIO PARTNERS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-normal">
                Partnership Studio Photo Medan
              </h2>
              <p className="font-sans text-xs text-[#666158] leading-relaxed max-w-2xl mx-auto font-light">
                JEMARI KILAT bekerjasama secara resmi dengan studio foto indoor terkemuka di Medan untuk memfasilitasi sesi foto wisuda, indoor portrait, grup, dan foto keluarga dengan pencahayaan serta dekorasi estetik terbaik.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {safePartnerships.map((partner) => (
                <div 
                  key={partner.id}
                  className="bg-white p-8 border border-[#E5E0D8] hover:border-[#C5A880] transition-all duration-300 shadow-xs relative overflow-hidden group flex flex-col justify-between rounded-xs"
                >
                  <div className="absolute top-0 right-0 bg-[#1A1A1A] text-white text-[9px] font-mono font-bold px-3 py-1 uppercase tracking-widest">
                    OFFICIAL PARTNER
                  </div>

                  <div>
                    <div className="w-12 h-12 bg-[#FAF8F5] border border-[#E5E0D8] text-[#C5A880] rounded-full flex items-center justify-center mb-6 shadow-xs">
                      <Building2 className="w-6 h-6" />
                    </div>

                    <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest block font-bold mb-1">
                      {partner.categoryTag || 'INDOOR STUDIO'}
                    </span>
                    <h3 className="font-serif text-2xl text-[#1A1A1A] font-bold mb-3">
                      {partner.name}
                    </h3>

                    <p className="font-sans text-xs text-[#666158] leading-relaxed mb-6 font-light">
                      {partner.description}
                    </p>

                    {Array.isArray(partner.features) && partner.features.length > 0 && (
                      <ul className="space-y-2 font-sans text-xs text-[#1A1A1A] mb-6">
                        {partner.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#E5E0D8] flex flex-wrap justify-between items-center gap-3 text-xs">
                    <span className="font-mono text-[10px] text-[#7A756C] uppercase font-semibold">PARTNER RESMI JEMARI KILAT</span>
                    
                    {partner.instagramUrl && (
                      <a
                        href={partner.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-sans text-[11px] tracking-wider font-bold uppercase hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-xs rounded-xs"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                        <span>{partner.instagram || 'INSTAGRAM'}</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ========================================================================= */}
      {/* 8. DIRECT BOOKING CTA BANNER                                              */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#1A1A1A] text-white py-28 px-6 lg:px-16 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="font-sans text-[10px] tracking-[0.4em] text-[#C5A880] uppercase block font-bold">
            RESERVATIONS & INQUIRIES
          </span>

          <h3 className="font-serif text-3xl sm:text-5xl text-white font-normal leading-tight">
            Ready to Capture Your Sacred Story?
          </h3>
          
          <p className="font-sans text-xs text-neutral-300 leading-relaxed font-light max-w-xl mx-auto">
            Apakah Anda merencanakan pernikahan sakral, momen kelulusan wisuda, atau proyek editorial komersial, tim fotografer kami siap mewujudkan visi estetika Anda.
          </p>

          <button
            onClick={onOpenBooking}
            className="bg-[#C5A880] text-black font-sans text-xs tracking-[0.25em] px-10 py-4 uppercase font-bold hover:bg-[#D8C09D] transition-all shadow-xl border border-[#C5A880]"
          >
            INQUIRE DATES & PACKAGES
          </button>
        </div>
      </section>

    </div>
  );
}
