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
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [require('postcss-cssnext')()],
            },
          },
        ],
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
      { from: '*.json', to: outputDir, context: 'lib' },
      { from: '*.html', to: outputDir, context: 'lib' },
      { from: '*.png', to: outputDir, context: 'lib' },
      { from: 'style/**', to: outputDir, context: 'lib' },
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
