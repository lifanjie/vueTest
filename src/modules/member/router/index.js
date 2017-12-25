import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/member/page/register'
import cusCenter from '@/member/page/cus_center'
import exchange from '@/member/page/exchange'
import exchangeDetail from '@/member/page/exchange_detail'
import exchangeOrder from '@/member/page/exchange_order'
import exchangeSure from '@/member/page/exchange_sure'
import selfInfo from '@/member/page/self_info'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      component: Register
    }, {
      path: '/cusCenter',
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
