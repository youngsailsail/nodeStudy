const fs = require("fs");
const path = require("path");

const writeLog = (writeStream, log) => {
    console.log(log, "writeLog");
    writeStream.write(`${log}\n`);
};

const createWriteStream = fileName => {
    const fullName = path.resolve(__dirname, "../", "../", "logs", fileName);
    return fs.createWriteStream(fullName, { flags: "a" });
};

const accessLog = log => {
    const writeStream = createWriteStream("access.log");
    writeLog(writeStream, log);
};

module.exports = {
    accessLog
};
