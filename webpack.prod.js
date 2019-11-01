const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const basePth = require( './utils/basePath');
// 连接地址''
const join = function(url){
  return path.join(__dirname, url);
};
// 绝对地址
const resolve = function(url){
  return path.resolve(__dirname, url);
};

module.exports = {
  entry: {
    app: join('main.js')
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: basePth.basePath,
  },
  resolve: {
    extensions: ['.js','.css'],
    alias: {
      basePath: resolve('utils/util'),
    }
  },
  devServer: {
    contentBase: false, //静态资源
    port: 8081, //端口
    host: 'localhost',
    open: true, //是否自动打开浏览器啊
    inline: true,
    overlay: true,
    stats: 'errors-only'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [resolve('./node_modules')]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: resolve('dist/css'),
            },
          },
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',

      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      THREE: 'three',
      BASEPATH: 'basePath',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new CopyWebpackPlugin([
      { from: join('assets/image'), to:  join('dist/assets/image/') },
      { from: join('models'), to:  join('dist/models/') },
      { from: join('json'), to:  join('dist/json/') }
    ])
  ],
  optimization:{  //优化
    splitChunks:{
      cacheGroups:{ //缓存组，一个对象。它的作用在于，可以对不同的文件做不同的处理
        commonjs:{
          name:'vender',      //输出的名字（提出来的第三方库）
          test: /\.js/,       //通过条件找到要提取的文件
          chunks:'initial'    //只对入口文件进行处理
        }
      }
    }
  }
}
