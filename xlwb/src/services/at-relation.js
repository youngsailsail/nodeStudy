const { AtRelation } = require('../db/models/index');
async function createAtRelation({ userId, blogId, isRead = false }) {
    let data = await AtRelation.create({
        userId,
        blogId,
        isRead
    })
    return data
}

module.exports = {
    createAtRelation
}