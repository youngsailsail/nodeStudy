/**
 * @description 加载更多at-me的微博
 * @author yff
 */
const router = require('koa-router')();
const {
  getAtMeBlogList,
  markIsRead,
} = require('../../controller/at-relations');
const { getBlogListStr } = require('../../utils/blog');

router.prefix('/api/atMe');
router.get('/loadMore/:pageIndex', async (ctx) => {
  const { pageIndex } = ctx.params;
  const { id: userId } = ctx.session.userInfo;
  const res = await getAtMeBlogList({
    pageIndex: parseInt(pageIndex),
    userId,
  });
  const { blogList } = res.data;
  res.data.blogListTpl = getBlogListStr(blogList);
  ctx.body = res;
  //标记已读
  markIsRead({ blogList, userId });
});

module.exports = router;
