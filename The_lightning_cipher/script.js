const CIPHER_PARTS = ['TA','RVO','LTH','UM','EL','DA','RI'];
const FULL_CIPHER  = 'TARVOLTHUM';
const SECRET_TEXT  =
    'Древняя расса полулюдей‑полуэльфов\n' +
    'под названием Эльдарии\n' +
    'спрятали могучую древнюю руну\n\n' +
    'Tar Volthum (Тар‑Вольтум)\n' +
    '«Печать первородной молнии»\n' +
	'Она находится в долине смерти\n' + 
	'В зонах обитания драконов';

const state = {
    completed : [false,false,false,false,false,false,false],
    musicMuted: false,
    musicReady: false,
};

const audio = document.getElementById('bg-music');

function initMusic() {
    const n = Math.floor(Math.random()*4)+1;
    audio.src    = `music${n}.mp3`;
    audio.volume = 0.32;
    audio.play().then(()=>{ state.musicReady=true; })
         .catch(()=>{ document.addEventListener('click',startMusicOnClick,{once:true}); });
}
function startMusicOnClick() { audio.play().catch(()=>{}); state.musicReady=true; }

document.getElementById('music-toggle').addEventListener('click',()=>{
    const btn=document.getElementById('music-toggle');
    const icon=document.getElementById('music-icon');
    if (state.musicMuted) {
        audio.muted=false; audio.volume=0.32;
        icon.src='https://cdn-icons-png.flaticon.com/512/727/727218.png';
        btn.classList.remove('muted'); state.musicMuted=false;
        if (!state.musicReady) audio.play().catch(()=>{});
    } else {
        audio.muted=true;
        icon.src='https://cdn-icons-png.flaticon.com/512/727/727249.png';
        btn.classList.add('muted'); state.musicMuted=true;
    }
});

function buildVisionSVG(type) {
    const w=320, h=220;
    const defs = `<defs>
      <filter id="glow${type}">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>`;

    const scenes = {
        temple: ()=>{
            let s=`<rect width="${w}" height="${h}" fill="#08061a"/>`;
            s+=`<rect x="0" y="160" width="${w}" height="60" fill="#0d0920"/>`;
            for(let i=0;i<18;i++) { const x=i*19,star=Math.random()>0.6; if(star) s+=`<circle cx="${x+Math.random()*15}" cy="${Math.random()*80}" r="1" fill="white" opacity="${0.3+Math.random()*0.5}"/>`; }
            s+=`<polygon points="110,60 160,60 170,160 100,160" fill="#1a1035"/>`;
            s+=`<polygon points="160,60 210,60 220,160 170,160" fill="#221540"/>`;
            s+=`<rect x="100" y="150" width="120" height="10" fill="#2a1a50"/>`;
            s+=`<rect x="80" y="158" width="160" height="8" fill="#321f5e"/>`;
            s+=`<rect x="90" y="164" width="12" height="36" fill="#1a1035"/>`;
            s+=`<rect x="118" y="164" width="12" height="36" fill="#1a1035"/>`;
            s+=`<rect x="170" y="164" width="12" height="36" fill="#1a1035"/>`;
            s+=`<rect x="198" y="164" width="12" height="36" fill="#1a1035"/>`;
            s+=`<rect x="142" y="110" width="16" height="50" fill="#120d28"/>`;
            s+=`<rect x="138" y="105" width="24" height="8" fill="#c9a22740"/>`;
            s+=`<text x="150" y="102" text-anchor="middle" fill="#c9a227" font-size="18" opacity="0.7" filter="url(#glow${type})">᛭</text>`;
            s+=`<rect x="0" y="168" width="320" height="4" fill="#c9a22715"/>`;
            for(let i=0;i<6;i++) { const x=30+i*45; s+=`<rect x="${x}" y="168" width="6" height="${8+Math.random()*20}" fill="#c9a22720"/>`; }
            return s;
        },
        ruins: ()=>{
            let s=`<rect width="${w}" height="${h}" fill="#06080f"/>`;
            s+=`<rect x="0" y="140" width="${w}" height="80" fill="#0a0c18"/>`;
            for(let i=0;i<20;i++) s+=`<circle cx="${Math.random()*320}" cy="${Math.random()*100}" r="${0.5+Math.random()}" fill="white" opacity="${0.2+Math.random()*0.4}"/>`;
            const cols=[40,80,130,190,240,280];
            cols.forEach((x,i)=>{
                const h2=40+Math.random()*70; const broken=Math.random()>0.5;
                s+=`<rect x="${x}" y="${140-h2}" width="18" height="${h2}" fill="${['#1a2030','#141825','#1e2535'][i%3]}"/>`;
                if(!broken) s+=`<rect x="${x-4}" y="${140-h2-8}" width="26" height="10" fill="#222b3a"/>`;
                s+=`<rect x="${x+3}" y="${140-h2+5}" width="4" height="${h2-10}" fill="#0d1020" opacity="0.5"/>`;
            });
            s+=`<rect x="0" y="140" width="320" height="6" fill="#1a2030"/>`;
            s+=`<rect x="60" y="148" width="200" height="6" fill="#151d2a" opacity="0.6"/>`;
            s+=`<text x="160" y="135" text-anchor="middle" fill="#00d4ff" font-size="12" opacity="0.3" filter="url(#glow${type})">ᚠ ᚢ ᚦ ᚨ</text>`;
            return s;
        },
        forest: ()=>{
            let s=`<rect width="${w}" height="${h}" fill="#040c08"/>`;
            for(let i=0;i<25;i++) s+=`<circle cx="${Math.random()*320}" cy="${Math.random()*120}" r="${0.5+Math.random()*1.5}" fill="#00ff8840" opacity="${0.2+Math.random()*0.4}"/>`;
            const trees=[20,55,90,130,165,205,245,280,305];
            trees.forEach((x,i)=>{
                const th=60+Math.random()*60; const tw=14+Math.random()*8;
                s+=`<rect x="${x}" y="${220-th}" width="${tw}" height="${th}" fill="${['#0a1f0a','#0d240d','#081808'][i%3]}"/>`;
                s+=`<polygon points="${x-15+tw/2},${220-th+5} ${x+tw/2},${220-th-30} ${x+25+tw/2},${220-th+5}" fill="${['#0f2e0f','#122d12','#0a200a'][i%3]}"/>`;
                s+=`<polygon points="${x-10+tw/2},${220-th-15} ${x+tw/2},${220-th-45} ${x+20+tw/2},${220-th-15}" fill="${['#153515','#183818','#102a10'][i%3]}"/>`;
                if(Math.random()>0.6) s+=`<circle cx="${x+tw/2+Math.random()*20-10}" cy="${220-th-20}" r="2" fill="#00ff88" opacity="${0.4+Math.random()*0.4}" filter="url(#glow${type})"/>`;
            });
            s+=`<rect x="0" y="210" width="320" height="10" fill="#081808"/>`;
            s+=`<circle cx="160" cy="60" r="25" fill="none" stroke="#00ff8830" stroke-width="1"/>`;
            s+=`<text x="160" y="65" text-anchor="middle" fill="#00ff88" font-size="14" opacity="0.25" filter="url(#glow${type})">᛭</text>`;
            return s;
        },
        stone: ()=>{
            let s=`<rect width="${w}" height="${h}" fill="#080608"/>`;
            for(let i=0;i<15;i++) s+=`<circle cx="${Math.random()*320}" cy="${Math.random()*80}" r="${0.5+Math.random()}" fill="white" opacity="${0.15+Math.random()*0.3}"/>`;
            const stones=[
                {x:100,y:130,w:20,h:60},{x:130,y:110,w:20,h:80},{x:165,y:125,w:20,h:65},
                {x:195,y:105,w:20,h:85},{x:130,y:106,w:65,h:10},
            ];
            stones.forEach(st=>{
                s+=`<rect x="${st.x}" y="${st.y}" width="${st.w}" height="${st.h}" fill="#252030"/>`;
                s+=`<rect x="${st.x}" y="${st.y}" width="3" height="${st.h}" fill="#302840" opacity="0.5"/>`;
                s+=`<rect x="${st.x}" y="${st.y}" width="${st.w}" height="3" fill="#352d45" opacity="0.5"/>`;
            });
            s+=`<rect x="0" y="190" width="320" height="30" fill="#181420"/>`;
            s+=`<circle cx="160" cy="160" r="50" fill="none" stroke="#7b2fbe30" stroke-width="1" stroke-dasharray="4,4"/>`;
            s+=`<circle cx="160" cy="160" r="70" fill="none" stroke="#c9a22720" stroke-width="1"/>`;
            for(let a=0;a<8;a++) {
                const angle=a*45*Math.PI/180;
                const x=160+70*Math.cos(angle), y=160+70*Math.sin(angle);
                s+=`<circle cx="${x}" cy="${y}" r="3" fill="#c9a227" opacity="0.3" filter="url(#glow${type})"/>`;
            }
            s+=`<text x="160" y="165" text-anchor="middle" fill="#7b2fbe" font-size="16" opacity="0.4" filter="url(#glow${type})">ᚱ</text>`;
            return s;
        },
        city: ()=>{
            let s=`<rect width="${w}" height="${h}" fill="#05080f"/>`;
            for(let i=0;i<20;i++) s+=`<circle cx="${Math.random()*320}" cy="${Math.random()*60}" r="${0.5+Math.random()}" fill="white" opacity="${0.2+Math.random()*0.5}"/>`;
            const buildings=[
                {x:10,y:80,w:35,h:120,c:'#0d1525'},{x:50,y:100,w:25,h:100,c:'#0a1020'},
                {x:80,y:60,w:40,h:140,c:'#0f1a2e'},{x:125,y:90,w:30,h:110,c:'#0d1525'},
                {x:160,y:50,w:45,h:150,c:'#121f35'},{x:210,y:75,w:35,h:125,c:'#0e1828'},
                {x:250,y:95,w:30,h:105,c:'#0a1020'},{x:285,y:70,w:35,h:130,c:'#0f1a2e'},
            ];
            buildings.forEach(b=>{
                s+=`<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="${b.c}"/>`;
                for(let wy=b.y+10;wy<b.y+b.h-10;wy+=18) {
                    for(let wx=b.x+5;wx<b.x+b.w-5;wx+=12) {
                        if(Math.random()>0.45) s+=`<rect x="${wx}" y="${wy}" width="6" height="8" fill="${Math.random()>0.7?'#c9a22740':'#1a2840'}"/>`;
                    }
                }
                s+=`<rect x="${b.x}" y="${b.y}" width="${b.w}" height="4" fill="#c9a22725"/>`;
            });
            s+=`<rect x="0" y="198" width="320" height="22" fill="#080e18"/>`;
            s+=`<rect x="0" y="195" width="320" height="5" fill="#c9a22715"/>`;
            return s;
        },
        cave: ()=>{
            let s=`<rect width="${w}" height="${h}" fill="#030208"/>`;
            s+=`<ellipse cx="160" cy="-10" rx="200" ry="130" fill="#0a0818"/>`;
            s+=`<ellipse cx="60" cy="220" rx="100" ry="60" fill="#0d0a20"/>`;
            s+=`<ellipse cx="260" cy="220" rx="90" ry="55" fill="#0a0818"/>`;
            for(let i=0;i<8;i++) {
                const x=Math.random()*320, size=15+Math.random()*40;
                s+=`<polygon points="${x},0 ${x-size/2},${size} ${x+size/2},${size}" fill="${['#0d0a20','#100c25','#0a0818'][i%3]}"/>`;
            }
            for(let i=0;i<6;i++) {
                const x=30+i*50; const size=20+Math.random()*30;
                s+=`<polygon points="${x},220 ${x-size/2},${220-size} ${x+size/2},${220-size}" fill="${['#0d0a20','#100c25'][i%2]}"/>`;
            }
            for(let i=0;i<12;i++) {
                const x=Math.random()*320, y=Math.random()*200;
                s+=`<circle cx="${x}" cy="${y}" r="${0.5+Math.random()*2}" fill="#7b2fbe" opacity="${0.2+Math.random()*0.5}" filter="url(#glow${type})"/>`;
            }
            s+=`<text x="160" y="120" text-anchor="middle" fill="#c9a227" font-size="22" opacity="0.2" filter="url(#glow${type})">᛭</text>`;
            return s;
        },
    };

    const keys = Object.keys(scenes);
    const scene = scenes[keys[type % keys.length]]();
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${defs}${scene}</svg>`;
}

let visionIndex = 0;
function spawnVision() {
    const container = document.getElementById('bg-visions-container');
    const div       = document.createElement('div');
    div.className   = 'bg-vision';

    const w = 280 + Math.random() * 120;
    const h = w * (220/320);
    const side = Math.random() > 0.5;
    const x    = side ? window.innerWidth*0.05 + Math.random()*window.innerWidth*0.2
                       : window.innerWidth*0.65 + Math.random()*window.innerWidth*0.2;
    const y    = window.innerHeight*0.1 + Math.random()*window.innerHeight*0.6;

    div.style.cssText = `width:${w}px;height:${h}px;left:${x}px;top:${y}px;`;
    div.innerHTML = buildVisionSVG(visionIndex++);
    container.appendChild(div);
    setTimeout(() => div.remove(), 12500);
}

function startVisionLoop() {
    spawnVision();
    setInterval(spawnVision, 9000 + Math.random()*4000);
}

/* ══════════════════════
   ЧАСТИЦЫ
══════════════════════ */
function createParticles() {
    const container = document.getElementById('particles-container');
    const imgUrls   = [
        'https://cdn-icons-png.flaticon.com/512/1828/1828884.png',
        'https://cdn-icons-png.flaticon.com/512/2910/2910791.png',
    ];
    for (let i=0;i<65;i++) {
        const el    = document.createElement('div');
        el.className = 'particle';
        const left  = Math.random()*100;
        const delay = Math.random()*18;
        const dur   = 12+Math.random()*16;
        const drift = (Math.random()-0.5)*220+'px';
        if (i%9===0) {
            const img=document.createElement('img');
            img.src=imgUrls[Math.floor(Math.random()*imgUrls.length)];
            img.style.cssText='width:100%;height:100%;object-fit:contain;filter:invert(1) sepia(1) saturate(3) hue-rotate(5deg);';
            el.appendChild(img);
            el.style.cssText=`width:13px;height:13px;left:${left}%;animation-duration:${dur}s;animation-delay:-${delay}s;--drift:${drift};opacity:0.16;background:transparent;`;
        } else {
            const size=Math.random()*3+1;
            const colors=['#c9a227','#f0c040','#7b2fbe','#00d4ff','#ffffff'];
            const col=colors[Math.floor(Math.random()*colors.length)];
            el.style.cssText=`width:${size}px;height:${size}px;left:${left}%;animation-duration:${dur}s;animation-delay:-${delay}s;--drift:${drift};background:${col};box-shadow:0 0 ${size*2}px ${col};`;
        }
        container.appendChild(el);
    }
}

/* ══════════════════════
   ЭКРАНЫ
══════════════════════ */
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    const el=document.getElementById(id);
    el.classList.add('active');
    el.scrollTop=0;
}
function openDecipherScreen() {
    if (!state.completed.every(Boolean)) {
        shakeEl(document.getElementById('decipher-btn'));
        toast('Сначала пройди все семь испытаний!','red');
        return;
    }
    document.getElementById('full-cipher-hint').textContent=`Подсказка: ${FULL_CIPHER}`;
    showScreen('decipher-screen');
}
function closeDecipherScreen() { showScreen('main-screen'); }
function resetToMain()         { showScreen('main-screen'); }

function updateMainUI() {
    CIPHER_PARTS.forEach((part,i)=>{
        const cp=document.getElementById(`cp${i+1}`);
        const gs=document.getElementById(`gs${i+1}`);
        const gr=document.getElementById(`gr${i+1}`);
        const card=document.getElementById(`game-card-${i+1}`);
        if (state.completed[i]) {
            cp.textContent=part; cp.classList.add('revealed');
            gs.textContent='ПРОЙДЕНО'; gs.className='game-status done';
            gr.textContent=part; card.classList.add('completed');
        }
    });
    const btn=document.getElementById('decipher-btn');
    const done=state.completed.filter(Boolean).length;
    if (state.completed.every(Boolean)) {
        btn.classList.remove('locked');
        btn.querySelector('span').textContent='РАСШИФРОВАТЬ';
    } else {
        btn.classList.add('locked');
        btn.querySelector('span').textContent=`ПРОЙДЕНО: ${done} / 7`;
    }
}

function winGame(idx) {
    if (state.completed[idx]) return;
    state.completed[idx]=true;
    updateMainUI();
    spawnWinParticles(document.getElementById(`game-card-${idx+1}`));
}

function spawnWinParticles(anchor) {
    const rect=anchor?anchor.getBoundingClientRect():{left:window.innerWidth/2,top:window.innerHeight/2,width:0,height:0};
    const cx=rect.left+rect.width/2, cy=rect.top+rect.height/2;
    for (let i=0;i<20;i++) {
        const el=document.createElement('div');
        const angle=(i/20)*Math.PI*2;
        const dist=55+Math.random()*85;
        el.style.cssText=`position:fixed;left:${cx}px;top:${cy}px;width:6px;height:6px;border-radius:50%;background:${['#c9a227','#f0c040','#00ff88'][i%3]};pointer-events:none;z-index:9999;`;
        document.body.appendChild(el);
        el.animate([
            {transform:'translate(-50%,-50%) scale(1)',opacity:1},
            {transform:`translate(calc(-50% + ${Math.cos(angle)*dist}px),calc(-50% + ${Math.sin(angle)*dist}px)) scale(0)`,opacity:0},
        ],{duration:820,easing:'ease-out',fill:'forwards'});
        setTimeout(()=>el.remove(),900);
    }
}

function openGame(n) {
    if (state.completed[n-1]) { toast('Это испытание уже пройдено!','red'); return; }
    document.getElementById(`modal-${n}`).classList.add('active');
    if (n===1) initLightning();
    if (n===2) initOracle();
    if (n===3) initRunes();
    if (n===4) initMemory();
    if (n===5) initCaesar();
    if (n===6) initAnagram();
    if (n===7) initMorse();
}
function closeModal(n) {
    document.getElementById(`modal-${n}`).classList.remove('active');
    if (n===1) stopLightning();
    if (n===3) runeIsPlaying=false;
}

function toast(text,type='green') {
    const d=document.createElement('div');
    const c=type==='red'?'#ff3355':'#00ff88';
    d.textContent=text;
    d.style.cssText=`position:fixed;top:72px;left:50%;transform:translateX(-50%);background:rgba(10,10,30,0.97);border:1px solid ${c};color:${c};padding:10px 22px;border-radius:28px;font-size:13px;letter-spacing:1px;z-index:9999;opacity:0;transition:opacity 0.3s;pointer-events:none;white-space:nowrap;`;
    document.body.appendChild(d);
    requestAnimationFrame(()=>{ d.style.opacity='1'; });
    setTimeout(()=>{ d.style.opacity='0'; setTimeout(()=>d.remove(),400); },2400);
}

function shakeEl(el) {
    const dirs=[-10,10,-8,8,-5,5,-2,2,0];
    let x=0;
    const iv=setInterval(()=>{ el.style.transform=`translateX(${dirs[x]}px)`; x++; if(x>=dirs.length){clearInterval(iv);el.style.transform='';} },70);
}

/* ══════════════════════════════
   ИГРА 1: МОЛНИЯ
══════════════════════════════ */
let lightningIv=null, needlePos=0, needleDir=1, needleSpeed=1.2;
let lightAttempts=3, lightDone=false;

function initLightning() {
    lightAttempts=3; lightDone=false; needlePos=0; needleDir=1; needleSpeed=1.2;
    document.getElementById('lightning-result').textContent='';
    document.getElementById('lightning-result').className='game-result';
    document.getElementById('lightning-btn').disabled=false;
    buildAttemptIcons('lightning-attempts',lightAttempts,'https://cdn-icons-png.flaticon.com/512/1828/1828884.png');
    stopLightning(); startLightningLoop();
}
function buildAttemptIcons(cid,count,src) {
    const c=document.getElementById(cid); c.innerHTML='';
    for(let i=0;i<count;i++){const img=document.createElement('img');img.src=src;img.className='attempt-icon';img.alt='a';c.appendChild(img);}
}
function updateAttemptIcons(cid,remaining) {
    document.querySelectorAll(`#${cid} .attempt-icon`).forEach((ic,i)=>{ if(i>=remaining)ic.classList.add('used');else ic.classList.remove('used'); });
}
function startLightningLoop() {
    lightningIv=setInterval(()=>{
        needlePos+=needleDir*needleSpeed;
        if(needlePos>=100){needlePos=100;needleDir=-1;}
        if(needlePos<=0){needlePos=0;needleDir=1;}
        const needle=document.getElementById('power-needle');
        const fill=document.getElementById('power-fill');
        const bolt=document.getElementById('bolt-img');
        if(needle) needle.style.left=needlePos+'%';
        if(fill)   fill.style.width=needlePos+'%';
        if(bolt){const s=0.7+(needlePos/100)*0.6;bolt.style.transform=`scale(${s})`;bolt.style.filter=`invert(1) sepia(1) saturate(${4+needlePos/20}) hue-rotate(-10deg) brightness(${0.9+needlePos/100})`;}
    },18);
}
function stopLightning() { clearInterval(lightningIv); }
function lightningStrike() {
    if(lightDone) return;
    const hit=needlePos>=40&&needlePos<=60;
    const res=document.getElementById('lightning-result');
    if(hit){
        lightDone=true; stopLightning();
        const n=document.getElementById('power-needle');
        if(n){n.style.background='var(--green)';n.style.boxShadow='0 0 14px var(--green)';}
        res.textContent='Молния остановлена! Первая часть шифра раскрыта!';
        res.className='game-result success';
        document.getElementById('lightning-btn').disabled=true;
        setTimeout(()=>{ winGame(0); closeModal(1); },1600);
    } else {
        lightAttempts--;
        updateAttemptIcons('lightning-attempts',lightAttempts);
        res.className='game-result fail';
        if(lightAttempts<=0){
            res.textContent='Все попытки исчерпаны. Перезапуск...';
            stopLightning(); document.getElementById('lightning-btn').disabled=true;
            setTimeout(initLightning,1800);
        } else {
            res.textContent=`Промах! Осталось попыток: ${lightAttempts}`;
            needleSpeed+=0.45;
        }
    }
}

/* ══════════════════════════════════════
   ИГРА 2: ВЗОР ОРАКУЛА — угадай число
══════════════════════════════════════ */
let oracleNumber=0, oracleAttempts=7, oracleDone=false;
const ORACLE_MAX_ATTEMPTS=7;

function initOracle() {
    oracleNumber   = Math.floor(Math.random()*20)+1;
    oracleAttempts = ORACLE_MAX_ATTEMPTS;
    oracleDone     = false;

    document.getElementById('oracle-result').textContent='';
    document.getElementById('oracle-result').className='game-result';
    document.getElementById('oracle-input').value='';
    document.getElementById('oracle-ball-msg').textContent='Загляни в шар...';
    document.getElementById('oracle-ball').className='oracle-ball';

    buildOracleGrid();
    buildOracleAttemptBar();
}

function buildOracleGrid() {
    const grid=document.getElementById('oracle-numbers-grid');
    grid.innerHTML='';
    for(let i=1;i<=20;i++){
        const cell=document.createElement('div');
        cell.className='oracle-num-cell';
        cell.textContent=i;
        cell.id=`oracle-num-${i}`;
        grid.appendChild(cell);
    }
}

function buildOracleAttemptBar() {
    const bar=document.getElementById('oracle-attempts-bar');
    bar.innerHTML='';
    for(let i=0;i<ORACLE_MAX_ATTEMPTS;i++){
        const dot=document.createElement('div');
        dot.className='oracle-attempt-dot';
        dot.id=`oracle-dot-${i}`;
        bar.appendChild(dot);
    }
}

function updateOracleAttemptBar() {
    for(let i=0;i<ORACLE_MAX_ATTEMPTS;i++){
        const dot=document.getElementById(`oracle-dot-${i}`);
        if(dot){
            if(i>=oracleAttempts) dot.classList.add('used');
            else dot.classList.remove('used');
        }
    }
}

function oracleGuess() {
    if(oracleDone) return;
    const input=document.getElementById('oracle-input');
    const guess=parseInt(input.value);
    const res=document.getElementById('oracle-result');
    const ball=document.getElementById('oracle-ball');
    const msg=document.getElementById('oracle-ball-msg');

    if(isNaN(guess)||guess<1||guess>20){
        msg.textContent='Введи число от 1 до 20!';
        ball.className='oracle-ball shake';
        setTimeout(()=>ball.className='oracle-ball',450);
        return;
    }

    oracleAttempts--;
    updateOracleAttemptBar();
    input.value='';

    if(guess===oracleNumber){
        oracleDone=true;
        const cell=document.getElementById(`oracle-num-${guess}`);
        if(cell) cell.className='oracle-num-cell correct';
        msg.textContent='✨ Оракул поражён! Ты угадал!';
        ball.style.boxShadow='0 0 50px rgba(0,255,136,0.6),0 0 100px rgba(0,255,136,0.3),inset 0 0 35px rgba(0,0,0,0.6)';
        ball.style.borderColor='rgba(0,255,136,0.6)';
        res.textContent='Шар открыл тайну! Вторая часть шифра раскрыта!';
        res.className='game-result success';
        setTimeout(()=>{ winGame(1); closeModal(2); },1800);
    } else {
        const tooLow=guess<oracleNumber;
        const cell=document.getElementById(`oracle-num-${guess}`);
        if(cell) cell.className=`oracle-num-cell ${tooLow?'too-low':'too-high'}`;

        if(tooLow){
            msg.textContent=`${guess} — слишком мало... Ищи выше!`;
            ball.className='oracle-ball pulse-up';
            ball.style.borderColor='rgba(255,136,0,0.5)';
            setTimeout(()=>{ ball.className='oracle-ball'; ball.style.borderColor=''; },550);
        } else {
            msg.textContent=`${guess} — слишком много... Ищи ниже!`;
            ball.className='oracle-ball pulse-down';
            ball.style.borderColor='rgba(255,51,85,0.5)';
            setTimeout(()=>{ ball.className='oracle-ball'; ball.style.borderColor=''; },550);
        }

        if(oracleAttempts<=0){
            res.textContent=`Попытки кончились! Загаданное число было ${oracleNumber}. Начинаем заново...`;
            res.className='game-result fail';
            msg.textContent='Шар закрыт...';
            setTimeout(initOracle,2500);
        } else {
            res.textContent='';
            res.className='game-result';
        }
    }
}

document.addEventListener('keydown',e=>{
    if(e.key==='Enter'){
        if(document.getElementById('modal-2').classList.contains('active')) oracleGuess();
        if(document.getElementById('modal-5').classList.contains('active')) checkCaesar();
        if(document.getElementById('modal-7').classList.contains('active')) checkMorse();
    }
});

/* ══════════════════════════════
   ИГРА 3: ПОРЯДОК РУН
══════════════════════════════ */
let runeSeq=[], runeUser=[], runeStep=0, runeLevel=0;
const RUNE_MAX=5;
let runeIsPlaying=false, runeDone=false;

function initRunes() {
    runeSeq=[]; runeStep=0; runeLevel=0; runeDone=false; runeIsPlaying=false;
    document.getElementById('rune-status').textContent='Нажми НАЧАТЬ';
    document.getElementById('rune-result').textContent='';
    document.getElementById('rune-result').className='game-result';
    document.getElementById('rune-start-btn').disabled=false;
    document.getElementById('rune-progress-fill').style.width='0%';
}
function startRuneGame() {
    if(runeDone) return;
    document.getElementById('rune-start-btn').disabled=true;
    runeLevel=0; runeSeq=[]; nextRuneLevel();
}
function nextRuneLevel() {
    runeLevel++; runeUser=[]; runeStep=0;
    document.getElementById('rune-progress-fill').style.width=((runeLevel-1)/RUNE_MAX*100)+'%';
    runeSeq.push(Math.floor(Math.random()*4));
    document.getElementById('rune-status').textContent=`Уровень ${runeLevel}/${RUNE_MAX} — запоминай...`;
    runeIsPlaying=true; playRuneSeq(0);
}
function playRuneSeq(i) {
    if(i>=runeSeq.length){ runeIsPlaying=false; document.getElementById('rune-status').textContent=`Уровень ${runeLevel}/${RUNE_MAX} — твоя очередь!`; return; }
    setTimeout(()=>{ flashRune(runeSeq[i],false); setTimeout(()=>playRuneSeq(i+1),750); },500);
}
function flashRune(id,isErr) {
    const btn=document.getElementById(`rune-${id}`);
    btn.classList.add(isErr?'error':'active');
    setTimeout(()=>btn.classList.remove(isErr?'error':'active'),480);
}
function runeClick(id) {
    if(runeIsPlaying||runeDone) return;
    if(!document.getElementById('rune-start-btn').disabled) return;
    flashRune(id,false); runeUser.push(id);
    if(runeUser[runeStep]!==runeSeq[runeStep]){
        flashRune(id,true);
        document.getElementById('rune-status').textContent='Неверная руна! Начинаем сначала...';
        setTimeout(()=>{ runeSeq=[]; runeLevel=0; document.getElementById('rune-progress-fill').style.width='0%'; document.getElementById('rune-start-btn').disabled=false; document.getElementById('rune-status').textContent='Нажми НАЧАТЬ'; },1500);
        return;
    }
    runeStep++;
    if(runeStep>=runeSeq.length){
        if(runeLevel>=RUNE_MAX){
            runeDone=true;
            document.getElementById('rune-progress-fill').style.width='100%';
            const res=document.getElementById('rune-result');
            res.textContent='Все руны повторены! Третья часть шифра твоя!';
            res.className='game-result success';
            setTimeout(()=>{ winGame(2); closeModal(3); },1600);
        } else {
            document.getElementById('rune-status').textContent=`Уровень ${runeLevel} пройден!`;
            setTimeout(nextRuneLevel,900);
        }
    }
}

/* ══════════════════════════════
   ИГРА 4: ЗЕРКАЛО ПАМЯТИ
══════════════════════════════ */
const MEM_SYMS=['ᚠ','ᚢ','ᚦ','ᚨ','ᚱ','ᚲ','ᚷ','ᚹ'];
let memCards=[], memFlipped=[], memMatched=0, memLocked=false, memDone=false;

function initMemory() {
    memMatched=0; memFlipped=[]; memLocked=false; memDone=false;
    document.getElementById('memory-result').textContent='';
    document.getElementById('memory-result').className='game-result';
    document.getElementById('memory-status').textContent='Открой первую руну';
    const pairs=[...MEM_SYMS,...MEM_SYMS].sort(()=>Math.random()-0.5);
    const grid=document.getElementById('memory-grid');
    grid.innerHTML=''; memCards=[];
    pairs.forEach((sym,idx)=>{
        const card=document.createElement('div');
        card.className='memory-card'; card.dataset.symbol=sym; card.dataset.idx=String(idx);
        const back=document.createElement('div'); back.className='memory-card-back';
        const bi=document.createElement('img'); bi.src='https://cdn-icons-png.flaticon.com/512/3588/3588294.png'; bi.alt='h';
        back.appendChild(bi);
        const front=document.createElement('div'); front.className='memory-card-front'; front.textContent=sym;
        card.appendChild(back); card.appendChild(front);
        card.onclick=()=>memClick(card,idx);
        grid.appendChild(card);
        memCards.push({el:card,sym,idx,matched:false,flipped:false});
    });
}
function memClick(card,idx) {
    if(memLocked||memDone) return;
    const mc=memCards[idx];
    if(mc.matched||mc.flipped) return;
    if(memFlipped.length>=2) return;
    revealMem(mc); memFlipped.push(mc);
    if(memFlipped.length===2){
        memLocked=true;
        const [a,b]=memFlipped;
        if(a.sym===b.sym){
            a.matched=true; b.matched=true;
            a.el.classList.add('matched'); b.el.classList.add('matched');
            memMatched++; memFlipped=[]; memLocked=false;
            document.getElementById('memory-status').textContent=`Найдено пар: ${memMatched} / ${MEM_SYMS.length}`;
            if(memMatched>=MEM_SYMS.length){
                memDone=true;
                const res=document.getElementById('memory-result');
                res.textContent='Все пары найдены! Четвёртая часть шифра открыта!';
                res.className='game-result success';
                setTimeout(()=>{ winGame(3); closeModal(4); },1600);
            }
        } else {
            a.el.classList.add('wrong-flash'); b.el.classList.add('wrong-flash');
            setTimeout(()=>{ hideMem(a); hideMem(b); a.el.classList.remove('wrong-flash'); b.el.classList.remove('wrong-flash'); memFlipped=[]; memLocked=false; },900);
        }
    }
}
function revealMem(mc){ mc.flipped=true; mc.el.classList.add('flipped'); mc.el.querySelector('.memory-card-back').style.display='none'; mc.el.querySelector('.memory-card-front').style.display='flex'; }
function hideMem(mc){ mc.flipped=false; mc.el.classList.remove('flipped'); mc.el.querySelector('.memory-card-back').style.display='flex'; mc.el.querySelector('.memory-card-front').style.display='none'; }

/* ══════════════════════════════
   ИГРА 5: ШИФР ЦЕЗАРЯ
══════════════════════════════ */
const RU_ALPHA='АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
const CAESAR_PUZZLES=[
    {word:'ЭЛЬДАРИИ', shift:3, hint:'Имя народа, хранящего тайну'},
    {word:'Передвижная станция', shift:5, hint:'Что такое станция класса «Нексус-Омега»?'},
    {word:'СОВЕТ Q5',   shift:7, hint:'Кто основал галактическую федерацию?'},
    {word:'АНОМАЛИЯ', shift:4, hint:'Кем является СУБЪЕКТ: ВИКТОР по мнению галактической федерации?'},
    {word:'ГАЛАКТИЧЕСКАЯ КОРПОРАЦИЯ',  shift:6, hint:'Что такое HIPERCORP?'},
];
let caesarPuzzle=null, caesarShift=1, caesarAttempts=5, caesarDone=false;

function initCaesar() {
    caesarPuzzle=CAESAR_PUZZLES[Math.floor(Math.random()*CAESAR_PUZZLES.length)];
    caesarShift=1; caesarAttempts=5; caesarDone=false;
    document.getElementById('caesar-answer').value='';
    document.getElementById('caesar-result').textContent='';
    document.getElementById('caesar-result').className='game-result';
    buildAttemptIcons('caesar-attempts',caesarAttempts,'https://cdn-icons-png.flaticon.com/512/2910/2910756.png');
    document.getElementById('caesar-encrypted').textContent=caesarEncrypt(caesarPuzzle.word,caesarPuzzle.shift);
    document.getElementById('caesar-shift-display').textContent='1';
    buildAlphabetStrip(); updateCaesarPreview();
}
function caesarEncrypt(word,shift){ return word.split('').map(ch=>{ const i=RU_ALPHA.indexOf(ch); return i===-1?ch:RU_ALPHA[(i+shift)%RU_ALPHA.length]; }).join(''); }
function caesarDecrypt(word,shift){ return word.split('').map(ch=>{ const i=RU_ALPHA.indexOf(ch); return i===-1?ch:RU_ALPHA[(i-shift+RU_ALPHA.length)%RU_ALPHA.length]; }).join(''); }
function caesarShiftChange(delta){ if(caesarDone)return; caesarShift=((caesarShift-1+delta+RU_ALPHA.length)%RU_ALPHA.length)+1; document.getElementById('caesar-shift-display').textContent=caesarShift; updateCaesarPreview(); updateAlphabetStrip(); }
function updateCaesarPreview(){ const enc=document.getElementById('caesar-encrypted').textContent; document.getElementById('caesar-preview').textContent=caesarDecrypt(enc,caesarShift); }
function buildAlphabetStrip(){
    const cont=document.getElementById('alphabet-display'); cont.innerHTML='';
    RU_ALPHA.split('').forEach((ch,i)=>{
        const cell=document.createElement('div'); cell.className='alpha-cell'; cell.dataset.idx=String(i);
        const orig=document.createElement('span'); orig.className='alpha-orig'; orig.textContent=ch;
        const shifted=document.createElement('span'); shifted.className='alpha-shifted'; shifted.id=`alpha-s-${i}`; shifted.textContent=RU_ALPHA[(i+caesarShift)%RU_ALPHA.length];
        cell.appendChild(orig); cell.appendChild(shifted); cont.appendChild(cell);
    });
}
function updateAlphabetStrip(){ RU_ALPHA.split('').forEach((_,i)=>{ const el=document.getElementById(`alpha-s-${i}`); if(el)el.textContent=RU_ALPHA[(i+caesarShift)%RU_ALPHA.length]; }); }
function checkCaesar(){
    if(caesarDone)return;
    const answer=document.getElementById('caesar-answer').value.trim().toUpperCase();
    const res=document.getElementById('caesar-result');
    if(!answer){res.textContent='Введи расшифрованное слово!';res.className='game-result fail';return;}
    if(answer===caesarPuzzle.word){
        caesarDone=true;
        res.textContent=`Верно! Слово «${caesarPuzzle.word}» — сдвиг был ${caesarPuzzle.shift}. Пятая часть шифра твоя!`;
        res.className='game-result success';
        setTimeout(()=>{ winGame(4); closeModal(5); },1800);
    } else {
        caesarAttempts--; updateAttemptIcons('caesar-attempts',caesarAttempts);
        if(caesarAttempts<=0){
            res.textContent=`Слово было «${caesarPuzzle.word}», сдвиг ${caesarPuzzle.shift}. Начинаем заново...`;
            res.className='game-result fail';
            setTimeout(initCaesar,2200);
        } else {
            res.textContent=`Неверно. Подсказка: ${caesarPuzzle.hint}. Попыток: ${caesarAttempts}`;
            res.className='game-result fail';
        }
        shakeEl(document.getElementById('caesar-answer'));
    }
}

/* ══════════════════════════════
   ИГРА 6: АНАГРАММА
══════════════════════════════ */
const ANAGRAM_PUZZLES=[
    {word:'ЭЛЬДАРИИ', hint:'Имя народа хранителей. 8 букв.'},
    {word:'ДРОН',hint:'Кто такая Син/Синесса? 4 буквы.'},
    {word:'ДРАКОН', hint:'Что защищает силу первородной молнии (Руну). 6 букв.'},
    {word:'9000',hint:'Сколько лет печать сдерживала владыку тьмы Албиоса?. 4 цифры.'},
];
let anagramRound=0, anagramWord='', anagramSelected=[], anagramDone=false;

function initAnagram(){ anagramRound=0; anagramDone=false; anagramSelected=[]; document.getElementById('anagram-result').textContent=''; document.getElementById('anagram-result').className='game-result'; nextAnagramRound(); }
function nextAnagramRound(){
    if(anagramDone)return;
    anagramRound++; anagramSelected=[];
    document.getElementById('anagram-round-info').textContent=`Слово ${anagramRound} / ${ANAGRAM_PUZZLES.length}`;
    document.getElementById('anagram-result').textContent='';
    document.getElementById('anagram-result').className='game-result';
    document.getElementById('anagram-assembled').textContent='';
    const puzzle=ANAGRAM_PUZZLES[anagramRound-1];
    anagramWord=puzzle.word;
    document.getElementById('anagram-hint').textContent=puzzle.hint;
    const letters=anagramWord.split('').sort(()=>Math.random()-0.5);
    const cont=document.getElementById('anagram-letters'); cont.innerHTML='';
    letters.forEach((ch,i)=>{
        const btn=document.createElement('div'); btn.className='anagram-letter-btn'; btn.textContent=ch; btn.dataset.idx=String(i); btn.dataset.letter=ch;
        btn.onclick=()=>anagramLetterClick(btn);
        cont.appendChild(btn);
    });
}
function anagramLetterClick(btn){ if(btn.classList.contains('used'))return; btn.classList.add('used'); anagramSelected.push({btn,letter:btn.dataset.letter}); document.getElementById('anagram-assembled').textContent=anagramSelected.map(s=>s.letter).join(''); }
function anagramClear(){ anagramSelected.forEach(s=>s.btn.classList.remove('used')); anagramSelected=[]; document.getElementById('anagram-assembled').textContent=''; document.getElementById('anagram-result').textContent=''; document.getElementById('anagram-result').className='game-result'; }
function checkAnagram(){
    const assembled=anagramSelected.map(s=>s.letter).join('');
    const res=document.getElementById('anagram-result');
    if(!assembled){res.textContent='Выбери буквы!';res.className='game-result fail';return;}
    if(assembled===anagramWord){
        res.textContent=`Верно! «${anagramWord}» собрано!`; res.className='game-result success';
        if(anagramRound>=ANAGRAM_PUZZLES.length){ anagramDone=true; res.textContent=`Все слова раскрыты! Шестая часть шифра твоя!`; setTimeout(()=>{ winGame(5); closeModal(6); },1600); }
        else setTimeout(nextAnagramRound,1300);
    } else {
        res.textContent=`Неверно! Слово из ${anagramWord.length} букв.`; res.className='game-result fail'; anagramClear();
    }
}

/* ══════════════════════════════
   ИГРА 7: МОРЗЕ
══════════════════════════════ */
const MORSE_CODE={А:'.-',Б:'-...',В:'.--',Г:'--.',Д:'-..',Е:'.',Ё:'.',Ж:'...-',З:'--..',И:'..',Й:'.---',К:'-.-',Л:'.-..',М:'--',Н:'-.',О:'---',П:'.--.',Р:'.-.',С:'...',Т:'-',У:'..-',Ф:'..-.',Х:'....',Ц:'-.-.',Ч:'---.',Ш:'----',Щ:'--.-',Ъ:'.--.-.',Ы:'-.--',Ь:'-..-',Э:'..-..',Ю:'..--',Я:'.-.-'};
const MORSE_WORDS=[
{word:'СТРОНОВИРУС'},
{word:'ВЛАДЫКА ТЬМЫ АЛБИОС'},
{word:'СИНЕССА ЭЛЛИОТТ'},
{word:'ДРЕВНИЙ НАРОД ПОЛУЭЛЬФОВ ЭЛЬДАРИИ'}
];

let morseRound=0, morseWord='', morseAttempts=3, morseDone=false, morseAudioCtx=null;

function initMorse(){ morseRound=0; morseDone=false; document.getElementById('morse-result').textContent=''; document.getElementById('morse-result').className='game-result'; document.getElementById('morse-answer').value=''; buildMorseTable(); nextMorseRound(); }

function buildMorseTable(){
    const cont=document.getElementById('morse-table'); cont.innerHTML='';
    Object.entries(MORSE_CODE).forEach(([letter,code])=>{
        const cell=document.createElement('div');
        cell.className='morse-cell';
        const l=document.createElement('span');
        l.className='morse-cell-letter';
        l.textContent=letter;
        const c=document.createElement('span');
        c.className='morse-cell-code';
        c.textContent=code;
        cell.appendChild(l);
        cell.appendChild(c);
        cont.appendChild(cell);
    });
}

function nextMorseRound(){
    if(morseDone)return;
    morseRound++; morseAttempts=3;
    document.getElementById('morse-round-info').textContent=`Слово ${morseRound} / ${MORSE_WORDS.length}`;
    document.getElementById('morse-result').textContent='';
    document.getElementById('morse-result').className='game-result';
    document.getElementById('morse-answer').value='';
    buildAttemptIcons('morse-attempts',morseAttempts,'https://cdn-icons-png.flaticon.com/512/3132/3132693.png');
    const puzzle=MORSE_WORDS[morseRound-1];
    morseWord=puzzle.word;
    document.getElementById('morse-signal').textContent=morseWord.split('').map(ch=>{
        if(ch===' ') return '/';
        return MORSE_CODE[ch]||'';
    }).join('  ');
}

function playMorseSound(){
    const btn=document.getElementById('morse-play-btn');
    if(btn.classList.contains('playing'))return;
    btn.classList.add('playing');
    try{ if(!morseAudioCtx) morseAudioCtx=new(window.AudioContext||window.webkitAudioContext)(); }catch(e){btn.classList.remove('playing');return;}
    const ctx=morseAudioCtx; const unit=0.12; let t=ctx.currentTime+0.05;
    morseWord.split('').forEach(ch=>{
        if(ch===' '){ t+=unit*7; return; }
        const code=MORSE_CODE[ch]||'';
        code.split('').forEach(sym=>{
            const osc=ctx.createOscillator();
            const gain=ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value=680;
            osc.type='sine';
            const dur=sym==='.'?unit:unit*3;
            gain.gain.setValueAtTime(0,t);
            gain.gain.linearRampToValueAtTime(0.4,t+0.01);
            gain.gain.linearRampToValueAtTime(0.4,t+dur-0.01);
            gain.gain.linearRampToValueAtTime(0,t+dur);
            osc.start(t);
            osc.stop(t+dur);
            t+=dur+unit;
        });
        t+=unit*2;
    });
    setTimeout(()=>btn.classList.remove('playing'),(t-ctx.currentTime)*1000+200);
}

function checkMorse(){
    if(morseDone)return;
    const answer=document.getElementById('morse-answer').value.trim().toUpperCase();
    const res=document.getElementById('morse-result');
    if(!answer){res.textContent='Введи расшифрованное слово!';res.className='game-result fail';return;}
    if(answer===morseWord){
        res.textContent=`Верно! Сигнал расшифрован: «${morseWord}»!`; res.className='game-result success';
        if(morseRound>=MORSE_WORDS.length){
            morseDone=true;
            res.textContent=`Все сигналы прочитаны! Седьмая часть шифра твоя!`;
            setTimeout(()=>{ winGame(6); closeModal(7); },1600);
        } else setTimeout(nextMorseRound,1300);
    } else {
        morseAttempts--;
        updateAttemptIcons('morse-attempts',morseAttempts);
        if(morseAttempts<=0){
            res.textContent=`Слово было «${morseWord}». Следующий сигнал...`;
            res.className='game-result fail';
            setTimeout(nextMorseRound,2000);
        } else {
            res.textContent=`Неверно! Используй таблицу. Попыток: ${morseAttempts}`;
            res.className='game-result fail';
            shakeEl(document.getElementById('morse-answer'));
        }
    }
}

/* ══════════════════════════════
   РАСШИФРОВКА
══════════════════════════════ */
function attemptDecipher(){
    const val=document.getElementById('cipher-input').value.trim().toUpperCase();
    const err=document.getElementById('decipher-error');
    if(!val){err.textContent='Введи шифр!';return;}
    if(val!==FULL_CIPHER){ err.textContent='Неверный шифр... Руны хранят молчание.'; shakeEl(document.getElementById('cipher-input')); return; }
    err.textContent=''; startDecipherAnimation();
}

function startDecipherAnimation(){
    const overlay=document.createElement('div'); overlay.className='scramble-overlay';
    const letDiv=document.createElement('div'); letDiv.className='scramble-letters';
    const chaos='АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЭЮЯELDARИТАРВОЛЬТУМᚠᚢᚦᚨᚱᚲ';
    for(let i=0;i<50;i++){
        const s=document.createElement('span'); s.className='scramble-char';
        s.textContent=chaos[Math.floor(Math.random()*chaos.length)];
        s.style.color=Math.random()>0.5?'#c9a227':'#7b2fbe';
        s.style.opacity=String(0.3+Math.random()*0.7);
        letDiv.appendChild(s);
    }
    overlay.appendChild(letDiv); document.body.appendChild(overlay);
    const iv1=setInterval(()=>{ letDiv.querySelectorAll('.scramble-char').forEach(el=>{ el.textContent=chaos[Math.floor(Math.random()*chaos.length)]; el.style.transform=`rotate(${(Math.random()-0.5)*28}deg) scale(${0.8+Math.random()*0.55})`; }); },85);
    setTimeout(()=>{
        clearInterval(iv1);
        const target=SECRET_TEXT.replace(/\n/g,' ').split('');
        while(letDiv.children.length<target.length){const s=document.createElement('span');s.className='scramble-char';s.textContent=chaos[Math.floor(Math.random()*chaos.length)];letDiv.appendChild(s);}
        while(letDiv.children.length>target.length)letDiv.removeChild(letDiv.lastChild);
        let revealed=0;
        const iv2=setInterval(()=>{
            letDiv.querySelectorAll('.scramble-char').forEach((el,i)=>{ if(i>=revealed){el.textContent=chaos[Math.floor(Math.random()*chaos.length)];el.style.color=Math.random()>0.5?'#c9a227':'#7b2fbe';el.style.transform='';} });
            if(revealed<target.length){const cur=letDiv.querySelectorAll('.scramble-char')[revealed];cur.textContent=target[revealed];cur.style.color='#f0e6d0';cur.style.transform='';revealed++;}
            else{clearInterval(iv2);setTimeout(()=>{overlay.style.transition='opacity 1s';overlay.style.opacity='0';setTimeout(()=>{overlay.remove();showFinalScreen();},1100);},2200);}
        },48);
    },2800);
}

function showFinalScreen(){ showScreen('final-screen'); spawnFinalParticles(); revealFinalText(); }
function spawnFinalParticles(){
    const cont=document.getElementById('rune-particles');
    for(let i=0;i<12;i++){
        setTimeout(()=>{
            const el=document.createElement('div');
            const angle=Math.random()*Math.PI*2; const dist=45+Math.random()*55;
            el.style.cssText=`position:absolute;left:50%;top:50%;width:6px;height:6px;border-radius:50%;background:var(--gold);pointer-events:none;`;
            cont.appendChild(el);
            el.animate([{transform:'translate(-50%,-50%) scale(1)',opacity:1},{transform:`translate(calc(-50% + ${Math.cos(angle)*dist}px),calc(-50% + ${Math.sin(angle)*dist}px)) scale(0)`,opacity:0}],{duration:1200,easing:'ease-out',fill:'forwards',delay:i*110});
            setTimeout(()=>el.remove(),1400);
        },i*120);
    }
}
function revealFinalText(){
    const cont=document.getElementById('reveal-text'); cont.innerHTML='';
    let delay=0;
    SECRET_TEXT.split('').forEach(ch=>{
        if(ch==='\n'){cont.appendChild(document.createElement('br'));return;}
        const sp=document.createElement('span'); sp.className='reveal-char'; sp.textContent=ch; sp.style.animationDelay=delay+'ms'; cont.appendChild(sp); delay+=48;
    });
}

document.getElementById('cipher-input').addEventListener('keydown',e=>{ if(e.key==='Enter')attemptDecipher(); });

window.addEventListener('DOMContentLoaded',()=>{
    createParticles();
    startVisionLoop();
    initMusic();
    updateMainUI();
    showScreen('main-screen');
});
