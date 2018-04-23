import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import GoodsList from '@/views/GoodsList'
import GoodsShop from '@/views/GoodsShop'
import Cart from '@/views/Cart'
import Address from '@/views/Address'
import OrderConfirm from '@/views/OrderConfirm'
import orderSuccess from '@/views/orderSuccess'
import Admin from '@/views/admin/Admin'
import Home from '@/views/admin/Home'
import userlist from '@/views/admin/userlist'
import shoplist from '@/views/admin/shoplist'
import imglist from '@/views/admin/imglist'
import test from '@/views/admin/test'
import about from '@/views/admin/about'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/GoodsShop',
      name: 'GoodsShop',
      component: GoodsShop
    },
    {
      path: '/GoodsList',
      name: 'GoodsList',
      component: GoodsList
    },
     {
      path: '/Cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/Address',
      name: 'Address',
      component: Address
    },
      {
      path: '/OrderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path:'/orderSuccess',
      name:'orderSuccess',
      component:orderSuccess
    },
    {
      path:'/Admin',
      name:'Admin',
      component:Admin,
    },
    {
        path: '/Home',
        component: Home,
        name: '数据列表',
        redirect: "/Home/userlist",
        children: [
            { path: '/Home/userlist', component: userlist, name: 'userlist' },
            { path: '/Home/shoplist', component: shoplist, name: 'shoplist' },
            { path: '/Home/imglist', component: imglist, name: 'imglist' },
            { path: '/Home/about', component: about, name: 'about' },
            { path: '/Home/test', component: test, name: 'test' },
        ]
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
})
