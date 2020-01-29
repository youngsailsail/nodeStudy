var express = require("express");
var router = express.Router();
const {
    getDetail,
    getList,
    newBlog,
    updateBlog,
    delBlog
} = require("../controller/blog");
const logincheck = require("../middleware/logincheck");
const { SuccesModel, ErrorModel } = require("../models/resModel");

router.get("/list", async (req, res, next) => {
    const { query, session } = req;
    let { author, keyword, isAdmin } = query;
    if (isAdmin) {
        author = session.username;
        if (!author) {
            res.json(new ErrorModel("请登录"));
            return;
        }
    }
    let data = await getList(author, keyword);
    res.json(new SuccesModel(data));
});
router.get("/detail", async (req, res, next) => {
    const { query } = req;
    let data = await getDetail(query.id);
    res.json(new SuccesModel(data[0]));
});
router.post("/new", logincheck, async (req, res, next) => {
    const { session, body } = req;
    body.author = session.username;
    const data = await newBlog(body);
    res.json(new SuccesModel(data));
});
router.post("/update", logincheck, async (req, res, next) => {
    const { query, session, body } = req;
    const data = await updateBlog(query.id, session.username, body);
    res.json(new SuccesModel(data));
});
router.post("/del", logincheck, async (req, res, next) => {
    const { query, session } = req;
    const data = await delBlog(query.id, session.username);
    res.json(new SuccesModel(data));
});
module.exports = router;
