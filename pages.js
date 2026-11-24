'use strict';
(() => {
  const worker = new Worker('worker.js');
  const pending = new Map();
  let nextId=0, failure='';
  const endpoint=document.querySelector('meta[name="radar-chat-url"]')?.content;
  const groq=document.querySelector('meta[name="radar-groq-url"]')?.content;
  const mode=()=>endpoint?'Серверная языковая модель · ответы по источникам':groq?'Groq · GPT-OSS · ответы по источникам':'Встроенный поиск по документам и показателям · без регистрации';

  worker.onmessage = ({data}) => {
    const job = pending.get(data.id);
    if (!job) return;
    if(data.stage){agentStage(data.stage,true);return;}
    pending.delete(data.id);
    if (data.error) job.reject(Error(data.error));
    else job.resolve(data.result);
  };
  worker.onerror = () => {
    failure = 'Браузер не смог запустить каталог. Обновите страницу в актуальной версии браузера.';
    for (const job of pending.values()) job.reject(Error(failure));
    pending.clear();
  };
  window.pagesRadar = {mode, async request(url, body) {
    if (failure) throw Error(failure);
    if(body && url==='/api/chat' && body.mode!=='demo' && endpoint){
      try{
        const r=await fetch(endpoint,{method:'POST',credentials:'omit',headers:{'Content-Type':'application/json','X-Radar':'1'},body:JSON.stringify(body),signal:AbortSignal.timeout(140000)});
        if(r.ok){const result=await r.json();if(result.mode!=='Модель временно недоступна')return result;}
      }catch{/* The dated archive can still answer inside the site. */}
    }
    const id = ++nextId;
    return new Promise((resolve, reject) => {
      pending.set(id, {resolve, reject});
      worker.postMessage({id, url, body,groq_endpoint:!endpoint && url==='/api/chat' && body?.mode!=='demo'?groq:null});
    });
  }};
})();
