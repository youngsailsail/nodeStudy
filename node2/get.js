const http = require('http');
const querystring = require('querystring')//解析get请求里面的query

const server = http.createServer((req, res) => {
    req.query = querystring.parse(req.url.split('?')[1]);
    console.log(req.method);
    console.log(req.url);
    console.log(req.query);
    res.end(JSON.stringify(req.query))
})

server.listen(8000)