import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck, CheckCircle, ExternalLink } from 'lucide-react';
import { INITIAL_CHAT_MESSAGES } from '../data/portfolioData';
import { generateConsultationWaUrl, openWaDirect, ADMIN_WA_DISPLAY, ADMIN_WA_NUMBER } from '../utils/whatsapp';

export default function ContactView({ onOpenBooking }) {
  const [messages, setMessages] = useState(INITIAL_CHAT_MESSAGES);
  const [inputMsg, setInputMsg] = useState('');
  const [userWa, setUserWa] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    if (!userWa.trim()) {
      alert("Silakan masukkan Nomor WhatsApp Anda terlebih dahulu agar tim Admin dapat menerima notifikasi & menghubungi Anda kembali.");
      return;
    }

    const waUrl = generateConsultationWaUrl(inputMsg, userWa);

    const userMsg = {
      id: `c-msg-${Date.now()}`,
      sender: 'client',
      text: `${inputMsg}\n\n📱 [No. WA Klien: ${userWa}]`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      waUrl: waUrl
    };

    setMessages((prev) => [...prev, userMsg]);
    const sentText = inputMsg;
    setInputMsg('');
    setIsTyping(true);

    // Remove automatic openWaDirect(waUrl) on submit
    // User will only be redirected if they explicitly click the WA button

    setTimeout(() => {
      let reply = `Terima kasih! Pesan Anda telah dicatat oleh konsol Studio JEMARI KILAT. Sigit Irawan (Art Director) akan merespon & menghubungi Anda via WhatsApp (${userWa}).\n\nKlik tombol di bawah ini jika ingin meminta konfirmasi atau chat langsung dengan Admin:`;
      
      if (sentText.toLowerCase().includes('harga') || sentText.toLowerCase().includes('paket')) {
        reply = `Rincian paket investasi fotografi & videografi telah dicatat. Admin Sigit dapat mengirimkan katalog PDF lengkap ke WhatsApp Anda (${userWa}).\n\nUntuk respon cepat dari Admin:`;
      }

      const adminReply = {
        id: `c-admin-${Date.now()}`,
        sender: 'admin',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        waUrl: waUrl
      };

      setMessages((prev) => [...prev, adminReply]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="w-full pt-28 pb-24 px-6 lg:px-20 bg-background min-h-screen">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <span className="font-sans text-[10px] tracking-[0.4em] text-outline uppercase block mb-2 font-semibold">
            GET IN TOUCH
          </span>
          <h1 className="font-serif text-4xl lg:text-6xl text-primary font-normal mb-4">
            Contact & Live Chat
          </h1>
          <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
            Connect directly with our creative directors for studio availability, bespoke wedding commissions, or graduation inquiries.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8 bg-surface p-8 lg:p-10 border border-outline-variant/40">
            <div>
              <span className="font-sans text-[10px] tracking-[0.3em] text-outline uppercase block mb-1">STUDIO HEADQUARTERS</span>
              <h2 className="font-serif text-2xl text-primary font-normal mb-4">JEMARI KILAT Medan</h2>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                Kota Medan, Indonesia
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-outline-variant/30 font-sans text-xs">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-outline" />
                <span>jemarikilat@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-green-600" />
                <a 
                  href={`https://wa.me/${ADMIN_WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-primary font-semibold flex items-center gap-1.5"
                >
                  <span>{ADMIN_WA_DISPLAY} (WhatsApp Direct Admin)</span>
                  <ExternalLink className="w-3 h-3 text-green-600" />
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-outline" />
                <span>Mon – Sat: 09:00 AM – 18:00 PM WIB</span>
              </div>
            </div>

            <div className="pt-6 border-t border-outline-variant/30">
              <span className="font-sans text-[10px] tracking-[0.25em] text-outline uppercase block mb-3">INSTANT RESERVATION</span>
              <button
                onClick={onOpenBooking}
                className="w-full bg-primary text-on-primary font-sans text-xs tracking-[0.2em] py-3.5 text-center uppercase font-semibold hover:bg-on-surface-variant transition-colors"
              >
                OPEN BOOKING FORM
              </button>
            </div>
          </div>

          {/* Right Column: Full Interactive Chat Console */}
          <div className="lg:col-span-7 bg-surface border border-outline-variant/40 overflow-hidden flex flex-col h-[600px] shadow-lg">
            
            {/* Console Header */}
            <div className="bg-primary text-on-primary p-4 lg:p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface text-primary flex items-center justify-center font-bold text-sm">
                  JK
                </div>
                <div>
                  <h3 className="font-serif text-lg font-normal">Sigit Irawan (Art Director)</h3>
                  <span className="font-sans text-[10px] text-outline-variant tracking-wider uppercase block">
                    Active Studio Consultation Console • WA: {ADMIN_WA_DISPLAY}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[10px] font-sans text-green-400">
                <ShieldCheck className="w-4 h-4" /> SECURE CONSOLE
              </div>
            </div>

            {/* WhatsApp Contact Input Bar */}
            <div className="p-4 bg-surface-container border-b border-outline-variant/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-sans">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-600" />
                <span className="font-semibold text-primary">No. WhatsApp Anda (Wajib):</span>
              </div>
              <input
                type="tel"
                value={userWa}
                onChange={(e) => setUserWa(e.target.value)}
                placeholder="Masukkan Nomor WA (misal: 081360318361)..."
                className="w-full sm:w-64 bg-surface px-3 py-1.5 border border-outline-variant/40 text-xs text-primary focus:outline-none focus:border-primary placeholder:text-outline"
                required
              />
            </div>

            {/* Message Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-surface-container-lowest font-sans text-xs">
              {messages.map((m) => {
                const isAdmin = m.sender === 'admin';
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isAdmin ? 'items-start' : 'items-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 leading-relaxed whitespace-pre-line ${
                        isAdmin
                          ? 'bg-surface-container text-on-surface border border-outline-variant/30'
                          : 'bg-primary text-on-primary font-light'
                      }`}
                    >
                      {m.text}
                      {isAdmin && m.waUrl && (
                        <button
                          type="button"
                          onClick={() => openWaDirect(m.waUrl)}
                          className="mt-3 w-full sm:w-auto py-2 px-4 bg-green-700 hover:bg-green-800 text-white font-sans text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors shadow-sm"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Hubungi Admin via WA ({ADMIN_WA_DISPLAY})</span>
                        </button>
                      )}
                    </div>
                    <span className="text-[9px] text-outline mt-1 px-1">{m.time}</span>
                  </div>
                );
              })}

              {isTyping && (
                <div className="text-outline text-[10px] italic">
                  Sigit (JEMARI KILAT) sedang menyiapkan jawaban...
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-4 bg-surface border-t border-outline-variant/30 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Tuliskan pertanyaan atau rencana tanggal acara Anda..."
                className="flex-1 bg-transparent text-xs text-primary input-underline"
              />
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="submit"
                  title="Kirim pesan ke konsol chat"
                  className="bg-primary text-on-primary font-sans text-xs tracking-[0.15em] px-5 py-3 uppercase font-semibold hover:bg-on-surface-variant transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" /> KIRIM PESAN
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const waUrl = generateConsultationWaUrl(inputMsg || "Halo Admin, saya ingin berkonsultasi mengenai JEMARI KILAT Studio.", userWa);
                    openWaDirect(waUrl);
                  }}
                  title="Chat langsung dengan Admin via WhatsApp"
                  className="bg-green-700 text-white font-sans text-xs tracking-[0.1em] px-4 py-3 uppercase font-semibold hover:bg-green-800 transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> CHAT WA ADMIN
                </button>
              </div>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
}
