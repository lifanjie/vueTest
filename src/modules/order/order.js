// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'mint-ui/lib/style.css'
import order from './order.vue'
import router from './router'
import store from './store/index'

// 引用API文件
import axios from '../../api/api'

// 将axios方法绑定到全局
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<order/>',
  components: { order },
  data () {
    return {
      eventHub: new Vue()
    }
  }
})
