const sql = require('../sql')
const { INTEGER } = require('../types')
const UserRelation = sql.define('userRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户id',
    },
    followId: {
        type: INTEGER,
        allowNull: false,
        comment: '被关注人id',
    }
})
module.exports = UserRelation