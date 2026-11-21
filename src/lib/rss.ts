// Üç dilin RSS beslemesi tek yerden. Türkçe /rss.xml, diğerleri /en/rss.xml ve /ru/rss.xml.
import { getCollection } from 'astro:content';
import { SITE } from '../config';
import { r, type Lang } from '../i18n';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const META: Record<Lang, { title: string; desc: string; coll: 'blog' | 'blogEn' | 'blogRu' | 'blogUk'; self: string }> = {
  tr: { title: `${SITE.name} blogu`, desc: 'Alanya ve Antalya’da düğün, drone ve video çekimi üzerine notlar.', coll: 'blog', self: '/rss.xml' },
  en: { title: `${SITE.name} blog`, desc: 'Notes on weddings, photoshoots and drone videography in Alanya and Antalya.', coll: 'blogEn', self: '/en/rss.xml' },
  uk: { title: `Блог ${SITE.name}`, desc: 'Нотатки про весілля, фотосесії та зйомку з дрона в Аланії та Анталії.', coll: 'blogUk', self: '/uk/rss.xml' },
  ru: { title: `Блог ${SITE.name}`, desc: 'Заметки о свадьбах, фотосессиях и съемке с дрона в Алании и Анталии.', coll: 'blogRu', self: '/ru/rss.xml' },
};

export async function rssFor(lang: Lang) {
  const m = META[lang];
  const base = r('blog', lang);
  const posts = (await getCollection(m.coll)).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const items = posts
    .map((p) => {
      const url = `${SITE.url}${base}${p.id}/`;
      return `<item><title>${esc(p.data.title)}</title><link>${url}</link><guid>${url}</guid><description>${esc(p.data.description)}</description><category>${esc(p.data.category)}</category><pubDate>${p.data.date.toUTCString()}</pubDate></item>`;
    })
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${esc(m.title)}</title><link>${SITE.url}${base}</link><atom:link href="${SITE.url}${m.self}" rel="self" type="application/rss+xml"/><description>${esc(m.desc)}</description><language>${lang}</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
