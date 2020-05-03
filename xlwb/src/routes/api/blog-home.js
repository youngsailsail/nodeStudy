const router = require('koa-router')()
const { create } = require('../../controller/blog-home')
const {loginApiCheck}=require('../../middlewares/loginCheck')
const {genValidator}=require('../../middlewares/validator')
const {blogValidate}=require('../../validator/blog')
router.prefix('/api/blog')
router.post('/create',loginApiCheck,genValidator(blogValidate), async (ctx, next) => {
    const { image, content } = ctx.request.body
    const { id: userId } = ctx.session.userInfo
    let res = await create({ userId, image, content })
    ctx.body=res
})
module.exports = router