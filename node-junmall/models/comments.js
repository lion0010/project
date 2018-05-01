let mongoose = require('mongoose')
let commentSchema = new mongoose.Schema({
  "userId": String,
  "userName": String,
  "productId": String,
  "content": String,
  "time": String,
  "commentPic": String,
  "avator": String,
  "commentId": String,
  "supportId": Array
})

module.exports = mongoose.model('comment', commentSchema)