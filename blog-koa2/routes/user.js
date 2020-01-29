const router = require("koa-router")();
const { login } = require("../controller/user");
const { SuccesModel, ErrorModel } = require("../models/resModel");
router.prefix("/api/user");
router.post("/login", async (ctx, next) => {
    try {
        const data = await login(ctx.request.body);
        if (data) {
            ctx.session.username = data.username;
            ctx.session.realname = data.realname;
            ctx.body = new SuccesModel(data);
        } else {
            ctx.body = new ErrorModel("登录失败");
        }
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = router;
