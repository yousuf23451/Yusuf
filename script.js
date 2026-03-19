let map = L.map('map', {zoomControl: false}).setView([30.0, 48.0], 5);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

// مصفوفة المواقع العسكرية المحدثة
const milSites = [
    // القواعد الأمريكية (US Bases)
    { n: "قاعدة عين الأسد (US)", c: [33.91, 42.44], type: "us", i: "fa-plane-departure" },
    { n: "قاعدة التنف (US)", c: [33.35, 38.82], type: "us", i: "fa-shield-halved" },
    { n: "الأسطول الخامس (US)", c: [26.21, 50.60], type: "us", i: "fa-ship" },
    { n: "قاعدة العديد (US)", c: [25.11, 51.31], type: "us", i: "fa-jet-fighter" },
    { n: "قاعدة علي السالم (US)", c: [29.34, 47.51], type: "us", i: "fa-plane-up" },

    // مواقع الحرس الثوري (IRGC Sites)
    { n: "قيادة الحرس الثوري - طهران", c: [35.68, 51.38], type: "ir", i: "fa-building-shield" },
    { n: "موقع نطنز (IRGC)", c: [33.72, 51.91], type: "ir", i: "fa-radiation" },
    { n: "قاعدة بندر عباس (IRGC)", c: [27.18, 56.27], type: "ir", i: "fa-anchor" },
    { n: "منشأة فردو (IRGC)", c: [34.50, 50.80], type: "ir", i: "fa-microchip" },

    // مناطق نزاع ساخنة
    { n: "رصد إطلاق صواريخ", c: [32.0, 47.0], type: "warn", i: "fa-rocket" },
    { n: "ضربة جوية نشطة", c: [33.33, 35.50], type: "warn", i: "fa-explosion" }
];

milSites.forEach(s => {
    let iconClass = s.type === 'us' ? 'us-icon' : (s.type === 'ir' ? 'ir-icon' : 'warn-icon');
    let customIcon = L.divIcon({
        html: `<i class="fa-solid ${s.i} mil-icon ${iconClass}"></i>`,
        className: 'mil-marker',
        iconSize: [25, 25]
    });
    
    L.marker(s.c, {icon: customIcon}).addTo(map)
        .bindPopup(`<b>${s.n}</b><br>الحالة: مراقبة بالأقمار الصناعية`);
});

function triggerEmergency() {
    document.body.classList.toggle('emergency-active');
    // إضافة صوت صفارة إنذار
    let audio = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3');
    audio.play();
}

setInterval(() => {
    document.getElementById('clock').innerText = new Date().toLocaleTimeString('en-GB');
}, 1000);
