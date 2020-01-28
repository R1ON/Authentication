const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

const { config } = require('../../webpack-common.config');

module.exports = {
  ...config,
  context: path.resolve(__dirname, 'src'),
  target: 'node',
  entry: {
    server: ['@babel/polyfill', './index.ts'],
  },
  plugins: [...config.plugins, new NodemonPlugin()],
  externals: [nodeExternals()],
  devServer: {
    port: 8000,
    hot: true,
  },
};
