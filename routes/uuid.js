const Router = require('@koa/router')
const { nanoid } = require('nanoid/async')

const uuid = new Router()

uuid.get('/uuid', async (ctx, next) => {
  ctx.body = {
    code: 200,
    data: await nanoid(),
    msg: 'ok',
  }

  next()
})

module.exports = uuid
