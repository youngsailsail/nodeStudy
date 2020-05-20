const router = require('koa-router')()
const { loginViewCheck } = require('../../middlewares/loginCheck')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSuqareBlogList } = require('../../controller/blog-square')
const { getFansList } = require('../../controller/user-relation')
const { isExist } = require('../../controller/user')

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
    const { userName: myUserName, id: myId } = userInfo
    let isMe = myUserName == currUserName
    let curUserInfo = userInfo
    if (!isMe) {
        let res = await isExist(currUserName)
        if (res.errno !== 0) {
            return
        }
        curUserInfo = res.data
    }
    let res = await getProfileBlogList({
        userName: currUserName,
        pageIndex: 0,
    })
    //获取粉丝列表
    let fansData = await getFansList({ userId: curUserInfo.id })
    let { fansCount, fansList } = fansData.data
    //是否关注
    let amIFollowed = fansList.some(item => item.id == myId)
    //获取关注人列表
    await ctx.render('profile', {
        blogData: {
            ...res.data
        },
        userData: {
            userInfo: curUserInfo,
            amIFollowed,
            isMe,
            fansData: { count: fansCount, list: fansList },
            followersData: { count: fansCount, list: fansList }
        }
    })
})
router.get('/square', async (ctx, next) => {
    const { data: blogData } = await getSuqareBlogList({ pageIndex: 0 })
    await ctx.render('square', { blogData })
})
module.exports = router
