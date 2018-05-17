import Vue from 'vue'
import Router from 'vue-router'
import login from '@/employee/page/login'
import errorBind from '@/employee/page/errorBind'
import productList from '@/employee/page/productList'
// import goodsCart from '@/employee/page/goodsCart'
import orderPay from '@/employee/page/orderPay'
import more from '@/employee/page/more'
import goodsDetail from '@/employee/components/goodsDetail'
import reserve from '@/employee/page/reserve'
import orderAdd from '@/employee/page/orderAdd'
import storageSuccess from '@/employee/page/storageSuccess'
import layout from '@/employee/components/layout'
import countPlan from '@/employee/page/countPlan'
import exchangeGift from '@/employee/page/exchangeGift'
import exchangeCash from '@/employee/page/exchangeCash'
import audio from '@/employee/page/audio'
import msg from '@/employee/components/msg'
import cusInfo from '@/employee/page/cusInfo'

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
        },
        //  { path: '/goodsCart', component: goodsCart, name: 'goodsCart', desc: '提交订单' },
        { path: '/more', component: more, name: 'more', desc: '更多' },
        {path: '/orderPay', component: orderPay, name: 'orderPay', desc: '订单支付'}
      ]
    },
    {path: '/goodsDetail', component: goodsDetail, name: 'goodsDetail', desc: '商品详情'},
    { path: '/orderAdd', component: orderAdd, name: 'orderAdd', desc: '订单录入' },
    {path: '/storageSuccess', component: storageSuccess, name: 'storageSuccess', desc: '下单成功'},
    {path: '/countPlan', component: countPlan, name: 'countPlan', desc: '盘点'},
    {path: '/exchangeGift', component: exchangeGift, name: 'exchangeGift', desc: '礼品兑换'},
    {path: '/exchangeCash', component: exchangeCash, name: 'exchangeCash', desc: '返现'},
    {path: '/reserve', component: reserve, name: 'reserve', desc: '预定'},
    {path: '/audio', component: audio, name: 'audio', desc: '话术学习'},
    {path: '/msg', component: msg, name: 'msg', desc: '提示消息'},
    {path: '/cusInfo', component: cusInfo, name: 'cusInfo', desc: '客流信息'}
  ]
})
