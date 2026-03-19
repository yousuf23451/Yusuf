/*
 * مركز التحليل الاستراتيجي - يوسف خطاب صباح
 * Core Functions: Advanced Map, Alerts, Clock, Ticker
 */

// --- 1. نظام الإنذار المبكر ---

// وظيفة تشغيل الإنذار (نافذة حمراء وامضة)
function triggerEmergency(message) {
    const alertOverlay = document.getElementById('emergency-alert');
    const alertMsg = document.getElementById('alert-message');
    
    if (!alertOverlay || !alertMsg) return;

    alertMsg.innerText = message;
    alertOverlay.style.display = 'flex';
    document.body.classList.add('shake'); // هز الشاشة لجذب الانتباه

    // محاكاة صوت إنذار خفيف (اختياري، يتطلب تفاعل المستخدم أولاً في بعض المتصفحات)
    // const audio = new Audio('path/to/alert.mp3'); audio.play();
}

// وظيفة إغلاق الإنذار
function closeAlert() {
    document.getElementById('emergency-alert').style.display = 'none';
    document.body.classList.remove('shake');
}

// محاكاة: تشغيل إنذار تلقائي بعد 10 ثوانٍ للتجربة
setTimeout(() => {
    triggerEmergency("⚠️ تنبيه عاجل: رصد نشاط عسكري غير معتاد في قطاع أصفهان. جاري تحليل الأضرار.");
}, 10000);


// --- 2. الخريطة الاستراتيجية (تم التحديث لإضافة نقاط إيران) ---

let myMapInstance; // متغير عالمي لحفظ مثيل الخريطة

function initializeStrategicMap() {
    const mapElement = document.getElementById('strategic-map');
    if (!mapElement) return;

    // خطوة 1: منع التحميل المتكرر
    if (myMapInstance) { myMapInstance.remove(); }

    // خطوة 2: إنشاء الخريطة وتحديد المركز وزوم متوسط للشرق الأوسط
    myMapInstance = L.map('strategic-map').setView([32.4279, 53.6880], 5);

    // خطوة 3: تعيين نمط الخريطة الداكن (Voyager Dark) ليعطي هيبة لغرفة العمليات
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: 'Strategic Data - Yusuf Khattab | Map tiles by CartoDB'
    }).addTo(myMapInstance);

    // خطوة 4: إضافة ميزة تتبع الإحداثيات (MouseMove)
    const coordsDisplay = document.getElementById('coords-display');
    if (coordsDisplay) {
        myMapInstance.on('mousemove', function(e) {
            coordsDisplay.innerHTML = `COORDS: ${e.latlng.lat.toFixed(4)} N | ${e.latlng.lng.toFixed(4)} E`;
        });
    }

    // خطوة 5: إضافة نقاط رصد (تاريخية وعملياتية) - تشمل مناطق إيران
    
    // أيقونة مخصصة للنقاط الوامضة (Pulse Effect) عبر CSS
    const pulseIcon = L.divIcon({
        className: 'pulse-icon',
        iconSize: [12, 12],
        html: '<div class="pulse-dot"></div>'
    });

    const targetedSites = [
        // --- نقاط رصد في إيران (مناطق استهدافات) ---
        { name: "قطاع أصفهان (IR-01)", coords: [32.6546, 51.6680], desc: "استهداف مجمع صناعات دفاعية وموقع نووي تقريبي. جاري الرصد بصرياً." },
        { name: "منشأة كرج (IR-02)", coords: [35.8400, 50.9391], desc: "رصد أضرار في منشأة لأجزاء أجهزة الطرد المركزي. تقييم أمني نشط." },
        { name: "طهران الشرقية (IR-03)", coords: [35.6892, 51.3890], desc: "استهداف منشآت لتطوير الصواريخ والطائرات المسيرة في مجمع خجير." },
        { name: "مجمع بارشين (IR-04)", coords: [35.6171, 51.7011], desc: "رصد أضرار في موقع نووي/عسكري سابق. جاري تحليل صور الأقمار الصناعية." },
        { name: "قاعدة شكاري الجوية (IR-05)", coords: [32.6033, 51.6888], desc: "تضرر رادار منظومة S-300 لحماية منشأة نطنز." },

        // --- نقاط أخرى (أمثلة) ---
        { name: "مركز القيادة - بغداد", coords: [33.3152, 44.3661], desc: "نظام تحليل البيانات المركزية يعمل بكفاءة." }
    ];

    targetedSites.forEach(site => {
        L.marker(site.coords, { icon: pulseIcon }).addTo(myMapInstance)
            .bindPopup(`<div style="color:black; font-family: 'Segoe UI';"><b>${site.name}</b><br><span style="color:#cc0000; font-weight:bold;">الحالة: ${site.desc}</span></div>`);
    });

    // خطوة 6: إصلاح مشكلة ظهور الخريطة بشكل جزئي
    setTimeout(() => { myMapInstance.invalidateSize(); }, 800);
}


// --- 3. الوظائف الأساسية الأخرى ---

// وظيفة الساعة الرقمية (بتوقيت بغداد)
function startStrategicClock() {
    const clockElement = document.getElementById('digital-clock');
    if (!clockElement) return;

    setInterval(() => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: false, timeZone: 'Asia/Baghdad' });
        clockElement.innerText = timeString;
    }, 1000);
}

// وظيفة شريط الأخبار العاجلة
function initStrategicNewsTicker() {
    const newsFeed = [
        "• عاجل: رصد تحركات جوية مكثفة في قطاع أصفهان الإيراني •",
        "• تحليل: استهداف منظومات الرادار يفتح ثغرات في الدفاع الجوي •",
        "• متابعة: يوسف خطاب صباح: جلسة رصد مفتوحة لمواكبة التطورات •",
        "• رصد بصري: صور الأقمار الصناعية تؤكد أضراراً في منشآت حيوية بكرج •"
    ];
    const tickerContent = document.getElementById('news-text');
    if (!tickerContent) return;
    
    tickerContent.innerHTML = newsFeed.join(" &nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp; ");
}

// وظيفة سجل العمليات الآلي (Typewriter effect)
function startSystemLogs() {
    const logs = [
        "> جاري تشفير القناة الاستخباراتية...",
        "> تم الاتصال بالقمر الصناعي السداسي (IR-Sat-01)..",
        "> تحديث قاعدة بيانات مناطق النزاع النشطة..",
        "> تحميل إحداثيات قطاع أصفهان، كرج، وطهران..",
        "> يوسف خطاب صباح: نظام رصد مناطق الاستهداف جاهز."
    ];
    let i = 0;
    const logContainer = document.querySelector('.system-logs');
    if (!logContainer) return;
    
    const logInterval = setInterval(() => {
        if(i < logs.length) {
            const p = document.createElement('p');
            p.innerText = logs[i];
            p.style.color = "#00ff41"; // لون أخضر "ماتريكس"
            logContainer.appendChild(p);
            i++;
        } else {
            clearInterval(logInterval);
        }
    }, 2000);
}


// --- 4. دمج الوظائف وتشغيلها ---

document.addEventListener("DOMContentLoaded", function() {
    startStrategicClock();
    initStrategicNewsTicker();
    startSystemLogs();
    
    // تشغيل الخريطة مع تأخير بسيط لضمان تحميل الـ DOM و الـ CSS
    setTimeout(initializeStrategicMap, 500);
});

// تأكيد تحديث الخريطة عند تغيير حجم المتصفح
window.addEventListener('resize', () => {
    if (myMapInstance) { myMapInstance.invalidateSize(); }
});
