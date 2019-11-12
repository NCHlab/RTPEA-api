var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");


router.get("/:pxd", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.originalUrl);

 // console.log("Connection |", "Method:", req.method + " |", "URL:",  req.get('host') + req.originalUrl);
  // const Error_404_msg = {
  //   Status: "Not Found",
  //   Code: 404,
  //   Message:  " does not exist in the database.",
  //   moreInfoUrl: "http://www.rtpea.com/status/404"
  // };
  var PXD_ID = req.params.pxd.toUpperCase();
  if (PXD_ID == "UNDEFINED"){
    // PXD_ID = "ORF1P"
    PXD_ID = "ORF1P"
  } else if (PXD_ID == "ORF1") {
      PXD_ID = PXD_ID +"P"
  } else if (PXD_ID == "ORF2") {
    PXD_ID = PXD_ID +"P"
  }

  mongoose.model("visualise1").find({ PXD: PXD_ID }, function(err, posts) {
    // if (!posts.length) {
    //   res.status(404).json(Error_404_msg);
    // } else {
    
      res.json(posts);
    // }
  });
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