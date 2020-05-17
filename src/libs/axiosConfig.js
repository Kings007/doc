import baseConfig from '../libs/baseConfig'
export default {
  baseURL: baseConfig.isProd ? '' : '/api', // ‘/api'配合devServer配置的proxy属性实现跨域代理
  timeout: 5000, // 默认配置5s超时
  withCredentials: true // 当发生跨域请求时，自动携带cookie
}