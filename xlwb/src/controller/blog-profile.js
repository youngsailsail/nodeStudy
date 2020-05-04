/**
 * @description 获取微博数据
 * @author yff
 */
const { getBlogListByUser } = require('../services/blog')
const { SuccesModel } = require('../model/ResModels')
const { PAGE_SIZE } = require('../conf/constant')

/**
 *  获取个人主页微博列表
 * @param {string} userName 用户名
 * @param {number} pageIndex 当前的页码
 */
async function getProfileBlogList({ userName, pageIndex }) {
    let result = await getBlogListByUser({ userName, pageSize: PAGE_SIZE, pageIndex })
    const { count, blogList } = result
    return new SuccesModel({
        isEmpty: blogList.length == 0,
        count,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex
    })
}


module.exports = {
    getProfileBlogList
}