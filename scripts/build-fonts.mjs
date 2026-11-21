// Archivo (wght 400-900, wdth 100-125) alt kümeleri. Türkçe bir sayfa yalnızca ilk iki dosyayı indirir.
// Çalıştır: npm run fonts  (çıktılar src/assets/fonts altında depoda durur, her build'de çalışmaz)
import { readFile, writeFile } from 'node:fs/promises';
import subsetFont from 'subset-font';

const src = 'node_modules/@fontsource-variable/archivo/files/';
const out = 'src/assets/fonts/';
const opts = {
  targetFormat: 'woff2',
  variationAxes: { wght: { min: 400, max: 900 }, wdth: { min: 100, max: 125 } },
  keepFeatures: ['kern', 'mark', 'mkmk', 'ccmp', 'locl', 'tnum', 'lnum', 'case'],
  noHinting: true,
};
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => String.fromCodePoint(a + i)).join('');

// core: ASCII + Türkçede ve tipografide gerçekten kullanılan Latin-1 + ı + noktalama
const CORE = range(0x20, 0x7e) + '\u00a0«»·©°×âîûÂÎÛçÇöÖüÜéÉ' + 'ı' + '‐‑–—‘’“”•…′″€™←→−';
// tr: Türkçenin latin-ext bloğunda kalan beş harfi
const TR = 'ĞğİŞş';
// rest: Latin-1'in geri kalanı (yabancı adlar için, gerekirse iner)
const REST = [...(range(0xa1, 0xff) + 'Œœ')].filter((c) => !CORE.includes(c)).join('');

const latin = await readFile(src + 'archivo-latin-wdth-normal.woff2');
const ext = await readFile(src + 'archivo-latin-ext-wdth-normal.woff2');

const files = {
  'archivo-core.woff2': await subsetFont(latin, CORE, opts),
  'archivo-tr.woff2': await subsetFont(ext, TR, opts),
  'archivo-latin-rest.woff2': await subsetFont(latin, REST, opts),
  'archivo-latin-ext.woff2': await subsetFont(ext, undefined, { ...opts, keepAllGlyphs: true }),
};
for (const [name, buf] of Object.entries(files)) {
  await writeFile(out + name, buf);
  console.log(name, buf.length);
}
const hex = (s) => [...s].map((c) => 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')).join(',');
console.log('core range:', hex(CORE.slice(95)));
console.log('rest range:', hex(REST));

// Instrument Serif Italic: yalnızca "yakından" sesi (düğün başlıkları). Aynı core + tr aralıkları.
const serifSrc = 'node_modules/@fontsource/instrument-serif/files/';
const serifOpts = { targetFormat: 'woff2', keepFeatures: ['kern', 'liga', 'mark', 'mkmk', 'ccmp', 'locl'], noHinting: true };
const sLatin = await readFile(serifSrc + 'instrument-serif-latin-400-italic.woff2');
const sExt = await readFile(serifSrc + 'instrument-serif-latin-ext-400-italic.woff2');
const serif = {
  'instrument-serif-italic-core.woff2': await subsetFont(sLatin, CORE, serifOpts),
  'instrument-serif-italic-tr.woff2': await subsetFont(sExt, TR, serifOpts),
};
for (const [name, buf] of Object.entries(serif)) {
  await writeFile(out + name, buf);
  console.log(name, buf.length);
}

// Kiril (yalnızca /ru/ sayfaları): Archivo ve Instrument Serif'te Kiril yok. Aynı aile adı altında,
// unicode-range ile; Türkçe ve İngilizce sayfalarda hiç inmez.
// Roboto Flex: Archivo gibi wght + wdth eksenli grotesk. Cormorant Italic: serif italik sesi.
const CYR = range(0x410, 0x44f) + 'Ёё№' + 'ЄІЇєіїҐґ'; // Rusça + Ukraynaca harfler (kesme işareti ’ Latin çekirdek dosyasında)
const rf = await readFile('node_modules/@fontsource-variable/roboto-flex/files/roboto-flex-cyrillic-wdth-normal.woff2');
const cr = await readFile('node_modules/@fontsource/cormorant/files/cormorant-cyrillic-500-italic.woff2');
const cyr = {
  'roboto-flex-cyr.woff2': await subsetFont(rf, CYR, opts),
  'cormorant-italic-cyr.woff2': await subsetFont(cr, CYR, serifOpts),
};
for (const [name, buf] of Object.entries(cyr)) {
  await writeFile(out + name, buf);
  console.log(name, buf.length);
}
