import React, { useEffect, useState } from 'react';
import { ArrowRight, Heart, GraduationCap, Camera, Sparkles, Building2, CheckCircle, MapPin, Instagram } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function HomeView({ setActivePage, onSelectPhoto, onOpenBooking }) {
  const { photos = [], partnerships = [] } = useData();

  const safePhotos = Array.isArray(photos) ? photos : [];
  const safePartnerships = Array.isArray(partnerships) ? partnerships : [];

  // Filter out hidden photos first
  const activePhotos = safePhotos.filter((p) => p && !p.isHidden);

  // Curate featured set: items flagged as isFeaturedHome first, then active photos
  const homeFeatured = activePhotos.filter((p) => p && p.isFeaturedHome);
  const featuredSet = (homeFeatured.length > 0 ? homeFeatured : activePhotos).slice(0, 9);

  const weddingPhotos = activePhotos.filter((p) => p && p.category === 'Wedding');
  const graduationPhotos = activePhotos.filter((p) => p && p.category === 'Graduation');
  const preweddingPhotos = activePhotos.filter((p) => p && p.category === 'Prewedding');
  const editorialPhotos = activePhotos.filter((p) => p && (p.category === 'Editorial' || p.category === 'Portrait'));

  const heroPhoto = activePhotos[0] || safePhotos[0] || {
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000'
  };

  return (
    <div className="w-full bg-background selection:bg-amber-500 selection:text-black">
      
      {/* Hero Section */}
      <section className="relative h-[96vh] w-full overflow-hidden flex items-center justify-center bg-primary">

        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 scale-105 opacity-60"
          style={{ backgroundImage: `url('${heroPhoto?.image || ''}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/30 to-primary" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-2 font-sans text-xs lg:text-sm text-on-primary tracking-[0.4em] uppercase opacity-90 animate-reveal-up bg-surface/10 backdrop-blur-xs px-4 py-1 border border-on-primary/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> LUXURY WEDDING, GRADUATION & EDITORIAL CINEMA
          </span>
          
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-9xl text-on-primary tracking-tight font-normal animate-reveal-up leading-none drop-shadow-2xl">
            JEMARI KILAT
          </h1>
          
          <p className="font-sans text-xs sm:text-sm text-outline-variant tracking-[0.2em] uppercase max-w-xl mx-auto font-light leading-relaxed">
            Capturing sacred vows, graduation milestones, and fine-art portraits through light & shadow.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => { setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full sm:w-auto bg-on-primary text-primary font-sans text-xs tracking-[0.2em] px-8 py-4 uppercase font-semibold hover:bg-outline-variant transition-all duration-300 shadow-xl"
            >
              EXPLORE GALLERY
            </button>
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto bg-transparent border border-on-primary text-on-primary font-sans text-xs tracking-[0.2em] px-8 py-4 uppercase font-semibold hover:bg-on-primary hover:text-primary transition-all duration-300"
            >
              RESERVE SESSION
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
          <span className="font-sans text-[9px] text-on-primary tracking-[0.3em] uppercase opacity-70 font-mono">SCROLL TO DISCOVER</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-on-primary via-on-primary to-transparent animate-pulse" />
        </div>
      </section>

      {/* Featured Collections Section (Elegant Luxury Margins) */}
      <section className="w-full bg-background py-20 border-b border-outline-variant/30">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 border-b border-outline-variant/30 pb-6">
            <div>
              <span className="font-sans text-[10px] text-outline tracking-[0.3em] uppercase block mb-2 font-semibold">
                01 / CURATED GALLERY
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl text-primary font-normal">
                Featured Collections
              </h2>
            </div>
            
            <button
              onClick={() => { setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="mt-4 lg:mt-0 font-sans text-xs tracking-[0.2em] text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 group uppercase"
            >
              VIEW ALL WORKS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Uncropped Pure Photo Masonry Layout (Ukuran Asli Tanpa Dipotong) */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {featuredSet.map((photo) => (
              <div
                key={photo.id}
                onClick={() => onSelectPhoto(photo)}
                className="break-inside-avoid group relative overflow-hidden bg-primary shadow-xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] transition-all duration-500 ease-out border border-outline-variant/30 hover:[transform:perspective(1000px)_rotateX(3deg)_rotateY(-3deg)_translateZ(18px)] rounded-sm cursor-pointer"
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

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 text-[10px] font-mono tracking-widest uppercase z-10">
                    <span className="bg-primary/85 backdrop-blur-md px-3 py-1 text-on-primary border border-on-primary/20 shadow-xl font-bold">
                      {photo.category}
                    </span>
                  </div>

                  {/* Bottom Title Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent p-6 text-on-primary space-y-1 z-10">
                    <span className="font-sans text-[10px] text-amber-300 uppercase tracking-widest block font-bold">
                      {photo.client || 'JEMARI KILAT'}
                    </span>
                    <h3 className="font-serif text-xl text-on-primary font-normal leading-snug drop-shadow-md">
                      {photo.title}
                    </h3>
                    <div className="text-[10px] font-mono text-outline-variant pt-1.5 border-t border-on-primary/15">
                      📍 {photo.location || 'Indonesia'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Varied Multi-Category Photography Showcase Section */}
      <section className="w-full bg-surface py-24 px-6 lg:px-20 border-b border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-sans text-[10px] tracking-[0.4em] text-outline uppercase block mb-2 font-semibold">
              EXPLORE BY CATEGORY
            </span>
            <h2 className="font-serif text-3xl lg:text-5xl text-primary font-normal">
              Diverse Photography Genres
            </h2>
            <p className="font-sans text-xs text-on-surface-variant mt-2">
              Explore our varied portfolio spanning weddings, commencement honors, preweddings, and high-fashion editorials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Category 1: Wedding Sanctuary */}
            <div className="bg-background p-6 border border-outline-variant/30 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-outline-variant/30">
                  <span className="font-sans text-xs tracking-[0.2em] font-semibold text-primary uppercase flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> WEDDING
                  </span>
                  <span className="font-sans text-[10px] text-outline">{weddingPhotos.length} Photos</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {weddingPhotos.slice(0, 3).map((photo) => (
                    <div 
                      key={photo.id}
                      onClick={() => onSelectPhoto(photo)}
                      className="aspect-[3/4] overflow-hidden bg-surface-container cursor-pointer group relative border border-outline-variant/20"
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
                <h3 className="font-serif text-lg text-primary font-normal mb-1">Sanctuary Vows</h3>
                <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed mb-4">
                  Intimate ceremony moments & sacred vows.
                </p>
                <button
                  onClick={() => { setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full font-sans text-[10px] tracking-[0.2em] py-2 border border-primary text-primary hover:bg-primary hover:text-on-primary transition-colors uppercase font-semibold"
                >
                  VIEW WEDDINGS
                </button>
              </div>
            </div>

            {/* Category 2: Graduation Milestones */}
            <div className="bg-background p-6 border border-outline-variant/30 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-outline-variant/30">
                  <span className="font-sans text-xs tracking-[0.2em] font-semibold text-primary uppercase flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-primary" /> GRADUATION
                  </span>
                  <span className="font-sans text-[10px] text-outline">{graduationPhotos.length} Photos</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {graduationPhotos.slice(0, 3).map((photo) => (
                    <div 
                      key={photo.id}
                      onClick={() => onSelectPhoto(photo)}
                      className="aspect-[3/4] overflow-hidden bg-surface-container cursor-pointer group relative border border-outline-variant/20"
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
                <h3 className="font-serif text-lg text-primary font-normal mb-1">Academic Honors</h3>
                <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed mb-4">
                  Commencement portraiture for graduates & cohorts.
                </p>
                <button
                  onClick={() => { setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full font-sans text-[10px] tracking-[0.2em] py-2 border border-primary text-primary hover:bg-primary hover:text-on-primary transition-colors uppercase font-semibold"
                >
                  VIEW GRADUATION
                </button>
              </div>
            </div>

            {/* Category 3: Prewedding & Couples */}
            <div className="bg-background p-6 border border-outline-variant/30 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-outline-variant/30">
                  <span className="font-sans text-xs tracking-[0.2em] font-semibold text-primary uppercase flex items-center gap-2">
                    <Camera className="w-3.5 h-3.5 text-primary" /> PREWEDDING
                  </span>
                  <span className="font-sans text-[10px] text-outline">{preweddingPhotos.length} Photos</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {preweddingPhotos.slice(0, 3).map((photo) => (
                    <div 
                      key={photo.id}
                      onClick={() => onSelectPhoto(photo)}
                      className="aspect-[3/4] overflow-hidden bg-surface-container cursor-pointer group relative border border-outline-variant/20"
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
                <h3 className="font-serif text-lg text-primary font-normal mb-1">Timeless Romance</h3>
                <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed mb-4">
                  Intimate engagement & couple portrait sessions.
                </p>
                <button
                  onClick={() => { setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full font-sans text-[10px] tracking-[0.2em] py-2 border border-primary text-primary hover:bg-primary hover:text-on-primary transition-colors uppercase font-semibold"
                >
                  VIEW PREWEDDING
                </button>
              </div>
            </div>

            {/* Category 4: Editorial & Fine Art */}
            <div className="bg-background p-6 border border-outline-variant/30 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-outline-variant/30">
                  <span className="font-sans text-xs tracking-[0.2em] font-semibold text-primary uppercase flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-primary" /> EDITORIAL
                  </span>
                  <span className="font-sans text-[10px] text-outline">{editorialPhotos.length} Photos</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {editorialPhotos.slice(0, 3).map((photo) => (
                    <div 
                      key={photo.id}
                      onClick={() => onSelectPhoto(photo)}
                      className="aspect-[3/4] overflow-hidden bg-surface-container cursor-pointer group relative border border-outline-variant/20"
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
                <h3 className="font-serif text-lg text-primary font-normal mb-1">High Fashion</h3>
                <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed mb-4">
                  Commercial campaigns & fine-art portraiture.
                </p>
                <button
                  onClick={() => { setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full font-sans text-[10px] tracking-[0.2em] py-2 border border-primary text-primary hover:bg-primary hover:text-on-primary transition-colors uppercase font-semibold"
                >
                  VIEW EDITORIAL
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Partnership Studio Photo Section */}
      <section className="w-full bg-background py-24 px-6 lg:px-20 border-b border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="font-sans text-[10px] tracking-[0.4em] text-amber-600 uppercase block font-bold">
              OFFICIAL STUDIO PARTNERS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary font-normal">
              Partnership Studio Photo
            </h2>
            <p className="font-sans text-xs text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
              JEMARI KILAT bekerjasama secara resmi dengan studio foto indoor terkemuka di Medan untuk memfasilitasi sesi foto wisuda, indoor portrait, grup, dan foto keluarga dengan pencahayaan serta dekorasi estetik terbaik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {safePartnerships.map((partner) => (
              <div 
                key={partner.id}
                className="bg-surface p-8 border border-outline-variant/40 hover:border-amber-500/50 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 bg-amber-500 text-black text-[9px] font-mono font-bold px-3 py-1 uppercase tracking-widest">
                  OFFICIAL PARTNER
                </div>

                <div>
                  <div className="w-12 h-12 bg-primary text-amber-300 rounded-full flex items-center justify-center mb-6 shadow-md">
                    <Building2 className="w-6 h-6" />
                  </div>

                  <span className="font-mono text-[10px] text-amber-600 uppercase tracking-widest block font-bold mb-1">
                    {partner.categoryTag || 'INDOOR STUDIO'}
                  </span>
                  <h3 className="font-serif text-2xl text-primary font-bold mb-3">
                    {partner.name}
                  </h3>

                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-6">
                    {partner.description}
                  </p>

                  {Array.isArray(partner.features) && partner.features.length > 0 && (
                    <ul className="space-y-2 font-sans text-xs text-primary mb-6">
                      {partner.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-4 border-t border-outline-variant/30 flex flex-wrap justify-between items-center gap-3 text-xs">
                  <span className="font-mono text-[10px] text-outline uppercase font-semibold">PARTNER RESMI JEMARI KILAT</span>
                  
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

      {/* Philosophy Statement Banner */}
      <section className="w-full bg-primary text-on-primary py-32 px-6 lg:px-20 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="font-sans text-[10px] tracking-[0.4em] text-outline-variant uppercase mb-8 block font-semibold">
            THE PHILOSOPHY
          </span>
          
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-tight mb-8 font-normal">
            "In the absence of color, the essence of the <span className="italic font-normal">soul</span> reveals itself through light and shadow."
          </h2>

          <div className="w-24 h-[1px] bg-on-primary/30 mx-auto mt-12 mb-8" />
          
          <p className="font-sans text-xs tracking-[0.2em] text-outline-variant uppercase">
            JEMARI KILAT VISUAL ARTS — KOTA MEDAN, INDONESIA
          </p>
        </div>
      </section>

      {/* Direct Booking Teaser Section */}
      <section className="w-full bg-surface py-24 px-6 lg:px-20 border-b border-outline-variant/30 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="font-serif text-3xl text-primary font-normal mb-4">
            Ready to Capture Your Story?
          </h3>
          <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-8">
            Whether planning an intimate sanctuary wedding, graduation milestone, or luxury brand editorial, our team is ready to curate your vision.
          </p>
          <button
            onClick={onOpenBooking}
            className="bg-primary text-on-primary font-sans text-xs tracking-[0.2em] px-10 py-4 uppercase font-semibold hover:bg-on-surface-variant transition-colors"
          >
            INQUIRE DATES & PACKAGES
          </button>
        </div>
      </section>

    </div>
  );
}
