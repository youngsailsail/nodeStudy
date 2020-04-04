const Sequelize = require("sequelize");
const conf = {
    host: "localhost",
    port: "3302",
    dialect: "mysql"
};
conf.pool = {
    max: 5, //最多保持5个连接 
    min: 0, //最少0个
    idle: 10000 //如果没有连接10s释放
};
const sql = new Sequelize("koa2_weibo_db", "root", "yff931123", conf);
sql.authenticate()
    .then(() => {
        console.log("ok");
    })
    .catch(() => {
        console.log("err");
    });
module.exports = sql;
