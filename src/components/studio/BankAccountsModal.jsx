import React, { useState } from 'react';
import { X, CreditCard, Plus, Trash2, CheckCircle2, Star, Building, Wallet, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

const BANK_OPTIONS = [
  'Bank BCA', 'Bank Mandiri', 'Bank BRI', 'Bank BNI', 'Bank Syariah Indonesia (BSI)',
  'Bank Danamon', 'Bank Permata', 'Bank CIMB Niaga', 'GoPay (E-Wallet)', 'OVO (E-Wallet)', 'DANA (E-Wallet)', 'ShopeePay'
];

export default function BankAccountsModal({ isOpen, onClose, photographer }) {
  const { 
    addPhotographerBankAccount, 
    deletePhotographerBankAccount, 
    setPrimaryPhotographerBankAccount 
  } = useData();

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    bankName: 'Bank BCA',
    accountNumber: '',
    accountHolder: photographer?.name || '',
    isPrimary: false
  });

  if (!isOpen || !photographer) return null;

  const bankAccounts = photographer.bankAccounts || [];

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.accountNumber || !formData.accountHolder) {
      alert('Nomor Rekening dan Nama Pemilik Rekening wajib diisi!');
      return;
    }

    addPhotographerBankAccount(photographer.id, formData);
    setFormData({
      bankName: 'Bank BCA',
      accountNumber: '',
      accountHolder: photographer.name || '',
      isPrimary: false
    });
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border border-slate-200/90 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl text-slate-900 p-6 sm:p-8 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
              <CreditCard size={24} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-mono text-emerald-600 font-bold">
                Rekening Bank & E-Wallet
              </span>
              <h2 className="text-xl font-serif font-extrabold text-slate-900">
                Kelola Multiple Rekening ({bankAccounts.length})
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

        {/* LIST OF BANK ACCOUNTS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider">
              Daftar Rekening Terdaftar:
            </h3>

            {!showAddForm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Plus size={14} /> + Tambah Rekening Bank / E-Wallet
              </button>
            )}
          </div>

          {bankAccounts.length === 0 ? (
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-2">
              <p className="text-xs text-slate-500">Belum ada rekening bank yang ditambahkan.</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="text-xs font-bold text-emerald-700 underline"
              >
                + Tambah Rekening Pertama Anda
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {bankAccounts.map((acc) => (
                <div
                  key={acc.id}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    acc.isPrimary
                      ? 'bg-emerald-50/70 border-emerald-300 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 font-serif">{acc.bankName}</span>
                      {acc.isPrimary && (
                        <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-mono font-bold rounded-md flex items-center gap-1">
                          <Star size={10} className="fill-white" /> Rekening Utama
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-mono font-bold text-slate-800 tracking-wider">
                      {acc.accountNumber}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      a.n {acc.accountHolder}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!acc.isPrimary && (
                      <button
                        onClick={() => setPrimaryPhotographerBankAccount(photographer.id, acc.id)}
                        className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 text-[11px] font-semibold rounded-lg transition-colors"
                      >
                        Set Utama
                      </button>
                    )}

                    <button
                      onClick={() => deletePhotographerBankAccount(photographer.id, acc.id)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Hapus Rekening"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ADD BANK ACCOUNT FORM */}
        {showAddForm && (
          <form onSubmit={handleAddSubmit} className="p-5 bg-slate-50 border border-slate-200 rounded-3xl space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 font-mono uppercase">+ Tambah Rekening / E-Wallet Baru</h4>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-semibold"
              >
                Batal
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Bank / Provider E-Wallet</label>
              <select
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-600"
              >
                {BANK_OPTIONS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor Rekening / No. E-Wallet *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 8000123991"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Pemilik Rekening *</label>
                <input
                  type="text"
                  required
                  placeholder="A.n Sesuai Buku Tabungan"
                  value={formData.accountHolder}
                  onChange={(e) => setFormData({ ...formData, accountHolder: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="isPrimaryCheckbox"
                checked={formData.isPrimary}
                onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <label htmlFor="isPrimaryCheckbox" className="text-xs font-semibold text-slate-700 cursor-pointer">
                Jadikan sebagai Rekening Utama (Primary Transfer)
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md active:scale-95"
            >
              Simpan Rekening Ini
            </button>
          </form>
        )}

        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}
