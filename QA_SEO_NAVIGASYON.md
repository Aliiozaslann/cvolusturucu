# CVYAP SEO ve Navigasyon QA

## Ana sayfa kontrolü

Yerel tarayıcıda `index.html` açıldı. Sayfa başlığı `CVYAP | Ücretsiz ve ATS Uyumlu Profesyonel CV Hazırlama Aracı` olarak göründü. Header içinde gerçek `logo.png?v=2063` görseli ve CVYAP metin markası render edildi. Header'ın altında CV Şablonları, CV Oluştur, Hakkında, SSS ve İletişim sekmelerinden oluşan görünür hızlı menü render edildi.

## Editör akışı kontrolü

Görünür hızlı menüdeki `CV Oluştur` butonuna tıklanınca mevcut `editorWorkspace` açıldı. 8 adımlı form, şablon seçimi ve PDF İndir butonu görünür kaldı; landing sayfasının mevcut çalışma akışı bozulmadı.

## Teknik kontroller

`validate_seo_navigation.py` sonucu: homepage title/logo, görünür hedefli sekmeler, WebSite + Organization JSON-LD, JavaScript quick-start hook'u, favicon, web manifest, robots.txt ve sitemap.xml başarılı.

## PDF bundle clean-reload kontrolü

Temiz sayfa yüklemesinden sonra `typeof window.html2pdf` sonucu `function` oldu. Bu nedenle yerel `html2pdf.bundle.min.js` dosyası mevcut PDF handler tarafından yüklenebiliyor.

## Tek menü ve yeni sayfalar doğrulaması

`index.html?navFix=2065` yerel tarayıcı testinde tek `site-header` göründü. Header logosu yalnızca CVYAP metin markası olarak render edildi; eski ikinci `quick-tabs` şeridi görünmedi. Menüde beş crawlable HTML bağlantısı bulundu: CV Şablonları, CV Oluştur, Kariyer Rehberi, Hakkında ve SSS.

`/sablonlar.html` sayfası açıldı. Benzersiz sayfa başlığı, 8 şablon açıklaması ve `index.html?template=...` formatındaki açıklayıcı dahili bağlantılar render edildi. Sayfa aynı tek header'ı kullanıyor.

`/kariyer-rehberi.html` yerel tarayıcıda benzersiz başlık ve rehber içeriğiyle açıldı; tek header ve beş sekme göründü. Bu sayfadaki `CV Oluştur` bağlantısına tıklanınca URL `index.html#editorWorkspace` oldu ve mevcut 8 adımlı CV editörü açıldı. Editör görünümünde PDF butonu ve şablon seçimi korunuyor.

## Responsive görsel kontrol

Desktop render'da yalnızca tek üst header göründü: solda tek CVYAP metin logosu, sağda beş site bağlantısı. Eski ikinci yatay bar yok.

390px mobil render'da logo üstte tek kez göründü; beş bağlantı aynı header içindeki yatay kaydırılabilir nav içinde kaldı. Menü ikinci bir bağımsız bar oluşturmadı ve hero içeriğiyle çakışmadı.
