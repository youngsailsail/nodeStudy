const router = require("koa-router")();

router.prefix("/api/user");
const { login } = require("../controller/user");

const { SuccesModel, ErrorModel } = require("../models/resModel");
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
        console.log(error);
    }
});

module.exports = router;
