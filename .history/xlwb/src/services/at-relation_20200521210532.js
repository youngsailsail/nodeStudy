const { Blog, AtRelation } = require('../db/models/index');
const { formatUser } = require('./_format');
async function createAtRelation({ userId, blogId, isRead = false }) {
    await AtRelation.create
}

module.exports = {
    createAtRelation
}