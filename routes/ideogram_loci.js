var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");


router.get("/:id", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.get('host') + req.originalUrl);
// If user clicks on /ideogram, by Default ALL the data is returned
  if ((req.originalUrl == "/ideogram_loci/undefined") || (req.originalUrl == "/ideogram_loci")) {
    mongoose.model("ideogram1").find({}, function(err, posts) {
      res.json(posts);
    });
  } else {
    // Regex identifies all the family names seperated by comma or space
    // Saves the data to data_name followed by further parsing
    // depending on the type of naming convention used e.g HS_101 or LINE_1_HS_101
    const regex = /[A-Z]+\d?_+\d+_?[A-Z]*\d*_*\d*[A-Z]*/gm;
    const str = req.originalUrl;
    let m;
    var data_name = [];
    var family_name = [];
    var text_string = [];

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
    var i;
    for (i = 0; i < data_name.length; i++) {
      // Checks for name such as LINE_1_HS_101_ORF1
      // if (data_name[i].slice(-5,-4) == "_"){
      //   family_name.push(data_name[i].slice(0,-5))
      // Checks for name such as LINE_1_HS_101
      // } else
      if (data_name[i].slice(0, 4) == "LINE") {
        family_name.push(data_name[i]);
      } else {
        // Name such as HS_101
        family_name.push("LINE_1_" + data_name[i]);
      }
    }

    var j;
    for (j = 0; j < family_name.length; j++) {
      text_string.push({ name: family_name[j] });
    }

    mongoose.model("ideogram1").find({$or:text_string}, function(err, posts) {
      res.json(posts);
    });
  }
  });

module.exports = router;