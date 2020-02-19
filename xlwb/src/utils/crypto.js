const crypto=require('crypto')
const {CRYPTO_SECRET_KEY}=require('../conf/secretKeys')
const md5=(content)=>{
    const md5= crypto.createHash('md5')
    return md5.update(content).digest('hex')
}
const doCrypto=(content)=> {
    const str=`password=${content}&key=${CRYPTO_SECRET_KEY}`
    return md5(str)
}
module.exports={
    doCrypto
}