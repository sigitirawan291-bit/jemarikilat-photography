export const ADMIN_WA_NUMBER = '6281360318361';
export const ADMIN_WA_DISPLAY = '081360318361';

/**
 * Format and generate WhatsApp URL for live chat / general consultation questions
 */
export function generateConsultationWaUrl(userText, userWa = '') {
  const timeStr = new Date().toLocaleString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const formattedMsg = `Halo Admin JEMARI KILAT Studio,

Saya ingin berkonsultasi mengenai layanan fotografi / videografi:

💬 *Pertanyaan / Pesan:*
"${userText.trim()}"

${userWa ? `📱 *No. WA Klien:* ${userWa.trim()}` : ''}
⏰ *Waktu:* ${timeStr}

Mohon informasi & konfirmasi lebih lanjut dari Admin. Terima kasih!`;

  return `https://wa.me/${ADMIN_WA_NUMBER}?text=${encodeURIComponent(formattedMsg)}`;
}

/**
 * Format and generate WhatsApp URL for booking / reservation inquiries
 */
export function generateBookingWaUrl(bookingData, packageName = '') {
  const { name, email, phone, date, location, notes, bookingRef } = bookingData;
  const timeStr = new Date().toLocaleString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const formattedMsg = `Halo Admin JEMARI KILAT Studio,

Saya ingin mengonfirmasi Pemesanan / Booking Session:

📋 *Kode Referensi:* ${bookingRef || 'JMR-SESSION'}
👤 *Nama Lengkap:* ${name || '-'}
📧 *Email:* ${email || '-'}
📱 *No. WhatsApp:* ${phone || '-'}
📦 *Paket Layanan:* ${packageName || bookingData.selectedPkg || '-'}
📅 *Target Tanggal:* ${date || '-'}
📍 *Lokasi / Venue:* ${location || '-'}
📝 *Catatan / Visi:* ${notes || '-'}
⏰ *Waktu Reservasi:* ${timeStr}

Mohon konfirmasi ketersediaan tanggal & petunjuk pembayaran DP. Terima kasih!`;

  return `https://wa.me/${ADMIN_WA_NUMBER}?text=${encodeURIComponent(formattedMsg)}`;
}

/**
 * Helper to open WhatsApp URL in a new tab/window safely
 */
export function openWaDirect(url) {
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
