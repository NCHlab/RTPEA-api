var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");


router.get("/", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.originalUrl);
    if (mongoose.connection.readyState == 1){
      res.json({"Status": "Online"})
    } else if (mongoose.connection.readyState == 0){
      res.json({"Status": "Offline"})
    }
  });




module.exports = router;
