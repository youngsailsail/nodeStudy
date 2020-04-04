const router = require('koa-router')()
const {create}=require('../../controller/blog')
router.prefix('/api/blog')
router.post('/create',async(ctx,next)=>{
    const{image,content}=ctx.request.body
    const {id:userId}=ctx.session
    ctx.body=await create({userId,image,conetnt})
})