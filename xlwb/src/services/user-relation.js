const { UserRelation, User } = require('../db/models/index')
const { formatUser } = require('./_format')

async function getUserByFollowId({ followId }) {
    let res = await User.findAndCountAll({
        attributes: ['id', 'userName', 'nickName', 'picture'],
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: UserRelation,
                where: {
                    followId
                }
            }
        ],
    })
    let count = res.count
    let userList = res.rows.map(row => row.dataValues)
    userList = formatUser(userList)
    return { count, userList }
}
async function addFollower({ followId, userId }) {
    let res = await UserRelation.create({ userId, followId })
    return res.dataValues

}
async function deleteFollower({ followId, userId }) {
    //删除某条数据
    const result = await UserRelation.destroy({
        where: {
            userId,
            followId
        }
    })
    return result > 0
}
module.exports = { getUserByFollowId, addFollower, deleteFollower }