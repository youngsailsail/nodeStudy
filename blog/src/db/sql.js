const { SQL_CONF } = require("../conf/db");
const sql = require("mysql");

const con = sql.createConnection(SQL_CONF);
con.connect();

const exec = sql => {
    console.log(sql, "sql");

    return new Promise((resolve, reject) => {
        con.query(sql, (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            if (res) {
                console.log(res, "res-sql");

                resolve(res);
            }
        });
    });
};
module.exports = { exec, escape: sql.escape };
