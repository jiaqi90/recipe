import path from 'path';
import webpack, {HotModuleReplacementPlugin, NoErrorsPlugin} from 'webpack';
import BundleTracker from 'webpack-bundle-tracker';

export default {
  devtool: 'source-map',
  context: process.cwd(),
  entry: path.resolve(process.cwd(), 'assets', 'js', 'index'),
  output: {
    path: path.resolve(process.cwd(), 'assets', 'bundles'),
    filename: '[name]-[hash].js',
  },
  plugins: [
    new BundleTracker({filename: path.resolve(process.cwd(), 'webpack-stats.json')}),
  ],
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['eslint-loader'],
        exclude: /node_modules/,
      }
    ],
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel'],
      }
    ]
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new NoErrorsPlugin(),
  ],
};
