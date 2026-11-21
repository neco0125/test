export const SITE = {
  name: 'Necip Bozdemir',
  url: 'https://www.necipbozdemir.com',
  phoneDisplay: '+90 551 032 05 31',
  phoneE164: '+905510320531',
  waNumber: '905510320531',
  instagram: 'https://www.instagram.com/ncpbzd/',
  instagramHandle: '@ncpbzd',
  // Google İşletme Profili (Haritalar, cid bağlantısı)
  gbp: 'https://maps.google.com/?cid=15570192574689578781',
  // Google Analytics 4 ölçüm kimliği; yalnızca ziyaretçi çerez bildiriminde "Kabul" derse yüklenir
  ga4: 'G-ZGH16MBWW6',
  locality: 'Alanya',
  region: 'Antalya',
  // Alanya merkezinin koordinatı (gösterim ve JSON-LD için)
  lat: 36.54,
  lon: 32.0,
  coords: '36,54° K 32,00° D',
  hours: [
    { days: 'Pazartesi-Cuma', time: '09.00-20.00' },
    { days: 'Cumartesi', time: '09.00-18.00' },
    { days: 'Pazar', time: 'Randevuyla' },
  ],
} as const;

/**
 * KVKK aydınlatma metninde görünen veri sorumlusu bilgileri (src/pages/kvkk.astro).
 * TODO(site sahibi): Yayından önce doldurun ve metni bir hukukçuya gösterin.
 * - address: yazılı başvuruların gönderileceği açık adres
 * - email: başvuruların alınacağı e-posta adresi (varsa KEP adresi de)
 * - retention: saklama süreleri; aşağıdakiler öneridir, hukukçu onayı gerekir
 * Boş alanlar sayfada gösterilmez; `npm run verify` boş kaldıkça uyarı verir.
 */
export const LEGAL = {
  controller: 'Necip Bozdemir',
  address: '',
  email: 'necoboz321@gmail.com',
  kep: '',
  retentionInquiry: '1 yıl',
  updated: '2026-11-13',
};

/**
 * TODO(site sahibi): Form gönderimlerinin gideceği adres.
 * Eski site FormSubmit kullanıyordu ama e-posta adresi kaynak dosyalarda yok.
 * Örnek: 'https://formsubmit.co/adres@ornek.com'
 * Boş kaldığı sürece form, içeriği hazır bir WhatsApp mesajına çevirip WhatsApp'ı açar.
 */
export const FORM_ACTION: string = '';

export const wa = (text = 'Merhaba, bilgi almak istiyorum.') =>
  `https://wa.me/${SITE.waNumber}?text=${encodeURIComponent(text)}`;

// alt: menüdeki yükseklik etiketi (sitenin "yukarıdan / yakından" inişi; dekoratif). voice: 'serif' olan öğe italik serifle yazılır.
export const NAV = [
  { href: '/drone/', label: 'Drone', alt: '120 m', voice: 'wide' },
  { href: '/dugun/', label: 'Düğün', alt: '1,7 m', voice: 'serif' },
  { href: '/hizmetler/', label: 'Hizmetler', alt: '1 m', voice: 'wide' },
  { href: '/galeri/', label: 'Galeri', alt: '0,9 m', voice: 'wide' },
  { href: '/ekipman/', label: 'Ekipman', alt: '0,8 m', voice: 'wide' },
  { href: '/hakkimizda/', label: 'Hakkımızda', alt: '0,5 m', voice: 'wide' },
  { href: '/iletisim/', label: 'İletişim', alt: '0 m', voice: 'wide' },
] as const;

const TR_MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
export const trDate = (d: Date) => `${d.getUTCDate()} ${TR_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
export const pad2 = (n: number) => String(n).padStart(2, '0');
