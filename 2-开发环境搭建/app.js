const queryString = require('querystring')
const blogRouterHandel = require('./src/router/blog');
const userRouterHandel = require('./src/router/user');
const handle = (req, res) => {
    res.setHeader('Content-type', 'application/json')
    req.path = req.url.split('?')[0];
    req.query = queryString.parse(req.url.split('?')[1]);
    console.log(req.path, 'path');
    const blogData = blogRouterHandel(req, res);
    if (blogData) {
        res.end(JSON.stringify(blogData))
        return;
    }
    const userData = userRouterHandel(req, res)
    if (userData) {
        res.end(JSON.stringify(userData))
        return;
    }
    res.writeHead(404, { 'Content-type': 'text/plain' });
    res.write('404 not found');
    res.end()
}
module.exports = handle