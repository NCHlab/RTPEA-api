const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const fs = require("fs"); //file system library
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const promise = require("es6-promise");
const fetch = require("isomorphic-fetch");

var Schema = mongoose.Schema;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "public")))
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

// mongoose.model("pride2", {name: String});
// mongoose.model("users", {users: String});

// load all files in models directory
fs.readdirSync(__dirname + "/models").forEach(function(filename) {
  if (~filename.indexOf(".js")) require(__dirname + "/models/" + filename);
});



app.get("/pride6", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.url);
  mongoose.model("pride6").find(function(err, pride6) {
    // console.log(pride6);
    res.json(pride6);
  });
});

app.get("/prideid", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.url);
  mongoose.model("pride5").find(function(err, prideid) {
    console.log(prideid);
    res.send(prideid);
  });
});

var Error_code = 401;

app.get("/api/:pxd", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.url);
  // const { pxd } = req.params;
  const Error_404_msg = {
    Status: "Data Not Found",
    Code: 404,
    Response: req.params.pxd + " does not exist in this database. It has not been re-analysed",
    Message: "Contact the developers if you have a specific request from PRIDE database",
    moreInfoUrl: "http://www.rtpea.com/status/404"
  };

  const Error_403_msg = {
    Status: "Forbidden!",
    Code: 403,
    Message:  "You do not have permission to access this on this erver",
    moreInfoUrl: "http://www.rtpea.com/status/401"
  };

  const Error_401_msg = {
    Status: "Unauthorized!",
    Code: 401,
    Message:  "The data for " + req.params.pxd + " is currently private.",
    moreInfoUrl: "http://www.ebi.ac.uk/pride/archive/login"
  };

  // 0.5 second delay added to allow for the correct error code to be displayed
  fetch("https://www.ebi.ac.uk:443/pride/ws/archive/project/" + req.params.pxd)
   .then(response => Error_code = response.status)
   .then(console.log(Error_code))
   .then(
     mongoose.model("pride5").find({ PXD: req.params.pxd }, function(err, posts) {
       setTimeout(function(){
     if (Error_code === 401) {
       res.status(401).json(Error_401_msg);
     } else if (Error_code === 403) {
       res.status(403).json(Error_403_msg);
     } else if (!posts.length) {
       res.status(404).json(Error_404_msg);
     } else {
       res.json(posts);
     }
   },800);
   })
 )});

//   fetch("https://www.ebi.ac.uk:443/pride/ws/archive/project/" + req.params.pxd)
//   .then(response => Error_code = response.status)
//   .then(console.log(Error_code))
//     mongoose.model("pride5").find({ PXD: req.params.pxd }, function(err, posts) {
//     if (Error_code === 401) {
//       res.status(401).json(Error_401_msg);
//     } else if (Error_code === 403) {
//       res.status(403).json(Error_403_msg);
//     } else if (!posts.length) {
//       res.status(404).json(Error_404_msg);
//     } else {
//       res.json(posts);
//     }
//   });
// });




//   if (Error_code === 401) {
//     res.status(401).json(Error_401_msg);
//   } else if (Error_code === 403) {
//     res.status(403).json(Error_403_msg);
//   } else {
//
//   mongoose.model("pride5").find({ PXD: req.params.pxd }, function(err, posts) {
//     if (!posts.length) {
//       res.status(404).json(Error_404_msg);
//     } else {
//       res.json(posts);
//     }
//   });
// }
// });

app.get("/users", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.url);
  mongoose.model("users").find(function(err, users) {
    res.send(users);
  });
});


app.get("/table", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.url);

  const Error_404_msg = {
    Status: "Not Found",
    Code: 404,
    Message:  " does not exist in the database.",
    moreInfoUrl: "http://www.rtpea.com/status/404"
  };

  mongoose.model("pride8").find({}, function(err, posts) {
    if (!posts.length) {
      res.status(404).json(Error_404_msg);
    } else {
      res.json(posts);
    }
  });
});


// app.get("/pridet", (req, res) => {
//   console.log("Connection |", "Method:", req.method + " |", "URL:", req.url);
//   mongoose.model("pridetable").find(function(err, pridet) {
//     res.send(pridet);
//   });
// });


app.get("/posts/:userID", (req, res) => {
  mongoose
    .model("posts")
    .find({ user: req.params.userID }, function(err, posts) {
      res.send(posts);
    });
});

app.get("/", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.url);
  res.sendFile("./templates/index.html", { root: __dirname });
});

app.post("/signin", (req, res) => {
  if (req.body.email === "email@email.co.uk" && req.body.password === "email") {
    res.json("success");
  } else {
    res.status(400).json("error logging in");
  }
});

app.post("/profile", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.url);
  const user = {
    name: "Bob",
    job: "driver"
  };
  res.send(user);
});




//console.log(req.,query)

app.get("/:any", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.url);
  res.status(404).send("ERROR 404: URL NOT FOUND");
});

//////////////////////////////////////

app.get("/", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.url);
  res.send("hello");
});

app.post("/profile", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.url);
  res.send(user);
});

app.listen(port, () => {
  console.log("Server Running on port 3001!");
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
