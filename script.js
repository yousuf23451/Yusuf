/**
 * YOUSIF AL JARAH - GLOBAL INTELLIGENCE PLATFORM
 * SCRIPT ENGINE V1.0
 */

// 1. إدارة الساعات العالمية (World Clocks)
function updateWorldClocks() {
    const timeOptions = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
    };

    const zones = {
        'clock-baghdad': 'Asia/Baghdad',
        'clock-tehran': 'Asia/Tehran',
        'clock-jerusalem': 'Asia/Jerusalem',
        'clock-washington': 'America/New_York'
    };

    for (const [id, zone] of Object.entries(zones)) {
        const element = document.getElementById(id);
        if (element) {
            element.innerText = new Date().toLocaleTimeString('en-US', { ...timeOptions, timeZone: zone });
        }
    }
}

// تحديث الساعات كل ثانية
setInterval(updateWorldClocks, 1000);
updateWorldClocks();

// 2. إعداد الخريطة التفاعلية (Leaflet Map)
let map, hotspotLayer;

function initIntelligenceMap() {
    // تمركز الخريطة على الشرق الأوسط (بغداد)
    map = L.map('map', {
        zoomControl: false,
        attributionControl: false
    }).setView([33.3152, 44.3661], 4);

    // استخدام شكل الخريطة الداكن (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

    // إضافة نقاط التوتر الاستراتيجية
    const hotspots = [
        { name: "بغداد", coords: [33.3152, 44.3661], status: "مركز القرار السيادي" },
        { name: "طهران", coords: [35.6892, 51.3890], status: "مراقبة النشاط الاستراتيجي" },
        { name: "واشنطن", coords: [38.9072, -77.0369], status: "تحليل السياسة الخارجية" },
        { name: "القدس", coords: [31.7683, 35.2137], status: "منطقة نزاع دولي" }
    ];

    hotspots.forEach(spot => {
        L.circle(spot.coords, {
            color: '#9333ea',
            fillColor: '#9333ea',
            fillOpacity: 0.4,
            radius: 60000
        }).addTo(map).bindPopup(`<b>${spot.name}</b><br>${spot.status}`);
    });
}

// 3. نظام المحلل القانوني (Legal AI Simulation)
function analyzeIncident() {
    const outputElement = document.getElementById('legal-output');
    const legalDatabase = [
        "التحليل: خرق صريح للمادة 2(4) من ميثاق الأمم المتحدة التي تحظر استخدام القوة ضد سلامة الأراضي.",
        "التحليل: يمكن تكييف الفعل كـ 'دفاع شرعي' بموجب المادة 51 من القانون الدولي إذا ثبت وقوع هجوم مسلح.",
        "التحليل: الحالة تستوجب تفعيل اتفاقية جنيف الرابعة لحماية المدنيين نظراً للأعمال الميدانية الجارية.",
        "التحليل: خرق للبروتوكول الإضافي الأول المتعلق بحماية الأعيان الثقافية والدينية في مناطق النزاع.",
        "التحليل: الموقف القانوني يتطلب قراراً فورياً من مجلس الأمن بموجب الفصل السابع من الميثاق."
    ];

    // تأثير بصري أثناء التحليل
    outputElement.style.opacity = '0.5';
    outputElement.innerText = "جاري مطابقة الحدث مع نصوص القانون الدولي الإنساني...";

    setTimeout(() => {
        const result = legalDatabase[Math.floor(Math.random() * legalDatabase.length)];
        outputElement.innerText = result;
        outputElement.style.opacity = '1';
        
        // إحداث نبضة في الشعار عند ظهور النتيجة
        triggerLogoGlow();
    }, 1200);
}

// 4. الرادار الصوتي والتفاعل البصري (Audio & Glow)
const radarAudio = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3');
radarAudio.loop = true;
radarAudio.volume = 0.04; // صوت هادئ جداً

function triggerLogoGlow() {
    const logo = document.getElementById('glowing-logo');
    if (logo) {
        logo.classList.add('glowing-active');
        setTimeout(() => logo.classList.remove('glowing-active'), 500);
    }
}

// تفعيل الصوت والوميض عند أول تفاعل للمستخدم (سياسة المتصفحات)
document.addEventListener('click', function() {
    if (radarAudio.paused) {
        radarAudio.play().catch(e => console.log("Audio play blocked"));
        
        // مزامنة وميض الشعار مع نبض الرادار كل ثانيتين
        setInterval(triggerLogoGlow, 2000);
    }
}, { once: true });

// تشغيل الخريطة عند تحميل الصفحة
window.onload = initIntelligenceMap;
