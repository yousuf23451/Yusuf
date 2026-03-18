const channels = [
    { name: "الحدث العسكري", url: "https://live.alhadath.net/alhadath/index.m3u8" },
    { name: "الجزيرة مباشر", url: "https://live-hls-web-aje.akamaized.net/v1/master/d3918d360046637e6f66318c66914ed03698063a/aljazeera/arabic/main.m3u8" },
    { name: "RT NEWS", url: "https://rt-arab.akamaized.net/hls/ar/main.m3u8" },
    { name: "SKY NEWS", url: "https://snatv.akamaized.net/hls/live/2037130/snatv/index.m3u8" }
];

let isQuad = true;

function initSystem() {
    const grid = document.getElementById('video-grid');
    grid.innerHTML = '';

    channels.forEach((ch, i) => {
        grid.innerHTML += `
            <div class="relative group">
                <div class="absolute top-2 left-2 z-10 bg-black/80 text-[9px] p-1 border border-olive/50 text-olive font-bold uppercase tracking-widest">
                    Source: ${ch.name}
                </div>
                <video id="vid-${i}" class="video-js vjs-16-9 vjs-default-skin shadow-2xl" controls preload="auto">
                    <source src="${ch.url}" type="application/x-mpegURL">
                </video>
                <div class="absolute bottom-2 right-2 text-[8px] text-purple-500 font-mono opacity-0 group-hover:opacity-100 transition">
                    ENCRYPTION: AES-256 | Y.ALJARAH
                </div>
            </div>
        `;
        setTimeout(() => videojs(`vid-${i}`), 100);
    });
}

function toggleLayout() {
    const grid = document.getElementById('video-grid');
    isQuad = !isQuad;
    grid.className = isQuad ? "grid grid-cols-2 gap-3" : "grid grid-cols-1 gap-3";
}

// محاكي الخوارزمية لاستخراج العاجل من الصوت
function aiNewsEngine() {
    const feed = document.getElementById('news-feed');
    const alerts = [
        "رصد تحرك صاروخي من قواعد أصفهان الآن.",
        "صافرات الإنذار تطلق في قاعدة نيفاتيم الجوية.",
        "عاجل: انفجارات تسمع في ضواحي طهران.",
        "الخوارزمية ترصد تشويشاً على أنظمة الـ GPS في المنطقة."
    ];

    setInterval(() => {
        const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
        const time = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
        
        // إضافة الخبر الجديد في الأعلى
        const card = document.createElement('div');
        card.className = 'news-card animate-flicker';
        card.innerHTML = `
            <div class="flex justify-between items-center mb-1">
                <span class="text-purple-600 text-[9px] font-bold">AI SIGNAL</span>
                <span class="text-gray-600 text-[9px]">${time}</span>
            </div>
            <p class="text-[11px] leading-relaxed font-bold">${randomAlert}</p>
        `;
        feed.prepend(card);
        
        // تشغيل صوت الرادار عند كل عاجل جديد
        document.getElementById('radar-sound').play();
        
    }, 15000); // تحديث كل 15 ثانية
}

document.addEventListener('DOMContentLoaded', () => {
    initSystem();
    aiNewsEngine();
});
