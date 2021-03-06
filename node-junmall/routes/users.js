var express = require('express');
var router = express.Router();
var User = require("../models/users.js")
var Goods = require('../models/shops')
var mongoose = require("mongoose");
var uuidv1 = require('uuid/v1');
var uuidv4 = require('uuid/v4');

//注册接口
router.post('/Signup', function (req, res, next) {
	var userName = req.body.userName,
		userPwd = req.body.userPwd,
		userEmail = req.body.userEmail;
	User.findOne({
		userName: userName
	}, function (err, doc) {
		if (err) {
			res.json({
				status: '1',
				msg: err.message,
				result: ''
			})

		} else if (doc) {
			res.json({
				status: '2',
				msg: "用户名已存在",
				result: ""
			})

		} else {
			var date = new Date().getTime()
			var datas = new Date(date).toLocaleString().replace(/\//g, "-");
			User.create({
				userId: uuidv1(),
				userName: userName,
				userPwd: userPwd,
				userEmail: userEmail,
				createTime: datas
			}, function (err, doc) {
				if (err) {
					res.json({
						status: '1',
						msg: err.message,
						result: ''
					})
				} else {
					res.json({
						status: '0',
						msg: "注册成功",
						result: ""
					})
				}
			});
		}
	})
})
//登陆接口
router.post('/login', function (req, res, next) {
	let param = {
		userName: req.body.userName,
		userPwd: req.body.userPwd
	}
	User.findOne(param, function (err, doc) {
		if (err) {
			res.json({
				status: '1',
				msg: err.message
			})
		} else {
			if (doc) {
				//cookie存储
				res.cookie("userId", doc.userId, {
					path: '/', //存储的路劲
					maxAge: 1000 * 60 * 60 * 24 //存储一天
				})
				res.cookie("userName", doc.userName, {
					path: '/', //存储的路劲
					maxAge: 1000 * 60 * 60 * 24 //存储一天
				})
				// req.session.user=doc;
				res.json({
					status: '0',
					msg: "",
					result: {
						userName: doc.userName
					}
				})
			} else {
				res.json({
					status: '2',
					msg: "输入不正确",
					result: ''
				})
			}
		}
	})
});
//登出接口
router.post("/logout", function (req, res, next) {
	//清楚cookie
	res.cookie("userId", "", {
		path: "/",
		maxAge: -1
	})
	res.json({
		status: '0',
		msg: "",
		result: ""
	})
})
//检测登录
router.get("/checklogin", function (req, res, next) {
	if (req.cookies.userId) {
		res.json({
			status: '0',
			msg: "",
			result: req.cookies.userName || ''
		})
	} else {
		res.json({
			status: '1',
			msg: "未登录",
			result: ''
		})
	}
})
//获取购物车
router.get("/getCart", function (req, res, next) {
	if (req.cookies && req.cookies.userId) {
		var userId = req.cookies.userId
		User.findOne({
			userId: userId
		}, function (err, doc) {
			if (err) {
				res.json({
					status: "1",
					msg: err.message,
					result: ''
				})
			} else {
				var cartList = doc.cartList;
				let carCount = 0;
				cartList.map(function (item) {
					carCount += parseInt(item.productNum)
				})
				res.json({
					status: "0",
					msg: '',
					result: carCount
				})
			}
		})
	}
})
//查询当前用户的购物车列表
router.post("/CartList", function (req, res, next) {
	//获取用户ID
	var userId = req.cookies.userId,
		productId = req.body.productId;

	if (productId === "undefined" || productId === undefined || productId == null) {
		User.findOne({
			userId: userId
		}, function (err, doc) {
			if (err) {
				res.json({
					status: "1",
					msg: err.message,
					result: ''
				})
			} else {
				res.json({
					status: "0",
					msg: '',
					result: doc.cartList
				})
			}
		})
	} else {

		Goods.find({
			"productId": productId
		}, function (err, doc) {
			res.json({
				status: "0",
				msg: '',
				result: doc
			})
		})
	}

})
// //购物车删除
router.post("/cartdel", function (req, res, next) {
	var userId = req.cookies.userId,
		productId = req.body.productId;
	User.update({
		userId: userId
	}, {
		$pull: {
			'cartList': {
				'productId': productId
			}
		}

	}, function (err, doc) {
		if (err) {
			res.json({
				status: "1",
				msg: err.message,
				result: ''
			})
		} else {
			res.json({
				status: "0",
				msg: '',
				result: 'suc'
			})
		}
	})
})
//修改商品数量
router.post("/editCart", function (req, res, next) {
	var userId = req.cookies.userId,
		productId = req.body.productId,
		productNum = req.body.productNum,
		checked = req.body.checked;
	//通过查找ID和商品ID
	User.update({
		"userId": userId,
		"cartList.productId": productId
	}, {
		//修改数量
		"cartList.$.productNum": productNum,
		"cartList.$.checked": checked,
	}, function (err, doc) {
		if (err) {
			res.json({
				status: '1',
				msg: err.message,
				result: ''
			});
		} else {
			res.json({
				status: '0',
				msg: '',
				result: 'suc'
			});
		}
	})
})
//全选反选传入后台
router.post("/editCheckAll", function (req, res, next) {
	var userId = req.cookies.userId,
		checkAll = req.body.checkAll ? '1' : '0';
	User.findOne({
		userId: userId
	}, function (err, user) {
		if (err) {
			res.json({
				status: '1',
				msg: err.message,
				result: ''
			});
		} else {
			if (user) {
				user.cartList.forEach((itme) => {
					itme.checked = checkAll;
				})
				user.save(function (err1, doc) {
					if (err1) {
						res.json({
							status: '1',
							msg: err.message,
							result: ''
						});
					} else {
						res.json({
							status: '0',
							msg: '',
							result: 'suc'
						});
					}
				})
			}
		}
	})
})
//地址列表查询
router.get('/addressList', function (req, res, next) {
	var userId = req.cookies.userId;
	User.findOne({
		userId: userId
	}, function (err, doc) {
		if (err) {
			res.json({
				status: '1',
				msg: err.message,
				result: ''
			})
		} else {
			var addressList = doc.addressList.sort({
				"salePrice": 1
			}) //1升序  -1降序
			res.json({
				status: '0',
				mas: '',
				result: addressList
			})
		}
	})

})
//设置默认地址
router.post('/setDefault', function (req, res, next) {
	var userId = req.cookies.userId;
	var addressId = req.body.addressId;
	if (!addressId) {
		res.json({
			status: '1003',
			msg: 'addressId为空',
			result: ''
		})
	} else {
		User.findOne({
			userId: userId
		}, function (err, doc) {
			if (err) {
				res.json({
					status: '1',
					msg: err.message,
					result: ''
				})

			} else {

				var addressList = doc.addressList;
				addressList.forEach((itme) => {
					if (itme.addressId == addressId) {
						itme.isDefault = true;
					} else {
						itme.isDefault = false;
					}
				})
			}
			doc.save(function (err1, doc1) {
				if (err1) {
					res.json({
						status: '1',
						msg: err1.message,
						result: ''
					})

				} else {
					res.json({
						status: '0',
						msg: '',
						result: ''
					})
				}
			})
		})
	}
})
//添加地址
router.post('/addAddress', function (req, res, next) {
	var userId = req.cookies.userId;
	userName = req.body.userName,
		postCode = req.body.postCode,
		streetName = req.body.streetName,
		tel = req.body.tel;
	User.findOne({
		userId: userId
	}, function (err, doc) {
		if (err) {
			res.json({
				status: '1',
				msg: err.message,
				result: ''
			});
		} else {
			User.update({
				userId: userId
			}, {
				$push: {
					'addressList': {
						'addressId': uuidv4(),
						'userName': userName,
						'streetName': streetName,
						'postCode': postCode,
						'tel': tel,
						'isDefault': true
					}
				}

			}, function (err, doc) {
				if (err) {
					res.json({
						status: "1",
						msg: err.message,
						result: ''
					})
				} else {
					res.json({
						status: "0",
						msg: '',
						result: 'suc'
					})
				}
			})
		}
	})
})
//删除地址接口
router.post('/delAddress', function (req, res, next) {
	var userId = req.cookies.userId,
		addressId = req.body.addressId;
	User.update({
		userId: userId
	}, {
		$pull: {
			'addressList': {
				'addressId': addressId
			}
		}

	}, function (err, doc) {
		if (err) {
			res.json({
				status: "1",
				msg: err.message,
				result: ''
			})
		} else {
			res.json({
				status: "0",
				msg: '添加成功',
				result: ''
			})
		}
	})
})
router.post('/payMent', function (req, res, next) {
	var userId = req.cookies.userId,
		ordertotal = req.body.ordertotal,
		addressId = req.body.addressId,
		productId = req.body.productId;
	User.findOne({
		userId: userId
	}, function (err, doc) {
		if (err) {
			res.json({
				status: "1",
				msg: err.message,
				result: ''
			})
		} else {

			var address = '',
				goodsList = [],
				goodorder;
			//获取用户的地址
			doc.addressList.forEach((item) => {
				if (addressId == item.addressId) {
					address = item;
				}
			})
			if (productId == "undefined" || productId == undefined) {
				doc.cartList.forEach((item) => {
					if (item.checked == '1') {
						//把购物车商品 插入goodsList
						goodsList.push(item);
						// 更新商品销售数量
						Goods.findOne({
							productId: item['productId']
						}, function(err, doc) {
							var num = 0
							let tempObj = doc.sales + ''
							if (isNaN(tempObj === 'null')) {
								num = 0
							} else {
								num = parseInt(doc['sales']) || 0
							}
							let total = num + parseInt(item['productNum'])
							Goods.update({
								productId: item['productId']
							}, {'sales': total}, function (err, doc){})
						})
						//删除购物车以下单的商品
						User.update({
							userId: userId
						}, {
							$pull: {
								'cartList': {
									'productId': item.productId
								}
							}
						}, function (err, doc) {})
					};
				});
				addorder(ordertotal, address, goodsList)

			} else {
				Goods.find({
					"productId": productId
				}, function (err1, doc1) {
					// 更新商品销量
					Goods.findOne({
						productId: item['productId']
					}, function(err, doc) {
						console.log(doc)
						Goods.update({
							productId: item['productId']
						}, {$set: {'sales': parseInt((doc['sales'] || 0)) + parseInt(item['productName'])}})
					})
					addorder(ordertotal, address, doc1)
				})

			}
			//添加订单函数
			function addorder(ordertotal, address, goodsList) {
				var platform = '888'
				var r1 = Math.floor(Math.random() * 10);
				var r2 = Math.floor(Math.random() * 10);
				var date = new Date().getTime()
				var datas = new Date(date).toLocaleString().replace(/\//g, "-");
				var orderId = platform + r1 + date + r2

				User.update({
					userId: userId
				}, {
					$push: {
						'orderList': {
							orderId: orderId,
							orderTotal: ordertotal,
							addressInfo: address,
							goodsList: goodsList,
							orderStatus: '1',
							createData: datas,
						}
					}
				}, function (err, doc) {
					if (err) {
						res.json({
							status: "1",
							msg: err.message,
							result: ''
						})
					} else {
						res.json({
							status: "0",
							msg: '',
							result: {
								orderId: orderId,
								orderTotal: ordertotal,
							}
						})
					}
				})

			}

		}

	})
})
//根据订单id查询订单信息
router.get('/orderDetail', function (req, res, next) {
	var userId = req.cookies.userId,
		orderId = req.param('orderId'); //get获取参数param()
	User.findOne({
		userId: userId
	}, function (err, doc) {
		if (err) {
			res.json({
				status: '1',
				msg: err.message,
				result: ''
			})
		} else {
			var orderList = doc.orderList;

			if (orderList.length > 0) {
				var order = '';
				orderList.forEach((item) => {
					if (item.orderId == orderId) {
						order = item;
					}
				})
				if (order != '') {
					res.json({
						status: '0',
						msg: '',
						result: {
							orderTotal: order.orderTotal,
							orderId: order.orderId
						}
					})
				} else {
					res.json({
						status: '2',
						msg: '订单不存在',
						result: '',
					})
				}

			} else {
				res.json({
					status: '3',
					msg: '当前用户无订单',
					result: ''
				})
			}

		}
	})
})
// 获取用户订单列表
router.get('/order', function (req, res, next) {
	let userId = req.cookies.userId;
	let isSelectedUserId = req.query['SelectedUserId']
	if (isSelectedUserId === 'true') {
		userId = req.query['userId']
	}

	User.find({
		userId
	}, function (err, doc) {
		if (err) {
			res.json({
				status: '1',
				message: err.message
			})
		} else {

			let result = []
			let orderList = doc[0].orderList
			for (let i = 0, len = orderList.length; i < len; i ++) {
				let tempObj = {}
				tempObj.time = orderList[i].createData.split(' ')[0]
				tempObj.orderId = orderList[i].orderId
				tempObj.tableData = []
				let goods = orderList[i]['goodsList']
				for (let j = 0, length = goods.length; j < length; j ++) {
					let obj = {}
					obj.img = goods[j]['productImage']
					obj.detail = {}
					obj.detail.productName = goods[j]['productName']
					obj.detail.desc = goods[j]['details']
					obj.detail.productId = goods[j]['productId']
					obj.signal = goods[j]['salePrice']
					obj.number = goods[j]['productNum']
					obj.classify = goods[j]['classify']
					obj.productOpt = '',
					obj.realPayment = goods[j]['salePrice']
					obj.status = '交易成功'
					obj.comment = '评论'
					tempObj.tableData.push(obj)
				}
				result.push(tempObj)
			}
			res.json({
				status: '0',
				result: result
			})
		}
	})
})
// 获取用户列表
router.get('/userList', function (req, res,next) {
	User.find({}, function (err, doc) {
		if (err) {
			res.json({
				status: '1',
				message: err.message
			})
		} else {
			res.json({
				status: '0',
				data: doc
			})
		}
	})
})
module.exports = router;