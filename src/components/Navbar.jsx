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
    <header className="fixed top-0 w-full z-50 transition-all duration-300 bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-[#E5E0D8] text-[#1A1A1A] shadow-xs">
      <div className="h-20 w-full px-6 lg:px-16 flex items-center justify-between">
        
        {/* Axioo Signature Brand Logo */}
        <div className="flex items-center gap-8">
          <button 
            onClick={() => handleNavClick('home')}
            className="text-left group flex items-center gap-3 focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-[#C5A880] border border-[#C5A880]/50 flex items-center justify-center font-serif font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              JK
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl lg:text-3xl tracking-[0.25em] font-normal block leading-none text-[#1A1A1A] group-hover:text-[#C5A880] transition-colors">
                JEMARI KILAT
              </span>
              <span className="font-sans text-[8.5px] tracking-[0.35em] uppercase block mt-1 text-[#7A756C] font-semibold group-hover:text-[#C5A880] transition-colors">
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
                      ? 'text-[#C5A880] font-bold'
                      : isAdmin
                      ? 'text-emerald-700 hover:text-emerald-800 font-semibold'
                      : isFg
                      ? 'text-amber-700 hover:text-amber-800 font-semibold'
                      : 'text-[#666158] hover:text-[#1A1A1A] font-medium'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5A880] animate-fade-in" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Axioo Action Controls */}
        <div className="flex items-center gap-3 lg:gap-4">
          <button
            onClick={onOpenBooking}
            className="hidden sm:flex items-center gap-2 font-sans text-xs tracking-[0.2em] font-bold px-5 py-2.5 bg-[#1A1A1A] text-white hover:bg-[#C5A880] hover:text-black transition-all duration-300 uppercase shadow-sm border border-[#1A1A1A]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>BOOK SESSION</span>
          </button>

          <button 
            onClick={() => handleNavClick('fg-dashboard')}
            title="Portal Tim FG (Photographer Login)" 
            className="w-9 h-9 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 hover:bg-amber-600 hover:text-white transition-all shadow-xs"
          >
            <Camera className="w-4 h-4" />
          </button>

          <button 
            onClick={() => handleNavClick('admin')}
            title="Kelola Website (Admin Dashboard)" 
            className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 hover:bg-emerald-700 hover:text-white transition-all shadow-xs"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>

          <button 
            onClick={() => handleNavClick('contact')}
            title="Account & Contact" 
            className="w-9 h-9 rounded-full bg-[#F5F2EB] border border-[#E5E0D8] flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all shadow-xs"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1A1A1A] hover:text-[#C5A880] focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-6 py-6 flex flex-col gap-3 bg-[#FAF8F5] border-b border-[#E5E0D8] text-[#1A1A1A] animate-fade-in shadow-xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-left font-sans text-xs tracking-[0.2em] py-3 uppercase border-b border-[#E5E0D8] flex items-center justify-between ${
                activePage === link.id ? 'text-[#C5A880] font-bold' : 'text-[#666158] hover:text-[#1A1A1A]'
              }`}
            >
              <span>{link.label}</span>
              {activePage === link.id && <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="mt-3 w-full font-sans text-xs tracking-[0.2em] py-3.5 text-center uppercase font-bold bg-[#1A1A1A] text-white hover:bg-[#C5A880] hover:text-black transition-colors"
          >
            BOOK SESSION
          </button>
        </div>
      )}
    </header>
  );
}
