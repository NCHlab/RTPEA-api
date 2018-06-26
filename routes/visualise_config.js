var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
var configFile = require("./config.json")

router.get("/", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.get('host') + req.originalUrl);


  // mongoose.model("visualise_config1").find({}, function(err, posts) {
  //   if (!posts.length) {
  //     res.status(404).json(Error_404_msg);
  //   } else {
  //     res.json(posts);
  //   }
  // });
  res.json(configFile)
});




module.exports = router;
