var fs = require('fs');

var mongoose = require('mongoose');
var generator = require('mongoose-gen');

// load json
var data = fs.readFileSync('./valid.json', {encoding: 'utf8'});
var valjson = JSON.parse(data);

// In the above _book.json_ file there is a `validateBookYear` token.
// mongoose-gen uses this token to lookup an actual validator function which
// should be registered beforehand. This is how to register validators.
// generator.setValidator('validateBookYear', function (value) {
//     return (value <= 2015);
// });

// Generate the Schema object.
var Schema = new mongoose.Schema(generator.convert(valjson));
console.log(schema);

// Connect to mongodb and bind the book model.
// mongoose.connect('mongodb://localhost:27017/test-mongoose-gen');
// var BookModel = mongoose.model('Book', BookSchema);
