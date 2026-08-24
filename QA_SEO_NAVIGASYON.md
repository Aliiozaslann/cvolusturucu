# CVYAP SEO ve Navigasyon QA

## Ana sayfa kontrolü

Yerel tarayıcıda `index.html` açıldı. Sayfa başlığı `CVYAP | Ücretsiz ve ATS Uyumlu Profesyonel CV Hazırlama Aracı` olarak göründü. Header içinde yalnızca CVYAP metin markası render edildi; `logo.png` header yanında ikinci bir görsel olarak kullanılmıyor. Eski ikinci `quick-tabs` şeridi görünmüyor.

## Editör akışı kontrolü

Ana sayfanın içerik bölümündeki büyük `Hemen CV Oluştur` CTA'sı korunuyor. Bu buton `editorWorkspace` bölümünü açmaya devam ediyor. Sekiz adımlı form, sekiz farklı şablon seçimi ve PDF İndir akışı korunmuştur.

## Teknik kontroller

`validate_single_nav.py` sonucu başarılıdır: her indexable sayfada tek `site-header`, text-only CVYAP logosu, dört crawlable üst navigasyon bağlantısı, WebSite + Organization JSON-LD ve sitemap bağlantıları bulunuyor. `node --check app.js` başarılıdır. `sitemap.xml` XML ayrıştırma kontrolü başarılıdır.

## Tek header ve dört üst bağlantı

`index.html`, `sablonlar.html`, `kariyer-rehberi.html`, `about.html` ve `sss.html` sayfalarında aynı sade header kullanılıyor. Üst menüde yalnızca şu dört bağlantı bulunuyor: `CV Şablonları`, `Kariyer Rehberi`, `Hakkında` ve `SSS`.

## Alt sayfa CTA temizliği

Yerel tarayıcı kontrolleriyle `sablonlar.html` ve `kariyer-rehberi.html` açıldı. Her iki sayfada da `CV Oluştur`, `Ücretsiz CV Oluştur` veya `Rehberden sonra CV oluştur` adlı CTA görünmüyor. CV Şablonları sayfasındaki sekiz işlevsel kart bağlantısı `Şablonu kullan` olarak korunmuştur; bunlar seçilen şablonu ana editörde açar. Hakkında ve SSS sayfalarında da ayrıca bir CV oluşturma butonu bulunmuyor.

## Responsive görsel kontrolü

Masaüstü render'da yalnızca tek üst header göründü: solda tek CVYAP metin logosu, sağda dört site bağlantısı. 390px mobil render'da logo üstte tek kez göründü; dört bağlantı aynı header içindeki yatay kaydırılabilir navigasyonda kaldı. Menü ikinci bir bağımsız bar oluşturmadı ve içerikle çakışmadı.

## PDF bundle kontrolü

Yerel `html2pdf.bundle.min.js` dosyası korunmuştur. Temiz sayfa yüklemesinden sonra PDF kütüphanesi yüklenebiliyor ve A4 tek sayfa PDF çıktısı önceki QA testinde doğrulanmıştır.

## Hakkında ve SSS kontrolü

`about.html` ve `sss.html` sayfaları da yerel tarayıcıda açıldı. Her iki sayfada yalnızca tek header ve aynı dört üst bağlantı görünüyor; ayrıca bir `CV Oluştur` butonu render edilmiyor. SSS içindeki bilgilendirici soru metinlerinde geçen "CV oluşturabilir miyim?" ifadesi korunmuştur.
