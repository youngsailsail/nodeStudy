var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var userRouter = require("./routes/user");
var blogRouter = require("./routes/blog");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json()); //获取Json格式的postData
app.use(express.urlencoded({ extended: false })); //获取urlencoded格式的postData
app.use(cookieParser()); //获取cookie
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter); //匹配路由
app.use("/users", usersRouter);
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404)); //给下一个函数传递参数
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
