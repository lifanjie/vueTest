import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/page/register'
import cusCenter from '@/page/cus_center'
import exchange from '@/page/exchange'
import giftDetail from '@/page/gift_detail'
import couponDetail from '@/page/coupon_detail'

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
      path: '/giftdetail/:id',
      component: giftDetail
    }, {
      path: 'coupondetail/:id',
      component: couponDetail
    }
  ]
})
