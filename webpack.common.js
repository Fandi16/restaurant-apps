const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require( 'workbox-webpack-plugin' );
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    } ),
    new BundleAnalyzerPlugin(),
    new CopyWebpackPlugin({
          patterns: [
      {
        from: path.resolve(__dirname, 'src/public'),
        to: path.resolve(__dirname, 'dist'),
        globOptions: {
          // CopyWebpackPlugin mengabaikan berkas yang berada di dalam folder images
          // ignore: ['**/images/**'],
        },
      },
    ],
    } ),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
      ],
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: './sw.bundle.js',
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/restaurant-api.dicoding.dev\//,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'CACHE_NAME',
            cacheableResponse: {
              statuses: [200],
            },
          },
        },
        {
          urlPattern: /^https:\/\/restaurant-api.dicoding.dev\/images\/medium\//,
          handler: 'CacheFirst',
          options: {
            cacheName: 'IMAGE-CACHE',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
          },
        },
      ],
    }),
  ],
};
