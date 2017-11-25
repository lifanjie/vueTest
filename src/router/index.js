import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/page/member/register'
import cusCenter from '@/page/member/cus_center'
import exchange from '@/page/member/exchange'
import exchangeDetail from '@/page/member/exchange_detail'
import exchangeOrder from '@/page/member/exchange_order'
import exchangeSure from '@/page/member/exchange_sure'
import selfInfo from '@/page/member/self_info'

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
