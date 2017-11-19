import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/page/register'
import cusCenter from '@/page/cus_center'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register/orgId/:orgId/openId/:openId',
      component: Register
    }, {
      path: '/orgId/:orgId/openId/:openId',
      component: cusCenter
    }
  ]
})
