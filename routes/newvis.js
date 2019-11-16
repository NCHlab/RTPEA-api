var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");


router.get("/:pxdid/:tissue/:state/:siftScore/", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.originalUrl);

  state = req.params.state.replace("search","").replace("undefined","")
   
   
  mongoose.model("visualise1").find({PXD: req.params.pxdid }, function(err, posts) {

    var healthyData = []
    var diseasedData = []
    var bothData = []

    posts[0].features.forEach(function(features) {

        
        if (features.category === "PTM" && features.tissue === req.params.tissue){
          healthyData.push(features)
          diseasedData.push(features)
          bothData.push(features)
        } else if (features.category === "DOMAINS_AND_SITES"){
          healthyData.push(features)
          diseasedData.push(features)
          bothData.push(features)
        } else if (state === "healthy" || state === "normal"){
          if (features.consequence === req.params.tissue && ['healthy','normal'].includes(features.consequence3) && features.siftScore >= parseFloat(req.params.siftScore)/100){
            healthyData.push(features)
          }
        } else if (state === "diseased") {
            if (features.consequence === req.params.tissue && !['healthy','normal'].includes(features.consequence3) && features.siftScore >= parseFloat(req.params.siftScore)/100){
              if (features['consequence2'].includes('diseased')){
                features['consequence'] += ' diseased'
                diseasedData.push(features)
              
            } 
          }
        }
        
        
        if (features.consequence === req.params.tissue && features.siftScore >= parseFloat(req.params.siftScore)/100){
          if (features['consequence2'].includes('diseased')){
                features['consequence'] += ' diseased'
          }
          if (features['consequence3'].includes('meta_missing') && !features['consequence'].includes('meta_missing')){
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

  });
  
});




module.exports = router;