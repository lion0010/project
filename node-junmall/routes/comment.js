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
        Comment.update({
          commentId: doc[0]['commentId']
        }, {
          content,
          time: date
        }, function (err, doc) {
          if (err) {
            res.json({
              status: '1',
              msg: err.msssage
            })
          } else {
            res.json({
              status: '0',
              msg: '更新评论成功'
            })
          }
        })
      } else {
        Comment.create({
          userId,
          productId,
          content,
          time: date,
          commentPic: '',
          Avator: '',
          commentId: uuidv4()
        }, function(err, doc) {
          if (err) {
            res.json({
              status: '1',
              msg: err.message
            })
          } else {
            res.json({
              status: '0',
              msg: '评论成功'
            })
          }
        })
      }
    }
  })
})

module.exports = router;