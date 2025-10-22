// 1️⃣ Global değişkenler
let sayac = 10;        // Geri sayım süresi (saniye)
let intervalID = null;  // Interval'ı başlat/durdurmak için
let patladiMi = false;
let isPaused = false;   // Sayaç duraklatıldı mı?
let isStarted = false;  // Sayaç hiç başlatıldı mı?

// Milisaniye tabanlı zaman takip değişkenleri (anlık devam için)
let remainingMs = sayac * 1000; // Kalan süre (ms)
let lastTick = null;            // Son güncelleme zamanı
let totalMsForRun = remainingMs; // Bu koşu için toplam süre (progress bar için)

// Skor
let skor = Number(localStorage.getItem("skor")) || 0;

// Hız çarpanı (zaman akışını hızlandırmak/yavaşlatmak için)
let speedFactor = 1.0; // 1x (min: 1, max: 3)

function updateScoreUI() {
    const el = document.getElementById("skor");
    if (el) el.textContent = `Skor: ${skor}`;
}

function updateSpeedUI() {
    const el = document.getElementById('speedValue');
    if (el) el.textContent = `${speedFactor.toFixed(2)}x`;
}

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

function successBeep() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(700, ctx.currentTime);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.18);
}

function updateProgressBar() {
    const bar = document.getElementById("bar");
    if (!bar) return;
    const denom = totalMsForRun || 1;
    const pct = Math.max(0, Math.min(100, (remainingMs / denom) * 100));
    bar.style.width = `${pct}%`;
}

function getDisplayMode() {
    const sel = document.getElementById('displayMode');
    return sel ? sel.value : 's';
}

function formatRemaining(ms) {
    const mode = getDisplayMode();
    const clamped = Math.max(0, ms);
    if (mode === 'cs') {
        return (clamped / 1000).toFixed(2); // salise: ss.ss
    }
    return Math.ceil(clamped / 1000); // saniye: tam sayı
}

// 2️⃣ Başlangıç mesajı
document.getElementById("sonuc").textContent = "Sayaç hazır, başlamak için Başlat butonuna bas.";
updateScoreUI();
updateProgressBar();

// Tek adımlık geri sayım ilerletici (delta-zaman ile)
function tick() {
    const now = performance.now();
    const delta = now - lastTick; // geçen süre (ms)
    lastTick = now;

    // Hız çarpanı uygulaması
    remainingMs -= delta * speedFactor;
    if (remainingMs < 0) remainingMs = 0;

    // Görüntülenecek saniyeyi ayrıca sürdür (bazı yerlerde kullanılıyor)
    sayac = Math.ceil(remainingMs / 1000);
    document.getElementById("sonuc").textContent = `Kalan Süre: ${formatRemaining(remainingMs)}`;

    updateProgressBar();

    if (remainingMs <= 0) {
        clearInterval(intervalID);
        intervalID = null;
        patladiMi = true;
        patlamaBeep();
        document.getElementById("sonuc").textContent = "💥 Patlama!";
        document.body.classList.add("shake");
        setTimeout(() => document.body.classList.remove("shake"), 500);
    }
}

// 3️⃣ Başlat (her zaman baştan başlatır)
function baslat() {
    // Çalışıyorsa durdur ve yeniden başlat
    if (intervalID !== null) {
        clearInterval(intervalID);
        intervalID = null;
    }

    const inputValue = document.getElementById("isimInput").value;
    const inputNumber = Number(inputValue);
    sayac = (!Number.isNaN(inputNumber) && inputNumber > 0) ? inputNumber : 10;

    remainingMs = sayac * 1000;
    totalMsForRun = remainingMs;
    patladiMi = false;
    isPaused = false;
    isStarted = true;

    document.getElementById("sonuc").textContent = `Sayaç başladı: ${formatRemaining(remainingMs)}`;
    updateProgressBar();

    lastTick = performance.now();
    intervalID = setInterval(tick, 50);
}

// 4️⃣ Durdur (yalnızca duraklatır, devam için baslat() kullanılır)
function Durdur() {
    if (intervalID !== null) {
        clearInterval(intervalID);
        intervalID = null;
        isPaused = true;
        document.getElementById("sonuc").textContent = `Sayaç durduruldu ⛔ (Kalan: ${formatRemaining(remainingMs)})`;
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
    totalMsForRun = remainingMs; // progress bar'ı tam dolu yap

    patladiMi = false;
    isPaused = false;
    isStarted = false;

    document.getElementById("sonuc").textContent = `Sayaç sıfırlandı: ${sayac}. Başlatmak için 'Başlat' butonuna bas.`;
    updateProgressBar();
}

function getSuccessWindowMs() {
    const minEl = document.getElementById("windowMin");
    const maxEl = document.getElementById("windowMax");
    let minSec = parseFloat(minEl ? minEl.value : "0");
    let maxSec = parseFloat(maxEl ? maxEl.value : "0");

    if (!Number.isFinite(minSec) || minSec < 0) minSec = 0;
    if (!Number.isFinite(maxSec) || maxSec < 0) maxSec = 0;
    if (maxSec < minSec) {
        const t = minSec; minSec = maxSec; maxSec = t;
    }
    return { minMs: minSec * 1000, maxMs: maxSec * 1000 };
}

function Defuse() {
    if (patladiMi) {
        document.getElementById("sonuc").textContent = "Tur zaten bitti.";
        return;
    }

    if (remainingMs <= 0) {
        document.getElementById("sonuc").textContent = "Geç kaldın... 💣";
        return;
    }

    const { minMs, maxMs } = getSuccessWindowMs();

    // Kalan süre başarı penceresinin içinde mi?
    if (remainingMs >= minMs && remainingMs <= maxMs) {
        // Başarılı defuse
        if (intervalID !== null) {
            clearInterval(intervalID);
            intervalID = null;
        }
        patladiMi = true;

        skor += 10; // her kurtuluşta +10 puan
        localStorage.setItem("skor", skor);
        updateScoreUI();
        successBeep();

        document.getElementById("sonuc").textContent = `🎉 Son anda kurtuldun! 🎉 Skor: ${skor}`;
        // Başarılı defuse sonrası: sayaçı sıfırla ve başlatılmayı bekle
        Reset();
        return;
    }

    // Pencere dışında: başarısız (erken ya da geç)
    if (intervalID !== null) {
        clearInterval(intervalID);
        intervalID = null;
    }
    patladiMi = true;

    const rem = (remainingMs / 1000).toFixed(2);
    const reason = remainingMs > maxMs ? "Erken bastın" : "Pencereyi kaçırdın";
    document.getElementById("sonuc").textContent = `❌ ${reason}. (Kalan: ${rem}s)`;
    updateProgressBar();
}

function skorSifirla() {
    localStorage.removeItem("skor");
    skor = 0;
    updateScoreUI();
    document.getElementById("sonuc").textContent = "Skor sıfırlandı.";
}

function zorlukSec(seviye) {
    if (intervalID !== null) return; // çalışırken değiştirme
    let ms = remainingMs;
    if (seviye === "kolay") ms = 15000;
    if (seviye === "orta") ms = 10000;
    if (seviye === "zor") ms = 5000;

    remainingMs = ms;
    sayac = Math.ceil(ms / 1000);
    totalMsForRun = ms;
    isStarted = false; // yeni koşu gibi davran
    patladiMi = false;

    updateProgressBar();
    document.getElementById("sonuc").textContent = `${seviye.toUpperCase()} mod seçildi! (${sayac} sn)`;
}

function toggleTheme() {
    document.body.classList.toggle("light");
}

// Klavye kısayolları: Enter = Başlat, Space = Defuse
(function registerHotkeys(){
    document.addEventListener('keydown', (e) => {
        const t = e.target && e.target.tagName ? e.target.tagName.toLowerCase() : '';
        if (t === 'input' || t === 'textarea' || t === 'select') return;
        if (e.metaKey || e.ctrlKey || e.altKey) return;

        if (e.key === 'Enter') {
            e.preventDefault();
            baslat();
        } else if (e.key === ' ' || e.key === 'Spacebar' || e.code === 'Space') {
            e.preventDefault();
            Defuse();
        }
    });
})();

// Görüntü modu değiştiğinde anında yeniden çiz
(function registerDisplayModeWatcher(){
    const sel = document.getElementById('displayMode');
    if (!sel) return;
    sel.addEventListener('change', () => {
        // Koşu durumu ne olursa olsun ekranda kalan süreyi yeni formatla göster
        const s = document.getElementById('sonuc');
        if (!s) return;
        if (intervalID !== null || isStarted || isPaused) {
            s.textContent = `Kalan Süre: ${formatRemaining(remainingMs)}`;
        }
    });
})();

// Segmented control (Saniye/Salise) ile select’i senkronla
(function registerSegmentedControl(){
    const group = document.getElementById('displayModeGroup');
    const sel = document.getElementById('displayMode');
    if (!group || !sel) return;

    const updateActive = (mode) => {
        group.querySelectorAll('.seg-btn').forEach(btn => {
            const active = btn.dataset.mode === mode;
            btn.classList.toggle('active', active);
            btn.setAttribute('aria-selected', active ? 'true' : 'false');
            btn.setAttribute('tabindex', active ? '0' : '-1');
        });
    };

    group.addEventListener('click', (e) => {
        const btn = e.target.closest('.seg-btn');
        if (!btn) return;
        const mode = btn.dataset.mode;
        if (!mode) return;
        sel.value = mode;
        updateActive(mode);
        sel.dispatchEvent(new Event('change', { bubbles: true }));
    });

    // Klavye ile (sol/sağ) seçim
    group.addEventListener('keydown', (e) => {
        const buttons = Array.from(group.querySelectorAll('.seg-btn'));
        const current = buttons.findIndex(b => b.classList.contains('active'));
        let next = current;
        if (e.key === 'ArrowRight') next = (current + 1) % buttons.length;
        else if (e.key === 'ArrowLeft') next = (current - 1 + buttons.length) % buttons.length;
        else return;
        e.preventDefault();
        buttons[next].click();
        buttons[next].focus();
    });

    // Başlangıç durumu
    updateActive(sel.value || 's');
})();

// Hız çubuğunu izle
(function registerSpeedControl(){
    const range = document.getElementById('speedRange');
    if (!range) return;
    const v = parseFloat(range.value);
    speedFactor = Number.isFinite(v) ? Math.max(1, Math.min(3, v)) : 1.0;
    updateSpeedUI();
    range.addEventListener('input', () => {
        const val = parseFloat(range.value);
        speedFactor = Number.isFinite(val) ? Math.max(1, Math.min(3, val)) : 1.0;
        updateSpeedUI();
    });
})();