var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");


router.get("/", (req, res) => {
  console.log("Connection |", "Method:", req.method + " |", "URL:", req.get('host') + req.originalUrl);

  const Error_404_msg = {
    Status: "Not Found",
    Code: 404,
    Message:  " does not exist in the database.",
    moreInfoUrl: "http://www.rtpea.com/status/404"
  };

  mongoose.model("table1").find({"pxd":"PXD002211"}, function(err, posts) {
      res.json(posts[0]);
});
}
)



module.exports = router;
