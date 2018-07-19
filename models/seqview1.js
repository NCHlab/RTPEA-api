var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var seqview1 = new Schema({
  _id : Schema.Types.ObjectId
  });





module.exports = mongoose.model("seqview1", seqview1);
