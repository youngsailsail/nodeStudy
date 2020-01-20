const http = require("http");
const queryString = require("querystring");
const server = http.createServer((req, res) => {
    const reqN = req;
    const { url, method } = req;
    const path = url.split("?")[0];
    const query = queryString.parse(url.split("?")[1]);
    res.setHeader("Content-type", "application/json"); //设置返回格式,针对字符串
    let resData = {
        url,
        method,
        query,
        path
    };
    if (method === "GET") {
        res.end(JSON.stringify(resData));
    } else {
        let postData = "";
        reqN.on("data", chunck => {
            postData += chunck.toString();
        });
        reqN.on("end", () => {
            resData.postData = postData;
            res.end(JSON.stringify(resData));
        });
    }
});
server.listen(3300);
console.log(33);
