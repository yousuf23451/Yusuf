/**
 * YOUSIF AL JARAH - INTEL ENGINE
 * هذا الملف يدير العمليات التفاعلية للموقع
 */

// 1. تحديث الساعات العالمية
function updateClocks() {
    const opts = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const zones = {
        'clock-baghdad': 'Asia/Baghdad',
        'clock-tehran': 'Asia/Tehran',
        'clock-jerusalem': 'Asia/Jerusalem',
        'clock-washington': 'America/New_York'
    };
    for (const [id, zone] of Object.entries(zones)) {
        document.getElementById(id).innerText = new Date().toLocaleTimeString('en-US', { ...opts, timeZone: zone });
    }
}
setInterval(updateClocks, 1000);

// 2. المحلل القانوني
function analyzeIncident() {
    const out = document.getElementById('legal-output');
    const laws = [
        "التحليل: الحدث يقع ضمن نطاق المادة 51 من ميثاق الأمم المتحدة (الدفاع الشرعي).",
        "التحليل: رصد خرق للمادة 2(4) بشأن حظر استخدام القوة في العلاقات الدولية.",
        "التحليل: الحالة تستوجب مراجعة التزامات الأطراف وفق اتفاقية جنيف الرابعة 1949."
    ];
    out.innerText = "جاري الفحص الميداني القانوني...";
    setTimeout(() => {
        out.innerText = laws[Math.floor(Math.random() * laws.length)];
        triggerGlow();
    }, 1000);
}

// 3. الخريطة التفاعلية
let map = L.map('map', { zoomControl: false }).setView([33.3152, 44.3661], 4);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

const hotspots = [
    { n: "بغداد", c: [33.3152, 44.3661] },
    { n: "طهران", c: [35.6892, 51.3890] },
    { n: "القدس", c: [31.7683, 35.2137] }
];
hotspots.forEach(s => {
    L.circle(s.c, { color: '#9333ea', radius: 60000 }).addTo(map).bindPopup(s.n);
});

// 4. الرادار الصوتي ووميض الشعار
const beep = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3');
beep.loop = true;
beep.volume = 0.05;

function triggerGlow() {
    const logo = document.getElementById('glowing-logo');
    logo.classList.add('glowing-active');
    setTimeout(() => logo.classList.remove('glowing-active'), 500);
}

document.addEventListener('click', () => {
    if (beep.paused) {
        beep.play();
        setInterval(triggerGlow, 2000); // وميض كل ثانيتين مع الرادار
    }
}, { once: true });
