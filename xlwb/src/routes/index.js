const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    // throw Error()    
    // debugger
    // console.log('after debbuger')
    await ctx.render('index', {
        title: 'Hello Koa 2!',
        message: '我是message',
        arra: [1, 2, 3, 4, 5],
        isMe: false
    })
})

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
    if (!ctx.session.viewNum) ctx.session.viewNum = 0
    ctx.session.viewNum++
    ctx.body = {
        title: 'koa2 json'
        // viewNum: ctx.session.viewNum
    }
})

module.exports = router
