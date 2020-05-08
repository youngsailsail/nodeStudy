var createError = require("http-errors");
var express = require("express");
var path = require("path");
const fs = require("fs");
var logger = require("morgan"); //美化打印格式

var indexRouter = require("./routes/index");

var app = express();

const ENV = process.env.NODE_ENV;
if (ENV == "dev") {
    app.use(logger("dev"));
} else {
    const filename = path.resolve(__dirname, "logs", "access.log");
    const writeStream = fs.createWriteStream(filename);
    app.use(
        logger("combined", {
            stream: writeStream
        })
    );
}

app.use(express.json()); //获取Json格式的postData
app.use(express.urlencoded({ extended: false })); //获取urlencoded格式的postData


app.use("/", indexRouter); //匹配路由

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404)); //给下一个函数传递参数
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
