/**
 * @description 获取广场数据
 * @author yff
 */
const { SuccesModel } = require('../model/ResModels')
const { PAGE_SIZE } = require('../conf/constant')
const { getBlogListByCach } = require('../cache/blog')

async function getSuqareBlogList({ pageIndex }) {
    const { blogList, count } = await getBlogListByCach(pageIndex, PAGE_SIZE)
    return new SuccesModel({
        isEmpty: blogList.length == 0,
        count,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
    })
}

module.exports = { getSuqareBlogList }
