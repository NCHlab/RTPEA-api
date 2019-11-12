var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");


router.get("/", (req, res) => {
    console.log("Connection |", "Method:", req.method + " |", "URL:", req.originalUrl);

    // console.log("Connection |", "Method:", req.method + " |", "URL:",  req.get('host') + req.originalUrl);
     // const Error_404_msg = {
     //   Status: "Not Found",
     //   Code: 404,
     //   Message:  " does not exist in the database.",
     //   moreInfoUrl: "http://www.rtpea.com/status/404"
     // };
    console.log(req.params.state)
     //var PXD_ID = req.params.pxd.toUpperCase();
     //if (PXD_ID == "UNDEFINED"){
     //  // PXD_ID = "ORF1P"
     //  PXD_ID = "ORF1P"
     //} else if (PXD_ID == "ORF1") {
     //    PXD_ID = PXD_ID +"P"
     //} else if (PXD_ID == "ORF2") {
     //  PXD_ID = PXD_ID +"P"
     //}
     //
     
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
        console.log([listOfStates,listOfTissues])
        res.json([{'States':listOfStates},{'Tissue':listOfTissues}]);
      });
      
      
      //return res.json(req.params.state)
    

    
    });


module.exports = router;


//db.getCollection('retailers').find(
//    { 'stores.offers.size': 'L'},
//    { 'stores.$': 1 }
//).forEach(function(doc) {
//    // Technically this is only "one" store. So omit the projection
//    // if you wanted more than "one" match
//    doc.stores = doc.stores.filter(function(store) {
//        store.offers = store.offers.filter(function(offer) {
//            return offer.size.indexOf("L") != -1;
//        });
//        return store.offers.length != 0;
//    });
//    printjson(doc);
//})