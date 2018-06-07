var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.get('host') + req.originalUrl);
  mongoose.model("pride5").find(function(err, prideid) {
    console.log(prideid);
    res.send(prideid);
  });
});

module.exports = router;
