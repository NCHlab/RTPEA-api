var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var ideogram1 = new Schema({
  _id : Schema.Types.ObjectId
  });





module.exports = mongoose.model("ideogram1", ideogram1);