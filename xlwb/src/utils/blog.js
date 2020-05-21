/**
 * @description 微博数据相关的工具方法
 * @author yff
 */

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

const BLOG_LIST_TPL = fs.readFileSync(path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')).toString()

/**
 *
 * @param {Array} blogList  微博数组
 * @param {Boolean} canReply 是否能够回复
 */
function getBlogListStr(blogList = [], canReply = false) {
    return ejs.render(BLOG_LIST_TPL, {
        blogList, canReply,
    })
}

module.exports = { getBlogListStr }
