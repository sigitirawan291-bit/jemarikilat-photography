import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Calendar, Sparkles, Send, ExternalLink, MessageSquare, Clock } from 'lucide-react';
import { useData } from '../context/DataContext';
import { generateBookingWaUrl, openWaDirect, ADMIN_WA_DISPLAY } from '../utils/whatsapp';

export default function BookingModal({ isOpen, onClose, initialPackage }) {
  const {
    weddingPackages = [],
    graduationPackages = [],
    engagementPackages = [],
    preweddingPackages = [],
    groupPackages = [],
    specialPackages = [],
    eventPackages = [],
    addBooking
  } = useData();

  const [selectedPkg, setSelectedPkg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    startTime: '09:00',
    endTime: '17:00',
    location: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const allPackages = [
    ...weddingPackages,
    ...graduationPackages,
    ...engagementPackages,
    ...preweddingPackages,
    ...groupPackages,
    ...specialPackages,
    ...eventPackages
  ];

  useEffect(() => {
    if (initialPackage) {
      setSelectedPkg(initialPackage);
    } else {
      setSelectedPkg(weddingPackages[0]?.id || 'pkg-wedding-1');
    }
    setIsSubmitted(false);
  }, [initialPackage, isOpen, weddingPackages]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getPackageLabel = (pkgId) => {
    const found = allPackages.find((p) => p.id === pkgId);
    return found ? `${found.name} (${found.priceIdr})` : pkgId;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomRef = `JMR-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(randomRef);

    addBooking({
      bookingRef: randomRef,
      selectedPkg,
      ...formData
    });

    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-10 bg-[#0d0d0e]/85 backdrop-blur-2xl animate-fade-in font-sans text-white">
      <div className="relative w-full max-w-2xl bg-[#141417] overflow-hidden shadow-2xl p-6 lg:p-10 rounded-xs max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-[#0d0d0e] text-white rounded-full flex items-center justify-center hover:bg-[#d4af37] hover:text-black transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6 space-y-1">
              <span className="font-sans text-[10px] tracking-[0.3em] text-[#d4af37] uppercase font-bold block">
                RESERVATION & INQUIRY
              </span>
              <h2 className="font-sans text-2xl lg:text-3xl text-white font-extrabold">
                Book a Session
              </h2>
              <p className="font-sans text-xs text-neutral-400 font-normal">
                Reserve your date with JEMARI KILAT Studio. We will review availability and contact you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Package Selector */}
              <div>
                <label className="block font-sans text-[11px] tracking-wider text-[#d4af37] uppercase mb-2 font-bold">
                  Select Experience / Package *
                </label>
                <select
                  value={selectedPkg}
                  onChange={(e) => setSelectedPkg(e.target.value)}
                  className="w-full text-xs text-white font-medium focus:outline-none bg-[#0d0d0e] py-3 px-3.5 rounded-xs"
                  required
                >
                  {weddingPackages.length > 0 && (
                    <optgroup label="Wedding Packages">
                      {weddingPackages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          [Wedding] {pkg.name} — {pkg.priceIdr}
                        </option>
                      ))}
                    </optgroup>
                  )}

                  {graduationPackages.length > 0 && (
                    <optgroup label="Graduation Packages">
                      {graduationPackages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          [Graduation] {pkg.name} — {pkg.priceIdr}
                        </option>
                      ))}
                    </optgroup>
                  )}

                  {engagementPackages.length > 0 && (
                    <optgroup label="Engagement Packages">
                      {engagementPackages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          [Engagement] {pkg.name} — {pkg.priceIdr}
                        </option>
                      ))}
                    </optgroup>
                  )}

                  {preweddingPackages.length > 0 && (
                    <optgroup label="Prewedding Packages">
                      {preweddingPackages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          [Prewedding] {pkg.name} — {pkg.priceIdr}
                        </option>
                      ))}
                    </optgroup>
                  )}

                  <option value="Custom Project">Custom Project / Editorial Campaign</option>
                </select>
              </div>

              {/* Name & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[11px] tracking-wider text-neutral-400 uppercase mb-1 font-semibold">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Clara Sativa"
                    className="w-full input-underline text-xs text-white placeholder:text-neutral-500"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[11px] tracking-wider text-neutral-400 uppercase mb-1 font-semibold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="clara@example.com"
                    className="w-full input-underline text-xs text-white placeholder:text-neutral-500"
                  />
                </div>
              </div>

              {/* Phone & Date Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[11px] tracking-wider text-neutral-400 uppercase mb-1 font-semibold">
                    Nomor WhatsApp (Wajib) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 081360318361"
                    className="w-full input-underline text-xs text-white placeholder:text-neutral-500"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[11px] tracking-wider text-neutral-400 uppercase mb-1 font-semibold">
                    Target Event Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full input-underline text-xs text-white"
                  />
                </div>
              </div>

              {/* Session Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block font-sans text-[11px] tracking-wider text-neutral-400 uppercase mb-1 font-semibold">
                    Jam Mulai Sesi *
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                    className="w-full input-underline text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[11px] tracking-wider text-neutral-400 uppercase mb-1 font-semibold">
                    Jam Selesai Sesi *
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    required
                    className="w-full input-underline text-xs text-white"
                  />
                </div>
              </div>

              {/* Overtime Notice Banner */}
              <div className="bg-[#0d0d0e] p-3.5 rounded-xs text-[11px] text-white space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-[#d4af37]">
                  <Clock className="w-4 h-4 text-[#d4af37]" />
                  <span>KETENTUAN SESI & CAS LEMBUR:</span>
                </div>
                <p className="leading-relaxed font-normal text-neutral-400">
                  Sesi photoshoot & dokumentasi maksimal selesai pada pukul <strong>18:00 WIB (6 Sore)</strong>.
                  Penggunaan waktu sesi yang melampaui pukul 18:00 WIB akan dikenakan biaya cas lembur tambahan per jam.
                </p>
              </div>

              {/* Location & Notes */}
              <div>
                <label className="block font-sans text-[11px] tracking-wider text-neutral-400 uppercase mb-1 font-semibold">
                  Location / Venue
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Kota Medan / Venue Studio"
                  className="w-full input-underline text-xs text-white placeholder:text-neutral-500"
                />
              </div>

              <div>
                <label className="block font-sans text-[11px] tracking-wider text-neutral-400 uppercase mb-1 font-semibold">
                  Vision & Special Notes
                </label>
                <textarea
                  name="notes"
                  rows="2"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Tell us about your concept..."
                  className="w-full input-underline text-xs text-white placeholder:text-neutral-500 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-6 bg-[#d4af37] text-black font-sans text-xs tracking-[0.2em] py-4 text-center uppercase font-bold hover:bg-[#f3e5ab] transition-all flex items-center justify-center gap-2 shadow-lg rounded-xs"
              >
                <Send className="w-4 h-4" /> CONFIRM RESERVATION
              </button>

            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-[#d4af37] text-black rounded-full flex items-center justify-center mb-6 shadow-2xl">
              <CheckCircle className="w-8 h-8" />
            </div>

            <span className="font-sans text-[10px] tracking-[0.3em] text-[#d4af37] uppercase font-bold block mb-1">
              RESERVATION RECEIVED
            </span>

            <h3 className="font-sans text-2xl lg:text-3xl text-white font-extrabold mb-2">
              Thank You, {formData.name}!
            </h3>

            <p className="font-sans text-xs text-neutral-400 max-w-md mx-auto leading-relaxed mb-6 font-normal">
              Kode referensi pemesanan Anda: <strong className="text-white tracking-widest font-mono">{bookingRef}</strong>. Tim Admin Sigit akan segera menghubungi Anda kembali melalui WhatsApp di nomor <strong className="text-white">{formData.phone}</strong>.
            </p>

            <div className="bg-[#0d0d0e] p-4 w-full max-w-md text-left mb-6 font-sans text-xs space-y-2 rounded-xs">
              <p><strong className="text-[#d4af37] uppercase text-[10px] tracking-wider block font-bold">Target Date:</strong> {formData.date}</p>
              <p><strong className="text-[#d4af37] uppercase text-[10px] tracking-wider block font-bold">Package:</strong> {getPackageLabel(selectedPkg)}</p>
              <p><strong className="text-[#d4af37] uppercase text-[10px] tracking-wider block font-bold">Contact:</strong> {formData.phone} ({formData.email})</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <button
                type="button"
                onClick={() => {
                  const pkgLabel = getPackageLabel(selectedPkg);
                  const waUrl = generateBookingWaUrl({ ...formData, bookingRef }, pkgLabel);
                  openWaDirect(waUrl);
                }}
                className="flex-1 bg-emerald-600 text-black font-sans text-xs tracking-[0.1em] px-4 py-3.5 uppercase font-bold hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 shadow-lg rounded-xs"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Kirim ke WA Admin ({ADMIN_WA_DISPLAY})</span>
              </button>

              <button
                onClick={onClose}
                className="bg-neutral-800 text-white font-sans text-xs tracking-[0.15em] px-6 py-3.5 uppercase font-bold hover:bg-neutral-700 transition-colors rounded-xs"
              >
                SELESAI
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
