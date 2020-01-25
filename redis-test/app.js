const redis = require("redis");
const redisClint = redis.createClient(6379, "127.0.0.1");
redisClint.on("error", err => {
    console.log(err);
});
redisClint.set("myname", "zhangsan23", redis.print);
redisClint.get("myname", (err, val) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(val, "val");
});
