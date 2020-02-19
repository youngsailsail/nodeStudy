const router = require('koa-router')()
/**
 * 
 * @param {Object} ctx  koa2的上下文
 */
const{loginViewCheck}=require('../../middlewares/loginCheck')
const getUserInfo=(ctx)=>{
    const data={
        isLogin:false
    }
    const {userInfo}=ctx.session
    if(userInfo){
        data.isLogin=true
        data.userName=userInfo.userName
    }
    return data
}
router.get('/register', async (ctx, next) => {
    await ctx.render('register',getUserInfo(ctx))
})
router.get('/login', async (ctx, next) => {
    await ctx.render('login',getUserInfo(ctx))
})
router.get('/setting', loginViewCheck,async (ctx, next) => {
    await ctx.render('setting',ctx.session.userInfo)
})
module.exports = router
