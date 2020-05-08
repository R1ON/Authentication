import express from 'express';
import helmet from 'helmet';

import React from 'react';
import { renderToString } from 'react-dom/server';

import { clearChunks, flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import webpackStats from './stats.json';

import Test from '../scripts/containers/Test';

const app = express();

app.use(helmet());

// TODO: сейчас но не запускается, потому что что-то не так с universal импортом

// TODO: перевести файл в .ts

// хелмет будет прокидывать дескрипшн
// и мета теги, а universal-component должен помочь с цсс_модулес
app.get('*', (request, response) => {
  const markup = renderToString(<Test />);
  clearChunks();
  const chunkNames = flushChunkNames();
  const { js, styles } = flushChunks(webpackStats, { chunkNames });

  response.send(
    `
      <!DOCTYPE html>
      <html lang="ru">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>TEST SSR</title>
          ${styles}
        </head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <div id="root">${markup}</div>
          ${js}
        </body>
      </html>
    `,
  );
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
