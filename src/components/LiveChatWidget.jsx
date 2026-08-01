import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, PhoneCall, CheckCircle, ExternalLink } from 'lucide-react';
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

    // Remove automatic openWaDirect(waUrl) on normal message send
    // Direct WA opening will only happen when user explicitly clicks the WA button

    // Provide immediate feedback in chat interface
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
            className="group relative w-14 h-14 bg-surface/90 backdrop-blur-xl border border-outline-variant/40 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 shadow-2xl"
            aria-label="Open live chat"
          >
            <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-surface animate-pulse" />
          </button>
        )}
      </div>

      {/* Expanded Chat Overlay Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm h-[560px] bg-surface border border-outline-variant/50 shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="bg-primary text-on-primary p-4 flex justify-between items-center border-b border-primary-container">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full bg-surface-container text-primary flex items-center justify-center font-bold text-xs">
                JK
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-primary" />
              </div>
              <div>
                <h4 className="font-serif text-sm tracking-wider">JEMARI KILAT Studio</h4>
                <span className="font-sans text-[9px] text-outline-variant tracking-widest uppercase block">
                  Konsultasi WA • Respon Cepat (&lt; 15 Min)
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="text-on-primary/70 hover:text-on-primary p-1 focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* WhatsApp Required Input Banner */}
          <div className="bg-surface-container p-3 border-b border-outline-variant/30 font-sans text-xs">
            <div className="flex items-center gap-2 mb-1 text-primary font-semibold text-[11px]">
              <PhoneCall className="w-3.5 h-3.5 text-green-600" />
              <span>Nomor WhatsApp Anda:</span>
            </div>
            <input
              type="tel"
              value={userWa}
              onChange={(e) => setUserWa(e.target.value)}
              placeholder="Masukkan No WA Anda (misal: 081360318361)"
              className="w-full bg-surface px-3 py-1.5 border border-outline-variant/40 text-xs text-primary focus:outline-none focus:border-primary placeholder:text-outline"
            />
            {userWa.trim() && (
              <span className="text-[9px] text-green-600 mt-1 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Nomor WA tersimpan. Admin akan menghubungi Anda di nomor ini.
              </span>
            )}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-surface-container-lowest font-sans text-xs">
            {messages.map((msg) => {
              const isAdmin = msg.sender === 'admin';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAdmin ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 leading-relaxed whitespace-pre-line ${
                      isAdmin
                        ? 'bg-surface-container text-on-surface border border-outline-variant/30'
                        : 'bg-primary text-on-primary font-light'
                    }`}
                  >
                    {msg.text}
                    {isAdmin && msg.waUrl && (
                      <button
                        type="button"
                        onClick={() => openWaDirect(msg.waUrl)}
                        className="mt-2.5 w-full py-1.5 px-3 bg-green-700 hover:bg-green-800 text-white font-sans text-[10px] font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Chat WA Admin Direct</span>
                      </button>
                    )}
                  </div>
                  <span className="text-[9px] text-outline mt-1 px-1">
                    {msg.time}
                  </span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-outline text-[10px] italic">
                <span className="w-1.5 h-1.5 bg-outline rounded-full animate-bounce" />
                <span>Sigit (JEMARI KILAT) sedang mengetik balasan...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div className="px-3 py-2 bg-surface border-t border-outline-variant/20 flex gap-2 overflow-x-auto text-[10px] font-sans">
            <button
              onClick={() => handleSendMessage("Halo, saya ingin menanyakan jadwal ketersediaan pemotretan.")}
              className="whitespace-nowrap px-2.5 py-1 bg-surface-container hover:bg-primary hover:text-on-primary transition-colors border border-outline-variant/40 text-on-surface"
            >
              Cek Tanggal
            </button>
            <button
              onClick={() => handleSendMessage("Berapa estimasi harga paket pernikahan / wisuda?")}
              className="whitespace-nowrap px-2.5 py-1 bg-surface-container hover:bg-primary hover:text-on-primary transition-colors border border-outline-variant/40 text-on-surface"
            >
              Cek Pricelist
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="whitespace-nowrap px-2.5 py-1 bg-primary text-on-primary uppercase tracking-wider font-semibold"
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
            className="p-3 bg-surface border-t border-outline-variant/30 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tulis pesan Anda..."
              className="flex-1 bg-transparent text-xs text-primary focus:outline-none placeholder:text-outline"
            />
            <button
              type="submit"
              title="Kirim Pesan & Buka WA Admin"
              className="px-3 py-2 bg-primary text-on-primary hover:bg-on-surface-variant transition-colors text-xs font-semibold flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim</span>
            </button>
          </form>

          {/* Direct WA Admin Action Link */}
          <div className="bg-surface-container py-1.5 px-3 border-t border-outline-variant/20 flex justify-between items-center text-[10px] font-sans">
            <span className="text-outline">Admin Studio: {ADMIN_WA_DISPLAY}</span>
            <button
              type="button"
              onClick={() => {
                const url = generateConsultationWaUrl(inputText || "Halo Admin, saya ingin berkonsultasi mengenai JEMARI KILAT Studio.", userWa);
                openWaDirect(url);
              }}
              className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-1 hover:underline"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Chat WA Admin Direct</span>
            </button>
          </div>

        </div>
      )}
    </>
  );
}
