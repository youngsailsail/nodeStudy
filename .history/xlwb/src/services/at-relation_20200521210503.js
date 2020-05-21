const { Blog, AtRelation } = require('../db/models/index');
const { formatUser } = require('./_format');
async function createAtRelation({ userId, blogId, isRead = false }) {

}

module.exports = {
    createAtRelation
}