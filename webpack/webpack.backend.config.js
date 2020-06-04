const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

const { config, isServer } = require('./base.config');

// This config will be launched for the backend and for the SSR.
const frontendFolderPath = path.resolve(__dirname, '../packages/frontend/src');
const backendFolderPath = path.resolve(__dirname, '../packages/backend/src');

let entry = {
  backend: ['@babel/polyfill', path.resolve(backendFolderPath, 'index.ts')],
};

if (isServer) {
  entry = {
    ssr: ['@babel/polyfill', path.resolve(frontendFolderPath, 'server/index.js')],
  };
}

module.exports = {
  ...config,
  entry,
  context: isServer ? frontendFolderPath : backendFolderPath,
  target: 'node',
  module: {
    rules: [
      ...config.module.rules,
      { test: /\.(module.)?(s?css)$/, loader: 'ignore-loader' },
    ],
  },
  plugins: [...config.plugins, new NodemonPlugin()],
  externals: [nodeExternals()],
};
