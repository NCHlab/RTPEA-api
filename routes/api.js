var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");


router.get("/", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.get('host')+"/api" + " | " + "Main API Page");
  res.json({"Message":"For Programmatic access use https://api.rtpea.com/api/{PXD}"});
});

router.get("/:pxd", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.get('host') + req.originalUrl);
  // const { pxd } = req.params;
  const Error_404_msg = {
    Status: "Data Not Found",
    Code: 404,
    Response: req.params.pxd + " is a valid PXD, but does not exist in this database. It has not been re-analysed",
    Message: "Contact the developers if you have a specific request from PRIDE database",
    moreInfoUrl: "https://rtpea.com/status/404"
  };

  const Error_403_msg = {
    Status: "Forbidden!",
    Code: 403,
    Message:  "You do not have permission to access this on this server",
    moreInfoUrl: "https://rtpea.com/status/403"
  };

  const Error_401_msg = {
    Status: "Unauthorized!",
    Code: 401,
    Message:  "The data for " + req.params.pxd + " is currently private.",
    Message2: "This PXD may not exist in the PRIDE archives.",
    moreInfoUrl: "http://www.ebi.ac.uk/pride/archive/login"
  };

  // const responseCodePromise = new Promise((resolve, reject) => {
  //   fetch("https://www.ebi.ac.uk:443/pride/ws/archive/project/" + req.params.pxd)
  //       .then(response => resolve(response.status))
  // });

  const responseCodePromise = fetch("https://www.ebi.ac.uk:443/pride/ws/archive/project/" + req.params.pxd.toUpperCase())
      .then(response => response.status);

  const mongoosePromise = new Promise((resolve, reject) => {
      mongoose.model("table1").find({ PXD: req.params.pxd.toUpperCase() }, function(err, posts) {
        if (err) {
          reject(err);
        }
        resolve(posts);
      });
  });


  Promise.all([responseCodePromise, mongoosePromise])
  .then(([code, posts]) => {
      if (code === 401) {
          res.status(401).json(Error_401_msg);
      } else if (code === 403) {
          res.status(403).json(Error_403_msg);
      } else if (!posts.length) {
          res.status(404).json(Error_404_msg);
      } else {
          res.json(posts);
      }
  })

  .catch((err) => {
      // Always end with a catch for anything unexpected
      console.log(err);
      res.status(400).json({message: err});
  });
})
  module.exports = router;
