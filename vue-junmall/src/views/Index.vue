<template>
		<div>
			<nav-header></nav-header>
   				 <div>
                 <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <symbol id="icon-arrow-short" viewBox="0 0 25 32">
        <title>arrow-short</title>
        <path class="path1" d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z"></path>
      </symbol>
      <symbol id="icon-status-ok" viewBox="0 0 32 32">
        <title>status-ok</title>
        <path class="path1" d="M22.361 10.903l-9.71 9.063-2.998-2.998c-0.208-0.209-0.546-0.209-0.754 0s-0.208 0.546 0 0.754l3.363 3.363c0.104 0.104 0.241 0.156 0.377 0.156 0.131 0 0.261-0.048 0.364-0.143l10.087-9.414c0.215-0.201 0.227-0.539 0.026-0.754s-0.539-0.226-0.754-0.026z"></path>
        <path class="path2" d="M16 30.933c-8.234 0-14.933-6.699-14.933-14.933s6.699-14.933 14.933-14.933c8.234 0 14.933 6.699 14.933 14.933s-6.699 14.933-14.933 14.933zM16 0c-8.822 0-16 7.178-16 16 0 8.823 7.178 16 16 16s16-7.177 16-16c0-8.822-7.178-16-16-16z"></path>
      </symbol>
      <symbol id="icon-cart" viewBox="0 0 38 32">
        <title>cart</title>
        <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
        <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
        <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
        <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
      </symbol>
    </defs>
  </svg>
      <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="str in listImg">
              <img :src="str.imgLink" alt="">
            </div>
        </div>
    <div class="swiper-pagination"></div>
    </div>
   	      <div class="accessory-result-page accessory-page">

  <div class="container">
    <div class="index_nav">
      <span class="index_sort">女士专区</span>
       <router-link class='default cur' to="/GoodsList">查看全部<span style="margin-left:5px;">&gt</span></router-link>
    </div>
    <div class="accessory-result">
      <!-- search result accessories list -->
      <div class="accessory-list-wrap">
        <div class="accessory-list col-5">
          <ul>
            <li v-for="(item,index) in madams" @click="shopgo(item.productId)">
              <div class="pic">
                <img v-lazy="item.productImage" alt="">
              </div>
              <div class="main">
                <div class="name">{{item.productName}}</div>
                <div class="price">{{item.salePrice|currency('&yen')}}</div>
              </div>
            </li>
          
          </ul>
        </div>
      </div>
    </div>
  </div>
    <div class="container">
    <div class="index_nav">
      <span class="index_sort">男士专区</span> 
       <router-link class='default cur' to="/GoodsList">查看全部<span style="margin-left:5px;">&gt</span></router-link>
    </div>
    <div class="accessory-result">
      <!-- search result accessories list -->
      <div class="accessory-list-wrap">
        <div class="accessory-list col-5">
          <ul>
            <li v-for="(item,index) in misters" @click="shopgo(item.productId)">
              <div class="pic">
              <img v-lazy="item.productImage" alt="">
              </div>
              <div class="main">
                <div class="name">{{item.productName}}</div>
                <div class="price">{{item.salePrice|currency('&yen')}}</div>
              </div>
            </li>
          
          </ul>
        </div>
      </div>
    </div>
  </div>
        <div class="container">
    <div class="index_nav">
      <span class="index_sort">精品鞋区</span> 
       <router-link class='default cur' to="/GoodsList">查看全部<span style="margin-left:5px;">&gt</span></router-link>
    </div>
    <div class="accessory-result">
      <!-- search result accessories list -->
      <div class="accessory-list-wrap">
        <div class="accessory-list col-5">
          <ul>
            <li v-for="(item,index) in shoess" @click="shopgo(item.productId)">
              <div class="pic">
              <img v-lazy="item.productImage" alt="">
              </div>
              <div class="main">
                <div class="name">{{item.productName}}</div>
                <div class="price">{{item.salePrice|currency('&yen')}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
      <div class="container">
    <div class="index_nav">
      <span class="index_sort">家电数码</span> 
       <router-link class='default cur' to="/GoodsList">查看全部<span style="margin-left:5px;">&gt</span></router-link>
    </div>
    <div class="accessory-result">
      <!-- search result accessories list -->
      <div class="accessory-list-wrap">
        <div class="accessory-list col-5">
          <ul>
            <li v-for="(item,index) in digitals" @click="shopgo(item.productId)">
              <div class="pic">
             <img v-lazy="item.productImage" alt="">
                <!-- <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a> -->
              </div>
              <div class="main">
                <div class="name">{{item.productName}}</div>
                <div class="price">{{item.salePrice|currency('&yen')}}</div>
              </div>
            </li>
          
          </ul>
        </div>
      </div>
    </div>
  </div>
        <div class="container">
    <div class="index_nav">
      <span class="index_sort">箱包专区</span> 
       <router-link class='default cur' to="/GoodsList">查看全部<span style="margin-left:5px;">&gt</span></router-link>
    </div>
    <div class="accessory-result">
      <!-- search result accessories list -->
      <div class="accessory-list-wrap">
        <div class="accessory-list col-5">
          <ul>
            <li v-for="(item,index) in boxs" @click="shopgo(item.productId,item.classify)">
              <div class="pic">
            <img v-lazy="item.productImage" alt="">
                <!-- <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a> -->
              </div>
              <div class="main">
                <div class="name">{{item.productName}}</div>
                <div class="price">{{item.salePrice|currency('&yen')}}</div>
              </div>
            </li>
          
          </ul>
        </div>
      </div>
    </div>
  </div>
          <div class="container">
    <div class="index_nav">
      <span class="index_sort">美味零食</span> 
       <router-link class='default cur' to="/GoodsList">查看全部<span style="margin-left:5px;">&gt</span></router-link>
    </div>
    <div class="accessory-result">
      <!-- search result accessories list -->
      <div class="accessory-list-wrap">
        <div class="accessory-list col-5">
          <ul>
            <li v-for="(item,index) in foods" @click="shopgo(item.productId)">
              <div class="pic">
             <img v-lazy="item.productImage" alt="">
              </div>
              <div class="main">
                <div class="name">{{item.productName}}</div>
                <div class="price">{{item.salePrice|currency('&yen')}}</div>
              </div>
            </li>
          
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class=" index_nav">
    <h1 class=" text_center ">猜你喜欢</h1>
    </div>
    <div class="accessory-result">

      <!-- search result accessories list -->
      <div class="accessory-list-wrap">
        <div class="accessory-list col-4">
          <ul>
            <li v-for="(item,index) in goodsList"  @click="shopgo(item.productId)">
              <div class="pic" :a=item.productId>
            <img v-lazy="item.productImage" alt="">
              
              </div>
              <div class="main">
                <div class="name">{{item.productName}}</div>
                <div class="price">{{item.salePrice|currency('&yen')}}</div>
              </div>
            </li>
          </ul>
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="text_center">
        </div>
        </div>
      </div>
    </div>
  </div>
      </div>
</div>
	  		<nav-footer></nav-footer>	  	
	  </div>
</template>
<style>
.index_nav {
    height: 55px;
    line-height: 55px;
    margin: 20px 0 30px 0;
    padding: 0 20px;
    background: #fff;
    overflow: hidden;
}
.index_sort{
	font-size: 24px;
	font-weight: bold;
	color: #198dd4;
  float: left;
}
.index_nav a{
     float: right;
}
   .swiper-container {
        max-width: 1280px;
        padding-top: 80px;
    }
    .swiper-wrapper {
        width: 100%;
        height: 100%;
     }
     .swiper-slide {
         background-position: center;
         background-size: cover;
         width: 100%;
         height: 100%;
      }    
     .swiper-slide img {
         width: 100%;
         height: 100%;
     }
</style>
<script type="text/javascript">
import NavHeader from '@/components/Header'
import NavFooter from '@/components/Footer'
import NavBread from '@/components/Bread'
import Modal from '@/components/Modal'
import '../assets/css/product.css'
import '../assets/css/base.css'
import '../assets/css/checkout.css'
import 'swiper/dist/css/swiper.min.css';
import axios from 'axios'
import Swiper from 'swiper';
    export default{
        data(){
            return{
            	    madams:[],
                  misters:[],
                  digitals:[],
                  shoess:[],
                  boxs:[],
                  foods:[],
                  goodsList:[],
            	    loading:false,
            	    page:2,
                  pageSize:8,
                  sortFlag:true,
                  priceChecked:'all',
                  classify:0,
                  busy:false,
      			listImg: []
            }
        },
         components: { 
          NavHeader,
          NavFooter,
          NavBread,
          Modal,
        },
        mounted(){
          axios.get("/admin/imglist").then((result)=>{
              this.loading=false;
              let res =result.data;
              if(res.status=="0"){
                this.listImg=res.result.list
                setTimeout(function(){
               var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                loop: true,
                speed: 600,
                autoplay: 3000,
                onTouchEnd: function() {
                    swiper.startAutoplay()
                }
            });
             },1000)
          
              }              
            })
        	this.madam();
          this.mister();
          this.shoes();
          this.digital();
          this.box();
          this.food();
          this.getGoodsList();
        },
        methods:{
        	 madam(){
             var param={pageSize:5,page:4,sort:1,classify:0,priceGt:200,priceLte:300}
            //params传参
            axios.get("/goods/list",{params:param}).then((res)=>{
                   this.madams=res.data.result.list;    
            })
          },
          mister(){
            var param={pageSize:5,page:5,sort:1,classify:1,priceGt:200,priceLte:300}
            //params传参
            axios.get("/goods/list",{params:param}).then((res)=>{
                   this.misters=res.data.result.list;        
            })
          },
          shoes(){
                var param={pageSize:5,page:2,sort:1,classify:2,priceGt:100,priceLte:300}
            //params传参
            axios.get("/goods/list",{params:param}).then((res)=>{
                   this.shoess=res.data.result.list;        
            })
          },
          digital(){
            var param={pageSize:5,page:3,sort:1,classify:3,priceGt:100,priceLte:300}
            //params传参
            axios.get("/goods/list",{params:param}).then((res)=>{
                   this.digitals=res.data.result.list;        
            })
          },
          box(){
            var param={pageSize:5,page:2,sort:1,classify:4,priceGt:20,priceLte:500}
            //params传参
            axios.get("/goods/list",{params:param}).then((res)=>{
                   this.boxs=res.data.result.list;        
            })
          },
          food(){
               var param={pageSize:5,page:2,sort:1,classify:5,priceGt:30,priceLte:100}
            //params传参
            axios.get("/goods/list",{params:param}).then((res)=>{
                   this.foods=res.data.result.list;        
            })
          },
          getGoodsList(flag){
            var param={
                pageSize:this.pageSize,
                page:this.page,
                sort:this.sortFlag?1:-1,
                priceLevel:this.priceChecked
            }
            //params传参
            this.loading=true;
            axios.get("/goods/list",{params:param}).then((result)=>{

              this.loading=false;
              let res =result.data;
                  // console.log(res)
              if(res.status=="0"){
                if(flag){
                  if(res.result.length==0){
                    this.busy=true;
                    }else{
                    this.busy=false;
                  }
                    this.goodsList=this.goodsList.concat(res.result.list)
                  }else{
                    this.goodsList=res.result.list;
                    this.busy=false;
                  }
              }else{
                this.goodsList=[];
              }              
            })
          },
          shopgo(productId,classify){
              this.$router.push({
                    path:'/GoodsShop?shopid='+productId
              })
          },
          loadMore(){
            this.busy=true
            setTimeout(()=>{
            this.page++
            this.getGoodsList(true);
              this.busy=false
            },1000)
          },
        }
    }
</script>