const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const session = require("koa-generic-session");
const redisStor = require("koa-redis");
const fs = require("fs");
const path = require("path");
const morgan = require("koa-morgan");
//文件删除
var koaStatic = require("koa-static");
var koaBody = require("koa-body"); //文件保存库
const { REDIS_CONF } = require("./conf/db");

// const index = require("./routes/index");
// const users = require("./routes/users");

const user = require("./routes/user");
const blog = require("./routes/blog");
const upload = require("./routes/upload");

// error handler
onerror(app);

// middlewares
app.use(
    bodyparser({
        enableTypes: ["json", "form", "text"]
    })
);
app.use(json());
app.use(logger()); //设置打印格式更美观
app.use(require("koa-static")(__dirname + "/public"));

app.use(
    views(__dirname + "/views", {
        extension: "pug"
    })
);

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
//日志
const ENV = process.env.NODE_ENV;
if (ENV == "dev") {
    app.use(morgan("dev"));
} else {
    const stream = fs.createWriteStream(
        path.resolve(__dirname, "logs", "access.log")
    );
    app.use(
        morgan("combined", {
            stream
        })
    );
}
//session实现登录验证
app.keys = ["xasa-44ad2"];
app.use(
    session({
        cookie: {
            maxAge: 1 * 24 * 60 * 60 * 1000
        },
        store: redisStor({
            all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
        })
    })
);
// app.use(
//     koaBody({
//         formidable: {
//             //设置文件的默认保存目录，不设置则保存在系统临时目录下
//             uploadDir: path.resolve(__dirname, "./static/uploads"),
//             maxFileSize: 200 * 1024 * 1024
//         },
//         multipart: true // 开启文件上传，默认是关闭
//     })
// );

//开启静态文件访问
// app.use(koaStatic(path.resolve(__dirname, "./static")));

// routes
// app.use(index.routes(), index.allowedMethods());
// app.use(users.routes(), users.allowedMethods());

app.use(user.routes(), user.allowedMethods());
app.use(blog.routes(), blog.allowedMethods());
app.use(upload.routes(), upload.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
    console.error("server error", err, ctx);
});

module.exports = app;
