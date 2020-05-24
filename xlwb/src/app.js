const Koa = require('koa')

const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const redisStore = require('koa-redis')
const session = require('koa-generic-session')
const koaStatic = require('koa-static')
const path = require('path')
const { REDIS_CONF } = require('./conf/db')

// 引入路由
const blogSquareApiRouter = require('./routes/api/blog-square')
const blogProfileApiRouter = require('./routes/api/blog-profile')
const homeApiRouter = require('./routes/api/blog-home')
const blogViewRouter = require('./routes/view/blog')
const utilsApiRouter = require('./routes/api/utils')
const userApiRouter = require('./routes/api/user')
const userViewRouter = require('./routes/view/user')
const error = require('./routes/view/error')
const { isPrd } = require('./utils/env')

// const jwtkoa=require('koa-jwt')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')

let conf = {}
// error handler
if (isPrd) {
    conf = {
        redirect: '/error',
    }
}
onerror(app, conf)

// middlewares
app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text'],
    }),
)
app.use(json())
app.use(logger())
app.use(koaStatic(`${__dirname}/public`))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(
    views(`${__dirname}/views`, {
        extension: 'ejs',
    }),
)

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// 配置jwt
// app.use(jwtkoa({
//     secret:SESSION_SECRET_KEY
// }).unless({
//     path:[/^\/users\/login/]
// }))//忽略哪些url

// 配置session
app.keys = [SESSION_SECRET_KEY]
app.use(
    session({
        key: 'weibo.sid',
        prefix: 'weibo.sid',
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        },
        store: redisStore({
            all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
        }),
    }),
)
// routes
app.use(blogSquareApiRouter.routes(), blogSquareApiRouter.allowedMethods())
app.use(blogProfileApiRouter.routes(), blogProfileApiRouter.allowedMethods())
app.use(homeApiRouter.routes(), homeApiRouter.allowedMethods())
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(error.routes(), error.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
