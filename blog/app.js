const queryString = require("querystring"); //解析url里面的query
const xss = require("xss"); //预防xss攻击,把js代码的<script>的<>转义
const blogRouterHandel = require("./src/router/blog");
const userRouterHandel = require("./src/router/user");
const { get, set } = require("./src/db/redis");
const { accessLog } = require("./src/utils/setLog");

// const SESSION_DATA = {};
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    return d.toGMTString();
};
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
    accessLog(
        `${req.method}--${req.url}--${req.headers["user-agent"]}--${Date.now()}`
    );
    getPostData(req).then(async postData => {
        req.body = {};
        Object.entries(postData).forEach(([key, val], index) => {
            req.body[key] = xss(val);
        });
        console.log(req.body, "req.body");
        req.session = {};
        req.cookie = {};
        let needSetCookie = false;
        req.headers.cookie &&
            req.headers.cookie
                .replace(/;\s+/g, ";")
                .split(";")
                .forEach(item => {
                    const [key, val] = item.split("=");
                    req.cookie[key] = val;
                });
        let { userid } = req.cookie;
        //使用进程内存
        // if (userid) {
        //     if (!SESSION_DATA[userid]) {
        //         SESSION_DATA[userid] = {};
        //     }
        // } else {
        //     needSetCookie = true;
        //     userid = `${new Date().getTime()}_${Math.random()}`;
        //     SESSION_DATA[userid] = {};
        // }
        //使用redis内存
        if (!userid) {
            needSetCookie = true;
            userid = `${new Date().getTime()}_${Math.random()}`;
            set(userid, {});
        }
        req.sessionId = userid;
        const redisData = await get(req.sessionId);
        req.session = redisData || {};
        // req.session = SESSION_DATA[userid];
        if (needSetCookie) {
            res.setHeader(
                "Set-cookie",
                `userid=${userid};path=/;httpOnly;expires=${getCookieExpires()}`
            );
        }
        const blogData = await blogRouterHandel(req, res);
        if (blogData) {
            res.end(JSON.stringify(blogData));
            return;
        }
        const userData = await userRouterHandel(req, res);
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
