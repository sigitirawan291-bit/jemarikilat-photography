import React, { useState } from 'react';
import { Menu, X, User, ShieldCheck, Camera, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Navbar({ activePage, setActivePage, onOpenBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { eventSettings } = useData();

  const allNavLinks = [
    { id: 'home', label: 'HOME' },
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300 bg-[#0d0d0e]/85 backdrop-blur-xl border-b border-amber-500/20 text-[#f5f5f7] shadow-2xl">
      <div className="h-20 w-full px-6 lg:px-16 flex items-center justify-between">
        
        {/* Brand Monogram & Title */}
        <div className="flex items-center gap-8">
          <button 
            onClick={() => handleNavClick('home')}
            className="text-left group flex items-center gap-3 focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 p-[1px] shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0d0d0e] rounded-full flex items-center justify-center font-serif text-amber-400 font-bold text-lg">
                JK
              </div>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl lg:text-3xl tracking-[0.22em] font-normal block leading-none text-white group-hover:text-amber-300 transition-colors">
                JEMARI KILAT
              </span>
              <span className="font-sans text-[8.5px] tracking-[0.35em] uppercase block mt-1 text-amber-500/80 group-hover:text-amber-300 transition-colors font-medium">
                PHOTOGRAPHY & CINEMA
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 ml-6 xl:ml-10">
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
                      ? 'text-amber-400 font-semibold'
                      : isAdmin
                      ? 'text-emerald-400 hover:text-emerald-300 font-medium'
                      : isFg
                      ? 'text-amber-400/90 hover:text-amber-300 font-medium'
                      : 'text-neutral-300 hover:text-white font-normal'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500 to-amber-300 shadow-[0_0_10px_rgba(212,175,55,0.8)] animate-fade-in" />
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
            className="hidden sm:flex items-center gap-2 font-sans text-xs tracking-[0.18em] font-bold px-5 py-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black hover:from-amber-400 hover:to-amber-300 transition-all duration-300 uppercase shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] border border-amber-300/40"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>BOOK SESSION</span>
          </button>

          <button 
            onClick={() => handleNavClick('fg-dashboard')}
            title="Portal Tim FG (Photographer Login)" 
            className="w-9 h-9 rounded-full bg-amber-950/80 border border-amber-500/50 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-black transition-all duration-300 shadow-md"
          >
            <Camera className="w-4 h-4" />
          </button>

          <button 
            onClick={() => handleNavClick('admin')}
            title="Kelola Website (Admin Dashboard)" 
            className="w-9 h-9 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all duration-300 shadow-md"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>

          <button 
            onClick={() => handleNavClick('contact')}
            title="Account & Contact" 
            className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-300 hover:bg-amber-500 hover:text-black hover:border-amber-400 transition-all duration-300 shadow-md"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-amber-400 focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-6 py-6 flex flex-col gap-3 bg-[#0d0d0e]/95 backdrop-blur-2xl border-b border-amber-500/30 text-white animate-fade-in shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-left font-sans text-xs tracking-[0.2em] py-3 uppercase border-b border-neutral-800/80 flex items-center justify-between ${
                activePage === link.id ? 'text-amber-400 font-bold' : 'text-neutral-300 hover:text-white'
              }`}
            >
              <span>{link.label}</span>
              {activePage === link.id && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="mt-3 w-full font-sans text-xs tracking-[0.2em] py-3.5 text-center uppercase font-bold bg-gradient-to-r from-amber-500 to-amber-400 text-black shadow-lg"
          >
            BOOK SESSION
          </button>
        </div>
      )}
    </header>
  );
}
