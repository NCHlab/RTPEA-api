const express = require("express");
const bodyParser = require("body-parser")
const MongoClient    = require('mongodb').MongoClient;
const fs = require("fs");
const cors = require("cors")
const mongoose = require("mongoose");
const app = express();


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors())
const port = 3000;
mongoose.Promise = global.Promise;

//Connect to the db before tests run

//connect to mongodb
mongoose.connect("mongodb://localhost/retroelement");
mongoose.connection.once("open", function(){
  console.log("Connection Created");
  done();
}).on("error", function(error){
  console.log("Connection Error:", error);
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
