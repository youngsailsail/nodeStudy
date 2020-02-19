const router = require('koa-router')()
const {loginApiCheck,loginViewCheck}=require('../../middlewares/loginCheck')

router.get('/', async (ctx, next) => {
    await ctx.render('index',{})
})
router.get('/json', loginApiCheck,async (ctx, next) => {
    ctx.body={
        ad:1,
        bb:2    
    }
})
module.exports = router
