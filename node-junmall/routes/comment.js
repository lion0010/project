let express = require('express');
let router = express.Router();
let Comment = require('../models/comments')
var User =require('../models/users')
let uuidv1 = require('uuid/v1');
let uuidv4 = require('uuid/v4');

//保存评论的接口
router.post('/saveComment', function (req, res, next) {
  let userId = req.cookies.userId;
  let userName = req.cookies.userName;
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
          commentId: doc[0]['commentId'],
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
          userName,
          productId,
          content,
          time: date,
          commentPic: '',
          Avator: '',
          commentId: uuidv4(),
          supportId: []
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

// 获取用户评论
router.get('/getComment', function (req, res, next) {
  let productId = req.query.productId
  console.log(productId)
  Comment.find({
    productId: productId
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      let tempObj = []
      for(let i = 0, len = doc.length; i < len; i ++) {
        let obj = {}
        let userId = doc[i]['userId']
        obj.comment = doc[i]['content']
        obj.userName = doc[i]['userName']
        obj.time = doc[i]['time']
        obj.commentId = doc[i]['commentId']
        obj.isUse = doc[i]['supportId']
        tempObj.push(obj)
      }
      res.json({
        status: '0',
        result: tempObj
      })
    }
  })
})

// 更新点赞数
router.post('/updateUse', function(req, res, next) {
  console.log(res)
  let commentId = req.body.commentId
  let supportId = req.body.supportId
  console.log(commentId)
  console.log(supportId)
  Comment.update({ commentId: commentId }, { supportId: supportId }, function (err, doc) {
    if (err) {
      res.json({
        staus: '1',
        message: err.message
      })
    } else {
      res.json({
        status: '0',
        message: '点赞成功'
      })
    }
  })
})
module.exports = router;