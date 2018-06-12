var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var table_data = new Schema({
  _id : Schema.Types.ObjectId,
  pxd_id : String,
  tissue_type : String,
  study : String,
  disease : String,
  name : {
      name : String,
      sample : Number,
      replicate : Number,
      ORF1p: Number,
      ORF2p: Number,
      ORF0: Number
    }
  });





module.exports = mongoose.model("table1", table_data);
// mongoose.model("prideid", {name: String});


//
//
// var pridedata = new Schema({
//     _id : Schema.Types.ObjectId,
//     pxd_id : {
//         _id : String,
//         tissue_type : String,
//         study : String,
//         disease : String
//     },
//     name2 : [
//         {
//             name : String,
//             sample : Number,
//             replicate : Number,
//             ORF1p : Number,
//             ORF2p : Number,
//             ORF0 : Number
//         },
//         {
//             name : String,
//             sample : Number,
//             replicate : Number
//         },
//         {
//             name : String,
//             sample : Number,
//             replicate : Number
//         },
//         {
//             name : String,
//             sample : Number,
//             replicate : Number
//         }
//     ]
//     });


// var pridedata = new Schema({
//     _id: Schema.Types.ObjectId,
//     pxd_id: {
//       type: Schema.Types.ObjectId,
//       tissue_type: String
//     },
//     pxd_name: {
//       pxd_name1: {
//         type: Schema.Types.ObjectId,
//         name: String
//       }
//     }
// });

// var pridedata = new Schema({
//     _id: Schema.Types.ObjectId,
//     pxd_id: {
//       // type: Schema.ObjectId,
//       tissue_type: String,
//       study: String,
//       disease: String
//     },
//     pxd_name: {
//       // type: Schema.ObjectId,
//       name: String,
//       sample: String,
//       replicate: String,
//       ORF1p: String,
//       ORF2p: String,
//       ORF0: String
//     }
// });
