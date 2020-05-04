import React from 'react';
import { hydrate } from 'react-dom';

import 'normalize.css';

import App from './containers/App';

import '../styles/index.scss';

const root = document.querySelector('#root');

hydrate(<App />, root);
