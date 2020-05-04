const router = require('koa-router')()
const { loginApiCheck } = require('../../middlewares/loginCheck')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListStr } = require('../../utils/blog')
router.prefix('/api/profile')
router.get('/loadMore/:userName/:pageIndex', loginApiCheck, async (ctx) => {
    const { userName, pageIndex } = ctx.params
    let res = await getProfileBlogList({
        userName,
        pageIndex: parseInt(pageIndex),
    })
    res.data.blogListTpl = getBlogListStr(res.data.blogList)
    ctx.body = res
})

module.exports = router