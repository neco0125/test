# Yayına alma

```
npm install
npm run build      # çıktı: dist/
npm run verify     # dist/ üzerinde bağlantı, JS, font ve emoji denetimi
```

`dist/` klasörünün tamamı sunucunun kök dizinine kopyalanır. Site tamamen statiktir, sunucuda Node gerekmez.

## nginx (Cloudflare arkasında)

`public/_headers` ve `public/_redirects` yalnızca Cloudflare Pages / Netlify içindir. nginx'te karşılığı:

```nginx
server {
    server_name www.necipbozdemir.com;
    root /var/www/necipbozdemir/dist;
    index index.html;
    charset utf-8;

    # Sıkıştırma (Cloudflare kenarda brotli uygular; köken için gzip yeterli)
    gzip on;
    gzip_comp_level 6;
    gzip_min_length 512;
    gzip_types text/css application/javascript application/json application/xml image/svg+xml text/plain;
    # ngx_brotli kuruluysa:
    # brotli on; brotli_comp_level 5;
    # brotli_types text/css application/javascript application/json application/xml image/svg+xml text/plain;

    # Parmak izli dosyalar ve videolar: bir yıl, değişmez
    location /_astro/ { add_header Cache-Control "public, max-age=31536000, immutable"; }
    location /media/  { add_header Cache-Control "public, max-age=31536000, immutable"; }
    location ~* ^/(og\.jpg|favicon\.svg|apple-touch-icon\.png)$ { add_header Cache-Control "public, max-age=604800"; }

    # Eski .html adresleri -> yeni temiz adresler
    location = /index.html      { return 301 /; }
    location = /hizmetler.html  { return 301 /hizmetler/; }
    location = /portfolyo.html  { return 301 /galeri/; }
    location = /hakkimizda.html { return 301 /hakkimizda/; }
    location = /blog.html       { return 301 /blog/; }
    location = /iletisim.html   { return 301 /iletisim/; }
    location ~ ^/blog/([a-z0-9-]+)\.html$ { return 301 /blog/$1/; }

    # HTML: her istekte doğrula
    location / {
        add_header Cache-Control "no-cache";
        add_header X-Content-Type-Options "nosniff";
        add_header Referrer-Policy "strict-origin-when-cross-origin";
        try_files $uri $uri/ =404;
    }
    error_page 404 /404.html;
}
```

Notlar:

- nginx'teki `return 301` satırları, build'in ürettiği `dist/hizmetler.html/index.html` gibi meta-refresh sayfalarından önce çalışır; o dosyalar yalnızca yönlendirme kuralı olmayan sunucular için yedektir.
- Cloudflare'de "Rocket Loader", "Email Obfuscation" ve otomatik script ekleyen özellikler kapalı kalsın; sayfalara JS ekler ve 5 KB sınırını bozar.
- Cloudflare önbelleği HTML'i varsayılan olarak saklamaz. Saklatmak isterseniz bir Cache Rule ile `Edge TTL` verin ve her yayından sonra önbelleği temizleyin.

## Medya ve font güncelleme

- `npm run media [klasör]`: hazır görselleri/videoları projeye alır, hero kırpımını, OG görselini ve apple-touch-icon'u yeniden üretir.
- `npm run fonts`: Archivo alt kümelerini `src/assets/fonts/` altına yeniden üretir. Yeni bir özel karakter gerekirse `scripts/build-fonts.mjs` içindeki `CORE` dizisine ve `astro.config.mjs` içindeki `unicodeRange` listesine eklenir.

## Site sahibinin tamamlayacakları

- `src/config.ts` içindeki `FORM_ACTION` boş. Boşken form içeriği WhatsApp mesajına çevrilir. Bir form servisi adresi yazılırsa form oraya POST eder.
- `src/pages/kvkk.astro` hukuki inceleme görmemiş bir taslaktır.

## Cloudflare (bağlanınca yapılacak ayarlar)

Dosya tarafı hazır: `public/_headers` (önbellek, HSTS, güvenlik başlıkları) ve `public/_redirects` (eski .html adresleri). Panelde:

- **Speed > Optimization:** Brotli açık (varsayılan), Early Hints açık, HTTP/3 açık, 0-RTT açık.
- **Kapalı kalacaklar:** Rocket Loader, Email Obfuscation, Auto Minify (Astro zaten küçültüyor), Mirage, Zaraz, Web Analytics'in otomatik betiği. Hepsi sayfaya JS ekler ve 6 KB sınırını bozar.
- **SSL/TLS:** Full (strict), Always Use HTTPS açık, Automatic HTTPS Rewrites açık, en düşük TLS 1.2.
- **www yönlendirmesi:** `necipbozdemir.com/*` -> `https://www.necipbozdemir.com/$1` (301, Redirect Rule). Site adresi `www` ile.
- **Cache Rules:** `/_astro/*` ve `/media/*` için Edge TTL 1 yıl (dosya adları içerik özetli, değişmez). HTML için Edge TTL verilecekse her yayından sonra "Purge Everything".
- **Dil:** Otomatik dil yönlendirmesi YOK. Google ve Yandex hreflang ile doğru dili gösteriyor; IP'ye göre yönlendirme botların diğer dilleri görmesini engeller.
- **Bot Fight Mode:** kapalı ya da "verified bots" serbest. Googlebot, YandexBot ve Bingbot engellenmemeli.
- **Yandex:** Yandex Webmaster'a site eklenip `sitemap-index.xml` gönderilmeli (Rusça aramaların önemli kısmı Yandex'ten).
