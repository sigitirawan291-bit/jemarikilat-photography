import React from 'react';
import { Camera, ShieldCheck, Sparkles, MapPin, Phone, Mail } from 'lucide-react';
import { ADMIN_WA_NUMBER, ADMIN_WA_DISPLAY } from '../utils/whatsapp';
import { useData } from '../context/DataContext';

export default function Footer({ activePage, setActivePage, onOpenBooking }) {
  const { partnerships = [], eventSettings } = useData();

  return (
    <footer className="w-full py-20 px-6 lg:px-16 bg-[#0a0a0c] text-[#f5f5f7] border-t border-amber-500/20 relative overflow-hidden">
      
      {/* Background Gold Ambient Radial Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start relative z-10">
        
        {/* Brand Column */}
        <div className="md:col-span-5 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 p-[1px]">
              <div className="w-full h-full bg-[#0a0a0c] rounded-full flex items-center justify-center font-serif text-amber-400 font-bold text-sm">
                JK
              </div>
            </div>
            <span className="font-serif text-2xl lg:text-3xl tracking-[0.22em] uppercase text-white font-normal">
              JEMARI KILAT
            </span>
          </div>
          
          <p className="font-sans text-xs text-neutral-400 max-w-sm leading-relaxed tracking-wide font-light">
            Luxury wedding, graduation & cinematic editorial visual arts studio. Dedicated to capturing emotional stories through light, contrast, and timeless analogue-inspired framing.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono tracking-widest uppercase rounded-sm">
              <Sparkles className="w-3 h-3 text-amber-400" /> EST. MMXXIV
            </span>
            <span className="text-neutral-500 text-xs">•</span>
            <span className="text-neutral-400 text-[11px] font-sans tracking-widest uppercase">MEDAN, INDONESIA</span>
          </div>
        </div>

        {/* Navigation Column */}
        <div className="md:col-span-3 flex flex-col gap-3 font-sans text-xs tracking-widest uppercase">
          <span className="font-sans text-[10px] text-amber-400/90 mb-2 tracking-[0.3em] font-semibold">EXPLORE PAGES</span>
          
          <button 
            onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-left text-neutral-300 hover:text-amber-400 transition-colors flex items-center gap-2 group"
          >
            <span className="text-neutral-600 group-hover:text-amber-400 transition-colors">—</span> Home Overview
          </button>
          
          <button 
            onClick={() => { setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-left text-neutral-300 hover:text-amber-400 transition-colors flex items-center gap-2 group"
          >
            <span className="text-neutral-600 group-hover:text-amber-400 transition-colors">—</span> Fine Art Gallery
          </button>
          
          <button 
            onClick={() => { setActivePage('video'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-left text-neutral-300 hover:text-amber-400 transition-colors flex items-center gap-2 group"
          >
            <span className="text-neutral-600 group-hover:text-amber-400 transition-colors">—</span> Cinema & Video
          </button>

          {!eventSettings?.isEventPageHidden && (
            <button 
              onClick={() => { setActivePage('event'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-left text-neutral-300 hover:text-amber-400 transition-colors flex items-center gap-2 group font-semibold"
            >
              <span className="text-purple-400">—</span> Client Event Portal
            </button>
          )}

          <button 
            onClick={() => { setActivePage('pricing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-left text-neutral-300 hover:text-amber-400 transition-colors flex items-center gap-2 group"
          >
            <span className="text-neutral-600 group-hover:text-amber-400 transition-colors">—</span> Pricing & Packages
          </button>
          
          <button 
            onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-left text-neutral-300 hover:text-amber-400 transition-colors flex items-center gap-2 group"
          >
            <span className="text-neutral-600 group-hover:text-amber-400 transition-colors">—</span> Studio Contact
          </button>

          <button 
            onClick={() => { setActivePage('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-left text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-2 mt-1"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin CMS Dashboard</span>
          </button>

          <button 
            onClick={() => { setActivePage('fg-dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-left text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-2"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Photographer Portal (FG)</span>
          </button>
        </div>

        {/* Contact & Inquiries */}
        <div className="md:col-span-4 flex flex-col gap-4 font-sans text-xs tracking-widest">
          <span className="font-sans text-[10px] text-amber-400/90 mb-1 tracking-[0.3em] font-semibold uppercase">STUDIO INQUIRIES</span>
          
          <div className="space-y-2 text-neutral-300 normal-case font-light">
            <p className="flex items-center gap-2 text-[13px]">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>jemarikilat@gmail.com</span>
            </p>
            
            <a
              href={`https://wa.me/${ADMIN_WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[13px] text-amber-400 hover:underline font-medium"
            >
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{ADMIN_WA_DISPLAY} (Direct WhatsApp Admin)</span>
            </a>

            <p className="flex items-center gap-2 text-[13px]">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Kota Medan, Sumatra Utara, Indonesia</span>
            </p>
          </div>
          
          {partnerships.length > 0 && (
            <div className="pt-4 border-t border-neutral-800 space-y-2">
              <span className="font-sans text-[10px] text-amber-400/90 tracking-[0.2em] font-semibold block uppercase">
                📸 OFFICIAL MEDAN STUDIO PARTNERS:
              </span>
              <div className="flex flex-wrap gap-2 text-[11px] normal-case">
                {partnerships.map((p) => (
                  <a
                    key={p.id}
                    href={p.instagramUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-neutral-900 px-3 py-1.5 border border-neutral-800 text-neutral-300 hover:text-amber-400 hover:border-amber-500/50 transition-colors font-medium flex items-center gap-1.5 rounded-sm"
                  >
                    <span>🏛️ {p.name}</span>
                    {p.instagram && <span className="text-[10px] text-amber-400/80 font-mono">({p.instagram})</span>}
                  </a>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={onOpenBooking}
            className="mt-2 bg-gradient-to-r from-amber-500 to-amber-400 text-black font-sans text-xs tracking-[0.2em] py-3.5 px-6 text-center uppercase font-bold hover:from-amber-400 hover:to-amber-300 transition-all shadow-lg self-start border border-amber-300/40"
          >
            INQUIRE DATES & PACKAGES
          </button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto border-t border-neutral-900 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10.5px] font-sans text-neutral-500 tracking-widest uppercase gap-4 relative z-10">
        <p>© 2024 JEMARI KILAT STUDIO. ALL RIGHTS RESERVED.</p>
        <div className="flex items-center gap-4">
          <p className="hidden sm:block text-amber-400/60 font-mono">LUXURY EDITORIAL DESIGN</p>
          <button
            onClick={() => { setActivePage('fg-dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full hover:bg-amber-500/20 hover:border-amber-400 transition-all text-[11px] font-semibold tracking-wider normal-case shadow-sm"
            title="Portal Login Tim FG / Photographer"
          >
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>Login Team FG</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
