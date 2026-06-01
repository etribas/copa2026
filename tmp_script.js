
const n=(ini,fim)=>Array.from({length:fim-ini+1},(_,i)=>String(ini+i));
const GRUPOS=[
  {grupo:'Página inicial',secoes:[{nome:'FIFA World Cup',prefixo:'FWC',numeros:n(0,8)}]},
  {grupo:'Grupo A',secoes:[{nome:'México',prefixo:'MEX',numeros:n(1,20)},{nome:'África do Sul',prefixo:'RSA',numeros:n(1,20)},{nome:'Coréia do Sul',prefixo:'KOR',numeros:n(1,20)},{nome:'Rep. Tcheca',prefixo:'CZE',numeros:n(1,20)}]},
  {grupo:'Grupo B',secoes:[{nome:'Canadá',prefixo:'CAN',numeros:n(1,20)},{nome:'Bósnia',prefixo:'BIH',numeros:n(1,20)},{nome:'Catar',prefixo:'QAT',numeros:n(1,20)},{nome:'Suíça',prefixo:'SUI',numeros:n(1,20)}]},
  {grupo:'Grupo C',secoes:[{nome:'Brasil',prefixo:'BRA',numeros:n(1,20)},{nome:'Marrocos',prefixo:'MAR',numeros:n(1,20)},{nome:'Haiti',prefixo:'HAI',numeros:n(1,20)},{nome:'Escócia',prefixo:'SCO',numeros:n(1,20)}]},
  {grupo:'Grupo D',secoes:[{nome:'Estados Unidos',prefixo:'USA',numeros:n(1,20)},{nome:'Paraguai',prefixo:'PAR',numeros:n(1,20)},{nome:'Austrália',prefixo:'AUS',numeros:n(1,20)},{nome:'Turquia',prefixo:'TUR',numeros:n(1,20)}]},
  {grupo:'Grupo E',secoes:[{nome:'Alemanha',prefixo:'GER',numeros:n(1,20)},{nome:'Curaçao',prefixo:'CUW',numeros:n(1,20)},{nome:'Costa do Marfim',prefixo:'CIV',numeros:n(1,20)},{nome:'Equador',prefixo:'ECU',numeros:n(1,20)}]},
  {grupo:'Grupo F',secoes:[{nome:'Holanda',prefixo:'NED',numeros:n(1,20)},{nome:'Japão',prefixo:'JPN',numeros:n(1,20)},{nome:'Suécia',prefixo:'SWE',numeros:n(1,20)},{nome:'Tunísia',prefixo:'TUN',numeros:n(1,20)}]},
  {grupo:'Grupo G',secoes:[{nome:'Bélgica',prefixo:'BEL',numeros:n(1,20)},{nome:'Egito',prefixo:'EGY',numeros:n(1,20)},{nome:'Irã',prefixo:'IRN',numeros:n(1,20)},{nome:'Nova Zelândia',prefixo:'NZL',numeros:n(1,20)}]},
  {grupo:'Grupo H',secoes:[{nome:'Espanha',prefixo:'ESP',numeros:n(1,20)},{nome:'Cabo Verde',prefixo:'CPV',numeros:n(1,20)},{nome:'Arábia Saudita',prefixo:'KSA',numeros:n(1,20)},{nome:'Uruguai',prefixo:'URU',numeros:n(1,20)}]},
  {grupo:'Grupo I',secoes:[{nome:'França',prefixo:'FRA',numeros:n(1,20)},{nome:'Senegal',prefixo:'SEN',numeros:n(1,20)},{nome:'Iraque',prefixo:'IRQ',numeros:n(1,20)},{nome:'Noruega',prefixo:'NOR',numeros:n(1,20)}]},
  {grupo:'Grupo J',secoes:[{nome:'Argentina',prefixo:'ARG',numeros:n(1,20)},{nome:'Argélia',prefixo:'ALG',numeros:n(1,20)},{nome:'Áustria',prefixo:'AUT',numeros:n(1,20)},{nome:'Jordânia',prefixo:'JOR',numeros:n(1,20)}]},
  {grupo:'Grupo K',secoes:[{nome:'Portugal',prefixo:'POR',numeros:n(1,20)},{nome:'Congo',prefixo:'COD',numeros:n(1,20)},{nome:'Uzbequistão',prefixo:'UZB',numeros:n(1,20)},{nome:'Colômbia',prefixo:'COL',numeros:n(1,20)}]},
  {grupo:'Grupo L',secoes:[{nome:'Inglaterra',prefixo:'ENG',numeros:n(1,20)},{nome:'Croácia',prefixo:'CRO',numeros:n(1,20)},{nome:'Gana',prefixo:'GHA',numeros:n(1,20)},{nome:'Panamá',prefixo:'PAN',numeros:n(1,20)}]},
  {grupo:'Extras',secoes:[{nome:'FIFA World Cup History',prefixo:'FWC',numeros:n(9,19)},{nome:'Figurinhas da Coca-Cola',prefixo:'CC',numeros:n(1,14)}]}
];
const FLAGS={MEX:'mx',RSA:'za',KOR:'kr',CZE:'cz',CAN:'ca',BIH:'ba',QAT:'qa',SUI:'ch',BRA:'br',MAR:'ma',HAI:'ht',SCO:'gb-sct',USA:'us',PAR:'py',AUS:'au',TUR:'tr',GER:'de',CUW:'cw',CIV:'ci',ECU:'ec',NED:'nl',JPN:'jp',SWE:'se',TUN:'tn',BEL:'be',EGY:'eg',IRN:'ir',NZL:'nz',ESP:'es',CPV:'cv',KSA:'sa',URU:'uy',FRA:'fr',SEN:'sn',IRQ:'iq',NOR:'no',ARG:'ar',ALG:'dz',AUT:'at',JOR:'jo',POR:'pt',COD:'cd',UZB:'uz',COL:'co',ENG:'gb-eng',CRO:'hr',GHA:'gh',PAN:'pa'};
const GROUP_COLORS=['#155eef','#7a5af8','#dd2590','#eaaa08','#12b76a','#06aed4','#f79009','#f04438','#6172f3','#9e77ed','#17b26a','#2e90fa','#667085','#344054'];
const STORAGE_KEY='figurinhas-copa-2026-mobile-v4';
const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');
const state=new Set(saved);
const openTeams=new Set();
const closedTeams=new Set();
const stickers=GRUPOS.flatMap((g,ordemGrupo)=>g.secoes.flatMap((s,ordemSecao)=>s.numeros.map((numero,ordem)=>({id:`${s.prefixo}-${numero}`,grupo:g.grupo,secao:s.nome,prefixo:s.prefixo,numero,ordemGrupo,ordemSecao,ordem}))));
let activeGroup='Todos';
let sortMode = localStorage.getItem('figurinhas-sort-mode') || 'group';
const $=id=>document.getElementById(id);
const stickerLabel=x=>`${x.prefixo}${x.numero}`;
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function norm(v){return String(v||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function flagHtml(prefixo){const code=FLAGS[prefixo];return code?`<img class="flag" src="https://flagcdn.com/${code}.svg" alt="Bandeira ${prefixo}" loading="lazy">`:`<span class="flag placeholder">★</span>`}
function groupColor(grupo){const i=GRUPOS.findIndex(g=>g.grupo===grupo);return GROUP_COLORS[Math.max(0,i)%GROUP_COLORS.length]}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify([...state]));updateStats();renderTabs()}
function isDone(id){return state.has(id)}
function setDone(id,done){done?state.add(id):state.delete(id)}
function confirmBatch(msg){return confirm(msg||'Confirmar alteração em várias figurinhas?')}
function itemMatches(x,q){return !q||norm(x.grupo).includes(q)||norm(x.secao).includes(q)||norm(x.prefixo).includes(q)||norm(x.numero).includes(q)||norm(x.id).includes(q)||norm(`${x.prefixo} ${x.numero}`).includes(q)||norm(stickerLabel(x)).includes(q)}
function filteredItems(){const q=norm($('q').value);return stickers.filter(x=>(activeGroup==='Todos'||x.grupo===activeGroup)&&itemMatches(x,q))}
function allVisibleTeamKeys(){const q=norm($('q').value);const items=filteredItems();return GRUPOS.flatMap(g=>g.secoes.map(sec=>({g,sec}))).filter(({g,sec})=>(activeGroup==='Todos'||g.grupo===activeGroup)&&items.some(x=>x.grupo===g.grupo&&x.secao===sec.nome)).map(({g,sec})=>`${g.grupo}|${sec.prefixo}`)}
function renderTabs(){const tabs=['Todos',...GRUPOS.map(g=>g.grupo)];$('tabs').innerHTML=tabs.map(t=>`<button class="tab ${t===activeGroup?'active':''}" data-g="${esc(t)}">${esc(t)}</button>`).join('');document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{activeGroup=b.dataset.g;render();window.scrollTo({top:0,behavior:'smooth'})})}
function renderSortButtons(){if(!$('sortGroup'))return;$('sortGroup').classList.toggle('active',sortMode==='group');$('sortAlpha').classList.toggle('active',sortMode==='alpha')}
function setSortMode(mode){sortMode=mode;localStorage.setItem('figurinhas-sort-mode',mode);renderSortButtons();render()}
function syncSectionState(){document.querySelectorAll('details.team').forEach(d=>{const key=d.dataset.key;if(openTeams.has(key)||closedTeams.has(key))return;if(d.open){openTeams.add(key);closedTeams.delete(key)}else{openTeams.delete(key);closedTeams.add(key)}})}
function isTeamOpen(key, grupo, q){return closedTeams.has(key)?false:openTeams.has(key)||!!q||activeGroup!=='Todos'||grupo==='Página inicial'}
function render(){
  renderTabs();
  syncSectionState();
  const album=$('album');
  const q=norm($('q').value);
  album.innerHTML='';
  const itemsNow=filteredItems();
  let shown=0;

  if(sortMode==='alpha'){
    const sections = GRUPOS.filter(g=>activeGroup==='Todos'||g.grupo===activeGroup)
      .flatMap(g=>g.secoes.map(sec=>({grupo:g.grupo,sec})))
      .sort((a,b)=>a.sec.nome.localeCompare(b.sec.nome,'pt',{sensitivity:'base'}));

    sections.forEach(({grupo,sec})=>{
      const teamItems = itemsNow.filter(x=>x.secao===sec.nome);
      if(!teamItems.length) return;
      shown += teamItems.length;
      const col = teamItems.filter(x=>isDone(x.id)).length;
      const key = `${grupo}|${sec.prefixo}`;
      const d = document.createElement('details');
      d.className='team';
      d.dataset.key=key;
      d.open = isTeamOpen(key, grupo, q);
      d.ontoggle = ()=>{if(d.open){openTeams.add(key);closedTeams.delete(key)}else{openTeams.delete(key);closedTeams.add(key)}};
      d.innerHTML = `<summary><span class="team-title">${flagHtml(sec.prefixo)}<span class="team-name">${esc(sec.nome)}<small>${esc(sec.prefixo)}</small></span></span><span class="badge">${col}/${teamItems.length}</span></summary>`;
      const actions = document.createElement('div');
      actions.className='team-actions';
      actions.innerHTML = '<button>Marcar seção</button><button>Limpar seção</button>';
      actions.children[0].onclick = ()=>{if(!confirmBatch(`Marcar todas as ${teamItems.length} figurinhas de ${sec.nome}?`))return;teamItems.forEach(x=>setDone(x.id,true));save();render()};
      actions.children[1].onclick = ()=>{if(!confirmBatch(`Desmarcar todas as ${teamItems.length} figurinhas de ${sec.nome}?`))return;teamItems.forEach(x=>setDone(x.id,false));save();render()};
      d.appendChild(actions);
      const grid = document.createElement('div');
      grid.className='grid';
      teamItems.forEach(x=>{const b=document.createElement('button');b.className='sticker'+(isDone(x.id)?' done':'');b.innerHTML=`${esc(stickerLabel(x))}<small>${isDone(x.id)?'colada':'faltante'}</small>`;b.onclick=()=>{setDone(x.id,!isDone(x.id));save();render()};grid.appendChild(b)});
      d.appendChild(grid);
      album.appendChild(d);
    });
  } else {
    const groups = GRUPOS.filter(g=>activeGroup==='Todos'||g.grupo===activeGroup);
    groups.forEach(g=>{
      const groupItems = itemsNow.filter(x=>x.grupo===g.grupo);
      if(!groupItems.length) return;
      shown += groupItems.length;
      const gd = groupItems.filter(x=>isDone(x.id)).length;
      const head = document.createElement('div');
      head.className='group-head';
      head.style.borderLeft=`8px solid ${groupColor(g.grupo)}`;
      head.style.background=`linear-gradient(90deg, ${groupColor(g.grupo)}18, transparent)`;
      head.innerHTML=`<h2>${esc(g.grupo)} <span class="badge">${gd}/${groupItems.length}</span></h2><div class="group-actions"><button class="mini" data-a="mark">Marcar</button><button class="mini" data-a="clear">Limpar</button></div>`;
      head.querySelector('[data-a="mark"]').onclick=()=>{if(!confirmBatch(`Marcar todas as ${groupItems.length} figurinhas de ${g.grupo}?`))return;groupItems.forEach(x=>setDone(x.id,true));save();render()};
      head.querySelector('[data-a="clear"]').onclick=()=>{if(!confirmBatch(`Desmarcar todas as ${groupItems.length} figurinhas de ${g.grupo}?`))return;groupItems.forEach(x=>setDone(x.id,false));save();render()};
      album.appendChild(head);
      const sections = g.secoes;
      sections.forEach(sec=>{
        const teamItems=groupItems.filter(x=>x.secao===sec.nome);
        if(!teamItems.length) return;
        const col = teamItems.filter(x=>isDone(x.id)).length;
        const key = `${g.grupo}|${sec.prefixo}`;
        const d = document.createElement('details');
        d.className='team';
        d.dataset.key=key;
        d.open = isTeamOpen(key, g.grupo, q);
        d.ontoggle = ()=>{if(d.open){openTeams.add(key);closedTeams.delete(key)}else{openTeams.delete(key);closedTeams.add(key)}};
        d.innerHTML=`<summary><span class="team-title">${flagHtml(sec.prefixo)}<span class="team-name">${esc(sec.nome)}<small>${esc(sec.prefixo)}</small></span></span><span class="badge">${col}/${teamItems.length}</span></summary>`;
        const actions = document.createElement('div');
        actions.className='team-actions';
        actions.innerHTML = '<button>Marcar seção</button><button>Limpar seção</button>';
        actions.children[0].onclick = ()=>{if(!confirmBatch(`Marcar todas as ${teamItems.length} figurinhas de ${sec.nome}?`))return;teamItems.forEach(x=>setDone(x.id,true));save();render()};
        actions.children[1].onclick = ()=>{if(!confirmBatch(`Desmarcar todas as ${teamItems.length} figurinhas de ${sec.nome}?`))return;teamItems.forEach(x=>setDone(x.id,false));save();render()};
        d.appendChild(actions);
        const grid = document.createElement('div');
        grid.className='grid';
        teamItems.forEach(x=>{const b=document.createElement('button');b.className='sticker'+(isDone(x.id)?' done':'');b.innerHTML=`${esc(stickerLabel(x))}<small>${isDone(x.id)?'colada':'faltante'}</small>`;b.onclick=()=>{setDone(x.id,!isDone(x.id));save();render()};grid.appendChild(b)});
        d.appendChild(grid);
        album.appendChild(d);
      });
    });
  }

  if(!shown) album.innerHTML='<div class="empty-msg">Nenhuma figurinha encontrada.</div>';
  updateStats();
}
function updateStats(){const done=stickers.filter(x=>isDone(x.id)).length;const pct=Math.round(done/stickers.length*100);$('total').textContent=stickers.length;$('done').textContent=done;$('missing').textContent=stickers.length-done;$('pct').textContent=pct+'%';$('progressPill').textContent=pct+'% completo'}
function exportCsv(){const rows=[['id','grupo','secao','prefixo','numero','colada'],...stickers.map(x=>[x.id,x.grupo,x.secao,x.prefixo,x.numero,isDone(x.id)?1:0])];const csv=rows.map(r=>r.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\n');const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='figurinhas-copa-2026.csv';a.click();URL.revokeObjectURL(a.href)}
function parseLine(line){const out=[];let cur='',quoted=false;for(let i=0;i<line.length;i++){const ch=line[i],nx=line[i+1];if(ch==='"'&&quoted&&nx==='"'){cur+='"';i++}else if(ch==='"')quoted=!quoted;else if((ch===','||ch===';')&&!quoted){out.push(cur.trim());cur=''}else cur+=ch}out.push(cur.trim());return out.map(v=>v.replace(/^"|"$/g,'').replaceAll('""','"'))}
function importCsv(text){if(!confirmBatch('Importar CSV pode marcar ou desmarcar várias figurinhas. Continuar?'))return;const lines=text.split(/\r?\n/).filter(x=>x.trim());if(!lines.length)return;const h=parseLine(lines.shift()).map(norm);const id=h.indexOf('id'),pre=h.indexOf('prefixo'),num=h.indexOf('numero'),col=h.indexOf('colada');lines.forEach(line=>{const c=parseLine(line);let sid=id>=0?c[id]:'';if(!sid&&pre>=0&&num>=0)sid=`${c[pre]}-${c[num]}`;if(!stickers.some(x=>x.id===sid))return;setDone(sid,['1','sim','s','true','x','colada','yes','y'].includes(norm(c[col])))});save();render()}
function quickMark(){const txt=$('quick').value;const tokens=txt.split(/[,;\n]+/).map(x=>x.trim()).filter(Boolean);let count=0;tokens.forEach(t=>{const m=t.match(/^([a-zA-Z]{2,4})\s*-?\s*(\d{1,2})$/);if(!m)return;const sid=`${m[1].toUpperCase()}-${Number(m[2])}`;const item=stickers.find(x=>x.id===sid||`${x.prefixo}-${Number(x.numero)}`===sid);if(item){setDone(item.id,true);count++}});$('quick').value='';save();render();alert(count?`${count} figurinha(s) marcada(s).`:'Nenhuma figurinha encontrada. Exemplo: BRA1, FWC8')}
function buildPrint(){
  const allFwcMiss = stickers.filter(x=>x.prefixo==='FWC'&&!isDone(x.id)).map(x=>stickerLabel(x));
  let fwcRendered = false;
  const html = GRUPOS.map(g=>{
    const m = (g.grupo||'').match(/Grupo\s+([A-Z])/i);
    const groupLetter = m ? m[1].toUpperCase() : (g.grupo?g.grupo.charAt(0).toUpperCase():'');
    const rows = [];
    g.secoes.forEach(sec=>{
      if(sec.prefixo==='FWC'){
        if(fwcRendered) return;
        fwcRendered = true;
        const miss = allFwcMiss;
        rows.push(`<div class="print-row"><div class="print-team">FWC</div><div class="print-missing ${miss.length?'':'empty'}">${miss.length?esc(miss.join(' ')):'Completa'}</div></div>`);
        return;
      }
      const miss = stickers.filter(x=>x.grupo===g.grupo&&x.secao===sec.nome&&!isDone(x.id)).map(x=>stickerLabel(x));
      rows.push(`<div class="print-row"><div class="print-team">${esc(sec.nome)}</div><div class="print-missing ${miss.length?'':'empty'}">${miss.length?esc(miss.join(' ')):'Completa'}</div></div>`);
    });
    if(!rows.length) return '';
    return `<div class="print-group"><div class="group-letter">${esc(groupLetter)}</div><div class="group-rows">${rows.join('')}</div></div>`;
  }).join('');
  $('printArea').innerHTML=`<div class="print-title">Figurinhas faltantes — Copa 2026</div><p class="print-sub">Ordem por grupos. Gerado em ${new Date().toLocaleDateString('pt-BR')}.</p>${html}`
}
$('q').oninput=render;$('quickBtn').onclick=quickMark;$('quick').addEventListener('keydown',e=>{if(e.key==='Enter')quickMark()});$('exportCsv').onclick=exportCsv;$('importCsv').onchange=e=>{const f=e.target.files[0];if(f)f.text().then(importCsv);e.target.value=''};$('printMissing').onclick=()=>{buildPrint();window.print()};$('expandAll').onclick=()=>{const keys=allVisibleTeamKeys();keys.forEach(key=>{openTeams.add(key);closedTeams.delete(key)});render()};$('collapseAll').onclick=()=>{const keys=allVisibleTeamKeys();keys.forEach(key=>{openTeams.delete(key);closedTeams.add(key)});render()};$('sortGroup').onclick=()=>setSortMode('group');$('sortAlpha').onclick=()=>setSortMode('alpha');renderSortButtons();$('moreBtn').onclick=()=>{const a=prompt('Digite: 1 para marcar tudo, 2 para limpar tudo');if(a==='1'){if(!confirmBatch(`Marcar todas as ${stickers.length} figurinhas?`))return;stickers.forEach(x=>setDone(x.id,true));save();render()}if(a==='2'){if(!confirmBatch('Desmarcar todas as figurinhas?'))return;state.clear();save();render()}};

// register service worker for PWA
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('service-worker.js').then(reg=>{
    console.log('Service worker registered', reg);
  }).catch(err=>console.warn('Service worker failed', err));
}

// simple beforeinstallprompt handler (optional)
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // You could show a custom install button and call deferredPrompt.prompt() on click
});

render();
