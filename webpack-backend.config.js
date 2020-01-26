const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

const common = require('./webpack-common.config');

module.exports = {
  ...common,
  target: 'node',
  entry: {
    server: ['@babel/polyfill', './backend/index.ts'],
  },
  externals: [nodeExternals()],
  plugins: [...common.plugins, new NodemonPlugin()],
};
