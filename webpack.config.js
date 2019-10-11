const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
// 连接地址
const join = function(url){
  return path.join(__dirname, url);
};
// 绝对地址
const resolve = function(url){
  return path.resolve(__dirname, url);
};

module.exports = {
  entry: {
    app: join('main.js'),
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js','.css']
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
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      THREE:'three',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // 静态资源
    new CopyWebpackPlugin([
      { from: join('assets/image'), to:  join('dist/assets/image/') },
      { from: join('models'), to:  join('dist/models/') },
      { from: join('json'), to:  join('dist/json/') }
    ])
  ],
}
