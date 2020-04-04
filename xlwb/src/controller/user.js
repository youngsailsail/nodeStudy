const {getUserInfo,createUser,updateUser}=require('../services/user')
const {SuccesModel,ErrorModel}=require('../model/ResModels')
const {registerUserNameNotExistInfo,registerUserNameExistInfo,registerFailInfo,loginFailInfo,changeInfoFailInfo,changePasswordFailInfo}=require('../model/ErrorInfo')
const {doCrypto}=require('../utils/crypto')

async function isExist(userName) {
    let res = await getUserInfo(userName)
    if(res){
        return new SuccesModel(res)
    }else{
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}
async function register({userName,password,nickName,gender}) {
    let res = await getUserInfo(userName)
    if(res){
        return  new ErrorModel(registerUserNameExistInfo)
    }
    try {
        await createUser({userName,password:doCrypto(password),nickName: nickName||userName,gender})
        return new SuccesModel()
    } catch (ex) {
        console.error(ex.message,ex.stack)
        return new ErrorModel(registerFailInfo)
    }
    

}
async function login({ctx,userName,password}) {
    let userInfo = await getUserInfo(userName,doCrypto(password))
    if(!userInfo){
        return new ErrorModel(loginFailInfo)
    }
    if(ctx.session.userInfo==null){
        ctx.session.userInfo=userInfo
    }
    return new SuccesModel()
}
async function changeInfo({ctx,nickName,picture,city}) {
    const {userName}=ctx.session.userInfo
    const res=await updateUser({
        newNickName:nickName,
        newPicture:picture,
        newCity:city
    },{
        userName
    }
    )
    if(res){
        const{userInfo}=ctx.session
        ctx.session.userInfo={... userInfo,nickName,picture,city}
        return new SuccesModel()
    }
    return new ErrorModel(changeInfoFailInfo)

}
async function changePassword({userName,newPassword,password}) {
    const res=await updateUser({
        newPassword:doCrypto(newPassword)
    },{
        userName,
        password:doCrypto(password)
    }
    )
    if(res){
        return new SuccesModel()
    }
    return new ErrorModel(changePasswordFailInfo)

}
async function logout(ctx) {
    await delete ctx.session.userInfo
    return new SuccesModel()
}
module.exports={
    isExist,register,login,changeInfo,changePassword,logout
}