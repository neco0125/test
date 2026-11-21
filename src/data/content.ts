// Ana sayfa, /drone/ ve /dugun/ sayfalarının ortak metinleri.
// Bütün bilgiler eski sitenin hizmet ve blog metinlerinden; uydurma rakam, müşteri ya da fiyat yok.

/** Düğün günü akışı. Saat yazılmadı: her düğünün programı farklı. */
export const WEDDING_DAY = [
  { when: 'Sabah', name: 'Hazırlık', text: 'Gelinlik askıda, ayakkabı, makyaj, düğmeler. Tam gün çekim burada başlar.' },
  { when: 'Öğle', name: 'İlk bakış', text: 'Çiftin birbirini ilk gördüğü an. Poz verdirmeden, olduğu gibi.' },
  { when: 'Öğleden sonra', name: 'Tören', text: 'Nikâh ve aile. Ses ayrı kaydedilir, nikâhtaki “evet” filmde duyulur.' },
  { when: 'Gün batımı öncesi', name: 'Altın saat', text: 'Sahilde ya da terasta, yumuşak ışıkta çift çekimi.' },
  { when: 'Alacakaranlık', name: 'Havadan mekân', text: 'İsteğe bağlı drone: mekân, deniz, kale ve misafirler tek karede.' },
  { when: 'Gece', name: 'İlk dans', text: 'Dans, konfeti, çıkış. Hareket hâlinde, net.' },
  { when: 'Sonra', name: 'Teslim', text: '2-3 saatlik düğün filmi, 1-3 dakikalık klip ve fotoğraflar. Tarih sözleşmede yazar.' },
];

/** Düğünde teslim edilenler (paket adı ve fiyat yok) */
export const WEDDING_RECEIVE = [
  { name: 'Düğün fotoğrafları', text: 'Hazırlıktan son dansa kadar tam gün çekim seçeneğiyle.' },
  { name: 'Düğün filmi', text: 'Düğün, ilk girişten son ana kadar kesintisiz kaydedilir. 2-3 saatlik görüntü.' },
  { name: 'Düğün klibi', text: '1-3 dakika. Sosyal medyada paylaşmak için Reels olarak kurgulanır.' },
  { name: 'Ayrı ses kaydı', text: 'Nikâh ve konuşmalar filmde net duyulur.' },
  { name: 'Yazılı sözleşme', text: 'Çekim süresi, teslim tarihi ve iptal koşulları yazılı.' },
];

/** Düğün öncesi ve çevresindeki çekimler */
export const WEDDING_EXTRAS = [
  { name: 'Save the Date', text: 'Düğünden 1-2 ay önce, 2-3 saatlik çekim. Kart, davetiye ve sosyal medya için.', ask: 'Save the Date çekimi' },
  { name: 'Nişan', text: 'Nişan günü fotoğrafları. Mekânın içinde ya da dışarıda.', ask: 'nişan çekimi' },
  { name: 'Söz ve kına', text: 'Söz töreni ve kına gecesi. İkisi birlikte paket olarak alınabilir.', ask: 'söz ve kına çekimi' },
  { name: 'Drone eklentisi', text: 'Düğün filmine havadan mekân ve misafir görüntüleri.', ask: 'düğün drone çekimi' },
];

/** Drone: teslim edilenler. 4K ve 50/60 fps site sahibinin teyidiyle (12.11.2026); tüm çekimler 4K, sitedeki kopyalar 720p. */
export const DRONE_DELIVER = [
  { k: 'Görüntü', v: '4K, 50 ya da 60 fps. Yüksek kare hızı ağır çekime izin verir.' },
  { k: 'Kurgu', v: 'Renk düzenlenmiş, müzikle kurgulanmış tanıtım filmi.' },
  { k: 'Kesimler', v: 'Yatay 16:9 web ve Booking için, dikey 9:16 Reels ve TikTok için.' },
  { k: 'Plan', v: 'Mekânın uçuş izni ve alanın genişliği çekimden önce birlikte kontrol edilir.' },
];

export const DRONE_USES = [
  { name: 'Otel ve resort', text: 'Havuz, sahil, oda blokları ve çevre. Booking ve web için tanıtım videosu.' },
  { name: 'Yat', text: 'Denizde seyir hâlinde, tam üstten ya da takip çekimi.' },
  { name: 'Mekân', text: 'Restoran, butik otel, düğün mekânı. Yerden görünmeyen bütün alan.' },
  { name: 'Konum videosu', text: 'İşletmenin yerini havadan gösterir: bilinen bir caddeden ya da sahilden başlar, işletmenin üstünde biter. Google profili, web sitesi ve Reels için.' },
  { name: 'Etkinlik', text: 'Konser, festival, açılış. Gece de uçuyoruz: ham klip kalabalık bir etkinliğin üstünden.' },
  { name: 'Düğün', text: 'Sahilde, bahçede ya da kale manzaralı terasta mekân ve misafirler.' },
];

export const DRONE_PROCESS = [
  { name: 'Görüşme', text: 'Mekân, tarih ve videonun nerede kullanılacağı.' },
  { name: 'Uçuş planı', text: 'İzin, alan, ışık saati. Gün batımı ya da gece çekimi buna göre seçilir.' },
  { name: 'Çekim', text: 'Havadan ve gerekirse yerden kamerayla.' },
  { name: 'Kurgu ve renk', text: 'Renk düzenleme, müzik, istenen sürelerde kesimler.' },
  { name: 'Teslim', text: 'Yatay ve dikey dosyalar, kullanıma hazır.' },
];

export const DRONE_FAQ = [
  {
    q: 'Hangi işler için drone çekimi yapıyorsunuz?',
    a: 'Otel ve resort tanıtımı, yat, restoran ve düğün mekânları, konser ve festival gibi etkinlikler ve düğünler. Teslimi Booking, web sitesi ve sosyal medya ölçülerinde yaparız.',
  },
  {
    q: 'Drone çekimi için izin gerekiyor mu?',
    a: 'İki ayrı izin konusu var: mekânın kendi kuralı ve bölgenin hava sahası. Havalimanı çevresi ve askerî alanlar gibi bölgelerde uçuş ek izne bağlı ya da yasak. Uçuş planında izin durumunu, alanın genişliğini ve ışık saatini birlikte kontrol ederiz.',
  },
  {
    q: 'Drone çekimi için en iyi saat hangisi?',
    a: 'Gün batımından yaklaşık bir saat önceki altın saat en yumuşak ışığı verir. Etkinliklerde gece de uçuyoruz; sayfadaki ham klip gece çekildi.',
  },
  {
    q: 'Düğüne drone çekimi eklenebilir mi?',
    a: 'Evet. Drone düğün filmine eklenebilir. Save the Date paketine kısa bir drone klibi de eklenebilir.',
  },
  {
    q: 'Görüntü hangi kalitede teslim ediliyor?',
    a: '4K, 50 ya da 60 fps. Yüksek kare hızı ağır çekime izin verir.',
  },
  {
    q: 'Teslimde neler var?',
    a: 'Renk düzenlenmiş kurgu, yatay 16:9 ve dikey 9:16 kesimler. Süreleri kullanılacak yere göre birlikte belirleriz.',
  },
  {
    q: 'Fiyat nasıl belirleniyor?',
    a: 'Çekim süresine, lokasyona ve teslim edilecek işe göre teklif hazırlarız. Tarihi ve mekânı WhatsApp’tan yazmanız yeterli.',
  },
];

export const WEDDING_FAQ = [
  {
    q: 'Düğün filmi ne kadar sürüyor?',
    a: 'Düğün filmi 2-3 saat sürer. Düğünü ilk girişten son ana kadar kesintisiz kaydederiz. Sosyal medya için ayrıca 1-3 dakikalık bir klip hazırlarız.',
  },
  {
    q: 'Düğün klibi ile düğün filmi arasındaki fark ne?',
    a: 'Düğün filmi, düğünün baştan sona kesintisiz kaydı. 2-3 saat sürer, nikâhtaki sözler ve konuşmalar da duyulur. Klip ise sosyal medyada paylaşmak için Reels olarak kurgulanan 1-3 dakikalık bir video.',
  },
  {
    q: 'Teslim ne zaman?',
    a: 'Teslim tarihi sözleşmede yazar. Gecikme ihtimaline karşı telafi planı da baştan belirlenir.',
  },
  {
    q: 'Kına, söz ve nişanı da çekiyor musunuz?',
    a: 'Evet. Kına gecesini, sözü ve nişanı düğünle aynı ekip çekerse renk, albüm ve teslim tek elden yürür. Söz ve kına birlikte paket olarak alınabilir.',
  },
  {
    q: 'Save the Date ne zaman çekilmeli?',
    a: 'Nişandan sonra, düğünden 1-2 ay önce. Çekim genellikle 2-3 saat sürer. Alanya’da ilkbahar ve sonbahar ışık açısından en rahat aylar.',
  },
  {
    q: 'Mekânı önceden görüyor musunuz?',
    a: 'Mekânı seçtikten sonra birlikte keşif planlayabiliriz. Böylece düğün günü gün batımının yönünü ve hazırlık alanını önceden biliriz.',
  },
  {
    q: 'Ne kadar önce yer ayırtmalıyız?',
    a: 'Mümkün olduğunca erken. Alanya’da yaz sezonu yoğun geçiyor ve en çok istenen tarihler hızla doluyor.',
  },
  {
    q: 'Antalya’daki düğünlere de geliyor musunuz?',
    a: 'Evet. Alanya merkezliyiz, Alanya ve Antalya’daki düğünleri çekiyoruz.',
  },
];

/** Ana sayfadaki ikincil hizmetler */
export const OTHER_SERVICES = [
  { name: 'Portre ve aile', text: 'Dış mekân, aile, hamilelik ve doğum günü çekimleri.', href: '/hizmetler/#portre' },
  { name: 'Sosyal medya ve Reels', text: 'Instagram ve TikTok için aylık içerik: konsept, çekim, kurgu.', href: '/hizmetler/#kurumsal' },
  { name: 'Kurumsal tanıtım', text: 'Şirket ve marka filmi. Senaryo, çekim ve post-prodüksiyon.', href: '/hizmetler/#kurumsal' },
  { name: 'Ürün fotoğrafı', text: 'E-ticaret ve katalog için stüdyo ve kullanım anı fotoğrafları.', href: '/hizmetler/#kurumsal' },
];
