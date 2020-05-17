const router = require('koa-router')()
const { loginViewCheck } = require('../../middlewares/loginCheck')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSuqareBlogList } = require('../../controller/blog-square')

router.get('/', loginViewCheck, async (ctx, next) => {
    await ctx.render('index', {})
})
router.get('/profile', loginViewCheck, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    await ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginViewCheck, async (ctx, next) => {
    const { userName: currUserName } = ctx.params
    let { userInfo } = ctx.session
    const { userName: myUserName } = userInfo
    let isMe = myUserName == currUserName
    if (!isMe) {
        userInfo = {}
    }
    let res = await getProfileBlogList({
        currUserName,
        pageIndex: 0,
    })
    await ctx.render('profile', {
        blogData: {
            ...res.data
        },
        userData: {
            userInfo,
            isMe,
        }
    })
})
router.get('/square', async (ctx, next) => {
    const { data: blogData } = await getSuqareBlogList({ pageIndex: 0 })
    await ctx.render('square', { blogData })
})
module.exports = router
