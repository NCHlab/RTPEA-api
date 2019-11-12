var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");


router.get("/", (req, res) => {
    console.log("Connection |", "Method:", req.method + " |", "URL:", req.originalUrl);

    var orfNames = []

    //mongoose.model("visualise1").find( {}, function(err, posts) {
    //
    //    posts.forEach(function(data) {
    //        orfNames.push(data.PXD)
    //        })
    //    
    //    res.json(orfNames);
    //  });
    
    // Only retrieve PXD fields
    mongoose.model("visualise1").find({},{PXD:1,_id:0}, function(err, posts) {

        posts.forEach(function(data) {
            orfNames.push(data.PXD)
            })
        
        res.json(orfNames);
      });
    });


module.exports = router;