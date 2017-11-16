import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/page/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      component: Register
    }
  ]
})
