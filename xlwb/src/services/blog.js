const {Blog}=require('../db/models/index')

/**
 * 
 * @description 创建微博
 * @param {Object} param0 //创建微博需要的数据{userId,image,content}
 */
async function createBlog({userId,image,content}) {
    let res= await Blog.create({userId,image,content})
    return res.dataValues
}
module.exports={createBlog}