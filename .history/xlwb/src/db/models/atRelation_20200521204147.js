const sql = require('../sql')
const { STRING, TEXT, INTEGER, BOOLEAN } = require('../types')

const Blog = sql.define('blog', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户id',
    },
    blogId: {
        type: INTEGER,
        allowNull: false,
        comment: '微博id',
    },
    image: {
        type: STRING,
        comment: '图片',
    },
})
module.exports = Blog
