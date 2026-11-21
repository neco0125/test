// Video site haritası: her galeri videosunun izleme sayfası, kapak, dosya ve süre bilgisi.
import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import { SITE } from '../config';
import { GALLERY } from '../data/gallery';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = async () => {
  const items = await Promise.all(
    GALLERY.filter((g) => g.src || g.pv).map(async (g) => {
      const poster = await getImage({ src: g.poster, width: g.vertical ? 720 : 1280, format: 'jpg', quality: 75 });
      const secs = Number(g.len.split(':')[0]) * 60 + Number(g.len.split(':')[1]);
      return `  <url>
    <loc>${SITE.url}/galeri/${g.id}/</loc>
    <video:video>
      <video:thumbnail_loc>${new URL(poster.src, SITE.url).href}</video:thumbnail_loc>
      <video:title>${esc(g.title.tr)}</video:title>
      <video:description>${esc(`${g.alt.tr}. ${g.meta.tr}.`)}</video:description>
      <video:content_loc>${new URL((g.src ?? g.pv)!, SITE.url).href}</video:content_loc>
      <video:duration>${secs}</video:duration>
      <video:publication_date>2026-11-12T12:00:00+03:00</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>
  </url>`;
    }),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${items.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
