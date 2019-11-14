var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");


router.get("/:id", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.get('host') + req.originalUrl);

    mongoose.model("ideogram122").find({}, function(err, posts) {
      delete posts[0]._id
      res.json(posts[0]);
    });
  });

module.exports = router;

//OLD CODE
// mongoose.model("ideogram1").find({$or:[{"name":family_name[0]},
//                                         {"name":family_name[1]},
//                                         {"name":family_name[2]},
//                                         {"name":family_name[3]},
//                                         {"name":family_name[4]},
//                                         {"name":family_name[5]},
//                                         {"name":family_name[6]}]}, function(err, posts) {
//   res.json(posts);
// });
