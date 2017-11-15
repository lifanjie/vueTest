// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

// 引用API文件
import api from './api/index.js'
// 引用工具文件
import utils from './utils/index.js'
// 将API方法绑定到全局
Vue.prototype.$api = api
Vue.prototype.$utils = utils

Vue.config.productionTip = false

Vue.use(MintUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
