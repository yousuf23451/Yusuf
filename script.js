clipboard.writeText(reportTemplate).then(() => {
        showAlert("تم نسخ التقرير الرسمي للحافظة!");
        alert("تم توليد التقرير بنجاح:\n" + reportTemplate);
    });
}

// --- 5. الساعات والخريطة ---
function showAlert(msg) {
    let container = document.querySelector('.alert-container') || document.createElement('div');
    container.className = 'alert-container'; document.body.appendChild(container);
    const alert = document.createElement('div'); alert.className = 'intel-alert';
    alert.innerText = msg; container.appendChild(alert);
    setTimeout(() => alert.remove(), 4000);
}

setInterval(() => {
    const opts = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    document.getElementById('clock-baghdad').innerText = new Date().toLocaleTimeString('en-US', { ...opts, timeZone: 'Asia/Baghdad' });
    document.getElementById('clock-tehran').innerText = new Date().toLocaleTimeString('en-US', { ...opts, timeZone: 'Asia/Tehran' });
    document.getElementById('clock-washington').innerText = new Date().toLocaleTimeString('en-US', { ...opts, timeZone: 'America/New_York' });
}, 1000);

let map = L.map('map', { zoomControl: false }).setView([33.3152, 44.3661], 4);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);
L.circle([33.3152, 44.3661], { color: '#9333ea', radius: 100000, fillColor: '#9333ea', fillOpacity: 0.4 }).addTo(map).bindPopup("مركز عمليات يوسف الجراح");
