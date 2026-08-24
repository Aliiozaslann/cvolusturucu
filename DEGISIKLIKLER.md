# CVYAP Logo, Google Görünürlüğü ve Sekme Güncellemesi

Bu sürüm doğrudan `cvhazırla` projesinin mevcut dosya yapısı üzerinden hazırlanmıştır. `index.html`, `about.html`, `sss.html`, `style.css`, `app.js`, `robots.txt` ve `sitemap.xml` korunarak güncellenmiştir.

| Dosya | Yapılan düzenleme |
|---|---|
| `index.html` | Başlık CVYAP olarak netleştirildi; PNG/ICO favicon, web manifest, Open Graph logo bilgisi ve Organization/WebSite JSON-LD eklendi. Header'daki yazı logosu gerçek `logo.png` görseliyle değiştirildi. Görünür hızlı sekmeler eklendi. |
| `about.html` | Gerçek logo, favicon/manifest yolları ve aynı hızlı sekme menüsü eklendi. |
| `sss.html` | Gerçek logo, favicon/manifest yolları ve aynı hızlı sekme menüsü eklendi. |
| `style.css` | Logo görseli, CVYAP marka metni ve mobil uyumlu sekme şeridi için stiller eklendi. |
| `app.js` | Hızlı menüdeki CV Oluştur butonu mevcut `editorWorkspace` akışına bağlandı. |
| `favicon.ico` | Mevcut `logo.png` üzerinden çok boyutlu ICO favicon üretildi. |
| `site.webmanifest` | CVYAP adı, renkleri ve logo tanımlandı. |
| `html2pdf.bundle.min.js` | Mevcut PDF indirme akışının CDN beklemesine bağlı kalmaması için yerel html2pdf 0.10.1 bundle'ı eklendi. |
| `sitemap.xml` | Ana sayfa, Hakkında ve SSS sayfalarının `lastmod` tarihi `2026-08-24` yapıldı. |
| `QA_SEO_NAVIGASYON.md` | Tarayıcı ve teknik doğrulama sonuçları kaydedildi. |

## Yayınlama

Arşivdeki dosyaları projenizin kök dizinine, klasör yollarını koruyarak kopyalayın. Özellikle `logo.png`, `favicon.ico`, `site.webmanifest`, `index.html`, `style.css`, `app.js`, `about.html`, `sss.html`, `robots.txt` ve `sitemap.xml` aynı kök dizinde bulunmalıdır.

Yayınlama sonrasında tarayıcı önbelleğini temizleyin veya dosyaların `?v=2063` sürüm parametrelerinin yüklenmesini bekleyin. Google Search Console'da `https://cvyap.tr/` adresini URL Denetleme aracından kontrol edip yeniden dizine ekleme isteği göndermeniz gerekir.

Google, favicon, site adı ve sitelink görünümünü otomatik olarak belirler. Teknik sinyaller iyileştirilmiş olsa da Google'ın belirli sitelinkleri göstermesi garanti edilemez [1] [2].

## References

[1]: https://developers.google.com/search/docs/appearance/structured-data/organization "Google Search Central — Organization structured data"
[2]: https://developers.google.com/search/docs/appearance/sitelinks "Google Search Central — Sitelinks"

## PDF dışa aktarma düzeltmesi

PDF handler güncellendi. Önceki yaklaşımın ürettiği sol üstten kırpılmış veya tamamen boş çıktı yerine, gerçek `#cvCanvas` geçici olarak viewport'un sıfır noktasına taşınıyor ve 794×1123px A4 alanı olarak yakalanıyor. Body görünürlüğü değiştirilmediği için render ağacı boşalmıyor. PDF, A4 formatında ve tek sayfa olarak oluşturuluyor; işlem sonunda önizleme stilleri eski haline geri yükleniyor.

Sekiz şablonun tamamı ardışık PDF smoke testinde başarılı oldu. `index.html` içindeki app script sürümü `app.js?v=2064` yapılarak eski handler cache'inin kullanılması önlendi.

## Tek menü ve Google için 5 bölümlü site yapısı

Önceki iki katmanlı header yapısı kaldırıldı. Ana sayfa, Hakkında ve SSS sayfalarında yalnızca tek `site-header` bırakıldı. Header içindeki tekrar eden kare logo görseli kaldırıldı; görünen marka alanı artık tek bir `CVYAP` metin logosudur. Favicon, sosyal paylaşım görseli ve JSON-LD içindeki logo dosyası korunmuştur; bunlar header'da ikinci bir görsel olarak görünmez.

Header artık beş gerçek HTML bağlantısı içerir: `CV Şablonları`, `CV Oluştur`, `Kariyer Rehberi`, `Hakkında` ve `SSS`. Yeni `sablonlar.html` ve `kariyer-rehberi.html` sayfaları benzersiz başlık, açıklama, canonical, JSON-LD ve açıklayıcı dahili bağlantılarla eklendi. Sitemap bu sayfaları da içerir.

Google belirli 4–5 sitelinki garanti etmez; Google, uygun gördüğü bağlantıları otomatik seçer. Ancak site hiyerarşisi, gerçek HTML bağlantıları, benzersiz sayfa içerikleri, canonical ve sitemap sinyalleri güçlendirilmiştir.
