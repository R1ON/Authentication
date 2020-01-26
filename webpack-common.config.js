const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProduction) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

const filename = ext => (!isProduction ? `[name].${ext}` : `[name].[hash].${ext}`);

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
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './frontend/public/index.html',
      minify: {
        collapseWhitespace: isProduction,
      },
    }),
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, 'src/favicon.ico'),
    //     to: path.resolve(__dirname, 'build')
    //   }
    // ]),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  optimization: optimization(),
  module: {
    rules: [
      {
        test: /\.(css|s[ac]ss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !isProduction,
              reloadAll: true,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot|png|jpg|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(tsx?|jsx?)$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
};
