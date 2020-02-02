const path = require('path');
const Dotenv = require('dotenv-webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const isBackend = process.env.OPTION === 'backend';

const filename = ext => (!isProduction ? `[name].${ext}` : `[name].[hash].${ext}`);

const optimization = () => {
  const config = isBackend ? {} : {
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
    });
  }

  return loaders;
};

module.exports = {
  config: {
    mode: 'development',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    output: {
      filename: filename('js'),
      path: path.resolve(__dirname, 'build'),
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
};
