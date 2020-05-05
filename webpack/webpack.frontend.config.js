const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const { config, filename, isProduction } = require('./base.config');

const PORT = 8080;

const optimization = () => (
  isProduction ? {
    minimizer: [
      new OptimizeCssAssetWebpackPlugin(),
      ...config.optimization.minimizer,
    ],
  } : {}
);

const frontendFolderPath = path.resolve(__dirname, '../packages/frontend/src');

module.exports = {
  ...config,
  context: frontendFolderPath,
  entry: {
    client: ['@babel/polyfill', path.resolve(frontendFolderPath, 'scripts/index.tsx')],
  },
  plugins: [
    ...config.plugins,
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(frontendFolderPath, 'public/index.html'),
      minify: {
        collapseWhitespace: isProduction,
      },
    }),
  ],
  optimization: {
    ...config.optimization,
    ...optimization(),
  },
  module: {
    rules: [
      ...config.module.rules,
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
        ],
      },
      {
        test: /\.(s?css)$/,
        exclude: /\.module.(s?css)$/,
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
    ],
  },
  devServer: {
    port: PORT,
    hot: !isProduction,
  },
  devtool: isProduction && 'source-map',
};
