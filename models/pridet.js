var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var pridet = new Schema({
  _id : Schema.Types.ObjectId,
  PXD : String,
  study : String,
  disease : String
});





module.exports = mongoose.model("pridetable", pridet);
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
