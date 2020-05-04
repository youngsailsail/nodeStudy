const router = require('koa-router')()
const { loginApiCheck } = require('../../middlewares/loginCheck')
const { create } = require('../../controller/blog-home')
const { genValidator } = require('../../middlewares/validator')
const { blogValidate } = require('../../validator/blog')
router.prefix('/api/blog')
router.post('/create', loginApiCheck, genValidator(blogValidate), async (ctx, next) => {
    const { image, content } = ctx.request.body
    const { id: userId } = ctx.session.userInfo
    let res = await create({ userId, image, content })
    ctx.body = res
})
module.exports = router