import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync, existsSync } from 'node:fs';

// Site haritasında blog yazılarının lastmod'u: frontmatter'daki updated, yoksa date.
// Diğer sayfalara lastmod yazılmaz (uydurma tarih Google'ın güvenini düşürür).
const postDate = (slug) => {
  const f = `./src/content/blog/${slug}.md`;
  if (!existsSync(f)) return undefined;
  const fm = readFileSync(f, 'utf8').split('---')[1] ?? '';
  const m = fm.match(/^updated:\s*(\S+)/m) ?? fm.match(/^date:\s*(\S+)/m);
  return m ? new Date(m[1]).toISOString() : undefined;
};

const BLOG_SLUGS = [
  'alanya-dugun-mekanlari',
  'dugun-fotografcisi-secimi',
  'drone-dugun-cekimi',
  'save-the-date-nedir',
  'instagram-reels-ipuclari',
  'kina-gecesi-fotograflari',
];

// Eski sitenin .html adresleri. Aynı liste public/_redirects ve DEPLOY.md (nginx) içinde de var.
const redirects = {
  '/hizmetler.html': '/hizmetler/',
  '/portfolyo.html': '/galeri/',
  '/hakkimizda.html': '/hakkimizda/',
  '/blog.html': '/blog/',
  '/iletisim.html': '/iletisim/',
  ...Object.fromEntries(BLOG_SLUGS.map((s) => [`/blog/${s}.html`, `/blog/${s}/`])),
};

const CORE_RANGE = ['U+0020-007E', 'U+00A0', 'U+00A9', 'U+00AB', 'U+00B0', 'U+00B7', 'U+00BB', 'U+00C2', 'U+00C7', 'U+00C9', 'U+00CE', 'U+00D6', 'U+00D7', 'U+00DB', 'U+00DC', 'U+00E2', 'U+00E7', 'U+00E9', 'U+00EE', 'U+00F6', 'U+00FB', 'U+00FC', 'U+0131', 'U+2010-2011', 'U+2013-2014', 'U+2018-2019', 'U+201C-201D', 'U+2022', 'U+2026', 'U+2032-2033', 'U+20AC', 'U+2122', 'U+2190', 'U+2192', 'U+2212'];
const TR_RANGE = ['U+011E-011F', 'U+0130', 'U+015E-015F'];
const CYR_RANGE = ['U+0401', 'U+0404', 'U+0406-0407', 'U+0410-044F', 'U+0451', 'U+0454', 'U+0456-0457', 'U+0490-0491', 'U+2116'];
const font = (file) => `./src/assets/fonts/${file}.woff2`;
const face = { weight: '400 900', style: 'normal', stretch: '100% 125%', display: 'optional' };

export default defineConfig({
  site: 'https://www.necipbozdemir.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
  // Aynı kalite değeriyle daha verimli kodlama: mozjpeg, WebP/AVIF'te en yüksek sıkıştırma çabası.
  // Kalite sayıları (Pic.astro, Showcase, Reel) değişmedi; yalnızca dosyalar küçülür, derleme biraz uzar.
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        jpeg: { mozjpeg: true },
        webp: { effort: 6, smartSubsample: true },
        avif: { effort: 8 },
      },
    },
  },
  redirects,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('.html') && !page.includes('/404') && !page.includes('/tesekkurler/') && !/\.(xml|txt)$/.test(page),
      serialize(item) {
        const slug = item.url.match(/\/blog\/([^/]+)\/$/)?.[1];
        const lastmod = slug && postDate(slug);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Archivo',
      cssVariable: '--font-archivo',
      fallbacks: ['Arial', 'sans-serif'],
      options: {
        variants: [
          {
            // ASCII + Türkçede kullanılan Latin-1 + ı + tipografik noktalama (preload edilen tek dosya)
            ...face,
            src: [font('archivo-core')],
            unicodeRange: CORE_RANGE,
          },
          // Ğ ğ İ Ş ş
          { ...face, src: [font('archivo-tr')], unicodeRange: TR_RANGE },
          {
            // Latin-1'in geri kalanı: yalnızca sayfada böyle bir harf geçerse iner
            ...face,
            src: [font('archivo-latin-rest')],
            unicodeRange: ['U+00A1-00A8', 'U+00AA', 'U+00AC-00AF', 'U+00B1-00B6', 'U+00B8-00BA', 'U+00BC-00C1', 'U+00C3-00C6', 'U+00C8', 'U+00CA-00CD', 'U+00CF-00D5', 'U+00D8-00DA', 'U+00DD-00E1', 'U+00E3-00E6', 'U+00E8', 'U+00EA-00ED', 'U+00EF-00F5', 'U+00F7-00FA', 'U+00FD-00FF', 'U+0152-0153'],
          },
          {
            // latin-ext'in geri kalanı: yalnızca gerekirse iner
            ...face,
            src: [font('archivo-latin-ext')],
            unicodeRange: ['U+0100-011D', 'U+0120-012F', 'U+0132-0151', 'U+0154-015D', 'U+0160-02BA', 'U+02BD-02C5', 'U+02C7-02CC', 'U+02CE-02D7', 'U+02DD-02FF', 'U+1E00-1E9F', 'U+1EF2-1EFF', 'U+2020', 'U+20A0-20AB', 'U+20AD-20C0', 'U+2113', 'U+2C60-2C7F', 'U+A720-A7FF'],
          },
          // Kiril: Roboto Flex, aynı wght + wdth eksenleri (yalnızca /ru/ sayfalarında iner)
          { ...face, src: [font('roboto-flex-cyr')], unicodeRange: CYR_RANGE },
        ],
      },
    },
  ],
});
