let express = require('express');
let router = express.Router();
let Comment = require('../models/comments')
let uuidv1 = require('uuid/v1');
let uuidv4 = require('uuid/v4');

//保存评论的接口
router.post('/saveComment', function (req, res, next) {
  console.log(req)
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  let content = req.body.content;
  let time = new Date().getTime();
  let date = new Date(time).toLocaleString().replace(/\//g, "-");
  
  Comment.find({
    userId: userId,
    productId: productId
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (doc.length !== 0) {
        res.json({
          status: '0',
          msg: 'update'
        })
      } else {
        res.json({
          status: '0',
          msg: 'create'
        })
      }
    }
  })
})

module.exports = router;