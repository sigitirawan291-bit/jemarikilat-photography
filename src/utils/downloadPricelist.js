/**
 * Helper utility to handle downloading official high-resolution pricelists
 * for both Wedding/Editorial and Graduation categories.
 */

export function downloadPricelist(category) {
  if (category === 'wedding') {
    // Official Wedding Pricelist File
    const link = document.createElement('a');
    link.href = '/PRICELIST/Pricelist Jemarikilat WEDDING.jpg';
    link.download = 'JEMARI_KILAT_Wedding_Pricelist.jpg';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // Generate High-Res Graduation Pricelist Card Canvas
    generateGraduationPricelistCard();
  }
}

function generateGraduationPricelistCard() {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 1600;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#f9f9f9';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Header Banner - Obsidian Dark
  ctx.fillStyle = '#1c1b1b';
  ctx.fillRect(0, 0, canvas.width, 240);

  // Brand Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'normal 48px "Playfair Display", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('JEMARI KILAT STUDIO', canvas.width / 2, 100);

  ctx.fillStyle = '#c4c7c7';
  ctx.font = '600 16px "Inter", sans-serif';
  ctx.fillText('OFFICIAL GRADUATION SESSION PRICELIST • MMXXIV', canvas.width / 2, 150);

  ctx.fillStyle = '#ffffff';
  ctx.font = '300 14px "Inter", sans-serif';
  ctx.fillText('Obsidian & Ivory Fine Art Photography & Cinema', canvas.width / 2, 185);

  // 3 Tiers Container Layout
  const tiers = [
    {
      name: "GRADUATION SILVER (SOLO)",
      price: "Rp 2.500.000 / $180",
      subtitle: "Personal commencement portraiture",
      features: [
        "2 Hours Studio & Campus Session",
        "1 Lead Photographer + Pose Directing",
        "All High-Res Digital Files",
        "15 Master Retouched Fine-Art Photos",
        "1 Canvas Frame Print (40x60 cm)",
        "48-Hour Digital Teaser Delivery"
      ]
    },
    {
      name: "GRADUATION GOLD (GROUP & FAMILY)",
      price: "Rp 4.500.000 / $300",
      subtitle: "Family & cohort graduation coverage",
      features: [
        "4 Hours Studio & Campus Session",
        "Lead Photographer + Assistant Tech",
        "All High-Res Digital Files",
        "30 Master Retouched Signature Photos",
        "1 Luxury Hardcover Photobook (20x30 cm)",
        "Cinematic Reel Video Teaser (60s)"
      ]
    },
    {
      name: "GRADUATION PLATINUM (CINEMA)",
      price: "Rp 7.500.000 / $500",
      subtitle: "Full luxury 35mm analogue & 4K cinema",
      features: [
        "Full Day Session (Up to 8 Hours)",
        "Master Photographer + Senior Cinematographer",
        "Full 4K Graduation Highlight Film (2-3 Mins)",
        "50 Master Retouched Signature Prints",
        "1 Deluxe Acrylic Album Box Set (30x40 cm)",
        "35mm Analogue Film Captures Included"
      ]
    }
  ];

  const cardWidth = 350;
  const startX = 60;
  const gap = 30;

  tiers.forEach((tier, index) => {
    const x = startX + index * (cardWidth + gap);
    const y = 300;
    const height = 1120;

    // Card Box Border
    ctx.fillStyle = index === 1 ? '#ffffff' : '#eeeeee';
    ctx.fillRect(x, y, cardWidth, height);

    ctx.strokeStyle = index === 1 ? '#1c1b1b' : '#c4c7c7';
    ctx.lineWidth = index === 1 ? 3 : 1;
    ctx.strokeRect(x, y, cardWidth, height);

    // Recommended Tag
    if (index === 1) {
      ctx.fillStyle = '#1c1b1b';
      ctx.fillRect(x + 50, y - 18, cardWidth - 100, 36);
      ctx.fillStyle = '#ffffff';
      ctx.font = '600 12px "Inter", sans-serif';
      ctx.fillText('MOST POPULAR', x + cardWidth / 2, y + 5);
    }

    // Card Header
    ctx.fillStyle = '#1c1b1b';
    ctx.font = '600 16px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(tier.name, x + cardWidth / 2, y + 60);

    ctx.fillStyle = '#747878';
    ctx.font = '400 12px "Inter", sans-serif';
    ctx.fillText(tier.subtitle, x + cardWidth / 2, y + 90);

    // Price
    ctx.fillStyle = '#1c1b1b';
    ctx.font = 'bold 22px "Playfair Display", Georgia, serif';
    ctx.fillText(tier.price, x + cardWidth / 2, y + 140);

    // Divider Line
    ctx.strokeStyle = '#c4c7c7';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + 30, y + 170);
    ctx.lineTo(x + cardWidth - 30, y + 170);
    ctx.stroke();

    // Features List
    ctx.textAlign = 'left';
    ctx.fillStyle = '#444748';
    ctx.font = '400 13px "Inter", sans-serif';

    tier.features.forEach((feat, fIdx) => {
      const fY = y + 210 + fIdx * 45;
      ctx.fillText(`— ${feat}`, x + 25, fY);
    });
  });

  // Footer Branding
  ctx.fillStyle = '#1c1b1b';
  ctx.fillRect(0, 1470, canvas.width, 130);

  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.font = '600 14px "Inter", sans-serif';
  ctx.fillText('JEMARI KILAT STUDIO • KOTA MEDAN, INDONESIA', canvas.width / 2, 1520);

  ctx.fillStyle = '#c4c7c7';
  ctx.font = '400 12px "Inter", sans-serif';
  ctx.fillText('WhatsApp / Telp: 081360318361 | Email: jemarikilat@gmail.com', canvas.width / 2, 1550);

  // Trigger Download
  const link = document.createElement('a');
  link.download = 'JEMARI_KILAT_Graduation_Pricelist.png';
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
