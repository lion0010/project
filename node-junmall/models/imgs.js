var mongoose =require('mongoose')
var userSchema = new mongoose.Schema({
	"imgId":String,
	"imgName":String,
	"imgSort":String,
	"imgLink":String,
})
module.exports = mongoose.model("img",userSchema);
