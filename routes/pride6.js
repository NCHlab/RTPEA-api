var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.url);
  mongoose.model("pride6").find(function(err, pride6) {
    // console.log(pride6);
    res.json(pride6);
  });
});

module.exports = router;
