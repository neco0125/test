// Dillere göre sayfa metinleri (Türkçe metinler sayfaların kendisinde).
import type { XLang } from '../../i18n';
import en, { type Copy } from './en';
import ru from './ru';
import uk from './uk';

export const COPY: Record<XLang, Copy> = { en, ru, uk };
export type { Copy };
