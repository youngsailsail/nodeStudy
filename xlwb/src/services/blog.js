const {Blog}=require('../db/models/index')
async function createBlog({userId,image,content}) {
    Blog.create({})
}