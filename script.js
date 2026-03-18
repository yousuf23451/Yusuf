// --- 1. تأثير الماتريكس البنفسجي (الخلفية) ---
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

// --- 2. دالة فك التشفير التفاعلية (Scramble Effect) ---
function scrambleText(element, finalText) {
    let iteration = 0;
    const interval = setInterval(() => {
        element.innerText = finalText.split("").map((letter, index) => {
            if(index < iteration) return finalText[index];
            return alphabet[Math.floor(Math.random() * 36)];
        }).join("");
        if(iteration >= finalText.length) clearInterval(interval);
        iteration += 1/2;
    }, 30);
}

// --- 3. محاكي العواجل المباشرة ---
const breakingNews = [
    "عاجل: رصد تحركات عسكرية غير مسبوقة في النقاط الساخنة الإقليمية.",
    "عاجل: بوادر أزمة دبلوماسية حادة بين القوى الفاعلة حول ملف أمن الطاقة.",
    "عاجل: هجوم سيبراني منسق يستهدف البنى التحتية للمعلومات الاستراتيجية.",
    "عاجل: تقارير عن تغيير مفاجئ في توازنات القوى الميدانية شرقاً.",
    "عاجل: صدور تقدير موقف يشير إلى احتمالية تصعيد وشيك."
];

function updateNews() {
    const ticker = document.getElementById('news-ticker');
    const news = breakingNews[Math.floor(Math.random() * breakingNews.length)];
    const el = document.createElement('div');
    el.className = 'event-item';
    ticker.prepend(el);
    scrambleText(el, news); // تطبيق تأثير التشفير
    if (ticker.children.length > 5) ticker.lastChild.remove();
}
// تحديث أولي ثم كل 6 ثوانٍ
setTimeout(updateNews, 1000);
setInterval(updateNews, 7000);

// --- 4. المحلل السياسي المرتبط بالعواجل ---
function analyzeIncident() {
    const out = document.getElementById('political-output');
    const lastNews = document.querySelector('.event-item')?.innerText || "لا توجد عواجل";
    showAlert("بروتوكول التحليل الجيوسياسي: نشط");
    out.innerText = "تحليل الأثر الاستراتيجي لـ: " + lastNews;
    setTimeout(() => {
        const insights = [
            "التحليل: تصعيد يهدف لفرض واقع جديد على طاولة المفاوضات الدولية.",
            "التحليل: تحول استراتيجي لكسر جمود المشهد السياسي في المنطقة.",
            "التحليل: مؤشرات قوية على اعتماد استراتيجية حافة الهاوية (Whistleblowing).",
            "التحليل: البيانات تظهر رغبة في إعادة رسم مناطق النفوذ دون مواجهة شاملة."
        ];
        scrambleText(out, insights[Math.floor(Math.random() * insights.length)]);
        showAlert("اكتمل التقدير السياسي للموقف.");
    }, 2000);
}

// --- 5. استخراج التقرير الرسمي ---
function exportReport() {
    const output = document.getElementById('political-output').innerText;
    if (output.includes("بانتظار")) return showAlert("خطأ: لا يوجد تحليل حالي.");
    const time = new Date().toLocaleString('ar-IQ');
    const report = تقدير موقف استراتيجي - يوسف الجراح\nتاريخ التوليد: ${time}\n------------------\nالتحليل: ${output}\nالتوصية: مراقبة التحركات الميدانية.;
    navigator.clipboard.writeText(report).then(() => {
        showAlert("تم نسخ التقرير الرسمي للحافظة!");
        alert(report);
    });
}

// --- 6. الخريطة التفاعلية Leaflet (ثيم ليلي) ---
var map = L.map('map', { zoomControl: false }).setView([33.3152, 44.3661], 4);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: 'Global Strategic Intel - Yousif'
}).addTo(map);


...L.circle([33.3152, 44.3661], {
    color: '#9333ea',
    fillColor: '#9333ea',
    fillOpacity: 0.5,
    radius: 80000
}).addTo(map).bindPopup("<b>مركز عمليات الجراح</b><br>تحديث: نشط");

// --- 7. المساعدات (الساعات والتنبيهات) ---
setInterval(() => {
    const opts = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    document.getElementById('clock-baghdad').innerText = new Date().toLocaleTimeString('en-US', { ...opts, timeZone: 'Asia/Baghdad' });
    document.getElementById('clock-tehran').innerText = new Date().toLocaleTimeString('en-US', { ...opts, timeZone: 'Asia/Tehran' });
    document.getElementById('clock-washington').innerText = new Date().toLocaleTimeString('en-US', { ...opts, timeZone: 'America/New_York' });
}, 1000);

function showAlert(msg) {
    let container = document.querySelector('.alert-container') || document.createElement('div');
    container.className = 'alert-container'; document.body.appendChild(container);
    const alert = document.createElement('div'); alert.className = 'intel-alert';
    alert.innerText = msg; container.appendChild(alert);
    setTimeout(() => { alert.style.opacity = '0'; setTimeout(() => alert.remove(), 500); }, 3500);
}
