const router = require('koa-router')();
const { loginApiCheck } = require('../../middlewares/loginCheck');
const { create, getFollowerBlogList } = require('../../controller/blog-home');
const { genValidator } = require('../../middlewares/validator');
const { blogValidate } = require('../../validator/blog');
const { getBlogListStr } = require('../../utils/blog');
router.prefix('/api/blog');
router.post(
  '/create',
  loginApiCheck,
  genValidator(blogValidate),
  async (ctx, next) => {
    const { image, content } = ctx.request.body;
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
