// Dört dil: Türkçe kökte, İngilizce /en/, Rusça /ru/, Ukraynaca /uk/.
// Dil seçici ve hreflang bağlantıları ROUTES'tan üretilir; bir sayfanın karşılığı yoksa o dilde ana sayfaya gider.

export type Lang = 'tr' | 'en' | 'ru' | 'uk';
export type XLang = Exclude<Lang, 'tr'>;
export const LANGS: Lang[] = ['tr', 'en', 'ru', 'uk'];
export const LOCALE: Record<Lang, string> = { tr: 'tr_TR', en: 'en_US', ru: 'ru_RU', uk: 'uk_UA' };
export const LANG_NAME: Record<Lang, string> = { tr: 'Türkçe', en: 'English', ru: 'Русский', uk: 'Українська' };

export type Alts = Partial<Record<Lang, string>>;

/** Sayfa anahtarı -> dillere göre yol */
export const ROUTES = {
  home: { tr: '/', en: '/en/', ru: '/ru/', uk: '/uk/' },
  drone: { tr: '/drone/', en: '/en/drone/', ru: '/ru/aerosemka/', uk: '/uk/aerozjomka/' },
  wedding: { tr: '/dugun/', en: '/en/wedding/', ru: '/ru/svadba/', uk: '/uk/vesillia/' },
  photo: { en: '/en/photoshoot/', ru: '/ru/fotosessiya/', uk: '/uk/fotosesiia/' },
  gallery: { tr: '/galeri/', en: '/en/gallery/', ru: '/ru/galereya/', uk: '/uk/halereia/' },
  services: { tr: '/hizmetler/', en: '/en/services/', ru: '/ru/uslugi/', uk: '/uk/posluhy/' },
  gear: { tr: '/ekipman/', en: '/en/equipment/', ru: '/ru/oborudovanie/', uk: '/uk/obladnannia/' },
  about: { tr: '/hakkimizda/', en: '/en/about/', ru: '/ru/o-nas/', uk: '/uk/pro-nas/' },
  contact: { tr: '/iletisim/', en: '/en/contact/', ru: '/ru/kontakty/', uk: '/uk/kontakty/' },
  blog: { tr: '/blog/', en: '/en/blog/', ru: '/ru/blog/', uk: '/uk/blog/' },
  privacy: { tr: '/kvkk/', en: '/en/privacy/', ru: '/ru/privacy/', uk: '/uk/privacy/' },
} satisfies Record<string, Alts>;
export type RouteKey = keyof typeof ROUTES;

export const r = (key: RouteKey, lang: Lang) => (ROUTES[key] as Alts)[lang] ?? ROUTES.home[lang];

/** Yolun dili */
export const langOf = (path: string): Lang => (path.startsWith('/en/') ? 'en' : path.startsWith('/ru/') ? 'ru' : path.startsWith('/uk/') ? 'uk' : 'tr');

/** Yolun bütün dillerdeki karşılıkları (ROUTES'ta yoksa boş) */
export const altsOf = (path: string): Alts => Object.values(ROUTES).find((m) => Object.values(m).includes(path)) ?? {};

interface NavItem {
  key: RouteKey;
  label: string;
  alt: string;
  voice: 'wide' | 'serif';
}

export const NAV_I18N: Record<XLang, NavItem[]> = {
  en: [
    { key: 'drone', label: 'Drone', alt: '120 m', voice: 'wide' },
    { key: 'wedding', label: 'Wedding', alt: '1.7 m', voice: 'serif' },
    { key: 'photo', label: 'Photoshoot', alt: '1.5 m', voice: 'wide' },
    { key: 'services', label: 'Services', alt: '1 m', voice: 'wide' },
    { key: 'gallery', label: 'Gallery', alt: '0.9 m', voice: 'wide' },
    { key: 'about', label: 'About', alt: '0.5 m', voice: 'wide' },
    { key: 'contact', label: 'Contact', alt: '0 m', voice: 'wide' },
  ],
  ru: [
    { key: 'drone', label: 'Дрон', alt: '120 м', voice: 'wide' },
    { key: 'wedding', label: 'Свадьба', alt: '1,7 м', voice: 'serif' },
    { key: 'photo', label: 'Фотосессия', alt: '1,5 м', voice: 'wide' },
    { key: 'services', label: 'Услуги', alt: '1 м', voice: 'wide' },
    { key: 'gallery', label: 'Галерея', alt: '0,9 м', voice: 'wide' },
    { key: 'about', label: 'О нас', alt: '0,5 м', voice: 'wide' },
    { key: 'contact', label: 'Контакты', alt: '0 м', voice: 'wide' },
  ],
  uk: [
    { key: 'drone', label: 'Дрон', alt: '120 м', voice: 'wide' },
    { key: 'wedding', label: 'Весілля', alt: '1,7 м', voice: 'serif' },
    { key: 'photo', label: 'Фотосесія', alt: '1,5 м', voice: 'wide' },
    { key: 'services', label: 'Послуги', alt: '1 м', voice: 'wide' },
    { key: 'gallery', label: 'Галерея', alt: '0,9 м', voice: 'wide' },
    { key: 'about', label: 'Про нас', alt: '0,5 м', voice: 'wide' },
    { key: 'contact', label: 'Контакти', alt: '0 м', voice: 'wide' },
  ],
};

/** Arayüz metinleri (başlık, menü, altbilgi, kapanış bölümü, ortak düğmeler) */
export const UI = {
  tr: {
    home: 'Ana sayfa',
    skip: 'İçeriğe geç',
    logo: 'Necip Bozdemir, ana sayfa',
    mainNav: 'Ana menü',
    menu: 'Menü',
    close: 'Kapat',
    askDate: 'Tarihinizi sorun',
    askShort: 'Tarih sor',
    waHello: 'Merhaba, tarih sormak istiyorum.',
    tagline: 'Alanya ve Antalya’da drone çekimi ve düğün filmi. Yukarıdan, yakından.',
    contact: 'İletişim',
    pages: 'Sayfalar',
    hours: 'Saatler',
    privacy: 'KVKK aydınlatma metni',
    ckText: 'Ziyaret sayısını ve hangi sayfaların okunduğunu görmek için Google Analytics çerezi kullanmak istiyoruz. Kabul etmezseniz site aynı şekilde çalışır.',
    ckYes: 'Kabul et',
    ckNo: 'Reddet',
    ckMore: 'Ayrıntılar',
    ckPref: 'Çerez tercihi',
    crumb: 'Kırıntı yolu',
    langs: 'Dil',
    rss: 'Necip Bozdemir blogu',
  },
  en: {
    home: 'Home',
    skip: 'Skip to content',
    logo: 'Necip Bozdemir, home',
    mainNav: 'Main menu',
    menu: 'Menu',
    close: 'Close',
    askDate: 'Check your date',
    askShort: 'Ask a date',
    waHello: 'Hello, I would like to check availability for a date.',
    tagline: 'Photographer, videographer and drone pilot in Alanya and Antalya. From above, up close.',
    contact: 'Contact',
    pages: 'Pages',
    hours: 'Hours',
    privacy: 'Privacy notice',
    ckText: 'We would like to use a Google Analytics cookie to see how many people visit and which pages they read. If you decline, the site works the same.',
    ckYes: 'Accept',
    ckNo: 'Decline',
    ckMore: 'Details',
    ckPref: 'Cookie settings',
    crumb: 'Breadcrumb',
    langs: 'Language',
    rss: 'Necip Bozdemir blog',
  },
  ru: {
    home: 'Главная',
    skip: 'К содержанию',
    logo: 'Necip Bozdemir, главная',
    mainNav: 'Главное меню',
    menu: 'Меню',
    close: 'Закрыть',
    askDate: 'Узнать свободную дату',
    askShort: 'Узнать дату',
    waHello: 'Здравствуйте! Хочу узнать, свободна ли дата.',
    tagline: 'Фотограф, видеограф и съёмка с дрона в Алании и Анталии. Сверху и вблизи.',
    contact: 'Контакты',
    pages: 'Страницы',
    hours: 'Часы работы',
    privacy: 'Конфиденциальность',
    ckText: 'Мы хотим использовать cookie Google Analytics, чтобы видеть число посещений и какие страницы читают. Если вы откажетесь, сайт будет работать так же.',
    ckYes: 'Принять',
    ckNo: 'Отказаться',
    ckMore: 'Подробнее',
    ckPref: 'Настройки cookie',
    crumb: 'Навигационная цепочка',
    langs: 'Язык',
    rss: 'Блог Necip Bozdemir',
  },
  uk: {
    home: 'Головна',
    skip: 'До змісту',
    logo: 'Necip Bozdemir, головна',
    mainNav: 'Головне меню',
    menu: 'Меню',
    close: 'Закрити',
    askDate: 'Дізнатися вільну дату',
    askShort: 'Вільна дата',
    waHello: 'Добрий день! Хочу дізнатися, чи вільна дата.',
    tagline: 'Фотограф, відеограф і зйомка з дрона в Аланії та Анталії. Згори і зблизька.',
    contact: 'Контакти',
    pages: 'Сторінки',
    hours: 'Години роботи',
    privacy: 'Конфіденційність',
    ckText: 'Ми хочемо використовувати cookie Google Analytics, щоб бачити кількість відвідувань і які сторінки читають. Якщо ви відмовитеся, сайт працюватиме так само.',
    ckYes: 'Прийняти',
    ckNo: 'Відмовитися',
    ckMore: 'Докладніше',
    ckPref: 'Налаштування cookie',
    crumb: 'Навігаційний ланцюжок',
    langs: 'Мова',
    rss: 'Блог Necip Bozdemir',
  },
} as const;

export const HOURS: Record<Lang, { days: string; time: string }[]> = {
  tr: [
    { days: 'Pazartesi-Cuma', time: '09.00-20.00' },
    { days: 'Cumartesi', time: '09.00-18.00' },
    { days: 'Pazar', time: 'Randevuyla' },
  ],
  en: [
    { days: 'Monday-Friday', time: '09:00-20:00' },
    { days: 'Saturday', time: '09:00-18:00' },
    { days: 'Sunday', time: 'By appointment' },
  ],
  ru: [
    { days: 'Понедельник-пятница', time: '09:00-20:00' },
    { days: 'Суббота', time: '09:00-18:00' },
    { days: 'Воскресенье', time: 'По записи' },
  ],
  uk: [
    { days: 'Понеділок-п’ятниця', time: '09:00-20:00' },
    { days: 'Субота', time: '09:00-18:00' },
    { days: 'Неділя', time: 'За записом' },
  ],
};

export const COORDS: Record<Lang, string> = { tr: '36,54° K 32,00° D', en: '36.54° N 32.00° E', ru: '36,54° с. ш. 32,00° в. д.', uk: '36,54° пн. ш. 32,00° сх. д.' };

const MONTHS = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  uk: ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'],
  ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
};
export const fmtDate = (d: Date, lang: XLang) =>
  lang === 'en'
    ? `${MONTHS.en[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
    : `${d.getUTCDate()} ${MONTHS[lang][d.getUTCMonth()]} ${d.getUTCFullYear()}`;

/** Şehir adları (istatistik satırı vb.) */
export const PLACES: Record<Lang, [string, string]> = { tr: ['Alanya', 'Antalya'], en: ['Alanya', 'Antalya'], ru: ['Алания', 'Анталья'], uk: ['Аланія', 'Анталія'] };

/** Dile göre blog koleksiyonu */
export const BLOG_COLL = { tr: 'blog', en: 'blogEn', ru: 'blogRu', uk: 'blogUk' } as const;
