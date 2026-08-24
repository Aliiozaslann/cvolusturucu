# CVYAP Tek Menü ve Google Görünürlüğü Handoff

## Yapılan düzeltme

Ekrandaki iki ayrı yatay menü kaldırıldı. `index.html`, `about.html`, `sss.html`, `sablonlar.html` ve `kariyer-rehberi.html` dosyalarının her birinde yalnızca bir adet `.site-header` bulunuyor. Header içinde tek bir CVYAP metin logosu var; daha önce metnin yanında görünen tekrar eden kare logo görseli header'dan çıkarıldı.

Favicon, `logo.png`, web manifest ve yapılandırılmış veri içindeki logo korunuyor. Bunlar tarayıcı sekmesi, sosyal paylaşım ve Google marka sinyalleri içindir; web sayfasındaki header'ın yanında ikinci bir logo olarak gösterilmez.

## Beş site bölümü

Tek üst menü şu beş crawlable HTML bağlantısını içerir:

| Menü | Hedef |
|---|---|
| CV Şablonları | `sablonlar.html` |
| CV Oluştur | `index.html#editorWorkspace` |
| Kariyer Rehberi | `kariyer-rehberi.html` |
| Hakkında | `about.html` |
| SSS | `sss.html` |

`CV Oluştur` bağlantısı taranabilir bir `<a href>` olarak bırakıldı ve JavaScript ile mevcut 8 adımlı editörü açıyor. `?template=...` bağlantıları da korunarak şablon seçimleri doğrudan editöre taşınıyor.

## Google görünürlüğü

Ana sayfada WebSite adı `CVYAP` olarak tekilleştirildi; `CV Yap`, `CV Hazırla` ve `CV Oluşturucu` alternatif adlar olarak bırakıldı. Yeni sayfaların benzersiz title, description, canonical, JSON-LD ve sitemap kayıtları bulunuyor. Google'ın site adını ve sitelinkleri otomatik seçtiği unutulmamalıdır; belirli 4–5 bağlantı zorla gösterilemez. Ancak açıklayıcı dahili bağlantılar, benzersiz sayfalar ve sitemap ile keşif sinyalleri güçlendirilmiştir.

Yayın sonrası `https://cvyap.tr/` ve yeni sayfalar için Google Search Console URL Denetleme aracından yeniden dizine ekleme isteği gönderilmelidir.

## Doğrulama

Teknik doğrulama başarılıdır: her sayfada tek header, text-only logo, beş HTML menü bağlantısı, CVYAP WebSite + Organization JSON-LD, yeni sayfaların sitemap kayıtları ve JavaScript sözdizimi kontrol edildi. 1440px masaüstü ve 390px mobil render'larında yalnızca tek menü görünür; mobilde beş bağlantı aynı header içindeki yatay kaydırılabilir nav içinde kalır.

## References

[1]: https://developers.google.com/search/docs/appearance/site-names "Google Search Central — Site names"
[2]: https://developers.google.com/search/docs/crawling-indexing/links-crawlable "Google Search Central — SEO link best practices"
