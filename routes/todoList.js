const path = require('path')
const Router = require('@koa/router')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc') // dependent on utc plugin
const timezone = require('dayjs/plugin/timezone')
const { nanoid } = require('nanoid')
const { QueryTypes } = require('sequelize')
const ROOT = path.resolve(process.cwd(), './')
const { db } = require(path.resolve(ROOT, './util/db'))
const { logger } = require(path.resolve(ROOT, './util/logger'))
const getClientIP = require(path.resolve(ROOT, './util/getClientIP'))

const todoList = new Router()

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Shanghai')

todoList.get('/todoList/list', async (ctx, next) => {
  const reqParams = ctx.query
  const selects = {
    0: "SELECT * FROM todolist WHERE is_finished='0' ORDER BY create_time DESC;",
    1: "SELECT * FROM todolist WHERE is_finished='1' ORDER BY create_time DESC;",
    2: 'SELECT * FROM todolist ORDER BY create_time DESC;',
  }
  const filterType = reqParams.filterType || '2'

  try {
    let list = await db.query(selects[filterType], {
      type: QueryTypes.SELECT,
    })

    list = list.map(item => ({
      ...item,
      create_time: dayjs(item.create_time).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss'),
      is_finished: item.is_finished === '0' ? false : true,
    }))

    ctx.body = {
      code: 200,
      data: list || [],
      msg: 'ok',
    }
  } catch (e) {
    console.log(e)
  }

  await next()
})

todoList.post('/todoList/addOne', async (ctx, next) => {
  const ip = await getClientIP(ctx.req)
  const { msg, timeStamp } = ctx.request.body

  const id = nanoid()
  const create_time = dayjs(timeStamp).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss')

  try {
    const sql = `INSERT INTO todolist (id, create_time, is_finished, msg) VALUES('${id}', '${create_time}', '0', '${msg}');`
    await db.query(sql)

    await logger.info(`[${ip}]: ${sql}`)

    ctx.body = {
      code: 200,
      data: {
        id,
        create_time,
      },
      msg: 'ok',
    }
  } catch (error) {
    console.log(error)
  }

  await next()
})

todoList.post('/todoList/update', async (ctx, next) => {
  const ip = await getClientIP(ctx.req)
  const { id, is_finished } = ctx.request.body

  try {
    const sql = `UPDATE todolist SET is_finished = '${is_finished}' WHERE id = '${id}';`
    await db.query(sql)

    await logger.info(`[${ip}]: ${sql}`)

    ctx.body = {
      code: 200,
      data: {
        id,
        is_finished: is_finished === '1',
      },
      msg: 'ok',
    }
  } catch (error) {
    console.log(error)
  }

  await next()
})

todoList.post('/todoList/delete', async (ctx, next) => {
  const ip = await getClientIP(ctx.req)
  const { id } = ctx.request.body

  try {
    const sql = `DELETE FROM todolist WHERE id = '${id}';`
    await db.query(sql)

    await logger.info(`[${ip}]: ${sql}`)

    ctx.body = {
      code: 200,
      data: {
        id,
      },
      msg: 'ok',
    }
  } catch (error) {
    console.log(error)
  }

  await next()
})

module.exports = todoList
