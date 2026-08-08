import React, { useState } from 'react';
import { Lock, DollarSign, X, KeyRound, Sparkles, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function FinanceLoginModal({ isOpen, onClose, onSuccess }) {
  const { loginFinance } = useData();

  const [pin, setPin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const result = loginFinance(pin);
      setIsLoading(false);

      if (result.success) {
        setPin('');
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      } else {
        setErrorMessage(result.message || 'PIN Keamanan Keuangan tidak valid. (Default PIN: 1234)');
      }
    }, 400);
  };

  const handleQuickDemoFinanceLogin = () => {
    setPin('1234');
    const result = loginFinance('1234');
    if (result.success) {
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border border-slate-200/90 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-lg shadow-emerald-600/25 shrink-0">
            <DollarSign size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 font-serif">Keuangan Studio</h2>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold rounded-full border border-emerald-200">
                FINANCE AUTH
              </span>
            </div>
            <p className="text-xs text-slate-500">Masukkan PIN Keamanan Keuangan untuk melihat omzet & laba studio</p>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2 animate-shake">
            <AlertCircle size={16} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* PIN Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <KeyRound size={14} className="text-emerald-600" /> PIN Keamanan Keuangan
              </span>
              <span className="text-[10px] text-slate-400 font-mono font-normal">Default PIN: 1234</span>
            </label>
            <input
              type="password"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••"
              required
              autoFocus
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-lg font-mono font-bold tracking-widest text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !pin}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/25 active:scale-98 disabled:opacity-50"
          >
            {isLoading ? (
              <span>Memverifikasi Akses Keuangan...</span>
            ) : (
              <>
                <Lock size={15} /> Buka Halaman Keuangan Studio
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Finance Login Preset */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
            ⚡ Quick Demo Login:
          </span>
          <button
            type="button"
            onClick={handleQuickDemoFinanceLogin}
            className="w-full p-2.5 bg-slate-50 hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-200 rounded-xl text-center text-xs font-bold text-slate-700 hover:text-emerald-700 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles size={14} className="text-emerald-600" /> Masuk Instan Keuangan (PIN: 1234)
          </button>
        </div>
      </div>
    </div>
  );
}
