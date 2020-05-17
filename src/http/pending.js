import { params2url } from '../utils/paramsAndUrl'

class Pending {
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
    if (key) {
      return this.data[key]
    }
    return false
  }
  add(data, cancle) {
    if (!this.has(data)) {
      this.data[this.getKey(data)] = cancle
      return true
    }
    return false
  }
  remove(data) {
    delete this.data[this.getKey(data)]
  }
  cancle(data, str = '请耐心等待响应,勿重复请求') {
    this.data[this.getKey(data)](str)
    this.remove(data)
  }
  init(data, cancle) {
    if(this.has(data)) {
      cancle('请耐心等待响应,勿重复请求')
    } else {
      this.add(data, cancle)
    }
  }
}

export default Pending