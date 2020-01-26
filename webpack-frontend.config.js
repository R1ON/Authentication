const common = require('./webpack-common.config');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  ...common,
  entry: {
    client: ['@babel/polyfill', './frontend/scripts/index.tsx'],
  },
  devServer: {
    port: 8080,
    hot: !isProduction,
  },
};
