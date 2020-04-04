const {createBlog}=require('../services/blog')
const {SuccesModel,ErrorModel}=require('../model/ResModels')
const {createBlogFailInfo}=require('../model/ErrorInfo')
async function create({userId,image,content}) {
    const res= await createBlog({userId,image,content})
    if(res){
        return new SuccesModel(res)
    }
    return new ErrorModel(createBlogFailInfo)

}


module.exports={
    create
}