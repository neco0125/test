// Galeri: yaptığımız işlerden kısa döngüler (GIF gibi, sessiz) ve tıklayınca açılan tam video.
// Önizlemeler public/media/*-onizleme.mp4; görününce iner (Base'teki data-pv), sayfa açılışını yavaşlatmaz.
import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n';
import posterAcilis from '../assets/img/poster-acilis.jpg';
import posterOffroad from '../assets/img/poster-offroad.jpg';
import posterOtel from '../assets/img/poster-otel.jpg';
import posterHam from '../assets/img/poster-ham.jpg';
import posterKurgu from '../assets/img/poster-kurgu.jpg';
import posterHavuz from '../assets/img/poster-havuz.jpg';
import posterKonser from '../assets/img/poster-konser.jpg';
import posterKonum from '../assets/img/poster-konum.jpg';
import posterKebap from '../assets/img/poster-kebap.jpg';
import posterIzgara from '../assets/img/poster-izgara.jpg';
import posterSogan from '../assets/img/poster-sogan.jpg';

type T = Record<Lang, string>;
export interface GalleryVideo {
  id: string;
  poster: ImageMetadata;
  /** Tam video; yoksa kutu yalnızca sessiz döngü (GIF gibi) gösterir */
  src?: string;
  /** Sessiz döngü videosu; yalnızca GIF'li (videosuz) kutuda boş kalır */
  pv?: string;
  /** Kutuda video döngüsü yerine gösterilecek GIF (public/ yolu, ekrana gelince iner) */
  gif?: string;
  len: string;
  vertical?: boolean;
  /** Tam videoda ses var mı */
  sound: boolean;
  tag: T;
  title: T;
  alt: T;
  meta: T;
}

export const GALLERY: GalleryVideo[] = [
  {
    id: 'konser',
    poster: posterKonser,
    src: '/media/konser.mp4',
    pv: '/media/konser-onizleme.mp4',
    len: '00:07',
    sound: false,
    tag: { tr: 'Drone · gece', en: 'Drone · night', ru: 'Дрон · ночь', uk: 'Дрон · ніч' },
    title: { tr: '19 Mayıs konseri, havadan', en: '19 May concert from the air', ru: 'Концерт 19 мая с воздуха', uk: 'Концерт 19 травня з повітря' },
    alt: {
      tr: 'Gece, telefon ışıklarını kaldırmış kalabalığın üstünden mavi ışınlarla aydınlanan konser sahnesine yaklaşan drone',
      en: 'A drone moving towards a concert stage lit with blue beams, over a crowd holding up phone lights at night',
      ru: 'Ночью дрон приближается к концертной сцене в синих лучах над толпой с поднятыми телефонами',
      uk: 'Уночі дрон наближається до концертної сцени в синіх променях над натовпом із піднятими телефонами',
    },
    meta: { tr: 'drone · gece · sessiz döngü', en: 'drone · night · silent loop', ru: 'дрон · ночь · без звука', uk: 'дрон · ніч · без звуку' },
  },
  {
    id: 'acilis',
    poster: posterAcilis,
    src: '/media/acilis-720.mp4',
    pv: '/media/acilis-onizleme.mp4',
    len: '00:42',
    sound: true,
    tag: { tr: 'Tanıtım', en: 'Promo', ru: 'Промо', uk: 'Промо' },
    title: { tr: 'Tekinoğlu Kuyumculuk açılışı', en: 'Tekinoğlu jewellery shop opening', ru: 'Открытие ювелирного магазина Tekinoğlu', uk: 'Відкриття ювелірного магазину Tekinoğlu' },
    alt: {
      tr: 'Balonlarla süslenmiş caddede çelenklerin önünde açılış için toplanan kalabalık',
      en: 'A crowd gathering for an opening on a street decorated with balloons and flower stands',
      ru: 'Толпа собирается на открытие на улице, украшенной шарами и цветочными стойками',
      uk: 'Натовп збирається на відкриття на вулиці, прикрашеній кулями й квітковими стійками',
    },
    meta: { tr: '4K çekim · 00:42 · müzikli', en: 'Shot in 4K · 00:42 · with music', ru: 'Снято в 4K · 00:42 · с музыкой', uk: 'Знято в 4K · 00:42 · з музикою' },
  },
  {
    id: 'offroad',
    poster: posterOffroad,
    src: '/media/offroad-720.mp4',
    pv: '/media/offroad-onizleme.mp4',
    len: '00:32',
    vertical: true,
    sound: true,
    tag: { tr: 'Reels', en: 'Reels', ru: 'Reels', uk: 'Reels' },
    title: { tr: 'Off-road etkinliği Reels', en: 'Off-road event Reels', ru: 'Reels с офроуд-мероприятия', uk: 'Reels з офроуд-події' },
    alt: {
      tr: 'Toprak hendeğe dalan beyaz bir 4x4 aracın önünde yükselen toz bulutu',
      en: 'Dust rising in front of a white 4x4 diving into a dirt trench',
      ru: 'Пыль поднимается перед белым внедорожником, который ныряет в земляную траншею',
      uk: 'Пил здіймається перед білим позашляховиком, що пірнає в земляну траншею',
    },
    meta: { tr: '4K çekim · 9:16 dikey · 00:32', en: 'Shot in 4K · 9:16 vertical · 00:32', ru: 'Снято в 4K · 9:16 · 00:32', uk: 'Знято в 4K · 9:16 · 00:32' },
  },
  {
    // Kaynak: 20.11.2026 WhatsApp videosu (dikey). Tam video yalnızca havadan bölüm (0-23 sn):
    // yer seviyesindeki devamında plaka ve tanınabilir yüzler var, siteye alınmadı.
    id: 'konum',
    poster: posterKonum,
    src: '/media/konum.mp4',
    pv: '/media/konum-onizleme.mp4',
    len: '00:23',
    vertical: true,
    sound: true,
    tag: { tr: 'Drone · konum', en: 'Drone · location', ru: 'Дрон · локация', uk: 'Дрон · локація' },
    title: { tr: 'İşletme konum videosu, havadan', en: 'Business location video from the air', ru: 'Видео-локация бизнеса с воздуха', uk: 'Відео-локація бізнесу з повітря' },
    alt: {
      tr: 'Alanya’da sahil boyunca uzanan cadde, oteller ve park havadan; caddenin ucunda bir kuaför salonunun yerini gösteren etiket',
      en: 'An aerial view of a seafront street in Alanya with hotels and a park, and a label marking where a hair salon sits at the end of the street',
      ru: 'Вид сверху на приморскую улицу в Алании с отелями и парком и метку, показывающую, где в конце улицы находится парикмахерская',
      uk: 'Вигляд згори на приморську вулицю в Аланії з готелями й парком і мітку, що показує, де в кінці вулиці розташована перукарня',
    },
    meta: { tr: 'drone · 9:16 dikey · 00:23 · müzikli', en: 'drone · 9:16 vertical · 00:23 · with music', ru: 'дрон · 9:16 · 00:23 · с музыкой', uk: 'дрон · 9:16 · 00:23 · з музикою' },
  },
  {
    // Videosuz iş: yalnızca hareketli görsel (WebP + GIF yedeği). Yüz, işletme adı ve logo içermeyen kesit (4.4-7.5 sn).
    id: 'kebap',
    poster: posterKebap,
    pv: '/media/kebap-onizleme.mp4',
    len: '00:03',
    vertical: true,
    sound: false,
    tag: { tr: 'Reels · içerik üretimi', en: 'Reels · content production', ru: 'Reels · создание контента', uk: 'Reels · створення контенту' },
    title: {
      tr: 'Kebapçı için Reels: gerçekten çizgi romana',
      en: 'Kebab restaurant Reels: from real to comic',
      ru: 'Reels для кебабной: из жизни в комикс',
      uk: 'Reels для кебабної: з життя в комікс',
    },
    alt: {
      tr: 'Bir kebapçının mutfağında şişe işlenen kıyma, kazandan alınan çorba ve odun ateşli fırın; her plan aynı karenin çizgi roman çizimine dönüşüyor',
      en: 'Minced meat shaped on a skewer, soup being ladled and a wood-fired oven in a kebab restaurant kitchen, each shot turning into a comic-book drawing of the same frame',
      ru: 'Фарш на шампуре, суп из котла и дровяная печь на кухне кебабной; каждый кадр превращается в рисунок в стиле комикса',
      uk: 'Фарш на шампурі, суп із казана та дров’яна піч на кухні кебабної; кожен кадр перетворюється на малюнок у стилі коміксу',
    },
    meta: { tr: '9:16 dikey · Reels ve TikTok · sessiz döngü', en: '9:16 vertical · Reels and TikTok · silent loop', ru: '9:16 вертикально · Reels и TikTok · без звука', uk: '9:16 вертикально · Reels і TikTok · без звуку' },
  },
  {
    // Videosuz iş: mangal planları (13.8-17.2 sn), yüz ve tabela yok
    id: 'izgara',
    poster: posterIzgara,
    pv: '/media/izgara-onizleme.mp4',
    len: '00:03',
    vertical: true,
    sound: false,
    tag: { tr: 'Reels · içerik üretimi', en: 'Reels · content production', ru: 'Reels · создание контента', uk: 'Reels · створення контенту' },
    title: { tr: 'Restoran Reels’i: mangal ve duman', en: 'Restaurant Reels: grill and smoke', ru: 'Reels для ресторана: мангал и дым', uk: 'Reels для ресторану: мангал і дим' },
    alt: {
      tr: 'Mangalda közün üstünde Adana kebap, tavuk ve et şişler; arkada yükselen yoğun duman',
      en: 'Adana kebab, chicken and meat skewers over hot coals, with thick smoke rising behind',
      ru: 'Адана-кебаб, шашлык из курицы и мяса над углями, позади поднимается густой дым',
      uk: 'Адана-кебаб, шашлик із курки та м’яса над жаром, позаду здіймається густий дим',
    },
    meta: { tr: '9:16 dikey · Reels ve TikTok · sessiz döngü', en: '9:16 vertical · Reels and TikTok · silent loop', ru: '9:16 вертикально · Reels и TikTok · без звука', uk: '9:16 вертикально · Reels і TikTok · без звуку' },
  },
  {
    // Videosuz iş: soğan serpme planı (8.48-10.28 sn, %64 hız), yüz ve tabela yok
    id: 'sogan',
    poster: posterSogan,
    pv: '/media/sogan-onizleme.mp4',
    len: '00:02',
    vertical: true,
    sound: false,
    tag: { tr: 'Reels · içerik üretimi', en: 'Reels · content production', ru: 'Reels · создание контента', uk: 'Reels · створення контенту' },
    title: { tr: 'Restoran Reels’i: közde tavuk ve soğan', en: 'Restaurant Reels: chicken over coals and onions', ru: 'Reels для ресторана: курица на углях и лук', uk: 'Reels для ресторану: курка на жару й цибуля' },
    alt: {
      tr: 'Közde dumanlar içinde tavuk şiş, turkuaz fonun önünde eldivenli elden dökülen doğranmış soğan ve ızgarada et, ağır çekim',
      en: 'Chicken skewers in smoke over coals, chopped onion falling from a gloved hand against a turquoise background, and meat on the grill, in slow motion',
      ru: 'Куриные шашлыки в дыму над углями, нарезанный лук из руки в перчатке на бирюзовом фоне и мясо на гриле, замедленная съемка',
      uk: 'Курячі шашлики в диму над жаром, нарізана цибуля з руки в рукавичці на бірюзовому тлі й м’ясо на грилі, уповільнена зйомка',
    },
    meta: { tr: '9:16 dikey · ağır çekim · sessiz döngü', en: '9:16 vertical · slow motion · silent loop', ru: '9:16 вертикально · замедленная съемка · без звука', uk: '9:16 вертикально · уповільнена зйомка · без звуку' },
  },
  {
    id: 'otel',
    poster: posterOtel,
    src: '/media/otel.mp4',
    pv: '/media/otel-dongu.mp4',
    len: '00:14',
    sound: false,
    tag: { tr: 'Drone', en: 'Drone', ru: 'Дрон', uk: 'Дрон' },
    title: { tr: 'Otel tanıtımı, havadan', en: 'Hotel promo from the air', ru: 'Промо отеля с воздуха', uk: 'Промо готелю з повітря' },
    alt: {
      tr: 'Deniz kıyısında havuzlu bir otelin havadan görünümü',
      en: 'Aerial view of a hotel with a pool on the seafront',
      ru: 'Отель с бассейном на берегу моря, вид сверху',
      uk: 'Готель з басейном на березі моря, вигляд згори',
    },
    meta: { tr: '4K çekim · drone · 00:14', en: 'Shot in 4K · drone · 00:14', ru: 'Снято в 4K · дрон · 00:14', uk: 'Знято в 4K · дрон · 00:14' },
  },
  {
    id: 'havuz',
    poster: posterHavuz,
    pv: '/media/havuz-onizleme.mp4',
    len: '00:09',
    sound: false,
    tag: { tr: 'Drone · dış çekim', en: 'Drone · outdoor shoot', ru: 'Дрон · выездная съемка', uk: 'Дрон · виїзна зйомка' },
    title: { tr: 'Gazipaşa doğal havuzları, havadan', en: 'Gazipaşa natural pools from the air', ru: 'Природные бассейны Газипаши с воздуха', uk: 'Природні басейни Газіпаші з повітря' },
    alt: {
      tr: 'Tabakalı kaya düzlüklerindeki doğal havuzda yüzen ve kayalarda oturan insanlar, arkada tepesinde yapı olan yeşil burun',
      en: 'People swimming in a natural rock pool and sitting on layered rock shelves, with a green headland topped by a building behind',
      ru: 'Люди купаются в природном бассейне среди слоистых скал, позади зеленый мыс со зданием на вершине',
      uk: 'Люди купаються в природному басейні серед шаруватих скель, позаду зелений мис зі спорудою на вершині',
    },
    meta: { tr: '4K çekim · drone · sessiz döngü', en: 'Shot in 4K · drone · silent loop', ru: 'Снято в 4K · дрон · без звука', uk: 'Знято в 4K · дрон · без звуку' },
  },
  {
    id: 'kurgu',
    poster: posterKurgu,
    src: '/media/kurgu.mp4',
    pv: '/media/kurgu-onizleme.mp4',
    len: '00:12',
    sound: false,
    tag: { tr: 'Drone', en: 'Drone', ru: 'Дрон', uk: 'Дрон' },
    title: { tr: 'Renk düzenlenmiş kurgu', en: 'Colour-graded edit', ru: 'Монтаж с цветокоррекцией', uk: 'Монтаж із кольорокорекцією' },
    alt: {
      tr: 'Çam ormanının üstünde dalgalanan Türk bayrağı, arkada deniz',
      en: 'A Turkish flag waving over a pine forest with the sea behind',
      ru: 'Турецкий флаг над сосновым лесом, позади море',
      uk: 'Турецький прапор над сосновим лісом, позаду море',
    },
    meta: { tr: '4K çekim · renk düzenlenmiş · 00:12', en: 'Shot in 4K · colour-graded · 00:12', ru: 'Снято в 4K · цветокоррекция · 00:12', uk: 'Знято в 4K · кольорокорекція · 00:12' },
  },
  {
    id: 'ham',
    poster: posterHam,
    src: '/media/ham.mp4',
    pv: '/media/ham-onizleme.mp4',
    len: '00:27',
    sound: false,
    tag: { tr: 'Drone · gece', en: 'Drone · night', ru: 'Дрон · ночь', uk: 'Дрон · ніч' },
    title: { tr: 'Gece etkinliği, ham görüntü', en: 'Night event, raw footage', ru: 'Ночное мероприятие, исходник', uk: 'Нічна подія, вихідне відео' },
    alt: {
      tr: 'Gece, kalabalık bir etkinlik alanının tam üstten görünümü',
      en: 'A crowded event ground at night, seen from directly above',
      ru: 'Многолюдная площадка ночью, вид строго сверху',
      uk: 'Людний майданчик уночі, вигляд строго згори',
    },
    meta: { tr: '4K çekim · işlenmemiş · 00:27', en: 'Shot in 4K · ungraded · 00:27', ru: 'Снято в 4K · без обработки · 00:27', uk: 'Знято в 4K · без обробки · 00:27' },
  },
];

export const GALLERY_PAGE: Record<Lang, { title: string; description: string; h: string; sub: string; lead: string; play: string; note: string }> = {
  tr: {
    title: 'Galeri: drone, tanıtım ve Reels videoları',
    description: 'Alanya ve Antalya’da çektiğimiz işlerden kısa döngüler: drone ile otel ve gece etkinliği, kuyumcu açılışı tanıtımı ve dikey Reels. Dokununca tam video açılır.',
    h: 'Galeri',
    sub: 'hareket hâlinde.',
    lead: 'Çektiğimiz işlerden kısa döngüler. Birine dokunun, tam video açılsın.',
    play: 'Videoyu oynat',
    note: 'Döngüler sessiz ve ekrana gelince iner. Hareket azaltma ya da veri tasarrufu açıksa yalnızca kapak görünür.',
  },
  en: {
    title: 'Gallery: Drone, Promo and Reels Videos from Alanya',
    description: 'Short loops from our work in Alanya and Antalya: drone footage of a hotel and a night event, a shop opening promo and a vertical Reel. Tap to play the full video.',
    h: 'Gallery',
    sub: 'in motion.',
    lead: 'Short loops from our work. Tap one to play the full video.',
    play: 'Play the video',
    note: 'Loops are silent and load as they come into view. With reduced motion or data saver on, only the cover is shown.',
  },
  ru: {
    title: 'Галерея: видео с дрона, промо и Reels в Алании',
    description: 'Короткие фрагменты наших работ в Алании и Анталии: съемка отеля и ночного мероприятия с дрона, промо открытия магазина и вертикальный Reels.',
    h: 'Галерея',
    sub: 'в движении.',
    lead: 'Короткие фрагменты наших работ. Нажмите на любой, чтобы посмотреть видео целиком.',
    play: 'Смотреть видео',
    note: 'Фрагменты идут без звука и загружаются, когда появляются на экране. При включенной экономии трафика видна только обложка.',
  },
  uk: {
    title: 'Галерея: відео з дрона, промо і Reels в Аланії',
    description: 'Короткі фрагменти наших робіт в Аланії та Анталії: зйомка готелю й нічної події з дрона, промо відкриття магазину та вертикальний Reels.',
    h: 'Галерея',
    sub: 'у русі.',
    lead: 'Короткі фрагменти наших робіт. Натисніть на будь-який, щоб переглянути відео повністю.',
    play: 'Дивитися відео',
    note: 'Фрагменти йдуть без звуку й завантажуються, коли з’являються на екрані. Якщо ввімкнено економію трафіку, видно лише обкладинку.',
  },
};
