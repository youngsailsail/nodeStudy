const router = require('koa-router')();
const {
  isExist,
  register,
  login,
  changeInfo,
  changePassword,
  logout,
} = require('../../controller/user');
const { genValidator } = require('../../middlewares/validator');
const { loginApiCheck } = require('../../middlewares/loginCheck');
const { getFollower } = require('../../controller/user-relation');
const { userValidate } = require('../../validator/user');

router.prefix('/api/user');

router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body;
  ctx.body = await isExist(userName);
});
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body;
  ctx.body = await register({ userName, password, gender });
});
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  const res = await login({ ctx, userName, password });
  ctx.body = res;
});
router.patch(
  '/changeInfo',
  loginApiCheck,
  genValidator(userValidate),
  async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body;
    ctx.body = await changeInfo({
      ctx,
      nickName,
      city,
      picture,
    });
  }
);
router.patch(
  '/changePassword',
  loginApiCheck,
  genValidator(userValidate),
  async (ctx, next) => {
    const { newPassword, password } = ctx.request.body;
    const { userName } = ctx.session.userInfo;
    ctx.body = await changePassword({ userName, newPassword, password });
  }
);
router.post('/logout', loginApiCheck, async (ctx, next) => {
  ctx.body = await logout(ctx);
});
router.get('/getAtList', loginApiCheck, async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo;
  let { data } = await getFollower({ userId });
  const { userList } = data;
  let list = userList.map((user) => {
    return `${user.nickName}--${user.userName}`;
  });
  ctx.body = list;
});
module.exports = router;
