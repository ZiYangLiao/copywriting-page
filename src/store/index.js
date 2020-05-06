import Vue from 'vue'
import Vuex from 'vuex'
import baseConfig from './modules/baseConfig'
import homeFun from './modules/homeFun'

import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
	},
	mutations: {
	},
	actions: {
	},
	getters,
	modules: {
		baseConfig,
		homeFun
	},
	// getters
})

  