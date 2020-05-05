import express from 'express';
import helmet from 'helmet';

import React from 'react';
import { renderToString } from 'react-dom/server';

import App from '../scripts/containers/App';

const app = express();

app.use(helmet());

// TODO: перевести файл в .ts
// TODO: попробовать прочитать эту разметку из public/index.html

app.get('*', (request, response) => {
  const markup = renderToString(<App />);

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
          <div id="root">${markup}</div>
        </body>
      </html>
    `,
  );
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});