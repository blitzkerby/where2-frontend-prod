const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js', // Adjust the entry point as needed
  output: {
    filename: 'bundle.js', // Adjust output filename as needed
    path: path.resolve(__dirname, 'dist'), // Adjust output path as needed
  },
  resolve: {
    fallback: {
      "zlib": require.resolve("browserify-zlib"),
      "querystring": require.resolve("querystring-es3"),
      "path": require.resolve("path-browserify"),
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer/"),
      "util": require.resolve("util/"),
      "crypto": require.resolve("crypto-browserify"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "assert": require.resolve("assert/"),
      "url": require.resolve("url/"),
      "net": false,
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser'
    })
  ],
  module: {
    rules: [
      // Your loaders here (e.g., babel-loader for JS, style-loader for CSS, etc.)
    ]
  },
};
