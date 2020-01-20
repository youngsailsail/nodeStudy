const http = require('http');
const handle = require('../app')
const PORT = 8000
const server = http.createServer(handle)
server.listen(PORT)