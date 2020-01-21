const queryString = require("querystring");
const blogRouterHandel = require("./src/router/blog");
const userRouterHandel = require("./src/router/user");
const getPostData = req => {
    return new Promise((resolve, reject) => {
        if (
            req.method === "GET" ||
            req.headers["content-type"] !== "application/json"
        ) {
            resolve({});
            return;
        }
        if (req.method === "POST") {
            let postData = "";
            req.on("data", chunck => {
                postData += chunck.toString();
            });
            req.on("end", () => {
                if (!postData) {
                    resolve({});
                    return;
                }
                resolve(JSON.parse(postData));
            });
        }
    });
};
const handle = (req, res) => {
    res.setHeader("Content-type", "application/json");
    req.path = req.url.split("?")[0];
    req.query = queryString.parse(req.url.split("?")[1]);
    console.log(req.path, "path");
    getPostData(req).then(postData => {
        req.body = postData;
        console.log("body", req.body);
        const blogData = blogRouterHandel(req, res);
        if (blogData) {
            res.end(JSON.stringify(blogData));
            return;
        }
        const userData = userRouterHandel(req, res);
        if (userData) {
            res.end(JSON.stringify(userData));
            return;
        }
        res.writeHead(404, { "Content-type": "text/plain" });
        res.write("404 not found");
        res.end();
    });
};
module.exports = handle;
