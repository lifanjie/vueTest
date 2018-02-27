import Vue from 'vue'
import Router from 'vue-router'
import login from '@/employee/page/login'
import errorBind from '@/employee/page/errorBind'
import productList from '@/employee/page/productList'
import goodsCart from '@/employee/page/goodsCart'
import orderList from '@/employee/page/orderList'
import more from '@/employee/page/more'
import productDetail from '@/employee/page/productDetail'
import reserve from '@/employee/page/reserve'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/errorBind',
      component: errorBind
    },
    {
      path: '/productList',
      component: productList
    },
    {
      path: '/goodsCart',
      component: goodsCart
    },
    {
      path: '/orderList',
      component: orderList
    },
    {
      path: '/more',
      component: more
    },
    {
      path: '/productDetail',
      component: productDetail
    },
    {
      path: '/reserve',
      component: reserve
    }
  ]
})
