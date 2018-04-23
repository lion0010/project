## 技术栈

vue2 + vuex + vue-router +axios+ element-ui+ webpack + ES6/7 + flex + svg

## 项目运行

### 本地环境


```
第一步：先克隆项目到本地
git clone: https://github.com/lion0010/project.git
第二步：npm i安装依赖
npm install
第三步： 运行项目
npm run dev
```

# 目标功能
### 前台页面
- [x] 登录、注册 -- 完成
- [x] 登出 -- 完成
- [x] 加入购物车 -- 完成
- [x] 购物车计算 -- 完成
- [x] 添加、删除、收货地址 -- 完成
- [x] 下单功能 -- 完成
- [x] 商品详情 -- 完成
- [ ] 个人中心 -- 
- [ ] 上传头像 -- 
- [ ] 订单列表 -- 
- [ ] 订单详情 -- 
- [ ] 付款 -- 这个目前没有实现
### 后台页面
- [x] 登录 -- 完成
- [x] 登出 -- 完成
- [x] 查看用户列表 -- 完成
- [x] 查看商品列表 -- 完成
- [x] 对商品增删改查 -- 完成
- [x] 首页轮播图设置（增删） -- 完成
- [ ] 订单管理 -- 努力建设中
- [ ] 爬虫设置 -- 研究中


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
