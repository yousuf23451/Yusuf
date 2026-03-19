let map;
const sessionID = "YKS-INTEL-" + Math.random().toString(36).substring(7).toUpperCase();

function init() {
    document.getElementById('session-id').innerText = sessionID;
    startClock();
    initMap();
    initLogs();
    initTicker();
    loadArchive();
}

function initMap() {
    map = L.map('strategic-map').setView([30.0, 48.0], 5);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

    const targets = [
        // إيران
        {n: "أصفهان - IR", l: [32.65, 51.66], i: "Nuclear Research Center"},
        {n: "نطنز - IR", l: [33.72, 51.91], i: "Enrichment Facility"},
        {n: "بندر عباس - IR", l: [27.18, 56.26], i: "Naval HQ"},
        // العراق
        {n: "جرف الصخر - IQ", l: [32.87, 44.21], i: "Strategic Stronghold"},
        {n: "عين الأسد - IQ", l: [33.91, 42.44], i: "Airbase Monitor"},
        // لبنان وإسرائيل
        {n: "الناقورة - LB", l: [33.12, 35.13], i: "Blue Line Front"},
        {n: "ديمونة - IL", l: [31.00, 35.14], i: "Nuclear Reactor Area"},
        {n: "تل أبيب - IL", l: [32.08, 34.78], i: "Defense Command (Kirya)"},
        // الخليج والمضائق
        {n: "مضيق هرمز", l: [26.56, 56.25], i: "Choke Point Alpha"},
        {n: "حقل الشمال - QA", l: [26.50, 51.20], i: "LNG Global Hub"},
        {n: "رأس تنورة - SA", l: [26.64, 50.11], i: "Global Oil Export"}
    ];

    targets.forEach(t => {
        const icon = L.divIcon({className: 'pulse-red'});
        L.marker(t.l, {icon: icon}).addTo(map)
            .bindPopup(`<div style="color:#000; direction:rtl; text-align:right;"><b>[${t.n}]</b><br>${t.i}</div>`);
    });

    map.on('mousemove', e => {
        document.getElementById('coords').innerText = `LAT: ${e.latlng.lat.toFixed(2)} | LNG: ${e.latlng.lng.toFixed(2)}`;
    });
}

function saveIntel() {
    const input = document.getElementById('intel-input');
    const note = input.value.trim();
    if(note) {
        const time = new Date().toLocaleTimeString();
        const entry = {time, note};
        let archive = JSON.parse(localStorage.getItem('yousif_archive') || '[]');
        archive.unshift(entry);
        localStorage.setItem('yousif_archive', JSON.stringify(archive));
        input.value = '';
        loadArchive();
        addLog(`> COMMIT SUCCESS: "${note}" saved to archive.`);
    }
}

function loadArchive() {
    const list = document.getElementById('saved-notes');
    const archive = JSON.parse(localStorage.getItem('yousif_archive') || '[]');
    list.innerHTML = archive.slice(0, 5).map(e => `<div>[${e.time}] ${e.note}</div>`).join('');
}

function addLog(msg) {
    const logs = document.getElementById('logs');
    const p = document.createElement('div');
    p.innerText = msg;
    logs.appendChild(p);
    logs.scrollTop = logs.scrollHeight;
}

function initLogs() {
    const startMsgs = ["> Booting Yousif-Monitor v4.0.0...", "> Sat-Link Established...", "> Scanning Middle East Sector...", "> 55 Strategic targets locked."];
    startMsgs.forEach((m, i) => setTimeout(() => addLog(m), i * 1000));
}

function toggleCombatMode() {
    document.body.classList.toggle('combat-mode');
    const btn = document.getElementById('defcon-btn');
    if(document.body.classList.contains('combat-mode')) {
        btn.innerText = "DEFCON 1";
        btn.style.background = "#da3633";
        triggerAlert("RED ALERT: High Tension Detected. Satellite monitoring maximized.");
    } else {
        btn.innerText = "DEFCON 5";
        btn.style.background = "#238636";
    }
}

function triggerAlert(msg) {
    document.getElementById('alert-message').innerText = msg;
    document.getElementById('emergency-alert').style.display = 'flex';
}

function closeAlert() { document.getElementById('emergency-alert').style.display = 'none'; }

function startClock() { setInterval(() => { document.getElementById('clock').innerText = new Date().toLocaleTimeString('en-GB'); }, 1000); }

function initTicker() {
    const txt = " • عاجل: رصد استنفار في قطاع أصفهان • يوسف خطاب صباح: مراقبة حقول الغاز بالخليج مستمرة • توتر على الحدود اللبنانية • ";
    document.getElementById('ticker-text').innerText = txt.repeat(10);
}

document.addEventListener('DOMContentLoaded', init);
