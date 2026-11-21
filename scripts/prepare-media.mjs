// Hazır medyayı projeye alır: hero kırpımı (2.39:1), OG görseli, apple-touch-icon, video kopyaları.
// Çalıştır: npm run media
import { copyFile, mkdir, readFile } from 'node:fs/promises';
import sharp from 'sharp';

const SRC = process.argv[2] ?? 'C:/Users/necip1/necipbozdemir-gorseller/hazir/';
await mkdir('src/assets/img', { recursive: true });
await mkdir('public/media', { recursive: true });

for (const f of ['logo-koyu.png', 'logo-acik.png', 'necip-portre.jpg']) await copyFile(SRC + f, 'src/assets/img/' + f);
for (const f of ['otel', 'ham', 'kurgu']) {
  await copyFile(`${SRC}video/${f}.mp4`, `public/media/${f}.mp4`);
  await copyFile(`${SRC}video/${f}.jpg`, `src/assets/img/poster-${f}.jpg`);
}

// Hero: 2752x1536 kaynaktan 2.39:1 "scope" kırpımı, yat ortada kalır
const hero = sharp(SRC + 'yat-drone.jpg');
const { width, height } = await hero.metadata();
const h = Math.round(width / 2.39);
await hero.extract({ left: 0, top: Math.round((height - h) / 2), width, height: h }).jpeg({ quality: 94 }).toFile('src/assets/img/yat-scope.jpg');

// OG 1200x630: yat fotoğrafı + ince çerçeve + açık logo (yazı render edilmez, font bağımlılığı yok)
const logo = await sharp(SRC + 'logo-acik.png').resize({ width: 520 }).toBuffer();
const frame = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#0F4A4C" fill-opacity=".28"/><rect x="36.5" y="36.5" width="1127" height="557" fill="none" stroke="#F2EEE6" stroke-opacity=".7"/><circle cx="70" cy="70" r="7" fill="#E4472B"/></svg>`,
);
await sharp(SRC + 'yat-drone.jpg')
  .resize(1200, 630, { fit: 'cover' })
  .composite([{ input: frame }, { input: logo, left: 70, top: 480 }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/og.jpg');

// apple-touch-icon: favicon.svg kâğıt zemin üzerinde
const icon = await readFile('public/favicon.svg');
await sharp({ create: { width: 180, height: 180, channels: 3, background: '#F2EEE6' } })
  .composite([{ input: await sharp(icon, { density: 400 }).resize(132, 132).png().toBuffer(), gravity: 'centre' }])
  .png()
  .toFile('public/apple-touch-icon.png');

for (const f of ['poster-otel', 'poster-ham', 'poster-kurgu', 'yat-scope', 'logo-koyu', 'logo-acik']) {
  const m = await sharp(`src/assets/img/${f}.${f.startsWith('logo') ? 'png' : 'jpg'}`).metadata();
  console.log(f, m.width, m.height);
}
