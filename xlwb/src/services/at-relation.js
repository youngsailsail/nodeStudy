const { AtRelation, Blog, User } = require('../db/models/index');
const { formatBlog, formatUser } = require('./_format');
async function createAtRelation({ userId, blogId, isRead = false }) {
  let data = await AtRelation.create({
    userId,
    blogId,
    isRead,
  });
  return data;
}
async function getAtCount({ userId }) {
  let data = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false,
    },
  });
  let count = data.count;
  return { count };
}
async function getAtUserBlogList({ userId, pageSize = 10, pageIndex }) {
  let result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [['id', 'desc']],
    include: [
      {
        model: AtRelation,
        where: {
          userId,
        },
        attributes: ['blogId', 'userId'],
      },
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
      },
    ],
  });
  let blogList = result.rows.map((row) => row.dataValues);
  blogList = formatBlog(blogList).map((blogItem) => {
    blogItem.user = blogItem.user.dataValues;
    blogItem.user = formatUser(blogItem.user);
    return blogItem;
  });
  return {
    count: result.count,
    blogList,
  };
}
async function updateAtRelation({ blogId, userId, isRead = true }) {
  const res = AtRelation.update(
    {
      isRead,
    },
    {
      where: {
        blogId,
        userId,
      },
    }
  );
  return res[0] > 0;
}
module.exports = {
  createAtRelation,
  getAtCount,
  getAtUserBlogList,
  updateAtRelation,
};
