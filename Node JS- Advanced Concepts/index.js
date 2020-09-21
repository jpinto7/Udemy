const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename);
  worker.on('message', (counter) => {
    console.log(counter);
  });
  worker.postMessage('');
} else {
  const express = require('express');
  const app = express();

  app.get('/', (req, res) => {
    parentPort.on('message', () => {
      let counter = 0;
      while (counter < 1e9) {
        counter++;
      }
      parentPort.postMessage(counter);
    });
  });

  app.get('/fast', (req, res) => {
    res.send('This was fast');
  });

  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });


}
