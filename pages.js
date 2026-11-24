'use strict';
(() => {
  const worker = new Worker('worker.js');
  const pending = new Map();
  let nextId=0, failure='', access='';
  const endpoint=document.querySelector('meta[name="radar-chat-url"]')?.content;
  const mode=()=>endpoint?'GPT · серверный разбор по источникам':'Поиск по документам и финансовым данным. GPT API для сайта пока не подключён.';

  worker.onmessage = ({data}) => {
    const job = pending.get(data.id);
    if (!job) return;
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
    if(body && url==='/api/chat' && endpoint){
      if(!access) access=window.prompt('Введите код доступа к GPT этого радара')||'';
      if(access){
        const r=await fetch(endpoint,{method:'POST',credentials:'omit',headers:{'Content-Type':'application/json','X-Radar':'1','X-Radar-Access':access},body:JSON.stringify(body),signal:AbortSignal.timeout(140000)});
        const result=await r.json();
        if(r.status===403)access='';
        if(!r.ok)throw Error(result.error||'Сервер GPT недоступен');
        return result;
      }
    }
    const id = ++nextId;
    return new Promise((resolve, reject) => {
      pending.set(id, {resolve, reject});
      worker.postMessage({id, url, body});
    });
  }};
})();
