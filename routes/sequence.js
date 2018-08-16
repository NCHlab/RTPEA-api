var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");


router.get("/:id", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.get('host') + req.originalUrl);
if (req.originalUrl == "/sequence/all") {
  mongoose.model("seqview1").find({}, function(err, posts) {
    if (posts.length == 0){
      res.json([{"Family":"NA",
                "Sequence":"No Matches Found!"}]);
    } else {
      res.json(posts);
    }
  })
}



// If user clicks on /Sequence, by Default ORF1p sequence returned > can automate this to grab data from db
else if ((req.originalUrl == "/sequence/undefined") || (req.originalUrl == "/sequence")) {
    // mongoose.model("seqview1").find({"Family":""}, function(err, posts) {
      res.json([{"Family":"ORF1p",
                "Sequence":"MGKKQNRKTGNSKTQSASPPPKERSSSPATEQSWMENDFDELREEGFRRSNYSELREDIQTKGKEVENFEKNLEECITRITNTEKCLKELMELKTKARELREECRSLRSRCDQLEERVSAMEDEMNEMKREGKFREKRIKRNEQSLQEIWDYVKRPNLRLIGVPESDVENGTKLENTLQDIIQENFPNLARQANVQIQEIQRTPQRYSSRRATPRHIIVRFTKVEMKEKMLRAAREKGRVTLKGKPIRLTADLSAETLQARREWGPIFNILKEKNFQPRISYPAKLSFISEGEIKYFIDKQMLRDFVTTRPALKELLKEALNMERNNRYQPLQNHAKM"}]);
  } else {
    // Removes /sequence/ from the family_name
    var fam_name = req.originalUrl.slice(10);
    if (fam_name.slice(0,4)=="LINE"){

    } else {
      fam_name = "LINE_1_"+fam_name
    }

    if (fam_name == "LINE_1_Hs"){
      mongoose.model("seqview1").find({"Family":{ $regex: /LINE_1_HS/}}, function(err, posts) {
        res.json(posts);
    });
  } else if (fam_name == "LINE_1_Pa"){
      mongoose.model("seqview1").find({"Family":{ $regex: /LINE_1_PA/}}, function(err, posts) {
        res.json(posts);
    });
  } else {

    mongoose.model("seqview1").find({"Family":fam_name}, function(err, posts) {
      if (posts.length == 0){
        res.json([{"Family":"NA",
                  "Sequence":"No Matches Found!"}]);
      } else {
        res.json(posts);
      }

    });
  }
  }
  });
module.exports = router;
