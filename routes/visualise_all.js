var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");


router.get("/", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.originalUrl);

  mongoose.model("visualise1").find({ }, function(err, posts) {
      res.json(posts);
  });
});

module.exports = router;
