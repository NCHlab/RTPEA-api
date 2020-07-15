var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
var configFile = require("./config.json")

router.get("/", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.get('host') + req.originalUrl);
  res.json(configFile)
});

module.exports = router;
