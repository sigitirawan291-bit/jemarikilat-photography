import React, { useState } from 'react';
import { Check, ChevronDown, Sparkles, Send, Heart, GraduationCap, Download, Users, Camera, Zap } from 'lucide-react';
import { FAQS } from '../data/portfolioData';
import { useData } from '../context/DataContext';
import { downloadPricelist } from '../utils/downloadPricelist';

export default function PricingView({ onSelectPackage, onOpenBooking }) {
  const { getPackagesByCategory } = useData();
  const [activeTab, setActiveTab] = useState('wedding');
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const categoriesList = [
    { id: 'wedding', label: 'WEDDING', icon: Heart },
    { id: 'graduation', label: 'GRADUATION', icon: GraduationCap },
    { id: 'engagement', label: 'ENGAGEMENT', icon: Sparkles },
    { id: 'prewedding', label: 'PREWEDDING', icon: Camera },
    { id: 'group', label: 'FOTO GRUP', icon: Users },
    { id: 'special', label: 'SPECIAL SESSION', icon: Camera },
    { id: 'event', label: 'EVENT DOCUMENTARIES', icon: Zap },
  ];

  const displayedPackages = getPackagesByCategory(activeTab);

  return (
    <div className="w-full pt-28 pb-24 px-6 lg:px-16 bg-[#0d0d0e] text-white min-h-screen font-sans">
      <div className="max-w-[1440px] mx-auto space-y-20">
        
        {/* Studio Philosophy Header */}
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="font-sans text-[10px] tracking-[0.4em] text-[#d4af37] uppercase block font-bold">
            ABOUT & PHILOSOPHY
          </span>
          <h1 className="font-sans text-4xl lg:text-6xl text-white font-extrabold leading-tight">
            Crafting Timeless Visual Histories
          </h1>
          
          <div className="text-left font-sans text-xs lg:text-sm text-neutral-300 space-y-4 leading-relaxed bg-[#141417] p-8 lg:p-12 rounded-xs shadow-2xl">
            <strong className="text-white font-sans text-base block mb-1">JEMARI KILAT STUDIO</strong>
            <p className="italic font-sans text-base lg:text-lg text-neutral-200 leading-relaxed font-normal">
              "To the world, time moves forward without ceasing. But for Jemari Kilat, time can be stopped. We are here to freeze life's finest moments into an everlasting masterpiece, through swift instincts and the gentle art of photography."
            </p>
          </div>
        </div>

        {/* Pricing & Packages Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="font-sans text-[10px] tracking-[0.4em] text-[#d4af37] uppercase block font-bold">
              INVESTMENT & COLLECTIONS
            </span>
            <h2 className="font-sans text-3xl lg:text-5xl text-white font-extrabold">
              Pricing Packages
            </h2>
            <p className="font-sans text-xs text-neutral-400 font-normal">
              Seluruh paket investasi mencakup file digital resolusi tinggi dengan retouch profesional dan galeri digital privat.
            </p>
          </div>

          {/* TAB BAR & DOWNLOAD ACTION */}
          <div className="py-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12">
            
            <div className="flex flex-wrap items-center gap-2 lg:gap-3">
              {categoriesList.map((cat) => {
                const IconComp = cat.icon;
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`font-sans text-[11px] tracking-[0.18em] px-4 lg:px-5 py-3 uppercase font-bold transition-all duration-300 flex items-center gap-2 rounded-xs ${
                      isActive
                        ? 'bg-[#d4af37] text-black shadow-lg'
                        : 'bg-[#141417] text-neutral-400 hover:text-white'
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Download Pricelist Button */}
            <button
              onClick={() => downloadPricelist(activeTab)}
              className="w-full lg:w-auto shrink-0 font-sans text-xs tracking-[0.18em] px-6 py-3 bg-[#d4af37] text-black hover:bg-[#f3e5ab] transition-colors uppercase font-bold flex items-center justify-center gap-2 rounded-xs shadow-lg"
            >
              <Download className="w-4 h-4" />
              DOWNLOAD {activeTab.toUpperCase()} PRICELIST
            </button>

          </div>

          {/* Package Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {displayedPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-[#141417] p-8 flex flex-col justify-between transition-all duration-300 rounded-xs shadow-2xl relative ${
                  pkg.recommended ? 'ring-2 ring-[#d4af37]' : ''
                }`}
              >
                {pkg.recommended && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#d4af37] text-black font-sans text-[9px] tracking-[0.25em] px-4 py-1 uppercase font-extrabold shadow-lg rounded-xs">
                    MOST REQUESTED
                  </span>
                )}

                <div>
                  <h3 className="font-sans text-2xl text-white font-extrabold mb-2">
                    {pkg.name}
                  </h3>
                  
                  <p className="font-sans text-xs text-neutral-400 min-h-[40px] leading-relaxed mb-6 font-normal">
                    {pkg.subtitle}
                  </p>

                  <div className="py-6 border-t border-b border-neutral-800 mb-6">
                    <span className="font-sans text-3xl text-white font-extrabold block">
                      {pkg.priceIdr}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400 tracking-wider uppercase mt-1 block font-medium">
                      ESTIMATED INVEST: {pkg.priceUsd} / PROJECT
                    </span>
                  </div>

                  {/* Feature Items List */}
                  <ul className="space-y-3 font-sans text-xs text-neutral-200 mb-8 font-normal">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-[#d4af37] font-bold mt-0.5">—</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onSelectPackage(pkg.id)}
                  className={`w-full font-sans text-xs tracking-[0.2em] py-3.5 text-center uppercase font-bold transition-all flex items-center justify-center gap-2 rounded-xs ${
                    pkg.recommended
                      ? 'bg-[#d4af37] text-black hover:bg-[#f3e5ab] shadow-lg'
                      : 'bg-neutral-800 text-white hover:bg-[#d4af37] hover:text-black'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" /> SELECT {pkg.name.split(' ')[0]}
                </button>

              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-3xl mx-auto pt-8">
          <div className="text-center mb-10 space-y-2">
            <span className="font-sans text-[10px] tracking-[0.4em] text-[#d4af37] uppercase block font-bold">
              QUESTIONS & ANSWERS
            </span>
            <h2 className="font-sans text-3xl text-white font-extrabold">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-[#141417] rounded-xs overflow-hidden shadow-lg"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 font-sans text-lg text-white font-bold hover:text-[#d4af37] focus:outline-none transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-[#d4af37] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 font-sans text-xs text-neutral-300 leading-relaxed font-normal">
                      <p className="mt-3">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onOpenBooking}
              className="bg-[#d4af37] text-black font-sans text-xs tracking-[0.2em] px-8 py-3.5 uppercase font-bold hover:bg-[#f3e5ab] transition-colors shadow-lg rounded-xs"
            >
              HAVE CUSTOM REQUIREMENTS? CONTACT US
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
