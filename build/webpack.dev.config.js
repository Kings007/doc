const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devServer: { // 
    port: '3001', // 端口号
    host: '0.0.0.0', // ip地址，默认localhost
    hot: true, // 
    historyApiFallback:true, // 配合react-router/history模式使用，将访问的404路由指向index.html
    contentBase: path.resolve(__dirname, '../dist'), // 指定服务器访问的文件地址
    disableHostCheck: true,
    proxy: { // 跨域配置
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api': ''} // 可以让请求路径中不携带/api
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1 // 值表示处理的@import的模块需要向下执行几个loader
            }
          },
          { // 处理css3前缀 优化之一，如果上面的css-loader不在options中配置imortloader属性，那么该配置只能作用于根样式文件，不能作用于导入的css模块
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer') // autoprefixer需要配合browserlist限定浏览器范围使用，可以在package.json中添加或者新建.browserslistrc文件
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2 // 值表示处理的@import的模块需要向下执行几个loader
            }
          },
          { // 处理css3前缀 优化之一，如果上面的css-loader不在options中配置imortloader属性，那么该配置只能作用于根样式文件，不能作用于导入的css模块
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer') // autoprefixer需要配合browserlist限定浏览器范围使用，可以在package.json中添加或者新建.browserslistrc文件
              ]
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}