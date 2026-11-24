'use strict';
(() => {
  const worker = new Worker('worker.js');
  const pending = new Map();
  let nextId = 0, failure = '', engine;
  const chat = document.getElementById('chat');
  const modelButton = document.createElement('button');
  modelButton.type = 'button';
  modelButton.className = 'textbtn';
  modelButton.textContent = 'Подключить Qwen в браузере';
  const message = document.createElement('p');
  message.className = 'sub';
  message.setAttribute('role', 'status');
  chat.append(modelButton, message);
  const mode = () => engine ? 'Qwen2.5 на этом устройстве · ответы по опубликованным документам' :
    'Поиск по опубликованным документам. Введите ISIN или выберите выпуск в каталоге.';

  modelButton.onclick = async () => {
    if (!navigator.gpu || !await navigator.gpu.requestAdapter().catch(() => null)) {
      message.textContent = 'Для Qwen нужен браузер с WebGPU. Поиск по документам доступен на этом устройстве.';
      return;
    }
    if (!window.confirm('Загрузить модель Qwen2.5 на это устройство? Потребуется несколько сотен МБ трафика и около 1 ГБ видеопамяти.')) return;
    modelButton.disabled = true;
    try {
      message.textContent = 'Загружается языковая модель…';
      const {CreateMLCEngine} = await import('./webllm/index.js');
      engine = await CreateMLCEngine('Qwen2.5-0.5B-Instruct-q4f32_1-MLC', {
        initProgressCallback: progress => { message.textContent = progress.text; }
      });
      modelButton.hidden = true;
      message.textContent = 'Модель готова. Вопросы обрабатываются на этом устройстве.';
      document.getElementById('mode').textContent = mode();
    } catch (error) {
      console.error(error);
      modelButton.disabled = false;
      message.textContent = 'Модель не загрузилась. Проверьте доступ к Hugging Face. Поиск по документам доступен.';
    }
  };

  async function interpret(question) {
    const completion = await engine.chat.completions.create({
      messages: [
        {role:'system', content:'Верни только JSON с двумя списками: queries (дословно названные эмитенты, серии, ISIN или []), topics (одно или несколько значений: паспорт, цена, календарь, исполнение, риск, термин). Определи тему вопроса без ответа на сам вопрос.'},
        {role:'user', content:question}
      ], temperature:0, max_tokens:128, response_format:{type:'json_object'}
    });
    const plan = JSON.parse(completion.choices[0].message.content);
    if (!Array.isArray(plan.queries) || !Array.isArray(plan.topics)) throw Error('Некорректный ответ модели');
    return plan;
  }

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
    let plan;
    if (body && url === '/api/chat' && engine) {
      try { plan = await interpret(body.question); }
      catch { message.textContent = 'Для этого вопроса использован поиск по документам.'; }
    }
    const id = ++nextId;
    return new Promise((resolve, reject) => {
      pending.set(id, {resolve, reject});
      worker.postMessage({id, url, body, plan});
    });
  }};
})();
