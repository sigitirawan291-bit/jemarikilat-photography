import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200/80 text-slate-500 py-6 text-center text-xs font-medium shadow-3d-sm">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900 font-serif">JEMARI KILAT PHOTOGRAPHY</span>
          <span>• Studio Operations & Marketing Hub</span>
        </div>
        <div className="text-[11px] text-slate-400 font-mono">
          © {new Date().getFullYear()} Jemari Kilat. All rights reserved. Medan, Indonesia.
        </div>
      </div>
    </footer>
  );
}
