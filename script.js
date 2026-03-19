// 1. وظيفة الساعة الرقمية
function startClock() {
    setInterval(() => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour12: false, timeZone: 'Asia/Baghdad' });
        document.getElementById('digital-clock').innerText = timeStr + " (BAGHDAD)";
    }, 1000);
}

// 2. وظيفة الخارطة الاستراتيجية
function initMap() {
    // إحداثيات مركز الشرق الأوسط
    const map = L.map('strategic-map').setView([30.0, 40.0], 5);

    // استخدام نمط خارطة داكن (Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CartoDB'
    }).addTo(map);

    // إضافة نقاط ساخنة افتراضية (Hotspots)
    const hotspots = [
        { name: "غزة", coords: [31.3547, 34.3088], status: "منطقة عمليات نشطة" },
        { name: "جنوب لبنان", coords: [33.3333, 35.5000], status: "توتر حدودي مرتفع" },
        { name: "البحر الأحمر", coords: [20.0, 39.0], status: "تهديد للملاحة الدولية" }
    ];

    hotspots.forEach(spot => {
        const marker = L.circleMarker(spot.coords, {
            radius: 8,
            fillColor: "#ff0000",
            color: "#fff",
            weight: 1,
            fillOpacity: 0.8
        }).addTo(map);
        
        marker.bindPopup(`<b>${spot.name}</b><br>${spot.status}`);
    });
}

// 3. تحديث شريط الأخبار
function initTicker() {
    const news = [
        "• عاجل: تحركات ديبلوماسية طارئة في عواصم القرار •",
        "• تحليل: إعادة رسم خارطة النفوذ في منطقة شرق المتوسط •",
        "• تقرير استخباراتي: رصد تعزيزات عسكرية على الخطوط الأمامية •",
        "• متابعة: تأثير أسعار الطاقة على الموقف السياسي للدول الكبرى •"
    ];
    document.getElementById('news-text').innerHTML = news.join(" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ");
}

// تشغيل كل شيء عند التحميل
window.onload = () => {
    startClock();
    initMap();
    initTicker();
    console.log("Global Intelligence Dashboard: System Online.");
};
