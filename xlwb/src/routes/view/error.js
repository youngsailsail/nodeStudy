const router = require('koa-router')()

router.get('/error', async (ctx, next) => {
    console.log(22222222222222222222222222222222222)
    await ctx.render('error')
})

router.get('*', async (ctx, next) => {    
    await ctx.render('404')
})

module.exports = router
