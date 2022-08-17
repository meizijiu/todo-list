const path = require('path')
const { logger } = require(path.resolve(__dirname, '../util/logger'))

// 全局处理错误
const handleGlobalError = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    logger.error(err.message)

    ctx.response.status = err.statusCode || err.status || 500
    ctx.response.body = {
      message: err.message,
    }
    ctx.app.emit('error', err, ctx) // 释放error
  }
}

module.exports = handleGlobalError
