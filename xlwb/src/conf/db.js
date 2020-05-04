const { isPrd } = require('../utils/env')

let REDIS_CONF = {
    host: '127.0.0.1',
    port: 6379,
}
let MYSQL_CONF = {
    user: 'root',
    password: 'yff931123',
    database: 'koa2_weibo_db',
    conf: {
        host: 'localhost',
        port: '3302',
        dialect: 'mysql',
        pool: {
            max: 5, //最多保持5个连接 
            min: 0, //最少0个
            idle: 10000 //如果没有连接10s释放
        }
    }
}

if (isPrd) {
    REDIS_CONF = {
        host: '127.0.0.1',
        port: 6379
    },
    MYSQL_CONF = {
        user: 'root',
        password: 'yff931123',
        database: 'koa2_weibo_db',
        conf: {
            host: 'localhost',
            port: '3302',
            dialect: 'mysql',
            pool: {
                max: 5, //最多保持5个连接 
                min: 0, //最少0个
                idle: 10000 //如果没有连接10s释放
            }
        }
    }
}
module.exports = {
    REDIS_CONF, MYSQL_CONF
}
