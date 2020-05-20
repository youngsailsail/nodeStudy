const { getUserByFollowId, addFollower, deleteFollower } = require('../services/user-relation')
const { SuccesModel, ErrorModel } = require('../model/ResModels')
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo')

async function getFansList({ userId }) {
    let { count, userList } = await getUserByFollowId({ followId: userId })
    return new SuccesModel({
        fansCount: count,
        fansList: userList
    })
}

async function followUser({ followId, myId }) {
    try {
        await addFollower({ followId, userId: myId })
        return new SuccesModel()
    } catch (error) {
        return new ErrorModel(addFollowerFailInfo)
    }
}
async function unFollow({ followId, myId }) {
    try {
        await deleteFollower({ followId, userId: myId })
        return new SuccesModel()
    } catch (error) {
        return new ErrorModel(deleteFollowerFailInfo)
    }
}
module.exports = {
    getFansList, followUser, unFollow
}