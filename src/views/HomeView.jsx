import React, { useEffect, useState } from 'react';
import { ArrowRight, Heart, GraduationCap, Camera, Sparkles, Building2, CheckCircle, MapPin, Instagram, Play, Star, Award, Film, UserCheck } from 'lucide-react';
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
    <div className="w-full bg-[#0d0d0e] text-[#f5f5f7] selection:bg-amber-500 selection:text-black">
      
      {/* ========================================================================= */}
      {/* 1. AXIOO-STYLE FULL-BLEED HERO SLIDESHOW SECTION                          */}
      {/* ========================================================================= */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#070708]">

        {/* Background Image Carousel with Vignette Overlay */}
        {heroSlides.map((imgUrl, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              idx === currentSlideIndex ? 'opacity-60 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{ backgroundImage: `url('${imgUrl}')` }}
          />
        ))}

        {/* Radial Dark Vignette & Gold Tint Shader */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0e]/80 via-[#0d0d0e]/40 to-[#0d0d0e]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(13,13,14,0.75)_100%)]" />

        {/* Hero Content Overlay */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto space-y-6 pt-16">
          <span className="inline-flex items-center gap-2.5 font-sans text-xs tracking-[0.35em] uppercase text-amber-300 bg-amber-500/10 backdrop-blur-md px-5 py-2 border border-amber-500/30 rounded-full shadow-2xl">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> STORIES WORTH REMEMBERING
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
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-sans text-xs tracking-[0.25em] px-9 py-4 uppercase font-bold hover:from-amber-400 hover:to-amber-300 transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.4)] border border-amber-300/40"
            >
              EXPLORE STORIES
            </button>
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto bg-transparent border border-amber-400/60 text-amber-300 font-sans text-xs tracking-[0.25em] px-9 py-4 uppercase font-semibold hover:bg-amber-500/10 hover:border-amber-400 transition-all duration-300 backdrop-blur-xs"
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
                idx === currentSlideIndex ? 'w-8 bg-amber-400' : 'w-2 bg-neutral-600 hover:bg-neutral-400'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
          <span className="font-sans text-[9px] text-amber-400/80 tracking-[0.3em] uppercase font-mono">EXPLORE ↓</span>
          <div className="w-[1.5px] h-10 bg-gradient-to-b from-amber-400 via-amber-400/40 to-transparent animate-pulse" />
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 2. AXIOO EDITORIAL PHILOSOPHY & STATS TICKER                               */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#121214] py-24 px-6 lg:px-16 border-y border-amber-500/20 text-center relative overflow-hidden">
        
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="font-sans text-[10px] tracking-[0.4em] text-amber-400 uppercase block font-semibold">
            THE EDITORIAL STATEMENT
          </span>
          
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-white leading-tight font-normal italic">
            "In the absence of color, the essence of the <span className="not-italic text-amber-300">soul</span> reveals itself through light and shadow."
          </h2>

          <p className="font-sans text-xs text-neutral-400 leading-relaxed max-w-2xl mx-auto font-light pt-2">
            Kami memperlakukan setiap momen pernikahan, prosesi wisuda, dan potret diri bukan sekadar dokumentasi biasa, melainkan sebuah karya seni visual abadi yang menceritakan keintiman, rasa haru, dan keanggunan sejati.
          </p>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto my-8" />
          
          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-neutral-800/80 max-w-3xl mx-auto">
            <div className="p-4 bg-[#0d0d0e]/60 border border-neutral-800 rounded-sm">
              <span className="font-serif text-3xl text-amber-300 font-bold block">500+</span>
              <span className="font-sans text-[10px] text-neutral-400 tracking-widest uppercase">Sacred Vows</span>
            </div>
            <div className="p-4 bg-[#0d0d0e]/60 border border-neutral-800 rounded-sm">
              <span className="font-serif text-3xl text-amber-300 font-bold block">100%</span>
              <span className="font-sans text-[10px] text-neutral-400 tracking-widest uppercase">Master Prints</span>
            </div>
            <div className="p-4 bg-[#0d0d0e]/60 border border-neutral-800 rounded-sm">
              <span className="font-serif text-3xl text-amber-300 font-bold block">48H</span>
              <span className="font-sans text-[10px] text-neutral-400 tracking-widest uppercase">Express Teasers</span>
            </div>
            <div className="p-4 bg-[#0d0d0e]/60 border border-neutral-800 rounded-sm">
              <span className="font-serif text-3xl text-amber-300 font-bold block">4.9★</span>
              <span className="font-sans text-[10px] text-neutral-400 tracking-widest uppercase">Client Rating</span>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 3. CURATED EDITORIAL GALLERY MASONRY (VOGUE / AXIOO MAGAZINE LOOK)        */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#0d0d0e] py-24 border-b border-neutral-800">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-14 border-b border-amber-500/20 pb-6">
            <div>
              <span className="font-sans text-[10px] text-amber-400 tracking-[0.3em] uppercase block mb-2 font-semibold">
                01 / FINE ART PORTFOLIO
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl text-white font-normal">
                Featured Editorial Collections
              </h2>
            </div>
            
            <button
              onClick={() => { setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="mt-4 lg:mt-0 font-sans text-xs tracking-[0.25em] text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-2 group uppercase font-semibold"
            >
              VIEW FULL GALLERY <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {featuredSet.map((photo) => (
              <div
                key={photo.id}
                onClick={() => onSelectPhoto(photo)}
                className="break-inside-avoid group relative overflow-hidden bg-[#16161a] shadow-2xl transition-all duration-500 border border-neutral-800 hover:border-amber-500/50 rounded-sm cursor-pointer"
              >
                <div className="relative w-full overflow-hidden">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Sheen Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[#0d0d0e]/90 backdrop-blur-md px-3 py-1 text-amber-300 border border-amber-500/40 text-[9.5px] font-mono tracking-widest uppercase font-bold shadow-lg">
                      {photo.category}
                    </span>
                  </div>

                  {/* Camera Specs Badge */}
                  {(photo.camera || photo.lens) && (
                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-[#0d0d0e]/90 backdrop-blur-md px-2.5 py-1 text-neutral-300 border border-neutral-700 text-[8.5px] font-mono tracking-widest uppercase">
                        {photo.camera}
                      </span>
                    </div>
                  )}

                  {/* Bottom Title Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0d0d0e] via-[#0d0d0e]/80 to-transparent p-6 text-white space-y-1 z-10">
                    <span className="font-sans text-[10px] text-amber-400 uppercase tracking-widest block font-semibold">
                      {photo.client || 'JEMARI KILAT'}
                    </span>
                    <h3 className="font-serif text-xl text-white font-normal leading-snug drop-shadow-md group-hover:text-amber-200 transition-colors">
                      {photo.title}
                    </h3>
                    <div className="text-[10px] font-mono text-neutral-400 pt-1.5 border-t border-neutral-800 flex justify-between items-center">
                      <span>📍 {photo.location || 'Indonesia'}</span>
                      <span className="text-amber-400 font-bold">{photo.year || '2024'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 4. MULTI-CATEGORY PHOTOGRAPHY GENRES                                      */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#121214] py-24 px-6 lg:px-16 border-b border-neutral-800">
        <div className="max-w-[1440px] mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-sans text-[10px] tracking-[0.4em] text-amber-400 uppercase block mb-2 font-semibold">
              EXPLORE BY GENRE
            </span>
            <h2 className="font-serif text-3xl lg:text-5xl text-white font-normal">
              Tailored Visual Storytelling
            </h2>
            <p className="font-sans text-xs text-neutral-400 mt-2 font-light">
              Pelajari kategori fotografi unggulan kami, disesuaikan untuk setiap momen bersejarah hidup Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Category 1: Wedding Sanctuary */}
            <div className="bg-[#0d0d0e] p-6 border border-neutral-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between rounded-sm">
              <div>
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-neutral-800">
                  <span className="font-sans text-xs tracking-[0.2em] font-bold text-amber-300 uppercase flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" /> WEDDING
                  </span>
                  <span className="font-sans text-[10px] text-neutral-500">{weddingPhotos.length} Works</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {weddingPhotos.slice(0, 3).map((photo) => (
                    <div 
                      key={photo.id}
                      onClick={() => onSelectPhoto(photo)}
                      className="aspect-[3/4] overflow-hidden bg-neutral-900 cursor-pointer group relative border border-neutral-800"
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
                <h3 className="font-serif text-lg text-white font-normal mb-1">Sanctuary Vows</h3>
                <p className="font-sans text-[11px] text-neutral-400 leading-relaxed mb-4 font-light">
                  Dokumentasi sakral pernikahan dengan nuansa keintiman dan pencahayaan natural.
                </p>
                <button
                  onClick={() => { setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full font-sans text-[10px] tracking-[0.2em] py-2.5 border border-amber-500/40 text-amber-300 hover:bg-amber-500 hover:text-black transition-colors uppercase font-bold"
                >
                  VIEW WEDDINGS
                </button>
              </div>
            </div>

            {/* Category 2: Graduation Milestones */}
            <div className="bg-[#0d0d0e] p-6 border border-neutral-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between rounded-sm">
              <div>
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-neutral-800">
                  <span className="font-sans text-xs tracking-[0.2em] font-bold text-amber-300 uppercase flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-amber-400" /> GRADUATION
                  </span>
                  <span className="font-sans text-[10px] text-neutral-500">{graduationPhotos.length} Works</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {graduationPhotos.slice(0, 3).map((photo) => (
                    <div 
                      key={photo.id}
                      onClick={() => onSelectPhoto(photo)}
                      className="aspect-[3/4] overflow-hidden bg-neutral-900 cursor-pointer group relative border border-neutral-800"
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
                <h3 className="font-serif text-lg text-white font-normal mb-1">Academic Honors</h3>
                <p className="font-sans text-[11px] text-neutral-400 leading-relaxed mb-4 font-light">
                  Potret wisuda individual, keluarga, & grup sahabat berkesan mendalam.
                </p>
                <button
                  onClick={() => { setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full font-sans text-[10px] tracking-[0.2em] py-2.5 border border-amber-500/40 text-amber-300 hover:bg-amber-500 hover:text-black transition-colors uppercase font-bold"
                >
                  VIEW GRADUATION
                </button>
              </div>
            </div>

            {/* Category 3: Prewedding & Couples */}
            <div className="bg-[#0d0d0e] p-6 border border-neutral-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between rounded-sm">
              <div>
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-neutral-800">
                  <span className="font-sans text-xs tracking-[0.2em] font-bold text-amber-300 uppercase flex items-center gap-2">
                    <Camera className="w-3.5 h-3.5 text-amber-400" /> PREWEDDING
                  </span>
                  <span className="font-sans text-[10px] text-neutral-500">{preweddingPhotos.length} Works</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {preweddingPhotos.slice(0, 3).map((photo) => (
                    <div 
                      key={photo.id}
                      onClick={() => onSelectPhoto(photo)}
                      className="aspect-[3/4] overflow-hidden bg-neutral-900 cursor-pointer group relative border border-neutral-800"
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
                <h3 className="font-serif text-lg text-white font-normal mb-1">Timeless Romance</h3>
                <p className="font-sans text-[11px] text-neutral-400 leading-relaxed mb-4 font-light">
                  Sesi foto pertunangan dan outdoor prewedding sinematik berkonsep.
                </p>
                <button
                  onClick={() => { setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full font-sans text-[10px] tracking-[0.2em] py-2.5 border border-amber-500/40 text-amber-300 hover:bg-amber-500 hover:text-black transition-colors uppercase font-bold"
                >
                  VIEW PREWEDDING
                </button>
              </div>
            </div>

            {/* Category 4: Editorial & Fine Art */}
            <div className="bg-[#0d0d0e] p-6 border border-neutral-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between rounded-sm">
              <div>
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-neutral-800">
                  <span className="font-sans text-xs tracking-[0.2em] font-bold text-amber-300 uppercase flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> EDITORIAL
                  </span>
                  <span className="font-sans text-[10px] text-neutral-500">{editorialPhotos.length} Works</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {editorialPhotos.slice(0, 3).map((photo) => (
                    <div 
                      key={photo.id}
                      onClick={() => onSelectPhoto(photo)}
                      className="aspect-[3/4] overflow-hidden bg-neutral-900 cursor-pointer group relative border border-neutral-800"
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
                <h3 className="font-serif text-lg text-white font-normal mb-1">High Fashion</h3>
                <p className="font-sans text-[11px] text-neutral-400 leading-relaxed mb-4 font-light">
                  Potret komersial brand, lookbook, dan fashion editorial tingkat tinggi.
                </p>
                <button
                  onClick={() => { setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full font-sans text-[10px] tracking-[0.2em] py-2.5 border border-amber-500/40 text-amber-300 hover:bg-amber-500 hover:text-black transition-colors uppercase font-bold"
                >
                  VIEW EDITORIAL
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 5. CINEMATIC VIDEO SHOWCASE SECTION (AXIOO MOTION PICTURES)              */}
      {/* ========================================================================= */}
      {safeVideos.length > 0 && (
        <section className="w-full bg-[#0d0d0e] py-24 px-6 lg:px-16 border-b border-neutral-800">
          <div className="max-w-[1440px] mx-auto">
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-14 border-b border-amber-500/20 pb-6">
              <div>
                <span className="font-sans text-[10px] text-amber-400 tracking-[0.3em] uppercase block mb-2 font-semibold">
                  02 / MOTION PICTURES
                </span>
                <h2 className="font-serif text-3xl lg:text-5xl text-white font-normal">
                  Cinematic Films & Highlights
                </h2>
              </div>
              
              <button
                onClick={() => { setActivePage('video'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="mt-4 lg:mt-0 font-sans text-xs tracking-[0.25em] text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-2 group uppercase font-semibold"
              >
                VIEW ALL CINEMA <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {safeVideos.slice(0, 3).map((video) => (
                <div 
                  key={video.id}
                  onClick={() => onSelectVideo && onSelectVideo(video)}
                  className="bg-[#16161a] border border-neutral-800 hover:border-amber-500/50 rounded-sm overflow-hidden group cursor-pointer shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-video bg-neutral-950 overflow-hidden">
                    {/* Video thumbnail or video element */}
                    <video 
                      src={video.videoUrl}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                      muted
                      preload="metadata"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0e] via-transparent to-black/40" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-amber-500/90 text-black flex items-center justify-center pl-1 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.6)]">
                        <Play className="w-6 h-6 fill-current" />
                      </div>
                    </div>

                    <div className="absolute top-3 left-3 bg-[#0d0d0e]/85 backdrop-blur-md px-2.5 py-1 text-amber-300 text-[9px] font-mono tracking-widest uppercase border border-amber-500/30">
                      {video.category || 'CINEMA'}
                    </div>

                    {video.duration && (
                      <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-0.5 text-white text-[9px] font-mono">
                        {video.duration}
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="font-serif text-xl text-white font-normal leading-snug group-hover:text-amber-300 transition-colors">
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
      {/* 6. PHOTOGRAPHER ARTISTS SPOTLIGHT                                         */}
      {/* ========================================================================= */}
      {safePhotographers.length > 0 && (
        <section className="w-full bg-[#121214] py-24 px-6 lg:px-16 border-b border-neutral-800">
          <div className="max-w-[1440px] mx-auto">
            
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
              <span className="font-sans text-[10px] tracking-[0.4em] text-amber-400 uppercase block font-semibold">
                THE ARTISTS & CINEMATOGRAPHERS
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl text-white font-normal">
                Master Photographers
              </h2>
              <p className="font-sans text-xs text-neutral-400 font-light">
                Tim fotografer profesional bersertifikasi yang siap mengarahkan setiap pose & momen istimewa Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {safePhotographers.slice(0, 3).map((fg) => (
                <div 
                  key={fg.id}
                  className="bg-[#0d0d0e] p-6 border border-neutral-800 hover:border-amber-500/40 transition-all rounded-sm flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-neutral-900 border-2 border-amber-500/40 shrink-0">
                      <img 
                        src={fg.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'} 
                        alt={fg.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-white font-bold">{fg.name}</h3>
                      <span className="font-sans text-[10px] text-amber-400 tracking-widest uppercase block font-semibold">
                        {fg.role || 'Senior Photographer'}
                      </span>
                      <span className="font-mono text-[9px] text-neutral-500 block">
                        📍 {fg.location || 'Medan Base'}
                      </span>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light">
                    {fg.bio || 'Spesialis fotografi pernikahan dan potret wisuda dengan keahlian pengarahan pose alami.'}
                  </p>

                  <div className="pt-3 border-t border-neutral-800 flex justify-between items-center text-[10px] font-mono text-neutral-500">
                    <span>⚙️ {fg.camera || 'Sony A7R V / Leica'}</span>
                    <button 
                      onClick={() => setActivePage('fg-dashboard')}
                      className="text-amber-400 hover:underline font-bold"
                    >
                      FG Portal →
                    </button>
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
        <section className="w-full bg-[#0d0d0e] py-24 px-6 lg:px-16 border-b border-neutral-800">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="font-sans text-[10px] tracking-[0.4em] text-amber-400 uppercase block font-bold">
                OFFICIAL STUDIO PARTNERS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal">
                Partnership Studio Photo Medan
              </h2>
              <p className="font-sans text-xs text-neutral-400 leading-relaxed max-w-2xl mx-auto font-light">
                JEMARI KILAT bekerjasama secara resmi dengan studio foto indoor terkemuka di Medan untuk memfasilitasi sesi foto wisuda, indoor portrait, grup, dan foto keluarga dengan pencahayaan serta dekorasi estetik terbaik.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {safePartnerships.map((partner) => (
                <div 
                  key={partner.id}
                  className="bg-[#16161a] p-8 border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 shadow-xl relative overflow-hidden group flex flex-col justify-between rounded-sm"
                >
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-amber-400 text-black text-[9px] font-mono font-bold px-3 py-1 uppercase tracking-widest">
                    OFFICIAL PARTNER
                  </div>

                  <div>
                    <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full flex items-center justify-center mb-6 shadow-md">
                      <Building2 className="w-6 h-6" />
                    </div>

                    <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest block font-bold mb-1">
                      {partner.categoryTag || 'INDOOR STUDIO'}
                    </span>
                    <h3 className="font-serif text-2xl text-white font-bold mb-3">
                      {partner.name}
                    </h3>

                    <p className="font-sans text-xs text-neutral-400 leading-relaxed mb-6 font-light">
                      {partner.description}
                    </p>

                    {Array.isArray(partner.features) && partner.features.length > 0 && (
                      <ul className="space-y-2 font-sans text-xs text-neutral-300 mb-6">
                        {partner.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="pt-4 border-t border-neutral-800 flex flex-wrap justify-between items-center gap-3 text-xs">
                    <span className="font-mono text-[10px] text-neutral-500 uppercase font-semibold">PARTNER RESMI JEMARI KILAT</span>
                    
                    {partner.instagramUrl && (
                      <a
                        href={partner.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-sans text-[11px] tracking-wider font-bold uppercase hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-md rounded-xs"
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
      <section className="w-full bg-[#121214] py-28 px-6 lg:px-16 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="font-sans text-[10px] tracking-[0.4em] text-amber-400 uppercase block font-semibold">
            RESERVATIONS & INQUIRIES
          </span>

          <h3 className="font-serif text-3xl sm:text-5xl text-white font-normal leading-tight">
            Ready to Capture Your Sacred Story?
          </h3>
          
          <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light max-w-xl mx-auto">
            Apakah Anda merencanakan pernikahan sakral, momen kelulusan wisuda, atau proyek editorial komersial, tim fotografer kami siap mewujudkan visi estetika Anda.
          </p>

          <button
            onClick={onOpenBooking}
            className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-sans text-xs tracking-[0.25em] px-10 py-4 uppercase font-bold hover:from-amber-400 hover:to-amber-300 transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)] border border-amber-300/40"
          >
            INQUIRE DATES & PACKAGES
          </button>
        </div>
      </section>

    </div>
  );
}
