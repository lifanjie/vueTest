<template>
  <div>

    <!-- <tabbar>
          <tabbar-item selected link="/productList">
            <img slot="icon" src="../static/image/icon_a (1).png">
            <span slot="label">首页</span>
          </tabbar-item>
          <tabbar-item @on-item-click="showPay()" :badge="payNum" show-dot>
            <img slot="icon" src="../static/image/icon_b (2).png">
            <span slot="label">支付</span>
          </tabbar-item>
          <tabbar-item @on-item-click="showOrder()" :badge="orderNum">
            <img slot="icon" src="../static/image/icon_b (3).png">
            <span slot="label">订单</span>
          </tabbar-item>
          <tabbar-item link="/more">
            <img slot="icon" src="../static/image/icon_b (4).png">
            <span slot="label">更多</span>
          </tabbar-item>
        </tabbar>     -->

    <div class="ball-container">
      <div v-for="ball in balls">
        <transition  name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div class="ball" :style="{left : left + 'px',bottom : bottom + 'px'}" v-show="ball.show">
              <img class="inner-hook inner" :style="{width : width + 'px',height : height + 'px'}" src="../static/image/icon_c (3).png">
          </div>
        </transition>
       </div>
    </div>

    <div id="footer_box">		     
      <div class="footer" >
        <router-link to="/productList">
          <div class="nav_icon"><img  src="../static/image/icon_a (1).png"  /></div>
          <span class="nav_name active" >首页</span>
        </router-link>
        <a @click="showPay()">
        <div class="nav_icon" id="payNum">
          <span class="tab-sub J-count" v-show="payNum > 0">{{payNum}}</span>
          <img src="../static/image/icon_b (2).png"   />
        </div>
        <span class="nav_name">支付</span>
        </a>
        <a  @click="showOrder()"> 
        <div class="nav_icon" ref="position" id="orderNum">
          <span class="tab-sub J-count"  name="drop" v-show="orderNum > 0">{{orderNum}}</span>
          <img src="../static/image/icon_b (3).png"  />    
        </div>
        <span class="nav_name">订单</span>
        </a>
        <router-link to="/more">
        <div class="nav_icon"><img  src="../static/image/icon_b (4).png"  /></div>
        <span class=' nav_name'>更多</span>
        </router-link>
      </div>
    </div> 

  </div>
</template>

<script>

import { Toast } from 'mint-ui'

export default {
  data () {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      left: '0',
      bottom: '0',
      width: '40',
      height: '40'
    }
  },
  computed: {
    payNum: function () {
      return this.$store.state.pays
    },
    orderNum: function () {
      return this.$store.state.orders
    }
  },
  created: function () {
    this.loadPays()
    this.loadOrders()
    this.$root.eventHub.$on('additem', this.drop)
  },
  methods: {
    loadOrders () {
      this.$axios.post(
        'goods/shopping/listCount',
        {},
        r => {
          let orders = Number(r.data)
          this.$store.commit('setOrders', orders)
        },
        r => {
          this.$store.commit('setOrders', 0)
          if (r.code === '101') {
            this.$router.push({path: '/login'})
          }
        }
      )
    },
    loadPays () {
      this.$axios.post(
        'goods/order/listCount',
        {},
        r => {
          let pays = Number(r.data)
          this.$store.commit('setPays', pays)
        },
        r => {
          this.$store.commit('setPays', 0)
          if (r.code === '101') {
            this.$router.push({path: '/login'})
          }
        }
      )
    },
    showOrder () {
      if (this.orderNum > 0) {
        this.$router.push({path: '/orderAdd'})
      } else {
        Toast('购物车是空的')
      }
    },
    showPay () {
      if (this.payNum > 0) {
        this.$router.push({path: '/orderPay'})
      } else {
        Toast('没有未支付订单')
      }
    },
    drop (el) {
      let position = document.getElementById('orderNum').getBoundingClientRect()

      this.width = el.width
      this.height = el.height

      this.left = position.left
      this.bottom = window.innerHeight - position.top - position.height

      for (let i = 0, l = this.balls.length; i < l; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeEnter (el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - this.left
          let y = -(window.innerHeight - rect.top - this.bottom)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          let inner = el.querySelector('.inner-hook')
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    enter (el) {
      let a = el.offsetHeight // 触发浏览器重绘，offsetWidth、offsetTop等方法都可以触发
      console.log(a)
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        let inner = el.querySelector('.inner-hook')
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
      })
    },
    afterEnter (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }

  }

}
</script>

<style lang="scss" scoped>
@import "../style/scss/footer";
</style>