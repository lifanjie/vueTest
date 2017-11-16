import Vue from 'vue'
import Router from 'vue-router'
<<<<<<< HEAD
import Login from '@/page/login'
=======
import Index from '@/page/index'
import Content from '@/page/content'
import Register from '@/page/register'
>>>>>>> 5b5a64fa56d1c98f83b8c2d328c1de7578906e55

Vue.use(Router)

export default new Router({
  routes: [
    {
<<<<<<< HEAD
      path: '/login',
      component: Login
=======
      path: '/',
      component: Index
    }, {
      path: '/content/:id',
      component: Content
    }, {
      path: '/register',
      component: Register
>>>>>>> 5b5a64fa56d1c98f83b8c2d328c1de7578906e55
    }
  ]
})
