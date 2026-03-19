let myMap;

function initApp() {
    startClock();
    initMap();
    initHexStream();
    startSystemLogs();
    initTicker();
}

function initMap() {
    myMap = L.map('strategic-map').setView([25.0, 45.0], 5);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(myMap);

    const points = [
        {name: "جنوب لبنان", loc: [33.33, 35.50], info: "عمليات نشطة", type: "red"},
        {name: "قطاع أصفهان", loc: [32.65, 51.66], info: "منشآت استراتيجية", type: "red"},
        {name: "مضيق هرمز", loc: [26.56, 56.25], info: "شريان الطاقة", type: "blue"},
        {name: "مضيق باب المندب", loc: [12.58, 43.34], info: "رصد ملاحي", type: "blue"},
        {name: "حقل السفانية", loc: [28.00, 48.70], info: "إنتاج نفطي مكثف", type: "orange"},
        {name: "حقل الشمال", loc: [26.50, 51.20], info: "مركز تصدير الغاز", type: "orange"}
    ];

    points.forEach(p => {
        const icon = L.divIcon({className: `pulse-${p.type}`});
        L.marker(p.loc, {icon: icon}).addTo(myMap)
            .bindPopup(`<div style="color:#000; direction:rtl; text-align:right;"><b>${p.name}</b><br>${p.info}</div>`);
    });

    myMap.on('mousemove', e => {
        document.getElementById('coords-display').innerText = `LAT: ${e.latlng.lat.toFixed(2)} | LNG: ${e.latlng.lng.toFixed(2)}`;
    });
}

function toggleCombatMode() {
    document.body.classList.toggle('combat-mode');
    const btn = document.getElementById('mode-btn');
    if(document.body.classList.contains('combat-mode')) {
        btn.innerText = "DEFCON 1: ACTIVE";
        triggerEmergency("تحذير: تم رصد تصعيد في مناطق النزاع النشطة.");
    } else { btn.innerText = "DEFCON 5: NORMAL"; }
}

function triggerEmergency(msg) {
    const alert = document.getElementById('emergency-alert');
    document.getElementById('alert-message').innerText = msg;
    alert.style.display = 'flex';
    document.body.classList.add('shake');
}

function closeAlert() {
    document.getElementById('emergency-alert').style.display = 'none';
    document.body.classList.remove('shake');
}

function initHexStream() {
    setInterval(() => {
        const hex = "0x" + Math.random().toString(16).substring(2, 8).toUpperCase();
        document.getElementById('hex-stream').innerText = `DECRYPTING_SIGNAL_${hex}...`;
    }, 200);
}

function startSystemLogs() {
    const logs = ["> تشفير القنوات..", "> اتصال Satellite-01..", "> يوسف خطاب صباح: رصد نشط.."];
    let i = 0;
    const container = document.getElementById('logs-container');
    const interval = setInterval(() => {
        if(i < logs.length) {
            const p = document.createElement('p');
            p.innerText = logs[i]; container.appendChild(p); i++;
        } else { clearInterval(interval); }
    }, 3000);
}

function startClock() {
    setInterval(() => { document.getElementById('digital-clock').innerText = new Date().toLocaleTimeString('en-GB'); }, 1000);
}

function initTicker() {
    const news = " • عاجل: رصد تحركات في مضيق هرمز • يوسف خطاب صباح: استنفار في حقول الطاقة • توتر في جنوب لبنان • ";
    document.getElementById('news-text').innerText = news.repeat(5);
}

document.addEventListener('DOMContentLoaded', initApp);
