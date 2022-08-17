const path = require('path')
const { Sequelize } = require('sequelize')
const { logger, mysqlLogger } = require(path.resolve(__dirname, '../util/logger'))

const db = new Sequelize('todolist', 'root', '123456', {
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    supportBigNumbers: true,
    bigNumberStrings: true,
  },
  host: process.env.NODE_ENV === 'development' ? 'localhost' : 'todolist_mysql_server',
  timezone: '+08:00', // 东8区
  port: '3306',
  logging: msg => mysqlLogger.info(msg),
})

const connectMySQL = async () => {
  try {
    await db.authenticate()
    console.log('mysql连接成功')
  } catch (e) {
    console.log(e)
    console.log('连接失败，3秒后重试')
    logger.error(`数据库连接失败: ${e.message}`)
    setTimeout(connectMySQL, 3000)
  }
}

exports.connectMySQL = connectMySQL
exports.db = db
