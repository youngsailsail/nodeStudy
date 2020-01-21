const { loginCheck } = require("../controller/user");
const { SuccesModel, ErrorModel } = require("../models/resModel");
module.exports = (req, res) => {
    const { method, path, body } = req;
    if (method === "POST" && path === "/api/user/login") {
        const data = loginCheck(body);
        if (data) {
            return new SuccesModel();
        } else {
            return new ErrorModel("登录失败");
        }
    }
};
