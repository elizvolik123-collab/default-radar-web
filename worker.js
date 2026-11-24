'use strict';
importScripts('python/pyodide.js');

async function openMarket() {
  const response = await fetch('market.zip');
  if (!response.ok) throw Error('Не удалось загрузить опубликованные данные.');
  const runtime = await loadPyodide({indexURL: new URL('python/', self.location.href).href});
  await runtime.loadPackage('sqlite3');
  runtime.unpackArchive(await response.arrayBuffer(), 'zip', {extractDir: '/radar'});
  runtime.runPython("import sys; sys.path.insert(0, '/radar'); from browser_api import dispatch");
  return runtime.globals.get('dispatch');
}

const ready = openMarket();
self.onmessage = async ({data}) => {
  try {
    const query = await ready;
    if(data.url==="/api/chat")self.postMessage({id:data.id,stage:"Анализ документов и показателей"});
    const result = JSON.parse(query(JSON.stringify(data)));
    self.postMessage({id: data.id, result});
  } catch (error) {
    console.error(error);
    self.postMessage({id: data.id, error: 'Не удалось прочитать данные. Проверьте соединение, дату среза и обновите страницу.'});
  }
};
