const http = require('http');
//var
http.createServer(function (req, res) {
    console.log("Got a request now!");
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
}).listen(3000);
