/**
 * Client-side HTML5 Canvas Image Compressor
 * Resizes and compresses uploaded raw image files (5MB-15MB) into lightweight Data URLs (20KB-50KB)
 * to prevent browser unresponsiveness and localStorage QuotaExceededError.
 */
export const compressImageFile = (file, maxWidth = 500, maxHeight = 500, quality = 0.75) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('File yang diunggah harus berupa gambar (JPEG, PNG, WEBP, dll).'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio constraints
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Gagal menginisialisasi canvas 2D.'));
          return;
        }

        // Draw and render compressed image
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to compact JPEG Data URL
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };

      img.onerror = (err) => reject(err);
      img.src = event.target.result;
    };

    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};
