const cryp = require("crypto");
const SECRET_KEY = "Y2floveYjxgn5201314";

const md5 = content => {
    const md5Hash = cryp.createHash("md5");
    return md5Hash.update(content).digest("hex");
};

const genPassword = password => {
    const str = `password=${password}&key=${SECRET_KEY}`;
    return md5(str);
};

module.exports = { genPassword };
