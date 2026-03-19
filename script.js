let map;
let isAudioActive = false;

function init() {
    // بناء الخريطة
    map = L.map('map').setView([30.0, 45.0], 5);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

    // نقاط الرصد الـ 55 (تركيز على القدس وطهران والخليج ولبنان)
    const points = [
        { n: "القدس - حائط البراق", l: [31.7767, 35.2345], i: "رصد حي لمحيط المسجد الأقصى" },
        { n: "طهران - منشآت سيادية", l: [35.6892, 51.3890], i: "متابعة مراكز القرار الإيرانية" },
        { n: "أصفهان - IR", l: [32.65, 51.66], i: "تخصيب اليورانيوم والبحث النووي" },
        { n: "جنوب لبنان - الجبهة", l: [33.33, 35.50], i: "اشتباكات حدودية مستمرة" },
        { n: "مضيق هرمز", l: [26.56, 56.25], i: "رصد ناقلات الطاقة" },
        { n: "الرياض - الخليج", l: [24.7136, 46.6753], i: "مركز عمليات الدفاع الخليجي" },
        { n: "بغداد - يوسف للمراقبة", l: [33.3152, 44.3661], i: "مقر المحلل الاستراتيجي يوسف" }
    ];

    points.forEach(p => {
        const icon = L.divIcon({ className: 'pulse' });
        L.marker(p.l, { icon: icon }).addTo(map)
            .bindPopup(`<b>${p.n}</b><br>${p.i}`);
    });

    startClock();
    autoUpdateAlerts();
}

function toggleAudio() {
    const radar = document.getElementById('radar-sound');
    const btn = document.getElementById('audio-btn');
    if(!isAudioActive) {
        radar.play();
        btn.innerText = "كتم الرادار";
        isAudioActive = true;
    } else {
        radar.pause();
        btn.innerText = "تشغيل الرادار";
        isAudioActive = false;
    }
}

function autoUpdateAlerts() {
    setInterval(() => {
        if(isAudioActive) {
            document.getElementById('alert-sound').play();
        }
        console.log("رصد إشارة رادار جديدة...");
    }, 15000); // تنبيه صوتي كل 15 ثانية لمحاكاة الرصد
}

function startClock() {
    setInterval(() => {
        document.getElementById('clock').innerText = new Date().toLocaleTimeString('en-GB');
    }, 1000);
}

function generateReport() {
    window.print();
}

document.addEventListener('DOMContentLoaded', init);
