// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import employee from './employee.vue'
import router from './router'
import store from './store/index'
import { Group, Cell, XButton, PopupPicker, XInput, CellFormPreview, Badge, InlineLoading, Msg, Tabbar, TabbarItem } from 'vux'

// 引用API文件
import axios from '../../api/api'

// 将axios方法绑定到全局
Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.use(MintUI)
Vue.component('group', Group)
Vue.component('cell', Cell)
Vue.component('x-button', XButton)
Vue.component('popup-picker', PopupPicker)
Vue.component('x-input', XInput)
Vue.component('cell-form-preview', CellFormPreview)
Vue.component('badge', Badge)
Vue.component('inline-loading', InlineLoading)
Vue.component('msg', Msg)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<employee/>',
  components: { employee }
})
