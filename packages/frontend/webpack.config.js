const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const { config, filename, isProduction } = require('../../webpack-common.config');

const PORT = 8080;

const optimization = () => (
  isProduction ? {
    minimizer: [
      new OptimizeCssAssetWebpackPlugin(),
      ...config.optimization.minimizer,
    ],
  } : {}
);

module.exports = {
  ...config,
  context: path.resolve(__dirname, 'src'),
  entry: {
    client: ['@babel/polyfill', './scripts/index.tsx'],
  },
  plugins: [
    ...config.plugins,
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/public/index.html'),
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
    ],
  },
  devServer: {
    port: PORT,
    hot: !isProduction,
  },
  devtool: isProduction ? '' : 'source-map',
};
