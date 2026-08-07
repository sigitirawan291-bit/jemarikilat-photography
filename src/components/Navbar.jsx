import React from 'react';
import { Sparkles, ShieldCheck, User, Camera, Folder, Users, Share2, Layers, RefreshCw } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Navbar({ activeTab, setActiveTab }) {
  const { resetAllData } = useData();

  const handleReset = () => {
    if (window.confirm('Reset seluruh data demo ke kondisi awal factory reset?')) {
      resetAllData();
      window.location.reload();
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-3d-sm">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Studio Management Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/20">
            JK
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-slate-900 tracking-tight font-serif">
                JEMARI KILAT
              </span>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-200 text-[10px] font-mono font-bold rounded-full uppercase tracking-wider">
                Studio Tools v2.5
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium block">
              Photography Studio Management & Digital Marketing Hub
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            title="Reset Data Studio"
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-200"
          >
            <RefreshCw size={13} /> Reset Demo
          </button>

          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 text-xs font-bold font-mono">
              SI
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-slate-800 block leading-tight">Sigit Irawan</span>
              <span className="text-[10px] text-slate-500 block">Studio Owner / Lead</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
