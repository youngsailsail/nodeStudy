const http = require("http");
const server = http.createServer((req, res) => {
    res.setHeader("Content-type", "application/json");
    console.error("模拟错误消息");
    console.log("收到请求");
    if (req.url == "/err") {
        throw new Error("出错了");
    }
    res.end(
        JSON.stringify({
            errno: 0,
            message: "发送成功4"
        })
    );
});

server.listen(3000);
console.log("list 3000 is successful");
