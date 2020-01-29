const { SQL_CONF } = require("../conf/db");
const sql = require("mysql");

const con = sql.createConnection(SQL_CONF);
con.connect();

const exec = sql => {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            if (res) {
                resolve(res);
            }
        });
    });
};
module.exports = { exec, escape: sql.escape };
