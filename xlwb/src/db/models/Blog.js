const sql=require('../sql')
const {STRING,TEXT,INTEGER}=require('../types')
const Blog=sql.define('blog',{
    userId:{
        type:INTEGER,
        allowNull:false,
        comment:'用户id',
    },
    content:{
        type:TEXT,
        allowNull:false,
        comment:'微博内容',
    },
    img:{
        type:STRING,
        comment:'图片',
    }
})
module.exports=Blog