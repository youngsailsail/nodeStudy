const fs = require("fs");
const path = require("path");
const readline = require("readline");

const fileName = path.resolve(__dirname, "../", "../", "logs", "access.log");
const readStream = fs.createReadStream(fileName);

const rl = readline.createInterface({
    input: readStream
});

let chromeNum = 0;
let sun = 0;

rl.on("line", lineNum => {
    if (!lineNum) {
        return;
    }
    sun += 1;
    const res = lineNum.split("-")[4];
    if (res.includes("Chrome")) {
        console.log(chromeNum, "chromeNum");
        chromeNum += 1;
    }
});
rl.on("close", () => {
    console.log("Chrome is " + (chromeNum / sun) * 100 + "%");
});
