# 前言

### 我是一名来者广州的前端开发者，梦想成为一名全栈工程师，为了这个梦，不断在网络上探索，在探索学习的过程中，做了这一个项目练手，原本只想一个商品列表和购物车，但是后来自己觉得就写那么少，觉得不够，不满足，就越写越多。。。。（源码包含大量注释，拥有非常好的可读性）

## 技术栈

vue2 + vuex + vue-router +axios+ element-ui+ webpack + ES6/7 + flex + svg

## 项目运行

### 本地环境

#### 注意：由于涉及大量的 ES6/7 等新属性，node 需要 6.0 以上版本 

```
git clone https://github.com/Apple-ljj/vue-junmall.git

cd vue-junmall-master

npm install

npm run dev
```
### 线上环境

```
系统：ubuntu 14.04 nginx 1.6.4

注意：部署上线需要使用nginx反向代理
```

# 效果演示

### [前端演示](http://120.78.185.163/junmall/#/) （请用chrome浏览器或者极速模式查看）
### [后台演示](http://120.78.185.163/junmall/#/admin) （请用chrome浏览器或者极速模式查看）


# 另外

此项目有配套的后台系统，如果想体验前后台同时开发，可以下载对应的后台系统：[后台项目传送地址](https://github.com/Apple-ljj/node-junmall.git)。
### 注：使用本地服务端请修改代理，路径./config/index.js，默认是本人服务器代理

```
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        //本地服务端请使用下面代理
        '/goods':{
            target:'http://localhost:3000'
        },
        '/goods/*':{
            target:'http://localhost:3000'
        },
        '/users/**':{
            target:'http://localhost:3000'
        },
        '/admin/**':{
            target:'http://localhost:3000'
        }
    },

```

# 说明

>  如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

>  或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

>  开发环境 windows7 64位  Chrome 63  nodejs 8.9.3

>  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍

>  开源爱好者交流群：18994445 (QQ群)

# 目标功能
### 前台页面
- [x] 登录、注册 -- 完成
- [x] 登出 -- 完成
- [x] 加入购物车 -- 完成
- [x] 购物车计算 -- 完成
- [x] 添加、删除、收货地址 -- 完成
- [x] 下单功能 -- 完成
- [x] 商品详情 -- 完成
- [ ] 个人中心 -- 弄不弄好呢? 好纠结啊~~
- [ ] 上传头像 -- 上面的没完成,这个没办法做,呜呜呜~~
- [ ] 订单列表 -- 上面的没完成,这个没办法做,呜呜呜~~
- [ ] 订单详情 -- 上面的没完成,这个没办法做,呜呜呜~~(重要是事情要说三遍)
- [ ] 付款 -- 臣妾做不到啊~~
### 后台页面
- [x] 登录 -- 完成
- [x] 登出 -- 完成
- [x] 查看用户列表 -- 完成
- [x] 查看商品列表 -- 完成
- [x] 对商品增删改查 -- 完成
- [x] 首页轮播图设置（增删） -- 完成
- [ ] 订单管理 -- 努力建设中
- [ ] 爬虫设置 -- 研究中

# 总结

项目写到现在，从登录注册到、首页、全部商品、加入购物车、添加删除收货地址、下单、后台管理页面的编写，一个流程走完之后、不但对vue的理解更深一层，而且对node也有了进一步的认识，做一个实际的项目才能对自己有很大的提升曾一度怀疑，花一个多月的时间做这样一个项目到底有没有意义，本来只是想做一个小项目练练手，没想到后来越写越多，不过坚持下来后我相信一切都是值得的。

# 项目布局

```
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── src                                         // 源码目录
│   ├── assets                                  // 样式目录
│   ├── components                              // 公用组件
│   │   ├── Header.vue                          // 头部组件
│   │   ├── Bread.vue                           // 面包屑组件
│   │   ├── Footer.vue                          // 底部组件
│   │   ├── Modal.vue                           // 模态框组件
│   ├── router                                  // 路由目录
│   │   ├── index.js                            // 路由配置
│   ├── util                                    // 工具插件目录
│   │   ├── currency.js                         // 格式化价格工具
│   ├── views                                   // 主要页面
│   │   ├── admin                               // 后台管理页面
│   │   │   ├── admin.vue                       // 后台登录页面
│   │   │   ├── home.vue                        // 后台主页页面
│   │   │   ├── userlist.vue                    // 后台用户列表页
│   │   │   ├── shoplist.vue                    // 后台商品列表页
│   │   │   ├── imglist.vue                     // 后台图片列表页
│   │   │   ├── about.vue                       // 后台于我页面
│   │   │   ├── test.vue                        // 后台测试页面
│   │   ├── Index.vue                           // 前台首页
│   │   ├── GoodsList.vue                       // 前台全部商品页
│   │   ├── GoodsShop.vue                       // 前台商品详情页
│   │   ├── Cart.vue                            // 前台购物车页
│   │   ├── Address.vue                         // 前台收货地址页
│   │   ├── OrderConfirm.vue                    // 前端下单页
│   │   ├── orderSuccess.vue                    // 前端下单成功页
│   ├── Vuex                                    // Vuex目录
│   │   ├── store.js                            // Vuex配置
│   ├── App.vue                                 // 总组件（渲染页面）
│   ├── main.js                                 // 入口文件
├── static                                      // 静态资源目录
├── index.html                                  // html入口文件
├── favicon.ico                                 // 图标
├── package.json                                // 依赖文件
```
