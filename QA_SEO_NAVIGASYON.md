# CVYAP SEO ve Navigasyon QA

## Ana sayfa kontrolü

Yerel tarayıcıda `index.html` açıldı. Sayfa başlığı `CVYAP | Ücretsiz ve ATS Uyumlu Profesyonel CV Hazırlama Aracı` olarak göründü. Header içinde gerçek `logo.png?v=2063` görseli ve CVYAP metin markası render edildi. Header'ın altında CV Şablonları, CV Oluştur, Hakkında, SSS ve İletişim sekmelerinden oluşan görünür hızlı menü render edildi.

## Editör akışı kontrolü

Görünür hızlı menüdeki `CV Oluştur` butonuna tıklanınca mevcut `editorWorkspace` açıldı. 8 adımlı form, şablon seçimi ve PDF İndir butonu görünür kaldı; landing sayfasının mevcut çalışma akışı bozulmadı.

## Teknik kontroller

`validate_seo_navigation.py` sonucu: homepage title/logo, görünür hedefli sekmeler, WebSite + Organization JSON-LD, JavaScript quick-start hook'u, favicon, web manifest, robots.txt ve sitemap.xml başarılı.

## PDF bundle clean-reload kontrolü

Temiz sayfa yüklemesinden sonra `typeof window.html2pdf` sonucu `function` oldu. Bu nedenle yerel `html2pdf.bundle.min.js` dosyası mevcut PDF handler tarafından yüklenebiliyor.
