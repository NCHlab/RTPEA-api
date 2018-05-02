var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var pride6 = new Schema({
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





module.exports = mongoose.model("pride6", pride6);

// {
//     _id : Schema.Types.ObjectId,
//     PXD : PXD002211,
//     study : Inflammation,
//     disease : healthy,
//     file : {
//         file_name : name.mgf,
//         phenotype : control,
//         tissue_type : HUVEC,
//         sample : 1.0,
//         replicate : 1.0,
//         ORF1p : 0.0,
//         ORF2p : 20.0,
//         ORF2p_data : {
//             total_peptides_identified : 2,
//             unique_peptides : 1,
//             validated_psm_matches : 3,
//             loci : chr10:109812438-109818457 5'pad=0 3'pad=0 strand=-,
//             PTMs : {
//                 fixed : n/a,
//                 variable : Oxidation of Methionine
//             }
//         },
//         ORF0 : 0.0,
//         ORF1p_variants : 0.0,
//         ORF2p_variants : 0.0,
//         HERV_proteins : 1.0,
//         protein : {
//             name : HERV-k,
//             total_peptides_identified : 2,
//             unique_peptides : 1,
//             validated_psm_matches : 3,
//             PTMs : none
//         }
//     }
