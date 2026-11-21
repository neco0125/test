import type { ImageMetadata } from 'astro';
import { existsSync } from 'node:fs';

/**
 * Düğün galerisi.
 *
 * Fotoğrafları src/assets/dugun/ klasörüne koymanız yeterli (jpg, jpeg, png, webp).
 * Dosya adı sırayı belirler: 01-hazirlik.jpg, 02-tören.jpg ...
 * Aynı adla public/media/dugun/ içine bir .mp4 koyarsanız (ör. 03-tören.mp4) o kare tıklanınca oynayan videoya dönüşür.
 * Açıklama (alt metin) için aşağıdaki ALT listesine dosya adıyla bir satır ekleyin.
 *
 * Klasör boşken galeri hiç görünmez.
 */
const ALT: Record<string, string> = {
  // '01-hazirlik': 'Gelinliğin askıda beklediği an, pencereden gelen ışık',
};

export interface GalleryItem {
  name: string;
  src: ImageMetadata;
  alt: string;
  /** public/media/dugun/<ad>.mp4 varsa yolu */
  video?: string;
  shape: 'portrait' | 'landscape' | 'square';
}

const files = import.meta.glob<ImageMetadata>('../assets/dugun/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
});

export const weddingGallery: GalleryItem[] = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b, 'tr'))
  .map(([path, src]) => {
    const name = path.split('/').pop()!.replace(/\.[^.]+$/, '');
    const ratio = src.width / src.height;
    return {
      name,
      src,
      alt: ALT[name] ?? 'Düğün çekiminden bir kare',
      video: existsSync(`public/media/dugun/${name}.mp4`) ? `/media/dugun/${name}.mp4` : undefined,
      shape: ratio > 1.15 ? 'landscape' : ratio < 0.87 ? 'portrait' : 'square',
    };
  });
