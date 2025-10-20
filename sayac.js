// 1️⃣ Global değişkenler
let sayac = 10;        // Geri sayım süresi
let intervalID = null;  // Interval'ı başlat/durdurmak için global değişken
let patladiMi = false;
let isPaused = false;   // Sayaç duraklatıldı mı?
let isStarted = false;  // Sayaç ilk kez başlatıldı mı?

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
document.getElementById("sonuc").textContent = "Sayaç hazır, başlamak için Başlat butonuna bas.";

// 3️⃣ Başlat fonksiyonu
function baslat() {
    // Eğer zaten interval çalışıyorsa tekrar başlatma
    if (intervalID !== null) return;

    // Eğer sayaç daha önce başlatılmamışsa input ile güncelle
    if (!isStarted) {
        let inputValue = document.getElementById("isimInput").value;
        if (inputValue !== "") {
            sayac = Number(inputValue);
            patladiMi = false;
        } else if (sayac <= 0) {
            sayac = 10;
            patladiMi = false;
        }
        isStarted = true;
    }

    document.getElementById("sonuc").textContent = `Sayaç başladı: ${sayac}`;

    intervalID = setInterval(() => {
        sayac--;
        document.getElementById("sonuc").textContent = `Kalan Süre: ${sayac}`;

        if (sayac <= 0) {
            clearInterval(intervalID);
            intervalID = null;
            patladiMi = true;
            patladiMi = true;
            patlamaBeep();
            document.getElementById("sonuc").textContent = "💥 Patlama!";
        }
    }, 1000);
}

// 4️⃣ Durdur/Devam Et toggle fonksiyonu
function Durdur() {
    const button = document.querySelector("button[onclick='Durdur()']");
    if (!isPaused && intervalID !== null) {
        // Duraklat
        clearInterval(intervalID);
        intervalID = null;
        isPaused = true;
        if (button) button.textContent = "Devam Et";
        document.getElementById("sonuc").textContent = `Sayaç durduruldu ⛔ (Kalan: ${sayac})`;
    } else if (isPaused) {
        // Devam et
        isPaused = false;
        if (button) button.textContent = "Durdur";
        baslat(); // kaldığı yerden devam et
    }
}

// 5️⃣ Reset fonksiyonu
function Reset() {
    if (intervalID !== null) {
        clearInterval(intervalID);
        intervalID = null;
    }
    sayac = 10;
    patladiMi = false; // reset bomb status
    isStarted = false; // reset start status
    document.getElementById("sonuc").textContent = `Sayaç sıfırlandı: ${sayac}`;

    // otomatik olarak tekrar başlat
    baslat();
}

function Defuse() {
    if (patladiMi) {
        document.getElementById("sonuc").textContent = "Geç kaldın... 💣";
    } else if (intervalID !== null && sayac > 0) {
        clearInterval(intervalID);
        intervalID = null;
        patladiMi = true;
        document.getElementById("sonuc").textContent = "🎉 Kurtuldun! 🎉";
    }
}