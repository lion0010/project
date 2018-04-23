# 前言

## 技术栈

node + express + mongoose + formidable + uuid + axios + cheerio 

注：商品数据来自于爬虫

## 项目运行

第一步：启动本地mongodb数据库
mongod --dbpath 你的mongodb数据路径
第二步：导入数据
mongorestore --drop d:\db
第三步： npm i 安装依赖
npm install
第四步：启动node服务
npm start

```
#### db数据库文件包含商品数据，如需更新数据请运行爬虫程序

---

### 启动爬虫

#### 注：启动爬虫程序前，请删除数据库中的shops表，否则会导致爬虫数据重复.
```
cd bin
node webpp
正在爬取第1页...
连接MongoDB成功
成功存储第1页
正在爬取第2页,请耐心稍等...
成功存储第2页
正在爬取第3页,请耐心稍等...
成功存储第3页
....
爬取数据完成!

```


## 另外
此项目需要配套的前端运行：[前端项目传送地址](https://github.com/Apple-ljj/vue-junmall.git)。

# 效果演示

### [前端演示](http://120.78.185.163/junmall/#/) （请用chrome浏览器或者极速模式查看）

### [后台演示](http://120.78.185.163/junmall/#/admin) （请用chrome浏览器或者极速模式查看）



# 目标功能
- [x] 登录 -- 完成
- [x] 登出 -- 完成
- [x] 查看用户列表 -- 完成
- [x] 查看商品列表 -- 完成
- [x] 对商品增删改查 -- 完成
- [x] 首页轮播图设置（增删） -- 完成
- [ ] 爬虫设置 -- 努力建设中


# 项目目录

```
├── bin                                         // 启动目录
│   ├── www                                     // 启动后台项目
│   ├── webpp.js                                // 启动爬虫
├── db                                          // 数据库文件（备份）
├── models                                      // 数据库模型目录
│   ├── admins.js                               // 管理员模型
│   ├── users.js                                // 用户数据模型
│   ├── imgs.js                                 // 首页轮播图模型
│   ├── goods.js                                // 商品数据模型
│   ├── shop.js                                 // 商品数据模型(爬虫)
├── public                                      // 公共资源目录
│   ├── images                                  // 公共图片目录（上传图片的存放路径）
│   ├── javascripts                             // js目录
│   ├── stylesheets                             // css目录
├── routes                                      // 数据库模型目录
│   ├── admins.js                               // 管理员路由
│   ├── users.js                                // 用户数路由
│   ├── goods.js                                // 商品路由
│   ├── index.js                                // 这个路由暂时没用
├── views                                       // 静态视图目录
├──app.js                                       // 全局配置
├── package.json                                // 依赖文件
```
