import Vue from 'vue'
import Router from 'vue-router'
import login from '@/employee/page/login'
import errorBind from '@/employee/page/errorBind'
import productList from '@/employee/page/productList'
import goodsCart from '@/employee/page/goodsCart'
import orderPay from '@/employee/page/orderPay'
import more from '@/employee/page/more'
import productDetail from '@/employee/page/productDetail'
import reserve from '@/employee/page/reserve'
import orderAdd from '@/employee/page/orderAdd'
import storageSuccess from '@/employee/page/storageSuccess'
import layout from '@/employee/components/layout'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {path: '/login', component: login, name: 'login', desc: '登录'},
    {path: '/errorBind', component: errorBind, name: 'errorBind', desc: '未绑定平板'},
    {
      path: '/',
      component: layout,
      redirect: {name: 'productList'},
      children: [
        { path: '/productList',
          component: productList,
          name: 'productList',
          desc: '商品选择'
          // children: [{path: '/productDetail', component: productDetail, name: 'productDetail', desc: '商品详情'}]
        },
         { path: '/goodsCart', component: goodsCart, name: 'goodsCart', desc: '提交订单' },
        // { path: '/orderAdd', component: orderAdd, name: 'orderAdd', desc: '订单录入' },
        { path: '/more', component: more, name: 'more', desc: '更多' },
        {path: '/orderPay', component: orderPay, name: 'orderPay', desc: '订单支付'}
        // {path: '/storageSuccess', component: storageSuccess, name: 'storageSuccess', desc: '下单成功'}
      ]
    },
    {path: '/productDetail', component: productDetail, name: 'productDetail', desc: '商品详情'},
    // { path: '/goodsCart', component: goodsCart, name: 'goodsCart', desc: '提交订单' },
    { path: '/orderAdd', component: orderAdd, name: 'orderAdd', desc: '订单录入' },
    {path: '/storageSuccess', component: storageSuccess, name: 'storageSuccess', desc: '下单成功'},
    {
      path: '/reserve',
      component: reserve
    }
  ]
})
