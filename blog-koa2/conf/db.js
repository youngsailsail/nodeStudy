const env = process.env.NODE_ENV;
const sqlObj = {
    host: "localhost",
    port: "3302",
    database: "myblogs",
    user: "root",
    password: "yff931123"
};
const redisObj = {
    port: 6379,
    host: "127.0.0.1"
};
let SQL_CONF;
let REDIS_CONF;

if (env == "dev") {
    SQL_CONF = sqlObj;
    REDIS_CONF = redisObj;
} else {
    SQL_CONF = sqlObj;
    REDIS_CONF = redisObj;
}

module.exports = {
    SQL_CONF,
    REDIS_CONF
};
