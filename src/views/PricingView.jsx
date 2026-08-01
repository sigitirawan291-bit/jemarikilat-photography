import React, { useState } from 'react';
import { Check, ChevronDown, Sparkles, Send, Heart, GraduationCap, Download, Users, Camera, Zap } from 'lucide-react';
import { FAQS } from '../data/portfolioData';
import { useData } from '../context/DataContext';
import { downloadPricelist } from '../utils/downloadPricelist';

export default function PricingView({ onSelectPackage, onOpenBooking }) {
  const { getPackagesByCategory } = useData();
  const [activeTab, setActiveTab] = useState('wedding'); // 'wedding' | 'graduation' | 'engagement' | 'prewedding' | 'group' | 'special' | 'event'
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
    <div className="w-full pt-28 pb-24 px-6 lg:px-20 bg-background min-h-screen">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Studio Bio & Approach */}
        <div className="max-w-4xl mx-auto mb-24 text-center">
          <span className="font-sans text-[10px] tracking-[0.4em] text-outline uppercase block mb-3 font-semibold">
            ABOUT & PHILOSOPHY
          </span>
          <h1 className="font-serif text-4xl lg:text-6xl text-primary font-normal mb-8 leading-tight">
            Crafting Timeless Visual Histories
          </h1>
          
          <div className="text-left font-sans text-xs lg:text-sm text-on-surface-variant space-y-4 leading-relaxed bg-surface p-8 lg:p-12 border border-outline-variant/30">
            <strong className="text-primary font-serif text-base block mb-2">JEMARI KILAT STUDIO</strong>
            <p className="italic font-serif text-sm lg:text-base text-primary/90 leading-relaxed">
              "To the world, time moves forward without ceasing. But for Jemari Kilat, time can be stopped. We are here to freeze life's finest moments into an everlasting masterpiece, through swift instincts and the gentle art of photography."
            </p>
          </div>
        </div>

        {/* Pricing & Packages Section */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-sans text-[10px] tracking-[0.4em] text-outline uppercase block mb-2 font-semibold">
              INVESTMENT & COLLECTIONS
            </span>
            <h2 className="font-serif text-3xl lg:text-5xl text-primary font-normal">
              Pricing Packages
            </h2>
            <p className="font-sans text-xs text-on-surface-variant mt-2">
              All collections include high-resolution color corrected files, private digital gallery access, and master retouched prints.
            </p>
          </div>

          {/* Pricing Category Switcher Tabs & Download Action */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-16 pb-6 border-b border-outline-variant/30">
            
            <div className="flex flex-wrap items-center gap-2 lg:gap-3">
              {categoriesList.map((cat) => {
                const IconComp = cat.icon;
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`font-sans text-[11px] tracking-[0.15em] px-4 lg:px-5 py-3 uppercase font-semibold transition-all duration-300 flex items-center gap-2 border ${
                      isActive
                        ? 'bg-primary text-on-primary border-primary shadow-lg'
                        : 'bg-surface text-on-surface-variant border-outline-variant/40 hover:border-primary'
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Download Pricelist Button for Selected Category */}
            <button
              onClick={() => downloadPricelist(activeTab)}
              className="w-full lg:w-auto shrink-0 font-sans text-xs tracking-[0.15em] px-6 py-3.5 bg-transparent border border-primary text-primary hover:bg-primary hover:text-on-primary transition-colors uppercase font-semibold flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              DOWNLOAD {activeTab.toUpperCase()} PRICELIST
            </button>

          </div>

          {/* Package Cards (3 Cards matching original format) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {displayedPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-surface border p-8 flex flex-col justify-between transition-all duration-300 ${
                  pkg.recommended 
                    ? 'border-primary shadow-2xl relative ring-1 ring-primary' 
                    : 'border-outline-variant/40 hover:border-outline'
                }`}
              >
                {pkg.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-on-primary font-sans text-[9px] tracking-[0.25em] px-4 py-1 uppercase font-semibold">
                    MOST REQUESTED
                  </span>
                )}

                <div>
                  <h3 className="font-serif text-2xl text-primary font-normal mb-2">
                    {pkg.name}
                  </h3>
                  
                  <p className="font-sans text-xs text-on-surface-variant min-h-[40px] leading-relaxed mb-6">
                    {pkg.subtitle}
                  </p>

                  <div className="py-6 border-t border-b border-outline-variant/40 mb-6">
                    <span className="font-serif text-3xl text-primary font-normal block">
                      {pkg.priceIdr}
                    </span>
                    <span className="font-sans text-[10px] text-outline tracking-wider uppercase mt-1 block">
                      ESTIMATED INVEST: {pkg.priceUsd} / PROJECT
                    </span>
                  </div>

                  {/* Feature Items List */}
                  <ul className="space-y-3 font-sans text-xs text-on-surface-variant mb-8">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-primary font-bold mt-0.5">—</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onSelectPackage(pkg.id)}
                  className={`w-full font-sans text-xs tracking-[0.2em] py-3.5 text-center uppercase font-semibold transition-colors flex items-center justify-center gap-2 ${
                    pkg.recommended
                      ? 'bg-primary text-on-primary hover:bg-on-surface-variant'
                      : 'bg-transparent border border-primary text-primary hover:bg-primary hover:text-on-primary'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" /> SELECT {pkg.name.split(' ')[0]}
                </button>

              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-sans text-[10px] tracking-[0.4em] text-outline uppercase block mb-2 font-semibold">
              QUESTIONS & ANSWERS
            </span>
            <h2 className="font-serif text-3xl text-primary font-normal">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-surface border border-outline-variant/40 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 font-serif text-lg text-primary focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-outline transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 font-sans text-xs text-on-surface-variant leading-relaxed border-t border-outline-variant/20">
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
              className="bg-primary text-on-primary font-sans text-xs tracking-[0.2em] px-8 py-3.5 uppercase font-semibold hover:bg-outline transition-colors"
            >
              HAVE CUSTOM REQUIREMENTS? CONTACT US
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
