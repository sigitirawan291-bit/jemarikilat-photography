import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck, CheckCircle, ExternalLink, Sparkles } from 'lucide-react';
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
    <div className="w-full pt-28 pb-24 px-6 lg:px-16 bg-[#0d0d0e] text-[#f5f5f7] min-h-screen">
      <div className="max-w-[1440px] mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-sans text-[10px] tracking-[0.4em] text-amber-400 uppercase block font-semibold">
            GET IN TOUCH & INQUIRE
          </span>
          <h1 className="font-serif text-4xl lg:text-6xl text-white font-normal">
            Contact & Consultation
          </h1>
          <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light">
            Hubungi tim direktur kreatif kami untuk konsultasi tanggal acara, komisi fotografi pernikahan khusus, atau sesi wisuda.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8 bg-[#16161a] p-8 lg:p-10 border border-neutral-800 rounded-sm">
            <div>
              <span className="font-sans text-[10px] tracking-[0.3em] text-amber-400 uppercase block mb-1 font-semibold">STUDIO HEADQUARTERS</span>
              <h2 className="font-serif text-2xl text-white font-normal mb-3">JEMARI KILAT Medan</h2>
              <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light">
                Kota Medan, Sumatra Utara, Indonesia
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-neutral-800 font-sans text-xs">
              <div className="flex items-center gap-3 text-neutral-300">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>jemarikilat@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href={`https://wa.me/${ADMIN_WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-amber-300 font-semibold flex items-center gap-1.5"
                >
                  <span>{ADMIN_WA_DISPLAY} (WhatsApp Direct Admin)</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mon – Sat: 09:00 AM – 18:00 PM WIB</span>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800 space-y-3">
              <span className="font-sans text-[10px] tracking-[0.25em] text-amber-400 uppercase block font-semibold">INSTANT RESERVATION</span>
              <button
                onClick={onOpenBooking}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-sans text-xs tracking-[0.2em] py-3.5 text-center uppercase font-bold hover:from-amber-400 hover:to-amber-300 transition-all shadow-lg border border-amber-300"
              >
                OPEN BOOKING FORM
              </button>
            </div>
          </div>

          {/* Right Column: Full Interactive Chat Console */}
          <div className="lg:col-span-7 bg-[#16161a] border border-neutral-800 rounded-sm overflow-hidden flex flex-col h-[600px] shadow-2xl">
            
            {/* Console Header */}
            <div className="bg-[#0a0a0c] text-white p-4 lg:p-6 flex justify-between items-center border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 p-[1px]">
                  <div className="w-full h-full bg-[#0a0a0c] rounded-full flex items-center justify-center font-serif text-amber-400 font-bold text-sm">
                    JK
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-normal text-white">Sigit Irawan (Art Director)</h3>
                  <span className="font-sans text-[10px] text-amber-400/80 tracking-wider uppercase block font-mono">
                    Studio Consultation Console • WA: {ADMIN_WA_DISPLAY}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-sans text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" /> SECURE CONSOLE
              </div>
            </div>

            {/* WhatsApp Contact Input Bar */}
            <div className="p-4 bg-[#111114] border-b border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-sans">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white">No. WhatsApp Anda (Wajib):</span>
              </div>
              <input
                type="tel"
                value={userWa}
                onChange={(e) => setUserWa(e.target.value)}
                placeholder="Masukkan Nomor WA (misal: 081360318361)..."
                className="w-full sm:w-64 bg-[#16161a] px-3 py-2 border border-neutral-700 text-xs text-white focus:outline-none focus:border-amber-400 placeholder:text-neutral-500 rounded-xs"
                required
              />
            </div>

            {/* Message Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#0d0d0e] font-sans text-xs">
              {messages.map((m) => {
                const isAdmin = m.sender === 'admin';
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isAdmin ? 'items-start' : 'items-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 leading-relaxed whitespace-pre-line rounded-xs ${
                        isAdmin
                          ? 'bg-[#16161a] text-white border border-neutral-800'
                          : 'bg-amber-500 text-black font-semibold'
                      }`}
                    >
                      {m.text}
                      {isAdmin && m.waUrl && (
                        <button
                          type="button"
                          onClick={() => openWaDirect(m.waUrl)}
                          className="mt-3 w-full sm:w-auto py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-black font-sans text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors shadow-md rounded-xs"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Hubungi Admin via WA ({ADMIN_WA_DISPLAY})</span>
                        </button>
                      )}
                    </div>
                    <span className="text-[9px] text-neutral-500 mt-1 px-1 font-mono">{m.time}</span>
                  </div>
                );
              })}

              {isTyping && (
                <div className="text-amber-400 text-[10px] italic">
                  Sigit (JEMARI KILAT) sedang menyiapkan jawaban...
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-4 bg-[#16161a] border-t border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Tuliskan pertanyaan atau rencana tanggal acara Anda..."
                className="flex-1 bg-transparent text-xs text-white input-underline"
              />
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="submit"
                  title="Kirim pesan ke konsol chat"
                  className="bg-amber-500 text-black font-sans text-xs tracking-[0.15em] px-5 py-3 uppercase font-bold hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 whitespace-nowrap rounded-xs shadow-md"
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
                  className="bg-emerald-600 text-black font-sans text-xs tracking-[0.1em] px-4 py-3 uppercase font-bold hover:bg-emerald-500 transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap rounded-xs shadow-md"
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
