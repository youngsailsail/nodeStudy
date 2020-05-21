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
    isRead: {
        type: BOOLEAN,
        comment: '是否已读',
        allowNull: false,
        defaultVal: false
    },
})
module.exports = Blog
