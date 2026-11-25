'use strict';
const savedSet = key => {
  try {return new Set(JSON.parse(localStorage.getItem(key)||'[]'));} catch {return new Set();}
};
const favorites=savedSet('radar.favorites'), comparison=savedSet('radar.comparison');
let screenPage=0,screenRequest=0,screenView='',screenFilters={},screenResult=null;
function persist(key,values){localStorage.setItem(key,JSON.stringify([...values]));}
function agentStage(label,busy=false){const node=$('agentStage');node.classList.toggle('working',busy);node.lastElementChild.textContent=label;}
function setTheme(value){document.documentElement.dataset.theme=value;document.getElementById('themeToggle').setAttribute('aria-checked',String(value==='dark'));}
setTheme(localStorage.getItem('radar.theme')==='dark'?'dark':'light');
document.getElementById('themeToggle').onclick=()=>{const value=document.documentElement.dataset.theme==='dark'?'light':'dark';setTheme(value);localStorage.setItem('radar.theme',value);};
const fields=[['name','Выпуск'],['issuer','Эмитент'],['id','ISIN / ID'],['kind','Тип'],['sector','Отрасль'],['ogrn','ОГРН'],['price','Цена, % ном.'],['ytm','Доходность, %'],['change','Δ цены, %'],['volume','Оборот'],['coupon','Купон на бумагу'],['currency','Валюта ном.'],['next_due','Ближайший платёж'],['maturity','Погашение'],['offer','Оферта'],['rating','Рейтинг'],['score','Индекс / 100'],['coverage','Полнота, %'],['event','Платёжное событие'],['day','Дата торгов']];
function cell(r,k){const v=r[k];if(k==='change'&&Number.isFinite(v))return '<span class="'+directionClass(v)+'">'+(v>0?'+':'')+fmt(v)+'</span>';return v==null||v===''?'—':typeof v==='number'?fmt(v):esc(v);}
function tableFor(rows){
  if(!rows.length)return '<p class="sub">Выпуски по выбранным условиям отсутствуют.</p>';
  return '<div class="tablewrap"><table><thead><tr><th>Выбор</th>'+fields.map(([,n])=>'<th>'+n+'</th>').join('')+'</tr></thead><tbody>'+rows.map(r=>'<tr><td><button aria-label="В избранное '+esc(r.id)+'" aria-pressed="'+favorites.has(r.id)+'" data-favorite="'+esc(r.id)+'">'+(favorites.has(r.id)?'★':'☆')+'</button><button aria-label="Сравнить '+esc(r.id)+'" aria-pressed="'+comparison.has(r.id)+'" data-compare="'+esc(r.id)+'">'+(comparison.has(r.id)?'✓':'+')+'</button></td>'+fields.map(([k])=>'<td>'+(k==='name'?'<button data-bond="'+esc(r.id)+'">'+cell(r,k)+'</button>':k==='event'&&r.event_url?link(r.event_url,r.event):k==='sector'&&r.sector_url?link(r.sector_url,r.sector):cell(r,k))+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
}
function picker(k,label,options){
  return '<label>'+label+'<select data-filter="'+k+'">'+options.map(([v,n])=>'<option value="'+esc(v)+'" '+((screenFilters[k]||'')===v?'selected':'')+'>'+esc(n)+'</option>').join('')+'</select></label>';
}
const options=(xs)=>[['','Все'],...xs.map(v=>[v,v])];
const levelColors={'Нет оценки':'#8195a6','Низкий':'#48bc91','Повышенный':'#e4aa4a','Высокий':'#e47370','Частичная оценка':'#7898b9'};
function breadth(r){
  return '<div class="level-distribution" aria-label="Распределение отфильтрованных выпусков">'+Object.entries(r.distribution).map(([name,n])=>'<button data-level="'+esc(name)+'" style="--level:'+levelColors[name]+'">'+esc(name)+' <b>'+fmt(n)+'</b></button>').join('')+'</div>';
}
function sectorMap(r){
  const levels=Object.keys(levelColors);
  const cells=new Map(r.heatmap.map(([s,l,n])=>[s+'|'+l,n]));
  return '<details><summary>Риск по отраслям</summary><div class="tablewrap"><table><thead><tr><th>Отрасль</th>'+levels.map(l=>'<th>'+esc(l)+'</th>').join('')+'</tr></thead><tbody>'+[...new Set(r.heatmap.map(v=>v[0]))].map(s=>'<tr><th>'+esc(s)+'</th>'+levels.map(l=>'<td style="border-bottom:2px solid '+levelColors[l]+'">'+fmt(cells.get(s+'|'+l)||0)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div></details>';
}
function matrix(points){
  if(!points.length)return '<p class="sub">Для выбранной группы нет совместных наблюдений доходности и экспертного индекса.</p>';
  const lo=Math.min(...points.map(p=>p[1])),hi=Math.max(...points.map(p=>p[1]));
  return '<svg viewBox="0 0 600 180" class="series-plot" role="img" aria-label="Доходность и экспертный индекс"><path d="M58 12V144H574" fill="none" stroke="currentColor"/><text x="2" y="18">'+fmt(hi)+'%</text><text x="2" y="145">'+fmt(lo)+'%</text><text x="60" y="170">0</text><text x="404" y="170">Индекс риска · 100</text>'+points.map(([x,y,id,name])=>'<circle role="button" tabindex="0" data-bond="'+esc(id)+'" aria-label="'+esc(name)+'" cx="'+(60+x*5.1)+'" cy="'+(140-(y-lo)/Math.max(.01,hi-lo)*126)+'" r="4" fill="#4eb5ad" opacity=".7"><title>'+esc(name)+' · '+fmt(y)+'% · '+fmt(x)+' / 100</title></circle>').join('')+'</svg>';
}
function screenParams(){
  const p=new URLSearchParams({...screenFilters,date:state.date,time:state.time,offset:String(screenPage*25)});
  if(screenView)p.set('ids',[...(screenView==='favorites'?favorites:comparison)].join(',')||'__empty__');
  return p;
}
function toolbar(r){
  const input=(key,label,type)=>'<label>'+label+'<input type="'+type+'" data-filter="'+key+'" value="'+esc(screenFilters[key]||'')+'"></label>';
  const views=[['','Все выпуски'],['favorites','Избранное · '+favorites.size],['compare','Сравнение · '+comparison.size]];
  return '<div class="screen-tools">'+views.map(([k,n])=>'<button type="button" class="outline" data-view="'+k+'" aria-pressed="'+(k===screenView)+'">'+n+'</button>').join('')+'<button class="textbtn" type="button" data-export>Скачать CSV</button></div><form id="screenFilters" class="filters">'+input('query','Название, ИНН, ОГРН или ISIN','search')+picker('kind','Тип инструмента',options(r.kinds))+picker('sector','Отрасль',options(r.sectors))+picker('status','Обращение',options(['В обращении','Архив','Нет сведений']))+picker('level','Индекс риска',options(Object.keys(levelColors)))+picker('event','Платёжное событие',options(r.events))+picker('rating','Рейтинг',options(r.ratings))+input('ymin','Доходность от, %','number')+input('ymax','Доходность до, %','number')+input('till','Погашение до','date')+picker('sort','Сортировка',[['','По обороту'],['score','По индексу риска'],['ytm','По доходности'],['maturity','По погашению'],['price','По цене'],['change','По изменению цены'],['name','По названию']])+picker('dir','Порядок',[['','По убыванию'],['asc','По возрастанию']])+'<button class="primary">Применить</button></form>';
}
async function refreshScreen(){
  const node=$('terminalBody'),version=++screenRequest;
  node.setAttribute('aria-busy','true');
  if(!node.innerHTML)node.innerHTML='<p class="sub">Сопоставляем выпуски и наблюдения…</p>';
  try{
    const r=await api('/api/screen?'+screenParams());if(version!==screenRequest)return;
    screenResult=r;
    node.innerHTML=toolbar(r)+'<p class="sub">'+fmt(r.count)+' выпусков по условиям отбора · '+dt(state.date)+'</p>'+breadth(r)+sectorMap(r)+tableFor(r.items)+'<div class="screen-tools"><button class="outline" data-pg="-1" '+(screenPage?'':'disabled')+'>Назад</button><span>'+fmt(screenPage+1)+' / '+Math.max(1,Math.ceil(r.count/25))+'</span><button class="outline" data-pg="1" '+((screenPage+1)*25>=r.count?'disabled':'')+'>Далее</button></div><details><summary>Матрица «Доходность — риск»</summary>'+matrix(r.matrix)+'</details><div id="watchInbox"></div>';
    node.querySelectorAll('input[type=number]').forEach(n=>n.step='any');
    $('screenFilters').onsubmit=e=>{e.preventDefault();screenFilters=Object.fromEntries([...e.target.querySelectorAll('[data-filter]')].map(n=>[n.dataset.filter,n.value]));screenPage=0;refreshScreen();};
    if(screenView==='favorites'){
      const p=screenParams();p.set('offset','0');p.set('export','1');
      const all=r.count>r.items.length?await api('/api/screen?'+p):r;
      if(version===screenRequest)await watchInbox(all.items,version);
    }
  }catch(e){if(version===screenRequest)node.textContent=e.message;}finally{if(version===screenRequest)node.removeAttribute('aria-busy');}
}
document.getElementById('screen').ontoggle=e=>{if(e.target.open)refreshScreen();};

function expertPanel(item){
  const r=item.expert;
  if(!r?.id)return '';
  const controls=Object.entries(item.weights).map(([k,w])=>{
    const block=r.blocks[k];
    return '<div class="weight"><label>'+esc(item.block_labels[k])+' <output>'+w+'</output><input type="range" min="0" max="100" value="'+w+'" data-weight="'+k+'" aria-label="Вес блока '+esc(item.block_labels[k])+'"></label><div>'+(block?'<strong>'+fmt(block.points,0)+' / 100</strong><p>'+esc(block.reason)+' '+link(block.url,dt(block.day))+'</p>':'<span class="sub">Нет наблюдений для оценки</span>')+'</div></div>';
  }).join('');
  return '<section class="panel expert" id="expert"><div class="section-head"><div><small>Экспертный индекс · 0–100</small><h2 id="expertValue">'+(r.score==null?'Недостаточно данных':fmt(r.score)+' / 100')+'</h2></div><span>'+esc(r.event)+'</span></div><p id="expertCoverage">Покрытие весов '+r.coverage+'% · '+esc(r.index_level||r.level)+' · Итоговая категория: '+esc(r.level)+(r.eligible?'':' · Методика предназначена для корпоративных выпусков нефинансовых эмитентов.')+'</p>'+(r.identity_url?'<p>'+link(r.identity_url,'Реквизиты эмитента · ОГРН '+r.ogrn)+'</p>':'')+'<details><summary>Вклад факторов и чувствительность</summary><p class="sub">Ползунки изменяют относительные веса в этом сценарии. Индекс равен взвешенному среднему наблюдаемых блоков. Для расчёта нужны два блока и покрытие от 50%. Предлагаемые веса экспертные.</p>'+controls+'<button class="outline" data-reset-weights>Вернуть исходные веса</button></details><div class="screen-tools"><button data-favorite="'+esc(r.id)+'" class="outline">'+(favorites.has(r.id)?'★ В избранном':'☆ В избранное')+'</button><button data-compare="'+esc(r.id)+'" class="outline">'+(comparison.has(r.id)?'✓ В сравнении':'+ Сравнить выпуск')+'</button></div></section>';
}
function sensitivity(){
  const sliders=[...document.querySelectorAll('[data-weight]')];let total=0,known=0,points=0,count=0;
  sliders.forEach(n=>{const w=Number(n.value);total+=w;n.previousElementSibling.value=w;
    const b=data.expert.blocks[n.dataset.weight];if(b&&w){known+=w;points+=b.points*w;count++;}});
  const enough=data.expert.eligible&&total&&known/total>=.5&&count>=2;
  $('expertValue').textContent=enough?fmt(points/known,1)+' / 100':'Недостаточно данных';
  $('expertCoverage').textContent='Сценарий весов · покрытие '+fmt(total?100*known/total:0,0)+'%.';
}
document.addEventListener('input',e=>{if(e.target.matches('[data-weight]'))sensitivity();});
document.addEventListener('click',e=>{if(e.target.closest('[data-reset-weights]')&&data){const root=$('expert');root.outerHTML=expertPanel(data);$('expert').querySelector('details').open=true;}});
function extraAnalytics(item){
  const yields=item.quotes.filter(r=>r.yield_close!=null).map(r=>[r.day,r.yield_close]);
  const ratings=item.events.filter(e=>e.kind==='Рейтинг');
  const charts=[['Доходность закрытия по данным биржи',yields,'% годовых'],['Расчётная премия к КБД',item.spreads||[],'б. п.']];
  const reports=(item.financials||[]).filter(r=>r.period.length===4).reverse();
  for(const [field,label] of [['net_leverage','Чистый долг / EBITDA'],['ocf','Операционный денежный поток'],['short_term_debt','Краткосрочный долг'],['long_term_debt','Долгосрочный долг']]){
    const latest=reports.filter(r=>r.metrics[field]).at(-1);if(!latest)continue;
    const unit=latest.metrics[field].unit;
    charts.push([label,reports.filter(r=>r.standard===latest.standard&&r.metrics[field]?.unit===unit).map(r=>[r.period+'-12-31',r.metrics[field].value]),unit]);
  }
  return '<section class="panel" id="issueSeries"><h3>Аналитика выпуска</h3>'+charts.map(([label,points,unit])=>'<details><summary>'+esc(label)+' · '+esc(unit)+'</summary>'+seriesPlot(points,label,unit)+(points.length?'<p class="sub">'+dt(points[0][0])+' — '+dt(points.at(-1)[0])+'</p>':'')+(label==='Расчётная премия к КБД'&&points.length?'<p class="sub">Доходность выпуска минус ставка КБД той же даты на срок дюрации. '+link('https://www.cbr.ru/hd_base/zcyc_params/','Банк России')+' · '+link('https://iss.moex.com/iss/history/engines/stock/markets/bonds/boards/TQCB/securities/'+encodeURIComponent(item.bond.secid)+'.json?from='+points[0][0]+'&till='+points.at(-1)[0],'Мосбиржа')+'</p>':'')+'</details>').join('')+
    '<details><summary>История рейтинговых действий · '+ratings.length+'</summary>'+ratings.map(e=>'<p>'+dt(e.published)+' · '+esc(e.agency)+' · '+esc(e.old||'—')+' → '+esc(e.new||'—')+' '+link(e.url,e.label)+'</p>').join('')+'</details>'+
    '<details><summary>Связи эмитента</summary><div class="relation"><strong>'+esc(item.bond.issuer_name)+'</strong><span>↓ эмитент выпусков</span>'+[item.bond,...item.shortlist].map(b=>'<button class="lightbtn" data-bond="'+esc(b.id)+'">'+esc(b.name)+'</button>').join('')+'</div></details>'+
    '<details id="timeCompare"><summary>Что изменилось после выбранной даты</summary><p class="sub">Последующие публикации и исходы открываются отдельно от оценки на дату.</p><button class="outline" data-later>Показать последующие события</button><div id="laterEvents"></div></details>'+
    '<details><summary>Динамика экспертного индекса</summary><button class="outline" data-trend>Рассчитать три среза</button><div id="indexTrend"></div></details></section>';
}
document.addEventListener('click',async e=>{
  const later=e.target.closest('[data-later]'),trend=e.target.closest('[data-trend]');if(!later&&!trend)return;
  const node=$(later?'laterEvents':'indexTrend'),view={...state};
  node.textContent='Подготавливаем датированные сведения…';
  try{
    if(later){
      if(view.date>=marketDay&&!view.time){node.textContent='Более поздняя дата анализа ещё не наступила.';return;}
      const after=await api('/api/bond?'+new URLSearchParams({...view,date:marketDay,time:''}));
      const boundary=view.date+'T'+(view.time?view.time+':59':'23:59:59');
      const events=[...after.documents.map(r=>[r.published,r.title,r.url]),...after.filings.map(r=>[r.published,r.title,r.url]),...after.registry.map(r=>[r.observed,r.status+' · '+r.kind+' · срок '+r.due,r.url]),...after.outcomes.map(o=>[o.published,o.kind+' · '+(o.late?'просрочка':'исполнено в срок'),o.url])];
      const unique=new Map(events.filter(([d])=>(d.length===10?d+'T23:59:59':d)>boundary).map(r=>[r[2],r]));
      node.innerHTML=[...unique.values()].sort((a,b)=>a[0].localeCompare(b[0])).map(([d,t,url])=>'<div class="docrow">'+dt(d)+' '+link(url,t)+'</div>').join('')||'Последующих подтверждений в архиве нет.';
    }else{
      const rows=[];
      for(const n of [90,30,0]){const date=dtadd(view.date,-n);const val=await api('/api/screen?'+new URLSearchParams({one:view.id,date,time:n?'':view.time}));rows.push([date,val.score]);}
      const points=rows.filter(p=>p[1]!=null);node.innerHTML=seriesPlot(points,'Экспертный индекс','баллы')+rows.map(([d,v])=>'<p>'+dt(d)+' · '+(v==null?'Недостаточно данных':fmt(v)+' / 100')+'</p>').join('');
    }
  }catch(err){node.textContent=err.message;}
});
async function watchInbox(rows,token){
  const notices=[];const at=state.date;
  const previous=JSON.parse(localStorage.getItem('radar.seen')||'{}');
  for(const r of rows){
    if(r.event.toLowerCase().includes('дефолт')||r.event==='Дефолт'||r.event.includes('просроч'))notices.push(r.name+' · '+r.event);
    if(r.next_due&&r.next_due<=dtadd(at,7))notices.push(r.name+' · платёж '+dt(r.next_due));
    const current={rating:r.rating,score:r.score,event:r.event,legal:r.blocks.legal?.day};
    if(state.mode==='live'&&at===marketDay&&!state.time){
      const old=previous[r.id];
      for(const [k,label] of [['rating','Рейтинг'],['score','Экспертный индекс'],['event','Платёжный статус'],['legal','Юридическое раскрытие']]){
        if(old&&old[k]!==current[k]&&current[k]!=null)notices.push(r.name+' · '+label+' · '+(old[k]??'—')+' → '+current[k]);
      }
      previous[r.id]=current;
    }
  }
  if(token!==screenRequest)return;
  if(state.mode==='live'&&at===marketDay&&!state.time){
    localStorage.setItem('radar.seen',JSON.stringify(previous));
    const saved=JSON.parse(localStorage.getItem('radar.notices')||'[]');
    const next=[...notices.map(msg=>({at,msg})),...saved];
    const unique=[...new Map(next.map(v=>[v.at+' '+v.msg,v])).values()].slice(0,100);
    localStorage.setItem('radar.notices',JSON.stringify(unique));
    notices.splice(0,notices.length,...unique.filter(v=>rows.some(r=>v.msg.startsWith(r.name+' · '))).map(v=>dt(v.at)+' · '+v.msg));
  }
  $('watchInbox').innerHTML='<h3>Уведомления по избранному</h3>'+(notices.length?notices.map(v=>'<p>'+esc(v)+'</p>').join(''):'<p class="sub">На этом срезе новых уведомлений нет.</p>');
}
async function exportScreen(){
  const p=screenParams();p.set('offset','0');p.set('export','1');
  const r=await api('/api/screen?'+p);
  const quoteCSV=v=>{let s=String(v??'');if(typeof v==='string'&&/^[=+\-@\t\r]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';};
  const rows=[fields.map(f=>f[1]),...r.items.map(v=>fields.map(([k])=>v[k]))];
  const url=URL.createObjectURL(new Blob(['\ufeff',rows.map(row=>row.map(quoteCSV).join(';')).join('\r\n')],{type:'text/csv;charset=utf-8'}));
  const a=document.createElement('a');a.href=url;a.download='default-radar-'+state.date+'.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);
}
document.addEventListener('click',e=>{
  const a=e.target.closest('button')?.dataset;if(!a)return;
  if('favorite' in a||'compare' in a){
    const fav='favorite' in a,set=fav?favorites:comparison,id=fav?a.favorite:a.compare;
    if(set.has(id))set.delete(id);else set.add(id);
    persist(fav?'radar.favorites':'radar.comparison',set);
    if($('screen').open)refreshScreen();if(data)render();
  }else if('view' in a){screenView=a.view;screenFilters={};screenPage=0;refreshScreen();}
  else if('pg' in a){screenPage+=Number(a.pg);refreshScreen();}
  else if('level' in a){screenFilters.level=a.level;screenPage=0;refreshScreen();}
  else if('export' in a)exportScreen().catch(e=>notice(e.message));
});

// A signed normal map bends the background at the curved rim. Neutral grey
// leaves the centre untouched, and the controls render above the optical layer.
(() => {
  const surfaces = document.querySelectorAll('.nav nav, #themeToggle, #askForm, .model-picker');
  const ns = 'http://www.w3.org/2000/svg';
  const element = name => document.createElementNS(ns, name);
  const svg = element('svg');
  svg.setAttribute('aria-hidden','true');
  svg.setAttribute('width','0');
  svg.setAttribute('height','0');
  svg.style.position='absolute';
  const defs = element('defs');
  svg.append(defs);
  document.body.append(svg);
  // All market cards share one filter. CSS clips its output to the rim,
  // including on cards inserted after a search, without observing scroll.
  const rim = element('filter');
  rim.id = 'market-glass-rim';
  rim.setAttribute('color-interpolation-filters', 'sRGB');
  const texture = element('feTurbulence');
  texture.setAttribute('type', 'fractalNoise');
  texture.setAttribute('baseFrequency', '0.017 0.035');
  texture.setAttribute('numOctaves', '1');
  texture.setAttribute('seed', '7');
  texture.setAttribute('result', 'refraction');
  const displace = element('feDisplacementMap');
  for (const [key, value] of Object.entries({in:'SourceGraphic', in2:'refraction', scale:18, xChannelSelector:'R', yChannelSelector:'G'})) {
    displace.setAttribute(key, value);
  }
  rim.append(texture, displace);
  defs.append(rim);
  for (const [index, surface] of Array.from(surfaces).entries()) {
    surface.classList.add('glass-lens');
    const filter = element('filter'), map = element('feImage'), bend = element('feDisplacementMap');
    filter.id='radar-lens-'+index;
    for (const [key,value] of Object.entries({x:0,y:0,width:'100%',height:'100%','color-interpolation-filters':'sRGB'})) filter.setAttribute(key,value);
    map.setAttribute('preserveAspectRatio','none');
    map.setAttribute('result','rim');
    for(const [key,value] of Object.entries({in:'SourceGraphic',in2:'rim',scale:14,xChannelSelector:'R',yChannelSelector:'G'})) bend.setAttribute(key,value);
    filter.append(map,bend);
    defs.append(filter);
    surface.style.setProperty('--lens-filter','url(#'+filter.id+')');
    new ResizeObserver(()=>{
      const w=surface.offsetWidth,h=surface.offsetHeight;
      if(!w||!h)return;
      const canvas=document.createElement('canvas');
      canvas.width=w;canvas.height=h;
      const ctx=canvas.getContext('2d'), image=ctx.createImageData(w,h);
      const r=Math.min(parseFloat(getComputedStyle(surface).borderRadius)||16,w/2,h/2);
      for(let y=0;y<h;y++)for(let x=0;x<w;x++){
        const dx=x+.5-w/2,dy=y+.5-h/2;
        const qx=Math.abs(dx)-w/2+r,qy=Math.abs(dy)-h/2+r;
        const a=Math.max(0,qx),b=Math.max(0,qy),length=Math.hypot(a,b);
        const depth=r-length-Math.min(Math.max(qx,qy),0);
        const intensity=Math.max(0,1-Math.abs(depth-2)/8);
        const nx=length?a/length:Number(qx>qy),ny=length?b/length:Number(qy>=qx);
        const i=(y*w+x)*4;
        image.data[i]=128+115*Math.sign(dx)*nx*intensity;
        image.data[i+1]=128+115*Math.sign(dy)*ny*intensity;
        image.data[i+3]=255;
      }
      ctx.putImageData(image,0,0);
      map.setAttribute('href',canvas.toDataURL());
    }).observe(surface);
  }
})();
