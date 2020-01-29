const http = require("http");
const slice = Array.prototype.slice;
class Express {
    constructor() {
        this.routes = {
            all: [],
            get: [],
            post: []
        };
    }
    register(path) {
        const info = {};
        if (typeof path == "string") {
            info.path = path;
            info.stack = slice.call(arguments, 1);
        } else {
            info.path = "/";
            info.stack = slice.call(arguments, 0);
        }
        return info;
    }
    use() {
        const res = this.register.apply(this, arguments);
        this.routes.all.push(res);
    }
    get() {
        const res = this.register.apply(this, arguments);
        this.routes.get.push(res);
    }
    post() {
        const res = this.register.apply(this, arguments);
        this.routes.post.push(res);
    }
    handle(req, res, list) {
        const next = () => {
            const middle = list.shift();
            if (middle) {
                middle(req, res, next);
            }
        };
        next();
    }
    match(method, url) {
        const lastArr = this.routes.all.pop();
        const res = [...this.routes.all, ...this.routes[method], lastArr || {}];
        let routeList = [];
        if (url == "/favicon.ico") return routeList;
        res.forEach(item => {
            if (url.indexOf(item.path) == 0) {
                routeList = [...routeList, ...item.stack];
            }
        });
        return routeList;
    }
    callBack() {
        return (req, res) => {
            let { method, url } = req;
            method = method.toLowerCase();
            res.json = data => {
                res.setHeader("Content-type", "application/json");
                res.end(JSON.stringify(data));
            };
            const list = this.match(method, url);
            this.handle(req, res, list);
        };
    }
    listen(...args) {
        const server = http.createServer(this.callBack());
        server.listen(...args);
    }
}
module.exports = () => {
    return new Express();
};
