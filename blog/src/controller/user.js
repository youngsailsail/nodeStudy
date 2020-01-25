const { exec } = require("../db/sql");
const login = ({ username, password }) => {
    let sql = `select * from users where username='${username}' and password='${password}'`;
    return exec(sql).then(res => {
        return res[0];
    });
};
module.exports = {
    login
};
