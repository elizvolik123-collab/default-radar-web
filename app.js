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
const moscowDay=()=>new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Moscow'}).format(new Date());
const marketDay=moscowDay();
const initial={mode:'live',id:'',date:marketDay,tab:'market',period:30,horizon:90,week:'',event:'',point:'',section:'detail',time:'',board:'',specific:'',unit:'rub'};
function readState(){const p=new URLSearchParams(location.search);const view=Object.fromEntries(Object.entries(initial).map(([k,v])=>[k,p.get(k)||v]));if(view.mode==='demo'&&!p.has('date'))view.date='2026-11-24';return view;}
let state=readState(), data=null, stats=null, seq=0, searchSeq=0, offset=0, timer, loadingChat=false;
const chats=new Map();
const chatKey=()=>[state.mode,state.id,state.date,state.time].join('|');
const params=()=>new URLSearchParams(Object.entries(state).filter(([,v])=>v!=='' && v!=null));
function save(push=false){const query=params();if(state.mode==='live' && state.date===moscowDay() && !state.time)query.delete('date');const url='?'+query;if(location.search!==url)history[push?'pushState':'replaceState']({},'',url);}
async function api(url,body){if(window.pagesRadar){const result=await window.pagesRadar.request(url,body);if(result?.code==='coverage')throw Object.assign(Error(result.error),{code:result.code,identity:result.identity});return result;}const r=await fetch(url,body?{method:'POST',headers:{'Content-Type':'application/json','X-Radar':'1'},body:JSON.stringify(body)}:{});const d=await r.json();if(!r.ok)throw Object.assign(Error(d.error||'Сервер недоступен'),{code:d.code,identity:d.identity});return d;}
function notice(msg){$('notice').innerHTML=msg?'<div class="strip">'+esc(msg)+(msg.startsWith('Браузер не смог')||msg.startsWith('Не удалось прочитать')?' <button data-action="retry">Повторить загрузку</button>':'')+'</div>':'';}
function scrollToPart(id){requestAnimationFrame(()=>$(id)?.scrollIntoView({block:'start'}));}
function modal(title,html){$('modalTitle').textContent=title;$('modalBody').innerHTML=html;if(!$('modal').open)$('modal').showModal();}
function quitModal(){$('modal').close();}
function dtadd(day,n){const d=new Date(day+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);}
function fromDay(day){return Date.parse(day.slice(0,10)+'T12:00:00Z')/86400000;}
function tabs(){
  const chat=state.tab==='chat';
  document.documentElement.classList.toggle('chat-viewport',chat);
  $('market').classList.toggle('hide',chat);$('chat').classList.toggle('hide',!chat);
  document.querySelectorAll('[data-tab]').forEach(b=>{b.classList.toggle('active',b.dataset.tab===state.tab);b.setAttribute('aria-pressed',b.dataset.tab===state.tab);});
  $('pageTitle').textContent=chat?'Спросить помощника':'Рынок облигаций';
  $('subtitle').textContent=chat?'Разбор выпуска с опорой на первоисточники':'Выпуски, платежи и кредитные события';
  const dateBlock=$('asof').closest('.date-wrap');
  (chat?$('contextGroup'):document.querySelector('.page-head')).append(dateBlock);
  $('asof').value=state.date;
  if(chat)stopBondFeed();else if(data?.request===seq)startBondFeed(data);
}
let unavailableCard='', partialReports=[];
async function load(push=false){
  if($('modal').open && $('modalBody').querySelector('#attentionEvents, #cohortEvidence'))quitModal();
  unavailableCard='';partialReports=[];
  const token=++seq;stopBondFeed();stopTapeFeed();save(push);tabs();notice(''); if($('screen').open)refreshScreen();
  $('marketHome').innerHTML='';
  if(!state.id){
    data=null;$('detail').innerHTML='';renderChat();
    try{const m=await api('/api/market?'+params());if(token!==seq)return;marketHome(m);notice('');if(!$('catalog').classList.contains('hide'))searchList();}catch(e){notice(e.message);}
    return;
  }
  try{const result=await api('/api/bond?'+params());if(token!==seq)return;data=result;data.request=token;render();refreshTape();startBondFeed(result);notice('');if(!$('catalog').classList.contains('hide'))searchList();}
  catch(e){
    if(token!==seq)return;
    data=null;
    if(e.code==='coverage'){
      const issue=e.identity||{};
      const issuer=issue.inn==='7708503727'?'РЖД':issue.issuer_name||issue.name||state.id;
      const date=new Intl.DateTimeFormat('ru-RU',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(state.date+'T12:00:00Z')).replace(/ г\.$/,' года');
      const message='На '+date+' недостаточно данных для полного разбора '+issuer+'.';
      unavailableCard='<article class="panel"><h2>'+esc(issue.name||state.id)+'</h2><span class="mono">'+esc(issue.isin||state.id)+'</span><p>'+esc(message)+'</p></article>';
      $('detail').innerHTML=unavailableCard;
      $('chatContext').innerHTML=unavailableCard;
      notice(message+' Выберите другую дату.');
      if(issue.inn){
        try{
          const query=params();query.set('issuer',issue.inn);
          const facts=await api('/api/fundamentals?'+query);
          if(token!==seq)return;
          partialReports=facts.reports;
          const filings=facts.filings.filter(f=>!f.isin||f.isin===issue.isin);
          const reason=issue.inn==='7710168360'?'Для выпусков Минфина России корпоративная отчётность неприменима.':
            facts.fns?'Из финансовых данных подтверждены годовые суммы ФНС. Баланс и денежный поток в базе пока отсутствуют.':
            filings.length?'Есть публикации эмитента. Проверенные числовые показатели отчётности пока отсутствуют.':
            'На эту дату в базе нет проверенных финансовых показателей этого эмитента.';
          const reports=partialReports.length?financialPanel(partialReports):'<section class="panel" id="fundamentals"><h3>Финансовое состояние эмитента</h3><p>'+reason+'</p></section>';
          const docs=filings.length?'<section class="panel"><details><summary>Раскрытия эмитента ('+filings.length+')</summary>'+filings.map(f=>'<p>'+dt(f.published)+' · '+link(f.url,f.title)+'</p>').join('')+'</details></section>':'';
          $('detail').insertAdjacentHTML('beforeend',reports+fnsPanel(facts.fns)+docs);
        }catch{if(token!==seq)return;$('detail').insertAdjacentHTML('beforeend','<p>Не удалось загрузить сведения об отчётности.</p>');}
      }
    }else{
      $('detail').innerHTML='<p class="empty">Не удалось загрузить карточку выпуска.</p>';
      $('chatContext').textContent='Не удалось загрузить данные выпуска';
      notice(e.message);
      if(!$('notice').querySelector('button'))$('notice').insertAdjacentHTML('beforeend','<button data-action="retry">Повторить загрузку</button>');
    }
    $('dialogue').innerHTML='';
  }
}
const attentionLabels={overdue:'Открытые просрочки',raised:'Новые предупреждения',paid:'Подтверждения выплат',entered:'До выплаты 7 дней'};
function attentionList(items){
  const counts=new Map();
  for(const item of items)counts.set(item.group,(counts.get(item.group)||0)+1);
  const summary=[...counts].map(([group,count])=>'<li><span>'+esc(attentionLabels[group]||'Другие события')+'</span> <b>'+fmt(count)+'</b></li>').join('');
  return '<section class="panel attention-panel" id="marketAttention" aria-labelledby="attentionTitle"><div><h2 id="attentionTitle">Что требует внимания</h2><span class="sub">События за <time datetime="'+esc(state.date)+'">'+dt(state.date)+'</time></span></div>'+
    (items.length?'<ul aria-label="События по типам">'+summary+'</ul><button id="showAttention" class="lightbtn" type="button" aria-haspopup="dialog">Все события ('+fmt(items.length)+')</button>':
      '<p class="sub">Новых событий за эту дату нет.</p>')+'</section>';
}
function openAttention(items,day){
  const pageSize=5;
  const groups=[...new Set(items.map(item=>item.group))];
  modal('События за '+dt(day),'<div id="attentionEvents"><label'+(groups.length<2?' hidden':'')+'>Тип события <select id="attentionFilter"><option value="">Все типы</option>'+
    groups.map(group=>'<option value="'+esc(group)+'">'+esc(attentionLabels[group]||'Другие события')+'</option>').join('')+'</select></label>'+
    '<div id="attentionRows"></div><div class="attention-nav"><span id="attentionRange" role="status"></span>'+
    '<div><button class="lightbtn" type="button" id="attentionPrev">Назад</button><button class="lightbtn" type="button" id="attentionNext">Далее</button></div></div></div>');
  let start=0;
  function renderPage(){
    const group=$('attentionFilter').value;
    const rows=group?items.filter(item=>item.group===group):items;
    const end=Math.min(rows.length,start+pageSize);
    $('attentionRows').innerHTML=rows.slice(start,end).map(item=>'<div class="docrow"><div><button data-bond="'+esc(item.id)+'">'+esc(item.name)+'</button><small>'+
      esc(attentionLabels[item.group]||'Событие')+' · '+esc(item.kind)+' · срок '+dt(item.due)+'</small></div>'+
      link(item.url,item.group==='entered'?'График':item.group==='raised'?'Торги':'Документ')+'</div>').join('');
    $('attentionRange').textContent=(rows.length>pageSize?fmt(start+1)+'–'+fmt(end)+' из ':'Всего событий — ')+fmt(rows.length);
    $('attentionPrev').parentElement.hidden=rows.length<=pageSize;
    $('attentionPrev').disabled=start===0;
    $('attentionNext').disabled=end===rows.length;
  }
  $('attentionFilter').onchange=()=>{start=0;renderPage();};
  $('attentionPrev').onclick=()=>{start-=pageSize;renderPage();};
  $('attentionNext').onclick=()=>{start+=pageSize;renderPage();};
  renderPage();
}
function paymentBrief(item){
  const f=item.forecast, next=item.next, expert=item.expert, q=item.quality;
  const signal=f?.state==='signal';
  const driver=f?.driver;
  const impact=driver?.effect ? ' Наибольший вклад среди ценовых факторов '+(driver.effect>0?'повышает':'снижает')+' оценку риска: '+(driver.feature==='price'?'уровень цены относительно номинала.':'динамика цены за период.') : '';
  const states={confirmed:'Исполнение предыдущего платежа подтверждено.',unknown:'Для предыдущего обязательства нет однозначного подтверждения исполнения.',first:'Предстоит первый купон выпуска.',overdue:'По предыдущей выплате документирована открытая просрочка.',conflict:'Документы расходятся в дате или статусе предыдущей выплаты.'};
  const factor=Object.entries(expert?.blocks||{}).filter(([,v])=>v?.reason&&v.url).sort(([a,x],[b,y])=>(item.weights[b]||0)*y.points-(item.weights[a]||0)*x.points)[0]?.[1];
  const disagree=signal && expert?.eligible && expert.score!=null &&
    ((f.alert&&expert.level==='Низкий')||(!f.alert&&['Высокий','Повышенный'].includes(expert.level)));
  const docs=q?.previous==='first'&&!q.documents?.length?link('https://iss.moex.com/iss/statistics/engines/stock/markets/bonds/bondization/'+encodeURIComponent(item.bond.secid)+'.json','График Мосбиржи'):(q?.documents||[]).map((url,i)=>link(url,'Документ '+(i+1))).join(' · ');
  return '<section class="payment-brief"><h3>'+(next?esc(next.kind)+' · '+dt(next.date):'Дата следующего платежа неизвестна')+'</h3>'+
    '<p><b>Прогноз платежа.</b> '+(signal?(f.alert?'Модель предупреждает о риске просрочки.':'Порог предупреждения не достигнут.')+' Цена закрытия '+fmt(f.close)+'% номинала, изменение с '+dt(f.start)+' — '+fmt(f.change)+' п. п. '+link(f.url,'Торги')+impact:esc(f?.reason||'Прогноз недоступен.'))+'</p>'+
    '<p><b>Состояние эмитента и выпуска.</b> '+(expert?.eligible&&expert.score!=null?esc(expert.level)+' риск по экспертному индексу · '+fmt(expert.score)+' из 100. '+(factor?esc(factor.reason)+' '+link(factor.url,'Основание'):''):'Экспертная оценка недоступна.')+'</p>'+
    (disagree?'<p>Оценки расходятся. Прогноз ближайшей выплаты использует цену и её изменение. Экспертный индекс учитывает также раскрытия и факторы состояния эмитента.</p>':'')+
    '<p><b>Полнота данных.</b> '+(q?states[q.previous]+' '+docs+' '+(q.federal?'Корпоративная отчётность к ОФЗ неприменима.':q.fresh?'Есть свежие сопоставимые показатели отчётности.':'Не хватает свежих сопоставимых показателей отчётности.')+(q.terms?'':' Параметры ближайшего купона неполны.'):'Для этого выпуска полнота данных на выбранную дату не оценена.')+'</p></section>';
}
function cohortVerdict(group,flag){
  if(group==='В срок')return flag?'Ложные тревоги':'Выплаты в срок без сигнала';
  return flag?'Выявлено':'Пропущено';
}
function cohortDocument(label,url,observed){
  return '<div>'+esc(label)+' · '+(url?link(url,'Документ'):'Ссылка отсутствует')+
    (observed?' <small>в архиве '+dt(observed)+'</small>':'')+'</div>';
}
function cohortRecord(row,groupBy){
  let docs=cohortDocument('Исход платежа',row.outcome_url,row.outcome_published);
  if(row.event_status_url && row.event_status_url!==row.outcome_url)
    docs+=cohortDocument('Категория платежа',row.event_status_url,row.event_status_published);
  if(groupBy==='group' && row.status_url && ![row.event_status_url,row.outcome_url].includes(row.status_url))
    docs+=cohortDocument('Статус выпуска',row.status_url,row.status_published);
  return '<li><strong>'+esc(row.name)+'</strong> <span class="mono">'+esc(row.isin)+'</span>'+
    '<p>'+esc(row.kind)+' · срок <b>'+dt(row.due)+'</b> · прогноз на '+dt(row.anchor)+'</p>'+
    '<p>Исход платежа · '+esc(row.event_group||'Категория не подтверждена')+
    (groupBy==='group'?' · Статус выпуска · '+esc(row.group):'')+'</p>'+docs+'</li>';
}
async function openCohortEvidence(button){
  const {study,asof,group,groupBy,field,flag,count}=button.dataset;
  const title=cohortVerdict(group,Number(flag))+' · '+group;
  if(!$('modal').open)button.focus({preventScroll:true});
  modal(title,'<div id="cohortEvidence"><p role="status">Загружаем выпуски…</p></div>');
  const body=$('cohortEvidence');
  body.onkeydown=event=>{
    if(event.key==='Escape'){event.preventDefault();quitModal();}
  };
  try{
    const response=await fetch('research/'+study+'_evidence.json',{cache:'no-cache'});
    if(!response.ok)throw Error('Не удалось загрузить документы выборки.');
    const detail=await response.json();
    if(!body.isConnected || !$('modal').open)return;
    const matches=detail.rows.filter(row=>row[groupBy]===group && row[field]===Number(flag));
    if(detail.asof!==asof || matches.length!==Number(count))throw Error('Таблица и список относятся к разным версиям выборки. Обновите страницу.');
    const limit=5;
    body.innerHTML='<p>'+(field==='price_alert'?'Проверка по котировкам':groupBy==='group'?'По статусу выпуска':'По исходу платежа')+
      ' · срез '+dt(asof)+' · выпусков '+fmt(matches.length)+'</p>'+
      (matches.length>limit?'<label>Найти выпуск<input type="search" placeholder="Название или ISIN"></label>':'')+
      '<p role="status"></p><ul class="cohort-records"></ul><div class="cohort-pager"><button type="button" class="lightbtn">Назад</button><button type="button" class="lightbtn">Далее</button></div>';
    const input=body.querySelector('input'),pager=body.querySelector('.cohort-pager');
    const [prev,next]=pager.querySelectorAll('button');
    let start=0;
    function render(){
      const query=(input?.value||'').trim().toLocaleLowerCase('ru');
      const filtered=query?matches.filter(row=>(row.name+' '+row.isin).toLocaleLowerCase('ru').includes(query)):matches;
      const end=Math.min(start+limit,filtered.length);
      body.querySelector('[role=status]').textContent=filtered.length?'Показано '+(start+1)+'–'+end+' из '+filtered.length:query?'Совпадений нет.':'В этой категории нет выпусков.';
      body.querySelector('ul').innerHTML=filtered.slice(start,end).map(row=>cohortRecord(row,groupBy)).join('');
      pager.hidden=filtered.length<=limit;
      prev.disabled=start===0;
      next.disabled=end===filtered.length;
    }
    if(input)input.oninput=()=>{start=0;render();};
    prev.onclick=()=>{start-=limit;render();};
    next.onclick=()=>{start+=limit;render();};
    render();
  }catch(error){
    if(!body.isConnected || !$('modal').open)return;
    body.innerHTML='<p role="status">'+esc(error.message)+'</p><button type="button" class="lightbtn">Повторить</button>';
    body.querySelector('button').onclick=()=>openCohortEvidence(button);
  }
}
function cohortResults(current,fixed){
  const study=fixed||current;
  if(!study)return '';
  const dataset=fixed?'schedule_review_522':'cohort_validation';
  function value(g,key,flag,groupBy,file,asof){
    const count=flag?g[key].signals:g[key].quiet;
    const result=cohortVerdict(g.name,flag);
    return '<button type="button" class="cohort-value" aria-haspopup="dialog" data-study="'+file+'" data-asof="'+esc(asof)+'" data-group="'+esc(g.name)+'" data-group-by="'+groupBy+'" data-field="'+key+'" data-flag="'+flag+'" data-count="'+count+'" aria-label="'+esc(result+' · '+g.name+' · '+fmt(count))+'">'+fmt(count)+'</button>';
  }
  const rows=(key,groups,groupBy,file,asof)=>groups.map(g=>{
    const m=g[key],control=g.name==='В срок';
    const known=key==='alert'?'<td>'+(g.preannounced==null?'—':fmt(g.preannounced))+'</td>':'';
    return '<tr><th scope="row">'+esc(g.name)+'</th><td>'+fmt(g.total)+'</td><td>'+fmt(g.issuers)+'</td>'+known+'<td>'+fmt(m.scored)+'</td><td>'+fmt(g.total-m.scored)+'</td><td>'+(m.scored?value(g,key,1,groupBy,file,asof)+(control?' ложн.':''):'—')+'</td><td>'+(m.scored?value(g,key,0,groupBy,file,asof):'—')+'</td></tr>';
  }).join('');
  const table=(key,groups=study.groups,groupBy='group',file=dataset,asof=study.asof)=>'<div class="tablewrap" tabindex="0" aria-label="Результаты по группам выпусков"><table><thead><tr>'+
    ['Исход','Выпуски','Эмитенты',...(key==='alert'?['График известен за 7 дней']:[]),'Оценено','Без оценки','Сигнал','Без сигнала'].map(s=>'<th scope="col">'+s+'</th>').join('')+'</tr></thead><tbody>'+rows(key,groups,groupBy,file,asof)+'</tbody></table></div>';
  const outcomes=study.payments||study.groups;
  const groupBy=study.payments?'event_group':'group';
  const mobileSummary='<dl class="cohort-mobile-results">'+outcomes.map(g=>{
    const m=g.alert;
    const number=flag=>m.scored?value(g,'alert',flag,groupBy,dataset,study.asof):'—';
    const verdict=g.name==='В срок'?'Ложные тревоги — '+number(1):'Выявлено — '+number(1)+', пропущено — '+number(0);
    return '<dt>'+esc(g.name)+'</dt><dd>'+verdict+'. Без оценки — '+fmt(g.total-m.scored)+'.</dd>';
  }).join('')+'</dl>';
  return '<section class="panel" id="cohortStudy"><h2>Как модель распознавала дефолты</h2>'+
    '<p>Проверка за семь дней до платежа. Дата оценки — с '+dt(study.cutoff)+', исходы собраны по '+dt(study.asof)+'. Каждый выпуск входит только в одну группу.</p>'+
    '<h3>'+(study.payments?'По исходу проверяемой выплаты':'Когда срок выплаты был известен заранее')+'</h3><p class="sub">Нажмите на число сигналов или пропусков, чтобы увидеть выпуски и документы.</p>'+mobileSummary+table('alert',outcomes,groupBy)+
    (study.unmatched_payments?'<p>Без подтверждённой категории конкретной просрочки: '+fmt(study.unmatched_payments)+'.</p>':'')+
    '<p>У проблемных выпусков «без сигнала» означает пропуск. В группе «В срок» срабатывание означает ложную тревогу. В колонке «Без оценки» — выпуски, для которых не хватило условий для прогноза.</p>'+
    (study.payments?'<details><summary>По наиболее серьёзному статусу выпуска</summary><p>Здесь выпуск отнесён к дефолтам, если на дату исследования в реестре был хотя бы один дефолт. Первый просроченный платёж у него мог закончиться техническим дефолтом.</p>'+table('alert')+'</details>':'')+
    '<details><summary>Что показывали котировки до нарушения</summary><p>Повторный расчёт с известной сегодня датой выплаты. Он показывает, распознавала ли модель ценовые признаки, даже если в архиве тогда не было графика. Группировка по наиболее серьёзному статусу выпуска.</p>'+table('price_alert')+
    '<p>Доля срабатываний при одинаковом весе каждого оценённого эмитента</p><ul>'+study.groups.map(g=>'<li>'+esc(g.name)+' — '+(g.price_alert.issuer_mean==null?'нет оценки':fmt(100*g.price_alert.issuer_mean,1)+'% ('+fmt(g.price_alert.issuers)+' эмит.)')+'</li>').join('')+'</ul></details>'+
    '<details><summary>Как выбраны выпуски</summary><p>Проверяем рублёвые выпуски режима TQCB. Для проблемного выпуска берём первую известную просрочку. Для контроля берём первый подтверждённый своевременный платёж в тестовом периоде по выпускам без известной просрочки. При совпадении дат первым берём купон.</p>'+
    '<p>Для таблицы по платежам проверяем в реестре Мосбиржи именно этот ISIN, дату и вид обязательства. График должен быть опубликован к концу московского дня за семь календарных дней до срока. В выгрузке указаны даты и ссылки на график и на документ об исходе.</p>'+
    '<p>Веса модели и порог сохранены. Использованы торги до дня прогноза. Наличие нескольких выпусков у одного эмитента и доступность документов влияют на состав выборки. Эти доли нельзя переносить на весь рынок.</p></details>'+
    (fixed?'<p><a href="research/schedule_review_522.csv" download>Результаты по 522 выпускам · CSV</a> · <a href="research/cohort_backfill_283.csv" download>Сделки и документы по 283 перепроверенным выпускам · CSV</a></p>':'')+
    (current?'<details><summary>Текущая выборка на '+dt(current.asof)+'</summary>'+table('alert',current.payments||current.groups,current.payments?'event_group':'group','cohort_validation',current.asof)+'<p><a href="research/cohort_validation.csv" download>Скачать текущую проверку по ISIN · CSV</a></p></details>':'')+'</section>';
}
function marketHome(m){
  const research=m.research;
  refreshTape([...m.series,...m.bonds]);
  const methodology=(research?'<details class="panel"><summary>Насколько точны предупреждения о просрочке?</summary><p>Проверка на последующих выплатах показывает, сколько просрочек удалось выявить и сколько предупреждений оказались ложными.</p><p>Горизонт от 1 до '+research.lead_days+' дней. Модель проверяет рыночную цену рублёвых корпоративных облигаций перед выплатой. Виды обязательств в модели — '+Object.keys(research.variants).map(esc).join(', ').toLowerCase()+'.</p><div class="metrics">'+[
      ['Платежей с подтверждением',research.universe.n],['Своевременных',research.universe.ontime],['С просрочкой',research.universe.late],['Купонов в позднем тесте за 7 дней',research.test.n]].map(([k,v])=>'<div><small>'+k+'</small><strong>'+fmt(v)+'</strong></div>').join('')+'</div><details><summary>Результаты на более поздних купонах</summary><p>Обучение по документам до '+dt(research.cutoff)+'. Проверка по срокам с '+dt(research.test.first)+' по '+dt(research.test.last)+'. Сигнал сработал перед '+fmt(research.test.tp)+' из '+fmt(research.test.late)+' просрочек. Ложных тревог — '+fmt(research.test.fp)+' из '+fmt(research.test.ontime)+' своевременных платежей.</p><p>ROC AUC '+fmt(research.test.roc_auc,3)+' · у постоянного прогноза 0,5. Своевременные платежи в обучении подтверждены у '+fmt(research.train_performing_issuers)+' эмитентов. Частота просрочек в этой выборке отличается от рынка.</p><p>Правило «цена ≤ 90% номинала» предупредило '+fmt(research.price_rule.tp)+' просрочек при '+fmt(research.price_rule.fp)+' ложных тревогах.</p>'+research.examples.map(e=>'<div class="docrow"><div><strong>'+esc(e.name)+'</strong><small>'+dt(e.due)+' · '+esc(e.outcome)+'</small></div>'+link(e.url,'Исход')+' '+link(e.price_url,'Торги')+'</div>').join('')+'<p><a href="research/payments.csv" download="payment_outcomes.csv">Скачать историю выплат и результаты (CSV)</a></p></details></details>':'');
  const coverage=m.analysis_coverage, first=research?.first_defaults;
  const gaps=coverage.missing;
  const breakdown='<h3>Что ограничивает полный разбор</h3><p>До платежа больше семи дней у <strong>'+fmt(coverage.outside_window)+'</strong> выпусков. Ещё у <strong>'+fmt(coverage.inside_unscored)+'</strong> срок в пределах окна, но модель не рассчитала прогноз.</p><details><summary>Пробелы по всем '+fmt(coverage.total)+' выпускам</summary><div class="tablewrap"><table><thead><tr><th>Не хватает</th><th>Весь каталог</th><th>С прогнозом</th></tr></thead><tbody>'+[
    ['Цена сделки за окно отбора','price'],['НКД','accrued'],['Сумма купона','coupon'],['Актуальная дата ближайшего купона','coupon_date'],['Подтверждённое исполнение предыдущего платежа','previous'],['В том числе не установлен срок предыдущей выплаты','no_previous_date'],['Два сопоставимых отчётных периода','reports'],['Периоды сопоставимы, но последний устарел','stale_reports']
  ].map(([label,key])=>'<tr><th scope="row">'+label+'</th><td>'+fmt(gaps[key])+'</td><td>'+fmt(coverage.missing_scored[key])+'</td></tr>').join('')+'</tbody></table></div>' +'<p>Числа показывают, скольким выпускам не хватает каждого поля. Один выпуск может попасть в несколько строк. ОФЗ без требования корпоративной отчётности: '+fmt(coverage.sovereign)+'.</p></details>';
  const auditLink=coverage.asof.slice(0,10)==='2026-11-26' ? '<p><a href="research/coverage_781_2026-11-26.csv" download>Скачать проверку 781 выпуска по ISIN · CSV</a></p>' : '';
  const summary='<section class="panel"><h2>Покрытие анализа на '+dt(coverage.asof)+'</h2><p><strong>'+fmt(coverage.full)+' из '+fmt(coverage.scored)+'</strong> выпусков с прогнозом доступны для полного разбора. До '+dt(dtadd(state.date,7))+' включительно предстоят платежи по '+fmt(coverage.total-coverage.outside_window)+' выпускам. Модель рассчитала прогноз для '+fmt(coverage.scored)+' из них. Всего в каталоге '+fmt(coverage.total)+'.</p></section>'+attentionList(m.attention||[])+'<section class="panel">'+breakdown+auditLink+'<details><summary>Как считаем полный разбор</summary><p>Считаем уникальные выпуски с рыночной ценой, прогнозом на ближайшие семь дней, НКД и суммой ближайшего купона, подтверждённой датой исполнения предыдущего известного платежа и двумя сопоставимыми отчётными периодами. Последний период закончился не более 370 дней назад.</p>'+coverage.ids.map(id=>'<button data-bond="'+esc(id)+'">'+esc(id)+'</button>').join('')+'</details>'+
    (first?'<h3>Предупреждение о первой просрочке</h3><p>За семь дней до срока модель выявила <strong>'+fmt(first.tp)+' из '+fmt(first.late)+'</strong> просроченных купонов и пропустила <strong>'+fmt(first.fn)+'</strong>. Из '+fmt(first.tp+first.fp)+' предупреждений подтвердились '+fmt(first.tp)+(first.tp+first.fp?' ('+fmt(100*first.tp/(first.tp+first.fp),1)+'%)':'')+', ложных — '+fmt(first.fp)+'. В выборке '+fmt(first.n)+' платежей. Проверка за '+dt(research.test.first)+' — '+dt(research.test.last)+'. Учитываются купоны на первую известную дату просрочки каждого эмитента.</p>':'')+'</section>';
  $('marketHome').innerHTML=cohortResults(research?.cohorts,research?.schedule_review)+summary+marketDashboard(m)+'<section id="paymentCalendar" class="panel"><h2>Календарь облигационных выплат</h2><div class="calendar-body"></div></section>'+
    (research?'<details id="marketWatch" class="panel"><summary>Сигналы риска по выплатам на семь дней</summary><div aria-live="polite"></div></details>':'')+newsFeed(m)+methodology;
  if($('showAttention'))$('showAttention').onclick=()=>openAttention(m.attention,state.date);
  if($('cohortStudy'))$('cohortStudy').onclick=event=>{
    const button=event.target.closest('button[data-study]');
    if(button)openCohortEvidence(button);
  };
  initPaymentCalendar($('paymentCalendar').querySelector('.calendar-body'));
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
  const sources=(stats.source_registry||[]).map(s=>{
    const count=s.count==null?'':fmt(s.count)+' '+esc(s.unit);
    const stamp=s.latest?'Последняя запись '+dt(s.latest.slice(0,10)):'';
    const latest=s.latest_url?link(s.latest_url,stamp):stamp;
    return '<div class="docrow"><div>'+link(s.url,s.name)+'<small>'+esc(s.access)+'</small></div><div>'+count+'<small>'+latest+'</small></div></div>';
  }).join('');
  const counts=[['Выпуски',stats.bonds],['С котировками',stats.quotes],['С календарём',stats.plans],['Со свидетельствами об исходах',stats.outcome_bonds]];
  modal('Источники и покрытие','<p class="meta">Состав архива по всем датам. Для каждого источника указаны способ получения и дата последней сохранённой записи, если она известна.</p><div class="metrics">'+counts.map(([k,v])=>'<div><small>'+k+'</small><strong>'+(v==null?'—':fmt(v))+'</strong></div>').join('')+'</div><p class="meta">В реестре нарушений биржи '+fmt(stats.registry_records)+' записей. С каталогом связано '+fmt(stats.registry_bonds)+' выпусков.</p>'+sources+'<details><summary>Журнал попыток обновления</summary>'+logs+'</details>');
}
function timeline(){
  return '<div class="timeline"><strong>Исторический срез</strong>'+(state.id===MAIN?presets:[]).map(v=>'<button data-date="'+v+'" class="'+(state.date===v?'sel':'')+'">'+dt(v,false)+'</button>').join('')+('<label class="minor">Время МСК <input aria-label="Время среза" type="time" id="clock" value="'+esc(state.time||'')+'"></label>')+'</div>';
}
function violationStatus(item){
  const evidence=[
    ...(item.outcomes||[]).filter(v=>v.late===1).map(v=>({date:v.due,published:v.published,url:v.url})),
    ...(item.registry||[]).map(v=>({date:v.due,published:v.observed,url:v.url})),
    ...(item.events||[]).filter(v=>v.bond===item.bond.id&&v.kind==='Просрочка').map(v=>({date:v.day,published:v.published,url:v.url}))
  ];
  if(item.payment?.overdue>0)evidence.push({date:item.payment.date,published:item.payment.published,url:item.payment.url});
  const last=evidence.filter(v=>v.url&&v.published).sort((a,b)=>b.published.localeCompare(a.published))[0];
  return last?['Зафиксировано · '+dt(last.date),'',last]:['Нет подтверждения на дату среза','',null];
}
function decisionBanner(conclusion){
  if(!conclusion)return '';
  const symbols={danger:'!',watch:'!',low:'✓',neutral:'i',unknown:'?'};
  const tone=Object.hasOwn(symbols,conclusion.tone)?conclusion.tone:'unknown';
  return '<section class="credit-conclusion cc-'+tone+'" aria-label="Вывод по кредитному риску"><span class="cc-symbol" aria-hidden="true">'+symbols[tone]+'</span><div><small>Вывод по кредитному риску</small><h3>'+esc(conclusion.title)+'</h3><p>'+esc(conclusion.detail)+'</p>'+
    (conclusion.source?link(conclusion.source,'Основание · '+dt(conclusion.published)):'')+'</div></section>';
}
function overview(){
  const b=data.bond,[label,color,evidence]=violationStatus(data), next=data.next;
  const f=data.forecast, radar=data.radar;
  const signal=f?.state==='signal'?(f.alert?'Есть предупреждение':'Порог предупреждения не достигнут'):(f?.reason||'Недостаточно данных для оценки');
  const fact=radar?.factors?.find(f=>f.url);
  return '<header class="issue-heading"><h2>'+esc(b.name)+'</h2><span class="mono">'+esc(b.isin||b.secid)+' · Срез на '+dt(state.date)+'</span></header>'+decisionBanner(radar?.conclusion)+'<div class="issue-layout"><section id="bondOverview" class="panel bond-summary"><p><b>Ближайшая выплата</b> · '+(next?esc(next.kind)+' · '+dt(next.date)+(next.per_unit!=null?' · '+fmt(next.per_unit)+' '+esc(cashCurrency(next.currency))+' на бумагу':''):'Дата неизвестна')+'</p><dl class="issue-status">'+
    [['Платёжное нарушение',label,color],['Риск выпуска',radar?.label||'Недостаточно данных',''],['Прогноз платежа',signal,f?.state==='signal'&&f.alert?'red':'']].map(([k,v,t])=>'<div><dt>'+k+'</dt><dd class="'+t+'">'+esc(v)+(k==='Платёжное нарушение'&&evidence?' '+link(evidence.url,'Документ · '+dt(evidence.published)):'')+'</dd></div>').join('')+'</dl>'+
    (fact?'<p class="issue-reason">'+esc(fact.reason)+' '+link(fact.url,dt(fact.day))+'</p>':'')+
    '<a href="#bondRadar">Почему такой риск?</a></section>';
}
function cashCurrency(c){return ['RUB','SUR','RUR'].includes(c)?'₽':c||'';}
const directionClass=delta=>delta==null||delta===0?'trade-flat':delta>0?'trade-up':'trade-down';
function chartPrice(){
  const dates=[...new Set(data.events.map(e=>e.published.slice(0,10)))].filter(day=>day>=data.start && day<=state.date);
  const docs=dates.length?'<div class="exchange-events">Публикации за период '+dates.map(day=>'<button class="textbtn" data-marker="'+esc(day)+'">'+dt(day)+'</button>').join('')+'</div>':'';
  return '<div class="exchange-quote" role="status"></div><exchange-chart data-bond-chart></exchange-chart>'+docs;
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
  $('detail').innerHTML='<button class="textbtn" data-action="home">← Обзор рынка</button>'+overview()+price()+'</div>'+radarPanel(data.radar)+paymentBrief(data)+bondHighlights(data)+forecastPanel(data.forecast)+expertPanel(data)+couponPanel(data)+(data.quality?.federal?'<section id="fundamentals" class="panel"><h3>Государственный выпуск</h3><p>Для ОФЗ корпоративная отчётность неприменима.</p></section>':financialPanel(data.financials||[]))+fnsPanel(data.fns)+calendar()+paymentJournal(data)+defaultEvidence(data)+filingPanel(data)+timeline()+'<div class="charts-more">'+payment()+documents()+'</div>'+outcomeList()+riskPanel()+news()+extraAnalytics(data)+(data.shortlist.length?list:'');
  renderBondQuote(data);renderChat();

}
function docModal(id){const d=data.documents.find(x=>x.id===id);if(!d)return;state.event=id;save();modal(d.title,'<p class="meta">'+esc(d.publisher)+' · '+esc(d.kind)+'</p><p class="modalbody">'+esc(d.body)+'</p><div class="doclist"><div class="lineitem"><span>Дата события</span>'+dt(d.occurred)+'</div><div class="lineitem"><span>Опубликовано</span>'+dt(d.published)+(d.published.includes('T')?' '+esc(d.published.slice(11,16))+' МСК':' · время не указано')+'</div><div class="lineitem"><span>Сохранено</span>'+dt(d.loaded)+'</div></div><div class="drawer-actions">'+link(d.url,'Открыть первоисточник','lightbtn')+(id==='ncr'?'<a class="lightbtn" href="documents/nkr-20260407.pdf" target="_blank" rel="noopener">Сохранённый PDF ↗</a>':'')+'<button class="primary" data-ask="doc">Объяснить в чате</button></div>');}
function detailsModal(){const b=data.bond;modal('Реквизиты выпуска','<div class="modalbody"><b>'+esc(b.name)+'</b><p>'+esc(b.issuer_name)+'</p><p>ИНН '+esc(b.inn||'не указан')+'</p><p>ISIN '+esc(b.isin||'не указан')+' · SECID '+esc(b.secid)+'</p><p>Последняя сохранённая сделка на срез — '+dt(data.last?.day)+'</p><p>Режимы с историей на срез — '+esc(data.boards.join(', ')||'нет сведений')+'</p><p class="meta">Связи с группой и поручители в справочнике не подтверждены.</p>'+link(b.source,'Справочник MOEX')+'</div>');}
function renderChat(){
  $('chatContext').innerHTML=data?'<div class="panel chat-context"><div><div class="cap">В контексте</div><strong>'+esc(data.bond.name)+'</strong><div class="mono">'+esc(state.id)+' · '+dt(state.date)+(state.time?' '+esc(state.time):'')+(state.week?' · неделя с '+dt(state.week,false):'')+(state.point?' · сделка '+dt(state.point,false):'')+'</div></div><button class="textbtn" data-return="'+esc(state.section)+'">К аналитике →</button></div>':unavailableCard;
  const engine=$('chatEngine');
  engine.value=state.mode==='demo'?'archive':localStorage.getItem('radar.chatEngine')||'auto';
  engine.disabled=loadingChat||state.mode==='demo';
  $('newChat').disabled=loadingChat;
  window.dispatchEvent(new Event('radar-view'));
  const msgs=chats.get(chatKey())||[];
  $('dialogue').innerHTML=msgs.length?msgs.map((m,index)=>messageHtml(m,index)).join(''):'<div class="chat-intro"><img class="agent-intro-mark" src="agent-radar.svg" alt=""><h2>Какой выпуск или показатель вас интересует?</h2><p>Назовите выпуск или компанию. Можно продолжить разбор открытой карточки.</p><div class="chips">'+['Какова динамика цены закрытия ОФЗ 26207?','Какова долговая нагрузка Газпрома?',(state.id?'Когда ближайший купон выбранного выпуска?':'Когда предусмотрена следующая купонная выплата по облигациям Сбербанка?')].map(q=>'<button data-prompt="'+esc(q)+'">'+esc(q)+'</button>').join('')+'</div></div>';
  $('mode').textContent=engine.value==='archive'?'Поиск по опубликованным данным':'';

}
function messageHtml(m,index){
  if(m.user)return '<div class="bubble user"><small>Вы</small><p>'+esc(m.user)+'</p></div>';
  const cited=esc(m.text).replace(/\[(\d+)\]/g,(mark,n)=>m.refs[n-1]?'<a class="cite" href="'+safe(m.refs[n-1].url)+'" target="_blank" rel="noopener noreferrer" title="'+esc(m.refs[n-1].label)+'">'+mark+'</a>':mark);
  const choices=m.choices||[];
  const choose=choices.length?'<label class="series-search">Серия или ISIN<input type="search" data-series="'+index+'" aria-label="Уточнить серию" placeholder="Уточнить серию в каталоге"></label><div class="chips" id="choices-'+index+'">'+choiceButtons(choices.slice(0,8),index)+'</div>':'';
  const references=m.refs.map((r,i)=>link(r.url,'['+(i+1)+'] '+r.label,'proof')).join('');
  const related=(m.related||[]).filter(b=>b.id!==m.id).map(b=>'<button class="textbtn" data-other="'+esc(b.id)+'">'+esc(b.name)+' →</button>').join('');
  return '<div class="bubble"><small>'+esc(m.mode==='Ошибка запроса'?m.mode:/архив|поиск|опубликован/i.test(m.mode)?'Поиск по опубликованным данным':'Помощник радара')+'</small><div class="answer-body">'+cited.split(/\n\s*\n/).map(p=>'<p>'+p+'</p>').join('')+'</div>'+(references?'<details open class="answer-sources"><summary>Источники · '+m.refs.length+'</summary>'+references+'</details>':'')+choose+'<div class="row-links">'+(m.issuerAnswer&&!choices.length&&!m.id?'<button class="textbtn" data-issuer-report="'+index+'">Открыть в аналитике →</button>':'')+(!choices.length&&m.id?'<button class="textbtn" data-return="'+esc(m.section)+'" data-message="'+index+'" data-id="'+esc(m.id)+'">Открыть в аналитике →</button>':'')+related+'</div></div>';
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
async function ask(q,choiceId='',selection={}){
  if(loadingChat||!q.trim()||(state.id&&!data))return;
  if(matchMedia('(max-width:760px)').matches && document.activeElement===$('question')) $('question').blur();
  const key=chatKey(),list=chats.get(key)||[];chats.set(key,list);list.push({user:q});loadingChat=true;
  $('askForm').querySelector('button').disabled=true;$('question').value='';renderChat();$('mode').textContent='Проверяем сведения на выбранную дату…';
  const view={...state};agentStage('Получение данных',true);
  try{
    const reply=await api('/api/chat',{...view,...selection,engine:$('chatEngine').value,question:q,choice_id:choiceId,history:list.slice(0,-1).filter(m=>m.user).slice(-4).map(m=>m.user)});list.push({...reply,view});agentStage('Ответ сформирован');
    if(state.tab==='chat'&&chatKey()===key&&reply.id&&reply.id!==state.id&&!reply.choices.length){
      state={...state,id:reply.id,specific:'1',point:'',event:'',week:'',board:''};
      const nextKey=chatKey();chats.set(nextKey,[...list]);await load(true);
    }
  }
  catch(e){agentStage('Ошибка запроса');list.push({text:e.message,mode:'Ошибка запроса',refs:[],section:'detail',id:state.id});}
  finally{loadingChat=false;$('askForm').querySelector('button').disabled=false;renderChat();if(state.tab==='chat' && chats.get(chatKey())?.at(-1)===list.at(-1)){
    const log=$('dialogue'), answer=log.lastElementChild;
    if(answer) log.scrollTop+=answer.getBoundingClientRect().top-log.getBoundingClientRect().top;
  }}
}
function askFrom(section){
  if(section==='bondRadar'&&(loadingChat||!data||data.bond.id!==state.id))return;
  quitModal();state.tab='chat';state.specific='1';state.section=section==='doc'?'events':section;save(true);tabs();renderChat();
  const prompts={price:'Почему изменилась цена '+(state.point?'за '+dt(state.point):'за выбранный период')+'?',calendar:'Какие обязательства эмитента наступают до выплаты купона по выбранному выпуску?',payment:'Какая часть купона выплачена в установленный срок и когда погашена задолженность?',events:'Какие признаки ухудшения и события уже были известны?',doc:'Объясни документ «'+(data.documents.find(d=>d.id===state.event)?.title||'')+'»'};
  if(section==='bondRadar'){
    const id=data.bond.id;
    ask('Разбери выпуск '+(data.bond.isin||id)+'. Почему присвоен этот уровень риска? Сравни динамику показателей отчётности и категорию риска по датам. Объясни изменения с цифрами и ссылками на отчёты за оба периода.',id);
  }else ask(prompts[section]);
}
async function searchList(){
  const token=++searchSeq,p=params();for(const [k,v] of Object.entries({q:$('query').value,issuer:$('issuer').value,currency:$('currency').value,status:$('status').value,event_filter:$('eventFilter').checked?'1':'',offset}))p.set(k,v);
  $('count').textContent='Поиск в каталоге…';
  try{const r=await api('/api/search?'+p);if(token!==searchSeq)return;
    $('count').textContent=(r.issuer_summary?r.issuer_summary+' · ':'')+'Найдено выпусков: '+fmt(r.total)+' · на '+dt(state.date);
    $('results').innerHTML=r.items.length?'<div class="tablewrap"><table><thead><tr><th>Выпуск</th><th>ISIN / SECID</th><th>Валюта</th><th>Обращение</th><th>Платёжное событие</th></tr></thead><tbody>'+r.items.map(b=>'<tr><td><button data-bond="'+esc(b.id)+'">'+esc(b.name||b.short)+'</button>'+(b.partial?'<small>Частичное покрытие</small>':'')+'</td><td class="mono">'+esc(b.isin||b.secid)+'</td><td>'+esc(b.currency||'—')+'</td><td>'+esc(b.status)+'</td><td>'+ (b.event?'Подтверждено':'Нет документа')+'</td></tr>').join('')+'</tbody></table></div>':'<p class="empty">Совпадений на эту дату нет. Попробуйте ISIN, короткое название или другой срез.</p>';
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
 if(a.issuerReport!==undefined){
   const message=chats.get(chatKey())?.[Number(a.issuerReport)];
   if(!message?.issuer)return;
   const query=new URLSearchParams({...message.view,issuer:message.issuer});
   const heading=message.issuerName+' · '+dt(message.asof);
   modal(heading,'<p>Загружаем отчётность…</p>');
   try{
     const result=await api('/api/fundamentals?'+query);
     if(!$('modal').open||$('modalTitle').textContent!==heading)return;
     $('modalBody').innerHTML='<p>ИНН '+esc(result.issuer)+' · На дату анализа в каталоге нет выпуска этого эмитента с полным покрытием.</p>'+
       result.reports.map(r=>'<details open><summary>'+esc(r.standard)+' · '+esc(r.period)+'</summary><p>'+dt(r.published)+' · '+link(r.original||r.url,'Отчёт эмитента')+'</p><dl>'+Object.values(r.metrics).map(v=>'<div><dt>'+esc(v.name)+'</dt><dd>'+fmt(v.value)+' '+esc(v.unit)+'</dd></div>').join('')+'</dl></details>').join('')+
       fnsPanel(result.fns)+result.filings.map(f=>'<p>'+dt(f.published)+' · '+link(f.url,f.title)+'</p>').join('');
   }catch(e){if($('modalTitle').textContent===heading)$('modalBody').textContent=e.message;}
   return;
 }
 if(a.choice&&chats.get(chatKey())?.[+a.message]?.issuerAnswer){
    const m=chats.get(chatKey())[+a.message];state={...m.view,id:a.choice,tab:'market',section:'fundamentals',board:'',point:'',event:'',week:''};
    await load(true);scrollToPart('fundamentals');return;
 }
 if(a.choice){const m=chats.get(chatKey())?.[+a.message];state.id=a.choice;state.specific='1';state.week='';state.point='';state.event='';await load(true);ask(m?.retry||'Сколько по моему купону выплатили в срок?',a.choice);return;}
 if(a.return){const message=a.message!==undefined?(chats.get(chatKey())||[])[+a.message]:null;if(message?.view){state={...message.view,id:message.id,section:a.return,tab:'market'};await load(true);scrollToPart(a.return);return;}state.tab='market';state.section=a.return;if(a.id&&a.id!==state.id){state.id=a.id;state.point='';state.week='';state.event='';await load(true);}else{save(true);tabs();}scrollToPart(a.return);return;}
 if(a.bond){selectBond(a.bond);return;}if(a.offset!==undefined){offset=+a.offset;searchList();return;}
 if(a.action==='retry'){location.reload();return;}
 if(a.action==='home'){state={...initial,date:state.date,mode:state.mode};await load(true);return;}
 if(a.action==='details'){detailsModal();return;}
 if(a.action==='search'){$('query').focus();openSearch();return;}
 if(a.action==='refresh'&&state.mode==='demo'){notice('Архивный режим использует сохранённые данные. Для обновления выберите Live.');return;}if(a.action==='refresh'){el.disabled=true;el.textContent='Запрос к бирже…';try{const r=await api('/api/refresh',state);await load();notice(r.message);}catch(e){notice(e.message);}finally{el.disabled=false;}return;}
});
document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)&&!$('modal').open&&!$('radarGuide').open){e.preventDefault();state.tab='market';tabs();save();$('query').focus();openSearch();}if((e.key==='Enter'||e.key===' ')&&e.target.matches('svg [role="button"]')){e.preventDefault();e.target.dispatchEvent(new MouseEvent('click',{bubbles:true}));}});
const marketMenu=$('marketMenu');
function closeMarketMenu(focus=false){
  marketMenu.open=false;
  if(focus)marketMenu.querySelector('summary').focus();
}
function updateMarketMenu(){
  const nav=marketMenu.querySelector('nav');
  const selected=state.id&&data?.bond.id===state.id;
  const sections=state.id?[
    ['bondOverview','Сводка выпуска'],['bondRadar','Кредитный риск'],['price','Цена и объём торгов'],
    ['coupons','НКД и купоны'],['forecast','Прогноз платежа'],['paymentJournal','История выплат'],
    ['defaultEvidence','Платёжные нарушения'],['fundamentals','Отчётность эмитента'],['creditDocuments','Документы выпуска']
  ]:[
    ['macroPanel','Рыночные индикаторы'],['yieldCurve','Кривая доходности ОФЗ'],
    ['corporateRates','Доходность корпоративного долга'],['paymentCalendar','Календарь облигационных выплат']
  ];
  const available=sections.filter(([id])=>$(id)&&(!state.id||selected));
  const previous=nav.querySelector('[data-context-group]');
  if(!available.length){previous?.remove();return;}
  const group=document.createElement('div');
  group.className='jump-group';group.dataset.contextGroup='';group.setAttribute('role','group');
  group.setAttribute('aria-labelledby','jump-context');
  const title=document.createElement('strong');
  title.id='jump-context';title.textContent=selected?'Выбранный выпуск':'Рыночная аналитика';
  group.append(title);
  if(selected){
    const identity=document.createElement('small');
    identity.textContent=[data.bond.name,data.bond.isin||data.bond.secid].filter(Boolean).join(' · ');
    group.append(identity);
  }
  for(const [id,label] of available){
    const button=document.createElement('button');
    button.type='button';button.dataset.jump=id;button.textContent=label;
    group.append(button);
  }
  if(previous?.isEqualNode(group))return;
  if(previous)previous.remove();
  if(selected)nav.prepend(group);else nav.append(group);
}
marketMenu.ontoggle=()=>{if(marketMenu.open)updateMarketMenu();};
new MutationObserver(()=>{if(marketMenu.open)updateMarketMenu();}).observe($('marketHome'),{childList:true});
new MutationObserver(()=>{if(marketMenu.open)updateMarketMenu();}).observe($('detail'),{childList:true});
marketMenu.onclick=e=>{
  const id=e.target.closest('[data-jump]')?.dataset.jump;
  const target=id&&$(id);
  if(!target)return;
  closeMarketMenu();
  if(target.tagName==='DETAILS')target.open=true;
  const heading=target.querySelector('summary,h2,h3')||target;
  heading.tabIndex=-1;heading.focus({preventScroll:true});target.scrollIntoView({block:'start'});
};
document.addEventListener('pointerdown',e=>{if(marketMenu.open&&!marketMenu.contains(e.target))closeMarketMenu();});
marketMenu.addEventListener('keydown',e=>{if(e.key==='Escape')closeMarketMenu(true);});
$('catalogBtn').onclick=()=>{closeMarketMenu();$('query').focus();openSearch();};$('closeCatalog').onclick=()=>$('catalog').classList.add('hide');
$('query').oninput=openSearch;['issuer','currency','status','eventFilter'].forEach(k=>$(k).oninput=openSearch);
$('today').onclick=()=>{state.mode='live';setDate(moscowDay());};
$('asof').onchange=e=>{if(e.target.value)setDate(e.target.value);};
document.addEventListener('change',e=>{if(e.target.id==='boardSelect'){state.board=e.target.value;state.point='';load(true);}if(e.target.id==='clock'){state.time=e.target.value;state.point='';state.event='';load(true);}});
$('closeModal').onclick=quitModal;
$('chatEngine').onchange=e=>{localStorage.setItem('radar.chatEngine',e.target.value);renderChat();};
$('newChat').onclick=()=>{if(loadingChat)return;chats.delete(chatKey());renderChat();$('question').value='';$('question').focus();};
$('askForm').onsubmit=e=>{e.preventDefault();ask($('question').value.trim());};$('question').onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();$('askForm').requestSubmit();}};
window.onpopstate=()=>{state=readState();load().then(()=>{if(state.tab==='market')scrollToPart(state.section);});};
tabs();load();if(window.pagesRadar)notice('Загружаем каталог и модель прогноза…');api('/api/coverage').then(r=>{stats=r;renderChat();}).catch(e=>notice(e.message));


$('tapePlay').onclick=e=>{
  const paused=$('marketTape').toggleAttribute('data-paused');
  e.currentTarget.textContent=paused?'Продолжить':'Пауза';
  e.currentTarget.setAttribute('aria-pressed',String(paused));
};
const guide=$('radarGuide');
$('contextGuide').onclick=$('openGuide').onclick=()=>guide.showModal();
guide.addEventListener('close',()=>{
  try{localStorage.setItem('radar.guideSeen','1');}catch{}
  $('openGuide').focus({preventScroll:true});
});
try{if(!state.id&&state.tab==='market'&&!localStorage.getItem('radar.guideSeen'))guide.showModal();}catch{}

if(window.visualViewport){
  const syncChatHeight=()=>{
    if(window.visualViewport.scale===1)document.documentElement.style.setProperty('--chat-visible-height',window.visualViewport.height+'px');
  };
  syncChatHeight();
  window.visualViewport.addEventListener('resize',syncChatHeight);
}
