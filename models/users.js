var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usersSchema = new Schema ({
	_id: Schema.Types.ObjectId,
	name: String,
	age: Number
});

mongoose.model("users", usersSchema);
//
