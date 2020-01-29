const { ErrorModel } = require("../models/resModel");
module.exports = (req, res, next) => {
    if (req.session.username) {
        console.log("check");
        next();
        return;
    }
    res.json(new ErrorModel("请登录"));
};
