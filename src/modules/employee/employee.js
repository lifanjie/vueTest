// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import member from './employee.vue'
import router from './router'
import store from './store/index'

// 引用API文件
import axios from '../../api/api'

// 将axios方法绑定到全局
Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.use(MintUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<member/>',
  components: { member }
})
