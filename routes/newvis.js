var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");


router.get("/:pxdid/:tissue/:state/", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.originalUrl);

 // console.log("Connection |", "Method:", req.method + " |", "URL:",  req.get('host') + req.originalUrl);
  // const Error_404_msg = {
  //   Status: "Not Found",
  //   Code: 404,
  //   Message:  " does not exist in the database.",
  //   moreInfoUrl: "http://www.rtpea.com/status/404"
  // };
  //console.log(req.params.state)
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
  //console.log(req.params.pxdid)
  //console.log(req.params.tissue)
  //console.log(req.params.state)
  //console.log(req.params.state.replace("search",""))
  
  //req.params.state = req.params.state.replace("search","")
  // SORT THE REQ PARAMS WHEN MULTIPLE SELECTIONS
   
  state = req.params.state.replace("search","")
   
   
  mongoose.model("visualise1").find({PXD: req.params.pxdid }, function(err, posts) {

    var listOfData = []
    //console.log(posts[0].features[0].consequence3)

    posts[0].features.forEach(function(features) {
        //console.log(features.consequence3);
        
        if (state === 'healthy' || state === 'normal'){
          if ( features.consequence === req.params.tissue && ['healthy','normal'].includes(features.consequence3) || features.category === "DOMAINS_AND_SITES"){
            listOfData.push(features)
          } else {
            if ( features.consequence === req.params.tissue && !['healthy','normal'].includes(features.consequence3) || features.category === "DOMAINS_AND_SITES"){
              listOfData.push(features)
            }
          }
        }
        
        

    })
    
    //console.log([listOfStates,listOfTissues])
    posts[0].features = listOfData
    res.json(posts);
    //res.json(listOfData);

  });
  
  //return res.json(req.params.state)
});




module.exports = router;