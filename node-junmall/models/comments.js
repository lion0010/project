let mongoose = require('mongoose')
let commentSchema = new mongoose.Schema({
  "userId": String,
  "productId": String,
  "content": String,
  "time": String,
  "commentPic": String,
  "avator": String,
  "commentId": String
})

module.exports = mongoose.model('comment', commentSchema)