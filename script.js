// 1. Matrix Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const fontSize = 16;
const columns = canvas.width / fontSize;
const rainDrops = Array.from({ length: columns }).fill(canvas.height);

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 10, 12, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#9333ea';
    ctx.font = fontSize + 'px monospace';
    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) rainDrops[i] = 0;
        rainDrops[i]++;
    }
}
setInterval(drawMatrix, 35);

// 2. Scramble Animation Function
function scrambleText(element, finalText) {
    let iteration = 0;
    const interval = setInterval(() => {
        element.innerText = finalText.split("").map((letter, index) => {
            if(index < iteration) return finalText[index];
            return alphabet[Math.floor(Math.random() * 36)];
        }).join("");
        if(iteration >= finalText.length) clearInterval(interval);
        iteration += 1/3;
    }, 30);
}

// 3. News Ticker
const breakingNews = [
    "عاجل: رصد تحركات عسكرية في شرق المتوسط.",
    "عاجل: بوادر أزمة دبلوماسية حول ملف الطاقة الدولي.",
    "عاجل: هجوم سيبراني يستهدف خوادم استراتيجية.",
    "عاجل: تقارير عن تصعيد وشيك في نقاط التماس.",
    "عاجل: إعادة تموضع استراتيجي للقوى الفاعلة ميدانياً."
];

function updateNews() {
    const ticker = document.getElementById('news-ticker');
    const news = breakingNews[Math.floor(Math.random() * breakingNews.length)];
    const el = document.createElement('div');
    el.className = 'event-item';
    ticker.prepend(el);
    scrambleText(el, news);
    if (ticker.children.length > 5) ticker.lastChild.remove();
}
setInterval(updateNews, 6000);

// 4. Analysis Logic
function analyzeIncident() {
    const out = document.getElementById('political-output');
    const lastNews = document.querySelector('.event-item')?.innerText || "لا توجد بيانات";
    showAlert("جاري معالجة الإشارات الميدانية...");
    out.innerText = "تحليل المشهد لـ: " + lastNews;
    setTimeout(() => {
        const results = [
            "التحليل: تصعيد يهدف لفرض واقع جديد على طاولة المفاوضات.",
            "التحليل: تحول استراتيجي لكسر حالة الجمود السياسي في المنطقة.",
            "التحليل: استخدام سياسة حافة الهاوية لتحقيق مكاسب جيوسياسية.",
            "التحليل: رغبة في إعادة رسم مناطق النفوذ دون مواجهة شاملة."
        ];
        scrambleText(out, results[Math.floor(Math.random() * results.length)]);
        showAlert("اكتمل التقرير الاستراتيجي.");
    }, 2000);
}

// 5. Export Report
function exportReport() {
    const output = document.getElementById('political-output').innerText;
    if (output.includes("بانتظار")) return showAlert("خطأ: لا يوجد تحليل حالي.");
    const report = تقرير استراتيجي - يوسف الجراح\n${new Date().toLocaleString('ar-IQ')}\n------------------\nالتحليل: ${output};
    navigator.clipboard.writeText(report).then(() => {
        showAlert("تم نسخ التقرير الرسمي للحافظة!");
        alert(report);
    });
}

// 6. Helpers (Clocks & Map)
function showAlert(msg) {
    let container = document.querySelector('.alert-container') || document.createElement('div');
    container.className = 'alert-container'; document.body.appendChild(container);
    const alert = document.createElement('div'); alert.className = 'intel-alert';
    alert.innerText = msg; container.appendChild(alert);
    setTimeout(() => alert.remove(), 4000);
}

setInterval(() => {
    const opts = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    document.getElementById('clock-baghdad').innerText = new Date().toLocaleTimeString('en-US', { ...opts, timeZone: 'Asia/Baghdad' });
    document.getElementById('clock-tehran').


innerText = new Date().toLocaleTimeString('en-US', { ...opts, timeZone: 'Asia/Tehran' });
    document.getElementById('clock-washington').innerText = new Date().toLocaleTimeString('en-US', { ...opts, timeZone: 'America/New_York' });
}, 1000);

let map = L.map('map', { zoomControl: false }).setView([33.3152, 44.3661], 4);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);
L.circle([33.3152, 44.3661], { color: '#9333ea', radius: 100000, fillColor: '#9333ea', fillOpacity: 0.4 }).addTo(map);
