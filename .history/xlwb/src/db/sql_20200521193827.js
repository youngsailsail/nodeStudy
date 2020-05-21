const Sequelize = require('sequelize')
const {
    MYSQL_CONF: {
        database, user, password, conf,
    },
} = require('../conf/db')

const sql = new Sequelize(database, user, password, conf)
module.exports = sql
