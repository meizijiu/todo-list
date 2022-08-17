function getClientDevice(request) {
  let deviceAgent = request.headers && request.headers['user-agent'] && request.headers['user-agent'].toLowerCase()

  if (deviceAgent) {
    let agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/)

    return agentID ? 'mobile' : 'PC'
  } else {
    return 'unkown device'
  }
}

// 全局处理错误
const logClientDevices = async (ctx, next) => {
  if (ctx.url === '/') {
    let device = getClientDevice(ctx.request)
    // logger.info(`当前设备：${device}`);
    console.log(`当前设备：${device}`)
  }

  await next()
}

module.exports = logClientDevices
