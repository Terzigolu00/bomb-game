# 💣 Bomba Etkisizleştirme Oyunu

Basit ama heyecan verici bir geri sayım oyunu! Zamanla yarışın ve bombayı etkisiz hale getirin.

## 🎮 Oyun Hakkında

Bu oyun, kullanıcının belirlediği süre içinde bir bombanın etkisiz hale getirilmesini simüle eden web tabanlı bir geri sayım oyunudur. Oyuncular:
- Geri sayım süresini belirleyebilir
- Sayacı başlatıp durdurabilir
- Sayacı sıfırlayabilir
- Bombayı zamanında etkisiz hale getirebilir

## 🚀 Özellikler

- **⏱️ Özelleştirilebilir Geri Sayım**: İstediğiniz saniye cinsinden süre belirleyin
- **🎵 Ses Efektleri**: Patlama anında gerçekçi ses efekti
- **⏸️ Duraklatma/Devam**: Oyunu istediğiniz zaman duraklatın veya devam ettirin
- **🔄 Reset**: Oyunu baştan başlatın
- **💣 Etkisizleştirme**: Zamanında bombayı etkisiz hale getirin
- **📱 Responsive Tasarım**: Tüm cihazlarda çalışır

## 🎯 Nasıl Oynanır

1. **Süre Belirleme**: "Kaç saniye olsun?" kutusuna istediğiniz süreyi girin (varsayılan: 10 saniye)
2. **Başlatma**: "Başlat" butonuna basarak geri sayımı başlatın
3. **Etkisizleştirme**: Süre dolmadan "Defuse" butonuna basarak bombayı etkisiz hale getirin
4. **Diğer Kontroller**:
   - **Durdur**: Geri sayımı duraklatır/devam ettirir
   - **Reset**: Oyunu baştan başlatır

## 🏆 Oyun Senaryoları

- **🎉 Başarı**: Bomba zamanında etkisiz hale getirilirse "Kurtuldun!" mesajı
- **💥 Patlama**: Süre dolarsa bomba patlar ve ses efekti çalar
- **⚠️ Geç Kalma**: Bomba patladıktan sonra etkisizleştirme butonu "Geç kaldın..." mesajı verir

## 🛠️ Teknik Detaylar

### Dosya Yapısı
```
bomb-game/
├── index.html          # Ana HTML dosyası
├── sayac.js            # JavaScript oyun mantığı
└── README.md           # Bu dosya
```

### Kullanılan Teknolojiler
- **HTML5**: Yapısal markup
- **JavaScript (ES6)**: Oyun mantığı ve etkileşimler
- **Web Audio API**: Ses efektleri için
- **CSS**: Basit stil (inline)

### Ana Fonksiyonlar
- `baslat()`: Geri sayımı başlatır
- `Durdur()`: Duraklatma/devam ettirme toggle
- `Reset()`: Oyunu sıfırlar ve yeniden başlatır
- `Defuse()`: Bombayı etkisiz hale getirir
- `patlamaBeep()`: Patlama ses efekti

## 🚀 Kurulum ve Çalıştırma

1. Projeyi bilgisayarınıza indirin:
```bash
git clone [repo-url]
cd bomb-game
```

2. `index.html` dosyasını web tarayıcınızda açın:
   - Dosyaya çift tıklayın, ya da
   - Tarayıcınızda "Dosya > Aç" seçeneğini kullanın

3. Oyunu oynamaya başlayın!

## 🎮 Oyun İpuçları

- Kısa süreler (3-5 saniye) daha heyecanlı bir deneyim sunar
- Duraklatma özelliğini strateji için kullanabilirsiniz
- Ses açık olduğundan emin olun - patlama efekti gerçekçi!

## 🔧 Geliştirme

Projeye katkıda bulunmak isterseniz:
1. Fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## 📝 Gelecek Özellikler

- [ ] Farklı zorluk seviyeleri
- [ ] Skor sistemi
- [ ] Çoklu bomba modu
- [ ] Görsel efektler
- [ ] Tema seçenekleri
- [ ] Mobil dokunmatik kontroller

## 📄 Lisans

Bu proje açık kaynak kodludur ve MIT lisansı altında dağıtılmaktadır.

---

🎯 **İyi eğlenceler ve dikkatli olun - bomba gerçek değil ama heyecan gerçek!** 💣💥