const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Connection |", "Method:", req.method + " |","URL:", req.url)
  //console.log("url", req.url)
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
})

server.listen(3000);
