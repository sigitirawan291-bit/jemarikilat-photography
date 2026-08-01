import React, { useEffect, useState } from 'react';
import { ArrowRight, Heart, GraduationCap, Camera, Sparkles, Building2, CheckCircle, MapPin, Instagram, Play, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function HomeView({ setActivePage, onSelectPhoto, onSelectVideo, onOpenBooking }) {
  const { photos = [], videos = [], partnerships = [] } = useData();

  const safePhotos = Array.isArray(photos) ? photos : [];
  const safeVideos = Array.isArray(videos) ? videos : [];
  const safePartnerships = Array.isArray(partnerships) ? partnerships : [];

  // Active non-hidden photos
  const activePhotos = safePhotos.filter((p) => p && !p.isHidden);

  // Photos selected by Admin to appear in the Home Photo Carousel (isFeaturedHome)
  const adminHeroPhotos = activePhotos.filter((p) => p && p.isFeaturedHome);

  // If Admin selected photos, use them; otherwise fallback to top active photos
  const heroCarouselPhotos = adminHeroPhotos.length > 0 ? adminHeroPhotos : activePhotos.slice(0, 10);

  // Home Hero Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-scroll Hero Carousel every 5 seconds
  useEffect(() => {
    if (heroCarouselPhotos.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroCarouselPhotos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroCarouselPhotos.length]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroCarouselPhotos.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroCarouselPhotos.length) % heroCarouselPhotos.length);
  };

  const activePhoto = heroCarouselPhotos[currentSlide] || heroCarouselPhotos[0];

  // Featured grid set (borderless masonry)
  const homeFeatured = activePhotos.slice(0, 12);

  // Categories
  const weddingPhotos = activePhotos.filter((p) => p && p.category === 'Wedding');
  const graduationPhotos = activePhotos.filter((p) => p && p.category === 'Graduation');
  const preweddingPhotos = activePhotos.filter((p) => p && p.category === 'Prewedding');
  const editorialPhotos = activePhotos.filter((p) => p && (p.category === 'Editorial' || p.category === 'High Fashion' || p.category === 'Portrait'));

  return (
    <div className="w-full bg-[#0d0d0e] text-white font-sans selection:bg-[#d4af37] selection:text-black">
      
      {/* ========================================================================= */}
      {/* 1. MAIN HERO PHOTO CAROUSEL (MANAGED BY ADMIN PAGE)                      */}
      {/* ========================================================================= */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#0d0d0e]">

        {/* Carousel Background Stack */}
        {heroCarouselPhotos.map((photo, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={photo.id || idx}
              className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out ${
                isActive ? 'opacity-70 scale-100 z-10 pointer-events-auto' : 'opacity-0 scale-105 z-0 pointer-events-none'
              }`}
              style={{ backgroundImage: `url('${photo.image}')` }}
            />
          );
        })}

        {/* Dark Vignette Shader */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0e]/80 via-[#0d0d0e]/40 to-[#0d0d0e] z-10" />

        {/* Prev / Next Navigation Controls */}
        {heroCarouselPhotos.length > 1 && (
          <>
            <button
              onClick={handlePrevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#d4af37] hover:text-black transition-all z-30 shadow-2xl"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#d4af37] hover:text-black transition-all z-30 shadow-2xl"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Hero Slide Content Overlay */}
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto space-y-6 pt-16">
          <span className="inline-flex items-center gap-2.5 font-sans text-xs tracking-[0.35em] uppercase text-[#d4af37] bg-black/80 backdrop-blur-md px-5 py-2 rounded-full shadow-2xl font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" /> ADMIN FEATURED HERO CAROUSEL
          </span>
          
          <h1 className="font-sans text-4xl sm:text-6xl lg:text-8xl text-white tracking-tight font-extrabold leading-none drop-shadow-2xl">
            {activePhoto?.title || 'JEMARI KILAT'}
          </h1>
          
          <p className="font-sans text-xs sm:text-sm text-neutral-300 tracking-[0.25em] uppercase max-w-2xl mx-auto font-medium leading-relaxed">
            {activePhoto ? `📍 ${activePhoto.location || 'Indonesia'} • ${activePhoto.category} Archive` : 'Luxury Fine Art Photography'}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
            <button
              onClick={() => activePhoto && onSelectPhoto(activePhoto)}
              className="w-full sm:w-auto bg-[#d4af37] text-black font-sans text-xs tracking-[0.25em] px-9 py-4 uppercase font-bold hover:bg-[#f3e5ab] transition-all duration-300 shadow-2xl rounded-xs"
            >
              INSPECT PHOTO
            </button>
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto bg-transparent border border-white/40 text-white font-sans text-xs tracking-[0.25em] px-9 py-4 uppercase font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-xs rounded-xs"
            >
              RESERVE SESSION
            </button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-16 right-8 lg:right-16 flex items-center gap-2 z-20">
          {heroCarouselPhotos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                idx === currentSlide ? 'w-8 bg-[#d4af37]' : 'w-2 bg-neutral-600 hover:bg-neutral-400'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Bottom Thumbnail Strip */}
        <div className="absolute bottom-4 left-6 right-6 sm:left-12 sm:right-12 z-20 hidden md:flex items-center justify-center gap-3 overflow-x-auto py-2">
          {heroCarouselPhotos.map((photo, idx) => (
            <button
              key={photo.id || idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-20 aspect-[16/9] overflow-hidden transition-all duration-300 shrink-0 ${
                currentSlide === idx ? 'scale-110 opacity-100 ring-2 ring-[#d4af37]' : 'opacity-40 hover:opacity-100'
              }`}
            >
              <img src={photo.image} alt={photo.title} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 2. PHILOSOPHY BANNER (UNIFORM #0D0D0E BACKGROUND, SANS-SERIF)              */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#0d0d0e] py-24 px-6 lg:px-16 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="font-sans text-[10px] tracking-[0.4em] text-[#d4af37] uppercase block font-bold">
            VISUAL PHILOSOPHY
          </span>
          
          <h2 className="font-sans text-2xl sm:text-4xl lg:text-5xl text-white leading-tight font-extrabold">
            "In the absence of color, the essence of the <span className="text-[#d4af37]">soul</span> reveals itself through light."
          </h2>

          <p className="font-sans text-xs text-neutral-400 leading-relaxed max-w-2xl mx-auto font-normal pt-2">
            Kami memperlakukan setiap momen pernikahan, wisuda, dan potret diri bukan sekadar dokumentasi biasa, melainkan karya visual abadi dengan sentuhan insting fotografi presisi.
          </p>

          <div className="w-24 h-[1px] bg-[#d4af37] mx-auto my-8" />
          
          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 max-w-3xl mx-auto">
            <div className="p-5 bg-[#141417] rounded-xs shadow-md">
              <span className="font-sans text-3xl text-white font-extrabold block">500+</span>
              <span className="font-sans text-[10px] text-neutral-400 tracking-widest uppercase font-semibold">Sacred Vows</span>
            </div>
            <div className="p-5 bg-[#141417] rounded-xs shadow-md">
              <span className="font-sans text-3xl text-white font-extrabold block">100%</span>
              <span className="font-sans text-[10px] text-neutral-400 tracking-widest uppercase font-semibold">Master Prints</span>
            </div>
            <div className="p-5 bg-[#141417] rounded-xs shadow-md">
              <span className="font-sans text-3xl text-white font-extrabold block">48H</span>
              <span className="font-sans text-[10px] text-neutral-400 tracking-widest uppercase font-semibold">Express Teasers</span>
            </div>
            <div className="p-5 bg-[#141417] rounded-xs shadow-md">
              <span className="font-sans text-3xl text-[#d4af37] font-extrabold block">4.9★</span>
              <span className="font-sans text-[10px] text-neutral-400 tracking-widest uppercase font-semibold">Client Rating</span>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 3. BORDERLESS CURATED PORTFOLIO MASONRY GRID (NO BORDERS)                */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#0d0d0e] py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1600px] mx-auto">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12">
            <div>
              <span className="font-sans text-[10px] text-[#d4af37] tracking-[0.3em] uppercase block mb-2 font-bold">
                PORTFOLIO ARCHIVE
              </span>
              <h2 className="font-sans text-3xl lg:text-5xl text-white font-extrabold">
                Featured Photography
              </h2>
            </div>
            
            <button
              onClick={() => { setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="mt-4 lg:mt-0 font-sans text-xs tracking-[0.25em] text-[#d4af37] hover:text-white transition-colors flex items-center gap-2 group uppercase font-bold"
            >
              VIEW FULL GALLERY <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Borderless Photo Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {homeFeatured.map((photo) => (
              <div
                key={photo.id}
                onClick={() => onSelectPhoto(photo)}
                className="break-inside-avoid group cursor-pointer borderless-card overflow-hidden"
              >
                <div className="relative w-full overflow-hidden bg-[#0d0d0e]">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-black/80 backdrop-blur-md px-3 py-1 text-[#d4af37] text-[9px] font-mono tracking-widest uppercase font-bold">
                      {photo.category}
                    </span>
                  </div>

                  {/* Bottom Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 text-white space-y-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-sans text-[9px] text-[#d4af37] uppercase tracking-widest block font-bold">
                      {photo.client || 'JEMARI KILAT'}
                    </span>
                    <h3 className="font-sans text-base text-white font-bold leading-snug">
                      {photo.title}
                    </h3>
                    <div className="text-[9px] font-mono text-neutral-400 pt-1 flex justify-between items-center">
                      <span>📍 {photo.location || 'Indonesia'}</span>
                      <span className="text-[#d4af37]">{photo.year || '2024'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 px-1 flex justify-between items-center text-xs">
                  <span className="font-sans text-sm text-neutral-200 font-medium truncate">{photo.title}</span>
                  <span className="font-mono text-[10px] text-neutral-400 shrink-0">📍 {photo.location}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 4. CINEMATIC VIDEO SHOWCASE (BORDERLESS)                                  */}
      {/* ========================================================================= */}
      {safeVideos.length > 0 && (
        <section className="w-full bg-[#0d0d0e] py-24 px-6 lg:px-16">
          <div className="max-w-[1440px] mx-auto">
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12">
              <div>
                <span className="font-sans text-[10px] text-[#d4af37] tracking-[0.3em] uppercase block mb-2 font-bold">
                  MOTION PICTURES
                </span>
                <h2 className="font-sans text-3xl lg:text-5xl text-white font-extrabold">
                  Cinematic Films & Highlights
                </h2>
              </div>
              
              <button
                onClick={() => { setActivePage('video'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="mt-4 lg:mt-0 font-sans text-xs tracking-[0.25em] text-[#d4af37] hover:text-white transition-colors flex items-center gap-2 group uppercase font-bold"
              >
                VIEW ALL CINEMA <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Borderless Video Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {safeVideos.slice(0, 3).map((video) => (
                <div 
                  key={video.id}
                  onClick={() => onSelectVideo && onSelectVideo(video)}
                  className="bg-[#141417] overflow-hidden group cursor-pointer shadow-2xl transition-all duration-300 flex flex-col justify-between rounded-xs"
                >
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <video 
                      src={video.videoUrl}
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
                      {video.synopsis || 'Cinematic wedding highlight film.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}


      {/* ========================================================================= */}
      {/* 5. OFFICIAL MEDAN STUDIO PARTNERSHIPS (BORDERLESS)                         */}
      {/* ========================================================================= */}
      {safePartnerships.length > 0 && (
        <section className="w-full bg-[#0d0d0e] py-24 px-6 lg:px-16">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="font-sans text-[10px] tracking-[0.4em] text-[#d4af37] uppercase block font-bold">
                OFFICIAL STUDIO PARTNERS
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold">
                Partnership Studio Photo Medan
              </h2>
              <p className="font-sans text-xs text-neutral-400 leading-relaxed max-w-2xl mx-auto font-normal">
                JEMARI KILAT bekerjasama secara resmi dengan studio foto indoor terkemuka di Medan untuk memfasilitasi sesi foto wisuda & portraiture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {safePartnerships.map((partner) => (
                <div 
                  key={partner.id}
                  className="bg-[#141417] p-8 transition-all duration-300 shadow-2xl relative overflow-hidden group flex flex-col justify-between rounded-xs"
                >
                  <div className="absolute top-0 right-0 bg-[#d4af37] text-black text-[9px] font-mono font-bold px-3 py-1 uppercase tracking-widest">
                    OFFICIAL PARTNER
                  </div>

                  <div>
                    <div className="w-12 h-12 bg-black text-[#d4af37] rounded-full flex items-center justify-center mb-6 shadow-md">
                      <Building2 className="w-6 h-6" />
                    </div>

                    <span className="font-mono text-[10px] text-[#d4af37] uppercase tracking-widest block font-bold mb-1">
                      {partner.categoryTag || 'INDOOR STUDIO'}
                    </span>
                    <h3 className="font-sans text-2xl text-white font-bold mb-3">
                      {partner.name}
                    </h3>

                    <p className="font-sans text-xs text-neutral-400 leading-relaxed mb-6 font-normal">
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
                    <span className="font-mono text-[10px] text-neutral-400 uppercase font-semibold">PARTNER RESMI JEMARI KILAT</span>
                    
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
      {/* 6. RESERVATION CTA BANNER                                                 */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#0d0d0e] text-white py-28 px-6 lg:px-16 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="font-sans text-[10px] tracking-[0.4em] text-[#d4af37] uppercase block font-bold">
            RESERVATIONS & INQUIRIES
          </span>

          <h3 className="font-sans text-3xl sm:text-5xl text-white font-extrabold leading-tight">
            Ready to Capture Your Sacred Story?
          </h3>
          
          <p className="font-sans text-xs text-neutral-400 leading-relaxed font-normal max-w-xl mx-auto">
            Apakah Anda merencanakan pernikahan sakral, momen kelulusan wisuda, atau proyek komersial, tim fotografer kami siap mewujudkan visi Anda.
          </p>

          <button
            onClick={onOpenBooking}
            className="bg-[#d4af37] text-black font-sans text-xs tracking-[0.25em] px-10 py-4 uppercase font-bold hover:bg-[#f3e5ab] transition-all shadow-2xl rounded-xs"
          >
            INQUIRE DATES & PACKAGES
          </button>
        </div>
      </section>

    </div>
  );
}
