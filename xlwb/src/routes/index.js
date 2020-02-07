const router = require("koa-router")();

router.get("/", async (ctx, next) => {
    await ctx.render("index", {
        title: "Hello Koa 2!",
        message: "我是message",
        arra: [1, 2, 3, 4, 5],
        isMe: false
    });
});

router.get("/string", async (ctx, next) => {
    ctx.body = "koa2 string";
});

router.get("/json", async (ctx, next) => {
    ctx.body = {
        title: "koa2 json"
    };
});

module.exports = router;
