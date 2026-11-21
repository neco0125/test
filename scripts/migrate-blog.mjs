// Tek seferlik: eski sitenin metin dökümünden blog yazılarını Markdown'a çevirir.
// Kullanım: node scripts/migrate-blog.mjs <eski-site klasörü>
import { readFile, writeFile } from 'node:fs/promises';

const SRC = process.argv[2] ?? 'C:/Users/necip1/necipbozdemir-gorseller/eski-site/';
const txt = await readFile(SRC + 'icerik.txt', 'utf8');
const urls = (await readFile(SRC + 'pages.txt', 'utf8')).trim().split(/\r?\n/);
const MONTHS = { Ocak: 1, Şubat: 2, Mart: 3, Nisan: 4, Mayıs: 5, Haziran: 6, Temmuz: 7, Ağustos: 8, Eylül: 9, Ekim: 10, Kasım: 11, Aralık: 12 };
const q = (s) => JSON.stringify(s);

for (const block of txt.split(/^===== /m).slice(1)) {
  const lines = block.split(/\r?\n/).map((l) => l.trim());
  const m = lines[0].match(/\/blog\/(.+)\.html$/);
  if (!m) continue;
  const slug = m[1];
  const desc = lines.find((l) => l.startsWith('DESC: ')).slice(6);
  const h1 = lines.findIndex((l) => l.startsWith('[H1] '));
  const title = lines[h1].slice(5);
  const category = lines[h1 - 1];
  const [, d, mo, y, rt] = lines[h1 + 1].match(/^(\d+) (\S+) (\d{4}) · (\d+) dk/);
  const end = lines.findIndex((l, i) => i > h1 && l === "WhatsApp'tan Yaz");
  const body = lines.slice(h1 + 2, end).filter(Boolean);
  const cta = body.pop();
  const page = urls.findIndex((u) => u.endsWith(`/blog/${slug}.html`)) + 1;
  const html = await readFile(`${SRC}pages/p${page}.html`, 'utf8');
  const texts = [...html.matchAll(/wa\.me\/905510320531\?text=([^"]+)"/g)].map((x) => decodeURIComponent(x[1]));
  const waText = texts.find((t) => t !== 'Merhaba, teklif almak istiyorum.' && t !== 'Merhaba, bilgi almak istiyorum.') ?? 'Merhaba, teklif almak istiyorum.';
  const md = body
    .map((l) => (l.startsWith('[H2] ') ? '## ' + l.slice(5) : l))
    .join('\n\n')
    .replace('#savehthedate', '#savethedate');
  const fm = `---\ntitle: ${q(title)}\ndescription: ${q(desc)}\ndate: ${y}-${String(MONTHS[mo]).padStart(2, '0')}-${d.padStart(2, '0')}\ncategory: ${q(category)}\nreadingTime: ${rt}\ncta: ${q(cta)}\nwaText: ${q(waText)}\n---\n\n`;
  await writeFile(`src/content/blog/${slug}.md`, fm + md + '\n');
  console.log(slug, '|', body.length, 'blok |', waText);
}
