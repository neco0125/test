// dist/ denetimi: emoji, dış kaynak isteği, JS boyutu, Türkçe karakter, iç bağlantılar, eski adres yönlendirmeleri, aktarım boyutları, yeni sayfalar, telefon ilk yük bütçesi.
// Çalıştır: npm run build && npm run verify
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { brotliCompressSync, gzipSync } from 'node:zlib';

const DIST = 'dist';
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
const files = walk(DIST).map((f) => f.replaceAll('\\', '/'));
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const isRedirect = (f) => /\.html\/index\.html$/.test(f);
const pages = htmlFiles.filter((f) => !isRedirect(f));
const problems = [];
const kb = (n) => (n / 1024).toFixed(1).padStart(6) + ' KB';

// Arama dizinine girmeyen sayfalar (noindex): sitemap'te olmaları beklenmez
const NOINDEX = ['/404.html', '/tesekkurler/'];

const resolves = (path) => {
  const p = join(DIST, decodeURIComponent(path));
  return existsSync(p) && (statSync(p).isFile() || existsSync(join(p, 'index.html')));
};

console.log('SAYFA'.padEnd(46), 'ham'.padStart(9), 'gzip'.padStart(9), 'brotli'.padStart(9), 'JS'.padStart(8));
for (const f of pages) {
  const html = readFileSync(f, 'utf8');
  const name = '/' + f.slice(DIST.length + 1).replace(/index\.html$/, '');

  // 1. emoji (© ® ™ ve ok işaretleri hariç)
  const emoji = html.match(/(?![©®™↔↕])\p{Extended_Pictographic}/gu);
  if (emoji) problems.push(`${name}: emoji ${[...new Set(emoji)].join(' ')}`);

  // 2. dış kaynak isteği: script/link/img/video/source/font url() başka kökene gitmemeli
  const ext = [
    ...html.matchAll(/<(?:script|img|source|video|iframe)\b[^>]*?\bsrc(?:set)?=["']?(https?:)?\/\/[^"'\s>]+/g),
    ...html.matchAll(/<link\b(?=[^>]*\brel=["']?(?:stylesheet|preload|preconnect|dns-prefetch|modulepreload))[^>]*?\bhref=["']?(https?:)?\/\/[^"'\s>]+/g),
    ...html.matchAll(/url\(["']?(https?:)?\/\/[^)]+\)/g),
    ...html.matchAll(/@import[^;]+/g),
  ];
  if (ext.length) problems.push(`${name}: dış kaynak ${ext.map((m) => m[0].slice(0, 80)).join(' | ')}`);

  // 3. JS: satır içi betikler (JSON-LD hariç) + varsa dış betik dosyaları
  let js = 0;
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/application\/ld\+json/.test(m[1])) continue;
    js += Buffer.byteLength(m[2]);
    const src = m[1].match(/\bsrc=["']?([^"'\s>]+)/)?.[1];
    if (src?.startsWith('/')) js += statSync(join(DIST, src)).size;
  }
  // 13.11.2026: çerez onayı + GA4 yükleyici (~1,2 KB) için sınır 6 KB → 7,5 KB
  // 14.11.2026: tek video oynatma + ekran dışı döngüleri durdurma (~0,9 KB) için 7,5 KB → 9 KB
  // 26.11.2026: yazı içi videoları ekrana yaklaşınca indirme (~0,25 KB; ilk yükten 1,3 MB'a kadar video düşer) için 9 KB → 9,5 KB
  if (js > 9.5 * 1024) problems.push(`${name}: JS ${js} bayt (> 9,5 KB)`);

  // 4. Türkçe karakter ve dil
  const want = name.startsWith('/en/') ? 'en' : name.startsWith('/ru/') ? 'ru' : name.startsWith('/uk/') ? 'uk' : 'tr';
  if (!new RegExp(`<html lang="${want}"`).test(html)) problems.push(`${name}: lang="${want}" yok`);
  // hreflang karşılıkları gerçekten var olmalı
  for (const m of html.matchAll(/hreflang="[a-z-]+" href="https:\/\/www\.necipbozdemir\.com(\/[^"]*)"/g))
    if (!resolves(m[1])) problems.push(`${name}: hreflang hedefi yok ${m[1]}`);
  if (/�|Ã.|Ä±|ÅŸ|ÄŸ/.test(html)) problems.push(`${name}: bozuk karakter (mojibake)`);

  // 5. iç bağlantılar ve çapalar
  for (const m of html.matchAll(/\b(?:href|src|poster|data-pv)=["'](\/[^"']*)["']/g)) {
    const [path, hash] = m[1].split('#');
    if (!resolves(path.split('?')[0])) problems.push(`${name}: kırık bağlantı ${m[1]}`);
    else if (hash) {
      const target = existsSync(join(DIST, path, 'index.html')) ? readFileSync(join(DIST, path, 'index.html'), 'utf8') : '';
      if (!new RegExp(`\\bid=["']?${hash}["'\\s>]`).test(target)) problems.push(`${name}: çapa yok ${m[1]}`);
    }
  }
  for (const m of html.matchAll(/\bsrcset=["']([^"']+)["']/g))
    for (const part of m[1].split(',')) {
      const u = part.trim().split(/\s+/)[0];
      if (u.startsWith('/') && !resolves(u)) problems.push(`${name}: kırık srcset ${u}`);
    }

  // 6. başlık, açıklama, canonical
  for (const [label, re] of [['title', /<title>[^<]{10,}<\/title>/], ['description', /<meta name="description" content="[^"]{40,}"/], ['canonical', /<link rel="canonical" href="https:\/\/www\.necipbozdemir\.com\//], ['og:image', /property="og:image" content="https:/]])
    if (!re.test(html)) problems.push(`${name}: ${label} eksik`);

  const buf = Buffer.from(html);
  console.log(name.padEnd(46), kb(buf.length), kb(gzipSync(buf, { level: 9 }).length), kb(brotliCompressSync(buf).length), kb(js));
}

// 7. eski adresler
const OLD = {
  '/hizmetler.html': '/hizmetler/',
  '/portfolyo.html': '/galeri/',
  '/hakkimizda.html': '/hakkimizda/',
  '/blog.html': '/blog/',
  '/iletisim.html': '/iletisim/',
  ...Object.fromEntries(['alanya-dugun-mekanlari', 'dugun-fotografcisi-secimi', 'drone-dugun-cekimi', 'save-the-date-nedir', 'instagram-reels-ipuclari', 'kina-gecesi-fotograflari'].map((s) => [`/blog/${s}.html`, `/blog/${s}/`])),
};
const redirectsFile = readFileSync(join(DIST, '_redirects'), 'utf8');
for (const [from, to] of Object.entries(OLD)) {
  const f = join(DIST, from, 'index.html');
  if (!existsSync(f) || !readFileSync(f, 'utf8').includes(`url=${to}"`)) problems.push(`yönlendirme (meta refresh) eksik: ${from} -> ${to}`);
  if (!new RegExp(`^${from.replaceAll('.', '\\.')}\\s+${to}\\s+301$`, 'm').test(redirectsFile)) problems.push(`_redirects satırı eksik: ${from}`);
  if (!resolves(to)) problems.push(`yönlendirme hedefi yok: ${to}`);
}
console.log(`\nEski adres: ${Object.keys(OLD).length} yönlendirme denetlendi`);

// 8. font ve hero boyutları
console.log('\nFONTLAR');
for (const f of files.filter((f) => f.endsWith('.woff2'))) console.log(' ', f.slice(DIST.length).padEnd(44), kb(statSync(f).size));
console.log('\nHERO POSTER VARYANTLARI');
for (const f of files.filter((f) => f.includes('hero-gece')).sort((a, b) => statSync(a).size - statSync(b).size)) console.log(' ', f.slice(DIST.length).padEnd(44), kb(statSync(f).size));
console.log('\nHERO VİDEO (ilk yükte yok, load sonrası eklenir)');
for (const f of files.filter((f) => /\/media\/hero-.*\.mp4$/.test(f))) {
  const n = statSync(f).size;
  console.log(' ', f.slice(DIST.length).padEnd(44), kb(n));
  if (n > (f.includes('720') ? 600 : 1229) * 1024) problems.push(`hero video büyük: ${f} ${kb(n)}`);
}

// 9. sitemap: dizine açık her sayfa sitemap'te olmalı (noindex sayfalar hariç);
//    /drone/ ve /dugun/ ayrıca FAQPage şeması taşımalı
const sitemap = files.filter((f) => /sitemap-\d+\.xml$/.test(f)).map((f) => readFileSync(f, 'utf8')).join('');
for (const f of pages) {
  const name = '/' + f.slice(DIST.length + 1).replace(/index\.html$/, '');
  if (NOINDEX.includes(name)) {
    if (sitemap.includes(`necipbozdemir.com${name}<`)) problems.push(`${name}: noindex sayfa sitemap'te`);
    continue;
  }
  if (!sitemap.includes(`necipbozdemir.com${name}<`)) problems.push(`${name}: sitemap'te yok`);
}
for (const pg of ['/drone/', '/dugun/']) {
  const f = join(DIST, pg, 'index.html');
  if (!existsSync(f)) {
    problems.push(`sayfa yok: ${pg}`);
    continue;
  }
  if (!/"@type":"FAQPage"/.test(readFileSync(f, 'utf8'))) problems.push(`${pg}: FAQPage JSON-LD yok`);
}

// 10. telefonda ilk yük tahmini (ana sayfa, en kötü durum):
// HTML (brotli) + önyüklenen fontlar + logo 2x + önyüklenen hero posterinin en büyük adayı
{
  const html = readFileSync(join(DIST, 'index.html'), 'utf8');
  const parts = [['HTML (brotli)', brotliCompressSync(Buffer.from(html)).length]];
  for (const m of html.matchAll(/<link rel="preload" href="([^"]+\.woff2)" as="font"/g)) parts.push(['font ' + m[1].split('/').pop(), statSync(join(DIST, m[1])).size]);
  const logo = html.match(/<img[^>]*?srcset="[^"]*?(\/_astro\/logo-acik[^\s"]+) 2x"[^>]*?loading="eager"/);
  if (logo) parts.push(['logo 2x', statSync(join(DIST, logo[1])).size]);
  const pre = html.match(/rel="preload" as="image" imagesrcset="([^"]+)"/);
  if (pre) {
    const last = pre[1].split(',').map((x) => x.trim().split(/\s+/)[0]).pop();
    const n = statSync(join(DIST, last)).size;
    parts.push(['poster ' + last.split('/').pop(), n]);
    if (n > 60 * 1024) problems.push(`telefon hero posteri ${kb(n)} > 60 KB`);
  } else problems.push('ana sayfa: hero poster önyüklemesi yok');
  const total = parts.reduce((a, [, n]) => a + n, 0);
  console.log('\nTELEFON İLK YÜK TAHMİNİ (ana sayfa, en kötü durum)');
  for (const [l, n] of parts) console.log(' ', l.padEnd(44), kb(n));
  console.log(' ', 'TOPLAM'.padEnd(44), kb(total), ' (sınır 200 KB)');
  if (total > 200 * 1024) problems.push(`telefon ilk yük ${kb(total)} > 200 KB`);
}

// Yayından önce site sahibinin doldurması gerekenler: hata değil, uyarı
const config = readFileSync('src/config.ts', 'utf8');
const todo = [];
for (const k of ['address', 'email']) if (new RegExp(`\\b${k}: ''`).test(config)) todo.push(`LEGAL.${k} boş: KVKK sayfasında görünmüyor (src/config.ts)`);
if (todo.length) console.warn(`\nYAYINDAN ÖNCE:\n` + todo.map((t) => ' - ' + t).join('\n'));

if (problems.length) {
  console.error(`\n${problems.length} SORUN:\n` + problems.map((p) => ' - ' + p).join('\n'));
  process.exit(1);
}
console.log(`\nTamam: ${pages.length} sayfa, sorun yok.`);
