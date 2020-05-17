class FormDate {
  constructor(time) {
    if (time && typeof time === 'string') {
      time = time.replace(/-/g, '/')
      this.time = new Date(time)
    } else if (typeof time === 'number') {
      this.time = time
    }
  }
  getCountdown() {
    const arr = []
    const time = Date.now()
    const diff = this.time - time
    if (diff > 0) {
      const day = Math.floor(diff/1000/60/60/24)
      const hour = Math.floor(diff/1000/60/60 - 24 * day )
      arr.push(hour > 9 ? hour : `0${hour}`)
      const min = Math.floor(diff/1000/60 - 24 * day - 60 * hour)
      arr.push(min > 9 ? min : `0${min}`)
      const sec = Math.floor(diff/1000 - 24 * day - 60 * 60 * hour - 60 * min)
      arr.push(sec > 9 ? sec : `0${sec}`)
      return arr
    } else {
      return [0,0,0]
    }
  }
}

export default FormDate