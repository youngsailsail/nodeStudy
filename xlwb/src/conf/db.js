const { isDev, isPrd } = require("../utils/env");

let REDIS_CONF = {
    host: "127.0.0.1",
    port: 6379
};
if (isPrd) {
    REDIS_CONF = {
        host: "127.0.0.1",
        port: 6379
    };
}
module.exports = {
    REDIS_CONF
};
