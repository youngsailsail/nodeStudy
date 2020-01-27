const fs = require("fs");
const path = require("path");
const fileName = path.resolve(__dirname, "data.txt");
const fileName2 = path.resolve(__dirname, "data-copy.txt");

fs.readFile(fileName, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    // console.log("data", data.toString());
});
fs.writeFile(
    fileName,
    "我是写入的内容222\n",
    {
        flag: "a" //追加用a,覆盖用w
    },
    err => {
        console.log("err", err);
    }
);
fs.exists(fileName, res => {
    console.log("exists", res); //判断文件是否存在
});
//流的形式
// process.stdin.pipe(process.stdout);
// req.pipe(res)//能够直接输出请求的数据
const readStream = fs.createReadStream(fileName);
readStream.on("data", chunk => {
    console.log(chunk.toString());
});
readStream.pipe(fs.createWriteStream(fileName2));
