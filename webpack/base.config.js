const path = require('path');
const Dotenv = require('dotenv-webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const isBackend = process.env.OPTION === 'backend';
const isSSR = process.env.OPTION === 'SSR';

const filename = (extension) => (!isProduction ? `[name].${extension}` : `[name].[hash].${extension}`);

const optimization = () => {
  const config = (isBackend || isSSR) ? {} : {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProduction) {
    config.minimizer = [
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: {
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
      ],
    },
  }];

  if (!isProduction) {
    loaders.push({
      loader: 'eslint-loader',
      options: {
        emitWarning: true,
      },
    });
  }

  return loaders;
};

module.exports = {
  config: {
    mode: 'development',
    resolve: {
      alias: {
        frontend: path.resolve(__dirname, '..', 'packages/frontend/src/scripts'),
        backend: path.resolve(__dirname, '..', 'packages/backend/src'),
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    output: {
      filename: filename('js'),
      path: path.resolve(__dirname, '../build'),
    },
    plugins: [
      new CleanWebpackPlugin(),
      new Dotenv(),
    ],
    optimization: optimization(),
    module: {
      rules: [
        {
          test: /\.(tsx?|jsx?)$/,
          exclude: /node_modules/,
          use: jsLoaders(),
        },
      ],
    },
  },
  filename,
  isProduction,
  isBackend,
  isSSR,
};
