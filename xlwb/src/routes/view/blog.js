const router = require('koa-router')()
const { loginViewCheck } = require('../../middlewares/loginCheck')
const { getProfileBlogList } = require('../../controller/blog-profile')

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
    console.log(userInfo, 'userInfo22')
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

module.exports = router
