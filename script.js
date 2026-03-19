// 1. تشغيل الساعة
function startClock() {
    setInterval(() => {
        const now = new Date();
        document.getElementById('digital-clock').innerText = now.toLocaleTimeString('en-US', { hour12: false });
    }, 1000);
}

// 2. تشغيل الخريطة (تم التصحيح)
function initMap() {
    try {
        // تحديد المركز
        var map = L.map('strategic-map').setView([30.0, 40.0], 4);

        // استخدام مصدر خرائط عالمي وموثوق
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap'
        }).addTo(map);

        // إضافة نقاط توتر
        const spots = [
            {n: "نقطة رصد 1", c: [31.35, 34.30]},
            {n: "نقطة رصد 2", c: [33.31, 44.36]}
        ];

        spots.forEach(s => {
            L.circleMarker(s.c, {radius: 10, color: 'red', fillColor: '#f03', fillOpacity: 0.5}).addTo(map).bindPopup(s.n);
        });

        document.getElementById('map-status').innerText = "> الخريطة الاستراتيجية: تعمل بنجاح";
    } catch (e) {
        document.getElementById('map-status').innerText = "> خطأ في تحميل الخريطة: " + e.message;
    }
}

// 3. شريط الأخبار
function initTicker() {
    const news = " • رصد تحركات في المنطقة • تحديث استخباراتي جديد • بث القنوات الإخبارية مستمر • ";
    document.getElementById('news-text').innerText = news + news + news;
}

// تشغيل الوظائف عند جاهزية المتصفح تماماً
document.addEventListener("DOMContentLoaded", function() {
    startClock();
    initMap();
    initTicker();
});
