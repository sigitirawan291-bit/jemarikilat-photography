/**
 * Utility to generate and download a printable PDF invoice/receipt for a booking record
 */
export function downloadBookingPdf(booking, packageName = '') {
  if (!booking) return;

  const { bookingRef, name, email, phone, date, location, notes, status, createdAt } = booking;
  
  const createdDate = createdAt 
    ? new Date(createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert("Pop-up diblokir oleh browser. Harap izinkan pop-up untuk mengunduh lembar PDF.");
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Booking Receipt - ${bookingRef || 'JEMARI KILAT'}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;600;700&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { 
          font-family: 'Inter', sans-serif; 
          background: #ffffff; 
          color: #111827; 
          padding: 40px;
          max-width: 800px;
          margin: 0 auto;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid #111827;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .brand-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 600;
        }
        .brand-sub {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #6b7280;
          margin-top: 4px;
        }
        .invoice-title {
          text-align: right;
        }
        .invoice-title h2 {
          font-size: 20px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .ref-code {
          font-size: 14px;
          font-weight: 700;
          color: #2563eb;
          letter-spacing: 0.1em;
          margin-top: 4px;
        }
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border-radius: 9999px;
          margin-top: 8px;
        }
        .status-confirmed { background: #dcfce7; color: #166534; }
        .status-pending { background: #fef9c3; color: #854d0e; }
        .status-completed { background: #dbeafe; color: #1e40af; }
        .status-cancelled { background: #fee2e2; color: #991b1b; }

        .section-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #6b7280;
          margin-bottom: 12px;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 6px;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 30px;
        }
        .info-group {
          margin-bottom: 12px;
        }
        .label {
          font-size: 10px;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .value {
          font-size: 13px;
          font-weight: 600;
          margin-top: 2px;
        }

        .notes-box {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          padding: 16px;
          font-size: 12px;
          line-height: 1.6;
          margin-bottom: 40px;
        }

        .footer {
          margin-top: 50px;
          border-top: 1px solid #e5e7eb;
          padding-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          font-size: 11px;
          color: #6b7280;
        }
        .signature-box {
          text-align: center;
          width: 200px;
        }
        .signature-line {
          border-bottom: 1px solid #111827;
          height: 60px;
          margin-bottom: 6px;
        }

        @media print {
          body { padding: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>

      <div class="no-print" style="margin-bottom: 20px; text-align: right;">
        <button onclick="window.print()" style="padding: 10px 20px; background: #111827; color: white; border: none; cursor: pointer; font-weight: 600; font-size: 12px; letter-spacing: 0.1em;">
          🖨️ CETAK / SIMPAN PDF
        </button>
      </div>

      <div class="header">
        <div>
          <div class="brand-title">JEMARI KILAT</div>
          <div class="brand-sub">PHOTOGRAPHY & CINEMA STUDIO</div>
          <div style="font-size: 11px; color: #4b5563; margin-top: 6px;">
            Kota Medan, Indonesia | WA: 081360318361
          </div>
        </div>
        <div class="invoice-title">
          <h2>RESERVATION RECEIPT</h2>
          <div class="ref-code">${bookingRef || 'JMR-SESSION'}</div>
          <div class="status-badge status-${(status || 'pending').toLowerCase()}">
            STATUS: ${status || 'Pending'}
          </div>
        </div>
      </div>

      <div class="grid">
        <div>
          <div class="section-title">Informasi Klien</div>
          <div class="info-group">
            <div class="label">Nama Lengkap</div>
            <div class="value">${name || '-'}</div>
          </div>
          <div class="info-group">
            <div class="label">Email Address</div>
            <div class="value">${email || '-'}</div>
          </div>
          <div class="info-group">
            <div class="label">Nomor WhatsApp</div>
            <div class="value">${phone || '-'}</div>
          </div>
        </div>

        <div>
          <div class="section-title">Rincian Acara & Sesi</div>
          <div class="info-group">
            <div class="label">Paket Layanan</div>
            <div class="value">${packageName || booking.selectedPkg || '-'}</div>
          </div>
          <div class="info-group">
            <div class="label">Target Tanggal Acara</div>
            <div class="value">${date || '-'}</div>
          </div>
          <div class="info-group">
            <div class="label">Lokasi / Venue</div>
            <div class="value">${location || '-'}</div>
          </div>
        </div>
      </div>

      <div class="section-title">Visi / Catatan Khusus Klien</div>
      <div class="notes-box">
        ${notes ? notes : 'Tidak ada catatan khusus yang dilampirkan.'}
      </div>

      <div class="footer">
        <div>
          <div>Waktu Reservasi: ${createdDate}</div>
          <div style="margin-top: 4px; font-size: 10px;">Dokumen ini merupakan konfirmasi pemesanan resmi JEMARI KILAT Studio.</div>
        </div>

        <div class="signature-box">
          <div class="signature-line"></div>
          <div style="font-weight: 600; color: #111827;">Sigit Irawan</div>
          <div style="font-size: 10px;">Art Director / Studio Head</div>
        </div>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 400);
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
