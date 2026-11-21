// Bir blog yazısının bütün dillerdeki karşılıkları. Anahtar: Türkçe yazının slug'ı ya da ortak translationKey.
import { getCollection } from 'astro:content';
import { BLOG_COLL, r, type Alts, type XLang } from '../i18n';

const X: XLang[] = ['en', 'ru', 'uk'];

export async function blogAlts(key: string | undefined): Promise<Alts> {
  if (!key) return {};
  const alts: Alts = {};
  const tr = await getCollection('blog');
  if (tr.some((x) => x.id === key)) alts.tr = `/blog/${key}/`;
  for (const l of X) {
    const hit = (await getCollection(BLOG_COLL[l])).find((x) => x.data.translationKey === key);
    if (hit) alts[l] = `${r('blog', l)}${hit.id}/`;
  }
  return alts;
}
