const http = require("http");
const server = http.createServer((req, res) => {
    res.setHeader("Content-type", "application/json");
    res.end(
        JSON.stringify({
            errno: 0,
            message: "发送成功"
        })
    );
});
server.listen(3000);
console.log("list 3000 is successful");
