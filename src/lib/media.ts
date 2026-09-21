// Image helpers for the admin: client-side compression + preview URLs.

// Compress an image with canvas, max dimension 1600px, WebP output.
export function compressImage(file: File, maxDim = 1600): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      const scale = Math.min(1, maxDim / Math.max(w, h));
      const tw = Math.max(1, Math.round(w * scale));
      const th = Math.max(1, Math.round(h * scale));
      const canvas = document.createElement('canvas');
      canvas.width = tw;
      canvas.height = th;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas 2D not supported'));
        return;
      }
      ctx.drawImage(img, 0, 0, tw, th);
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Image compression failed'));
        },
        'image/webp',
        0.82,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Unreadable image file'));
    };
    img.src = url;
  });
}

// Create an object URL for previewing a Blob (caller revokes when done).
export function blobPreviewUrl(blob: Blob): string {
  return URL.createObjectURL(blob);
}

// Resolve an image src: remote URLs pass through, local public/ paths
// get the app base (works on root domain, GitHub Pages sub-path and file://).
export function siteImage(src: string): string {
  if (/^(https?:|data:|blob:)/.test(src)) return src;
  const base = import.meta.env.BASE_URL || '/';
  const clean = src.replace(/^\/+/, '');
  return `${base}${clean}`;
}
