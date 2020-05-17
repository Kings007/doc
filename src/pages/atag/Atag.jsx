import React from 'react'

import img from './demo.png'
import video from './a.mp4'
export default class Atag extends React.Component {
  render() {
    return (
      <div>
        <img className="img" src={img} alt="" width="100"/>
        {/* <button onClick={this.saveImage}>保存图片</button> */}
        {/* 同源图片/视频 */}
        {/* <p><a href={img} download="demo.png">点击下载png</a></p> */}
        {/* <p><a href={video} download="demo.mp4">点击下载mp4</a></p> */}
        {/* 非同源图片/视频 */}
        {/* <p><a href='https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg'download="test.js">点击下载png</a></p> */}
        {/* <p><a href='http://localhost:3000/files/a.mp4'download="a.mp4">点击下载mp4</a></p> */}
        {/* 非同源其他文件 */}
        {/* <p><a href='http://localhost:3000/files/a.txt'download="a.txt">点击下载txt</a></p> */}
        {/* <p><a href='http://localhost:3000/files/a.zip'download="a.zip">点击下载zip</a></p> */}
        {/* <p><a href='http://localhost:3000/files/a.pdf'download="a.zip">点击下载pdf</a></p> */}
        {/* <p><a href='http://localhost:3000/files/a.docx'download="a.zip">点击下载docx</a></p> */}
      </div>
    )
  }
  saveImage() {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = document.querySelector('.img')
    ctx.width = img.width
    ctx.heigth = img.height
    ctx.drawImage(img, 0, 0, ctx.width, ctx.height)
    const url = canvas.toDataURL()
    const a = document.createElement('a')
    a.download = 'demo.png'
    a.href = url
    a.click()
  }
}
