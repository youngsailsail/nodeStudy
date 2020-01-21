const { SQL_CONF } = require("../conf/db");
const sql = require("mysql");

const con = sql.createConnection(SQL_CONF);
con.connect();

const exct = sql => {
    return new Promise((resolve, reject) => {
        console.log(sql, "sql");
        con.query(sql, (err, res) => {
            console.log(res, "res2");
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
module.exports = { exct };
