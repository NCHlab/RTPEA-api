const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const fs = require("fs"); //file system library
const cors = require("cors");
const mongoose = require("mongoose");
const promise = require("es6-promise");
const fetch = require("isomorphic-fetch");
const app = express();

table_route = require('./routes/table');
tabledemo_route = require('./routes/table-demo');
api_old_route = require('./routes/api_old');
api_route = require('./routes/api');
visualise_route = require('./routes/visualise')
dbcheck_route = require('./routes/dbcheck')
var Schema = mongoose.Schema;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

process.env.NODE_ENV = "development";
if (app.get("env") === "development") {
  app.locals.pretty = true;
}

console.log(app.get("env"));
const port = 3001;
mongoose.Promise = global.Promise;

//Connect to the db before tests run
//connect to mongodb
mongoose.connect("mongodb://localhost:27017/retrodb");
mongoose.connection
  .once("open", function() {
    console.log("Connection Created");
  })
  .on("error", function(error) {
    console.log("Connection Error:", error);
  });


// load all files in models directory
fs.readdirSync(__dirname + "/models").forEach(function(filename) {
  if (~filename.indexOf(".js")) require(__dirname + "/models/" + filename);
});

app.use("/table", table_route);
app.use("/table-demo", tabledemo_route);
app.use("/api_old", api_old_route);
app.use("/api", api_route);
// app.use("/pride6", pride6_route);
// app.use("/prideid", prideid_route);
app.use("/visualise.json", visualise_route);
app.use("/dbcheck", dbcheck_route);

// app.get("/posts/:userID", (req, res) => {
//   mongoose
//     .model("posts")
//     .find({ user: req.params.userID }, function(err, posts) {
//       res.send(posts);
//     });
// });

app.get("/", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.url);
  res.send("Default Home Page");
});

// Displays Error Message, if an incorrect URL is entered
app.get("/:any", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.url);
  res.status(404).send("ERROR 404: URL NOT FOUND");
});

app.listen(port, () => {
  console.log("Server Running on port 3001!");
});
