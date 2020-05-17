const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }); 

module.exports = {
  mode: 'production',
  output: {
    publicPath: './'
  },
  module: {
    rules: [
      // 处理css模块
      {
        test: /\.css$/,
        use: [ // loader 左右书写则从右到左执行，上下书写则从下到上执行
          MiniCssExtractPlugin.loader, // 将css抽离成单独文件,由于缺失HMR热加载功能，开发环境不建议使用
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1 // c
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
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
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
          'happypack/loader?id=less'
        ]
      }
    ]
  },
  plugins: [
    // 配置css文件提取插件
    new MiniCssExtractPlugin({
      // filename: 'styles/[name][contenthash:8].css',
      chunkFilename: 'styles/[name]-[contenthash:8].min.css',
      publicPath: '../'
    }),
    // 配置清理打包出口目录
    new CleanWebpackPlugin(), // 自动删除outputPaht对应的目录，无需配置目录
    new HappyPack({
      id: 'less',
      threadPool: happyThreadPool,
      loaders: [{
        loader: 'less-loader',
      }]
    }),
    new HappyPack({
      id: 'css',
      threadPool: happyThreadPool,
      loaders: [{
        loader: 'css-loader',
      }]
    })
  ],
  optimization: { // 手动优化配置
    minimizer: [ // 定制多个压缩工具
      new OptimizeCSSAssetsPlugin({}), // css压缩工具
      new TerserJSPlugin({}), // js压缩工具
    ],
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      cacheGroups: { // 以下配置可以将依赖包拆分，由一个大包拆成多个小包
        vendor: { // 抽离第三方依赖
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vender',
          reuseExistingChunk: true
        },
        react: { // 抽离react相关依赖
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]react/,
          name: 'react',
          reuseExistingChunk: true
        },
        common: { // 抽离自定义的公共方法如http,utils...
          chunks: 'async',
          test: /\.jsx$/,
          name: 'common',
          reuseExistingChunk: true,
          priority: -20,
          reuseExistingChunk: true
        },
        // style: {
        //   chunks: 'async',
        //   test:/test.css$/,
        //   name: 'test'
        // }
      }
    }
  }
}