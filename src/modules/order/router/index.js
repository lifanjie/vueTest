import Vue from 'vue'
import Router from 'vue-router'
import orderAdd from '@/order/page/orderAdd'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {path: '/', component: orderAdd, name: 'orderAdd', desc: '未绑定平板'}

  ]
})
