const router = require('koa-router')()
const { isExist, register, login, changeInfo, changePassword, logout } = require('../../controller/user')
const { genValidator } = require('../../middlewares/validator')
const { loginApiCheck } = require('../../middlewares/loginCheck')

const { userValidate } = require('../../validator/user')

router.prefix('/api/user')

router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})
router.post('/register', genValidator(userValidate), async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    ctx.body = await register({ userName, password, gender })
})
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    let res = await login({ ctx, userName, password })
    console.log(res, 'resresresres')
    ctx.body = res
})
router.patch('/changeInfo', loginApiCheck, genValidator(userValidate), async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body
    ctx.body = await changeInfo({ ctx, nickName, city, picture })
})
router.patch('/changePassword', loginApiCheck, genValidator(userValidate), async (ctx, next) => {
    const { newPassword, password } = ctx.request.body
    const { userName } = ctx.session.userInfo
    ctx.body = await changePassword({ userName, newPassword, password })
})
router.post('/logout', loginApiCheck, async (ctx, next) => {
    ctx.body = await logout(ctx)
})

module.exports = router
