const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

const { config, isBackend, isSSR } = require('./base.config');

// This config will be launched for the backend and for the SSR.
const frontendFolderPath = path.resolve(__dirname, '../packages/frontend/src');
const backendFolderPath = path.resolve(__dirname, '../packages/backend/src');

const plugins = [...config.plugins];

let entry = {
  backend: ['@babel/polyfill', path.resolve(backendFolderPath, 'index.ts')],
};

if (isSSR) {
  entry = {
    ssr: ['@babel/polyfill', path.resolve(frontendFolderPath, 'server/index.js')],
  };
}

if (isBackend) {
  plugins.push(new NodemonPlugin());
}


module.exports = {
  ...config,
  entry,
  plugins,
  context: isSSR ? frontendFolderPath : backendFolderPath,
  target: 'node',
  externals: [nodeExternals()],
  devServer: {
    port: 8000,
    hot: true,
  },
};
