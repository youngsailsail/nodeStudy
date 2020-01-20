const http = require("http");
const server = http.createServer((req, res) => {
    const reqN = req;
    const { url, method } = req;
    const path = url.split("?")[0];
    const query = url.split("?")[1];
    res.setHeader("Content-type", "application/json");
    if (method === "GET") {
        res.end({
            url,
            method,
            query,
            path
        });
    } else {
        let postData = "";
        reqN.on("data", chunck => {
            postData += chunck.toString();
        });
        reqN.end(() => {});
    }
});
server.listen(3300);
