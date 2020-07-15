const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs"); //file system library
const cors = require("cors");
const mongoose = require("mongoose");
const promise = require("es6-promise");
const fetch = require("isomorphic-fetch");


table_route = require('./routes/table');
api_route = require('./routes/api');

select_data = require('./routes/select_data')
newvis = require('./routes/newvis')
visualise_all_route = require('./routes/visualise_all')
visualise_config_route = require('./routes/visualise_config')

dbcheck_route = require('./routes/dbcheck')
ideogram_route = require('./routes/ideogram')
ideogram_loci_route = require('./routes/ideogram_loci')
sequence_route = require('./routes/sequence')

orfNames = require('./routes/ORFNames')


var Schema = mongoose.Schema;
const app = express();

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

//Connect to the DB before tests run
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

app.use("/dbcheck", dbcheck_route);
app.use("/table", table_route);
app.use("/api", api_route);

app.use("/select_data", select_data);
app.use("/newvis", newvis);
app.use("/visualise_all", visualise_all_route);
app.use("/visualise_config.json", visualise_config_route);

app.use("/ideogram", ideogram_route);
app.use("/ideogram_loci", ideogram_loci_route)
app.use("/sequence", sequence_route);

app.use("/orfnames", orfNames);


app.get("/", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.url + " | " + "Server.js returned this > not routes");
  res.json({
  	"Message": "Welcome to the API for RTPEA - This is the Backend Server for RTPEA",
  	"Message2": "For API access go to https://api.rtpea.com/api/{PXD}"
  });
});

// Displays Error Message, if an incorrect URL is entered
app.get("/:any", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.url + " | " + "Server.js returned this > not routes");
  res.status(404).send("ERROR 404: URL NOT FOUND");
});

app.listen(port, () => {
  console.log("Server Running on port 3001!");
});
