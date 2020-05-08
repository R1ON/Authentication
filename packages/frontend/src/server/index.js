import express from 'express';
import helmet from 'helmet';


// import React from 'react';
// import { renderToString } from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import webpackStats from './stats.json';
// import App from '../scripts/containers/Test';

const app = express();

app.use(helmet());

const chunkNames = flushChunkNames();
const { js, styles } = flushChunks(webpackStats, { chunkNames });

console.log('styles', styles)

// TODO: перевести файл в .ts
// TODO: import flushChunks from 'webpack-flush-chunks';
// TODO: import {HelmetProvider} from 'react-helmet-async';
// TODO: import {flushChunkNames, clearChunks} from 'react-universal-component/server';
// TODO: https://www.npmjs.com/package/react-universal-component

// хелмет будет прокидывать дескрипшн
// и мета теги, а universal-component должен помочь с цсс_модулес
app.get('*', (request, response) => {
  // const markup = renderToString(<App />);

  response.send(
    `
      <!DOCTYPE html>
      <html lang="ru">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>TEST SSR</title>
        </head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          
        </body>
      </html>
    `,
  );
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
