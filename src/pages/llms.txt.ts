// llms.txt: AI asistanlarına (ChatGPT, Perplexity, Claude vb.) sitenin kısa ve düz özeti.
// Yalnızca src/config.ts, src/data ve blog verisindeki teyitli bilgiler.
import { getCollection } from 'astro:content';
import { SITE } from '../config';
import { GROUPS } from '../data/services';

export async function GET() {
  const [enPosts, ruPosts, ukPosts] = await Promise.all([getCollection('blogEn'), getCollection('blogRu'), getCollection('blogUk')]);
  const posts = (await getCollection('blog')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const u = (p: string) => `${SITE.url}${p}`;
  const lines = [
    `# ${SITE.name}`,
    '',
    `> Alanya merkezli fotoğraf ve video çekimi: drone çekimi, düğün fotoğrafı ve düğün videosu, Instagram Reels, kurumsal ve mekân tanıtım videosu. Alanya ve Antalya'da çalışır. Drone görüntüsü 4K, 50 ya da 60 fps teslim edilir. Düğünde 2-3 saatlik kesintisiz düğün filmi ve 1-3 dakikalık klip teslim edilir.`,
    '',
    `İletişim: telefon ve WhatsApp ${SITE.phoneDisplay}, Instagram ${SITE.instagramHandle}. Teklif formu: ${u('/iletisim/')}`,
    '',
    '## Sayfalar',
    '',
    `- [Drone çekimi](${u('/drone/')}): Otel, yat, mekân, düğün ve etkinlik için havadan video.`,
    `- [Düğün](${u('/dugun/')}): Düğün fotoğrafı, düğün filmi ve klip.`,
    `- [Hizmetler](${u('/hizmetler/')}): Bütün hizmetler ve örnek işler.`,
    `- [Ekipman](${u('/ekipman/')}): Kullanılan kameralar, lensler, drone ve gimbal.`,
    `- [Hakkımızda](${u('/hakkimizda/')}): Necip Bozdemir ve çalışma ilkeleri.`,
    `- [İletişim](${u('/iletisim/')}): Telefon, WhatsApp ve teklif formu.`,
    '',
    '## Hizmetler',
    '',
    ...GROUPS.flatMap((g) => [`### ${g.title}`, '', ...g.items.map((s) => `- ${s.name}: ${s.text}`), '']),
    '## Blog',
    '',
    ...posts.map((p) => `- [${p.data.title}](${u(`/blog/${p.id}/`)}): ${p.data.description}`),
    '',
    '## English',
    '',
    `- [Home](${u('/en/')}): Photographer, videographer and drone pilot in Alanya and Antalya.`,
    `- [Drone videography](${u('/en/drone/')}), [Wedding](${u('/en/wedding/')}), [Photoshoot](${u('/en/photoshoot/')}), [Services](${u('/en/services/')}), [Contact](${u('/en/contact/')})`,
    ...enPosts.map((p) => `- [${p.data.title}](${u(`/en/blog/${p.id}/`)}): ${p.data.description}`),
    '',
    '## Русский',
    '',
    `- [Главная](${u('/ru/')}): фотограф, видеограф и съемка с дрона в Алании и Анталии.`,
    `- [Съемка с дрона](${u('/ru/aerosemka/')}), [Свадьба](${u('/ru/svadba/')}), [Фотосессия](${u('/ru/fotosessiya/')}), [Услуги](${u('/ru/uslugi/')}), [Контакты](${u('/ru/kontakty/')})`,
    ...ruPosts.map((p) => `- [${p.data.title}](${u(`/ru/blog/${p.id}/`)}): ${p.data.description}`),
    '',
    '## Українська',
    '',
    `- [Головна](${u('/uk/')}): фотограф, відеограф і зйомка з дрона в Аланії та Анталії.`,
    `- [Зйомка з дрона](${u('/uk/aerozjomka/')}), [Весілля](${u('/uk/vesillia/')}), [Фотосесія](${u('/uk/fotosesiia/')}), [Послуги](${u('/uk/posluhy/')}), [Контакти](${u('/uk/kontakty/')})`,
    ...ukPosts.map((p) => `- [${p.data.title}](${u(`/uk/blog/${p.id}/`)}): ${p.data.description}`),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
