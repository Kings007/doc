import Axios from 'axios'
import config from '../libs/axiosConfig'
import Pending from './pending'
import CacheDate from './cacheData'

const instance = Axios.create(config)
const pendInstance = new Pending() // 正在进行的请求
const cacheInstance = new CacheDate()
const CancelToken = Axios.CancelToken
let cancleFn = null

instance.interceptors.request.use(conf => {
  const res = cacheInstance.has(conf)
  if (res) {
    return Promise.reject(res)
  }
  conf.cancelToken = new CancelToken(c => {
    cancleFn = c
  })
  pendInstance.init(conf, cancleFn)
  return conf
}, err => {
  return Promise.reject(err)
})
instance.interceptors.response.use(res => {
  Promise.resolve().then(() => {
    pendInstance.remove(res.config)
    cacheInstance.add(res.config, res)
  })
  return res.data
}, err => {
  /**
   * 取消请求后，会执行error方法
   * 读取本地缓存数据通过这里把数据给到用户 需要特殊处理
   * 其他异常
   */
  if (err.status === 200) {
    return Promise.resolve(err.data)
  } else if(err.response){
    pendInstance.remove(err.response.config)
  }
  return Promise.reject(err)
})

export default instance