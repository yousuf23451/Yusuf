function updateWorldClocks() {
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const zones = {
        'clock-baghdad': 'Asia/Baghdad',
        'clock-tehran': 'Asia/Tehran',
        'clock-washington': 'America/New_York'
    };
    for (const [id, zone] of Object.entries(zones)) {
        const el = document.getElementById(id);
        if(el) el.innerText = new Date().toLocaleTimeString('en-US', { ...timeOptions, timeZone: zone });
    }
}
setInterval(updateWorldClocks, 1000);

function analyzeIncident() {
    const out = document.getElementById('legal-output');
    out.innerText = "جاري مطابقة النصوص القانونية الميدانية...";
    setTimeout(() => {
        out.innerText = "التحليل الاستراتيجي: خرق للمادة 2(4) من ميثاق الأمم المتحدة المتعلق بسيادة الدول.";
    }, 1200);
}

// الخريطة التفاعلية
let map = L.map('map', { zoomControl: false }).setView([33.3152, 44.3661], 4);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);
L.circle([33.3152, 44.3661], { color: '#9333ea', radius: 50000 }).addTo(map).bindPopup("بغداد - مركز العمليات");
