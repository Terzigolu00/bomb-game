# 💣 Bomb Game — Geri Sayım ve Defuse Oyunu

Basit ama akıcı bir geri sayım oyunu. Zamanlamayı mükemmel ayarlayıp tam pencerede “Defuse” yap, puan topla!

## Özellikler
- Anlık sayaç: 50ms tick + delta-time ile gecikmesiz akış
- Başlat/Durdur: Başlat her zaman sıfırdan başlatır; Durdur yalnızca duraklatır
- Reset: Sadece sıfırlar, otomatik başlatmaz
- Defuse başarı penceresi: Kullanıcı iki inputla (min–max sn) aralığı belirler; kalan süre bu aralıktaysa başarılı
- Skor sistemi: localStorage ile kalıcı, Skoru Sıfırla butonu
- Zorluklar: Kolay (15s) / Orta (10s) / Zor (5s)
- Hız çarpanı: Slider ile 1.00x–3.00x arası (0.25 adım) hızlandırma
- Görünüm modu: Saniye (tam) veya Salise (ss.ss) şeklinde gösterim (segmented kontrol)
- İlerleme çubuğu: Kalan süreyi görsel olarak gösterir
- Kısayollar: Enter → Başlat (sıfırdan), Space → Defuse
- Sesler: Patlama ve başarı beep
- Efekt: Patlama anında kısa “shake” animasyonu
- Tema: Light/Dark toggle
- Düzenli UI: “Kontroller” ve “Zorluk” panelleri, büyük skor yazısı

## Nasıl Oynanır
1) Süreyi gir (örn. 10)
2) Başarı aralığını ayarla (örn. 0.10–0.40 sn)
3) İstersen zorluk ve hız çarpanını seç
4) Görünümü Saniye veya Salise olarak ayarla
5) Başlat’a bas (veya Enter). Doğru pencerede Space ile Defuse yap

- Başarılı Defuse: +10 puan; oyun otomatik Reset olur ve yeniden başlatılmayı bekler
- Erken ya da pencere dışı: Başarısız mesajı

## Kurulum ve Çalıştırma
- Gereksinim: Sadece modern bir tarayıcı
- Çalıştırma: index.html dosyasını çift tıklayarak açın (veya tarayıcıdan Dosya > Aç)

## Kısayollar
- Enter: Başlat (her zaman baştan)
- Space: Defuse denemesi

## Dosya Yapısı
- index.html — Arayüz, paneller, kontrol elemanları
- counter.js — Oyun mantığı, zaman motoru, skor, kısayollar, hız, pencere kontrolü
- style.css — Tema, düzen, buton/segmented/slider stilleri
- README.md — Bu dosya

## Teknik Notlar
- Zaman motoru: performance.now() ile delta hesaplanır; remainingMs -= delta * speedFactor
- İlerleme çubuğu: totalMsForRun referansı ile yüzdesel genişlik hesaplanır
- Başarı penceresi: windowMin/windowMax (saniye) → ms’e çevrilir; inclusive aralık kontrolü
- Skor: localStorage ("skor")
- Erişilebilirlik: Segmented kontrol butonları klavye (←/→) ve aria-selected ile uyumlu
- Input ergonomisi: Number input spinner’ları gizli; appearance: textfield kullanılır

## Özelleştirme
- Varsayılan süre: index.html’deki süre input değeri; boşsa 10s
- Zorluk süreleri: counter.js içindeki zorlukSec fonksiyonu
- Hız aralığı/adımı: index.html’de speedRange (min=1, max=3, step=0.25)
- Başarı penceresi varsayılanı: index.html’de windowMin=0.10, windowMax=0.40
- Renk/tema: style.css içindeki :root değişkenleri ve buton varyantları

## Yayınlama (GitHub Pages)
1) Kodu bir GitHub deposuna gönderin
2) Settings → Pages → Branch: main (root) → Save
3) Adresten yayına erişin (örn. https://kullanici.github.io/bomb-game/)

İyi eğlenceler! 🎯💥