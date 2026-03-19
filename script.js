let map;
let isEmergency = false;

function init() {
    // 1. تعريف طبقات الخريطة
    const darkLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png');
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');

    map = L.map('map', {
        center: [33.31, 44.36], // المركز بغداد
        zoom: 5,
        layers: [darkLayer]
    });

    const baseLayers = { "الرؤية الليلية": darkLayer, "القمر الصناعي": satelliteLayer };
    L.control.layers(baseLayers).addTo(map);

    // 2. توزيع أهم الأهداف الـ 55 (عينة استراتيجية)
    const hotSpots = [
        { name: "القدس - حائط البراق", loc: [31.77, 35.23] },
        { name: "طهران - مركز القيادة", loc: [35.68, 51.38] },
        { name: "مفاعل ديمونة", loc: [31.00, 35.14] },
        { name: "جنوب لبنان", loc: [33.33, 35.50] },
        { name: "مضيق هرمز", loc: [26.56, 56.25] },
        { name: "جرف الصخر - العراق", loc: [32.87, 44.21] }
    ];

    hotSpots.forEach(p => {
        L.marker(p.loc, { icon: L.divIcon({ className: 'pulse-dot' }) }).addTo(map)
            .bindPopup(`<b>[${p.name}]</b><br>رصد نشط 24/7`);
    });

    // 3. تحديث الساعة والسجل
    startSystems();
}

function triggerEmergency() {
    const body = document.body;
    const siren = document.getElementById('siren');
    const btn = document.getElementById('emergency-btn');

    if (!isEmergency) {
        body.classList.add('emergency-active');
        btn.innerText = "OFF EMERGENCY";
        btn.style.background = "white";
        btn.style.color = "red";
        siren.play();
        isEmergency = true;
        updateLog("> !!! تحذير: تم تفعيل وضع الطوارئ الشامل !!!");
    } else {
        body.classList.remove('emergency-active');
        btn.innerText = "EMERGENCY MODE";
        btn.style.background = "#330000";
        btn.style.color = "#ff5555";
        siren.pause();
        isEmergency = false;
        updateLog("> عودة للنظام الطبيعي... الرصد مستمر.");
    }
}

function updateLog(msg) {
    document.getElementById('intel-log').innerText = msg;
}

function startSystems() {
    setInterval(() => {
        document.getElementById('clock').innerText = new Date().toLocaleTimeString('en-GB');
    }, 1000);

    const logs = [
        "> مزامنة الأقمار الصناعية فوق طهران...",
        "> رصد طيران استطلاع في الأنبار...",
        "> يوسف خطاب: تحليل إشارات هرمز...",
        "> تحديث: جبهة لبنان تحت الرصد المجهري..."
    ];
    let i = 0;
    setInterval(() => {
        if (!isEmergency) updateLog(logs[i % logs.length]);
        i++;
    }, 5000);
}

document.addEventListener('DOMContentLoaded', init);
