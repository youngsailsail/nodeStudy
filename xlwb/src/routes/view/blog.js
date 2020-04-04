const router = require('koa-router')()
const {loginApiCheck,loginViewCheck}=require('../../middlewares/loginCheck')

router.get('/',async (ctx, next) => {
    await ctx.render('index',{})
})
module.exports = router
