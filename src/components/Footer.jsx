import React from 'react';
import { Camera } from 'lucide-react';
import { ADMIN_WA_NUMBER, ADMIN_WA_DISPLAY } from '../utils/whatsapp';
import { useData } from '../context/DataContext';

export default function Footer({ activePage, setActivePage, onOpenBooking }) {
  const { partnerships = [], eventSettings } = useData();
  const isEventDark = activePage === 'event';

  return (
    <footer className={`w-full py-20 px-6 lg:px-20 border-t transition-colors duration-300 ${
      isEventDark ? 'bg-black text-neutral-300 border-neutral-800' : 'bg-primary text-on-primary border-outline/30'
    }`}>
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        
        {/* Brand Column */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <span className="font-serif text-3xl tracking-[0.2em] uppercase text-on-primary">
            JEMARI KILAT
          </span>
          <p className="font-sans text-xs text-outline-variant max-w-sm leading-relaxed tracking-wider">
            High-fashion, luxury wedding & cinematic analogue visual studio based in Indonesia. Capturing raw elegance through contrast, silence, and timeless framing.
          </p>
          <span className="font-sans text-[10px] tracking-[0.25em] text-outline uppercase mt-4">
            ESTABLISHED MMXXIV — GLOBAL PORTFOLIO
          </span>
        </div>

        {/* Navigation Column */}
        <div className="md:col-span-3 flex flex-col gap-3 font-sans text-xs tracking-widest uppercase">
          <span className="font-sans text-[10px] text-outline mb-2 tracking-[0.3em]">EXPLORE</span>
          <button 
            onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-left text-on-primary/80 hover:text-on-primary transition-colors flex items-center gap-2"
          >
            <span className="text-outline">—</span> Home Overview
          </button>
          <button 
            onClick={() => { setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-left text-on-primary/80 hover:text-on-primary transition-colors flex items-center gap-2"
          >
            <span className="text-outline">—</span> Photo Portfolio
          </button>
          <button 
            onClick={() => { setActivePage('video'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-left text-on-primary/80 hover:text-on-primary transition-colors flex items-center gap-2"
          >
            <span className="text-outline">—</span> Cinematic Films
          </button>

          {!eventSettings?.isEventPageHidden && (
            <button 
              onClick={() => { setActivePage('event'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-left text-on-primary/80 hover:text-on-primary transition-colors flex items-center gap-2 font-semibold"
            >
              <span className="text-amber-400">—</span> Stage & Event Cinema
            </button>
          )}
          <button 
            onClick={() => { setActivePage('pricing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-left text-on-primary/80 hover:text-on-primary transition-colors flex items-center gap-2"
          >
            <span className="text-outline">—</span> Investment & Packages
          </button>
          <button 
            onClick={() => { setActivePage('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-left text-green-400 hover:text-green-300 font-semibold transition-colors flex items-center gap-2"
          >
            <span className="text-green-400">—</span> Admin CMS Portal
          </button>
          <button 
            onClick={() => { setActivePage('fg-dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-left text-amber-300 hover:text-amber-200 font-semibold transition-colors flex items-center gap-2"
          >
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>Portal Login FG (Photographer)</span>
          </button>
        </div>

        {/* Contact & Inquiries */}
        <div className="md:col-span-4 flex flex-col gap-3 font-sans text-xs tracking-widest uppercase">
          <span className="font-sans text-[10px] text-outline mb-2 tracking-[0.3em]">STUDIO INQUIRIES</span>
          <p className="text-on-primary/80 normal-case">Email: jemarikilat@gmail.com</p>
          <a
            href={`https://wa.me/${ADMIN_WA_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-primary/80 hover:text-on-primary hover:underline normal-case font-semibold flex items-center gap-1.5"
          >
            <span>WhatsApp / Telp: {ADMIN_WA_DISPLAY} (Direct Admin)</span>
          </a>
          <p className="text-on-primary/80 normal-case">Studio: Kota Medan, Indonesia</p>
          
          <div className="pt-3 border-t border-on-primary/15 mt-2 space-y-1.5">
            <span className="font-sans text-[10px] text-amber-300 tracking-[0.2em] font-semibold block uppercase">
              📸 PARTNERSHIP STUDIO PHOTO (MEDAN):
            </span>
            <div className="flex flex-wrap gap-2 text-[11px] normal-case">
              {partnerships.map((p) => (
                <a
                  key={p.id}
                  href={p.instagramUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface/15 px-2.5 py-1 border border-on-primary/20 text-on-primary hover:text-amber-300 hover:border-amber-400 transition-colors font-semibold flex items-center gap-1"
                >
                  <span>🏛️ {p.name}</span>
                  {p.instagram && <span className="text-[10px] text-amber-300 font-mono">({p.instagram})</span>}
                </a>
              ))}
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="mt-2 bg-on-primary text-primary font-sans text-xs tracking-[0.2em] py-3 px-6 text-center uppercase font-semibold hover:bg-outline-variant transition-colors self-start shadow-md"
          >
            INQUIRE DATES
          </button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto border-t border-on-primary/10 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-sans text-outline tracking-widest uppercase gap-4">
        <p>© 2024 JEMARI KILAT STUDIO. ALL RIGHTS RESERVED.</p>
        <div className="flex items-center gap-4">
          <p className="hidden sm:block">OBSIDIAN & IVORY DESIGN SYSTEM</p>
          <button
            onClick={() => { setActivePage('fg-dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full hover:bg-amber-500/30 hover:border-amber-400 transition-all text-[11px] font-semibold tracking-wider normal-case shadow-sm"
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

