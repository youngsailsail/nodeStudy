const sql = require('../sql')
const { INTEGER, BOOLEAN } = require('../types')

const AtRelation = sql.define('AtRelation', {
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
        defaultValue: false
    },
})
module.exports = AtRelation
