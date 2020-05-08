const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

const { config, isSSR } = require('./base.config');

// This config will be launched for the backend and for the SSR.
const frontendFolderPath = path.resolve(__dirname, '../packages/frontend/src');
const backendFolderPath = path.resolve(__dirname, '../packages/backend/src');

let entry = {
  backend: ['@babel/polyfill', path.resolve(backendFolderPath, 'index.ts')],
};

if (isSSR) {
  entry = {
    ssr: ['@babel/polyfill', path.resolve(frontendFolderPath, 'server/index.js')],
  };
}

module.exports = {
  ...config,
  entry,
  context: isSSR ? frontendFolderPath : backendFolderPath,
  target: 'node',
  plugins: [...config.plugins, new NodemonPlugin()],
  externals: [nodeExternals()],
  devServer: {
    port: 8000,
    hot: true,
  },
};
