const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StatoscopePlugin = require('@statoscope/webpack-plugin').default

const config = {
  entry: {
    about: './src/pages/About.js',
    home: './src/pages/Home.js',
    main: {
      dependOn: 'about',
      import: './src/index.js'
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'dist'),
      
    }),
    new StatoscopePlugin({
      saveStatsTo: 'stats.json',
      saveOnlyStats: false,
      open: false,
    }),

  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  target: 'web',
    resolve: {
      fallback: {
        'crypto': require.resolve('crypto'),
      },
      alias: {
        'crypto-browserify': path.resolve(__dirname, 'src/crypto-fallback.js'),
        'react-is': path.resolve(__dirname, 'node_modules/react-is/cjs/react-is.production.min.js')
      },
    },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    open: true
  },
}

module.exports = config
