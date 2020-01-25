const { REDIS_CONF } = require("../conf/db");
const redis = require("redis");
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on("error", err => {
    console.log(err);
});
const set = (key, val) => {
    if (typeof val == "object") {
        val = JSON.stringify(val);
    }
    redisClient.set(key, val);
};
const get = key => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err);
                return;
            }
            try {
                resolve(JSON.parse(val));
            } catch (error) {
                resolve(val);
            }
        });
    });
};

module.exports = {
    set,
    get
};
