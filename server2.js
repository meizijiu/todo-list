const path = require('path')
const fs = require('fs')
const http = require('http')
const url = require('url')
const mime = require('mime')

function readStaticFile(res, pathName) {
  const mimeType = mime.getType(pathName)

  if (!mimeType) return

  fs.readFile(path.resolve(__dirname, `./${pathName}`), (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.write('404 NOT FOUND')
      res.end()
    } else {
      res.writeHead(200, { 'Content-Type': mimeType })
      res.write(data)
      res.end()
    }
  })
}

const server = http.createServer(function (req, res) {
  // http://nodejs.cn/api/url.html
  let pathName = url.parse(req.url).pathname
  if (pathName === '/') pathName = 'index.html'

  res.setHeader('Access-Control-Allow-Origin', '*')
  // res.writeHead(200, { "Content-Type": mime.getType(pathName) });

  // 读取静态文件
  readStaticFile(res, pathName)
})

server.listen(5000, () => {
  console.log('Server running at http://127.0.0.1:5000/')
})
