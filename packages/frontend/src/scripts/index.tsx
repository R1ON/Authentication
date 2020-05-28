import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'normalize.css';

import App from './containers/Test';

import '../styles/index.scss';

const root = document.querySelector('#root');

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  root,
);
