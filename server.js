const Koa = require('koa')
const Router = require('@koa/router')
const path = require('path')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const koalogger = require('koa-logger')
const ROOT = path.resolve(process.cwd(), './')
const { accessLogger, logger } = require(path.resolve(ROOT, './util/logger'))
const { connectMySQL } = require(path.resolve(ROOT, './util/db'))
const { handleGlobalError, logClientDevices } = require(path.resolve(ROOT, './middleware'))

const index = require(path.resolve(ROOT, './routes/index'))
const uuid = require(path.resolve(ROOT, './routes/uuid'))
const todoList = require(path.resolve(ROOT, './routes/todoList'))

const app = new Koa()
const router = new Router()

app.use(accessLogger())
app.use(koalogger())
app.use(static(path.resolve(__dirname, './public')))
app.use(bodyParser())
app.use(handleGlobalError)
app.use(logClientDevices)

// 加载所有子路由
router.use('/', index.routes(), index.allowedMethods())
router.use('/api', uuid.routes(), uuid.allowedMethods())
router.use('/api', todoList.routes(), todoList.allowedMethods())
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.on('error', err => {
  console.log('logging error ', err.message)
  logger.error('logging error ' + err.message)
})

app.listen(4000, async () => {
  console.log('====your app is running at port 4000=====')

  await connectMySQL()
})
