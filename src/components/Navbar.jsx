import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, User, ShieldCheck, Camera, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Navbar({ activePage, setActivePage, onOpenBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { eventSettings } = useData();
  const inactivityTimerRef = useRef(null);

  // Auto-hide Navbar after 3 seconds of inactivity
  useEffect(() => {
    const resetTimer = () => {
      setIsVisible(true);
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      inactivityTimerRef.current = setTimeout(() => {
        // Do not hide if mobile menu is open
        if (!mobileMenuOpen) {
          setIsVisible(false);
        }
      }, 3500);
    };

    // Initial timer launch
    resetTimer();

    // Event listeners to detect any user interaction
    const events = ['mousemove', 'scroll', 'touchstart', 'keydown', 'click'];
    events.forEach((evt) => window.addEventListener(evt, resetTimer, { passive: true }));

    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      events.forEach((evt) => window.removeEventListener(evt, resetTimer));
    };
  }, [mobileMenuOpen]);

  const allNavLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'studio-tools', label: 'STUDIO TOOLS ⚡' },
    { id: 'gallery', label: 'GALLERY' },
    { id: 'video', label: 'CINEMA' },
    { id: 'event', label: 'EVENT PORTAL' },
    { id: 'pricing', label: 'PRICING & ABOUT' },
    { id: 'contact', label: 'CONTACT' },
    { id: 'admin', label: 'ADMIN' },
    { id: 'fg-dashboard', label: 'FG PORTAL' },
  ];

  const navLinks = eventSettings?.isEventPageHidden
    ? allNavLinks.filter((link) => link.id !== 'event')
    : allNavLinks;

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    setIsVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-transform duration-500 ease-in-out bg-gradient-to-b from-black/90 via-black/40 to-transparent backdrop-blur-md text-white ${
        isVisible ? 'translate-y-0' : '-translate-y-full pointer-events-none'
      }`}
    >
      <div className="h-20 w-full px-6 lg:px-16 flex items-center justify-between">
        
        {/* Brand Logo & Sans-serif Title */}
        <div className="flex items-center gap-8">
          <button 
            onClick={() => handleNavClick('home')}
            className="text-left group flex items-center gap-3 focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-black text-[#d4af37] border border-[#d4af37]/40 flex items-center justify-center font-sans font-bold text-base shadow-lg group-hover:scale-105 transition-transform">
              JK
            </div>
            <div>
              <span className="font-sans text-lg sm:text-xl lg:text-2xl tracking-[0.2em] font-bold block leading-none text-white group-hover:text-[#d4af37] transition-colors">
                JEMARI KILAT
              </span>
              <span className="font-sans text-[8.5px] tracking-[0.35em] uppercase block mt-1 text-neutral-400 font-semibold group-hover:text-[#d4af37] transition-colors">
                PHOTOGRAPHY & CINEMA
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 ml-6">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              const isAdmin = link.id === 'admin';
              const isFg = link.id === 'fg-dashboard';
              
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`font-sans text-[11px] tracking-[0.2em] transition-all duration-300 py-2 relative uppercase ${
                    isActive
                      ? 'text-[#d4af37] font-bold'
                      : isAdmin
                      ? 'text-emerald-400 hover:text-emerald-300 font-semibold'
                      : isFg
                      ? 'text-amber-400 hover:text-amber-300 font-semibold'
                      : 'text-neutral-300 hover:text-white font-medium'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d4af37] animate-fade-in" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 lg:gap-4">
          <button
            onClick={onOpenBooking}
            className="hidden sm:flex items-center gap-2 font-sans text-xs tracking-[0.2em] font-bold px-5 py-2.5 bg-[#d4af37] text-black hover:bg-[#f3e5ab] transition-all duration-300 uppercase shadow-xl rounded-xs"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>BOOK SESSION</span>
          </button>

          <button 
            onClick={() => handleNavClick('fg-dashboard')}
            title="Portal Tim FG (Photographer Login)" 
            className="w-9 h-9 rounded-full bg-amber-950/80 text-amber-400 border border-amber-500/40 flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all shadow-md"
          >
            <Camera className="w-4 h-4" />
          </button>

          <button 
            onClick={() => handleNavClick('admin')}
            title="Kelola Website (Admin Dashboard)" 
            className="w-9 h-9 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-md"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>

          <button 
            onClick={() => handleNavClick('contact')}
            title="Account & Contact" 
            className="w-9 h-9 rounded-full bg-neutral-900 text-white border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-md"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[#d4af37] focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-6 py-6 flex flex-col gap-3 bg-[#0d0d0e]/95 backdrop-blur-2xl text-white animate-fade-in border-b border-neutral-800 shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-left font-sans text-xs tracking-[0.2em] py-3 uppercase border-b border-neutral-800 flex items-center justify-between ${
                activePage === link.id ? 'text-[#d4af37] font-bold' : 'text-neutral-300 hover:text-white'
              }`}
            >
              <span>{link.label}</span>
              {activePage === link.id && <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="mt-3 w-full font-sans text-xs tracking-[0.2em] py-3.5 text-center uppercase font-bold bg-[#d4af37] text-black hover:bg-[#f3e5ab] transition-colors rounded-xs shadow-lg"
          >
            BOOK SESSION
          </button>
        </div>
      )}
    </header>
  );
}
