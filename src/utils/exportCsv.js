/**
 * Utility to export booking records array to CSV spreadsheet
 */
export function exportBookingsToCsv(bookings, packagesList = []) {
  if (!bookings || bookings.length === 0) {
    alert("Tidak ada data booking yang tersedia untuk di-ekspor.");
    return;
  }

  // Helper to map package id to readable name
  const getPackageName = (pkgId) => {
    if (!pkgId) return '-';
    const found = packagesList.find((p) => p.id === pkgId);
    return found ? `${found.name} (${found.priceIdr})` : pkgId;
  };

  const headers = [
    "No",
    "Kode Referensi",
    "Nama Klien",
    "Email",
    "No. WhatsApp",
    "Paket Layanan",
    "Target Tanggal Acara",
    "Lokasi / Venue",
    "Catatan Klien",
    "Status Pemesanan",
    "Waktu Dibuat"
  ];

  const rows = bookings.map((b, index) => {
    const pkgName = getPackageName(b.selectedPkg);
    const dateStr = b.createdAt ? new Date(b.createdAt).toLocaleString('id-ID') : '-';

    return [
      index + 1,
      `"${b.bookingRef || '-'}"`,
      `"${(b.name || '-').replace(/"/g, '""')}"`,
      `"${(b.email || '-').replace(/"/g, '""')}"`,
      `"${(b.phone || '-').replace(/"/g, '""')}"`,
      `"${pkgName.replace(/"/g, '""')}"`,
      `"${b.date || '-'}"`,
      `"${(b.location || '-').replace(/"/g, '""')}"`,
      `"${(b.notes || '-').replace(/"/g, '""')}"`,
      `"${b.status || 'Pending'}"`,
      `"${dateStr}"`
    ];
  });

  // Combine headers and rows with CRLF
  const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  const todayStr = new Date().toISOString().split('T')[0];
  link.setAttribute("href", url);
  link.setAttribute("download", `JEMARI_KILAT_Bookings_Data_${todayStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
