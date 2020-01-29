const { exec, escape } = require("../db/sql");
const { genPassword } = require("../utils/cryp");

const login = async ({ username, password }) => {
    password = escape(genPassword(password));
    let sql = `select username,realname from users where username=${escape(
        username
    )} and password=${password}`;
    const data = await exec(sql);
    return data[0];
};
module.exports = {
    login
};
