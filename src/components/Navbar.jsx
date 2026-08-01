import React, { useState } from 'react';
import { Menu, X, User, ShieldCheck } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Navbar({ activePage, setActivePage, onOpenBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { eventSettings } = useData();

  const allNavLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'gallery', label: 'GALLERY' },
    { id: 'video', label: 'VIDEO' },
    { id: 'event', label: 'EVENT' },
    { id: 'pricing', label: 'PRICING & ABOUT' },
    { id: 'contact', label: 'CONTACT & CHAT' },
    { id: 'admin', label: 'ADMIN' },
  ];

  const navLinks = eventSettings?.isEventPageHidden
    ? allNavLinks.filter((link) => link.id !== 'event')
    : allNavLinks;

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isEventDark = activePage === 'event';

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isEventDark 
        ? 'bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 text-white' 
        : 'glass-effect border-b border-outline-variant/30 text-on-surface'
    }`}>
      <div className="h-20 w-full px-6 lg:px-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <button 
            onClick={() => handleNavClick('home')}
            className="text-left group"
          >
            <span className={`font-serif text-2xl lg:text-3xl tracking-[0.2em] font-normal block leading-none ${
              isEventDark ? 'text-white' : 'text-primary'
            }`}>
              JEMARI KILAT
            </span>
            <span className={`font-sans text-[9px] tracking-[0.3em] uppercase block mt-1 transition-colors ${
              isEventDark ? 'text-neutral-400 group-hover:text-purple-400' : 'text-outline group-hover:text-primary'
            }`}>
              PHOTOGRAPHY & CINEMA
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 ml-10">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              const isAdmin = link.id === 'admin';
              const isEvent = link.id === 'event';
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`font-sans text-xs tracking-[0.15em] transition-colors py-2 relative uppercase ${
                    isEventDark
                      ? isActive
                        ? 'text-purple-400 font-semibold'
                        : isEvent
                        ? 'text-purple-300 font-bold'
                        : 'text-neutral-300 hover:text-white font-normal'
                      : isActive 
                        ? 'text-primary font-semibold' 
                        : isAdmin
                        ? 'text-green-600 hover:text-green-700 font-semibold'
                        : 'text-on-surface-variant hover:text-primary font-normal'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className={`absolute bottom-0 left-0 w-full h-[1.5px] animate-fade-in ${
                      isEventDark ? 'bg-purple-500' : 'bg-primary'
                    }`} />
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
            className={`hidden sm:block font-sans text-xs tracking-[0.1em] font-semibold px-5 py-3 border transition-all duration-300 uppercase ${
              isEventDark
                ? 'bg-purple-600 text-white border-purple-500 hover:bg-purple-700 shadow-md shadow-purple-900/40'
                : 'bg-primary text-on-primary border-primary hover:bg-transparent hover:text-primary'
            }`}
          >
            BOOK SESSION
          </button>

          <button 
            onClick={() => handleNavClick('admin')}
            title="Kelola Website (Admin Dashboard)" 
            className="w-9 h-9 rounded-full bg-green-800 flex items-center justify-center text-white hover:bg-green-900 transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>

          <button 
            onClick={() => handleNavClick('contact')}
            title="Account & Contact" 
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              isEventDark ? 'bg-neutral-800 text-white hover:bg-purple-600' : 'bg-primary text-on-primary hover:bg-outline'
            }`}
          >
            <User className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 focus:outline-none ${isEventDark ? 'text-white' : 'text-primary'}`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden px-6 py-6 flex flex-col gap-4 animate-fade-in ${
          isEventDark ? 'bg-neutral-950 border-b border-neutral-800 text-white' : 'bg-surface border-b border-outline-variant/40'
        }`}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-left font-sans text-sm tracking-[0.15em] py-2 uppercase border-b ${
                isEventDark ? 'border-neutral-800' : 'border-outline-variant/20'
              } ${
                activePage === link.id 
                  ? isEventDark ? 'text-purple-400 font-bold' : 'text-primary font-bold' 
                  : isEventDark ? 'text-neutral-300' : 'text-on-surface-variant'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className={`mt-2 w-full font-sans text-xs tracking-[0.15em] py-3 text-center uppercase font-bold ${
              isEventDark ? 'bg-purple-600 text-white' : 'bg-primary text-on-primary'
            }`}
          >
            BOOK SESSION
          </button>
        </div>
      )}
    </header>
  );
}
