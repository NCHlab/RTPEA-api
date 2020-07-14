var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");


router.get("/:id", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.get('host') + req.originalUrl);

  if ((req.originalUrl == "/ideogram2/undefined") || (req.originalUrl == "/ideogram2")) {
    mongoose.model("ideogram122").find({}, function (err, posts) {
      res.json(posts[0]["annotations"]);
    });
  } else {
    const regex = /[A-Z]+\d?_+\d+_?[A-Z]*\d*_*\d*[A-Z]*/gm;
    const str = req.originalUrl;
    let m;
    var data_name = [];

    while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
        data_name.push(match);
      });
    }

    var data_to_send = [];

    mongoose.model("ideogram122").find({}, function (err, posts) {
      for (var j of posts[0]["annotations"]) {
        if (data_name.includes(j["name"])) {
          data_to_send.push(j);
        }
      }
      res.json(data_to_send);
    });
  }
});

module.exports = router;