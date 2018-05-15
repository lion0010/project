 var express = require('express');
 var router =express.Router();
 var mongoose =require("mongoose");
 // var Goods =require('../models/goods')
 var Goods =require('../models/shops')//爬虫得回来的数据
 var User =require('../models/users')

 //定义router 查询商品
 router.get("/list",function(req,res,next){
    //param接受前端参数
  let page = parseInt(req.param("page")) || 1;
    var pageSize = parseInt(req.param("pageSize")) || 8,
    priceLevel= req.param("priceLevel") || 'all',
    sort = req.param("sort") || 1,
    sortGoodsBySalesFlag = req.param("sortGoodsBySalesFlag") || 1,
    sortBySales = req.param('sortBySales') || false,
    skip = (page-1)*pageSize,               // 跳过多少条
    classifynum= req.param("classify"),     // 类别
    priceGt =req.param("priceGt") || 0,
    priceLte=req.param("priceLte") || 0,
    shopname=req.param("shopName");
    shopid=req.param("shopid"),
    params = {};
    //商品分类
    if(classifynum!==undefined){
      params={
        classify:classifynum,
      }
    }
    //模糊搜索
    if(shopname!==undefined){
      params = {
        productName:{ $regex:shopname }
      };
      //获取搜索条数
      Goods.find(params).count(function(err, res){counts=res});
    }
    //按分类筛选价格
    if(priceLevel!=='all'&&classifynum){
      params={
        salePrice:{
          $gt:priceGt,
          $lte:priceLte,
        },
        classify: classifynum
      }
    }
    // 按商品名称筛选
    if(priceLevel!=='all'&&shopname){
      params= {
        salePrice:{
          $gt:priceGt,
          $lte:priceLte,
        },
        productName:{ $regex:shopname }
      }
    }

    //根据id查询商品信息
    if (shopid) {
      params= {
        productId: shopid
      }
    }

    //总条数
    Goods.count(function(err, res){
      if(err){
      }else{
        counts=res
      }
    })
  // //Goods.find(params)查找所有数据 skipt跳过条数limit()获取多少跳
  let goodsModel=Goods.find(params).skip(skip).limit(pageSize);
   if (sortBySales === 'true') {
    goodsModel.sort({"sales": sortGoodsBySalesFlag})
   } else {
    // //sort排序
    goodsModel.sort({"salePrice":sort})//1升序  -1降序
   }

   goodsModel.exec({},function(err,doc){
    if (err) {
      res.json({
        status:"1",
        mag:err.message
      });
    }else{
      res.json({
        status:"0",
        msg:'',
        result:{
          counts:counts,
          count:doc.length,
          list:doc
        }
      })
    }
  })
 });
 //加入购物车
 router.post("/addCart",function(req,res,next){
  var userId = req.cookies.userId,
      productId=req.body.productId,
      num=req.body.num,
      shopnum=parseInt(num),
      checked=req.body.checked,checked;
 	//查询userId
if(userId===undefined){
      res.json({
        status:"2",
        mas:'用户未登录'
      })
      return false;
}
 	User.findOne({userId:userId},function(err,userdoc){
 		if(err){
 			res.json({
 				status:"1",
 				mas:err.message
 			})
 		}else{
      //查询到用户信息后
 			if(userdoc){
        let goodsItme =''
        userdoc.cartList.forEach(function(item){
          //判断传过来的ID存不存在
          if(item.productId==productId){
            goodsItme=item;
            item.productNum=parseInt(item.productNum)+shopnum;
          }
        })
        // goodsItme.productNum=num
        if(goodsItme){
            userdoc.save(function(err2,doc2){
              if(err2){
                res.json({
                  status:"1",
                  mas:err2.message
                })
              }else{
                res.json({
                  status:"0",
                  mas:'',
                  result:'成功'
                })
              }
            })
        }else{
          //通过ID查询商品表 的商品 
          Goods.findOne({productId:productId},function(err1,doc){
            if(err1){
              res.json({
                status:"1",
                mas:err1.message
              })
            }else{
              if(doc){
                doc.productNum=num;
                doc.checked=1;
                doc.classify = doc.classify;
                userdoc.cartList.push(doc);
                userdoc.save(function(err2,doc2){
                  if(err2){
                    res.json({
                      status:"1",
                      mas:err2.message
                    })
                  }else{
                    res.json({
                      status:"0",
                      mas:'',
                      result:'成功'
                    })
                  }
                })
              }
            }
          })
        }
 			}
 		}
 	})
 })

 // 获取商品详情的方法
 router.get("/getProductDetail", function (req, res, next) {
   let id = req.query.id
   Goods.findOne({
     productId: id
   }, function (err, doc) {
     if (err) {
       res.json({
         status: '1',
         msg: err.message
       })
     } else {
       if (doc.length === 0) {
         res.json({
           status: '0',
           msg: '该商品已下架,您已无法评论'
         })
       } else {
         let obj = {}
         obj.productImage = doc['productImage']
         obj.productName = doc['productName']
         res.json({
           status: '0',
           result: obj
         })
       }
     }
   })
 })

 // 搜索框
 router.get("/searchGoods", function(req, res, next) {
  let page = parseInt(req.param("page")) || 1,
      pageSize = parseInt(req.param("pageSize")) || 8,
      shopname = req.param('searchKey') || '';
  let params = {
    productName: { $regex:shopname }
  }
  Goods.find(params, function(err, doc){
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      let len = doc.length > 20 ? 20 : doc.length;
      let tempArr = []
      for (let i = 0; i < len; i ++) {
        let tempObj = {}
        tempObj.value = doc[i]['productName']
        tempArr.push(tempObj)
      }
      res.json({
        status: '0',
        result: tempArr
      })
    }
  });
 })

 module.exports = router;//输出router