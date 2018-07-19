var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");


router.get("/:id", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.get('host') + req.originalUrl);

  if ((req.originalUrl == "/sequence/undefined") || (req.originalUrl == "/sequence")) {
    // mongoose.model("seqview1").find({"Family":""}, function(err, posts) {
      res.json({"Family":"ORF1p",
                "Sequence":"MGKKQNRKTGNSKTQSASPPPKERSSSPATEQSWMENDFDELREEGFRRSNYSELREDIQTKGKEVENFEKNLEECITRITNTEKCLKELMELKTKARELREECRSLRSRCDQLEERVSAMEDEMNEMKREGKFREKRIKRNEQSLQEIWDYVKRPNLRLIGVPESDVENGTKLENTLQDIIQENFPNLARQANVQIQEIQRTPQRYSSRRATPRHIIVRFTKVEMKEKMLRAAREKGRVTLKGKPIRLTADLSAETLQARREWGPIFNILKEKNFQPRISYPAKLSFISEGEIKYFIDKQMLRDFVTTRPALKELLKEALNMERNNRYQPLQNHAKM"});
    // });
  } else {
    // const regex = /[A-Z]+\d?_+\d+_?[A-Z]*\d*_*\d*[A-Z]*/gm;
    var fam_name = req.originalUrl.slice(10);
    // let m;
    // var data_name = [];
    // var family_name = [];
    // var text_string=[];
    //
    //
    // while ((m = regex.exec(str)) !== null) {
    //     // This is necessary to avoid infinite loops with zero-width matches
    //     if (m.index === regex.lastIndex) {
    //         regex.lastIndex++;
    //     }
    //
    //     // The result can be accessed through the `m`-variable.
    //     m.forEach((match, groupIndex) => {
    //         // console.log(`${match}`);
    //         data_name.push(match)
    //
    //     });
    // }
    // var i;
    // for (i = 0; i < data_name.length; i++) {
    //
    //   // Checks for name such as LINE_1_HS_101
    //     if (data_name[i].slice(0,4) == "LINE"){
    //       family_name.push(data_name[i])
    //     } else{
    //   // Name such as HS_101
    //       family_name.push("LINE_1_"+data_name[i])
    //     }
    // }
    //
    //   var j;
    //   for (j = 0; j < family_name.length; j++) {
    //     text_string.push({"Family":family_name[j]})
      // }
      // console.log(fam_name)
    mongoose.model("seqview1").find({"Family":fam_name}, function(err, posts) {
      res.json(posts);
    });
  }
  });
module.exports = router;
