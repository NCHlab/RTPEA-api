var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");


router.get("/", (req, res) => {
    console.log("Connection |", "Method:", req.method + " |", "URL:", req.originalUrl);

    var listOfStates = []
    var listOfTissues = []

    mongoose.model("visualise1").find( { $or: [ { PXD: 'ORF1P' }, { PXD: 'ORF2P' } ] }, function(err, posts) {

        // ORF1P
        posts[0].features.forEach(function(features) {
            
            if (!(listOfStates.includes(features.consequence3))){
                if (features.consequence3 !== undefined){
                    listOfStates.push(features.consequence3)
                }
            }
            
            if (!(listOfTissues.includes(features.consequence))){
                if (features.consequence !== undefined){
                    listOfTissues.push(features.consequence)
                }
            }
        })
        
        // ORF2P
        posts[1].features.forEach(function(features) {
            
            if (!(listOfStates.includes(features.consequence3))){
                if (features.consequence3 !== undefined){
                    listOfStates.push(features.consequence3)
                }
            }
            
            if (!(listOfTissues.includes(features.consequence))){
                if (features.consequence !== undefined){
                    listOfTissues.push(features.consequence)
                }
            }
        })
        res.json({'States':listOfStates,'Tissue':listOfTissues});
      });
    });


module.exports = router;
