const fs = require('fs');
const path = require('path');
const Dotenv = require('dotenv-webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MinimizeStats = require('./minimizeStats');

const isProduction = process.env.NODE_ENV === 'production';
const isBackend = process.env.OPTION === 'backend';
const isSSR = process.env.OPTION === 'ssr';
const isStats = process.env.OPTION === 'stats';

const statsFilename = path.resolve(__dirname, '../packages/frontend/src/server/stats.json');

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

if (isSSR && isProduction) {
  fs.writeFileSync(statsFilename, '{}');
  plugins.push(
    new BundleAnalyzerPlugin({
      statsFilename,
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsOptions: {
        reasons: false,
        source: false,
      },
    }),
  );
  plugins.push(new MinimizeStats(statsFilename));
}

module.exports = {
  config: {
    mode: isProduction ? 'production' : 'development',
    resolve: {
      alias: {
        frontend: path.resolve(__dirname, '..', 'packages/frontend/src/scripts'),
        backend: path.resolve(__dirname, '..', 'packages/backend/src'),
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.mjs'],
    },
    output: {
      filename: filename('js'),
      path: path.resolve(__dirname, '../build'),
    },
    plugins,
    optimization: optimization(),
    stats: {
      // TODO: прочитать про это
      // copied from `'minimal'`
      all: false,
      modules: true,
      maxModules: 0,
      errors: true,
      warnings: true,
      // our additional options
      timings: true,
    },
    module: {
      rules: [
        {
          test: /\.(tsx?|jsx?)$/,
          exclude: /node_modules/,
          use: jsLoaders(),
        },
        {
          test: /\.module.s?css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
  },
  filename,
  isProduction,
  isBackend,
  isSSR,
};
