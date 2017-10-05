const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const outputDir = path.resolve(__dirname, isProduction ? 'dist' : 'build');

module.exports = {
  entry: {
    'content': './content.js',
    'background': './background.js',
    'devtools': './devtools.js',
    'panel': './panel.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, outputDir),
  },
  devtool: !isProduction ? 'source-map' : false,
  externals: [
    'chrome',
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          postcss: [
            require('postcss-cssnext')(),
          ],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue'],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'lib/manifest.json', to: outputDir },
      { from: 'lib/devtools.html', to: outputDir },
      { from: 'lib/panel.html', to: outputDir },
      { from: 'lib/panel.css', to: outputDir },
      { from: 'lib/icon16.png', to: outputDir },
      { from: 'lib/icon48.png', to: outputDir },
      { from: 'lib/icon128.png', to: outputDir },
    ]),
  ].concat(
    isProduction
      ? [
        new webpack.optimize.UglifyJsPlugin({
          comments: false,
          compress: {
            warnings: false,
            drop_console: true,
          },
          sourceMap: false,
          beautify: false,
        }),
      ]
      : []
  ),
};
