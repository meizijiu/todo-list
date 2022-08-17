/**
 * @getClientIP
 * @desc 获取用户 ip 地址
 * @param {Object} req - 请求
 */

async function getClientIP(req) {
  return (
    req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
    (req.connection && req.connection.remoteAddress) || // 判断 connection 的远程 IP
    (req.socket && req.socket.remoteAddress) || // 判断后端的 socket 的 IP
    (req.connection && req.connection.socket && req.connection.socket.remoteAddress)
  )
}

module.exports = getClientIP
