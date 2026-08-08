import React, { useState } from 'react';
import { X, Lock, ShieldCheck, User, Megaphone, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function MarketingLoginModal({ isOpen, onClose }) {
  const { loginMarketing, marketingTeam = [] } = useData();

  const [usernameOrId, setUsernameOrId] = useState('');
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!usernameOrId || !pin) {
      setErrorMsg('Username/Akun dan PIN wajib diisi!');
      return;
    }

    const res = loginMarketing(usernameOrId, pin);
    if (res.success) {
      onClose();
    } else {
      setErrorMsg(res.message || 'Login gagal, periksa data Anda.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border border-slate-200/90 rounded-3xl w-full max-w-md shadow-2xl text-slate-900 p-6 sm:p-8 space-y-6 relative overflow-hidden">
        
        {/* Top Accent Graphic */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center font-bold shrink-0">
              <Megaphone size={22} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-mono text-purple-600 font-bold">
                JEMARI KILAT Studio
              </span>
              <h2 className="text-xl font-serif font-extrabold text-slate-900">
                Portal Tim Digital Marketing
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Silakan masukan **Username / Nama** dan **PIN 4-Digit** akun tim Digital Marketing Anda untuk mengakses tools promosi, campaign Meta/Google Ads, serta content planner studio.
        </p>

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-semibold animate-shake">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <User size={13} className="text-purple-600" /> Username / Akun Marketing
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: maya atau Maya Safitri"
              value={usernameOrId}
              onChange={(e) => setUsernameOrId(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-purple-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <Lock size={13} className="text-purple-600" /> PIN Keamanan (4-Digit)
            </label>
            <input
              type="password"
              maxLength={6}
              required
              placeholder="••••"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono font-bold tracking-widest focus:bg-white focus:outline-none focus:border-purple-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-purple-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            Masuk Portal Digital Marketing <ArrowRight size={15} />
          </button>
        </form>

        {/* Quick Demo Hint */}
        <div className="p-3 bg-purple-50/70 border border-purple-100 rounded-2xl text-[11px] text-purple-900 space-y-1">
          <span className="font-bold block flex items-center gap-1">
            <ShieldCheck size={13} className="text-purple-600" /> Demo Akun Tim Marketing:
          </span>
          <p className="font-mono text-slate-700">
            Username: <span className="font-bold text-purple-700">maya</span> | PIN: <span className="font-bold text-purple-700">1234</span>
          </p>
        </div>
      </div>
    </div>
  );
}
