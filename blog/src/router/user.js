const { login } = require("../controller/user");
const { SuccesModel, ErrorModel } = require("../models/resModel");
const { set } = require("../db/redis");
module.exports = async (req, res) => {
    const { method, path, body, cookie, query } = req;
    if (method === "POST" && path === "/api/user/login") {
        const data = await login(body);
        if (data) {
            req.session.username = data.username;
            req.session.realname = data.realname;
            set(req.sessionId, req.session);
            return new SuccesModel();
        } else {
            return new ErrorModel("登录失败");
        }
    }
    if (method === "GET" && path === "/api/user/login-test") {
        if (req.session.username) {
            return Promise.resolve(
                new SuccesModel({
                    session: req.session
                })
            );
        }
        return Promise.resolve(new ErrorModel("请先登录"));
    }
};
