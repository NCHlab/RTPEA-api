var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");


router.get("/:id", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.get('host') + req.originalUrl);

    res.json({"hello":"test"});
  });


module.exports = router;
