import { params2url } from '../utils/paramsAndUrl'

class CacheData {
  constructor() {
    this.data = {}
  }
  getKey(data) {
    if (data.method === 'get') {
      return params2url(data.url, data.params)
    }
    return false
  }
  has(data) {
    const key = this.getKey(data)
    Promise.resolve().then(() => {
      this.checkAllData() // 异步实现，保证主事件的运行效率 
    })
    if (this.data[key]) {
      if (!this.checkData(this.data[key])) {
        return this.data[key].data // 返回未过期数据
      } else {
        this.remove(key) // 数据已过期清除数据
      }
    }
    return false
  }
  add(data, res) {
    this.checkAllData()
    if (this.has(data)) return false
    const key = this.getKey(data)
    let cacheTime = data.cache
    if (cacheTime > 0) {
      this.data[key] = {
        data: res, // 缓存的数据
        expired: Date.now() + Math.floor(cacheTime) * 1000 // 过期时间 毫秒数
      }
    }
  }
  remove(key) {
    delete this.data[key]
  }
  checkData(data) {
    const time = Date.now()
    return time - data.expired >= 0 // true表示当前时间大于过期时间则判定为数据已过期
  }
  checkAllData() { // 该方法在添加新数据和读取数据时需要调用，原因是释放已过期数据，减少内存占用
    for (const i in this.data){
      if(this.checkData(this.data[i])) {
        this.remove(i)
      }
    }
  }
}

export default CacheData