import Vue from 'Vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
	carCount:4,
}

const mutations={
	updateCar(state,carCount){
		state.carCount +=carCount;
	},
	initCar(state,carCount){
		state.carCount=carCount;
	}
}

export default new Vuex.Store({
	state,
	mutations
})