const http = require("http");

const server = http.createServer((req, res) => {
    let reqN = req;
    const { method, headers } = req;
    if (method === "POST") {
        console.log(headers, "content-type", headers["content-type"]);
        let propsData = "";
        reqN.on("data", chunck => {
            propsData += chunck.toString(); //数据流的形式
        });
        reqN.on("end", () => {
            console.log(propsData);
            res.end("hello world");
        });
    }
});
server.listen(3352, () => {
    console.log("3352");
});
console.log("ok");
