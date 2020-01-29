const express = require("./express");
const app = express();

app.use((req, res, next) => {
    console.log("请求开始");
    next();
});
app.use((req, res, next) => {
    console.log("设置cookie");
    req.cookie = {
        key1: 1,
        key2: 2
    };
    next();
});
app.use((req, res, next) => {
    console.log("设置body");
    req.body = {
        body1: 1,
        body2: 2
    };
    next();
});

app.use("/api", (req, res, next) => {
    console.log("请求use-api");
    next();
});
app.get("/api", (req, res, next) => {
    console.log("请求get-api");
    next();
});
app.post("/api", (req, res, next) => {
    console.log("post-api");
    next();
});
const loginCheck = (req, res, next) => {
    console.log("模拟登陆成功");
    next();
    // console.log("模拟登陆失败");
    // res.json({
    //     message: "模拟登陆失败"
    // });
};
app.get("/api/get-cookie", loginCheck, (req, res, next) => {
    console.log("get-get-cookie");
    res.json(req.cookie);
});
app.post("/api/get-body", (req, res, next) => {
    console.log("请求post-get-body");
    res.json(req.body);
});

app.use((req, res, next) => {
    res.json({
        message: "404 not found"
    });
});
app.listen(2000, () => {
    console.log("监听2000成功");
});
