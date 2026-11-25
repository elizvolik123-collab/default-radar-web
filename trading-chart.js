'use strict';

// Each row is an observed trading session. Only sessions available on the selected
// analysis date reach this component. Partial OHLC is displayed as a close.
const exchangeUp = '#089981', exchangeDown = '#f23645', exchangeFlat = '#9aa4b0';
const exchangeNumber = new Intl.NumberFormat('ru-RU', {maximumFractionDigits: 3});
const exchangeDate = new Intl.DateTimeFormat('ru-RU', {day:'numeric', month:'short', year:'numeric', timeZone:'UTC'});
const intervals = {day:'День', week:'Неделя', month:'Месяц'};
const validCandle = r => [r.open,r.high,r.low,r.close].every(Number.isFinite)
  && r.low <= Math.min(r.open,r.close) && r.high >= Math.max(r.open,r.close);
function periodKey(day, interval) {
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
      bars.push({...row,key,last:row.time,complete:validCandle(row)});
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
const localDay = t => typeof t==='string' ? t : t && [t.year,String(t.month).padStart(2,'0'),String(t.day).padStart(2,'0')].join('-');
const dateLabel = day => exchangeDate.format(new Date(day+'T00:00:00Z'));

class ExchangeChart extends HTMLElement {
  connectedCallback() {
    queueMicrotask(()=>{if (this.isConnected && !this.chart) this.mount();});
  }
  disconnectedCallback() {
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
      rows:item.quotes.filter(r=>Number.isFinite(r.price)).map(r=>({
        time:r.day,open:r.open,high:r.high,low:r.low,close:r.price,quantity:r.quantity,turnover:r.volume,trades:r.trades
      }))
    };
    if (!o.rows.length) {this.textContent='За выбранный период котировки отсутствуют.';return;}
    if (!window.LightweightCharts) {this.textContent='Не удалось открыть модуль биржевого графика.';return;}
    const hasCandles=o.rows.some(validCandle);
    const hasQty=o.rows.some(r=>Number.isFinite(r.quantity)), hasValue=o.rows.some(r=>Number.isFinite(r.turnover));
    let interval=o.interval, style=hasCandles?'candles':'line', volume=hasQty?'quantity':hasValue?'turnover':'';
    const button=(attr,value,label)=>'<button type="button" '+attr+'="'+esc(value)+'">'+esc(label)+'</button>';
    const optionGroup=(label,buttons)=>'<div class="exchange-options" role="group" aria-label="'+label+'">'+buttons+'</div>';
    this.innerHTML='<div class="exchange-toolbar">'+optionGroup('Размер одной свечи',Object.entries(intervals).map(([key,val])=>button('data-interval',key,val)).join(''))
      +optionGroup('Вид графика',(hasCandles?button('data-chart-style','candles','Свечи'):'')+button('data-chart-style','line','Линия'))
      +((hasQty||hasValue)?optionGroup('Показатель объёма',(hasQty?button('data-chart-volume','quantity','Объём, шт.'):'')+(hasValue?button('data-chart-volume','turnover',index?'Оборот бумаг, ₽':'Оборот'):'')+button('data-chart-volume','off','Скрыть')):'')
      +'<button class="exchange-fit" data-fit type="button" title="Вернуть весь период">Весь период</button></div>'
      +'<div class="exchange-shell"><div class="exchange-head"><strong>'+esc(o.name)+'</strong><span>'+esc(o.symbol)+'</span></div>'
      +'<div class="exchange-legend"></div><div class="exchange-canvas" tabindex="0" role="group" aria-label="Биржевой график. Стрелки влево и вправо для выбора периода."></div></div>'
      +'<div class="exchange-foot"><span class="exchange-range"></span><a href="https://www.tradingview.com/" target="_blank" rel="noopener">TradingView Lightweight Charts™</a> <a href="charts-NOTICE" target="_blank" rel="noopener">© TradingView, Inc.</a></div>';
    const canvas=this.querySelector('.exchange-canvas'), legend=this.querySelector('.exchange-legend');
    const chart=this.chart=LightweightCharts.createChart(canvas,{
      autoSize:true,layout:{background:{type:'solid',color:'#101113'},textColor:'#bcc0c7',fontSize:12,attributionLogo:true},
      grid:{vertLines:{color:'#25272a'},horzLines:{color:'#25272a'}},
      rightPriceScale:{borderColor:'#34373c'},timeScale:{borderColor:'#34373c',rightOffset:2,minBarSpacing:0.15},
      localization:{locale:'ru-RU',dateFormat:'dd.MM.yyyy',priceFormatter:v=>exchangeNumber.format(v)},
      crosshair:{mode:LightweightCharts.CrosshairMode.Normal,vertLine:{color:'#91959c'},horzLine:{color:'#91959c'}},
      handleScroll:{mouseWheel:false,pressedMouseMove:true,horzTouchDrag:true,vertTouchDrag:false}
    });
    let price,vol,closeOnly,bars,selection,byDay;
    const legendAt=i=>{
      selection=i;
      const b=bars[i], prev=bars[i-1],delta=prev?b.close-prev.close:null;
      const sign=v=>(v>0?'+':'')+exchangeNumber.format(v);
      const color=v=>v===null||v===0?'even':v>0?'rise':'fall';
      const fields=b.complete?[['ОТКР',b.open],['МАКС',b.high],['МИН',b.low],['ЗАКР',b.close]]:[['ЗАКР',b.close]];
      legend.innerHTML='<time>'+esc(dateLabel(b.time))+(b.last!==b.time?' – '+esc(dateLabel(b.last)):'')+'</time>'
        +fields.map(([label,value])=>'<span>'+label+' <b class="'+color(b.complete?b.close-b.open:delta)+'">'+esc(exchangeNumber.format(value))+'</b></span>').join('')
        +'<span>'+esc(o.unit)+'</span>'+(delta===null?'':'<strong class="'+color(delta)+'">'+sign(delta)+(prev.close?' ('+sign(100*delta/prev.close)+'%)':'')+'</strong>')
        +(volume && volume!=='off'?'<span>'+(volume==='quantity'?'Объём':index?'Оборот бумаг':'Оборот')+' <b>'+(Number.isFinite(b[volume])?esc(exchangeNumber.format(b[volume])+' '+(volume==='quantity'?'шт.':o.currency)):'нет данных')+'</b></span>':'');
    };
    const update=()=>{
      for (const s of [price,vol,closeOnly]) if (s) chart.removeSeries(s);
      vol=null;closeOnly=null;
      bars=aggregateSessions(o.rows,interval);byDay=new Map(bars.map((b,i)=>[b.time,i]));
      const candleMode=style==='candles' && bars.some(b=>b.complete);
      price=chart.addSeries(candleMode?LightweightCharts.CandlestickSeries:LightweightCharts.LineSeries,candleMode
        ? {upColor:exchangeUp,downColor:exchangeDown,wickUpColor:exchangeUp,wickDownColor:exchangeDown,borderVisible:false}
        : {color:'#8bb9ef',lineWidth:2,pointMarkersVisible:bars.length<5});
      price.setData(bars.map((b,i)=>candleMode?(b.complete?{time:b.time,open:b.open,high:b.high,low:b.low,close:b.close}: {time:b.time})
        :{time:b.time,value:b.close,color:i && b.close!==bars[i-1].close?(b.close>bars[i-1].close?exchangeUp:exchangeDown):exchangeFlat}));
      if(candleMode && bars.some(b=>!b.complete)){
        closeOnly=chart.addSeries(LightweightCharts.LineSeries,{lineVisible:false,pointMarkersVisible:true,pointMarkersRadius:2,color:exchangeFlat,lastValueVisible:false,priceLineVisible:false});
        closeOnly.setData(bars.filter(b=>!b.complete).map(b=>({time:b.time,value:b.close})));
      }
      price.priceScale().applyOptions({scaleMargins:{top:.09,bottom:volume && volume!=='off' ? .27 : .12}});
      if(volume && volume!=='off') {
        vol=chart.addSeries(LightweightCharts.HistogramSeries,{priceScaleId:'volume',priceFormat:{type:'volume'},priceLineVisible:false,lastValueVisible:false});
        vol.priceScale().applyOptions({scaleMargins:{top:.81,bottom:.005}});
        vol.setData(bars.flatMap((b,i)=>{
          if(!Number.isFinite(b[volume]))return [];
          const base=b.complete?b.open:bars[i-1]?.close??b.close;
          return [{time:b.time,value:b[volume],color:(b.close===base?exchangeFlat:b.close>base?exchangeUp:exchangeDown)+'a8'}];
        }));
      }
      this.querySelectorAll('button:not([data-fit])').forEach(el=>el.setAttribute('aria-pressed',String(
        el.dataset.interval===interval || el.dataset.chartStyle===style || el.dataset.chartVolume===volume)));
      chart.timeScale().fitContent();
      this.dataset.ready='true';this.dataset.bars=String(bars.length);this.dataset.ohlc=String(candleMode);
      this.querySelector('.exchange-range').textContent=intervals[interval]+' · '+bars.length+' периодов · '+dateLabel(o.rows[0].time)+' – '+dateLabel(o.rows.at(-1).time);
      legendAt(bars.length-1);
    };
    update();
    chart.subscribeCrosshairMove(e=>legendAt(byDay.get(localDay(e.time))??bars.length-1));
    if(!index)chart.subscribeClick(e=>{
      const bar=bars[byDay.get(localDay(e.time))];
      if(bar){state.point=bar.last;save();renderChat();}
    });
    canvas.onkeydown=e=>{
      if(!['ArrowRight','ArrowLeft'].includes(e.key))return;
      e.preventDefault();
      const i=Math.min(bars.length-1,Math.max(0,selection+(e.key==='ArrowRight'?1:-1)));
      chart.setCrosshairPosition(bars[i].close,bars[i].time,price);legendAt(i);
    };
    this.onclick=e=>{
      const el=e.target.closest('button');if(!el)return;
      if(el.hasAttribute('data-fit')){chart.timeScale().fitContent();return;}
      interval=el.dataset.interval||interval;style=el.dataset.chartStyle||style;volume=el.dataset.chartVolume||volume;
      update();
    };
  }
}
customElements.define('exchange-chart',ExchangeChart);
