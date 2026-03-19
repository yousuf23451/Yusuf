/*
 * مركز التحليل الاستراتيجي - يوسف خطاب صباح
 * Core Functions: Map, Clock, News Ticker
 * تـم التصحيح لضمان تحميل الخريطة في جميع المتصفحات
 */

// 1. وظيفة الساعة الدولية (تأكيد التشغيل)
function startStrategicClock() {
    const clockElement = document.getElementById('digital-clock');
    if (!clockElement) return;

    setInterval(() => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: false });
        clockElement.innerText = timeString;
    }, 1000);
}

// 2. وظيفة تشغيل الخريطة (تم التصحيح الجذري)
function initializeMap() {
    const mapElement = document.getElementById('strategic-map');
    if (!mapElement) return;

    // خطوة 1: منع الخريطة من التحميل المتكرر في نفس المربع
    if (window.myMapInstance) {
        window.myMapInstance.remove();
    }

    // خطوة 2: تحديد المركز (بغداد) وزوم مقرب
    window.myMapInstance = L.map('strategic-map').setView([33.3152, 44.3661], 5);

    // خطوة 3: تعيين نمط الخريطة (Dark Mode) - تم استخدام مصدر ثابت ومستقر
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(window.myMapInstance);

    // خطوة 4: إضافة بؤر النزاع النشطة (نقاط رصد حمراء متوهجة)
    const activeHotspots = [
        { name: "مركز العمليات: بغداد", coords: [33.3152, 44.3661], status: "نظام الرصد متصل" },
        { name: "قطاع غزة", coords: [31.3547, 34.3088], status: "عمليات نشطة (Cores-01)" },
        { name: "جنوب لبنان", coords: [33.3333, 35.5000], status: "توتر مرتفع" },
        { name: "البحر الأحمر", coords: [20.0, 39.0], status: "تهديد ملاحة نشط" }
    ];

    activeHotspots.forEach(spot => {
        const marker = L.circleMarker(spot.coords, {
            radius: 12,
            fillColor: "#ff0000",
            color: "#fff",
            weight: 1,
            fillOpacity: 0.8
        }).addTo(window.myMapInstance);
        
        // ربط التحليل بالنافذة المنبثقة
        marker.bindPopup(`<b>${spot.name}</b><br><span style="color:#ffcc00">${spot.status}</span>`);
    });

    // خطوة 5: تأكيد جاهزية الخريطة للعرض
    setTimeout(() => {
        window.myMapInstance.invalidateSize();
    }, 500);
}

// 3. تحديث شريط الأخبار العاجلة (تأكيد التشغيل)
function initStrategicNewsTicker() {
    const newsFeed = [
        "• عاجل: رصد تحركات جوية غير معتادة في منطقة شرق المتوسط •",
        "• تحديث استخباراتي: إعادة تموضع القوات على خطوط النزاع الأمامية •",
        "• تحليل: تأثير أسعار الطاقة على خارطة التحالفات الإقليمية الجديدة •",
        "• متابعة: بثوث القنوات الإخبارية تعمل بأعلى جودة لمواكبة الأحداث الحية •"
    ];
    const tickerContent = document.getElementById('news-text');
    if (!tickerContent) return;
    
    tickerContent.innerHTML = newsFeed.join(" &nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp; ");
}

// تشغيل الوظائف عند جاهزية الصفحة تماماً
// document.addEventListener("DOMContentLoaded") - تضمن تشغيل الكود بعد تحميل HTML
document.addEventListener("DOMContentLoaded", function() {
    startStrategicClock();
    initStrategicNewsTicker();
    
    // تشغيل الخريطة مع تأخير بسيط لضمان تحميل CSS
    setTimeout(initializeMap, 100);
});
