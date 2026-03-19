/* * مركز العمليات الاستخباراتية - الإصدار الاستراتيجي الشامل
 * المحلل السياسي: يوسف خطاب صباح
 * الأنظمة: رصد النزاعات الإقليمية، حرب الخليج الرابعة، أمن الطاقة، الممرات البحرية
 */

let myMap;

// --- 1. تهيئة النظام عند التحميل ---
function initApp() {
    startClock();
    initMap();
    initHexStream();
    startSystemLogs();
    initTicker();
    
    // إنشاء رقم جلسة فريد (Session ID)
    const sessionID = "YKS-" + Math.random().toString(36).substring(7).toUpperCase();
    document.getElementById('session-id').innerText = sessionID;
}

// --- 2. الخريطة الاستراتيجية ونقاط النزاع الـ 55 ---
function initMap() {
    // تركيز الخريطة على منطقة الشرق الأوسط والخليج العربي
    myMap = L.map('strategic-map').setView([29.0, 48.0], 5);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: 'Strategic Data - Yusuf Khattab'
    }).addTo(myMap);

    // مصفوفة الأهداف الاستراتيجية (النقاط الحمراء الوامضة)
    const strategicTargets = [
        // --- إيران (المنشآت النووية والصاروخية) ---
        {name: "أصفهان (IR)", loc: [32.65, 51.66], info: "مجمع الأبحاث النووية"},
        {name: "نطنز (IR)", loc: [33.72, 51.91], info: "منشأة تخصيب اليورانيوم"},
        {name: "بوشهر (IR)", loc: [28.82, 50.88], info: "المفاعل النووي"},
        {name: "كرج (IR)", loc: [35.84, 50.93], info: "موقع إنتاج أجهزة الطرد"},
        {name: "بارشين (IR)", loc: [35.61, 51.70], info: "تطوير الصواريخ الاستراتيجية"},
        {name: "بندر عباس (IR)", loc: [27.18, 56.26], info: "القاعدة البحرية المركزية"},

        // --- العراق (مناطق النزاع والقواعد) ---
        {name: "جرف الصخر (IQ)", loc: [32.87, 44.21], info: "تحصينات استراتيجية"},
        {name: "عين الأسد (IQ)", loc: [33.91, 42.44], info: "رصد النشاط الجوي"},
        {name: "القائم (IQ)", loc: [34.35, 41.07], info: "الممر الحدودي الغربي"},
        {name: "مطار بغداد (IQ)", loc: [33.26, 44.23], info: "منطقة رصد أمني"},
        {name: "البصرة (IQ)", loc: [30.50, 47.81], info: "موانئ الطاقة والنفط"},

        // --- لبنان (جبهة الجنوب والضاحية) ---
        {name: "الناقورة (LB)", loc: [33.12, 35.13], info: "الخط الأزرق - تماس مباشر"},
        {name: "الضاحية (LB)", loc: [33.85, 35.50], info: "مركز القيادة والسيطرة"},
        {name: "سهل البقاع (LB)", loc: [33.80, 36.00], info: "منصات صواريخ بعيدة المدى"},
        {name: "صور (LB)", loc: [33.27, 35.19], info: "رصد تحركات الجبهة الجنوبية"},

        // --- إسرائيل (الأهداف الحساسة والقواعد) ---
        {name: "ديمونة (IL)", loc: [31.00, 35.14], info: "المفاعل النووي - منطقة حظر"},
        {name: "نيفاريم (IL)", loc: [31.20, 34.99], info: "قاعدة F-35 الاستراتيجية"},
        {name: "تل أبيب (IL)", loc: [32.08, 34.78], info: "مقر وزارة الدفاع (الكرياه)"},
        {name: "حيفا (IL)", loc: [32.81, 34.99], info: "الميناء العسكري الشمالي"},

        // --- الخليج العربي (أمن الطاقة وحرب الخليج 4) ---
        {name: "مضيق هرمز", loc: [26.56, 56.25], info: "شريان الطاقة - تهديد ملاحي"},
        {name: "رأس تنورة (SA)", loc: [26.64, 50.11], info: "أضخم ميناء شحن نفط"},
        {name: "بقيق (SA)", loc: [25.93, 49.67], info: "معالجة الزيت والغاز"},
        {name: "حقل الشمال (QA)", loc: [26.50, 51.20], info: "أكبر حقل غاز في العالم"},
        {name: "مرفأ الفحل (OM)", loc: [23.63, 58.50], info: "مصب النفط العماني"},
        {name: "باب المندب", loc: [12.58, 43.34], info: "رصد ممر البحر الأحمر"}
    ];

    // إضافة النقاط الحمراء الوامضة للخريطة
    strategicTargets.forEach(t => {
        const icon = L.divIcon({className: 'pulse-red'});
        L.marker(t.loc, {icon: icon}).addTo(myMap)
            .bindPopup(`
                <div style="color:#000; direction:rtl; text-align:right;">
                    <b style="color:red; font-size:14px;">[${t.name}]</b><br>
                    <hr style="margin:5px 0;">
                    <b>الوضعية:</b> هدف استراتيجي نشط<br>
                    <b>المعلومات:</b> ${t.info}
                </div>
            `);
    });

    // رصد الإحداثيات عند تحريك الماوس
    myMap.on('mousemove', e => {
        document.getElementById('coords-display').innerText = `LAT: ${e.latlng.lat.toFixed(2)} | LNG: ${e.latlng.lng.toFixed(2)}`;
    });
}

// --- 3. نظام وضع القتال والإنذارات ---
function toggleCombatMode() {
    document.body.classList.toggle('combat-mode');
    const btn = document.getElementById('mode-btn');
    
    if(document.body.classList.contains('combat-mode')) {
        btn.innerText = "DEFCON 1: ACTIVE";
        btn.style.boxShadow = "0 0 15px #ff0000";
        triggerEmergency("تحذير: تم رصد تصعيد قتالي في قطاعات إيران، العراق، ولبنان. حرب الخليج الرابعة في حالة استنفار.");
    } else {
        btn.innerText = "DEFCON 5: NORMAL";
        btn.style.boxShadow = "none";
    }
}

function triggerEmergency(msg) {
    const alertOverlay = document.getElementById('emergency-alert');
    const alertMsg = document.getElementById('alert-message');
    
    alertMsg.innerText = msg;
    alertOverlay.style.display = 'flex';
    document.body.classList.add('shake');
}

function closeAlert() {
    document.getElementById('emergency-alert').style.display = 'none';
    document.body.classList.remove('shake');
}

// --- 4. تدفق بيانات التشفير (Hex Stream) ---
function initHexStream() {
    const stream = document.getElementById('hex-stream');
    setInterval(() => {
        const hex = "0x" + Math.random().toString(16).substring(2, 10).toUpperCase();
        stream.innerText = `SIGNAL_DECRYPTED: ${hex} | TRACKING_TARGET_GEO_LOC...`;
    }, 150);
}

// --- 5. سجل العمليات الاستخباراتي ---
function startSystemLogs() {
    const logs = [
        "> جاري مزامنة الأقمار الصناعية (Sat-Link 01)..",
        "> تم اختراق القناة المشفرة للمنطقة المستهدفة..",
        "> يوسف خطاب صباح: أنظمة الرصد في كامل الجاهزية..",
        "> رصد تحركات بحرية في مضيق هرمز الآن..",
        "> تحديث قائمة أهداف الخليج والعراق ولبنان..",
        "> إرسال البيانات إلى مركز التحليل الاستراتيجي.."
    ];
    let i = 0;
    const container = document.getElementById('logs-container');
    
    const interval = setInterval(() => {
        if(i < logs.length) {
            const p = document.createElement('p');
            p.innerText = logs[i];
            p.style.margin = "2px 0";
            container.appendChild(p);
            container.scrollTop = container.scrollHeight;
            i++;
        } else {
            clearInterval(interval);
        }
    }, 2500);
}

// --- 6. وظائف الساعة وشريط الأخبار ---
function startClock() {
    setInterval(() => {
        const now = new Date();
        document.getElementById('digital-clock').innerText = now.toLocaleTimeString('en-GB');
    }, 1000);
}

function initTicker() {
    const news = " • عاجل: رصد استنفار في حقول الغاز بالخليج العربي • يوسف خطاب صباح: تحليل خرق استراتيجي في قطاع أصفهان • توتر متصاعد على الخط الأزرق جنوب لبنان • تأمين ممرات الملاحة في باب المندب وهرمز • ";
    document.getElementById('news-text').innerText = news.repeat(5);
}

// تشغيل النظام
document.addEventListener('DOMContentLoaded', initApp);
