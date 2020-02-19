const {jsonSchemaFileInfo}=require('../model/ErrorInfo')
const {ErrorModel}=require('../model/ResModels')

const genValidator=(validateFn)=>{
    async function validator(ctx,next) {
        const data = ctx.request.body
        const error = validateFn(data)
        if(error){
            ctx.body=new ErrorModel(jsonSchemaFileInfo)
            console.error(error)
        }else{
            await next()
        }
        
    }
    return validator
}
module.exports={
    genValidator
}