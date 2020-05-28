import express from 'express';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import Test from 'frontend/containers/Test';

// Путь идет относительно папки frontend
const buildFolderPath = path.resolve('../../build/client');

const app = express();
app.use(helmet());
app.use(express.static(buildFolderPath));

app.get('*', (request, response) => {
  fs.readFile(buildFolderPath, 'utf-8', (error, data) => {
    if (error) {
      const errorMessage = 'Error reading index.html file';
      console.log(errorMessage, error);

      return response.status(500).send(errorMessage);
    }

    const markup = renderToString(
      <StaticRouter location={request.url}>
        <Test />
      </StaticRouter>,
    );

    return response.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${markup}</div>`,
      ),
    );
  });
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
