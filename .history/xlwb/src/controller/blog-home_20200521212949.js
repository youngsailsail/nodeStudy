const xss = require('xss');

const { createBlog, getBlogListByFollower } = require('../services/blog');
const { createAtRelation } = require('../services/at-relation')
const { SuccesModel, ErrorModel } = require('../model/ResModels');
const { createBlogFailInfo } = require('../model/ErrorInfo');
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../conf/constant');
const { isExist } = require('./user');

async function create({ userId, image, content }) {
  try {
    //收集用户名
    let userNameList = []
    content.replace(REG_FOR_AT_WHO, (matchStr, nickName, userName) => {
      userNameList.push(userName)
      return matchStr
    })
    const atUserNameList = []
    content = content.replace(
      REG_FOR_AT_WHO,
      (matchStr, nickName, userName) => {
        // 目的不是 replace 而是获取 userName
        atUserNameList.push(userName)
        return matchStr // 替换不生效，预期
      }
    )
    //获取用户id列表
    let usersList = await Promise.all(userNameList.map(userName => isExist(userName)))
    let userIdList = usersList.map(user => user.id)
    const res = await createBlog({ userId, image, content: xss(content) });
    //写入at表
    let data = await Promise.all(userIdList.map(userId => createAtRelation({ userId, blogId: res.id })))
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
