function scrollToSection(id){ document.getElementById(id).scrollIntoView({behavior:"smooth"}); }

// عرض الأخبار
function loadNews(){
  const container=document.getElementById("newsContainer");
  container.innerHTML="";
  events.forEach(e=>{
    const div=document.createElement("div");
    div.innerText="📡 "+e.title;
    container.appendChild(div);
  });
}

// مؤشر الحرب
function runWarIndex(){
  let risk=0;
  events.forEach(e=>{
    const t=e.title.toLowerCase();
    if(t.includes("war")) risk+=20;
    if(t.includes("missile")||t.includes("attack")) risk+=30;
    if(t.includes("tension")) risk+=15;
  });
  risk=Math.min(risk,100);
  document.getElementById("warResult").innerText="🔥 نسبة الخطر: "+risk+"%";
}

// التحليل الاستراتيجي
function runStrategy(){
  let score={escalation:0,diplomacy:0,stability:0};
  events.forEach(e=>{
    const t=e.title.toLowerCase();
    if(t.includes("attack")||t.includes("missile")) score.escalation+=30;
    if(t.includes("talk")||t.includes("agreement")) score.diplomacy+=20;
    if(t.includes("calm")) score.stability+=10;
  });
  let prediction="⚖️ استقرار";
  if(score.escalation>40) prediction="🔥 تصعيد عسكري";
  if(score.diplomacy>30) prediction="🤝 مفاوضات";
  document.getElementById("strategyContainer").innerHTML=`
    <p>🔥 التصعيد: ${score.escalation}</p>
    <p>🤝 الدبلوماسية: ${score.diplomacy}</p>
    <p>⚖️ الاستقرار: ${score.stability}</p>
    <h3>${prediction}</h3>`;
}

// التنبيهات
function loadAlerts(){
  const box=document.getElementById("alertsContainer");
  box.innerHTML="";
  events.forEach(e=>{
    if(e.type==="war"||e.type==="alert"){
      const div=document.createElement("div");
      div.innerText="🚨 "+e.title;
      div.style.color="red";
      div.style.fontWeight="bold";
      box.appendChild(div);
    }
  });
}

// الخريطة التفاعلية
function loadMap(){
  const map=L.map('map').setView([30,40],3);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap'}).addTo(map);
  events.forEach(e=>{
    if(e.lat&&e.lng){
      let iconUrl;
      if(e.type==="war") iconUrl="icons/war.png";
      else if(e.type==="peace") iconUrl="icons/peace.png";
      else iconUrl="icons/alert.png";
      const customIcon=L.icon({iconUrl:iconUrl,iconSize:[32,32]});
      L.marker([e.lat,e.lng],{icon:customIcon}).addTo(map).bindPopup(`🔥 ${e.title}`);
    }
  });
}

// تحديث الأخبار كل دقيقة
function autoUpdate(){
  loadNews();
  loadAlerts();
  runWarIndex();
  runStrategy();
  setTimeout(autoUpdate,60000);
}

// تشغيل تلقائي
loadNews();
loadAlerts();
loadMap();
runWarIndex();
runStrategy();
autoUpdate();
