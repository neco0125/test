import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Üç dilin blogu aynı alanları kullanır. EN/RU yazılarında translationKey, varsa Türkçe karşılığının slug'ıdır;
// aynı anahtarı taşıyan yazılar hreflang ile birbirine bağlanır.
const post = (base: string) =>
  defineCollection({
    loader: glob({ pattern: '*.md', base }),
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        /** İçerik elle güncellendiyse; dateModified ve "Güncellendi" satırı bundan */
        updated: z.coerce.date().optional(),
        category: z.string(),
        readingTime: z.number().int().positive(),
        // Yazı sonundaki çağrı cümlesi ve WhatsApp'a düşecek hazır mesaj
        cta: z.string(),
        waText: z.string(),
        /** Kapak: yalnızca kendi çekimlerimiz (src/assets/img). Yoksa paylaşımda og.jpg kullanılır. */
        cover: image().optional(),
        coverAlt: z.string().optional(),
        /** Yazı sonunda önerilecek yazılar (slug). Boşsa aynı kategoriden seçilir. */
        related: z.array(z.string()).optional(),
        /** Diller arası eşleştirme anahtarı (Türkçe yazının slug'ı ya da ortak bir ad) */
        translationKey: z.string().optional(),
      }),
  });

export const collections = {
  blog: post('./src/content/blog'),
  blogEn: post('./src/content/blog-en'),
  blogRu: post('./src/content/blog-ru'),
  blogUk: post('./src/content/blog-uk'),
};
