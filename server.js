const express = require("express");
const bodyParser = require("body-parser")
const MongoClient    = require('mongodb').MongoClient;
const fs = require("fs"); //file system library
const cors = require("cors")
const mongoose = require("mongoose");
const app = express();

var Schema = mongoose.Schema;

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "public")))
app.use(cors())

process.env.NODE_ENV = 'development';

if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

console.log(app.get("env"));
const port = 3000;
mongoose.Promise = global.Promise;

//Connect to the db before tests run

//connect to mongodb
mongoose.connect("mongodb://localhost:27017/retrodb");
mongoose.connection.once("open", function(){
  console.log("Connection Created");
}).on("error", function(error){
  console.log("Connection Error:", error);
});

// mongoose.model("pride2", {name: String});
// mongoose.model("users", {users: String});

// load all files in models directory
fs.readdirSync(__dirname + "/models").forEach(function(filename){
  if (~filename.indexOf(".js")) require(__dirname + "/models/" +filename)
});


// var prideid = mongoose.model('prideid', {
//   _id : Schema.Types.ObjectId,
//   pxd_id : {
//       _id : String,
//       tissue_type : String,
//       study : String,
//       disease : String
//   },
//   name2 : [
//       {
//           name : String,
//           sample : Number,
//           replicate : Number,
//           ORF1p : Number,
//           ORF2p : Number,
//           ORF0 : Number
//       },
//       {
//           name : String,
//           sample : Number,
//           replicate : Number
//       },
//       {
//           name : String,
//           sample : Number,
//           replicate : Number
//       },
//       {
//           name : String,
//           sample : Number,
//           replicate : Number
//       }
//   ]
//   });

app.get('/pride6', (req, res) => {
  mongoose.model("pride6").find(function(err, pride6){
    // console.log(pride6);
    res.json(pride6);
  });
});

app.get('/prideid', (req, res) => {
  mongoose.model("pride5").find(function(err, prideid){
    console.log(prideid);
    res.send(prideid);
  });
});


app.get("/users", (req, res) => {
  mongoose.model("users").find(function(err, users){
    res.send(users);
  });
});

app.get("/posts/:userID", (req, res) => {
  mongoose.model("posts").find({user: req.params.userID}, function(err, posts) {
    res.send(posts);
  });
});


app.get("/", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |","URL:", req.url)
  res.sendFile("./templates/index.html", { root: __dirname })
});



app.post("/profile", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |","URL:", req.url)
  const user = {
    name: "Bob",
    job: "driver"
  }
  res.send(user)
});


//console.log(req.,query)

app.get("/:any", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |","URL:", req.url)
  res.status(404).send("ERROR 404: URL NOT FOUND")
});


//////////////////////////////////////

app.get("/", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |","URL:", req.url)
  res.send("hello")
});

app.post("/profile", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |","URL:", req.url)
  res.send(user)
});




app.listen(port, () => {
  console.log("Server Running on port 3000!")
});



// import express from "express";
// import bodyParser from "body-parser";
// import MongoClient from "mongodb";
// import fs from "fs";
// import cors from "cors";


// const http = require("http")

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
