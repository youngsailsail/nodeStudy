const router = require('koa-router')()
const {isExist,register,login,changeInfo,changePassword}=require('../../controller/user')
const {genValidator}=require('../../middlewares/validator')
const {userValidate}=require('../../validator/user')

router.prefix('/api/user')

router.post('/isExist', async (ctx, next) => {
    const {userName}=ctx.request.body
    ctx.body= await isExist(userName)
})
router.post('/register',genValidator(userValidate), async (ctx, next) => {
    const {userName,password,gender}=ctx.request.body
    ctx.body=await register({userName,password,gender})
})
router.post('/login', async (ctx, next) => {
    const {userName,password}=ctx.request.body
    ctx.body=await login({ctx,userName,password})
})
router.patch('/changeInfo',genValidator(userValidate), async (ctx, next) => {
    const {nickName,city,picture}=ctx.request.body
    ctx.body=await changeInfo({ctx,nickName,city,picture})
})
router.patch('/changePassword',genValidator(userValidate), async (ctx, next) => {
    const {newPassword,password}=ctx.request.body
    ctx.body=await changePassword({ctx,newPassword,password})
})
module.exports = router
