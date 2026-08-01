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

    // Save booking to global DataContext state & localStorage
    addBooking({
      bookingRef: randomRef,
      selectedPkg,
      ...formData
    });

    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-10 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#16161a] border border-amber-500/30 overflow-hidden shadow-2xl p-6 lg:p-10 rounded-sm text-white max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-[#0d0d0e] text-neutral-400 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-black transition-colors border border-neutral-800"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6 space-y-1">
              <span className="font-sans text-[10px] tracking-[0.3em] text-amber-400 uppercase font-semibold block">
                RESERVATION & INQUIRY
              </span>
              <h2 className="font-serif text-2xl lg:text-3xl text-white font-normal">
                Book a Session
              </h2>
              <p className="font-sans text-xs text-neutral-400 font-light">
                Reserve your date with JEMARI KILAT Studio. We will review availability and contact you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Package Selector across all 7 Categories */}
              <div>
                <label className="block font-sans text-[11px] tracking-wider text-amber-400 uppercase mb-2 font-semibold">
                  Select Experience / Package *
                </label>
                <select
                  value={selectedPkg}
                  onChange={(e) => setSelectedPkg(e.target.value)}
                  className="w-full text-xs text-white font-medium focus:outline-none focus:border-amber-400 bg-[#0d0d0e] py-3 px-3.5 border border-neutral-800 rounded-xs"
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

                  {groupPackages.length > 0 && (
                    <optgroup label="Foto Grup Packages">
                      {groupPackages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          [Foto Grup] {pkg.name} — {pkg.priceIdr}
                        </option>
                      ))}
                    </optgroup>
                  )}

                  {specialPackages.length > 0 && (
                    <optgroup label="Special Session Packages">
                      {specialPackages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          [Special Session] {pkg.name} — {pkg.priceIdr}
                        </option>
                      ))}
                    </optgroup>
                  )}

                  {eventPackages.length > 0 && (
                    <optgroup label="Event Documentary Packages">
                      {eventPackages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          [Event] {pkg.name} — {pkg.priceIdr}
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
                  <label className="block font-sans text-[11px] tracking-wider text-neutral-400 uppercase mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Clara Sativa"
                    className="w-full input-underline text-xs text-white placeholder:text-neutral-600"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[11px] tracking-wider text-neutral-400 uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="clara@example.com"
                    className="w-full input-underline text-xs text-white placeholder:text-neutral-600"
                  />
                </div>
              </div>

              {/* Phone & Date Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[11px] tracking-wider text-neutral-400 uppercase mb-1">
                    Nomor WhatsApp (Wajib) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 081360318361"
                    className="w-full input-underline text-xs text-white placeholder:text-neutral-600"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[11px] tracking-wider text-neutral-400 uppercase mb-1">
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
                  <label className="block font-sans text-[11px] tracking-wider text-neutral-400 uppercase mb-1">
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
                  <label className="block font-sans text-[11px] tracking-wider text-neutral-400 uppercase mb-1">
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
              <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-xs text-[11px] text-amber-300 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-400">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>KETENTUAN SESI & CAS LEMBUR:</span>
                </div>
                <p className="leading-relaxed font-light text-neutral-300">
                  Sesi photoshoot & dokumentasi maksimal selesai pada pukul <strong>18:00 WIB (6 Sore)</strong>.
                  Penggunaan waktu sesi yang melampaui pukul 18:00 WIB akan dikenakan biaya cas lembur tambahan per jam.
                </p>
              </div>

              {/* Location & Notes */}
              <div>
                <label className="block font-sans text-[11px] tracking-wider text-neutral-400 uppercase mb-1">
                  Location / Venue
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Kota Medan / Venue Studio"
                  className="w-full input-underline text-xs text-white placeholder:text-neutral-600"
                />
              </div>

              <div>
                <label className="block font-sans text-[11px] tracking-wider text-neutral-400 uppercase mb-1">
                  Vision & Special Notes
                </label>
                <textarea
                  name="notes"
                  rows="2"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Tell us about your wedding / graduation concept or special requests..."
                  className="w-full input-underline text-xs text-white placeholder:text-neutral-600 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-6 bg-gradient-to-r from-amber-500 to-amber-400 text-black font-sans text-xs tracking-[0.2em] py-4 text-center uppercase font-bold hover:from-amber-400 hover:to-amber-300 transition-all flex items-center justify-center gap-2 shadow-lg border border-amber-300"
              >
                <Send className="w-4 h-4" /> CONFIRM RESERVATION
              </button>

            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-amber-500 text-black rounded-full flex items-center justify-center mb-6 shadow-lg">
              <CheckCircle className="w-8 h-8" />
            </div>

            <span className="font-sans text-[10px] tracking-[0.3em] text-amber-400 uppercase font-semibold block mb-1">
              RESERVATION RECEIVED
            </span>

            <h3 className="font-serif text-2xl lg:text-3xl text-white font-normal mb-2">
              Thank You, {formData.name}!
            </h3>

            <p className="font-sans text-xs text-neutral-300 max-w-md mx-auto leading-relaxed mb-6 font-light">
              Kode referensi pemesanan Anda: <strong className="text-amber-400 tracking-widest font-mono">{bookingRef}</strong>. Tim Admin Sigit akan segera menghubungi Anda kembali melalui WhatsApp di nomor <strong className="text-white">{formData.phone}</strong>.
            </p>

            <div className="bg-[#0d0d0e] p-4 w-full max-w-md text-left mb-6 font-sans text-xs space-y-2 border border-neutral-800 rounded-xs">
              <p><strong className="text-amber-400 uppercase text-[10px] tracking-wider block font-semibold">Target Date:</strong> {formData.date}</p>
              <p><strong className="text-amber-400 uppercase text-[10px] tracking-wider block font-semibold">Package:</strong> {getPackageLabel(selectedPkg)}</p>
              <p><strong className="text-amber-400 uppercase text-[10px] tracking-wider block font-semibold">Contact:</strong> {formData.phone} ({formData.email})</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <button
                type="button"
                onClick={() => {
                  const pkgLabel = getPackageLabel(selectedPkg);
                  const waUrl = generateBookingWaUrl({ ...formData, bookingRef }, pkgLabel);
                  openWaDirect(waUrl);
                }}
                className="flex-1 bg-emerald-600 text-black font-sans text-xs tracking-[0.1em] px-4 py-3.5 uppercase font-bold hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 shadow-md rounded-xs"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Kirim ke WA Admin ({ADMIN_WA_DISPLAY})</span>
              </button>

              <button
                onClick={onClose}
                className="bg-amber-500 text-black font-sans text-xs tracking-[0.15em] px-6 py-3.5 uppercase font-bold hover:bg-amber-400 transition-colors rounded-xs"
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
