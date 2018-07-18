var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");


router.get("/:id", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.get('host') + req.originalUrl);
  // console.log(req.originalUrl)
  if ((req.originalUrl == "/ideogram/undefined") || (req.originalUrl == "/ideogram")) {
    mongoose.model("ideogram1").find({}, function(err, posts) {
      res.json(posts);
    });
  } else {
    const regex = /[A-Z]+\d?_+\d+_?[A-Z]*\d*_*\d*[A-Z]*/gm;
    const str = req.originalUrl;
    let m;
    var data_name = [];
    var family_name = [];


    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            // console.log(`${match}`);
            data_name.push(match)

        });
    }
    var i;
    for (i = 0; i < data_name.length; i++) {
      // Checks for name such as LINE_1_HS_101_ORF1
        // if (data_name[i].slice(-5,-4) == "_"){
        //   family_name.push(data_name[i].slice(0,-5))

      // Checks for name such as LINE_1_HS_101
        // } else
        if (data_name[i].slice(0,4) == "LINE"){
          family_name.push(data_name[i])
        } else{
      // Name such as HS_101
          family_name.push("LINE_1_"+data_name[i])
        }
    }
    // db.getCollection('ideogram1').find( { $or: [ {"name":"LINE_1_HS_101" }, { "name":"LINE_1_HS_103"}]})
    mongoose.model("ideogram1").find({$or:[{"name":family_name[0]},
                                            {"name":family_name[1]},
                                            {"name":family_name[2]},
                                            {"name":family_name[3]},
                                            {"name":family_name[4]},
                                            {"name":family_name[5]},
                                            {"name":family_name[6]}]}, function(err, posts) {
      res.json(posts);
    });
  }
  });

module.exports = router;
