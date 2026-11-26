'use strict';

// Each row is an observed trading session. Only sessions available on the selected
// analysis date reach this component. Partial OHLC is displayed as a close.
const exchangeUp = '#089981', exchangeDown = '#f23645', exchangeFlat = '#9aa4b0';
const exchangeNumber = new Intl.NumberFormat('ru-RU', {maximumFractionDigits: 3});
const exchangeDate = new Intl.DateTimeFormat('ru-RU', {day:'numeric', month:'short', year:'numeric', timeZone:'UTC'});
const intervals = {day:'День', week:'Неделя', month:'Месяц'};
const intraIntervals = {m5:300,m15:900,h1:3600};
const intradayLabels = {m5:'5 мин',m15:'15 мин',h1:'1 ч'};
const clockLabel=new Intl.DateTimeFormat('ru-RU',{hour:'2-digit',minute:'2-digit',timeZone:'Europe/Moscow'});
const sessionDay=t=>typeof t==='number'?new Date((t+10800)*1000).toISOString().slice(0,10):t;
const intervalLabel=t=>typeof t==='number'?clockLabel.format(t*1000):dateLabel(t);
const validCandle = r => [r.open,r.high,r.low,r.close].every(Number.isFinite)
  && r.low <= Math.min(r.open,r.close) && r.high >= Math.max(r.open,r.close);
function periodKey(day, interval) {
  if(intraIntervals[interval])return Math.floor((day+10800)/intraIntervals[interval])*intraIntervals[interval]-10800;
  if (interval === 'month') return day.slice(0,7);
  if (interval === 'day') return day;
  const monday = new Date(day+'T00:00:00Z');
  monday.setUTCDate(monday.getUTCDate() - (monday.getUTCDay()+6)%7);
  return monday.toISOString().slice(0,10);
}
function aggregateSessions(rows, interval) {
  const bars = [];
  for (const row of rows) {
    const key = periodKey(row.time,interval);
    const bar = bars.at(-1);
    if (bar?.key !== key) {
      bars.push({...row,time:intraIntervals[interval]?key:row.time,key,last:row.time,complete:validCandle(row)});
    } else {
      bar.last = row.time;
      bar.close = row.close;
      bar.complete = bar.complete && validCandle(row);
      if (bar.complete) {
        bar.high = Math.max(bar.high,row.high);
        bar.low = Math.min(bar.low,row.low);
      }
      for (const field of ['quantity','turnover','trades']) {
        bar[field] = Number.isFinite(bar[field]) && Number.isFinite(row[field]) ? bar[field]+row[field] : null;
      }
    }
  }
  return bars;
}
const localDay = t => typeof t==='string'||typeof t==='number' ? t : t && [t.year,String(t.month).padStart(2,'0'),String(t.day).padStart(2,'0')].join('-');
const dateLabel = day => exchangeDate.format(new Date(day+'T00:00:00Z'));

class ExchangeChart extends HTMLElement {
  connectedCallback() {
    queueMicrotask(()=>{if (this.isConnected && !this.chart) this.mount();});
  }
  disconnectedCallback() {
    this.sizeObserver?.disconnect();
    this.chart?.remove();
    this.chart = null;
  }
  mount() {
    const index = this.hasAttribute('data-index-chart');
    const item = index ? macroRows.find(s=>s.code===this.dataset.indexChart) : data;
    if (!item) return;
    const o = index ? {
      name:item.label, symbol:item.code, unit:'п.', currency:'₽', interval:'month',
      rows:item.candles?.length ? item.candles.map(([time,open,high,low,close,turnover])=>({time,open,high,low,close,turnover}))
        : item.points.map(([time,close])=>({time,close}))
    } : {
      name:item.bond.name,symbol:[item.bond.secid,item.board].filter(Boolean).join(' · '),
      unit:'% ном.', interval:'day', currency:cashCurrency(item.quotes.find(r=>r.currency)?.currency),
      rows:[]
    };
    const bondRows=()=>item.quotes.filter(r=>Number.isFinite(r.price)).map(r=>({
        time:r.day,open:r.open,high:r.high,low:r.low,close:r.price,quantity:r.quantity,turnover:r.volume,trades:r.trades
      }));
    if(!index)o.rows=bondRows();
    if (!window.LightweightCharts) {this.textContent='Не удалось открыть модуль биржевого графика.';return;}
    const live=!index&&canStream()&&Boolean(item.board);
    const labels=live?{...intervals,...intradayLabels}:intervals;
    const hasCandles=live||o.rows.some(validCandle);
    const hasQty=live||o.rows.some(r=>Number.isFinite(r.quantity)), hasValue=live||o.rows.some(r=>Number.isFinite(r.turnover));
    let interval=o.interval, style=hasCandles?'candles':'line', volume=hasQty?'quantity':hasValue?'turnover':'';
    const eventDays=index?[]:[...new Set(item.events.map(e=>e.published.slice(0,10)))].sort();
    let showEvents=false;
    const button=(attr,value,label)=>'<button type="button" '+attr+'="'+esc(value)+'">'+esc(label)+'</button>';
    const optionGroup=(label,buttons)=>'<div class="exchange-options" role="group" aria-label="'+label+'">'+buttons+'</div>';
    this.innerHTML='<div class="exchange-toolbar">'+optionGroup('Размер одной свечи',Object.entries(labels).map(([key,val])=>button('data-interval',key,val)).join(''))
      +optionGroup('Вид графика',(hasCandles?button('data-chart-style','candles','Свечи'):'')+button('data-chart-style','line','Линия'))
      +((hasQty||hasValue)?optionGroup('Показатель объёма',(hasQty?button('data-chart-volume','quantity','Объём, шт.'):'')+(hasValue?button('data-chart-volume','turnover',index?'Оборот бумаг, ₽':'Оборот'):'')+button('data-chart-volume','off','Скрыть')):'')
      +(eventDays.length?optionGroup('Документы выпуска',button('data-events','toggle','Публикации')):'')
      +'<button class="exchange-fit" data-fit type="button" title="Вернуть весь период">Весь период</button><button type="button" data-latest>К последней свече</button></div>'
      +'<div class="exchange-shell"><div class="exchange-head"><strong>'+esc(o.name)+'</strong><span>'+esc(o.symbol)+'</span></div>'
      +'<div class="exchange-legend"></div><div class="exchange-canvas" tabindex="0" role="group" aria-label="Биржевой график. Стрелки влево и вправо для выбора периода."></div></div>'
      +'<div class="exchange-foot"><span class="exchange-range"></span><a href="https://www.tradingview.com/" target="_blank" rel="noopener">TradingView Lightweight Charts™</a> <a href="charts-NOTICE" target="_blank" rel="noopener">© TradingView, Inc.</a></div>';
    const canvas=this.querySelector('.exchange-canvas'), legend=this.querySelector('.exchange-legend');
    const chart=this.chart=LightweightCharts.createChart(canvas,{
      autoSize:true,layout:{background:{type:'solid',color:'#101113'},textColor:'#bcc0c7',fontSize:12,attributionLogo:true},
      grid:{vertLines:{color:'#25272a'},horzLines:{color:'#25272a'}},
      rightPriceScale:{borderColor:'#34373c'},timeScale:{borderColor:'#34373c',rightOffset:0,fixLeftEdge:true,fixRightEdge:true,minBarSpacing:0.15,shiftVisibleRangeOnNewBar:false},
      localization:{locale:'ru-RU',dateFormat:'dd.MM.yyyy',timeFormatter:t=>typeof t==='number'?dateLabel(sessionDay(t))+' '+intervalLabel(t):dateLabel(localDay(t)),priceFormatter:v=>exchangeNumber.format(v)},
      crosshair:{mode:LightweightCharts.CrosshairMode.Normal,vertLine:{color:'#91959c'},horzLine:{color:'#91959c'}},
      handleScroll:{mouseWheel:false,pressedMouseMove:true,horzTouchDrag:true,vertTouchDrag:false}
    });
    let price,vol,closeOnly,markers,bars=[],selection,byDay,candleMode;
    const sameBar=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
    const selectedRows=()=>intraIntervals[interval]?item.minutes||[]:o.rows;
    const legendAt=i=>{
      selection=i;
      const b=bars[i], prev=bars[i-1];
      if(!b){legend.textContent='';return;}
      const delta=prev?b.close-prev.close:null;
      const sign=v=>(v>0?'+':'')+exchangeNumber.format(v);
      const color=v=>v===null||v===0?'even':v>0?'rise':'fall';
      const fields=b.complete?[['ОТКР',b.open],['МАКС',b.high],['МИН',b.low],['ЗАКР',b.close]]:[['ЗАКР',b.close]];
      legend.innerHTML='<time>'+esc(intervalLabel(b.time))+(b.last!==b.time?' – '+esc(intervalLabel(b.last)):'')+'</time>'
        +fields.map(([label,value])=>'<span>'+label+' <b class="'+color(b.complete?b.close-b.open:delta)+'">'+esc(exchangeNumber.format(value))+'</b></span>').join('')
        +'<span>'+esc(o.unit)+'</span>'+(delta===null?'':'<strong class="'+color(delta)+'">'+sign(delta)+(prev.close?' ('+sign(100*delta/prev.close)+'%)':'')+'</strong>')
        +(volume && volume!=='off'?'<span>'+(volume==='quantity'?'Объём':index?'Оборот бумаг':'Оборот')+' <b>'+(Number.isFinite(b[volume])?esc(exchangeNumber.format(b[volume])+' '+(volume==='quantity'?'шт.':o.currency)):'нет данных')+'</b></span>':'');
    };
    const indexBars=()=>{byDay=new Map(bars.map((b,i)=>[b.time,i]));};
    const pricePoint=(b,i)=>candleMode?(b.complete?{time:b.time,open:b.open,high:b.high,low:b.low,close:b.close}:{time:b.time})
      :{time:b.time,value:b.close};
    const volumePoint=(b,i)=>{
      if(!Number.isFinite(b[volume]))return {time:b.time};
      const base=b.complete?b.open:bars[i-1]?.close??b.close;
      return {time:b.time,value:b[volume],color:(b.close===base?exchangeFlat:b.close>base?exchangeUp:exchangeDown)+'a8'};
    };
    const closePoint=b=>b.complete?{time:b.time}:{time:b.time,value:b.close};
    const setMarkers=()=>{
      if(!showEvents)return;
      if(!markers)markers=LightweightCharts.createSeriesMarkers(price,[]);
      // Use the first trading period on each publication day for intraday charts.
      const marked=new Set();
      const eventPeriods=new Set(eventDays.map(day=>intraIntervals[interval]?day:periodKey(day,interval)));
      markers.setMarkers(bars.flatMap(b=>{
        const key=intraIntervals[interval]?sessionDay(b.time):b.key;
        if(!eventPeriods.has(key)||marked.has(key)||(!b.complete&&candleMode))return [];
        marked.add(key);return [{time:b.time,position:'aboveBar',color:'#e8b878',shape:'circle',text:'',size:.6}];
      }));
    };
    const finish=()=>{
      this.querySelectorAll('button[data-interval],button[data-chart-style],button[data-chart-volume],button[data-events]').forEach(el=>el.setAttribute('aria-pressed',String(
        el.dataset.interval===interval || el.dataset.chartStyle===style || el.dataset.chartVolume===volume || (el.hasAttribute('data-events') && showEvents))));
      this.dataset.ready='true';this.dataset.bars=String(bars.length);this.dataset.ohlc=String(candleMode);
      const rows=selectedRows(), minute=intraIntervals[interval];
      this.querySelector('.exchange-range').textContent=minute&&item.minuteStatus?item.minuteStatus:
        rows.length?labels[interval]+' · '+bars.length+' периодов · '+dateLabel(sessionDay(rows[0].time))+' – '+dateLabel(sessionDay(rows.at(-1).time)):
        'За выбранный период котировки отсутствуют.';
      legendAt(selection??bars.length-1);
      setMarkers();
    };
    const update=()=>{
      markers?.detach();markers=null;
      for (const s of [price,vol,closeOnly]) if(s)chart.removeSeries(s);
      vol=null;closeOnly=null;
      bars=aggregateSessions(selectedRows(),interval);indexBars();
      candleMode=style==='candles' && (live||bars.some(b=>b.complete));
      price=chart.addSeries(candleMode?LightweightCharts.CandlestickSeries:LightweightCharts.LineSeries,candleMode
        ? {upColor:exchangeUp,downColor:exchangeDown,wickUpColor:exchangeUp,wickDownColor:exchangeDown,borderVisible:false}
        : {color:'#8bb9ef',lineWidth:2,pointMarkersVisible:bars.length<5});
      price.setData(bars.map(pricePoint));
      if(candleMode){
        closeOnly=chart.addSeries(LightweightCharts.LineSeries,{lineVisible:false,pointMarkersVisible:true,pointMarkersRadius:2,color:exchangeFlat,lastValueVisible:false,priceLineVisible:false});
        closeOnly.setData(bars.map(closePoint));
      }
      const volumeVisible=volume && volume!=='off';
      price.priceScale().applyOptions({scaleMargins:{top:.09,bottom:volumeVisible ? .27 : .12}});
      if(volumeVisible) {
        vol=chart.addSeries(LightweightCharts.HistogramSeries,{priceScaleId:'volume',priceFormat:{type:'volume'},priceLineVisible:false,lastValueVisible:false});
        vol.priceScale().applyOptions({scaleMargins:{top:.81,bottom:.005}});
        vol.setData(bars.map(volumePoint));
      }
      chart.timeScale().applyOptions({timeVisible:Boolean(intraIntervals[interval]),tickMarkFormatter:(t,type,locale)=>
        typeof t==='number'&&type>=LightweightCharts.TickMarkType.Time?intervalLabel(t):null});
      if(bars.length&&chart.timeScale().width())chart.timeScale().applyOptions({minBarSpacing:chart.timeScale().width()/Math.max(2,bars.length)});
      if(index && interval!=='month' && bars.length>120){
        chart.timeScale().setVisibleLogicalRange({from:bars.length-120,to:bars.length+2});
      }else chart.timeScale().fitContent();
      selection=undefined;finish();
    };
    this.refreshRows=()=>{
      if(index||!this.chart)return;
      o.rows=bondRows();o.currency=cashCurrency(item.exchangeCurrency||item.quotes.find(r=>r.currency)?.currency);
      const next=aggregateSessions(selectedRows(),interval), previous=bars;
      const scale=chart.timeScale(), range=scale.getVisibleLogicalRange();
      const left=Math.max(0,Math.min(previous.length-1,Math.floor(range?.from??0)));
      const anchor=previous[left]?.time, selected=previous[selection]?.time;
      const prefix=Math.max(0,previous.length-1);
      bars=next;indexBars();
      if(previous.length&&next.length>=previous.length&&previous.slice(0,prefix).every((b,i)=>sameBar(b,next[i]))
        && next[prefix]?.time===previous[prefix].time){
        for(let i=prefix;i<next.length;i++){
          const b=next[i];if(sameBar(previous[i],b))continue;
          price.update(pricePoint(b,i));vol?.update(volumePoint(b,i));closeOnly?.update(closePoint(b));
        }
      }else if(previous.length||next.length){
        price.setData(bars.map(pricePoint));vol?.setData(bars.map(volumePoint));closeOnly?.setData(bars.map(closePoint));
      }
      if(previous.length&&range&&byDay.has(anchor)){
        const delta=byDay.get(anchor)-left;
        scale.setVisibleLogicalRange({from:range.from+delta,to:range.to+delta});
      }else if(!previous.length&&next.length)scale.fitContent();
      selection=selected===previous.at(-1)?.time?undefined:byDay.get(selected);
      finish();
    };
    update();
    let measured=false;
    this.sizeObserver=new ResizeObserver(()=>{
      const width=chart.timeScale().width();
      if(width>0 && bars.length){
        chart.timeScale().applyOptions({minBarSpacing:Math.min(width/Math.max(2,bars.length),width/2)});
        if(!measured){chart.timeScale().fitContent();measured=true;}
      }
    });
    this.sizeObserver.observe(canvas);
    chart.subscribeCrosshairMove(e=>legendAt(byDay.get(localDay(e.time))??bars.length-1));
    if(!index)chart.subscribeClick(e=>{
      const bar=bars[byDay.get(localDay(e.time))];
      if(bar){state.point=sessionDay(bar.last);save();renderChat();}
    });
    canvas.onkeydown=e=>{
      if(!bars.length||!['ArrowRight','ArrowLeft'].includes(e.key))return;
      e.preventDefault();
      const i=Math.min(bars.length-1,Math.max(0,selection+(e.key==='ArrowRight'?1:-1)));
      chart.setCrosshairPosition(bars[i].close,bars[i].time,price);legendAt(i);
    };
    this.onclick=e=>{
      const el=e.target.closest('button');if(!el)return;
      if(el.hasAttribute('data-fit')){chart.timeScale().fitContent();return;}
      if(el.hasAttribute('data-latest')){chart.timeScale().scrollToRealTime();legendAt(bars.length-1);return;}
      if(el.hasAttribute('data-events'))showEvents=!showEvents;
      interval=el.dataset.interval||interval;style=el.dataset.chartStyle||style;volume=el.dataset.chartVolume||volume;
      update();
      if(!index&&el.dataset.interval)requestBondInterval(interval);
    };
  }
}
customElements.define('exchange-chart',ExchangeChart);
