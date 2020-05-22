const { DEFAULT_PICTURE, REG_FOR_AT_WHO } = require('../conf/constant');
const { timeFormat } = require('../utils/dt');

const _formatPicture = (user) => {
  if (!user.picture) {
    user.picture = DEFAULT_PICTURE;
  }
  return user;
};

const formatUser = (list) => {
  if (!list) return list;
  if (list instanceof Array) {
    return list.map(_formatPicture);
  }
  return _formatPicture(list);
};

//格式化微博内容

/**
 * 格式化数据的时间
 * @param {Object} obj 数据
 */
function _formatDBTime(obj) {
  obj.createdAtFormat = timeFormat(obj.createdAt);
  obj.updatedAtFormat = timeFormat(obj.updatedAt);
  return obj;
}

/**
 * 格式化微博内容
 * @param {Object} obj 微博数据对象
 */
function _formatContent(obj) {
  obj.contentFormat = obj.content;

  // 格式化 @
  // from '哈喽 @张三 - zhangsan 你好'
  // to '哈喽 <a href="/profile/zhangsan">张三</a> 你好'
  obj.contentFormat = obj.contentFormat.replace(
    REG_FOR_AT_WHO,
    (matchStr, nickName, userName) => {
      return `<a href="/profile/${userName}">@${nickName}</a>`;
    }
  );

  return obj;
}

/**
 * 格式化微博信息
 * @param {Array|Object} list 微博列表或者单个微博对象
 */
function formatBlog(list) {
  if (list == null) {
    return list;
  }

  if (list instanceof Array) {
    // 数组
    return list.map(_formatDBTime).map(_formatContent);
  }
  // 对象
  let result = list;
  result = _formatDBTime(result);
  result = _formatContent(result);
  return result;
}
module.exports = {
  formatUser,
  formatBlog,
};
