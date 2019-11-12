var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var visualise1 = new Schema({
  _id : Schema.Types.ObjectId,
  PXD : String,
  sequence : String,
  features : Object,
  category: String,
  consequence : String,
  consequence2 : String,
  consequence3 : String,
  });





module.exports = mongoose.model("visualise1", visualise1);
