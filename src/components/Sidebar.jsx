import React from 'react';
import { 
  Layers, Folder, Users, Share2, Hash, Sparkles, 
  Menu, X, ShieldCheck, ChevronRight 
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Sidebar({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const { 
    projects = [], 
    photographers = [], 
    socialPosts = []
  } = useData();

  const navItems = [
    {
      id: 'overview',
      label: 'Overview Dashboard',
      icon: Layers,
      count: null,
      badgeColor: ''
    },
    {
      id: 'projects',
      label: 'Project Photography',
      icon: Folder,
      count: projects.length,
      badgeColor: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'team',
      label: 'Tim Crew & Honorarium',
      icon: Users,
      count: photographers.length,
      badgeColor: 'bg-indigo-100 text-indigo-700'
    },
    {
      id: 'sosmed',
      label: 'Marketing & Sosmed',
      icon: Share2,
      count: socialPosts.length,
      badgeColor: 'bg-purple-100 text-purple-700'
    },
    {
      id: 'campaigns',
      label: 'Promo & Campaign',
      icon: Hash,
      count: null,
      badgeColor: ''
    }
  ];

  return (
    <>
      {/* Mobile Top Header Bar */}
      <div className="md:hidden sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-blue-500/20">
            JK
          </div>
          <div>
            <span className="font-bold text-sm text-slate-900 tracking-tight font-serif block">
              JEMARI KILAT
            </span>
            <span className="text-[9px] text-slate-500 font-medium block">Studio Tools</span>
          </div>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Left Sidebar Menu */}
      <aside 
        className={`
          fixed md:sticky top-0 left-0 z-50 h-screen w-72 bg-white/90 backdrop-blur-xl border-r border-slate-200/90 shadow-3d-sm
          flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-5 flex flex-col gap-6 overflow-y-auto">
          {/* Brand Logo Section */}
          <div className="flex items-center gap-3 pt-1 pb-4 border-b border-slate-100">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white flex items-center justify-center font-bold text-base shadow-md shadow-blue-500/25 shrink-0">
              JK
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-extrabold text-base text-slate-900 tracking-tight font-serif truncate">
                  JEMARI KILAT
                </span>
              </div>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-200/70 text-[9px] font-mono font-bold rounded-full uppercase tracking-wider inline-block mt-0.5">
                Studio Tools v2.5
              </span>
              <span className="text-[10px] text-slate-500 font-medium block truncate mt-1">
                Studio Management Hub
              </span>
            </div>
          </div>

          {/* Navigation Menu Section */}
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block px-3 mb-2">
              Navigation Menu
            </span>

            {/* Vertical Navigation Links */}
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`
                      w-full px-3.5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between group text-left
                      ${isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon size={18} className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-600'} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.count !== null ? (
                      <span 
                        className={`
                          text-[10px] font-mono font-bold px-2 py-0.5 rounded-full transition-colors
                          ${isActive 
                            ? 'bg-white/20 text-white' 
                            : `${item.badgeColor} border border-slate-200/60`
                          }
                        `}
                      >
                        {item.count}
                      </span>
                    ) : (
                      <ChevronRight size={14} className={isActive ? 'text-white/70' : 'text-slate-300 group-hover:text-slate-400'} />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom User Profile */}
        <div className="p-4 border-t border-slate-200/80 bg-slate-50/50">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-3d-sm">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xs font-bold font-mono shadow-sm">
              SI
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-800 block truncate">Sigit Irawan</span>
                <ShieldCheck size={13} className="text-blue-600 shrink-0" />
              </div>
              <span className="text-[10px] text-slate-500 block truncate font-medium">
                Studio Owner / Lead
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
