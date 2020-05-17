export const params2url = (url, params = {}) => {
  let keys = Object.keys(params)
  if (keys.length !== 0) {
    keys = keys.sort()
    const obj = {}
    url = `${url}?`
    keys.forEach((item) => {
      url = `${url}${item}=${params[item]}&`
    })
    url = url.substr(0, url.length - 1) // 删除末尾的&符号
  }
  return url
}

export const url2params = (url, params = {}) => {
  const idx = url.indexOf('?')
  if (idx) {
    const str = url.substr(idx + 1)
    if (str) {
      const arr = str.split('&')
      arr.forEach(item => {
        const [key, value] = item.split('=')
        params[key] = value
      })
    }
  }
  return params
}