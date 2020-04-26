const webpackConfig = require('./webpack.config');

// todo: перенести все из webpack конфиг

module.exports = {
  webpack(config) {
    return { ...config };
  },
};
