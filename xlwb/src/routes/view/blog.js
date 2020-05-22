const router = require('koa-router')();
const { loginViewCheck } = require('../../middlewares/loginCheck');
const { getProfileBlogList } = require('../../controller/blog-profile');
const { getFollowerBlogList } = require('../../controller/blog-home');
const { getSuqareBlogList } = require('../../controller/blog-square');
const { getFansList, getFollower } = require('../../controller/user-relation');
const { isExist } = require('../../controller/user');
const {
  getAtMeCount,
  getAtMeBlogList,
  markIsRead,
} = require('../../controller/at-relations');

router.get('/', loginViewCheck, async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo;
  let { data } = await getFollowerBlogList({ userId, pageIndex: 0 });
  const { followerBlogListCount, followerBlogList, pageSize, pageIndex } = data;
  // 获取粉丝列表
  const fansData = await getFansList({ userId });
  const { fansCount, fansList } = fansData.data;
  // 获取关注人列表
  const followersData = await getFollower({ userId });
  const { count: followerCount, userList: followerList } = followersData.data;
  //获取at人数
  const {
    data: { count: atCount },
  } = await getAtMeCount({ userId });
  const userData = {
    userInfo: ctx.session.userInfo,
    atCount,
    fansData: {
      count: fansCount,
      list: fansList,
    },
    followersData: {
      count: followerCount,
      list: followerList,
    },
  };
  const blogData = {
    isEmpty: followerBlogListCount == 0,
    blogList: followerBlogList,
    count: followerBlogListCount,
    pageSize,
    pageIndex,
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
  //获取at人数
  const {
    data: { count: atCount },
  } = await getAtMeCount({ userId: myId });
  await ctx.render('profile', {
    blogData: {
      ...res.data,
    },
    userData: {
      userInfo: curUserInfo,
      amIFollowed,
      isMe,
      fansData: { count: fansCount, list: fansList },
      atCount,
      followersData: { count: followerCount, list: followerList },
    },
  });
});
router.get('/square', async (ctx, next) => {
  const { data: blogData } = await getSuqareBlogList({ pageIndex: 0 });
  await ctx.render('square', { blogData });
});
router.get('/at-me', async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo;
  //获取@我的第一页微博列表
  const {
    data: { count, blogList, isEmpty, pageSize, pageIndex },
  } = await getAtMeBlogList({ userId });
  //获取at人数
  const {
    data: { count: atCount },
  } = await getAtMeCount({ userId });
  const blogData = {
    isEmpty,
    blogList,
    count,
    pageSize,
    pageIndex,
  };
  await ctx.render('atMe', { blogData, atCount });
  //标记已读
  markIsRead({ blogList, userId });
});

module.exports = router;
