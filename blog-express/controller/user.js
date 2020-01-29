const { exec, escape } = require("../db/sql");
const { genPassword } = require("../utils/cryp");

const login = ({ username, password }) => {
    password = escape(genPassword(password));
    let sql = `select * from users where username=${escape(
        username
    )} and password=${password}`;
    return exec(sql).then(res => {
        return res[0];
    });
};
module.exports = {
    login
};
