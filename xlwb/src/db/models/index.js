const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')
Blog.belongsTo(User, {
    foreignKey: 'userId'
})
UserRelation.belongsTo(User, {
    foreignKey: 'userId'
})
User.hasMany(UserRelation, {
    foreignKey: 'followId'
})
module.exports = {
    User, Blog, UserRelation
}