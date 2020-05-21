/**
 * @description 登录校验
 * @author yff
 */
const { loginCheckFailInfo } = require('../model/ErrorInfo')
const { ErrorModel } = require('../model/ResModels')

const loginApiCheck = async (ctx, next) => {
    if (ctx.session && ctx.session.userInfo) {
        await next()
        return
    }
    ctx.body = new ErrorModel(loginCheckFailInfo)
}
const loginViewCheck = async (ctx, next) => {
    if (ctx.session && ctx.session.userInfo) {
        await next()
        return
    }
    const { url } = ctx
    ctx.redirect(`/login?url=${encodeURIComponent(url)}`)
}
module.exports = {
    loginApiCheck,
    loginViewCheck,
}
