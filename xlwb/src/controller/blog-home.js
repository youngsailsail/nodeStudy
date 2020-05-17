const xss = require('xss')

const { createBlog } = require('../services/blog')
const { SuccesModel, ErrorModel } = require('../model/ResModels')
const { createBlogFailInfo } = require('../model/ErrorInfo')

async function create({ userId, image, content }) {
    try {
        const res = await createBlog({ userId, image, content: xss(content) })
        return new SuccesModel(res)
    } catch (error) {
        console.error(error)
        return new ErrorModel(createBlogFailInfo)
    }

}


module.exports = {
    create
}