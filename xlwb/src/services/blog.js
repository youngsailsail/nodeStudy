const { Blog, User, UserRelation } = require('../db/models/index');
const { formatUser, formatBlog } = require('./_format');
/**
 *
 * @description 创建微博
 * @param {Object} param0 //创建微博需要的数据{userId,image,content}
 */
async function createBlog({ userId, image, content }) {
  const res = await Blog.create({ userId, image, content });
  return res.dataValues;
}
async function getBlogListByUser({ userName, pageSize = 0, pageIndex = 0 }) {
  const userWhereOpts = {};
  if (userName) {
    userWhereOpts.userName = userName;
  }
  const res = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [['id', 'desc']],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOpts,
      },
    ],
  });
  let blogList = res.rows.map((row) => row.dataValues);
  blogList = blogList.map((blogItem) => {
    blogItem.user = formatUser(blogItem.user.dataValues);
    return formatBlog(blogItem);
  });

  return {
    blogList,
    count: res.count,
  };
}
async function getBlogListByFollower({ userId, pageSize = 0, pageIndex = 0 }) {
  const res = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [['id', 'desc']],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
      },
      {
        model: UserRelation,
        attributes: ['userId', 'followId'],
        where: {
          userId,
        },
      },
    ],
  });
  let blogList = res.rows.map((row) => row.dataValues);
  blogList = blogList.map((blogItem) => {
    blogItem.user = formatUser(blogItem.user.dataValues);
    return formatBlog(blogItem);
  });

  return {
    blogList,
    count: res.count,
  };
}
module.exports = { createBlog, getBlogListByUser, getBlogListByFollower };
