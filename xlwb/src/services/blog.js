const { Blog, User } = require('../db/models/index')
const { formatUser } = require('./_format')
/**
 * 
 * @description 创建微博
 * @param {Object} param0 //创建微博需要的数据{userId,image,content}
 */
async function createBlog({ userId, image, content }) {
    let res = await Blog.create({ userId, image, content })
    return res.dataValues
}
async function getBlogListByUser({ userName, pageSize = 0, pageIndex = 0 }) {
    let userWhereOpts = {}
    if (userName) {
        userWhereOpts.userName = userName
    }
    let res = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageIndex * pageSize,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture'],
                where: userWhereOpts
            }
        ],
    })
    let blogList = res.rows.map(row => row.dataValues)
    blogList = blogList.map(blogItem => {
        blogItem.user = formatUser(blogItem.user.dataValues)
        return blogItem
    })
    return {
        blogList,
        count: res.count
    }
}
module.exports = { createBlog, getBlogListByUser }