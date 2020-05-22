const { getAtCount, getAtUserBlogList } = require('../services/at-relation');
const { updateAtRelation } = require('../services/at-relation');
const { SuccesModel } = require('../model/ResModels');
const { PAGE_SIZE } = require('../conf/constant');

async function getAtMeCount({ userId }) {
  let { count } = await getAtCount({ userId });
  return new SuccesModel({ count });
}
async function getAtMeBlogList({ userId, pageIndex = 0 }) {
  const { count, blogList } = await getAtUserBlogList({
    userId,
    pageIndex,
    pageSize: PAGE_SIZE,
  });
  return new SuccesModel({
    count,
    blogList,
    pageIndex,
    pageSize: PAGE_SIZE,
    isEmpty: count === 0,
  });
}
async function markIsRead({ blogList, userId }) {
  const res = await Promise.all(
    blogList.map((blog) =>
      updateAtRelation({ userId, blogId: blog.id, isRead: true })
    )
  );
  return new SuccesModel();
}
module.exports = { getAtMeCount, getAtMeBlogList, markIsRead };
