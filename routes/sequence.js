var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");


router.get("/:id", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.get('host') + req.originalUrl);

// If user clicks on /Sequence, by Default ORF1p sequence returned > can automate this to grab data from db
  if ((req.originalUrl == "/sequence/undefined") || (req.originalUrl == "/sequence")) {
    // mongoose.model("seqview1").find({"Family":""}, function(err, posts) {
      res.json([{"Family":"ORF1p",
                "Sequence":"MGKKQNRKTGNSKTQSASPPPKERSSSPATEQSWMENDFDELREEGFRRSNYSELREDIQTKGKEVENFEKNLEECITRITNTEKCLKELMELKTKARELREECRSLRSRCDQLEERVSAMEDEMNEMKREGKFREKRIKRNEQSLQEIWDYVKRPNLRLIGVPESDVENGTKLENTLQDIIQENFPNLARQANVQIQEIQRTPQRYSSRRATPRHIIVRFTKVEMKEKMLRAAREKGRVTLKGKPIRLTADLSAETLQARREWGPIFNILKEKNFQPRISYPAKLSFISEGEIKYFIDKQMLRDFVTTRPALKELLKEALNMERNNRYQPLQNHAKM"}]);
  } else {
    // Removes /sequence/ from the family_name
    var fam_name = req.originalUrl.slice(10);
    mongoose.model("seqview1").find({"Family":fam_name}, function(err, posts) {
      if (posts.length == 0){
        res.json([{"Family":"NA",
                  "Sequence":"No Matches Found!"}]);
      } else {
        res.json(posts);
      }

    });
  }
  });
module.exports = router;
