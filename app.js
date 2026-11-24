'use strict';
const $ = id => document.getElementById(id);
const MAIN = 'RU000A10BB75', COMP = 'RU000A107C91';
const presets = ['2026-03-18','2026-03-19','2026-04-07','2026-04-08'];
const fmt = (v, digits=2) => v == null ? '—' : Number(v).toLocaleString('ru-RU',{maximumFractionDigits:digits});
const money = v => v == null ? 'Нет суммы' : fmt(v)+' ₽';
const dt = (v,year=true) => v ? new Date(v.slice(0,10)+'T12:00:00Z').toLocaleDateString('ru-RU',{day:'numeric',month:'short',...(year?{year:'numeric'}:{}),timeZone:'UTC'}).replace(' г.','') : '—';
const esc = v => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safe = url => {try{const u=new URL(url);return ['https:','http:'].includes(u.protocol)?esc(u.href):'#';}catch{return '#';}};
const link = (url,label,cls='') => '<a class="'+cls+'" href="'+safe(url)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+' ↗</a>';
const paths = {chart:'<path d="M3 3v17h18M6 14l4-5 4 3 5-7"/>',chat:'<path d="M4 4h16v12H9l-5 4z"/><path d="M8 8h8m-8 4h5"/>',search:'<circle cx="10" cy="10" r="6.5"/><path d="m15 15 5 5"/>',filter:'<path d="M3 6h7m4 0h7M3 12h11m4 0h3M3 18h3m4 0h11"/><circle cx="12" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="8" cy="18" r="2"/>',arrow:'<path d="M4 12h15m-6-6 6 6-6 6"/>',up:'<path d="M12 20V4m-7 7 7-7 7 7"/>',bond:'<path d="m3 13 6-8h12l-6 8zM3 17l4-5m0 7 4-5m0 7 4-5"/>',file:'<path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6m-6 4h6"/>',back:'<path d="M20 12H4m6-6-6 6 6 6"/>'};
const icon = k=>'<span class="ico"><svg viewBox="0 0 24 24" aria-hidden="true">'+(paths[k]||'')+'</svg></span>';
document.querySelectorAll('[data-i]').forEach(e=>e.innerHTML=icon(e.dataset.i));
const marketDay=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Moscow'}).format(new Date());
const initial={mode:'live',id:'',date:marketDay,tab:'market',period:30,horizon:90,week:'',event:'',point:'',section:'detail',time:'',board:'',specific:'',unit:'rub'};
function readState(){const p=new URLSearchParams(location.search);const view=Object.fromEntries(Object.entries(initial).map(([k,v])=>[k,p.get(k)||v]));if(view.mode==='demo'&&!p.has('date'))view.date='2026-11-24';return view;}
let state=readState(), data=null, stats=null, seq=0, searchSeq=0, offset=0, timer, loadingChat=false;
const chats=new Map();
const chatKey=()=>[state.mode,state.id,state.date,state.time].join('|');
const params=()=>new URLSearchParams(Object.entries(state).filter(([,v])=>v!=='' && v!=null));
function save(push=false){const url='?'+params();if(location.search!==url)history[push?'pushState':'replaceState']({},'',url);}
async function api(url,body){if(window.pagesRadar)return window.pagesRadar.request(url,body);const r=await fetch(url,body?{method:'POST',headers:{'Content-Type':'application/json','X-Radar':'1'},body:JSON.stringify(body)}:{});const d=await r.json();if(!r.ok)throw Error(d.error||'Сервер недоступен');return d;}
function notice(msg){$('notice').innerHTML=msg?'<div class="strip">'+esc(msg)+'</div>':'';}
function scrollToPart(id){requestAnimationFrame(()=>$(id)?.scrollIntoView({block:'start'}));}
function modal(title,html){$('modalTitle').textContent=title;$('modalBody').innerHTML=html;if(!$('modal').open)$('modal').showModal();}
function quitModal(){$('modal').close();}
function dtadd(day,n){const d=new Date(day+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);}
function fromDay(day){return Date.parse(day.slice(0,10)+'T12:00:00Z')/86400000;}
function tabs(){
  const chat=state.tab==='chat';
  $('market').classList.toggle('hide',chat);$('chat').classList.toggle('hide',!chat);
  document.querySelectorAll('[data-tab]').forEach(b=>{b.classList.toggle('active',b.dataset.tab===state.tab);b.setAttribute('aria-pressed',b.dataset.tab===state.tab);});
  $('pageTitle').textContent=chat?'Спросить агента':'Рынок облигаций';
  $('subtitle').textContent=chat?'Разбор выпуска с опорой на первоисточники':'Выпуски, платежи и кредитные события';
  $('asof').value=state.date;$('workMode').value=state.mode;
}
async function load(push=false){
  const token=++seq;save(push);tabs();notice(''); if($('screen').open)refreshScreen();
  $('marketHome').innerHTML='';
  if(!state.id){
    data=null;$('detail').innerHTML='';renderChat();
    try{const m=await api('/api/market?'+params());if(token!==seq)return;marketHome(m);notice('');if(!$('catalog').classList.contains('hide'))searchList();}catch(e){notice(e.message);}
    return;
  }
  try{const result=await api('/api/bond?'+params());if(token!==seq)return;data=result;render();refreshTape();extendChart(result);notice('');if(!$('catalog').classList.contains('hide'))searchList();}
  catch(e){if(token!==seq)return;data=null;$('detail').innerHTML='<p class="empty">Выберите другой выпуск или дату анализа.</p>';$('chatContext').textContent='Нет выпуска на эту дату';$('dialogue').innerHTML='';notice(e.message);}
}
function marketHome(m){
  const research=m.research;
  refreshTape([...m.series,...m.bonds]);
  const methodology=(research?'<details class="panel"><summary>Методика и результаты проверки прогноза</summary><p>Проверка на последующих выплатах показывает, сколько просрочек удалось выявить и сколько предупреждений оказались ложными.</p><p>Горизонт от 1 до '+research.lead_days+' дней. Модель проверяет рыночную цену рублёвых корпоративных облигаций перед выплатой. Виды обязательств в модели — '+Object.keys(research.variants).map(esc).join(', ').toLowerCase()+'.</p><div class="metrics">'+[
      ['Платежей с подтверждением',research.universe.n],['Своевременных',research.universe.ontime],['С просрочкой',research.universe.late],['Купонов в позднем тесте за 7 дней',research.test.n]].map(([k,v])=>'<div><small>'+k+'</small><strong>'+fmt(v)+'</strong></div>').join('')+'</div><details><summary>Результаты на более поздних купонах</summary><p>Обучение по документам до '+dt(research.cutoff)+'. Проверка по срокам с '+dt(research.test.first)+' по '+dt(research.test.last)+'. Сигнал сработал перед '+fmt(research.test.tp)+' из '+fmt(research.test.late)+' просрочек. Ложных тревог — '+fmt(research.test.fp)+' из '+fmt(research.test.ontime)+' своевременных платежей.</p><p>ROC AUC '+fmt(research.test.roc_auc,3)+' · у постоянного прогноза 0,5. Своевременные платежи в обучении подтверждены у '+fmt(research.train_performing_issuers)+' эмитентов. Частота просрочек в этой выборке отличается от рынка.</p><p>Правило «цена ≤ 90% номинала» предупредило '+fmt(research.price_rule.tp)+' просрочек при '+fmt(research.price_rule.fp)+' ложных тревогах.</p>'+research.examples.map(e=>'<div class="docrow"><div><strong>'+esc(e.name)+'</strong><small>'+dt(e.due)+' · '+esc(e.outcome)+'</small></div>'+link(e.url,'Исход')+' '+link(e.price_url,'Торги')+'</div>').join('')+'<p><a href="research/payments.csv" download="payment_outcomes.csv">Скачать историю выплат и результаты (CSV)</a></p></details></details>':'');
  $('marketHome').innerHTML=marketDashboard(m)+
    (research?'<details id="marketWatch" class="panel"><summary>Проверить ближайшие платежи по всему каталогу</summary><div aria-live="polite"></div></details>':'')+newsFeed(m)+methodology;
  const watch=$('marketWatch');
  if(watch)watch.ontoggle=async()=>{
    if(!watch.open||watch.dataset.loaded)return;
    const target=watch.querySelector('div');watch.dataset.loaded='1';target.textContent='Проверяем выпуски…';
    try{
      const w=await api('/api/watch?'+params());if(!watch.isConnected)return;
      target.innerHTML='<p>В горизонте семи дней '+fmt(w.payments)+' ближайших обязательств по '+fmt(w.issues)+' выпускам. Оценено '+fmt(w.scored)+', предупреждений '+fmt(w.alerts)+'.</p>'+
        w.rows.map(r=>'<div class="docrow"><div><button data-bond="'+esc(r.id)+'">'+esc(r.name)+'</button><small>'+esc(r.kind)+' · '+dt(r.due)+'</small></div><span>'+(r.alert?'Есть сигнал':'Без сигнала')+'</span></div>').join('')+
        Object.entries(w.skipped).map(([why,n])=>'<div class="lineitem"><span>'+esc(why)+'</span><b>'+fmt(n)+'</b></div>').join('');
    }catch(e){target.textContent=e.message;delete watch.dataset.loaded;}
  };
}
function forecastPanel(f){
  if(!f)return '';
  const text=f.state==='signal'?'<strong>'+(f.alert?'Обнаружен рыночный сигнал риска':'Порог предупреждения не достигнут')+'</strong><p>Закрытие '+dt(f.last)+' — '+fmt(f.close)+'% номинала. Изменение с '+dt(f.start)+' — '+fmt(f.change)+' п. п. '+link(f.url,'Торги MOEX')+'</p>':'<p>'+esc(f.reason)+'</p>';
  return '<article id="forecast" class="panel"><h3>Прогноз ближайшего платежа</h3>'+(f.due?'<p class="sub">'+esc(f.kind)+' · '+dt(f.due)+' · дата прогноза '+dt(f.anchor)+'</p>':'')+text+(f.state==='signal'?'<small>Экспериментальная модель раннего предупреждения. '+(f.retrospective?'Историческая симуляция. ':'')+'Калибровка вероятности для рынка отсутствует.</small>':'')+'</article>';
}
function outcomeList(){
  const items=(data.outcomes||[]).filter(r=>r.source!=='MOEX');
  if(!items.length)return '';
  return '<details class="panel registry-list"><summary>Подтверждённая история выплат · '+fmt(items.length)+'</summary><div>'+items.map(r=>'<div class="docrow"><div><b>'+dt(r.due)+' · '+esc(r.kind)+'</b><small>'+(r.late?'Просрочка':'В срок')+(r.actual?' · исполнение '+dt(r.actual):'')+'</small></div>'+link(r.url,r.source)+'</div>').join('')+'</div></details>';
}
function selectBond(id,specific=true){state={...state,id,tab:'market',point:'',week:'',event:'',board:'',section:'detail',specific:specific?'1':''};$('catalog').classList.add('hide');load(true).then(()=>scrollToPart('detail'));}
function setDate(day){state={...state,date:day,time:'',week:'',event:'',point:'',board:''};load(true);}
function sourceModal(){
  if(!stats)return;
  const logs=stats.refresh.map(x=>'<div class="docrow"><div>'+esc(x.source)+'<small>'+esc(x.error?'Последняя попытка завершилась ошибкой. '+x.error:'Сохранено '+(x.count??'—')+' записей')+'</small></div><small>'+esc(x.success?.replace('T',' ')||'нет успешной загрузки')+'</small></div>').join('');
  modal('Источники и покрытие','<p class="meta">Последний сохранённый набор. Счётчики охватывают все даты.</p><div class="metrics">'+[['Выпуски',stats.bonds],['С котировками',stats.quotes],['С календарём',stats.plans],['С подтверждёнными исходами',stats.outcome_bonds]].map(([k,v])=>'<div><small>'+k+'</small><strong>'+fmt(v)+'</strong></div>').join('')+'</div><p class="meta">Реестр дефолтов MOEX: '+fmt(stats.registry_records)+' записей. Связано с каталогом выпусков: '+fmt(stats.registry_bonds)+'.</p><h3 class="act">Обновления по источникам</h3>'+logs+'<p class="meta">ISS и RSS биржи обновляются командой загрузки. Исторические релизы агентств и эмитентов отобраны вручную. Telegram представлен ссылками на публикации. История платежей использует сообщения эмитентов в АК&amp;М, уведомления ПВО и реестр биржи. Финансовая отчётность и судебная история в прогноз пока не входят.</p>');
}
function timeline(){
  return '<div class="timeline"><strong>Исторический срез</strong>'+(state.id===MAIN?presets:[]).map(v=>'<button data-date="'+v+'" class="'+(state.date===v?'sel':'')+'">'+dt(v,false)+'</button>').join('')+('<label class="minor">Время МСК <input aria-label="Время среза" type="time" id="clock" value="'+esc(state.time||'')+'"></label>')+'</div>';
}
function statusLabel(){const recent=data.registry?.[0],outcome=data.outcomes?.[0];if(outcome&&(!data.payment||outcome.due>data.payment.date)&&(!recent||outcome.due>recent.due))return [(outcome.late?'Просрочка':'Выплата в срок')+' · '+dt(outcome.due,false),outcome.late?'red':'green'];if(recent && (!data.payment||recent.due>data.payment.date))return [recent.status+' · '+dt(recent.due,false),'red'];if(data.payment)return [data.payment.status,data.payment.status.includes('опозданием')?'amber':'green'];const ev=data.events.find(x=>x.kind==='Просрочка');return ev?['Нарушение срока','amber']:data.events.some(x=>x.kind==='Рейтинг')?['Есть рейтинговый сигнал','amber']:['Исполнение не подтверждено',''];}
function overview(){
  const b=data.bond,[label,color]=statusLabel(), next=data.next;
  return '<div class="panel"><div class="card-title"><div class="identity"><div class="emblem">'+icon('bond')+'</div><div><h2>'+esc(b.name)+'</h2><div class="mono">'+esc(b.isin||b.secid)+'</div></div></div><span class="badge '+color+'">'+esc(label)+'</span></div><div class="metrics">'+[
    ['Эмитент',b.issuer_name,b.inn?'ИНН '+b.inn:'ИНН не указан'],
    ['Номинал',b.nominal!=null?fmt(b.nominal)+' '+(cashCurrency(b.currency)):'—',b.nominal==null?'Нет данных на срез':'На одну облигацию'],
    ['Погашение',dt(b.maturity),b.maturity?'По параметрам выпуска':'Нет данных на срез'],
    ['Ближайший платёж',next?dt(next.date):'—',next?next.label:'Нет датированного графика']
  ].map(([k,v,n])=>'<div><small>'+esc(k)+'</small><strong>'+esc(v)+'</strong><small>'+esc(n)+'</small></div>').join('')+'</div><div class="sourcebar"><span>Срез на '+dt(state.date)+(state.time?' · '+esc(state.time):' · конец дня')+' МСК</span><div class="row-links">'+link(b.source,'Справочник выпуска')+'<button data-action="details">Реквизиты и режимы</button></div></div></div>';
}
function cashCurrency(c){return ['RUB','SUR','RUR'].includes(c)?'₽':c||'';}
function chartPrice(){
  const q=data.quotes,w=620,h=185,left=40,right=12,top=13,bottom=108,voltop=129,volbase=158;
  if(window.pagesRadar&&!q.length)return '<p class="empty">В опубликованном срезе нет сделок за выбранный период.</p>'+link(data.bond.source,'Открыть выпуск на бирже','lightbtn');
  if(!q.length)return '<p class="empty">Нет сохранённых сделок за выбранный период. Можно запросить историю у Московской биржи.</p><button class="outline" data-action="refresh">Загрузить историю и календарь</button>';
  const prices=q.map(p=>p.price),low=Math.min(...prices),high=Math.max(...prices),pad=Math.max(.04,(high-low)*.10), ymin=low-pad,ymax=high+pad;
  const start=fromDay(data.start),end=fromDay(state.date),x=d=>left+(fromDay(d)-start)/Math.max(1,end-start)*(w-left-right),y=v=>top+(ymax-v)/(ymax-ymin)*(bottom-top),maxvol=Math.max(...q.map(p=>p.volume??0),1);
  const grid=[0,.5,1].map(t=>{const yy=top+(bottom-top)*t;return '<path d="M'+left+' '+yy+'H'+(w-right)+'" stroke="#dce5e6" stroke-dasharray="3 4"/><text x="0" y="'+(yy+4)+'">'+fmt(ymax-(ymax-ymin)*t,1)+'</text>';}).join('');
  let segs=[],line=[];
  for(let i=0;i<q.length;i++){
    if(i&&fromDay(q[i].day)-fromDay(q[i-1].day)>1){segs.push(line);line=[];}
    line.push([x(q[i].day),y(q[i].price)]);
  }
  segs.push(line);
  const lines=segs.map(s=>'<polyline points="'+s.map(p=>p.join(',')).join(' ')+'" fill="none" stroke="#157c70" stroke-width="2.5" stroke-linejoin="round"/>').join('');
  const circles=q.map(p=>'<circle cx="'+x(p.day)+'" cy="'+y(p.price)+'" r="2.3" fill="#157c70"/>').join('');
  const barw=Math.max(2,Math.min(13,(w-left-right)/(end-start+1)*.56));
  const volumes=q.filter(p=>p.volume!=null).map(p=>{const height=p.volume/maxvol*(volbase-voltop);return '<rect x="'+(x(p.day)-barw/2)+'" y="'+(volbase-height)+'" width="'+barw+'" height="'+height+'" rx="1" fill="#8abeb4"/>';}).join('');
  const active=state.point&&q.find(v=>v.day===state.point);
  const markers=[...new Set(data.events.map(e=>e.published.slice(0,10)))].filter(d=>d>=data.start&&d<=state.date).map(d=>'<g role="button" tabindex="0" aria-label="Документы за '+d+'" data-marker="'+d+'"><path d="M'+x(d)+' '+top+'V'+bottom+'" stroke="#bc8946" stroke-dasharray="3 4"/><circle cx="'+x(d)+'" cy="'+top+'" r="7" fill="#d6a151"/><circle cx="'+x(d)+'" cy="'+top+'" r="2" fill="white"/></g>').join('');
  const hits=q.map(p=>'<circle tabindex="0" role="button" aria-label="'+dt(p.day)+', '+fmt(p.price)+' процентов" class="plotpoint" data-point="'+p.day+'" cx="'+x(p.day)+'" cy="'+y(p.price)+'" r="7" fill="transparent"><title>'+dt(p.day)+' · '+fmt(p.price)+'%</title></circle>').join('');
  return '<div class="chart-meta"><strong>'+fmt(q.at(-1).price)+' %</strong><span class="minor">закрытие · '+dt(q.at(-1).day,false)+'</span></div><div class="legend"><span><b class="dot"></b>Цена, % номинала</span><span><b class="dot" style="background:#8abeb4"></b>Оборот, млн '+esc(cashCurrency(q[0].currency))+'</span><span><b class="dot" style="background:#d6a151"></b>Публикация</span></div><svg class="chart" viewBox="0 0 '+w+' '+h+'" aria-label="История цены и оборота, нажмите на точку или отметку публикации">'+grid+lines+circles+volumes+'<text x="0" y="'+(voltop+5)+'">'+fmt(maxvol/1e6,1)+'</text><text x="0" y="'+volbase+'">0</text><path d="M'+left+' '+volbase+'H'+(w-right)+'" stroke="#dce5e6"/>'+[0,.5,1].map((t,i)=>'<text x="'+(left+(w-left-right)*t)+'" y="179" text-anchor="'+['start','middle','end'][i]+'">'+dt(dtadd(data.start,Math.round((end-start)*t)),false)+'</text>').join('')+hits+markers+'</svg>'+(q.length<5&&!window.pagesRadar?'<button class="textbtn" data-action="refresh">Обновить историю торгов →</button>':'')+(active?'<div class="inset">'+dt(active.day)+' · '+fmt(active.price)+'% · '+fmt(active.trades)+' сделок · оборот '+fmt(active.volume)+' '+esc(cashCurrency(active.currency))+'</div>':'');
}
function price(){
  const url=data.board?'https://iss.moex.com/iss/history/engines/stock/markets/bonds/boards/'+encodeURIComponent(data.board)+'/securities/'+encodeURIComponent(data.bond.secid)+'.json?from='+data.start+'&till='+state.date:data.bond.source;
  return '<article class="panel focus-section" id="price"><div class="section-head"><h3>Цена и объём торгов</h3><div class="seg">'+[7,14,30,90,180,365,36500].map(n=>'<button data-period="'+n+'" class="'+(+state.period===n?'sel':'')+'">'+(n===36500?'Вся история':n===365?'1 г':n+' д')+'</button>').join('')+'</div></div>'+chartPrice()+(data.boards.length>1?'<label class="minor">Режим торгов <select id="boardSelect">'+data.boards.map(v=>'<option '+(v===data.board?'selected':'')+'>'+esc(v)+'</option>').join('')+'</select></label>':'')+'<div class="sourcebar">'+link(url,'MOEX ISS'+(data.board?' · '+data.board:''))+'<button class="textbtn" data-ask="price">Объяснить в чате →</button></div></article>';
}
const types={'Купон':'#399989','Амортизация':'#7b92bb','Погашение':'#d5a357','Оферта':'#ac8ca7'};
function calendar(){
  const days=+state.horizon, plans=data.plans, currencies=[...new Set(plans.map(p=>p.currency))];
  let charts='';
  for(const c of currencies){
    const buckets=[];
    for(let off=0;off<days;off+=7){
      const start=dtadd(state.date,off),end=dtadd(state.date,Math.min(off+7,days));
      const items=plans.filter(p=>p.currency===c&&p.date>=start&&p.date<end);
      const total=items.reduce((s,p)=>s+(p.amount??0),0);buckets.push({start,end,items,total});
    }
    const peak=Math.max(1,...buckets.map(b=>b.total)),symbol=esc(cashCurrency(c));
    charts+='<div class="chart-meta"><strong>'+(plans.some(p=>p.currency===c&&p.amount!=null)?fmt(Math.max(...buckets.map(b=>b.total))/1e6,3):'—')+'</strong><span class="minor">млн '+symbol+' · максимум за неделю¹</span></div><div class="weeks">'+buckets.map((b,i)=>{
      const blocks=Object.entries(types).map(([kind,col])=>{const a=b.items.filter(p=>p.kind===kind).reduce((s,p)=>s+(p.amount??0),0);return a?'<i style="height:'+Math.max(1,Math.round(a/peak*69))+'px;background:'+col+'"></i>':'';}).join('');
      return '<button class="week '+(state.week===b.start?'sel':'')+'" data-week="'+b.start+'" aria-label="Неделя с '+dt(b.start)+'" title="'+dt(b.start)+' — '+dt(dtadd(b.end,-1))+'"><div class="stack">'+blocks+'</div><small>'+(i%2===0?b.start.slice(8)+'.'+b.start.slice(5,7):'·')+'</small></button>';}).join('')+'</div>';
  }
  const selected=state.week?plans.filter(p=>p.date>=state.week&&p.date<dtadd(state.week,7)):null;
  let table=selected?'<div class="inset"><b>Неделя с '+dt(state.week)+'</b>'+(selected.length?selected.map(p=>'<div class="lineitem '+(p.bond===state.id?'highlight':'')+'"><div><strong>'+esc(p.name)+'</strong><div class="minor">'+dt(p.date,false)+' · '+esc(p.label)+(p.bond===state.id?' · выбранный выпуск':'')+'</div></div><div>'+esc(p.amount==null?'Неизвестно':fmt(p.amount)+' '+cashCurrency(p.currency))+'<br>'+link(p.source,'График')+'</div></div>').join(''):'<p>В сохранённом календаре нет записей на эту неделю.</p>')+'</div>':'';
  return '<article class="panel focus-section" id="calendar"><div class="section-head"><h3>Выплаты эмитента</h3><div class="seg">'+[30,90].map(n=>'<button data-horizon="'+n+'" class="'+(+state.horizon===n?'sel':'')+'">'+(n===36500?'Вся история':n===365?'1 г':n+' д')+'</button>').join('')+'</div></div><p class="sub">'+dt(state.date,false)+' — '+dt(dtadd(state.date,days-1))+'</p>'+(charts||'<p class="empty">В выбранном интервале нет опубликованного графика для этого эмитента.</p>')+(plans.length?'<div class="legend">'+[...new Set(plans.map(p=>p.kind))].map(k=>'<span><b class="dot" style="background:'+types[k]+'"></b>'+esc(k)+'</span>').join('')+'</div><p class="sub">¹ Только известные суммы. Выберите неделю для состава выплат.</p>':'')+table+'<details class="sub"><summary>Охват обязательств</summary>В окне доступны графики по '+new Set(plans.map(p=>p.bond)).size+' вып. Оферты и купоны с неизвестной суммой показаны в составе недели. Сроки банковских кредитов не загружены.</details><div class="sourcebar"><span>Условия выпусков и MOEX ISS</span><button class="textbtn" data-ask="calendar">Объяснить в чате →</button></div></article>';
}
function payment(){
  const p=data.payment, percent=state.unit==='pct';
  const unit=v=>v==null?'Не раскрыто':percent?(p?.planned?fmt(v/p.planned*100,1)+'%':'Нет базы расчёта'):money(v);
  let body=p?'<p class="sub">'+esc(p.label)+' · плановая дата '+dt(p.date)+'</p>'+(p.percent!=null?'<div class="ledger" aria-label="Доля выплаты в срок и с опозданием"><div style="width:'+(100-p.percent)+'%;background:#419b87"></div><div style="width:'+p.percent+'%;background:#d7a267"></div></div>':'')+[ ['План по документу',p.planned],['Выплачено в срок',p.ontime],['Просрочено в день платежа',p.overdue],['Выплачено с опозданием',p.late],['Остаток на дату среза',p.remaining] ].map(([k,v])=>'<div class="lineitem"><span>'+k+'</span><b>'+unit(v)+'</b></div>').join('')+'<p class="sub">'+(p.percent>0?fmt(p.percent,1)+'% суммы конкретного платежа просрочено на плановую дату.':'Данные относятся к этому платежу.')+'</p><div class="newslinks">'+p.proofs.map((u,i)=>link(u,'Документ '+(i+1))).join('')+'</div>':(data.registry?.length?'<p class="empty">Биржа зарегистрировала нарушение. Сумм для расчёта в загруженной записи нет.</p>'+link(data.registry[0].url,'Карточка обязательства на бирже'):(data.outcomes?.length?'<p>Дата и статус подтверждены в истории выплат ниже. Разбивка суммы по срокам в источнике отсутствует.</p>':'<p class="empty">В подключенных источниках на выбранную дату подтверждение не найдено.</p>'));
  return '<article id="payment" class="panel focus-section"><div class="section-head"><h3>Исполнение платежа</h3><div class="seg"><button data-unit="rub" class="'+(!percent?'sel':'')+'">₽</button><button data-unit="pct" class="'+(percent?'sel':'')+'">%</button></div></div>'+body+'<div class="sourcebar"><span>Раскрытия и рейтинговые релизы</span><button class="textbtn" data-ask="payment">Объяснить в чате →</button></div></article>';
}
function registryBlock(){
  const records=data.registry||[];
  if(!records.length)return '';
  const entries=records.map(r=>'<div class="docrow"><div><strong>'+esc(r.kind)+' · '+dt(r.due)+'</strong><small>'+esc(r.status)+' · снимок '+dt(r.observed)+'</small></div>'+link(r.url,'Запись биржи')+'</div>').join('');
  return '<details class="registry-list" open><summary>Реестр Московской биржи · '+fmt(records.length)+'</summary><div>'+entries+'</div></details>';
}
function documents(){
  return '<article id="events" class="panel focus-section"><div class="section-head"><h3>События и документы</h3><span class="badge">'+data.documents.length+' док.</span></div>'+data.documents.map(d=>'<div class="docrow"><div><small>'+dt(d.published)+(d.published.includes('T')?' · '+d.published.slice(11,16)+' МСК':'')+' · '+esc(d.publisher)+'</small><button data-doc="'+esc(d.id)+'">'+esc(d.title)+'</button></div><span class="minor">'+esc(d.kind)+'</span></div>').join('')+(!data.documents.length&&!data.registry?.length?'<p class="empty">Публикации по выпуску на эту дату отсутствуют.</p>':'')+registryBlock()+'<div class="sourcebar"><span>По времени публикации</span><button class="textbtn" data-ask="events">Объяснить в чате →</button></div></article>';
}
function riskPanel(){
  const factors=data.events.filter(e=>['Рейтинг','Просрочка'].includes(e.kind));
  const seen=new Set();
  const lines=factors.filter(e=>{if(seen.has(e.document))return false;seen.add(e.document);return true;}).map(e=>'<div class="docrow"><div><small>'+dt(e.published)+' · '+esc(e.publisher)+'</small>'+esc(e.label)+(e.new?' · '+esc(e.new):'')+'</div>'+link(e.url,'Основание')+'</div>').join('');
  return '<details class="panel"><summary><strong>Документированные факторы риска</strong>'+(data.next?' · '+dt(data.next.date):'')+'</summary><p class="meta">'+((factors.length||data.registry?.length)?'Эти события известны на дату анализа. Прошлая задержка или снижение рейтинга требуют оценки ликвидности эмитента на дату следующего платежа.':'Для вывода о риске следующего платежа в сохранённых источниках недостаточно сведений.')+'</p>'+lines+'<p class="sub">Полнота данных · документы по выпуску и эмитенту: '+data.documents.length+'. Для оценки покрытия платежа нужны актуальные денежные остатки, доступные кредитные линии и полный график погашений.</p></details>';
}
function news(){
  const groups=new Map();
  for(const n of data.news){const k=n.document==='disclosure'||n.document==='ncr'?'main-c12':n.document||n.id;if(!groups.has(k))groups.set(k,[]);groups.get(k).push(n);}
  return '<details class="panel"><summary><strong>Новостная лента</strong> · '+groups.size+' событий</summary>'+[...groups.values()].map(ns=>'<div class="docrow"><div><small>'+dt(ns[0].published)+' · '+esc(ns[0].scope)+(ns[0].bond?' · '+esc(ns[0].bond):'')+'</small><strong>'+esc(ns[0].title)+'</strong><div class="newslinks">'+ns.map(n=>link(n.url,n.publisher)).join('')+'</div></div></div>').join('')+'<p class="sub">Профильные каналы</p><div class="newslinks">'+[['markettwits','MarketTwits'],['cbonds','Cbonds'],['rusbondsnews','RusBonds'],['bondholders','АВО']].map(([u,n])=>link('https://t.me/'+u,n)).join('')+'</div></details>';
}
function render(){
  if(!data)return;
  const list='<section class="panel"><div class="section-head"><h3>Другие выпуски эмитента</h3><button class="textbtn" data-action="search">Весь каталог →</button></div><div class="tablewrap"><table><thead><tr><th>Выпуск</th><th>ISIN</th><th>Последняя сохранённая сделка</th></tr></thead><tbody>'+data.shortlist.map(b=>'<tr><td><button data-bond="'+esc(b.id)+'">'+esc(b.name)+'</button></td><td class="mono">'+esc(b.isin)+'</td><td>'+dt(b.last_trade)+'</td></tr>').join('')+'</tbody></table></div></section>';
  $('detail').innerHTML='<button class="textbtn" data-action="home">← Обзор рынка</button>'+timeline()+overview()+expertPanel(data)+radarPanel(data.radar)+defaultEvidence(data)+couponPanel(data)+forecastPanel(data.forecast)+financialPanel(data.financials||[])+filingPanel(data)+'<div class="grid">'+price()+calendar()+'</div><div class="charts-more">'+payment()+documents()+'</div>'+outcomeList()+riskPanel()+news()+extraAnalytics(data)+(data.shortlist.length?list:'');
  renderChat();
}
function docModal(id){const d=data.documents.find(x=>x.id===id);if(!d)return;state.event=id;save();modal(d.title,'<p class="meta">'+esc(d.publisher)+' · '+esc(d.kind)+'</p><p class="modalbody">'+esc(d.body)+'</p><div class="doclist"><div class="lineitem"><span>Дата события</span>'+dt(d.occurred)+'</div><div class="lineitem"><span>Опубликовано</span>'+dt(d.published)+(d.published.includes('T')?' '+esc(d.published.slice(11,16))+' МСК':' · время не указано')+'</div><div class="lineitem"><span>Сохранено</span>'+dt(d.loaded)+'</div></div><div class="drawer-actions">'+link(d.url,'Открыть первоисточник','lightbtn')+(id==='ncr'?'<a class="lightbtn" href="documents/nkr-20260407.pdf" target="_blank" rel="noopener">Сохранённый PDF ↗</a>':'')+'<button class="primary" data-ask="doc">Объяснить в чате</button></div>');}
function detailsModal(){const b=data.bond;modal('Реквизиты выпуска','<div class="modalbody"><b>'+esc(b.name)+'</b><p>'+esc(b.issuer_name)+'</p><p>ИНН '+esc(b.inn||'не указан')+'</p><p>ISIN '+esc(b.isin||'не указан')+' · SECID '+esc(b.secid)+'</p><p>Последняя сохранённая сделка на срез — '+dt(data.last?.day)+'</p><p>Режимы с историей на срез — '+esc(data.boards.join(', ')||'нет сведений')+'</p><p class="meta">Связи с группой и поручители в справочнике не подтверждены.</p>'+link(b.source,'Справочник MOEX')+'</div>');}
function renderChat(){
  $('chatContext').innerHTML=data?'<div class="panel chat-context"><div><div class="cap">В контексте</div><strong>'+esc(data.bond.name)+'</strong><div class="mono">'+esc(state.id)+' · '+dt(state.date)+(state.time?' '+esc(state.time):'')+(state.week?' · неделя с '+dt(state.week,false):'')+(state.point?' · сделка '+dt(state.point,false):'')+'</div></div><button class="textbtn" data-return="'+esc(state.section)+'">К аналитике →</button></div>':'';
  const msgs=chats.get(chatKey())||[];
  $('dialogue').innerHTML=msgs.length?msgs.map((m,index)=>messageHtml(m,index)).join(''):'<div class="chat-intro"><img src="favicon.svg" alt=""><h2>Какой выпуск или показатель вас интересует?</h2><p>Назовите выпуск или компанию. Можно продолжить разбор открытой карточки.</p><div class="chips">'+['Какова динамика цены закрытия ОФЗ 26207?','Что известно о выплатах RU000A10DK80?',(state.id?'Когда ближайший купон выбранного выпуска?':'Когда предусмотрена следующая купонная выплата по облигациям Сбербанка?')].map(q=>'<button data-prompt="'+esc(q)+'">'+esc(q)+'</button>').join('')+'</div></div>';
  $('mode').textContent=state.mode==='demo'?'Демонстрационный архив · поиск по документам и показателям':window.pagesRadar?window.pagesRadar.mode():stats?.model?(stats.provider==='local'?'Модель на этом компьютере · ':'Серверная модель · ')+stats.model_name+' · ответы по первоисточникам':'Архивный режим. Локальная модель или API не подключены.';

}
function messageHtml(m,index){
  if(m.user)return '<div class="bubble user"><small>Вы</small><p>'+esc(m.user)+'</p></div>';
  const cited=esc(m.text).replace(/\[(\d+)\]/g,(mark,n)=>m.refs[n-1]?'<a class="cite" href="'+safe(m.refs[n-1].url)+'" target="_blank" rel="noopener noreferrer" title="'+esc(m.refs[n-1].label)+'">'+mark+'</a>':mark);
  const choices=m.choices||[];
  const choose=choices.length?'<label class="series-search">Серия или ISIN<input type="search" data-series="'+index+'" aria-label="Уточнить серию" placeholder="Уточнить серию в каталоге"></label><div class="chips" id="choices-'+index+'">'+choiceButtons(choices.slice(0,8),index)+'</div>':'';
  const references=m.refs.map((r,i)=>link(r.url,'['+(i+1)+'] '+r.label,'proof')).join('');
  const related=(m.related||[]).filter(b=>b.id!==m.id).map(b=>'<button class="textbtn" data-other="'+esc(b.id)+'">'+esc(b.name)+' →</button>').join('');
  return '<div class="bubble"><small>'+esc(m.mode)+'</small><p>'+cited+'</p>'+references+choose+'<div class="row-links">'+(!choices.length?'<button class="textbtn" data-return="'+esc(m.section)+'" data-message="'+index+'" data-id="'+esc(m.id)+'">Открыть в аналитике →</button>':'')+related+'</div></div>';
}
function choiceButtons(items,index){return items.map(b=>'<button class="lightbtn" data-choice="'+esc(b.id)+'" data-message="'+index+'">'+esc(b.name)+' · '+esc(b.isin||b.id)+'</button>').join('');}
let seriesTimer;
document.addEventListener('input',e=>{
  if(e.target.dataset.series===undefined)return;
  const input=e.target,index=+input.dataset.series,key=chatKey(),m=chats.get(key)?.[index];
  if(!m)return;
  clearTimeout(seriesTimer);
  seriesTimer=setTimeout(async()=>{
    const q=input.value.trim(),p=params();p.set('q',q||m.query||'');
    if(m.issuer)p.set('issuer',m.issuer);
    try{const r=await api('/api/search?'+p);if(key===chatKey()&&input.isConnected&&input.value.trim()===q)$('choices-'+index).innerHTML=choiceButtons(r.items.slice(0,12),index)||'Выпуски на эту дату не найдены.';}catch(e){notice(e.message);}
  },180);
});
async function ask(q,choiceId=''){
  if(loadingChat||!q.trim()||(state.id&&!data))return;
  const key=chatKey(),list=chats.get(key)||[];chats.set(key,list);list.push({user:q});loadingChat=true;
  $('askForm').querySelector('button').disabled=true;$('question').value='';renderChat();$('mode').textContent='Проверяем сведения на выбранную дату…';
  const view={...state};agentStage('Получение данных',true);
  try{
    const reply=await api('/api/chat',{...view,question:q,choice_id:choiceId,history:list.slice(0,-1).filter(m=>m.user).slice(-4).map(m=>m.user)});list.push({...reply,view});agentStage('Ответ сформирован');
    if(state.tab==='chat'&&chatKey()===key&&reply.id!==state.id&&!reply.choices.length){
      state={...state,id:reply.id,specific:'1',point:'',event:'',week:'',board:''};
      const nextKey=chatKey();chats.set(nextKey,[...list]);await load(true);
    }
  }
  catch(e){agentStage('Ошибка запроса');list.push({text:e.message,mode:'Ошибка запроса',refs:[],section:'detail',id:state.id});}
  finally{loadingChat=false;$('askForm').querySelector('button').disabled=false;renderChat();if(chatKey()===key)scrollToPart('askForm');}
}
function askFrom(section){
  quitModal();state.tab='chat';state.specific='1';state.section=section==='doc'?'events':section;save(true);tabs();renderChat();
  const prompts={price:'Почему изменилась цена '+(state.point?'за '+dt(state.point):'за выбранный период')+'?',calendar:'Какие обязательства эмитента наступают до выплаты купона по выбранному выпуску?',payment:'Какая часть купона выплачена в установленный срок и когда погашена задолженность?',events:'Какие признаки ухудшения и события уже были известны?',doc:'Объясни документ «'+(data.documents.find(d=>d.id===state.event)?.title||'')+'»'};
  ask(prompts[section]);
}
async function searchList(){
  const token=++searchSeq,p=params();for(const [k,v] of Object.entries({q:$('query').value,issuer:$('issuer').value,currency:$('currency').value,status:$('status').value,event_filter:$('eventFilter').checked?'1':'',offset}))p.set(k,v);
  $('count').textContent='Поиск в каталоге…';
  try{const r=await api('/api/search?'+p);if(token!==searchSeq)return;
    $('count').textContent=(r.issuer_summary?r.issuer_summary+' · ':'')+'Найдено выпусков: '+fmt(r.total)+' · на '+dt(state.date);
    $('results').innerHTML=r.items.length?'<div class="tablewrap"><table><thead><tr><th>Выпуск</th><th>ISIN / SECID</th><th>Валюта</th><th>Обращение</th><th>Платёжное событие</th></tr></thead><tbody>'+r.items.map(b=>'<tr><td><button data-bond="'+esc(b.id)+'">'+esc(b.name||b.short)+'</button></td><td class="mono">'+esc(b.isin||b.secid)+'</td><td>'+esc(b.currency||'—')+'</td><td>'+esc(b.status)+'</td><td>'+ (b.event?'Подтверждено':'Нет документа')+'</td></tr>').join('')+'</tbody></table></div>':'<p class="empty">Совпадений на эту дату нет. Попробуйте ISIN, короткое название или другой срез.</p>';
    $('pager').innerHTML=(offset||r.total>20)?'<button class="lightbtn" data-offset="'+Math.max(0,offset-20)+'" '+(!offset?'disabled':'')+'>Назад</button><small>'+fmt(offset+1)+'–'+fmt(Math.min(offset+20,r.total))+'</small><button class="lightbtn" data-offset="'+(offset+20)+'" '+(offset+20>=r.total?'disabled':'')+'>Далее</button>':'';
  }catch(e){if(token===searchSeq)$('count').textContent=e.message;}
}
function openSearch(){offset=0;$('catalog').classList.remove('hide');clearTimeout(timer);timer=setTimeout(searchList,140);}
document.addEventListener('click',async event=>{
 const el=event.target.closest('button,[data-point],[data-marker]');if(!el)return;const a=el.dataset;
 if(a.tab){state.tab=a.tab;save(true);tabs();renderChat();return;}
 if(a.date){setDate(a.date);return;}
 if(a.period||a.horizon){if(a.period){state.period=+a.period;state.point='';}if(a.horizon){state.horizon=+a.horizon;state.week='';}await load();return;}
 if(a.unit){state.unit=a.unit;save();render();return;}
 if(a.week||a.point){if(a.week)state.week=a.week;if(a.point)state.point=a.point;save();render();return;}
 if(a.doc){docModal(a.doc);return;}
 if(a.marker){const docs=data.documents.filter(d=>d.published.slice(0,10)===a.marker);state.point=a.marker;save();if(docs.length===1){docModal(docs[0].id);return;}modal('Публикации за '+dt(a.marker),docs.map(d=>'<div class="docrow"><button data-doc="'+esc(d.id)+'">'+esc(d.title)+'</button></div>').join(''));return;}
 if(a.ask){askFrom(a.ask);return;}if(a.prompt){ask(a.prompt);return;}
 if(a.other){selectBond(a.other);return;}
 if(a.choice){const m=chats.get(chatKey())?.[+a.message];state.id=a.choice;state.specific='1';state.week='';state.point='';state.event='';await load(true);ask(m?.retry||'Сколько по моему купону выплатили в срок?',a.choice);return;}
 if(a.return){const message=a.message!==undefined?(chats.get(chatKey())||[])[+a.message]:null;if(message?.view){state={...message.view,id:message.id,section:a.return,tab:'market'};await load(true);scrollToPart(a.return);return;}state.tab='market';state.section=a.return;if(a.id&&a.id!==state.id){state.id=a.id;state.point='';state.week='';state.event='';await load(true);}else{save(true);tabs();}scrollToPart(a.return);return;}
 if(a.bond){selectBond(a.bond);return;}if(a.offset!==undefined){offset=+a.offset;searchList();return;}
 if(a.action==='home'){state={...initial,date:state.date,mode:state.mode};await load(true);return;}
 if(a.action==='details'){detailsModal();return;}
 if(a.action==='search'){$('query').focus();openSearch();return;}
 if(a.action==='refresh'&&state.mode==='demo'){notice('Архивный режим использует сохранённые данные. Для обновления выберите Live.');return;}if(a.action==='refresh'){el.disabled=true;el.textContent='Запрос к бирже…';try{const r=await api('/api/refresh',state);await load();notice(r.message);}catch(e){notice(e.message);}finally{el.disabled=false;}return;}
});
document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)&&!$('modal').open){e.preventDefault();state.tab='market';tabs();save();$('query').focus();openSearch();}if((e.key==='Enter'||e.key===' ')&&e.target.matches('svg [role="button"]')){e.preventDefault();e.target.dispatchEvent(new MouseEvent('click',{bubbles:true}));}});
$('catalogBtn').onclick=()=>{$('query').focus();openSearch();};$('closeCatalog').onclick=()=>$('catalog').classList.add('hide');
$('query').oninput=openSearch;['issuer','currency','status','eventFilter'].forEach(k=>$(k).oninput=openSearch);
$('asof').onchange=e=>{if(e.target.value)setDate(e.target.value);};
document.addEventListener('change',e=>{if(e.target.id==='boardSelect'){state.board=e.target.value;state.point='';load(true);}if(e.target.id==='clock'){state.time=e.target.value;state.point='';state.event='';load(true);}});
$('about').onclick=sourceModal;$('closeModal').onclick=quitModal;
$('askForm').onsubmit=e=>{e.preventDefault();ask($('question').value.trim());};$('question').onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();$('askForm').requestSubmit();}};
window.onpopstate=()=>{state=readState();load().then(()=>{if(state.tab==='market')scrollToPart(state.section);});};
tabs();load();if(window.pagesRadar)notice('Загружаем каталог и модель прогноза…');api('/api/coverage').then(r=>{stats=r;renderChat();}).catch(e=>notice(e.message));

$('pauseTape').onclick=()=>{const tape=$('marketTape');const paused=tape.classList.toggle('paused');$('pauseTape').setAttribute('aria-pressed',String(paused));$('pauseTape').textContent=paused?'Продолжить':'Пауза';};
