const path = require('path');
const Dotenv = require('dotenv-webpack');

const TerserWebpackPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const isBackend = process.env.OPTION === 'backend';

// const isClient = process.env.OPTION === 'client'; // single-page-application
const isServer = process.env.OPTION === 'server'; // server-side-render

let buildFolderName = 'client';

if (isServer) {
  buildFolderName = 'server';
} else if (isBackend) {
  buildFolderName = 'backend';
}

const filename = (extension) => (!isProduction ? `[name].${extension}` : `[name].[hash].${extension}`);

const optimization = () => {
  const config = (isBackend || isServer) ? {} : {
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
        'universal-import',
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

const plugins = [];

plugins.push(new CleanWebpackPlugin());

if (isBackend) {
  plugins.push(new Dotenv());
}

module.exports = {
  config: {
    mode: isProduction ? 'production' : 'development',
    resolve: {
      alias: {
        frontend: path.resolve(__dirname, '..', 'packages/frontend/src/scripts'),
        backend: path.resolve(__dirname, '..', 'packages/backend/src'),
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    output: {
      filename: filename('js'),
      path: path.resolve(__dirname, `../build/${buildFolderName}`),
    },
    plugins,
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
  isServer,
};
