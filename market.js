'use strict';
let activeMacro = 'RGBI', marketWindow = 90, macroRows = [];
let macroSnapshot;
const macroCache = new Map();
function seriesPlot(points, label, unit, step=false) {
  if (!points.length) return '<p class="empty">Наблюдения за выбранный период отсутствуют.</p>';
  const values=points.map(p=>p[1]), min=Math.min(...values), max=Math.max(...values);
  const start=Date.parse(points[0][0]), end=Date.parse(points.at(-1)[0]);
  const x=p=>68+(Date.parse(p[0])-start)/Math.max(end-start,1)*710;
  const y=p=>max===min?65:104-(p[1]-min)/(max-min)*88;
  const segments=points.slice(1).map((p,i)=>{
    const a=points[i],segment='M'+x(a)+' '+y(a)+(step?'H'+x(p)+'V':'L'+x(p)+' ')+y(p);
    return '<path class="'+directionClass(p[1]-a[1])+'" d="'+segment+'" fill="none" stroke="currentColor" stroke-width="3"/>';
  }).join('');
  return '<svg class="series-plot" viewBox="0 0 800 140" role="img" aria-label="'+esc(label)+'"><title>'+esc(label)+'</title>'+
    [0,.5,1].map(t=>'<path d="M68 '+(16+88*t)+'H778" stroke="#dce5e6"/><text x="1" y="'+(20+88*t)+'">'+fmt(max-(max-min)*t,2)+'</text>').join('')+
    segments+'<circle class="'+directionClass(points.length>1?points.at(-1)[1]-points.at(-2)[1]:null)+'" cx="'+x(points.at(-1))+'" cy="'+y(points.at(-1))+'" r="4" fill="currentColor"/>'+
    points.map(p=>'<circle cx="'+x(p)+'" cy="'+y(p)+'" r="4" fill="transparent"><title>'+dt(p[0])+' · '+fmt(p[1])+' '+esc(unit)+'</title></circle>').join('')+
    '<text x="68" y="132">'+dt(points[0][0])+'</text><text x="778" y="132" text-anchor="end">'+dt(points.at(-1)[0])+'</text></svg>';
}
function changeText(s) {
  if (s.previous==null || s.code!=='KEY' && !s.previous) return '';
  const delta=s.code==='KEY'?s.value-s.previous:100*(s.value/s.previous-1);
  return (delta>0?'+':'')+fmt(delta)+(s.code==='KEY'?' п. п.':'%');
}
function marketDashboard(m) {
  macroSnapshot=m;
  macroRows=m.series;
  const row=m.series.find(s=>s.code===activeMacro)||m.series[0];
  if (!row) return '<section class="panel"><h2>Рыночные индикаторы</h2><p>За выбранную дату данные отсутствуют.</p></section>';
  const points=row.points.filter(p=>p[0]>=dtadd(row.day,1-marketWindow));
  return '<section class="panel macro" id="macroPanel"><div id="market-material" aria-hidden="true"></div><h2>Рыночные индикаторы</h2><div class="macro-grid">'+m.series.map(s=>
    '<button class="macro-card '+(s.code===row.code?'selected':'')+'" data-index="'+esc(s.code)+'" aria-pressed="'+(s.code===row.code)+'"><small>'+esc(s.label)+'</small><strong>'+fmt(s.value)+' '+esc(s.unit)+'</strong><span>'+esc(changeText(s))+' · '+dt(s.day,false)+'</span></button>').join('')+
    '</div><div class="section-head"><div><h3>'+esc(row.label)+'</h3><span class="minor">'+esc(row.code)+' · '+esc(row.unit)+'</span></div>'+
    (row.code==='KEY'?'<div class="seg">'+[30,90,365,730].map(n=>'<button data-market-days="'+n+'" class="'+(n===marketWindow?'sel':'')+'">'+(n>=365?(n/365)+' г':n+' д')+'</button>').join('')+'</div>':'')+'</div>'+
    (row.code==='KEY'?seriesPlot(points,row.label,row.unit,true):'<exchange-chart data-index-chart="'+esc(row.code)+'"></exchange-chart>')+
    '<p class="sub">'+esc(indexMeaning[row.code]||'')+'</p><div class="sourcebar">'+(row.code==='KEY'?link(row.url,'Банк России'):
      link('https://www.moex.com/ru/indices','ПАО Московская Биржа')+' '+link(row.candles_url||row.url,'Исходный ряд · '+row.code))+'<span>Данные на '+dt(row.day)+'</span></div>'+curvePanel(m.curve)+corporatePanel(m.corporate)+'</section>';
}
function corporatePanel(rows){
  if(!rows?.length)return '';
  return '<section id="corporateRates" class="corporate-rates"><h3>Доходность корпоративного долга</h3><div class="tablewrap"><table><thead><tr><th>Портфель</th><th>Доходность</th><th>Дюрация</th><th>Премия к КБД</th></tr></thead><tbody>'+rows.map(s=>'<tr><td>'+link(s.url,s.code)+'<small>'+dt(s.day)+'</small></td><td>'+fmt(s.yield_pct)+'%</td><td>'+fmt(s.duration_days,0)+' дн.</td><td>'+(s.premium_bp==null?'Нет сопоставимой КБД':link(s.curve_url,fmt(s.premium_bp,0)+' б. п.'))+'</td></tr>').join('')+'</tbody></table></div><p class="sub">Ориентировочная премия равна разности доходности индекса и бескупонной ставки ОФЗ на ту же дату. Ставка определяется линейной интерполяцией на срок дюрации. На премию влияют кредитный риск и ликвидность.</p></section>';
}
const indexMeaning={
  RGBI:'Динамика чистых цен ОФЗ отражает изменение рыночной стоимости государственного долга.',
  RUCBCPNS:'Динамика чистых цен корпоративных бумаг позволяет выделить ценовую составляющую результата инвестора.',
  RUCBTRNS:'Совокупный доход корпоративного портфеля включает изменение цен и реинвестирование купонных выплат.',
  RUCBTRAAANS:'Индекс сегмента AAA позволяет сопоставить динамику наиболее высокорейтинговых выпусков с широким корпоративным портфелем. На расхождение влияют также дюрация и состав выпусков.',
  KEY:'Ключевая ставка Банка России служит ориентиром стоимости краткосрочных денег в рублях.',
  IMOEX:'Индекс акций отражает состояние российского рынка долевого капитала.'
};
function curvePanel(curve){
  if(!curve?.points?.length)return '<div id="yieldCurve"><h3>Кривая бескупонной доходности ОФЗ</h3><p class="sub">Данные на выбранную дату отсутствуют.</p></div>';
  const points=curve.points, yields=points.map(p=>p[1]);
  const lo=Math.floor(Math.min(...yields)),hi=Math.max(lo+1,Math.ceil(Math.max(...yields)));
  const x=t=>60+t/30*686,y=v=>116-(v-lo)/(hi-lo)*94;
  const line=points.map(([t,v],i)=>(i?'L':'M')+x(t)+' '+y(v)).join(' ');
  const grid=[lo,(lo+hi)/2,hi].map(v=>'<path d="M60 '+y(v)+'H746" stroke="#dce5e6"/><text x="0" y="'+(y(v)+4)+'">'+fmt(v)+'%</text>').join('');
  const ticks=[0,5,10,15,20,25,30].map(v=>'<text x="'+x(v)+'" y="143" text-anchor="middle">'+v+'</text>').join('');
  const nodes=points.map(([t,v])=>'<circle cx="'+x(t)+'" cy="'+y(v)+'" r="3.6" fill="#286d68"><title>'+fmt(t)+' г. · '+fmt(v)+'%</title></circle>').join('');
  return '<section id="yieldCurve"><div class="section-head"><h3>Кривая бескупонной доходности ОФЗ</h3><small>КБД · '+dt(curve.day)+'</small></div><p class="sub">Доходность, % годовых</p><svg class="series-plot" viewBox="0 0 770 150" role="img" aria-label="Кривая доходности по срокам до погашения">'+grid+'<path d="'+line+'" fill="none" stroke="#286d68" stroke-width="3"/>'+nodes+ticks+'</svg><p class="axis-caption">Срок до погашения, лет</p><details><summary>Значения по срокам</summary><div class="curve-values">'+points.map(([t,v])=>'<span>'+fmt(t)+' г. <b>'+fmt(v)+'%</b></span>').join('')+'</div></details><div class="sourcebar">'+link(curve.url,'Банк России · узлы кривой')+'</div></section>';
}
document.addEventListener('click',e=>{
  const btn=e.target.closest('[data-index],[data-market-days]');
  if(!btn||!$('macroPanel'))return;
  if(btn.dataset.index)activeMacro=btn.dataset.index;
  if(btn.dataset.marketDays)marketWindow=Number(btn.dataset.marketDays);
  $('macroPanel').outerHTML=marketDashboard(macroSnapshot);
});
function initPaymentCalendar(root){
  const overdue=document.createElement('details');
  overdue.innerHTML='<summary>Открытые просрочки за все месяцы</summary><div aria-live="polite"></div>';
  if(state.date>='2026-11-26'){
    const review=document.createElement('a');
    review.href='research/payment_review_2026-11-26.csv';
    review.download='payment_review_2026-11-26.csv';
    review.textContent='Сверка предыдущих выплат по 63 выпускам · 26 ноября 2026 · CSV';
    root.before(review);
  }
  root.before(overdue);
  overdue.ontoggle=async()=>{
    if(!overdue.open||overdue.dataset.loaded)return;
    const box=overdue.querySelector('div');overdue.dataset.loaded='1';box.textContent='Загрузка…';
    try{
      const {rows}=await api('/api/open-overdue?'+params());
      box.innerHTML='<p>Документированные нарушения без подтверждения полного исполнения на '+dt(state.date)+'. Обновление торгов для наблюдения не требуется. Обязательств: '+fmt(rows.length)+'.</p>'+rows.map(r=>'<p><strong>'+esc(r.name)+'</strong> · '+esc(r.id)+' · '+esc(r.kind)+' · срок '+dt(r.due)+'<br>'+link(r.url,'Документ от '+dt(r.published))+'</p>').join('');
    }catch{delete overdue.dataset.loaded;box.textContent='Не удалось загрузить сведения. Закройте и откройте список повторно.';}
  };
  let month=state.date.slice(0,7), selected=state.date, version=0;
  const iso=date=>date.toISOString().slice(0,10);
  async function show(){
    const request=++version, first=new Date(month+'-01T12:00:00Z');
    const label=first.toLocaleDateString('ru-RU',{month:'long',year:'numeric',timeZone:'UTC'});
    root.innerHTML='<div class="cal-nav"><button aria-label="Предыдущий месяц">‹</button><strong>'+label+'</strong><button aria-label="Следующий месяц">›</button></div><div class="cal-content" aria-live="polite">Загрузка календаря…</div>';
    root.querySelectorAll('.cal-nav button').forEach((button,i)=>button.onclick=()=>{
      first.setUTCMonth(first.getUTCMonth()+(i?1:-1));month=iso(first).slice(0,7);selected='';show();
    });
    const content=root.querySelector('.cal-content');
    try{
      const {payments}=await api('/api/payment-calendar?'+params()+'&month='+month);
      if(request!==version||!root.isConnected)return;
      const days=new Map();
      for(const item of payments){if(!days.has(item.date))days.set(item.date,[]);days.get(item.date).push(item);}
      if(!selected||!days.has(selected))selected=payments.find(p=>p.date>=state.date)?.date||payments[0]?.date||month+'-01';
      const dates=[],cursor=new Date(first);
      while(iso(cursor).startsWith(month)){dates.push(iso(cursor));cursor.setUTCDate(cursor.getUTCDate()+1);}
      content.innerHTML='<div class="cal-grid">'+['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(x=>'<small>'+x+'</small>').join('')+'<i></i>'.repeat((first.getUTCDay()+6)%7)+dates.map(d=>{
        const n=days.get(d)?.length||0;
        return '<button data-day="'+d+'" aria-label="'+dt(d)+', выплат по графику: '+n+'">'+Number(d.slice(-2))+(n?'<b>'+n+'</b>':'')+'</button>';
      }).join('')+'</div><div class="cal-list"></div>';
      function select(day){
        selected=day;
        for(const b of content.querySelectorAll('[data-day]'))b.setAttribute('aria-pressed',String(b.dataset.day===day));
        const labels={planned:'Запланирован',ontime:'Выплачен в срок',late:'Просрочка',unconfirmed:'Нет подтверждения'};
        content.querySelector('.cal-list').innerHTML='<h3>'+dt(day)+'</h3>'+((days.get(day)||[]).map(p=>{
          const evidence=p.evidence.map(e=>{
            const host=new URL(safe(e.url),location.href).hostname.replace(/^www\./,'');
            const publisher={'e-disclosure.ru':'Интерфакс · ЦРКИ','disclosure.ru':'АК&М','moex.com':'Московская биржа'}[host]||host;
            return link(e.url,publisher+' · '+dt(e.published));
          }).join(' ');
          const title=p.in_catalog===false?'<strong>'+esc(p.name)+'</strong><small>Вне аналитического каталога</small>':'<button data-bond="'+esc(p.id)+'">'+esc(p.name)+'</button>';
          return '<article class="cal-payment"><div>'+title+'<small>'+esc(p.kind)+' · '+esc(p.id)+'</small></div><strong class="pay-state '+p.status+'">'+labels[p.status]+'</strong><p>'+(p.actual?'Фактическая дата выплаты · '+dt(p.actual):p.conflict?'Источники расходятся. Дата исполнения требует сверки.':p.status==='planned'?'Плановая дата · '+dt(day):'Фактическая дата не подтверждена.')+'</p><div>'+(p.source?link(p.source,'График выплат')+' ':'')+evidence+'</div></article>';
        }).join('')||'<p>В каталоге нет выплат на эту дату.</p>');
      }
      content.querySelectorAll('[data-day]').forEach(b=>b.onclick=()=>select(b.dataset.day));select(selected);
    }catch{if(request===version&&root.isConnected){content.innerHTML='Не удалось загрузить календарь. <button>Повторить</button>';content.querySelector('button').onclick=show;}}
  }
  show();
}
function newsFeed(m){
  const groups=new Map();
  for(const n of m.headlines){const day=n.published.slice(0,10);if(!groups.has(day))groups.set(day,[]);groups.get(day).push(n);}
  return '<section class="panel market-news"><div class="section-head"><h2>Новости рынка</h2>'+link('https://t.me/markettwits','MarketTwits')+'</div>'+
    (Array.from(groups,([day,items])=>'<h3>'+dt(day)+'</h3><ul>'+items.map(n=>'<li><time>'+esc(n.published.slice(11,16))+' МСК</time>'+link(n.url,n.title)+'</li>').join('')+'</ul>').join('')||'<p>В ленте нет сообщений на дату анализа.</p>')+'</section>';
}
const livePollMs=60000;
const canStream=()=>state.mode==='live' && state.date===moscowDay() && !state.time;
const marketKey=(board,code)=>board+'/'+code;
const marketPath=(board,code)=>'engines/stock/markets/bonds/boards/'+encodeURIComponent(board)+'/securities'+(code?'/'+encodeURIComponent(code):'');
const tapeView={archive:[],byKey:new Map(),cut:'',controller:null};
let bondFeed;
function ticker(rows) {
  const el=$('marketTape');
  el.hidden=!rows.length;
  if(!rows.length)return;
  const items=rows.map(s=>'<span><b>'+esc(s.board?s.label:s.code==='KEY'?'Ключевая ставка':s.code)+'</b> '+fmt(s.value,4)+' '+esc(s.unit)+' <small><span class="'+directionClass(s.previous==null?null:s.value-s.previous)+'">'+esc(changeText(s))+'</span> · '+dt(s.day,false)+(s.time?' '+esc(s.time)+' МСК':'')+'</small></span>').join('');
  const html='<div>'+items+'</div><div aria-hidden="true">'+items+'</div>';
  const track=el.querySelector('.tape-track');
  if(track.dataset.quotes!==html){track.innerHTML=html;track.dataset.quotes=html;}
}
async function official(path,params,signal) {
  if(state.mode==='demo')throw Error('Архивный режим');
  const url=new URL('https://iss.moex.com/iss/'+path+'.json');
  for(const [k,v] of Object.entries({'iss.meta':'off',...params}))url.searchParams.set(k,v);
  const timeout=AbortSignal.timeout(12000);
  const resp=await fetch(url,{signal:signal?AbortSignal.any([signal,timeout]):timeout,credentials:'omit'});
  if(!resp.ok)throw Error('ISS '+resp.status);
  return resp.json();
}
function issRows(block) {
  if(!Array.isArray(block?.columns)||!Array.isArray(block.data))throw Error('Неполный ответ ISS');
  return block.data.map(row=>Object.fromEntries(block.columns.map((col,i)=>[col,row[i]])));
}
const tapeCut=()=>[state.mode,state.date,state.time].join('|');
function stopTapeFeed(){tapeView.controller?.abort();tapeView.controller=null;}
function drawTape(){
  const rows=tapeView.archive.map(s=>{
    const key=marketKey(s.board,s.code), current=tapeView.byKey.get(key);
    return current?{...s,previous:s.day<current.day?s.value:s.previous,...current}:s;
  });
  ticker(rows);
}
function tapeTrade(q,day){
  // The marketdata block has no trade date for bonds. Use only a positive
  // session trade count and a same-day exchange snapshot for batched quotes.
  if(!/^\d{2}:\d{2}:\d{2}$/.test(q.TIME||'')||q.NUMTRADES<=0||!Number.isFinite(q.NUMTRADES)
    ||!Number.isFinite(q.LAST)||q.SYSTIME?.slice(0,10)!==day||q.TIME>q.SYSTIME.slice(11,19))return null;
  return {day,time:q.TIME,value:q.LAST};
}
async function refreshTape(snapshotRows) {
  const cut=tapeCut();
  if(cut!==tapeView.cut){stopTapeFeed();tapeView.cut=cut;tapeView.archive=[];tapeView.byKey.clear();drawTape();}
  if(tapeView.controller)return;
  const controller=tapeView.controller=new AbortController(),signal=controller.signal;
  const active=()=>!signal.aborted&&cut===tapeCut();
  try{
    let rows=snapshotRows||macroCache.get(cut);
    if(!rows){
      const m=await api('/api/macro?'+params());rows=[...m.series,...m.bonds];
    }
    if(!active())return;
    macroCache.set(cut,rows);tapeView.archive=rows;drawTape();
    const status=$('tapeStatus');
    if(!canStream()||document.hidden){status.textContent='Архив';return;}
    const day=state.date, groups=new Map();
    for(const row of rows.filter(s=>s.board)){
      if(!groups.has(row.board))groups.set(row.board,[]);
      groups.get(row.board).push(row.code);
    }
    const batches=[...groups].map(async ([board,codes])=>{
      const doc=await official(marketPath(board),{securities:codes.join(','),'iss.only':'marketdata',
        'marketdata.columns':'SECID,BOARDID,LAST,NUMTRADES,TIME,SYSTIME'},signal);
      if(!active()||!canStream())return;
      const card=bondFeed?.key;
      for(const q of issRows(doc.marketdata)){
        const key=marketKey(board,q.SECID), price=tapeTrade(q,day);
        if(q.BOARDID!==board||!codes.includes(q.SECID)||key===card||!price)continue;
        const previous=tapeView.byKey.get(key);
        if(!previous||day+' '+price.time>=previous.day+' '+previous.time)tapeView.byKey.set(key,price);
      }
    });
    const codes=rows.filter(s=>s.code!=='KEY'&&!s.board).map(s=>s.code);
    if(codes.length)batches.push((async()=>{
      const doc=await official('engines/stock/markets/index/securities',{securities:codes.join(','),'iss.only':'marketdata',
        'marketdata.columns':'SECID,CURRENTVALUE,LASTVALUE,TRADEDATE,UPDATETIME'},signal);
      if(!active()||!canStream())return;
      for(const r of issRows(doc.marketdata)){
        if(codes.includes(r.SECID)&&r.TRADEDATE===day&&Number.isFinite(r.CURRENTVALUE))
          tapeView.byKey.set(marketKey(undefined,r.SECID),{day,value:r.CURRENTVALUE,previous:r.LASTVALUE,time:r.UPDATETIME});
      }
    })());
    const results=await Promise.allSettled(batches);
    if(active()){
      drawTape();
      status.textContent=results.some(r=>r.status==='rejected')?'Часть данных ISS недоступна · последняя доступная цена':'MOEX ISS · задержка потока 15 мин';
    }
  }catch{if(active())$('tapeStatus').textContent='Источник недоступен';}
  finally{if(tapeView.controller===controller)tapeView.controller=null;}
}
const chartCache=new Map();
function stopBondFeed(){
  bondFeed?.controller.abort();
  bondFeed=null;
}
function startBondFeed(item){
  if(item.request!==seq||state.tab!=='market'||document.hidden||state.mode==='demo'||!item.board)return;
  if(bondFeed?.item===item)return;
  stopBondFeed();
  const feed=bondFeed={item,key:marketKey(item.board,item.bond.secid),live:canStream(),controller:new AbortController()};
  if(canStream()){
    // The open card takes precedence over batched quotes for this exact board.
    if(tapeCut()===tapeView.cut){
      const confirmed=item.exchangeTrade;
      if(confirmed)tapeView.byKey.set(feed.key,{day:confirmed.TRADEDATE,time:confirmed.TRADETIME,value:confirmed.PRICE});
      else tapeView.byKey.delete(feed.key);
      drawTape();
    }
    refreshBondSession(feed);
  }
  if(!item.historyLoaded)extendChart(feed);
}
const activeBond=feed=>bondFeed===feed&&feed.item.request===seq&&!feed.controller.signal.aborted&&!document.hidden;
function renderBondQuote(item){
  const region=document.querySelector('#price .exchange-quote');
  if(!region||item!==data)return;
  const trade=item.exchangeTrade,last=item.quotes.at(-1)||item.last;
  const price=trade?.PRICE??last?.price;
  const timing=trade?dt(trade.TRADEDATE)+' · '+trade.TRADETIME+' МСК':last?.day?dt(last.day)+' · время сделки отсутствует':'Нет подтверждённой цены';
  const summaryPrice=document.getElementById('summary-price');
  if(summaryPrice){
    summaryPrice.textContent=price==null?'Нет данных':fmt(price,4)+' % ном.';
    document.getElementById('summary-trade-time').textContent=[item.board,timing].filter(Boolean).join(' · ');
  }
  const historical=!canStream();
  const label=state.mode==='demo'?'Архив · Demo':historical?'Архив на дату анализа':
    item.sessionStatus??(item.board?'Загрузка торговой сессии…':'Режим торгов отсутствует');
  const history=item.historyState==='error'?' · история ISS недоступна':item.historyState==='loading'?' · загружается история':
    !item.quotes.length?(item.historyLoaded||state.mode==='demo'?' · нет истории за выбранный период':' · нет сохранённой истории'):'';
  const source=trade?link('https://iss.moex.com/iss/'+marketPath(item.board,item.bond.secid)+'/trades.json?reversed=1&limit=1','Журнал сделок MOEX ISS'):'';
  const html='<strong>'+esc(price==null?'—':fmt(price,4)+' % ном.')+'</strong><span>'+esc(timing)+'</span><small>'+esc(label+history)+'</small>'+source;
  if(region.innerHTML!==html)region.innerHTML=html;
}
const sessionDate=r=>r.TRADE_SESSION_DATE||r.TRADEDATE;
const samePrice=(a,b)=>Math.abs(a-b)<1e-8;
function applyBondRows(item,rows){
  if(!rows.length)return;
  const all=new Map(item.quotes.map(r=>[r.day,r]));
  for(const row of rows)all.set(row.day,{...all.get(row.day),...row});
  item.quotes=[...all.values()].sort((a,b)=>a.day.localeCompare(b.day));
  document.querySelector('#price exchange-chart')?.refreshRows?.();
}
function sessionRow(c,day,trade,item){
  return {day,price:c.close,open:c.open,high:c.high,low:c.low,quantity:c.volume,volume:c.value,
    currency:trade.CURRENCYID||item.exchangeCurrency||item.last?.currency||item.terms?.settlement_currency,
    board:item.board};
}
function sessionFromMinutes(rows,trade){
  const last=rows.at(-1);
  const minute=Date.parse(trade.TRADEDATE+'T'+trade.TRADETIME.slice(0,5)+':00+03:00')/1000;
  if(!last||last.time!==minute||!samePrice(last.close,trade.PRICE))return null;
  const sum=field=>rows.every(row=>Number.isFinite(row[field]))?rows.reduce((total,row)=>total+row[field],0):null;
  return {open:rows[0].open,high:Math.max(...rows.map(row=>row.high)),low:Math.min(...rows.map(row=>row.low)),
    close:last.close,volume:sum('quantity'),value:sum('turnover')};
}
async function refreshBondSession(feed){
  if(!activeBond(feed)||!canStream()||feed.syncing)return;
  feed.syncing=true;
  const {item}=feed, day=state.date, signal=feed.controller.signal, path=marketPath(item.board,item.bond.secid);
  try{
    const [deals,daily]=await Promise.all([
      official(path+'/trades',{reversed:1,limit:1,'iss.only':'trades'},signal),
      official(path+'/candles',{interval:24,from:day,till:day,'iss.only':'candles'},signal)
    ]);
    if(!activeBond(feed)||!canStream())return;
    const trade=issRows(deals.trades).find(r=>r.BOARDID===item.board&&r.SECID===item.bond.secid
      &&r.TRADEDATE<=day&&/^\d{4}-\d\d-\d\d$/.test(r.TRADEDATE||'')&&/^\d\d:\d\d:\d\d$/.test(r.TRADETIME||'')&&Number.isFinite(r.PRICE));
    let candle=issRows(daily.candles).find(r=>r.begin?.slice(0,10)===day);
    const current=trade&&sessionDate(trade)===day;
    let minutes, derived=false;
    if(current&&(!candle||![candle.open,candle.high,candle.low,candle.close].every(Number.isFinite)||!samePrice(candle.close,trade.PRICE))){
      minutes=await minuteCandles(feed);
      if(!activeBond(feed)||!canStream())return;
      candle=sessionFromMinutes(minutes,trade);
      derived=Boolean(candle);
    }
    if(!current){
      item.sessionStatus=candle?'ISS · ожидается подтверждение последней сделки':'ISS · за текущую сессию сделок нет';
      if(trade && (!item.quotes.length||trade.TRADEDATE>=item.quotes.at(-1).day) && !item.exchangeTrade)item.exchangeTrade=trade;
    } else if(!candle){
      item.sessionStatus='ISS · свеча и журнал сделок синхронизируются';
    } else if(!item.exchangeTrade||sessionDate(item.exchangeTrade)!==day||trade.TRADENO>=item.exchangeTrade.TRADENO){
      const currency=archiveCurrency(item);
      if(currency)item.exchangeCurrency=currency;
      item.exchangeTrade=trade;item.sessionStatus='MOEX ISS · задержка публичного потока 15 мин'+(derived?' · дневная свеча по минутным данным':'');
      applyBondRows(item,[sessionRow(candle,day,trade,item)]);
      if(tapeCut()===tapeView.cut){
        tapeView.byKey.set(feed.key,{day:trade.TRADEDATE,time:trade.TRADETIME,value:trade.PRICE});drawTape();
      }
    }
    if(item.chartInterval && intraIntervals[item.chartInterval])await fetchIntraday(feed,minutes);
  }catch{
    if(activeBond(feed))item.sessionStatus='ISS недоступен · последние подтверждённые данные';
  }finally{
    feed.syncing=false;
    if(activeBond(feed))renderBondQuote(item);
  }
}
function archiveCurrency(item){
  return item.last?.currency||item.quotes.find(r=>r.currency)?.currency||item.terms?.settlement_currency;
}
function minuteCandles(feed){
  if(feed.minuteRequest)return feed.minuteRequest;
  const day=state.date,{item,controller}=feed,path=marketPath(item.board,item.bond.secid)+'/candles';
  feed.minuteRequest=(async()=>{
    const bars=new Map();
    let start=0;
    while(true){
      const doc=await official(path,{interval:1,from:day,till:day,start,'iss.only':'candles'},controller.signal);
      const batch=issRows(doc.candles);
      if(!batch.length)break;
      const count=bars.size;
      for(const c of batch){
        if(c.begin?.slice(0,10)!==day||![c.open,c.high,c.low,c.close].every(Number.isFinite))continue;
        const time=Date.parse(c.begin.replace(' ','T')+'+03:00')/1000;
        if(Number.isFinite(time))bars.set(time,{time,open:c.open,high:c.high,low:c.low,close:c.close,quantity:c.volume,turnover:c.value});
      }
      if(bars.size===count)throw Error('ISS returned an incomplete minute series');
      // ISS candle responses have no cursor, and a full page contains 500 rows.
      if(batch.length<500)break;
      start+=batch.length;
    }
    return [...bars.values()].sort((a,b)=>a.time-b.time);
  })().finally(()=>{feed.minuteRequest=null;});
  return feed.minuteRequest;
}
async function fetchIntraday(feed,sampled){
  if(!activeBond(feed)||!canStream()||feed.minutesPending)return;
  const {item}=feed,day=state.date;
  feed.minutesPending=true;item.minuteStatus='Загрузка минутных свечей…';
  document.querySelector('#price exchange-chart')?.refreshRows?.();
  try{
    const rows=sampled??await minuteCandles(feed);
    if(!activeBond(feed)||!canStream())return;
    const trade=item.exchangeTrade, last=rows.at(-1);
    if(last&&trade&&sessionDate(trade)===day&&!samePrice(last.close,trade.PRICE)){
      item.minuteStatus='ISS · минутные свечи и журнал сделок синхронизируются';
      if(!item.minutes?.length)item.minutes=rows;
    }else{
      item.minutes=rows;item.minuteStatus=rows.length?'':'ISS · за текущую сессию сделок нет';
    }
  }catch{if(activeBond(feed))item.minuteStatus='Минутные свечи ISS недоступны';}
  finally{
    feed.minutesPending=false;
    if(activeBond(feed))document.querySelector('#price exchange-chart')?.refreshRows?.();
  }
}
function requestBondInterval(interval){
  if(!data)return;
  data.chartInterval=interval;
  if(intraIntervals[interval]&&bondFeed?.item===data)fetchIntraday(bondFeed);
}
async function extendChart(feed){
  const {item}=feed;
  const end=state.time||canStream()?dtadd(state.date,-1):state.date;
  const path='history/'+marketPath(item.board,item.bond.secid);
  const key=[path,item.start,end].join('|');
  item.historyState='loading';renderBondQuote(item);
  try{
    let rows=chartCache.get(key);
    if(!rows){
      rows=[];
      for(let offset=0; ;){
        const j=await official(path,{from:item.start,till:end,start:offset,'iss.only':'history,history.cursor','history.columns':'TRADEDATE,OPEN,HIGH,LOW,CLOSE,VALUE,VOLUME,NUMTRADES,YIELDCLOSE,ACCINT,COUPONVALUE,COUPONPERCENT,CURRENCYID,FACEUNIT,TRADINGSESSION'},feed.controller.signal);
        const block=issRows(j.history);rows.push(...block.filter(r=>r.TRADINGSESSION==null||String(r.TRADINGSESSION)==='3'));offset+=block.length;
        if(!block.length||offset>=(j['history.cursor']?.data[0]?.[1]??offset))break;
      }
      chartCache.set(key,rows);
    }
    if(!activeBond(feed))return;
    const prices=rows.filter(r=>r.TRADEDATE>=item.start&&r.TRADEDATE<=end&&r.NUMTRADES>0&&Number.isFinite(r.CLOSE));
    applyBondRows(item,prices.map(r=>({day:r.TRADEDATE,price:r.CLOSE,open:r.OPEN,high:r.HIGH,low:r.LOW,
      quantity:r.VOLUME,volume:r.VALUE,trades:r.NUMTRADES,yield_close:r.YIELDCLOSE,currency:r.CURRENCYID,board:item.board})));
    const observed=rows.filter(r=>r.TRADEDATE<=end&&r.ACCINT!=null).at(-1);
    if(observed&&(!item.terms||observed.TRADEDATE>item.terms.seen.slice(0,10))){
      item.terms={seen:observed.TRADEDATE,board:item.board,trade_day:observed.TRADEDATE,accrued:observed.ACCINT,
        settlement_currency:observed.CURRENCYID,currency:observed.FACEUNIT,coupon:observed.COUPONVALUE,rate:observed.COUPONPERCENT,
        source:'https://iss.moex.com/iss/'+path+'.json?from='+observed.TRADEDATE+'&till='+observed.TRADEDATE};
      if($('coupons'))$('coupons').outerHTML=couponPanel(item);
    }
    const extra=$('issueSeries');if(extra)extra.outerHTML=extraAnalytics(item);
    item.historyLoaded=true;item.historyState='ready';
  }catch{if(activeBond(feed))item.historyState='error';}
  finally{if(activeBond(feed))renderBondQuote(item);}
}
function refreshVisibleMarket(){
  if(document.hidden)return;
  if(canStream())refreshTape();
  if(!canStream()&&bondFeed?.live){
    tapeView.byKey.clear();
    load();return;
  }
  if(data?.request===seq&&state.tab==='market'){
    const previous=bondFeed;
    startBondFeed(data);
    if(bondFeed&&bondFeed===previous)refreshBondSession(bondFeed);
  }
}
setInterval(refreshVisibleMarket,livePollMs);
document.addEventListener('visibilitychange',()=>{
  if(document.hidden){stopBondFeed();stopTapeFeed();}
  else refreshVisibleMarket();
});
class StatementChart extends HTMLElement {
  connectedCallback(){
    this.series=data?.trends||[];
    if(!this.series.length)return;
    this.innerHTML='<label>Показатель <select>'+this.series.map((t,i)=>'<option value="'+i+'">'+esc(t.name)+'</option>').join('')+
      '</select></label><div class="statement-axis"></div><div class="statement-chart"></div><div class="statement-note" aria-live="polite"></div>';
    const select=this.querySelector('select');
    select.onchange=()=>this.plot(this.series[select.selectedIndex]);
    this.plot(this.series[0]);
  }
  plot(trend){
    const points=trend.points,values=points.map(p=>p.value);
    const min=Math.min(...values),max=Math.max(...values);
    // Place points at the end of the reporting period, including gaps in coverage.
    const quarter={'':4,Q1:1,Q2:2,H1:2,Q3:3,M9:3,Q4:4};
    const dates=points.map(p=>4*Number(p.period.slice(0,4))+quarter[p.period.slice(4)]);
    const x=i=>7+86*(dates[i]-dates[0])/(dates.at(-1)-dates[0]);
    const y=i=>max===min?50:82-64*(values[i]-min)/(max-min);
    const area=this.querySelector('.statement-chart');
    this.querySelector('.statement-axis').textContent=trend.standard+' · '+trend.name+(trend.unit?' ('+trend.unit+')':'');
    const ticks=max===min?[[50,min]]:[[18,max],[50,(min+max)/2],[82,min]];
    area.innerHTML='<div class="statement-scale" aria-hidden="true">'+ticks.map(([pos,value])=>'<span style="top:'+pos+'%">'+fmt(value,3)+'</span>').join('')+'</div><div class="statement-plot"><svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none">'+
      '<path class="statement-grid" d="M0 18H100 M0 50H100 M0 82H100"/><polyline points="'+points.map((_,i)=>x(i)+','+y(i)).join(' ')+'"/></svg>'+
      points.map((p,i)=>'<button type="button" class="statement-point" style="left:'+x(i)+'%;top:'+y(i)+'%" aria-label="'+esc(p.period+' · '+fmt(p.value,3)+' '+trend.unit)+'"></button>').join('')+
      '</div><div class="statement-periods">'+points.map((p,i)=>'<span style="left:'+x(i)+'%">'+esc(p.period)+'</span>').join('')+'</div>';
    const buttons=Array.from(area.querySelectorAll('button'));
    const show=i=>{
      const point=points[i],delta=i?point.value-points[i-1].value:null;
      const difference=i?'К '+esc(points[i-1].period)+': '+(delta>0?'+':'')+fmt(delta,3)+' '+esc(trend.unit==='%'?'п. п.':trend.unit):'Первый доступный период';
      buttons.forEach((b,j)=>{b.setAttribute('aria-pressed',String(i===j));b.tabIndex=i===j?0:-1;});
      this.querySelector('.statement-note').innerHTML='<strong>'+esc(point.period)+' · '+fmt(point.value,3)+' '+esc(trend.unit)+'</strong><span>'+difference+'</span>'+
        link(point.url,'Отчёт · '+dt(point.published))+'<button type="button" class="outline" '+(!i?'disabled':'')+'>Объяснить изменение</button>';
      this.querySelector('.statement-note button').onclick=()=>{
        if(!i||loadingChat||data?.bond.id!==state.id)return;
        const id=data.bond.id,previous=points[i-1].period;
        state.tab='chat';state.specific='1';state.section='bondRadar';save(true);tabs();renderChat();
        ask('Объясни изменение показателя «'+trend.name+'» по выпуску '+id+' за '+point.period+
          ' относительно '+previous+'. Как это повлияло на риск выпуска?',id,
          {trend_key:trend.key,trend_period:point.period,previous_period:previous});
      };
    };
    buttons.forEach((b,i)=>{
      b.onpointerenter=b.onfocus=b.onclick=()=>show(i);
      b.onkeydown=e=>{
        if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
        e.preventDefault();
        const next=e.key==='Home'?0:e.key==='End'?buttons.length-1:i+(e.key==='ArrowLeft'?-1:1);
        buttons[Math.max(0,Math.min(buttons.length-1,next))].focus();
      };
    });
    show(points.length-1);
  }
}
customElements.define('statement-chart',StatementChart);

function riskDynamics(item){
  const history=item.risk_history||[], trends=item.trends||[];
  const path=history.map((v,i)=>'<li><small>'+dt(v.day)+'</small> <b>'+esc(v.level)+'</b>'+
    (i&&v.level!==history[i-1].level&&v.reasons.length?' · '+esc(v.reasons.join(' ')):'')+'</li>').join('');
  const rows=trends.map(t=>{
    const values=t.points.map(p=>'<div>'+link(p.url,p.period+' · '+fmt(p.value,3)+' '+t.unit)+
      '<small>Опубликовано '+dt(p.published)+'</small></div>').join('');
    return '<div class="trend-row"><strong>'+esc(t.name)+' · '+esc(t.standard)+'</strong><div class="trend-values">'+values+
      '</div><small>Изменение за последние два показанных периода: '+(t.delta>0?'+':'')+fmt(t.delta,3)+' '+esc(t.unit==='%'?'п. п.':t.unit)+'. '+esc(t.explanation)+'</small></div>';
  }).join('');
  return '<div class="risk-dynamics"><h4>Динамика риска и отчётности</h4>'+
    (history.length>1?'<ul>'+path+'</ul>':'<p>Для сравнения категорий недостаточно исторических оценок.</p>')+
    (rows?'<statement-chart></statement-chart><details><summary>Все значения и источники</summary>'+rows+'</details>':'<p>Для сравнения показателей нужны как минимум два сопоставимых отчётных периода.</p>')+'</div>';
}
function riskExplanation(item){
  const profile=item.expert, radar=item.radar;
  const reasons=radar?.assessment?.length?radar.assessment:
    [profile?.eligible===false?'Для этого типа выпуска корпоративный экспертный индекс не рассчитывается.':
      'Данных на выбранную дату недостаточно для полной оценки.',...(radar?.gaps||[]).slice(0,1)];
  const evidence=[...(radar?.factors||[]),...Object.values(profile?.blocks||{})];
  const list=reasons.map(reason=>{
    const fact=evidence.find(f=>f.reason===reason&&f.url);
    return '<li>'+esc(reason)+(fact?' '+link(fact.url,'Источник · '+dt(fact.day)):'')+'</li>';
  }).join('');
  const report=item.financials?.[0];
  let financial='Числовая отчётность эмитента на выбранную дату отсутствует.';
  if(report){
    const metrics=report.metrics||{};
    const keys=[...new Set([...(report.flags||[]).map(f=>f.key),'interest_cover','current_ratio','net_leverage','ocf','total_capital_adequacy_ratio',...Object.keys(metrics)])]
      .filter(k=>metrics[k]?.value!=null).slice(0,2);
    const values=keys.map(k=>esc(metrics[k].name)+' — <strong>'+fmt(metrics[k].value,3)+' '+esc(metrics[k].unit)+'</strong>').join(' · ');
    financial=esc(report.standard)+' · '+esc(report.period)+' · опубликовано '+dt(report.published)+
      (values?'<br>'+values:'')+'<br>'+link(report.url,report.provider+' · показатели')+
      (report.original&&report.original!==report.url?' · '+link(report.original,'Отчёт эмитента'):'');
  }
  return '<section class="risk-explanation"><div class="section-head"><h3>Почему такой уровень риска</h3>'+
    '<button class="outline" data-ask="bondRadar">Разобрать с помощником</button></div><ul>'+list+'</ul>'+
    '<p><b>Отчётность эмитента</b><br>'+financial+'</p>'+riskDynamics(item)+'</section>';
}
function bondHighlights(item){
  const terms=item.terms;
  const planned=item.plans.filter(p=>p.bond===item.bond.id&&p.kind==='Купон'&&p.date>=state.date)
    .sort((a,b)=>a.date.localeCompare(b.date))[0];
  const due=[planned?.date,terms?.due].filter(d=>d&&d>=state.date).sort()[0];
  const fromTerms=Boolean(due&&terms?.due===due&&terms.coupon!=null);
  const amount=fromTerms?terms.coupon:(due&&planned?.date===due?planned.per_unit:null);
  const currency=fromTerms?terms.currency:planned?.currency;
  const money=(n,c)=>n==null?'Нет данных':fmt(n)+' '+esc(cashCurrency(c||''));
  const field=(label,value,note)=>'<div><dt>'+label+'</dt><dd>'+value+'</dd><small>'+note+'</small></div>';
  return '<dl class="bond-highlights">'+
    field('Кредитный риск',esc(item.radar?.label||'Нет оценки'),item.radar?'На '+dt(item.radar.asof):'')+
    field('Цена сделки','<span id="summary-price">—</span>','<span id="summary-trade-time"></span>')+
    field('НКД на бумагу',money(terms?.accrued,terms?.settlement_currency),terms?'Снимок '+dt(terms.seen)+' · '+esc(terms.board||''):'')+
    field('Ближайший купон',money(amount,currency),due?'По графику · '+dt(due):'Дата не опубликована')+'</dl>';
}
function couponPanel(item){
  const t=item.terms, plan=item.plans.find(p=>p.bond===item.bond.id && p.kind==='Купон');
  const currentCoupon=t?.due>=state.date?t:null;
  const val=(n,c)=>n==null?'Нет данных':fmt(n)+' '+esc(cashCurrency(c||''));
  const boxes=[['НКД на одну бумагу',val(t?.accrued,t?.settlement_currency),t?.settle?'Расчёты '+dt(t.settle):t?.trade_day?'Торговая дата '+dt(t.trade_day):'На выбранную дату'],
    [t?.trade_day&&!plan?'Купон на дату торгов':'Ближайший купон',val(currentCoupon?.coupon??plan?.per_unit??(t?.trade_day?t.coupon:null),currentCoupon||!plan?t?.currency:plan.currency),dt(currentCoupon?.due||plan?.date||t?.trade_day)],
    ['Купонная ставка',t?.rate==null?'Нет данных':fmt(t.rate)+'%','Годовых'],
    ['Купонный период',t?.period?fmt(t.period)+' дн.':'Нет данных','По условиям выпуска']];
  return '<section class="panel" id="coupons"><h3>НКД и купонные выплаты</h3><div class="metrics">'+boxes.map(([k,v,sub])=>'<div><small>'+k+'</small><strong>'+v+'</strong><small>'+sub+'</small></div>').join('')+'</div><div class="sourcebar">'+link(t?.source||plan?.source||item.bond.source,'Московская биржа')+'<span>'+ (t?'Снимок '+dt(t.seen)+' · '+esc(t.board):'Параметры НКД на этот срез не опубликованы')+'</span></div></section>';
}
function radarPanel(r){
  if(!r)return '';
  const category=f=>/финанс|банк|отч[её]т/i.test(f.scope)?1:/рынок|бирж|модел/i.test(f.scope)?0:2;
  const facts=rows=>rows.map(f=>'<li>'+esc(f.reason)+(f.url?' '+link(f.url,'Источник · '+dt(f.day)):'')+'</li>').join('');
  const categories=['Биржевые данные','Отчётность','События выпуска'];
  return '<section id="bondRadar" class="panel radar-panel level-'+esc(r.level)+'"><div class="section-head"><h2>Почему такой риск?</h2><button class="outline" data-ask="bondRadar">Разобрать с помощником</button></div>'+
    (r.factors.length?'<ul>'+facts(r.factors.slice(0,3))+'</ul>':'<p>На выбранную дату подтверждённых оснований недостаточно.</p>')+
    '<div class="radar-facts"><div class="radar-dial" aria-hidden="true"><i></i><i></i><i></i></div>'+
    categories.map((label,i)=>'<details name="risk-layer" data-layer="'+i+'"><summary>'+label+'</summary><ul>'+(facts(r.factors.filter(f=>category(f)===i))||'<li>Нет подтверждённых фактов в этой категории.</li>')+'</ul></details>').join('')+'</div>'+
    (r.gaps.length?'<details><summary>Пробелы в данных</summary><ul>'+r.gaps.map(g=>'<li>'+esc(g)+'</li>').join('')+'</ul></details>':'')+
    '<details><summary>Как определяется цвет</summary><p>Скринер и карточка используют общую категорию. Высокий индекс или подтверждённый открытый дефолт выпуска дают красный цвет. Предупреждение модели ближайшего платежа, финансовый фактор, юридическое событие или недавняя просрочка дают как минимум жёлтый. Для зелёного нужны низкий индекс и подтверждение своевременной выплаты. При частичной оценке без предупреждений цвет серый. Прогноз ближайшего платежа рассчитывается отдельно.</p>'+((r.assessment||[]).map(t=>'<p>'+esc(t)+'</p>').join(''))+'</details></section>';
}
function filingPanel(item){
  const groups=[
    ['Условия обязательства','Решение о выпуске, проспект, оферта и действующие изменения определяют сумму, срок, обеспечение и условия нарушения.',[]],
    ['Исполнение обязательства','Сообщение эмитента или ПВО, подтверждение выплаты и биржевой реестр позволяют сопоставить установленную и фактическую даты.',[]],
    ['Финансовое состояние','Отчётность РСБУ и МСФО, аудиторское заключение и отчёт эмитента дают основания для анализа ликвидности и долга.',[]],
    ['Изменение прав кредиторов','Решения ОСВО, сообщения ПВО, условия реструктуризации и судебные акты помогают проверить изменение срока и порядок взыскания.',[]]
  ];
  const add=(i,title,stamp,url)=>{if(url&&!groups[i][2].some(d=>d.url===url))groups[i][2].push({title,stamp,url});};
  if(item.next)add(0,'График ближайшего платежа',item.next.known,item.next.source);
  for(const r of item.registry)add(1,r.status+' · '+r.kind+' · срок '+dt(r.due),r.observed,r.url);
  for(const o of item.outcomes)add(1,o.source+' · '+o.kind+' · срок '+dt(o.due),o.published,o.url);
  for(const f of item.filings){
    const text=f.category+' '+f.title;
    const group=/отч[её]т|аудит/i.test(text)?2:/проспект|условия выпуска|эмиссионн/i.test(text)?0:/просроч|неисполн|выплачен/i.test(text)?1:3;
    add(group,f.title+(f.period?' · '+f.period:''),f.published,f.url);
  }
  for(const f of item.financials)add(2,f.standard+' · '+f.period,f.published,f.original||f.url);
  return '<section class="panel" id="creditDocuments"><h3>Документы кредитного анализа</h3>'+groups.map(([name,purpose,docs])=>'<details><summary>'+esc(name)+' · '+docs.length+'</summary><p class="sub">'+esc(purpose)+'</p>'+(docs.length?docs.sort((a,b)=>b.stamp.localeCompare(a.stamp)).map(d=>'<div class="docrow"><small>'+dt(d.stamp)+'</small>'+link(d.url,d.title)+'</div>').join(''):'<p class="sub">Подтверждающий документ в этой группе на дату анализа отсутствует.</p>')+'</details>').join('')+'</section>';
}
function defaultEvidence(item){
  const r=item.registry?.[0], missed=item.outcomes?.find(p=>p.late);
  const text=r?'<strong>'+esc(r.status)+'</strong><p>'+esc(r.kind)+' · срок обязательства '+dt(r.due)+
    (r.executed?' · дата исполнения '+dt(r.executed):' · дата исполнения в записи не указана')+'.</p>'+link(r.url,'Запись Мосбиржи'):
    missed?'<strong>Документирована просрочка выплаты</strong><p>'+esc(missed.kind)+' · срок '+dt(missed.due)+'.</p>'+link(missed.url,missed.source):
    '<p>На дату среза в подключённых источниках нет записи о дефолте этого выпуска.</p>';
  return '<section class="panel" id="defaultEvidence"><h3>Платёжные нарушения по документам</h3>'+text+
    '<p class="sub">Статус относится к указанному обязательству.</p><details><summary>Как радар устанавливает нарушение</summary><p>Для выпуска сопоставляются вид платежа, договорный срок и раскрытие об исполнении. Если в реестре Мосбиржи есть запись, карточка воспроизводит её формулировку: «Технический дефолт» или «Дефолт». Позднейшее исполнение показывается отдельной датой. Отсутствие публикации оставляет исход неизвестным.</p><p>Финансовые коэффициенты и динамика цены помогают оценивать риск будущего платежа. Численная вероятность дефолта в этой версии не рассчитывается.</p></details></section>';
}
function paymentJournal(item){
  const rows=item.payment_journal||[];
  if(!rows.length)return '';
  const evidence=rows.map(r=>{
    const status=r.entry==='plan'?'План':r.late?(r.actual?'Исполнено после срока':'Просрочка подтверждена'):'Исполнено в срок';
    const unit=r.per_unit==null?'':fmt(r.per_unit)+' '+cashCurrency(r.currency);
    return '<tr><td>'+dt(r.day)+'</td><td>'+esc(r.kind)+'</td><td>'+dt(r.due)+'</td><td>'+esc(status)+'</td><td>'+esc(unit||'—')+'</td><td>'+esc(r.actual?dt(r.actual):'—')+'</td><td>'+link(r.url,'Источник')+'</td></tr>';
  }).join('');
  return '<section class="panel"><details id="paymentJournal"><summary>Журнал наблюдений по выплатам</summary><div class="tablewrap"><table><thead><tr><th>День наблюдения</th><th>Обязательство</th><th>Срок</th><th>Сведения</th><th>На бумагу</th><th>Дата исполнения</th><th>Основание</th></tr></thead><tbody>'+evidence+'</tbody></table></div></details></section>';
}
function financialPanel(reports,selectedPeriod){
  if(!reports.length)return '<section class="panel" id="fundamentals"><h3>Финансовое состояние эмитента</h3><p class="sub">На выбранную дату отсутствуют проверенные числовые показатели по этому ИНН. Доступные публикации приведены в разделе «Документы кредитного анализа».</p></section>';
  const r=reports.find(v=>v.period+'|'+v.standard===selectedPeriod)||reports[0],priority=['current_ratio','cash_cover','interest_cover','working_capital','short_debt_share','net_leverage','ocf','fcf','net_income','roe'];
  const rows=Object.entries(r.metrics);
  const metrics=priority.filter(k=>r.metrics[k]).slice(0,7).map(k=>r.metrics[k]);
  const key=['ocf','net_income','revenue'].find(k=>r.metrics[k]);
  const fiscalEnd=period=>period.length===4?period+'-12-31':period.endsWith('H1')?period.slice(0,4)+'-06-30':period.endsWith('M9')?period.slice(0,4)+'-09-30':period.slice(0,4)+['-03-31','-06-30','-09-30','-12-31'][Number(period.at(-1))-1];
  const history=key?reports.filter(x=>x.period.length===r.period.length&&x.standard===r.standard&&x.metrics[key]?.unit===r.metrics[key].unit&&x.period<=r.period).sort((a,b)=>a.period.localeCompare(b.period)).map(x=>[fiscalEnd(x.period),x.metrics[key].value]):[];
  const options=reports.map(x=>'<option value="'+esc(x.period+'|'+x.standard)+'" '+(x.period===r.period&&x.standard===r.standard?'selected':'')+'>'+esc(x.period)+' · '+esc(x.standard)+'</option>').join('');
  return '<section class="panel" id="fundamentals"><div class="section-head"><h3>Финансовое состояние эмитента</h3><span class="badge">'+esc(r.standard)+' · '+esc(r.period)+'</span></div><label class="minor">Отчётный период <select id="statementPeriod">'+options+'</select></label><p class="sub">Опубликован '+dt(r.published)+(r.publication_url?' · '+link(r.publication_url,'Дата раскрытия'):'')+'</p><div class="metrics">'+metrics.map(m=>'<div><small>'+esc(m.name)+'</small><strong>'+fmt(m.value)+' '+esc(m.unit)+'</strong></div>').join('')+'</div><h4>Факторы финансового риска</h4>'+
    (r.flags.length?'<ul>'+r.flags.map(f=>'<li>'+esc(f.text)+' <strong>'+fmt(r.metrics[f.key].value)+' '+esc(r.metrics[f.key].unit)+'</strong></li>').join('')+'</ul>':'<p class="sub">По доступным показателям заданные условия предупреждения не выполнены.</p>')+
    (history.length>1?'<h4>'+esc(r.metrics[key].name)+' · '+esc(r.metrics[key].unit)+'</h4>'+seriesPlot(history,r.metrics[key].name,r.metrics[key].unit):'')+
    '<details><summary>Показатели отчётности и коэффициенты ('+rows.length+')</summary><div class="tablewrap"><table><tbody>'+rows.map(([,m])=>'<tr><td>'+esc(m.name)+'</td><td>'+fmt(m.value,3)+' '+esc(m.unit)+'</td></tr>').join('')+'</tbody></table></div></details><div class="sourcebar">'+link(r.url,r.provider+' · финансовые показатели')+(r.original&&r.original!==r.url?link(r.original,'Отчёт эмитента'):'')+'</div></section>';
}

document.addEventListener('change',event=>{if(event.target.id==='statementPeriod'&&data)$('fundamentals').outerHTML=financialPanel(data.financials,event.target.value);});
