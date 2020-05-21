const router = require('koa-router')()
const { loginApiCheck } = require('../../middlewares/loginCheck')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { followUser, unFollow } = require('../../controller/user-relation')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/profile')
router.get('/loadMore/:userName/:pageIndex', loginApiCheck, async (ctx) => {
    const { userName, pageIndex } = ctx.params
    const res = await getProfileBlogList({
        userName,
        pageIndex: parseInt(pageIndex),
    })
    res.data.blogListTpl = getBlogListStr(res.data.blogList)
    ctx.body = res
})
router.post('/follow', loginApiCheck, async (ctx) => {
    const { userId: followId } = ctx.request.body
    const { id: myId } = ctx.session.userInfo
    ctx.body = await followUser({ followId, myId })
})
router.post('/unFollow', loginApiCheck, async (ctx) => {
    const { userId: followId } = ctx.request.body
    const { id: myId } = ctx.session.userInfo
    ctx.body = await unFollow({ followId, myId })
})
module.exports = router
