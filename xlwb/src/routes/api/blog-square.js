/**
 * @description 获取广场数据
 * @author yff
 */
const router = require('koa-router')()
const { getSuqareBlogList } = require('../../controller/blog-square')
const { getBlogListStr } = require('../../utils/blog')
router.prefix('/api/square')
router.get('/loadMore/:pageIndex', async (ctx) => {
    const { pageIndex } = ctx.params
    let res = await getSuqareBlogList({
        pageIndex: parseInt(pageIndex)
    })
    res.data.blogListTpl = getBlogListStr(res.data.blogList)
    ctx.body = res
})

module.exports = router