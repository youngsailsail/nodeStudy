const { ErrorModel } = require("../models/resModel");
module.exports = async (ctx, next) => {
    if (ctx.session.username) {
        console.log("check");
        await next();
        return;
    }
    ctx.body = new ErrorModel("请登录");
};
