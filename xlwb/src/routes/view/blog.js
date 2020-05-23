const router = require('koa-router')();
const { loginViewCheck } = require('../../middlewares/loginCheck');
const { getProfileBlogList } = require('../../controller/blog-profile');
const { getFollowerBlogList } = require('../../controller/blog-home');
const { getSuqareBlogList } = require('../../controller/blog-square');
const { getFansList, getFollower } = require('../../controller/user-relation');
const { isExist } = require('../../controller/user');

router.get('/', loginViewCheck, async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo;
  let { data } = await getFollowerBlogList({ userId, pageIndex: 0 });
  const { followerBlogListCount, followerBlogList, pageSize, pageIndex } = data;
  const blogData = {
    isEmpty: followerBlogListCount == 0,
    blogList: followerBlogList,
    count: followerBlogListCount,
    pageSize,
    pageIndex,
  };
  // 获取粉丝列表
  const fansData = await getFansList({ userId });
  const { fansCount, fansList } = fansData.data;
  // 获取关注人列表
  const followersData = await getFollower({ userId });
  const { count: followerCount, userList: followerList } = followersData.data;
  const userData = {
    userInfo: ctx.session.userInfo,
    atCount: 0,
    fansData: {
      count: fansCount,
      list: fansList,
    },
    followersData: {
      count: followerCount,
      list: followerList,
    },
  };
  await ctx.render('index', { blogData, userData });
});
router.get('/profile', loginViewCheck, async (ctx, next) => {
  const { userName } = ctx.session.userInfo;
  await ctx.redirect(`/profile/${userName}`);
});
router.get('/profile/:userName', loginViewCheck, async (ctx, next) => {
  const { userName: currUserName } = ctx.params;
  const { userInfo } = ctx.session;
  const { userName: myUserName, id: myId } = userInfo;
  const isMe = myUserName == currUserName;
  let curUserInfo = userInfo;
  if (!isMe) {
    const res = await isExist(currUserName);
    if (res.errno !== 0) {
      return;
    }
    curUserInfo = res.data;
  }
  const res = await getProfileBlogList({
    userName: currUserName,
    pageIndex: 0,
  });
  // 获取粉丝列表
  const fansData = await getFansList({ userId: curUserInfo.id });
  const { fansCount, fansList } = fansData.data;
  // 是否关注
  const amIFollowed = fansList.some((item) => item.id == myId);
  // 获取关注人列表
  const followersData = await getFollower({ userId: curUserInfo.id });
  const { count: followerCount, userList: followerList } = followersData.data;
  await ctx.render('profile', {
    blogData: {
      ...res.data,
    },
    userData: {
      userInfo: curUserInfo,
      amIFollowed,
      isMe,
      fansData: { count: fansCount, list: fansList },
      followersData: { count: followerCount, list: followerList },
    },
  });
});
router.get('/square', async (ctx, next) => {
  const { data: blogData } = await getSuqareBlogList({ pageIndex: 0 });
  await ctx.render('square', { blogData });
});
module.exports = router;
