import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VuelazyLoad from 'vue-lazyload'
import scroll from 'vue-infinite-scroll'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {currency} from '../src/util/currency'
import axios from 'axios'
import VueAxios from 'vue-axios'
import apiConfig from '../config/api.config'
// 配置基础路由
axios.defaults.baseURL = apiConfig.baseUrl
//滚动加载插件
Vue.use(scroll)
//使用懒加载插件
Vue.use(VuelazyLoad,{
	loading:'/static/loading-svg/Spinner-1.6s-120px.svg'
})
// 注入axios
Vue.use(VueAxios, axios)
//ElementUI使用
Vue.use(ElementUI);
//全局过滤器使用（过滤价格）
Vue.filter('currency',currency)
//使用
Vue.use(Vuex);
const store = new Vuex.Store({
	state:{
		carCount:0,
		mdShow:true,
	},
	mutations:{
		updateCar(state,carCount){
			state.carCount +=carCount;
		},
		initCar(state,carCount){
			state.carCount=carCount;
		},
		btnmdShow(state,mdShow){
			state.mdShow=mdShow;
		}
	}
})
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
    store,
  template: '<App/>',
  components: { App }
})
