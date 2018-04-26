"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
// const http = require("http")

// const express = require("express");
// const bodyParser = require("body-parser")
// const MongoClient    = require('mongodb').MongoClient;
// const fs = require("fs");
//
// const cors = require("cors")

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use((0, _cors2.default)());
var port = 3000;

// function onRequest(request, response) {
//   response.writeHead(200, {"Content-Type": "text/html"});
//   fs.readFile("./templates/index.html", null, function(error, data) {
//     if (error) {
//       response.writeHead(404);
//       response.write("file not found")
//     } else {
//       response.write(data);
//     }
//     response.end();
//   });
// }
//
// http.createServer(onRequest).listen(3000);


//app.use(express.static(__dirname + "/templates"))


// app.use((req, res, next) => {
//   console.log("h1")
//   next()
// })
//


app.get("/", function (req, res) {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.url);
  res.sendFile("./templates/index.html", { root: __dirname });
});

app.post("/profile", function (req, res) {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.url);
  var user = {
    name: "Bob",
    job: "driver"
  };
  res.send(user);
});

//console.log(req.,query)

app.get("/:any", function (req, res) {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.url);
  res.status(404).send("URL NOT FOUND");
});

//////////////////////////////////////

app.get("/", function (req, res) {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.url);
  res.send("hello");
});

app.post("/profile", function (req, res) {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.url);
  res.send(user);
});

app.listen(port, function () {
  console.log("Server Running on port 3000!");
});