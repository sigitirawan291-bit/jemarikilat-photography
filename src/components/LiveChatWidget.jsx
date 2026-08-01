import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, PhoneCall, CheckCircle, ExternalLink, Sparkles } from 'lucide-react';
import { INITIAL_CHAT_MESSAGES } from '../data/portfolioData';
import { generateConsultationWaUrl, openWaDirect, ADMIN_WA_DISPLAY } from '../utils/whatsapp';

export default function LiveChatWidget({ onOpenBooking }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_CHAT_MESSAGES);
  const [userWa, setUserWa] = useState('');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [waSaved, setWaSaved] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    if (!userWa.trim()) {
      alert("Silakan masukkan Nomor WhatsApp Anda terlebih dahulu agar admin dapat menerima notifikasi & menghubungi Anda kembali.");
      return;
    }

    setWaSaved(true);

    const waUrl = generateConsultationWaUrl(text, userWa);

    const newClientMsg = {
      id: `msg-${Date.now()}`,
      sender: 'client',
      text: `${text}\n\n📱 [No. WA Klien: ${userWa}]`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      waUrl: waUrl
    };

    setMessages((prev) => [...prev, newClientMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = `Terima kasih! Pesan konsul Anda telah dicatat oleh sistem Studio JEMARI KILAT. Tim Admin Sigit akan merespon via nomor WA (${userWa}).\n\nJika memerlukan bantuan cepat atau konfirmasi langsung dari Admin, silakan klik tombol di bawah ini:`;
      
      const lower = text.toLowerCase();
      if (lower.includes('harga') || lower.includes('paket') || lower.includes('price')) {
        replyText = `Terima kasih! Pertanyaan seputar rincian paket investasi telah dicatat. Katalog PDF Pricelist lengkap dapat dikirimkan langsung ke WhatsApp Anda (${userWa}).\n\nKlik tombol di bawah ini untuk menghubungi Admin secara langsung:`;
      } else if (lower.includes('tanggal') || lower.includes('jadwal') || lower.includes('book')) {
        replyText = `Informasi cek ketersediaan tanggal acara Anda sedang diproses. Admin Sigit akan mengabari Anda via WhatsApp (${userWa}).\n\nUntuk konfirmasi tanggal langsung dengan Admin:`;
      }

      const adminReply = {
        id: `msg-admin-${Date.now()}`,
        sender: 'admin',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        waUrl: waUrl
      };

      setMessages((prev) => [...prev, adminReply]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Chat Launcher */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative w-14 h-14 bg-black/90 backdrop-blur-xl border border-[#d4af37]/40 rounded-full flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300 shadow-2xl"
            aria-label="Open live chat"
          >
            <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-black animate-pulse" />
          </button>
        )}
      </div>

      {/* Expanded Chat Overlay Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm h-[570px] bg-[#141417] shadow-2xl flex flex-col overflow-hidden animate-fade-in rounded-xs text-white font-sans">
          
          {/* Header */}
          <div className="bg-black text-white p-4 flex justify-between items-center border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full bg-[#0d0d0e] text-[#d4af37] border border-[#d4af37]/40 flex items-center justify-center font-sans font-bold text-xs">
                JK
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-black" />
              </div>
              <div>
                <h4 className="font-sans text-sm tracking-wider font-bold">JEMARI KILAT Studio</h4>
                <span className="font-sans text-[9px] text-[#d4af37] tracking-widest uppercase block font-mono">
                  Konsultasi WA • Respon Cepat (&lt; 15 Min)
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-1 focus:outline-none transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* WhatsApp Required Input Banner */}
          <div className="bg-[#0d0d0e] p-3 border-b border-neutral-800 font-sans text-xs">
            <div className="flex items-center gap-2 mb-1 text-[#d4af37] font-bold text-[11px]">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>Nomor WhatsApp Anda:</span>
            </div>
            <input
              type="tel"
              value={userWa}
              onChange={(e) => setUserWa(e.target.value)}
              placeholder="Masukkan No WA Anda (misal: 081360318361)"
              className="w-full bg-[#141417] px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#d4af37] placeholder:text-neutral-500 rounded-xs"
            />
            {userWa.trim() && (
              <span className="text-[9px] text-emerald-400 mt-1 flex items-center gap-1 font-mono">
                <CheckCircle className="w-3 h-3" /> Nomor WA tersimpan. Admin akan menghubungi Anda di nomor ini.
              </span>
            )}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0d0d0e] font-sans text-xs">
            {messages.map((msg) => {
              const isAdmin = msg.sender === 'admin';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAdmin ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 leading-relaxed whitespace-pre-line rounded-xs ${
                      isAdmin
                        ? 'bg-[#141417] text-white border border-neutral-800 shadow-md'
                        : 'bg-[#d4af37] text-black font-bold'
                    }`}
                  >
                    {msg.text}
                    {isAdmin && msg.waUrl && (
                      <button
                        type="button"
                        onClick={() => openWaDirect(msg.waUrl)}
                        className="mt-2.5 w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-black font-sans text-[10px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors shadow-md rounded-xs"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Chat WA Admin Direct</span>
                      </button>
                    )}
                  </div>
                  <span className="text-[9px] text-neutral-400 mt-1 px-1 font-mono">
                    {msg.time}
                  </span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-[#d4af37] text-[10px] italic">
                <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce" />
                <span>Sigit (JEMARI KILAT) sedang mengetik balasan...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div className="px-3 py-2 bg-[#141417] border-t border-neutral-800 flex gap-2 overflow-x-auto text-[10px] font-sans">
            <button
              onClick={() => handleSendMessage("Halo, saya ingin menanyakan jadwal ketersediaan pemotretan.")}
              className="whitespace-nowrap px-2.5 py-1 bg-[#0d0d0e] hover:bg-[#d4af37] hover:text-black transition-colors text-neutral-300 rounded-xs font-medium"
            >
              Cek Tanggal
            </button>
            <button
              onClick={() => handleSendMessage("Berapa estimasi harga paket pernikahan / wisuda?")}
              className="whitespace-nowrap px-2.5 py-1 bg-[#0d0d0e] hover:bg-[#d4af37] hover:text-black transition-colors text-neutral-300 rounded-xs font-medium"
            >
              Cek Pricelist
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="whitespace-nowrap px-2.5 py-1 bg-[#d4af37] text-black uppercase tracking-wider font-bold rounded-xs"
            >
              Book Direct
            </button>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#141417] border-t border-neutral-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tulis pesan Anda..."
              className="flex-1 bg-transparent text-xs text-white focus:outline-none placeholder:text-neutral-500"
            />
            <button
              type="submit"
              title="Kirim Pesan & Buka WA Admin"
              className="px-3 py-2 bg-[#d4af37] text-black hover:bg-[#f3e5ab] transition-colors text-xs font-bold flex items-center gap-1.5 rounded-xs shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim</span>
            </button>
          </form>

          {/* Direct WA Admin Action Link */}
          <div className="bg-black py-1.5 px-3 border-t border-neutral-800 flex justify-between items-center text-[10px] font-sans">
            <span className="text-neutral-400 font-mono">Admin Studio: {ADMIN_WA_DISPLAY}</span>
            <button
              type="button"
              onClick={() => {
                const url = generateConsultationWaUrl(inputText || "Halo Admin, saya ingin berkonsultasi mengenai JEMARI KILAT Studio.", userWa);
                openWaDirect(url);
              }}
              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 hover:underline"
            >
              <ExternalLink className="w-3 h-3 text-emerald-400" />
              <span>Chat WA Admin Direct</span>
            </button>
          </div>

        </div>
      )}
    </>
  );
}
