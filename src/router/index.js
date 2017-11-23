import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/page/register'
import cusCenter from '@/page/cus_center'
import exchange from '@/page/exchange'
import exchangeDetail from '@/page/exchange_detail'
import exchangeOrder from '@/page/exchange_order'
import exchangeSure from '@/page/exchange_sure'
import selfInfo from '@/page/self_info'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      component: Register
    }, {
      path: '/',
      component: cusCenter
    }, {
      path: '/exchange',
      component: exchange
    }, {
      path: '/exchangeDetail',
      component: exchangeDetail
    }, {
      path: '/exchangeOrder',
      component: exchangeOrder
    }, {
      path: '/exchangeSure',
      component: exchangeSure
    }, {
      path: '/selfInfo',
      component: selfInfo
    }
  ]
})
