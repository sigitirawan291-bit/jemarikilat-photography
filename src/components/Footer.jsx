import React from 'react';
import { Camera, ShieldCheck, Sparkles, MapPin, Phone, Mail, Instagram } from 'lucide-react';
import { ADMIN_WA_NUMBER, ADMIN_WA_DISPLAY } from '../utils/whatsapp';
import { useData } from '../context/DataContext';

export default function Footer({ activePage, setActivePage, onOpenBooking }) {
  const { partnerships = [], eventSettings } = useData();

  return (
    <footer className="w-full py-20 px-6 lg:px-16 bg-[#FAF8F5] text-[#1A1A1A] border-t border-[#E5E0D8] relative overflow-hidden">
      
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start relative z-10">
        
        {/* Axioo Brand Column */}
        <div className="md:col-span-5 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-[#C5A880] flex items-center justify-center font-serif font-bold text-base shadow-sm">
              JK
            </div>
            <span className="font-serif text-2xl lg:text-3xl tracking-[0.25em] uppercase text-[#1A1A1A] font-normal">
              JEMARI KILAT
            </span>
          </div>
          
          <p className="font-sans text-xs text-[#666158] max-w-sm leading-relaxed tracking-wide font-light">
            Luxury wedding, graduation & cinematic editorial visual arts studio based in Medan. Dedicated to capturing raw emotion through light, contrast, and timeless framing.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFFFFF] border border-[#E5E0D8] text-[#C5A880] text-[10px] font-mono tracking-widest uppercase rounded-sm shadow-xs font-bold">
              <Sparkles className="w-3 h-3 text-[#C5A880]" /> EST. MMXXIV
            </span>
            <span className="text-[#A09B90] text-xs">•</span>
            <span className="text-[#666158] text-[11px] font-sans tracking-widest uppercase font-semibold">MEDAN, INDONESIA</span>
          </div>
        </div>

        {/* Navigation Column */}
        <div className="md:col-span-3 flex flex-col gap-3 font-sans text-xs tracking-widest uppercase">
          <span className="font-sans text-[10px] text-[#C5A880] mb-2 tracking-[0.3em] font-bold block">EXPLORE PAGES</span>
          
          <button 
            onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-left text-[#666158] hover:text-[#1A1A1A] transition-colors flex items-center gap-2 group font-medium"
          >
            <span className="text-[#DCD5C9] group-hover:text-[#C5A880] transition-colors">—</span> Home Overview
          </button>
          
          <button 
            onClick={() => { setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-left text-[#666158] hover:text-[#1A1A1A] transition-colors flex items-center gap-2 group font-medium"
          >
            <span className="text-[#DCD5C9] group-hover:text-[#C5A880] transition-colors">—</span> Fine Art Gallery
          </button>
          
          <button 
            onClick={() => { setActivePage('video'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-left text-[#666158] hover:text-[#1A1A1A] transition-colors flex items-center gap-2 group font-medium"
          >
            <span className="text-[#DCD5C9] group-hover:text-[#C5A880] transition-colors">—</span> Cinema & Video
          </button>

          {!eventSettings?.isEventPageHidden && (
            <button 
              onClick={() => { setActivePage('event'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-left text-[#666158] hover:text-[#1A1A1A] transition-colors flex items-center gap-2 group font-semibold"
            >
              <span className="text-purple-600">—</span> Client Event Portal
            </button>
          )}

          <button 
            onClick={() => { setActivePage('pricing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-left text-[#666158] hover:text-[#1A1A1A] transition-colors flex items-center gap-2 group font-medium"
          >
            <span className="text-[#DCD5C9] group-hover:text-[#C5A880] transition-colors">—</span> Pricing & Packages
          </button>
          
          <button 
            onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-left text-[#666158] hover:text-[#1A1A1A] transition-colors flex items-center gap-2 group font-medium"
          >
            <span className="text-[#DCD5C9] group-hover:text-[#C5A880] transition-colors">—</span> Studio Contact
          </button>

          <button 
            onClick={() => { setActivePage('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-left text-emerald-700 hover:text-emerald-800 font-semibold transition-colors flex items-center gap-2 mt-1"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin CMS Dashboard</span>
          </button>

          <button 
            onClick={() => { setActivePage('fg-dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-left text-amber-700 hover:text-amber-800 font-semibold transition-colors flex items-center gap-2"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Photographer Portal (FG)</span>
          </button>
        </div>

        {/* Contact & Studio Info */}
        <div className="md:col-span-4 flex flex-col gap-4 font-sans text-xs tracking-widest">
          <span className="font-sans text-[10px] text-[#C5A880] mb-1 tracking-[0.3em] font-bold block uppercase">STUDIO INQUIRIES</span>
          
          <div className="space-y-2 text-[#666158] normal-case font-light">
            <p className="flex items-center gap-2 text-[13px]">
              <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>jemarikilat@gmail.com</span>
            </p>
            
            <a
              href={`https://wa.me/${ADMIN_WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[13px] text-[#1A1A1A] hover:text-[#C5A880] hover:underline font-semibold"
            >
              <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>{ADMIN_WA_DISPLAY} (Direct WhatsApp Admin)</span>
            </a>

            <p className="flex items-center gap-2 text-[13px]">
              <MapPin className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>Kota Medan, Sumatra Utara, Indonesia</span>
            </p>
          </div>
          
          {partnerships.length > 0 && (
            <div className="pt-4 border-t border-[#E5E0D8] space-y-2">
              <span className="font-sans text-[10px] text-[#C5A880] tracking-[0.2em] font-bold block uppercase">
                📸 OFFICIAL MEDAN STUDIO PARTNERS:
              </span>
              <div className="flex flex-wrap gap-2 text-[11px] normal-case">
                {partnerships.map((p) => (
                  <a
                    key={p.id}
                    href={p.instagramUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FFFFFF] px-3 py-1.5 border border-[#E5E0D8] text-[#1A1A1A] hover:text-[#C5A880] hover:border-[#C5A880] transition-colors font-medium flex items-center gap-1.5 rounded-xs shadow-xs"
                  >
                    <span>🏛️ {p.name}</span>
                    {p.instagram && <span className="text-[10px] text-[#C5A880] font-mono">({p.instagram})</span>}
                  </a>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={onOpenBooking}
            className="mt-2 bg-[#1A1A1A] text-white font-sans text-xs tracking-[0.2em] py-3.5 px-6 text-center uppercase font-bold hover:bg-[#C5A880] hover:text-black transition-all shadow-sm self-start border border-[#1A1A1A]"
          >
            INQUIRE DATES & PACKAGES
          </button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto border-t border-[#E5E0D8] mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10.5px] font-sans text-[#7A756C] tracking-widest uppercase gap-4 relative z-10 font-medium">
        <p>© 2024 JEMARI KILAT STUDIO. ALL RIGHTS RESERVED.</p>
        <div className="flex items-center gap-4">
          <p className="hidden sm:block text-[#C5A880] font-mono">AXIOO EDITORIAL DESIGN SYSTEM</p>
          <button
            onClick={() => { setActivePage('fg-dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#FFFFFF] text-[#1A1A1A] border border-[#E5E0D8] rounded-full hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-all text-[11px] font-semibold tracking-wider normal-case shadow-xs"
            title="Portal Login Tim FG / Photographer"
          >
            <Camera className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Login Team FG</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
