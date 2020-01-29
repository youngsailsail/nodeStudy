const { REDIS_CONF } = require("../conf/db");
const redis = require("redis");
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on("error", err => {
    console.log(err);
});

module.exports = {
    redisClient
};
