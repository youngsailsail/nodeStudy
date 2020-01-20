const { getDetail, getList } = require('../controller/blog')
const { SuccesRes, ErrorRes } = require('../models/resModel')

module.exports = (req, res) => {
    const { method, path, query } = req
    if (method === 'GET' && path === '/api/blog/list') {
        const { author, keyword } = query
        let data = getList(author, keyword)//负责处理数据
        return new SuccesRes(data)//负责返回标准格式
    }
    if (method === 'GET' && path === '/api/blog/detail') {
        const { id } = query
        let data = getDetail(id)
        return new SuccesRes(data)
    }
    if (method === 'POST' && path === '/api/blog/new') {
        return {
            msg: 'new-blog'
        }
    }
    if (method === 'POST' && path === '/api/blog/update') {
        return {
            msg: 'update-blog'
        }
    }
    if (method === 'POST' && path === '/api/blog/del') {
        return {
            msg: 'del-blog'
        }
    }
}