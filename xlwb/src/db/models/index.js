const User = require('./User');
const Blog = require('./Blog');
const UserRelation = require('./UserRelation');

Blog.belongsTo(User, {
  foreignKey: 'userId',
});
UserRelation.belongsTo(User, {
  foreignKey: 'followId',
});
User.hasMany(UserRelation, {
  foreignKey: 'userId',
});
Blog.belongsTo(UserRelation, {
  foreignKey: 'userId',
  targetKey: 'followId',
});
module.exports = {
  User,
  Blog,
  UserRelation,
};
