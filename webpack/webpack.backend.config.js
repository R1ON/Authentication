const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

const { config, isBackend, isSSR } = require('./base.config');

// This config will be launched for the backend and for the SSR.
const frontendFolderPath = path.resolve(__dirname, '../packages/frontend/src');
const backendFolderPath = path.resolve(__dirname, '../packages/backend/src');
let finalPath = backendFolderPath;

if (isSSR) {
  finalPath = frontendFolderPath;
}

module.exports = {
  ...config,
  context: finalPath,
  target: 'node',
  entry: {
    server: ['@babel/polyfill', path.resolve(finalPath, isBackend ? 'index.ts' : 'server/index.js')],
  },
  plugins: [...config.plugins, new NodemonPlugin()],
  externals: [nodeExternals()],
  devServer: {
    port: 8000,
    hot: true,
  },
};
