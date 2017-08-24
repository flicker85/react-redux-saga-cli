const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

let config = {
  entry: {
    app: ["babel-polyfill", "./src/index.js"]
  },
  output: {
    filename: "bundle.js",
    path: BUILD_PATH,
    publicPath: '/',
    chunkFilename: "[name].bundle.js"
  },
  resolve: {
    modules: [APP_PATH, "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: APP_PATH,
        use: ["react-hot-loader", "babel-loader"]
      }, {
        test: /\.less$/,
        include: APP_PATH,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: "[path][name]__[local]--[hash:base64:5]"
              }
            },
            {
              loader: "less-loader",
              options: { sourceMap: true, modifyVars: require('./antd.theme.js') }
            }
          ]
        })
      }, {
        test: /\.less$/,
        exclude: APP_PATH,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            {
              loader: "less-loader",
              options: { sourceMap: true, modifyVars: require('./antd.theme.js') }
            }
          ]
        })
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "style.css",
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      chunksSortMode: "dependency"
    }),
  ]
};

if(process.env.NODE_ENV != 'production') {
  config.devtool = 'eval-source-map';
  config.devServer = {
    contentBase: BUILD_PATH,
    compress: true,
    port: 9000,
    proxy: {
      "/api": {
        target: "http://localhost:9090",
        pathRewrite: { "^/api": "" },
        secure: false
      }
    }
  };
}

module.exports = config;