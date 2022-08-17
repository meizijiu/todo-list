const Router = require('@koa/router')
const path = require('path')

const index = new Router()
const { logger } = require(path.resolve(__dirname, '../util/logger'))

index.get('/', async (ctx, next) => {
  logger.info('enter index')

  ctx.body = `
      <h1>hello koa2</h1>
      <ul>
        <li>ctx.method: ${ctx.method}</li>
        <li>ctx.query: ${JSON.stringify(ctx.query)}</li>
        <li>ctx.querystring: ${JSON.stringify(ctx.querystring)}</li>
        <li>ctx.request.body: ${JSON.stringify(ctx.request.body)}</li>
      </ul>
    `

  next()
})

module.exports = index
