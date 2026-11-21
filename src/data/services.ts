export interface Service {
  name: string;
  text: string;
  /** WhatsApp mesajında cümle içinde geçen ad */
  ask: string;
  /** İlgili blog yazıları (yalnız TR sayfası) */
  read?: { href: string; label: string }[];
}
export interface ServiceGroup {
  id: string;
  title: string;
  lead: string;
  items: Service[];
}

export const GROUPS: ServiceGroup[] = [
  {
    id: 'dugun',
    title: 'Düğün ve özel günler',
    lead: 'Düğün, nişan, söz ve kına. Fotoğrafı, filmi ve drone çekimini aynı ekip yapar.',
    items: [
      {
        name: 'Düğün fotoğrafçılığı',
        read: [{ href: '/blog/dugun-fotografcisi-secimi/', label: 'Düğün fotoğrafçısı seçerken' }, { href: '/blog/dugun-gunu-akisi/', label: 'Düğün günü akışı' }, { href: '/blog/alanya-dugun-mekanlari/', label: 'Alanya düğün mekânları' }],
        text: 'Hazırlıktan son dansa kadar süren tam gün çekim seçeneği var. Doğal ışıkla çalışır, günü akış sırasıyla belgeleriz.',
        ask: 'düğün fotoğrafçılığı',
      },
      {
        name: 'Düğün hikâyesi ve klibi',
        text: 'Baştan sona kesintisiz, 2-3 saatlik düğün filmi ve 1-3 dakikalık Reels klibi. Ses ayrıca kaydedilir, klip müzikle kurgulanır.',
        ask: 'düğün klibi',
      },
      {
        name: 'Drone çekimi',
        read: [{ href: '/blog/alanya-drone-cekim-noktalari/', label: 'Alanya drone çekim noktaları' }, { href: '/blog/antalya-drone-cekimi/', label: 'Antalya drone çekimi' }, { href: '/blog/drone-dugun-cekimi/', label: 'Düğünde drone' }],
        text: 'Drone ile düğün, mekân ve lokasyon çekimi.',
        ask: 'drone çekimi',
      },
      {
        name: 'Save the Date',
        read: [{ href: '/blog/alanya-dis-cekim-mekanlari/', label: 'Alanya dış çekim mekânları' }],
        text: 'Düğünden önce yapılan çekim. Fotoğraflar kartta, sosyal medyada ve dijital davetiyede kullanılır.',
        ask: 'Save the Date çekimi',
      },
      {
        name: 'Nişan çekimi',
        text: 'Nişan günü fotoğrafları. Mekânın içinde ya da dış mekânda çekilir.',
        ask: 'nişan çekimi',
      },
      {
        name: 'Söz ve kına çekimi',
        text: 'Söz töreni ve kına gecesi çekimi. İkisi birlikte paket olarak alınabilir.',
        ask: 'söz ve kına çekimi',
      },
    ],
  },
  {
    id: 'portre',
    title: 'Portre ve aile',
    lead: 'Aile, hamilelik ve doğum günü çekimleri. Stüdyoda ya da dışarıda.',
    items: [
      {
        name: 'Dış mekân fotoğraf çekimi',
        read: [{ href: '/blog/mezuniyet-fotograf-cekimi/', label: 'Mezuniyet fotoğraf çekimi' }, { href: '/blog/gazipasa-dogal-havuzlar-cekim/', label: 'Gazipaşa doğal havuzları' }],
        text: 'Alanya ve Antalya’da sahilde, doğada ve tarihî mekânlarda portre çekimi.',
        ask: 'dış mekân fotoğraf çekimi',
      },
      {
        name: 'Aile çekimi',
        text: 'Bütün aile bireyleriyle, iç ya da dış mekânda.',
        ask: 'aile çekimi',
      },
      {
        name: 'Hamile çekimi',
        text: 'Stüdyoda ya da dış mekânda hamilelik fotoğrafları.',
        ask: 'hamile çekimi',
      },
      {
        name: 'Doğum günü çekimi',
        text: 'Çocuk ve yetişkin doğum günlerinde kutlama fotoğrafları.',
        ask: 'doğum günü çekimi',
      },
    ],
  },
  {
    id: 'kurumsal',
    title: 'Dijital ve kurumsal',
    lead: 'Sosyal medya içeriği, tanıtım filmi, ürün ve mekân çekimi.',
    items: [
      {
        name: 'Sosyal medya içerik üretimi',
        text: 'Instagram, TikTok ve diğer platformlar için aylık içerik paketi. Konsept, çekim, kurgu ve takvim pakete dahildir.',
        ask: 'sosyal medya içerik üretimi',
      },
      {
        name: 'Instagram Reels',
        text: 'Dikey formatta Reels çekimi ve kurgusu. Videoyu açılış sahnesinden sondaki çağrıya kadar planlarız.',
        ask: 'Instagram Reels çekimi',
      },
      {
        name: 'TikTok video çekimi',
        text: 'TikTok için kısa video. Çekimden önce trendlere bakar, konsepti birlikte belirleriz.',
        ask: 'TikTok video çekimi',
      },
      {
        name: 'Kurumsal tanıtım filmi',
        text: 'Şirket, marka ya da ürün tanıtım filmi. Senaryo, çekim ve post-prodüksiyon dahildir.',
        ask: 'kurumsal tanıtım filmi',
      },
      {
        name: 'Ürün fotoğraf çekimi',
        text: 'E-ticaret, katalog ve sosyal medya için stüdyo ve kullanım anı fotoğrafları. Renkler bütün seride aynı tutulur.',
        ask: 'ürün fotoğraf çekimi',
      },
      {
        name: 'Mekân tanıtım videosu',
        text: 'Otel, restoran ve butikler için drone dahil tanıtım videosu. Booking ve sosyal medya ölçülerinde teslim edilir.',
        ask: 'mekân tanıtım videosu',
      },
    ],
  },
];

/** Ana sayfadaki dizin: eski ana sayfadaki altı başlık */
export const HOME_INDEX = [
  { name: 'Düğün fotoğrafçılığı', text: 'Hazırlıktan son dansa kadar tam gün çekim.', href: '/hizmetler/#dugun' },
  { name: 'Düğün klibi ve filmi', text: '2-3 saatlik film, yanında 1-3 dakikalık klip.', href: '/hizmetler/#dugun' },
  { name: 'Drone çekimi', text: 'Düğün, mekân ve lokasyon için havadan görüntü.', href: '/hizmetler/#dugun' },
  { name: 'Sosyal medya ve Reels', text: 'Instagram ve TikTok için çekim, kurgu, aylık paket.', href: '/hizmetler/#kurumsal' },
  { name: 'Kurumsal video', text: 'Senaryosu, çekimi ve kurgusuyla tanıtım filmi.', href: '/hizmetler/#kurumsal' },
  { name: 'Save the Date ve nişan', text: 'Düğün öncesi çekim. Kart ve dijital davetiye için.', href: '/hizmetler/#dugun' },
];

/** İletişim formundaki hizmet seçenekleri (eski sitedeki listeyle aynı) */
export const FORM_SERVICES = [
  'Düğün Fotoğrafçılığı',
  'Düğün Klibi & Hikâyesi',
  'Drone Çekimi',
  'Save the Date',
  'Nişan Çekimi',
  'Söz & Kına Çekimi',
  'Dış Mekân & Aile Çekimi',
  'Hamile Çekimi',
  'Doğum Günü Çekimi',
  'Sosyal Medya İçerik Üretimi',
  'Instagram Reels',
  'TikTok Video Çekimi',
  'Kurumsal Tanıtım Filmi',
  'Ürün Fotoğraf Çekimi',
  'Mekân Tanıtım Videosu',
  'Diğer',
];
