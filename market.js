'use strict';
let activeMacro = 'RGBI', marketWindow = 90, macroRows = [];
const macroCache = new Map();
function seriesPlot(points, label, unit, step=false) {
  if (!points.length) return '<p class="empty">Наблюдения за выбранный период отсутствуют.</p>';
  const values=points.map(p=>p[1]), min=Math.min(...values), max=Math.max(...values);
  const start=Date.parse(points[0][0]), end=Date.parse(points.at(-1)[0]);
  const x=p=>68+(Date.parse(p[0])-start)/Math.max(end-start,1)*710;
  const y=p=>max===min?65:104-(p[1]-min)/(max-min)*88;
  const line=points.map((p,i)=>(i?(step?'H'+x(p)+'V':'L'+x(p)+' '):'M'+x(p)+' ')+y(p)).join(' ');
  return '<svg class="series-plot" viewBox="0 0 800 140" role="img" aria-label="'+esc(label)+'"><title>'+esc(label)+'</title>'+
    [0,.5,1].map(t=>'<path d="M68 '+(16+88*t)+'H778" stroke="#dce5e6"/><text x="1" y="'+(20+88*t)+'">'+fmt(max-(max-min)*t,2)+'</text>').join('')+
    '<path d="'+line+'" fill="none" stroke="#12766b" stroke-width="3"/><circle cx="'+x(points.at(-1))+'" cy="'+y(points.at(-1))+'" r="4" fill="#12766b"/>'+
    '<text x="68" y="132">'+dt(points[0][0])+'</text><text x="778" y="132" text-anchor="end">'+dt(points.at(-1)[0])+'</text></svg>';
}
function changeText(s) {
  if (s.previous==null || s.code!=='KEY' && !s.previous) return '';
  const delta=s.code==='KEY'?s.value-s.previous:100*(s.value/s.previous-1);
  return (delta>0?'+':'')+fmt(delta)+(s.code==='KEY'?' п. п.':'%');
}
function marketDashboard(m) {
  macroRows=m.series;
  const row=m.series.find(s=>s.code===activeMacro)||m.series[0];
  if (!row) return '<section class="panel"><h2>Рыночные индикаторы</h2><p>За выбранную дату данные отсутствуют.</p></section>';
  const points=row.points.filter(p=>p[0]>=dtadd(row.day,1-marketWindow));
  return '<section class="panel macro" id="macroPanel"><h2>Рыночные индикаторы</h2><div class="macro-grid">'+m.series.map(s=>
    '<button class="macro-card '+(s.code===row.code?'selected':'')+'" data-index="'+esc(s.code)+'" aria-pressed="'+(s.code===row.code)+'"><small>'+esc(s.label)+'</small><strong>'+fmt(s.value)+' '+esc(s.unit)+'</strong><span>'+esc(changeText(s))+' · '+dt(s.day,false)+'</span></button>').join('')+
    '</div><div class="section-head"><div><h3>'+esc(row.label)+'</h3><span class="minor">'+esc(row.code)+' · '+esc(row.unit)+'</span></div><div class="seg">'+[30,90,365,730].map(n=>'<button data-market-days="'+n+'" class="'+(n===marketWindow?'sel':'')+'">'+(n>=365?(n/365)+' г':n+' д')+'</button>').join('')+'</div></div>'+
    seriesPlot(points,row.label,row.unit,row.code==='KEY')+'<div class="sourcebar">'+link(row.url,row.code==='KEY'?'Банк России':'ПАО Московская Биржа')+'<span>Данные на '+dt(row.day)+'</span></div></section>';
}
document.addEventListener('click',e=>{
  const btn=e.target.closest('[data-index],[data-market-days]');
  if(!btn||!$('macroPanel'))return;
  if(btn.dataset.index)activeMacro=btn.dataset.index;
  if(btn.dataset.marketDays)marketWindow=Number(btn.dataset.marketDays);
  $('macroPanel').outerHTML=marketDashboard({series:macroRows});
});
function newsFeed(m){
  return '<section class="panel"><div class="section-head"><h2>Новости рынка</h2>'+link('https://t.me/markettwits','MarketTwits')+'</div>'+
    (m.headlines.length?m.headlines.map(n=>'<div class="docrow"><small>'+dt(n.published,false)+' · '+esc(n.published.slice(11,16))+' МСК</small>'+link(n.url,n.title)+'</div>').join(''):'<p class="sub">В сохранённой ленте нет сообщений на дату анализа.</p>')+'</section>';
}
function ticker(rows, liveTimes={}) {
  const el=$('marketTape');
  if (!rows.length) {el.hidden=true;return;}
  const part=rows.map(s=>'<span><b>'+esc(s.board?s.label:s.code==='KEY'?'Ключевая ставка':s.code)+'</b> '+fmt(s.value)+' '+esc(s.unit)+' <small>'+esc(changeText(s))+' · '+dt(s.day,false)+(liveTimes[s.code]?' '+esc(liveTimes[s.code])+' МСК':'')+'</small></span>').join('');
  el.hidden=false;
  el.querySelector('.tape-track').innerHTML='<div>'+part+'</div><div aria-hidden="true">'+part+'</div>';
}
async function official(path,params) {
  const url=new URL('https://iss.moex.com/iss/'+path+'.json');
  for(const [k,v] of Object.entries({'iss.meta':'off',...params}))url.searchParams.set(k,v);
  const resp=await fetch(url,{signal:AbortSignal.timeout(10000),credentials:'omit'});
  if(!resp.ok)throw Error('ISS '+resp.status);
  return resp.json();
}
function issRows(block) {return block.data.map(row=>Object.fromEntries(block.columns.map((col,i)=>[col,row[i]])));}
let tapeSeq=0;
async function refreshTape(snapshotRows) {
  const token=++tapeSeq, cut=state.date+'|'+state.time;
  let rows=snapshotRows || macroCache.get(cut);
  if(!rows){
    try {const m=await api('/api/macro?'+params());rows=[...m.series,...m.bonds];} catch {return;}
  }
  if(token!==tapeSeq)return;
  macroCache.set(cut,rows);ticker(rows);
  if(state.date!==marketDay||state.time||document.hidden)return;
  const times={};
  try {
    const codes=rows.filter(s=>s.code!=='KEY'&&!s.board).map(s=>s.code);
    const m=await official('engines/stock/markets/index/boards/SNDX/securities',{securities:codes.join(','),'iss.only':'marketdata','marketdata.columns':'SECID,CURRENTVALUE,LASTVALUE,TRADEDATE,UPDATETIME'});
    const market=issRows(m.marketdata);
    const updated=rows.map(s=>{
      const q=market.find(r=>r.SECID===s.code&&r.TRADEDATE===marketDay&&Number.isFinite(r.CURRENTVALUE));
      if(!q)return s;
      times[s.code]=q.UPDATETIME;return {...s,day:q.TRADEDATE,value:q.CURRENTVALUE,previous:q.LASTVALUE};
    });
    if(token===tapeSeq&&cut===state.date+'|'+state.time)ticker(updated,times);
  } catch { /* The visible dates identify the published fallback. */ }
}
setInterval(()=>{if(!document.hidden && state.date===marketDay && !state.time)refreshTape();},120000);
const chartCache=new Map();
async function extendChart(item){
  if(!item.board)return;
  const end=state.time||state.date===marketDay?dtadd(state.date,-1):state.date;
  const path='history/engines/stock/markets/bonds/boards/'+encodeURIComponent(item.board)+'/securities/'+encodeURIComponent(item.bond.secid);
  const key=[path,item.start,end].join('|');
  try{
    let rows=chartCache.get(key);
    if(!rows){
      rows=[];
      for(let offset=0; ;){
        const j=await official(path,{from:item.start,till:end,start:offset,'iss.only':'history,history.cursor','history.columns':'TRADEDATE,CLOSE,VALUE,NUMTRADES,YIELDCLOSE,ACCINT,COUPONVALUE,COUPONPERCENT,CURRENCYID,FACEUNIT'});
        const block=issRows(j.history);rows.push(...block);offset+=block.length;
        if(!block.length||offset>=(j['history.cursor']?.data[0]?.[1]??offset))break;
      }
      chartCache.set(key,rows);
    }
    if(data!==item||!rows.length)return;
    const all=new Map(item.quotes.map(r=>[r.day,r]));
    for(const r of rows){if(r.TRADEDATE<=end && r.NUMTRADES>0 && Number.isFinite(r.CLOSE))all.set(r.TRADEDATE,{day:r.TRADEDATE,price:r.CLOSE,volume:r.VALUE,trades:r.NUMTRADES,yield_close:r.YIELDCLOSE,board:item.board});}
    item.quotes=[...all.values()].sort((a,b)=>a.day.localeCompare(b.day));
    const observed=rows.filter(r=>r.TRADEDATE<=end && r.ACCINT!=null).at(-1);
    if(observed&&(!item.terms||observed.TRADEDATE>item.terms.seen.slice(0,10))){
      item.terms={seen:observed.TRADEDATE,board:item.board,trade_day:observed.TRADEDATE,accrued:observed.ACCINT,
        settlement_currency:observed.CURRENCYID,currency:observed.FACEUNIT,coupon:observed.COUPONVALUE,rate:observed.COUPONPERCENT,
        source:'https://iss.moex.com/iss/'+path+'.json?from='+observed.TRADEDATE+'&till='+observed.TRADEDATE};
      if($('coupons'))$('coupons').outerHTML=couponPanel(item);
    }
    if($('price'))$('price').outerHTML=price();
  }catch{ /* Keep the archived chart when the exchange is unreachable. */ }
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
function defaultEvidence(item){
  const r=item.registry?.[0], missed=item.outcomes?.find(p=>p.late);
  const text=r?'<strong>'+esc(r.status)+'</strong><p>'+esc(r.kind)+' · срок обязательства '+dt(r.due)+
    (r.executed?' · дата исполнения '+dt(r.executed):' · дата исполнения в записи не указана')+'.</p>'+link(r.url,'Запись Мосбиржи'):
    missed?'<strong>Документирована просрочка выплаты</strong><p>'+esc(missed.kind)+' · срок '+dt(missed.due)+'.</p>'+link(missed.url,missed.source):
    '<p>На дату среза в подключённых источниках нет записи о дефолте этого выпуска.</p>';
  return '<section class="panel" id="defaultEvidence"><h3>Платёжные нарушения по документам</h3>'+text+
    '<p class="sub">Статус относится к указанному обязательству.</p><details><summary>Как радар устанавливает нарушение</summary><p>Для выпуска сопоставляются вид платежа, договорный срок и раскрытие об исполнении. Если в реестре Мосбиржи есть запись, карточка воспроизводит её формулировку: «Технический дефолт» или «Дефолт». Позднейшее исполнение показывается отдельной датой. Отсутствие публикации оставляет исход неизвестным.</p><p>Финансовые коэффициенты и динамика цены помогают оценивать риск будущего платежа. Численная вероятность дефолта в этой версии не рассчитывается.</p></details></section>';
}
async function copyForChatGPT(){
  const list=chats.get(chatKey())||[];
  const question=$('question').value.trim()||list.filter(m=>m.user).at(-1)?.user;
  if(!question){$('gptStatus').textContent='Введите вопрос или выберите выпуск и задайте вопрос в чате.';return;}
  const answer=await api('/api/chat',{...state,question,history:list.filter(m=>m.user).slice(-4).map(m=>m.user)});
  const refs=answer.refs||[];
  const material=['Дата анализа: '+state.date,'Вопрос: '+question,
    data?'Выбранный выпуск: '+data.bond.name+' ('+data.bond.id+')':'',
    'Сведения радара: '+answer.text,...refs.map((r,i)=>(i+1)+'. '+r.label+' — '+r.url),
    'Ответь на русском языке в аналитическом стиле. Подтверди цифры ссылками, укажи дату сведений и отдельно обозначь выводы, для которых данных недостаточно.'].filter(Boolean).join('\n\n');
  try {await navigator.clipboard.writeText(material);$('gptStatus').textContent='Вопрос и источники скопированы. Откройте ChatGPT и вставьте текст.';}
  catch {modal('Материалы для ChatGPT','<textarea readonly rows="12" style="width:100%">'+esc(material)+'</textarea>');}
}
function financialPanel(reports,selectedPeriod){
  if(!reports.length)return '<section class="panel" id="fundamentals"><h3>Финансовое состояние эмитента</h3><p class="sub">На выбранную дату нет сопоставленной отчётности Smart-Lab по этому ИНН. Финансовые коэффициенты не рассчитаны.</p></section>';
  const r=reports.find(v=>v.period===selectedPeriod)||reports[0],priority=['interest_cover','net_leverage','ocf','fcf','net_income','roe'];
  const rows=Object.entries(r.metrics);
  const metrics=priority.filter(k=>r.metrics[k]).slice(0,4).map(k=>r.metrics[k]);
  const key=['ocf','net_income','revenue'].find(k=>r.metrics[k]);
  const fiscalEnd=period=>period.length===4?period+'-12-31':period.slice(0,4)+['-03-31','-06-30','-09-30','-12-31'][Number(period.at(-1))-1];
  const history=key?reports.filter(x=>x.period.length===r.period.length&&x.standard===r.standard&&x.metrics[key]?.unit===r.metrics[key].unit&&x.period<=r.period).sort((a,b)=>a.period.localeCompare(b.period)).map(x=>[fiscalEnd(x.period),x.metrics[key].value]):[];
  const options=reports.map(x=>'<option value="'+esc(x.period)+'" '+(x.period===r.period?'selected':'')+'>'+esc(x.period)+' · '+esc(x.standard)+'</option>').join('');
  return '<section class="panel" id="fundamentals"><div class="section-head"><h3>Финансовое состояние эмитента</h3><span class="badge">'+esc(r.standard)+' · '+esc(r.period)+'</span></div><label class="minor">Отчётный период <select id="statementPeriod">'+options+'</select></label><p class="sub">Опубликован '+dt(r.published)+'</p><div class="metrics">'+metrics.map(m=>'<div><small>'+esc(m.name)+'</small><strong>'+fmt(m.value)+' '+esc(m.unit)+'</strong></div>').join('')+'</div><h4>Факторы финансового риска</h4>'+
    (r.flags.length?'<ul>'+r.flags.map(f=>'<li>'+esc(f.text)+' <strong>'+fmt(r.metrics[f.key].value)+' '+esc(r.metrics[f.key].unit)+'</strong></li>').join('')+'</ul>':'<p class="sub">По доступным показателям заданные условия предупреждения не выполнены.</p>')+
    (history.length>1?'<h4>'+esc(r.metrics[key].name)+' · '+esc(r.metrics[key].unit)+'</h4>'+seriesPlot(history,r.metrics[key].name,r.metrics[key].unit):'')+
    '<details><summary>Показатели отчётности и коэффициенты ('+rows.length+')</summary><div class="tablewrap"><table><tbody>'+rows.map(([,m])=>'<tr><td>'+esc(m.name)+'</td><td>'+fmt(m.value,3)+' '+esc(m.unit)+'</td></tr>').join('')+'</tbody></table></div></details><div class="sourcebar">'+link(r.url,'Smart-Lab · финансовые показатели')+(r.original?link(r.original,'Отчёт эмитента'):'')+'</div></section>';
}

document.addEventListener('change',event=>{if(event.target.id==='statementPeriod'&&data)$('fundamentals').outerHTML=financialPanel(data.financials,event.target.value);});
