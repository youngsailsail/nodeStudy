const { UserRelation, User } = require('../db/models/index');
const { formatUser } = require('./_format');
const Sequelize = require('sequelize');
async function getUserByFollowId({ followId }) {
  const res = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [['id', 'desc']],
    include: [
      {
        model: UserRelation,
        where: {
          followId,
          userId: {
            [Sequelize.Op.ne]: followId,
          },
        },
      },
    ],
  });
  const { count } = res;
  let userList = res.rows.map((row) => row.dataValues);
  userList = formatUser(userList);
  return { count, userList };
}
/**
 * 查找关注人列表
 * @param {Number} userId  用户id
 */
async function getFollowerByUserId({ userId }) {
  const res = await UserRelation.findAndCountAll({
    order: [['id', 'desc']],
    include: [
      {
        model: User,
        attributes: ['id', 'userName', 'nickName', 'picture'],
      },
    ],
    where: {
      userId,
      followId: {
        [Sequelize.Op.ne]: userId,
      },
    },
  });
  // 关注人列表
  let userList = res.rows.map((row) => row.dataValues);
  userList = userList.map((item) => {
    let user = item.user.dataValues;
    user = formatUser(user);
    return user;
  });
  return {
    userList,
    count: res.count,
  };
}
async function addFollower({ followId, userId }) {
  const res = await UserRelation.create({ userId, followId });
  return res.dataValues;
}
async function deleteFollower({ followId, userId }) {
  // 删除某条数据
  const result = await UserRelation.destroy({
    where: {
      userId,
      followId,
    },
  });
  return result > 0;
}
//
module.exports = {
  getUserByFollowId,
  addFollower,
  deleteFollower,
  getFollowerByUserId,
};
