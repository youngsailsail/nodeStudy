const {
  getUserByFollowId,
  addFollower,
  deleteFollower,
  getFollowerByUserId,
} = require('../services/user-relation');
const { SuccesModel, ErrorModel } = require('../model/ResModels');
const {
  addFollowerFailInfo,
  deleteFollowerFailInfo,
} = require('../model/ErrorInfo');

async function getFansList({ userId }) {
  const { count, userList } = await getUserByFollowId({ followId: userId });
  return new SuccesModel({
    fansCount: count,
    fansList: userList,
  });
}

async function followUser({ followId, myId }) {
  try {
    await addFollower({ followId, userId: myId });
    return new SuccesModel();
  } catch (error) {
    return new ErrorModel(addFollowerFailInfo);
  }
}
async function unFollow({ followId, myId }) {
  const res = deleteFollower({ followId, userId: myId });
  if (res) {
    return new SuccesModel();
  }
  return new ErrorModel(deleteFollowerFailInfo);
}
async function getFollower({ userId }) {
  let res = await getFollowerByUserId({ userId });
  return new SuccesModel(res);
}
module.exports = {
  getFansList,
  followUser,
  unFollow,
  getFollower,
};
