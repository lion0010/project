<template>
<div>
	<nav-header></nav-header>
	 <div class="container">
    <div class="page-title-normal">
      <h2 class="page-title-h2"><span>下单成功</span></h2>
    </div>
    <!-- 进度条 -->
    <div class="check-step">
        <ul>
          <li class="cur"><span>选择收货地址</span></li>
          <li class="cur"><span>查看订单</span></li>
          <li class="cur"><span>支付中</span></li>
          <li class="cur"><span>下单成功</span></li>
        </ul>
    </div>

    <div class="order-create">
      <div class="order-create-pic"><img src="../../static/ok-2.png" alt=""></div>
      <div class="order-create-main">
        <h3>支付成功<br>订单将在1-7天内到达目的地。</h3>
        <p>
          <span>订单编号:{{orderId}}</span>
          <span>订单总价格:{{orderTotal|currency('&yen')}}</span>
        </p>
        <div class="order-create-btn-wrap">
          <div class="btn-l-wrap">
            <router-link  class="btn btn--m" to="/cart">购物车列表</router-link>

          </div>
          <div class="btn-r-wrap">
                <router-link  class="btn btn--m" to="/GoodsList">商品列表</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
    <nav-footer></nav-footer>
 </div> 
</template>
<script>
import NavHeader from '@/components/Header'
import NavFooter from '@/components/Footer'
import '../assets/css/checkout.css'
import axios from 'axios'
  export default{
        data(){
            return{
        		  orderId:'',
        		  orderTotal:0
            }
        },
         components: { 
          NavHeader,
          NavFooter,
        },
         mounted(){
          //获取订单号
         	var orderId=this.$route.query.orderId;
         	if(!orderId){
         		alert('你当前订单ID不存在');
         		return false;
         	}
          //通过订单号获取订单信息
         	axios.get('/users/orderDetail',{params:{orderId:orderId}}).then((respone)=>{
         		  let res =respone.data;
              if(res.status=='0'){
                 this.orderId=res.result.orderId
                  this.orderTotal=res.result.orderTotal
              }else{
                  //订单不存在，重定向转跳
                  this.$router.push({
                    path:'/'
                   })
              } 
         	})
        },
    }
</script>