var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

var Error_code = 401;

router.get("/:pxd", (req, res) => {
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
    Message2: "This PXD may not exist in the PRIDE archives.",
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
   },1800);
   })
 )});

module.exports = router;
