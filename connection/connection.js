const mongoose = require("mongoose");

//ES6 Promises
mongoose.Promise = global.Promise;

//Connect to the db before tests run
before(function(done){
  //connect to mongodb
  mongoose.connect("mongodb://localhost/retroelement");
  mongoose.connection.once("open", function(){
    console.log("Connection Created");
    done();
  }).on("error", function(error){
    console.log("Connection Error:", error);
  });
})
