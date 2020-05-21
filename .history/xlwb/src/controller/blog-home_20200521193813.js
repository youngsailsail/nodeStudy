const xss = require('xss');

const { createBlog, getBlogListByFollower } = require('../services/blog');
const { SuccesModel, ErrorModel } = require('../model/ResModels');
const { createBlogFailInfo } = require('../model/ErrorInfo');
const { PAGE_SIZE } = require('../conf/constant');

async function create({ userId, image, content }) {
  try {
    const res = await createBlog({ userId, image, content: xss(content) });
    return new SuccesModel(res);
  } catch (error) {
    console.error(error);
    return new ErrorModel(createBlogFailInfo);
  }
}

async function getFollowerBlogList({ userId, pageIndex }) {
  const {
    count: followerBlogListCount,
    blogList: followerBlogList,
  } = await getBlogListByFollower({
    userId,
    pageSize: PAGE_SIZE,
    pageIndex,
  });
  return new SuccesModel({
    followerBlogListCount,
    followerBlogList,
    pageSize: PAGE_SIZE,
    pageIndex,
  });
}

module.exports = {
  create,
  getFollowerBlogList,
};
