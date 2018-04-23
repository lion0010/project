<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span>商品详情</span>
      </nav-bread>
<div v-for="(item,index) in GoodsShop">
  <el-row  class="Shop_Con">
      <el-col :md="8" :sm='12'>
        <div class="Shop_img" >
          <img v-lazy="item.productImage" width="100%">
        </div>
      </el-col>
       <el-col :md="10" :sm='12'>
         <div class="Shop_Title">
          {{item.productName}}
         </div>
          <div class="Shop_pic">
            <p style="padding-top:10px; text-decoration:line-through;">原价：<span>{{item.oldprice|currency('&yen')}}</span></p>
            <span class="Shop_picl">促销价：<i>{{item.salePrice|currency('&yen')}}</i></span>
            <span class="sales">已销量：<i>{{item.sales}}</i></span>
         </div>
         <div class="Shop_s">
           <p>颜色/款式：默认</p>
         </div>
          <div class="Shop_s">
           <p>尺码/规格：默认</p>
         </div>
         <div></div>
         <div>
           <div class="item-quantity Shop_num">
              <el-input-number style="float:left" v-model="num" :min="1" :max="88" ></el-input-number>
                <div  style="float:left;padding:10px 0px 0px 10px;">库存无限件</div>
          </div>

         </div>
          <div class="Shop_buy">
              <div class="btn-area">
                <a href="javascript:;" class="Shop_btn btn--m" style="background-color:#ef2f23;color:#FFF;width:40%;" @click="pay(item.productId)" >立即购买</a>
                <a href="javascript:;" class=" Shop_btn btn--m" @click="addCart(item.productId)" style="width:40%;border: 1px solid #ddd;">加入购物车</a>
              </div>
          </div>
          <div class="Shop_s">
           <p>服务承诺：10分钟闪电发货,7天无理由退货。</p>
         </div>
          <div class="Shop_s">
           <p>支付方式：<img src="../../static/shop_pay.png" height="20" width="131"></p>
         </div>
       </el-col>
        <el-col :md="6" class='hidden-sm-and-down'>
            <h3 class=" text_center ">猜你喜欢</h3>
            <div class="like" v-for="(item,index) in foods"  @click="shopgo(item.productId)">
                <img v-lazy="item.productImage" width="100%">
                <p> {{item.productName}}</p>
           </div>
        </el-col>
</el-row>
<el-row class='Shop_Con' style='text-align: center;'>
        <el-col :md="24" class='Shop_text' >
          <p>    {{item.details}}</p>
          <img v-lazy="item.productImage" >
          <p> <img src="../../static/details.jpg" width="100%"></p>
       
        </el-col>
</el-row>

</div>
         <modal v-bind:mdShow="mdShow" v-on:close="closeMoadl">
          <p slot="message">
             请先登录,否则无法进行此操作!
          </p>
          <div slot="btnGroup">
              <a class="btn btn--m" href="javascript:;" @click="mdShow=false">关闭</a>
          </div>
      </modal>
        <modal v-bind:mdShow="mdShowCart" v-on:close="closeCart">
        <p slot="message">
          <svg class="icon-status-ok">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
          </svg>
          <span>加入购物车成!</span>
        </p>
        <div slot="btnGroup">
          <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
          <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
        </div>
      </modal>
      <nav-footer></nav-footer>

    </div>
</template>
<style type="text/css">
.el-main{
  padding: 0;
}
.Shop_Con {
    max-width: 1240px;
    margin: 0 auto;
    background-color: #fff;
    padding:20px; 
    margin-top: 20px;
}
.Shop_img{
  width: 100%;
}
.Shop_Title{
  font-size: 18px;
  color: #000;
}
   .input-sub,.input-add{
      min-width: 40px;
      height: 100%;
      border: 0;
      color: #605F5F;
      text-align: center;
      font-size: 16px;
      overflow: hidden;
      display: inline-block;
      background: #f0f0f0;
    }
    .item-quantity .select-self-area{
      background:none;
      border: 1px solid #f0f0f0;
    }
    .item-quantity .select-self-area .select-ipt{
      display: inline-block;
      padding:0 3px;
      width: 30px;
      min-width: 30px;
      text-align: center;
    }
    .Shop_Title,.Shop_pic,.Shop_num,.Shop_s,.Shop_buy{
     margin:18px 0px 0px 10px;

    }
    .Shop_num{
      overflow: hidden;
    }
    .Shop_s{
      font-size: 14px;
    }
    .Shop_pic{
      height: 65px;
           padding-left: 15px;
      background-color: #eee;
    }
    .Shop_picl{
         margin-top: 3px;
        display: inline-block; 
    }
    .Shop_picl i{
     color: #d1434a;
    font-size: 18px;
        position: relative;
       top: 2px;
    }
    .sales{
        float: right;
    position: relative;
    top: 8px;
    right: 15px;
  }
    .Shop_btn{
          display: inline-block;
    text-align: center;
    font-size: 14px;

    }
    .Shop_s p img{
      position: relative;
      top: 5px;
    }
    .Shop_text p{
      max-width: 700px;
      margin: auto;
      font-size: 16px;

    }
    .Shop_text img{
           margin-top: 20px;
    }
    .like{
      width:60%;
      margin:auto;
      position: relative;
      margin-top: 10px;
      border: 2px solid #e9e9e9;
    -webkit-transition: all .5s ease-out;
    transition: all .5s ease-out;

    }
    .like:hover{
          border-color: #198dd4;
    -webkit-transform: translateY(-5px);
    transform: translateY(-5px);
    -webkit-box-shadow: 0 0 10px #999;
    box-shadow: 0 0 10px #999;
    -webkit-transition: all .5s ease-out;
    transition: all .5s ease-out;
    }
    .like p{
          width: 100%;
      position: absolute;
      bottom: 0;
      background-color: rgba(0,0,0,.6);
      color: #fff;
      font-size: 14px;
    }
</style>
<script>
import '../assets/css/product.css'
import '../assets/css/base.css'
import '../assets/css/checkout.css'
import NavHeader from '@/components/Header'
import NavFooter from '@/components/Footer'
import NavBread from '@/components/Bread'
import Modal from '@/components/Modal'
import 'element-ui/lib/theme-chalk/display.css';
import axios from 'axios'
    export default{
        data(){
            return {
              GoodsShop:[],//商品数组
              foods:[],
              busy:true,
              classify:'',
              loading:false,//加载中
              mdShow:false,//未登录
              mdShowCart:false,//购物车提示
              priceChecked:'all',
              filterby:false,
              num:1,
              page:1,

            }
        },
        //使用组件
        components: { 
          NavHeader,
          NavFooter,
          NavBread,
          Modal,
        },
        mounted() {
          this.init();//初始化
        
        },
        methods:{
          init(){//初始化数据
            var param={
                pageSize:1,
                page:1,
                sort:1,
                priceLevel:"all",
                sort:1,
                shopid:this.$route.query.shopid
            }
            axios.get("/goods/list",{params:param}).then((result)=>{
              this.loading=false;
              let res =result.data;
              if(res.status=="0"){
                this.counts=res.result.counts
                  this.GoodsShop=res.result.list;
               this.classify=this.GoodsShop[0].classify
                   this.food();
                      this.page=Math.ceil(Math.random()*10)
              }             
            })
          },
          //加入购物车
          addCart(productId){
            console.log(productId);
            axios.post("/goods/addCart",{productId:productId,num:this.num}).then((res)=>{
              if(res.data.status==0){
                this.mdShowCart=true;
                 this.$store.commit("updateCar",this.num)

              }else{
                this.mdShow=true;
              }
            })
          },
            food(){
               var param={pageSize:2,page:Math.ceil(Math.random()*50),sort:1,classify:this.classify,priceGt:1,priceLte:100}
            //params传参
            axios.get("/goods/list",{params:param}).then((res)=>{
                   this.foods=res.data.result.list;        
            })
          },
          shopgo(productId){
              this.$router.push({
                    path:'/GoodsShop?shopid='+productId
              })
              this.init();
          },
          pay(productId){
            console.log(this.$store.state.mdShow)
            if(this.$store.state.mdShow){
                    this.mdShow=true;
            }else{
               this.$router.push({
                    path:'/address?shopid='+productId
              })
            }
           
          },
          //购物车模态框
          closePop(){
              this.filterby=false,
              this.overLayFlag=false
          },
          closeMoadl(){
             this.mdShow=false;
          },
          closeCart(){
             this.mdShowCart=false;
          },
        }
    }
</script>
