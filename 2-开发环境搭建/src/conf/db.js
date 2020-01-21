const env = process.env.NODE_ENV;
const initObj = {
    host: "localhost",
    port: "3302",
    database: "myblog",
    user: "root",
    password: "yff931123"
};
const SQL_CONF = env === "dev" ? initObj : initObj;

module.exports = {
    SQL_CONF
};
