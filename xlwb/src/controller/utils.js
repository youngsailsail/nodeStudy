const path=require('path')
const fse=require('fs-extra')
const {SuccesModel,ErrorModel}=require('../model/ResModels')
const {uploadFileSizeFailInfo}=require('../model/ErrorInfo')

const MIX_SIZE=1024*1024*1024
const DIST_FLODR_PATH=path.join(__dirname,'..','..','uploadFiles')

fse.exists(DIST_FLODR_PATH).then((ex)=>{
    if(!ex){
        fse.ensureDir(DIST_FLODR_PATH) 
    }
})

async function saveFile({filePath,name,size,type}) {
    if(size>MIX_SIZE){
        fse.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }
    const fileName=Date.now()+name
    const distFilePath=path.join(DIST_FLODR_PATH,fileName)
    await fse.move(filePath,distFilePath)
    return new SuccesModel({
        errno:0,
        url:'/'+fileName
    })
}


module.exports={
    saveFile
}