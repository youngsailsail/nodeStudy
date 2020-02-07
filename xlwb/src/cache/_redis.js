/**
 * @description 操作redis
 * @author yff
 */
const { REDIS_CONF } = require('../conf/db')
const redis = require('redis')
//创建客户端
const redisClint = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClint.on('err', err => {
    console.log(err)
})
/**
 *
 * @param {String} key 键
 * @param {String} val  值
 * @param {Number} timeout 过期时间
 */
const set = (key, val, timeout = 60 * 60) => {
    if (typeof val === 'object') val = JSON.stringify(val)
    redisClint.set(key, val)
    redisClint.expire(key, timeout)
}
/**
 *
 * @param {String} key 键
 */
const get = key => {
    return new Promise((resolve, reject) => {
        redisClint.get(key, (err, val) => {
            if (err) {
                reject(err)
            } else {
                if (val == null) {
                    resolve(null)
                    return
                }
                try {
                    resolve(JSON.parse(val))
                } catch (error) {
                    resolve(val)
                }
            }
        })
    })
}
module.exports = {
    set,
    get
}
