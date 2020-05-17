const { set, get } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')
const KEY_PREFIX = 'weibo_square:'

/**
 * 
 * @param {Number} pageIndex  pageIndex
 * @param {Number} pageSize  pageSize
 */
async function getBlogListByCach(pageIndex, pageSize) {
    let key = `${KEY_PREFIX}${pageIndex}_${pageSize}`
    let result = await get(key)
    if (result) {
        return result
    }
    result = await getBlogListByUser({ pageIndex, pageSize })
    set(key, result, 60)
    return result
}

module.exports = { getBlogListByCach }