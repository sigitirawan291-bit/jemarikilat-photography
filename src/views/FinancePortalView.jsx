import React, { useState } from 'react';
import { 
  DollarSign, Lock, LogOut, TrendingUp, Calendar, Filter, Search, 
  CheckCircle2, Clock, AlertCircle, ArrowUpRight, ArrowDownRight, 
  PieChart, ShieldCheck, FileText, Download, Wallet, CreditCard, Edit3
} from 'lucide-react';
import { useData } from '../context/DataContext';
import FinanceLoginModal from '../components/studio/FinanceLoginModal';
import EditProfileModal from '../components/studio/EditProfileModal';

export default function FinancePortalView() {
  const { 
    isFinanceLoggedIn, 
    logoutFinance, 
    projects = [], 
    updateProject,
    currentFinanceMember
  } = useData();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [selectedMonthFilter, setSelectedMonthFilter] = useState('2026-08');
  const [selectedPaymentStatusFilter, setSelectedPaymentStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Unauthenticated / Locked View
  if (!isFinanceLoggedIn) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="relative bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
              <DollarSign size={13} /> Private Financial Vault
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-tight">
              Keuangan & <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Kas Studio</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Halaman terproteksi rahasia untuk melihat **Laporan Omzet Pendapatan**, **Uang Masuk (Cash In)**, **Piutang Client**, **Beban Honorarium Crew**, dan **Laba Bersih Studio (Net Profit)**. Masukkan PIN Keamanan Keuangan Anda.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
              >
                <Lock size={16} /> Login ke Halaman Keuangan Studio
              </button>
            </div>
          </div>
        </div>

        {/* Login Modal */}
        <FinanceLoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      </div>
    );
  }

  // --- LOGGED IN FINANCE PORTAL VIEW ---
  // Filter projects by month and payment status
  const filteredProjects = projects.filter((p) => {
    const matchesMonth = selectedMonthFilter === 'ALL' || p.eventDate?.startsWith(selectedMonthFilter);
    const matchesPayment = selectedPaymentStatusFilter === 'ALL' || p.paymentStatus === selectedPaymentStatusFilter;
    const matchesSearch = 
      p.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.projectCode?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMonth && matchesPayment && matchesSearch;
  });

  // Calculate Financial Metrics
  let totalRevenue = 0;
  let totalCashCollected = 0;
  let totalPendingReceivables = 0;
  let totalCrewFees = 0;

  filteredProjects.forEach((p) => {
    const deal = Number(p.totalAmount) || 0;
    const paid = Number(p.paidAmount) || 0;
    const pending = deal - paid;
    const crewFeeSum = p.assignedCrew?.reduce((acc, c) => acc + (Number(c.fee) || 0), 0) || 0;

    totalRevenue += deal;
    totalCashCollected += paid;
    totalPendingReceivables += pending;
    totalCrewFees += crewFeeSum;
  });

  const netStudioProfit = totalRevenue - totalCrewFees;

  const handleUpdatePaymentStatus = (projectId, newPaymentStatus) => {
    const proj = projects.find(p => p.id === projectId);
    if (!proj) return;

    let newPaidAmount = proj.paidAmount;
    if (newPaymentStatus === 'Paid Full') {
      newPaidAmount = proj.totalAmount;
    } else if (newPaymentStatus === 'Unpaid') {
      newPaidAmount = 0;
    }

    updateProject(projectId, {
      paymentStatus: newPaymentStatus,
      paidAmount: newPaidAmount
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            {currentFinanceMember && (
              <img
                src={currentFinanceMember.avatar}
                alt={currentFinanceMember.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-xl shrink-0"
              />
            )}

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold rounded-full uppercase">
                  🟢 Finance Officer Logged In
                </span>
                <span className="text-xs text-slate-400 font-mono">{currentFinanceMember?.name || 'Siti Rahma'}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight">
                Laporan Keuangan & <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Kas Studio</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-300">
                {currentFinanceMember?.role || 'Head of Finance & Accounting'} — Rekap omzet bulanan, piutang client, beban honor crew, dan laba bersih studio.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentFinanceMember && (
              <button
                onClick={() => setIsEditProfileModalOpen(true)}
                className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md"
              >
                <Edit3 size={14} /> Edit Data Diri & Foto
              </button>
            )}

            <button
              onClick={logoutFinance}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all border border-white/10"
            >
              <LogOut size={14} /> Keluar Keuangan
            </button>
          </div>
        </div>
      </div>

      {/* 5 Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-3d-sm">
          <span className="text-xs text-slate-500 font-bold block">Omzet Total Deal</span>
          <div className="text-xl font-bold font-mono text-slate-900 mt-2">
            Rp {(totalRevenue / 1000000).toFixed(2)}M
          </div>
          <span className="text-[10px] text-slate-400 font-medium mt-1 block">Total kontrak project</span>
        </div>

        {/* Cash Collected */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-3d-sm">
          <span className="text-xs text-emerald-600 font-bold block">Uang Masuk (Paid)</span>
          <div className="text-xl font-bold font-mono text-emerald-600 mt-2">
            Rp {(totalCashCollected / 1000000).toFixed(2)}M
          </div>
          <span className="text-[10px] text-slate-400 font-medium mt-1 block">DP & Pelunasan terkumpul</span>
        </div>

        {/* Pending Receivables */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-3d-sm">
          <span className="text-xs text-amber-600 font-bold block">Piutang Client Pending</span>
          <div className="text-xl font-bold font-mono text-amber-600 mt-2">
            Rp {(totalPendingReceivables / 1000000).toFixed(2)}M
          </div>
          <span className="text-[10px] text-slate-400 font-medium mt-1 block">Sisa pembayaran client</span>
        </div>

        {/* Total Crew Fees */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-3d-sm">
          <span className="text-xs text-rose-600 font-bold block">Beban Honor Crew</span>
          <div className="text-xl font-bold font-mono text-rose-600 mt-2">
            Rp {(totalCrewFees / 1000000).toFixed(2)}M
          </div>
          <span className="text-[10px] text-slate-400 font-medium mt-1 block">Alokasi fee fotografer</span>
        </div>

        {/* Net Studio Profit */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-2xl border border-emerald-200 shadow-3d-sm">
          <span className="text-xs text-emerald-800 font-bold block">Laba Bersih Studio</span>
          <div className="text-xl font-bold font-mono text-emerald-700 mt-2">
            Rp {(netStudioProfit / 1000000).toFixed(2)}M
          </div>
          <span className="text-[10px] text-emerald-600 font-bold mt-1 block">Net Studio Profit</span>
        </div>
      </div>

      {/* Ledger Filter Controls */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-3d-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
              <Wallet size={20} className="text-emerald-600" /> Ledger Transaksi Finansial Studio
            </h2>
            <p className="text-xs text-slate-500">Rincian cash flow deal client, piutang, fee honor, dan margin studio</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[200px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari client / kode project..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <select
              value={selectedMonthFilter}
              onChange={(e) => setSelectedMonthFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
            >
              <option value="2026-08">Periode: Agustus 2026</option>
              <option value="2026-09">Periode: September 2026</option>
              <option value="2026-07">Periode: Juli 2026</option>
              <option value="ALL">Semua Periode</option>
            </select>

            <select
              value={selectedPaymentStatusFilter}
              onChange={(e) => setSelectedPaymentStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
            >
              <option value="ALL">Status Bayar: Semua</option>
              <option value="Paid Full">Paid Full (Lunas)</option>
              <option value="DP Paid">DP Paid (Termin)</option>
              <option value="Unpaid">Unpaid (Belum Bayar)</option>
            </select>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-mono font-bold text-slate-400 uppercase">
                <th className="py-3 px-4">Project & Client</th>
                <th className="py-3 px-4">Tipe Acara</th>
                <th className="py-3 px-4 text-right">Nilai Deal</th>
                <th className="py-3 px-4 text-right">Cash Masuk</th>
                <th className="py-3 px-4 text-right">Sisa Piutang</th>
                <th className="py-3 px-4 text-right">Beban Honor</th>
                <th className="py-3 px-4 text-right">Laba Studio</th>
                <th className="py-3 px-4 text-center">Status Bayar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredProjects.map((proj) => {
                const deal = Number(proj.totalAmount) || 0;
                const paid = Number(proj.paidAmount) || 0;
                const pending = deal - paid;
                const crewFeeSum = proj.assignedCrew?.reduce((acc, c) => acc + (Number(c.fee) || 0), 0) || 0;
                const margin = deal - crewFeeSum;

                return (
                  <tr key={proj.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div>{proj.clientName}</div>
                      <span className="text-[10px] text-slate-400 font-mono font-normal">{proj.projectCode}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div>{proj.eventType}</div>
                      <span className="text-[10px] text-slate-400 font-mono">📅 {proj.eventDate}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                      Rp {deal.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-600">
                      Rp {paid.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-amber-600">
                      Rp {pending.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-rose-600">
                      Rp {crewFeeSum.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-700">
                      Rp {margin.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <select
                        value={proj.paymentStatus || 'Unpaid'}
                        onChange={(e) => handleUpdatePaymentStatus(proj.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase focus:outline-none cursor-pointer ${
                          proj.paymentStatus === 'Paid Full'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : proj.paymentStatus === 'DP Paid'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-rose-100 text-rose-800 border border-rose-200'
                        }`}
                      >
                        <option value="Paid Full">Paid Full</option>
                        <option value="DP Paid">DP Paid</option>
                        <option value="Unpaid">Unpaid</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        member={currentFinanceMember}
        type="finance"
      />
    </div>
  );
}
