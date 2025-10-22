// 1️⃣ Global değişkenler
let sayac = 10;        // Geri sayım süresi (saniye)
let intervalID = null;  // Interval'ı başlat/durdurmak için
let patladiMi = false;
let isPaused = false;   // Sayaç duraklatıldı mı?
let isStarted = false;  // Sayaç hiç başlatıldı mı?

// Milisaniye tabanlı zaman takip değişkenleri (anlık devam için)
let remainingMs = sayac * 1000; // Kalan süre (ms)
let lastTick = null;            // Son güncelleme zamanı

function patlamaBeep() {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const o = context.createOscillator();
    const g = context.createGain();

    // Use low frequency for "boom" effect
    o.type = "sine";
    o.frequency.setValueAtTime(100, context.currentTime); // low frequency
    o.connect(g);
    g.connect(context.destination);

    // Make the volume start loud and fade out quickly
    g.gain.setValueAtTime(1, context.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.5); // 0.5s fade

    o.start();
    o.stop(context.currentTime + 0.5); // stop after 0.5s
}

// 2️⃣ Başlangıç mesajı
document.getElementById("sonuc").textContent = "Sayaç hazır,  için  butonuna bas.";

// Tek adımlık geri sayım ilerletici (delta-zaman ile)
function tick() {
    const now = performance.now();
    const delta = now - lastTick; // geçen süre (ms)
    lastTick = now;

    remainingMs -= delta;
    if (remainingMs < 0) remainingMs = 0;

    // Görüntülenecek saniyeyi yukarı yuvarla (0'a yaklaşırken daha doğru görünüm)
    sayac = Math.ceil(remainingMs / 1000);
    document.getElementById("sonuc").textContent = `Kalan Süre: ${sayac}`;

    if (remainingMs <= 0) {
        clearInterval(intervalID);
        intervalID = null;
        patladiMi = true;
        patlamaBeep();
        document.getElementById("sonuc").textContent = "💥 Patlama!";
    }
}

// 3️⃣ Başlat (ilk başlat veya devam et)
function baslat() {
    // Zaten çalışıyorsa tekrar kurma
    if (intervalID !== null) return;

    // İlk kez başlatılıyorsa input değerini oku ve kalan süreyi ayarla
    if (!isStarted) {
        const inputValue = document.getElementById("isimInput").value;
        const inputNumber = Number(inputValue);
        if (!Number.isNaN(inputNumber) && inputNumber > 0) {
            sayac = inputNumber;
        } else {
            sayac = 10;
        }
        remainingMs = sayac * 1000; // başlangıç süresini (ms) ayarla
        patladiMi = false;
        isStarted = true;
        isPaused = false;
        document.getElementById("sonuc").textContent = `Sayaç başladı: ${sayac}`;
    } else {
        // Devam etme (paused -> running)
        isPaused = false;
        document.getElementById("sonuc").textContent = `Devam ediyor: ${Math.ceil(remainingMs/1000)}`;
    }

    // Anlık çalışmaya başlasın diye zaman damgasını şimdiye çek ve sık aralıklı interval başlat
    lastTick = performance.now();
    // 50ms'de bir güncelleme: anlık his + düşük CPU maliyeti
    intervalID = setInterval(tick, 50);
}

// 4️⃣ Durdur (yalnızca duraklatır, devam için baslat() kullanılır)
function Durdur() {
    if (intervalID !== null) {
        clearInterval(intervalID);
        intervalID = null;
        isPaused = true;
        document.getElementById("sonuc").textContent = `durduruldu ⛔ (Kalan: ${Math.ceil(remainingMs/10)})`;
    }
}

// 5️⃣ Reset fonksiyonu
function Reset() {
    if (intervalID !== null) {
        clearInterval(intervalID);
        intervalID = null;
    }

    // Varsayılanı veya input değerini başlangıç süresi olarak al
    const inputValue = document.getElementById("isimInput").value;
    const inputNumber = Number(inputValue);
    sayac = (!Number.isNaN(inputNumber) && inputNumber > 0) ? inputNumber : 10;
    remainingMs = sayac * 1000;

    patladiMi = false;
    isPaused = false;
    isStarted = false;

    document.getElementById("sonuc").textContent = `Sayaç sıfırlandı: ${sayac}. Başlatmak için 'Başlat' butonuna bas.`;

    // Otomatik başlatma kaldırıldı
}

function Defuse() {
    if (patladiMi) {
        document.getElementById("sonuc").textContent = "Geç kaldın... 💣";
    } else if (remainingMs > 0) {
        if (intervalID !== null) {
            clearInterval(intervalID);
            intervalID = null;
        }
        patladiMi = true;
        document.getElementById("sonuc").textContent = "🎉 Kurtuldun! 🎉";
    }
}