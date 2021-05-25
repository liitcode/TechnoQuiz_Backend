var http = require('http');
const port = process.env.port || 3000;

var server = http.createServer(function (req, res) {
    res.writeHead(200);
    res.write("Server Teting");
    res.end();    
});
server.listen(port);
console.log('Server running at http://127.0.0.1:' + port + '/');