const router = require('koa-router')();
const { loginApiCheck } = require('../../middlewares/loginCheck');
const { create, getFollowerBlogList } = require('../../controller/blog-home');
const { isExist } = require('../../controller/user');
const { genValidator } = require('../../middlewares/validator');
const { blogValidate } = require('../../validator/blog');
const { getBlogListStr } = require('../../utils/blog');
const { REG_FOR_AT_WHO } = require('../../conf/constant');
router.prefix('/api/blog');
router.post(
  '/create',
  loginApiCheck,
  genValidator(blogValidate),
  async (ctx, next) => {
    const { image, content } = ctx.request.body;
    //收集用户名
    let userNameList = []
    content.replact(REG_FOR_AT_WHO, (matchStr, userName) => {
      userNameList.push(userName)
      return matchStr
    })
    //获取用户信息
    let usersList = await Promise.all(userNameList.map(userName => isExist(userName)))
    let userIdList = userIdList.map(item => item.id)

    const { id: userId } = ctx.session.userInfo;
    const res = await create({ userId, image, content });
    ctx.body = res;
  }
);
router.get('/loadMore/:pageIndex', loginApiCheck, async (ctx) => {
  const { pageIndex } = ctx.params;
  const { id: userId } = ctx.session.userInfo;
  const res = await getFollowerBlogList({
    userId,
    pageIndex: parseInt(pageIndex),
  });
  res.data.blogListTpl = getBlogListStr(res.data.followerBlogList);
  ctx.body = res;
});
module.exports = router;
