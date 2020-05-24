const User = require('../db/models/User');
const { formatUser } = require('./_format');
const { addFollower } = require('./user-relation');
const getUserInfo = async (userName, Password) => {
  const whereOpt = {
    userName,
  };
  if (Password) {
    whereOpt.Password = Password;
  }
  console.log(whereOpt, 'whereOpt');

  const res = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt,
  });
  if (res == null) {
    return res;
  }
  return formatUser(res);
};
const createUser = async ({ userName, password, nickName, gender }) => {
  const res = await User.create({
    userName,
    password,
    nickName,
    gender,
  });
  let data = res.dataValues;
  await addFollower({ userId: data.id, followId: data.id });
  return data;
};
/**
 * 更新用户信息
 * @param {*} param0 {newNickName,newPicture,newCity,newPassword}更新的数据
 * @param {*} param1 {userName,password} 判断条件
 */
const updateUser = async (
  { newNickName, newPicture, newCity, newPassword },
  { userName, password }
) => {
  const updateData = {};
  if (newPassword) {
    updateData.password = newPassword;
  }
  if (newNickName) {
    updateData.nickName = newNickName;
  }
  if (newPicture) {
    updateData.picture = newPicture;
  }
  if (newCity) {
    updateData.city = newCity;
  }
  const whereOpt = {
    userName,
  };
  if (password) {
    whereOpt.password = password;
  }
  const res = await User.update(updateData, {
    where: whereOpt,
  });
  return res[0] > 0;
};
module.exports = {
  getUserInfo,
  createUser,
  updateUser,
};
