var express = require("express");
var router = express.Router();
const { login } = require("../controller/user");

const { SuccesModel, ErrorModel } = require("../models/resModel");
// const { set } = require("../db/redis");
router.post("/login", async (req, res, next) => {
    const data = await login(req.body);
    if (data) {
        req.session.username = data.username;
        req.session.realname = data.realname;
        res.json(new SuccesModel(data));
    } else {
        res.json(new ErrorModel("登录失败"));
    }
});
// router.get("/session-test", (req, res, next) => {
//     const { session } = req;
//     if (!session.viewNum) {
//         session.viewNum = 0;
//     }
//     session.viewNum++;
//     res.json({
//         session
//     });
// });
module.exports = router;
