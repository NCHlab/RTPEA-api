var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var pride_table = new Schema({
      _id : Schema.Types.ObjectId,
      PXD : String,
      study : String,
      disease : String,
      sample : [
        {
        1: [
          {
            replicate: Number,
            file_name: String,
            phenotype: String,
            tissue_type: String,
            ORF1p: {
              confidence: Number
            }
          }
        ]
      }
    ]
  });





module.exports = mongoose.model("pride_table", pride_table);
