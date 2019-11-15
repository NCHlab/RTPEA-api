var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var ideogram122 = new Schema({
  _id : Schema.Types.ObjectId,
  annotations: Array
  });





module.exports = mongoose.model("ideogram122", ideogram122);
