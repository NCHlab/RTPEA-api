var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");


router.get("/:pxdid/:tissue/:state/:siftScore/", (req, res) => {
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
   
  state = req.params.state.replace("search","").replace("undefined","")
   
   
  mongoose.model("visualise1").find({PXD: req.params.pxdid }, function(err, posts) {

    var healthyData = []
    var diseasedData = []
    var bothData = []
    //console.log(posts[0].features[0].consequence3)

    //console.log("test")
    posts[0].features.forEach(function(features) {
        //console.log(features.consequence3);
        
              
            //  "consequence" : "liver",
            //"consequence2" : "",
            //"consequence3" : "meta_missing",
            //
        if (state === "healthy" || state === "normal"){
          if ( features.consequence === req.params.tissue && ['healthy','normal'].includes(features.consequence3) && features.siftScore >= parseFloat(req.params.siftScore)/100 || features.category === "DOMAINS_AND_SITES"){
            healthyData.push(features)
          }
        } else if (state === "diseased") {
            if ( features.consequence === req.params.tissue && !['healthy','normal'].includes(features.consequence3) && features.siftScore >= parseFloat(req.params.siftScore)/100  || features.category === "DOMAINS_AND_SITES"){
              if (features['consequence2'].includes('diseased')){
                features['consequence'] += ' diseased'
                diseasedData.push(features)
              
            } 
          }
        }
        
        
        if (features.consequence === req.params.tissue && features.siftScore >= parseFloat(req.params.siftScore)/100 || features.category === "DOMAINS_AND_SITES"){
          if (features['consequence2'].includes('diseased')){
                features['consequence'] += ' diseased'
          }
          if (features['consequence3'].includes('meta_missing')){
                features['consequence'] += ' meta_missing'
          }
                bothData.push(features)
              }
    })
    
    
    if (state === 'healthy' || state === 'normal'){
      posts[0].features = healthyData
    } else if (state === 'diseased') {
      posts[0].features = diseasedData
    } else {
      posts[0].features = bothData
      
    }
    res.json(posts);
    //res.json(listOfData);

  });
  
  //return res.json(req.params.state)
});




module.exports = router;