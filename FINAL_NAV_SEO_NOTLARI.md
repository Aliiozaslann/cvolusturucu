# CVYAP Tek Menü ve Google Görünürlüğü Handoff

## Son header düzeni

Logo ile aynı hizada duran üst `CV Oluştur` butonu kaldırıldı. Sayfanın üstünde artık yalnızca tek bir header ve tek bir navigasyon satırı bulunuyor. Header içinde tekrar eden kare logo görseli de kaldırıldı; tek görünen marka alanı `CVYAP` metin logosudur. Favicon, sosyal paylaşım görseli ve JSON-LD içindeki logo dosyası korunmuştur; bunlar sayfa header'ının yanında ikinci bir logo olarak gösterilmez.

Hero bölümündeki büyük `Hemen CV Oluştur` butonu korunuyor. Bu nedenle ziyaretçi CV oluşturma işlevine ulaşmaya devam ediyor.

## Dört görünür üst sekme

| Menü | Hedef |
|---|---|
| CV Şablonları | `sablonlar.html` |
| Kariyer Rehberi | `kariyer-rehberi.html` |
| Hakkında | `about.html` |
| SSS | `sss.html` |

Bu dört bağlantı standart HTML `<a href="...">` olarak bırakıldı. Böylece kullanıcı menüsü sade kaldı ve Google'ın keşfedebileceği gerçek iç bağlantılar korunmuş oldu. İletişim bağlantısı footer içinde tutuluyor.

## Google görünürlüğü

Ana sayfada WebSite adı `CVYAP` olarak tekilleştirildi; `CV Yap`, `CV Hazırla` ve `CV Oluşturucu` alternatif adlar olarak bırakıldı. `sablonlar.html` ve `kariyer-rehberi.html` benzersiz title, description, canonical ve JSON-LD bilgileriyle eklendi. Bu sayfalar sitemap içinde de yer alıyor.

Google arama sonuçlarında hangi site adını ve hangi sitelinkleri göstereceğini otomatik seçer; belirli 4–5 bağlantı kodla zorunlu olarak gösterilemez. Site yapısı, açıklayıcı iç bağlantılar, benzersiz sayfalar, canonical ve sitemap sinyalleri Google keşfi için güçlendirilmiştir.

## Doğrulama

Teknik doğrulama başarılıdır: her indexable sayfada tek header, text-only logo ve dört üst menü bağlantısı bulunuyor. 1440px masaüstü ve 390px mobil render'larında yalnızca tek menü görünüyor. Hero içindeki büyük CV oluşturma butonu görünür ve kullanılabilir durumda.

## References

[1]: https://developers.google.com/search/docs/appearance/site-names "Google Search Central — Site names"
[2]: https://developers.google.com/search/docs/crawling-indexing/links-crawlable "Google Search Central — SEO link best practices"
