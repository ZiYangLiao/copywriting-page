import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $http from './assets/js/http.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@cssUrl/common.css'
import '@cssUrl/iconfont.css'
Vue.use(ElementUI);

Vue.config.productionTip = false

//注册全局http方法
Vue.prototype.$http = $http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
