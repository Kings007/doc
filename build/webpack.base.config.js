const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.js', // 文件入口
  output: { // // 打包出口
    filename: 'js/[name][hash:8].js',
    chunkFilename: 'js/[name]-[chunkhash:8].min.js',
    path: path.resolve(__dirname, '../dist') // path只接受绝对路径
  },
  module: { // 配置loader装载机
    rules: [
      // 处理js模块
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/, // 无需处理这两个目录下的js, 加快webpack效率。 优化之一
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  { // 如下配置是为了配合babel-polyfill将es6及以上版本的js转化为es5
                    useBuiltIns: 'usage', // 该配置会引用@babel/polyfill polyfill依赖core-js包
                    corejs: { // 需要安装core-js依赖
                      version: 3,
                      proposale: true
                    }
                  }
                ],
                "@babel/preset-react"
              ],
              plugins: [
                ["@babel/plugin-proposal-class-properties", { loader: true }], // 处理处于提案中的class
                "@babel/plugin-transform-runtime" // 依赖@babel/runtime在运行环境，抽离公共方法减少代码 优化之一
              ]
            }
          },
          {
            loader: require.resolve('ehome-react-skeleton')
          }
        ]
      },
      // 处理html模版中导入的路径
      {
        test: /\.(htm|html)/,
        loader: 'html-loader'
      },
      // 处理图片模块
      {
        test: /\.(jpg|png|jpge|gif|svg)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name][contenthash:8].[ext]',
              publicPath: '../',
              esModule: false, // 默认true,需要关闭，img标签src路径才会以commonjs规范打包
              limit: 8192 // 官方推荐值，单位字节， 即8kb以下大小的文件打包为base64。
            }
          }
        ]
      },
      // 处理字体模块
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'fonts/[name][contenthash:8].[ext]',
            }
          }
        ]
      },
      // 以上为基础模块处理， 以下可配置特殊loder。如 vue-loader/less-loader/stylus-loader
    ]
  },
  plugins: [ // 插件
    // 配置html模版插件
    new HtmlWebpackPlugin({
      filename: 'index.html', // 指定输出文件名，也可以指定相对路径 如 ‘asset/index.html’
      template: './public/index.html', // 指定模版路径绝对或相对
      inject: true, // 自动给模版注入script标签导入打包好的js文件
    }),
    new ProgressBarPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.json']
  }
}