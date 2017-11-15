const AssetsPlugin = require('assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const projectPath = path.resolve(__dirname);

module.exports = {
  entry: [
    'babel-polyfill',
    './source/index.jsx',
  ],
  output: {
    path: path.resolve(projectPath, 'build'),
    publicPath: '',
    chunkFilename: '[name]-[hash].chunk.js',
    filename: '[name]-[hash].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [path.resolve(projectPath, 'source'), path.resolve(projectPath, 'node_modules')],
  },
  plugins: [
    new AssetsPlugin({path: path.resolve(projectPath, 'build')}),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      syntax: 'scss',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(projectPath, 'source/index.ejs'),
      inject: 'body',
      render: '',
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    }),
  ],
  module: {
    exprContextRegExp: /$^/,
    exprContextCritical: false,
    wrappedContextRegExp: /$^/,
    wrappedContextCritical: false,
    loaders: [{ test: /\.json$/, loader: 'json' }],
    rules: [
      {
        test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: 'file-loader',
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        use: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
