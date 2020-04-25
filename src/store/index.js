import Vue from 'vue'
import Vuex from 'vuex'
import baseConfig from './modules/baseConfig'

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
	},
	// getters
})

  