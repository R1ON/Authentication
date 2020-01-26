const common = require('./webpack-common.config');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  ...common,
  entry: {
    client: ['@babel/polyfill', './frontend/index.tsx'],
  },
  devServer: {
    port: 6666,
    hot: !isProduction,
  },
};
