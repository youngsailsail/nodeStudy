const router = require("koa-router")();

router.prefix("/api/blog");
const {
    getDetail,
    getList,
    newBlog,
    updateBlog,
    delBlog
} = require("../controller/blog");
const logincheck = require("../middleware/logincheck");
const { SuccesModel, ErrorModel } = require("../models/resModel");
router.get("/list", async (ctx, next) => {
    const { query, session } = ctx;
    let { author, keyword, isAdmin } = query;
    if (isAdmin) {
        author = session.username;
        if (!author) {
            ctx.body = new ErrorModel("请登录");
            return;
        }
    }
    let data = await getList(author, keyword);
    ctx.body = new SuccesModel(data);
});
router.get("/detail", async (ctx, next) => {
    const { query } = ctx;
    let data = await getDetail(query.id);
    ctx.body = new SuccesModel(data[0]);
});
router.post("/new", logincheck, async (ctx, next) => {
    const {
        session,
        request: { body }
    } = ctx;
    body.author = session.username;
    const data = await newBlog(body);
    ctx.body = new SuccesModel(data);
});
router.post("/update", logincheck, async (ctx, next) => {
    const {
        query,
        session,
        request: { body }
    } = ctx;
    const data = await updateBlog(query.id, session.username, body);
    console.log(data, "data");
    ctx.body = new SuccesModel(data);
});
router.post("/del", logincheck, async (ctx, next) => {
    const { query, session } = ctx;
    const data = await delBlog(query.id, session.username);
    ctx.body = new SuccesModel(data);
});

module.exports = router;
