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

<!-- 
       <div class="ball-container">
          <div v-for="ball in balls">
              <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                  <div class="ball" :style="{left : left + 'px',top : top + 'px'}" v-show="ball.show">
                      <img class="inner inner-hook" src="../static/image/icon_c (3).png">
                  </div>
              </transition>
          </div>
      </div>  -->

     <div class="ball-container"><!--小球-->
         <div v-for="ball in balls">
             <transition name="drop" v-bind:css="false" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                 <div class="ball"  v-show="ball.show">
                     <img class="inner inner-hook" src="../static/image/icon_c (3).png">
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
        <div class="nav_icon" ref="orderNum" id="orderNum">
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
      balls: [ // 小球 设为3个
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
      top: '0'
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
   // alert(this.$refs.orderp)
    this.loadPays()
    this.loadOrders()
    this.$root.eventHub.$on('additem', this.drop)
  },
  methods: {
    loadOrders: function () {
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
    loadPays: function () {
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
    showOrder: function () {
      if (this.orderNum > 0) {
        this.$router.push({path: '/goodsCart'})
      } else {
        Toast('购物车是空的')
      }
    },
    showPay: function () {
      if (this.payNum > 0) {
        this.$router.push({path: '/orderPay'})
      } else {
        Toast('没有未支付订单')
      }
    },
    drop: function (el) { // 抛物
      let orderNum = this.$refs.orderNum.getBoundingClientRect()

      this.left = orderNum.left
      this.top = orderNum.top
     // console.log(el)
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeDrop (el) { /* 购物车小球动画实现 */
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect() // 点击元素相对于视口的位置
          let x = rect.left - 400
          let y = -(window.innerHeight - rect.top - 22)  // 获取y
          el.style.display = ''
          el.style.webkitTransform = 'translateY(' + y + 'px)'  // translateY
          el.style.transform = 'translateY(' + y + 'px)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.width = inner.style.width - 25
          inner.style.height = inner.style.height - 25
          inner.style.webkitTransform = 'translateX(' + x + 'px)'
          inner.style.transform = 'translateX(' + x + 'px)'
        }
      }
    },
    dropping (el, done) { /* 重置小球数量  样式重置 */
      el.style.webkitTransform = 'translate3d(0,0,0)'
      el.style.transform = 'translate3d(0,0,0)'
      let inner = el.getElementsByClassName('inner-hook')[0]
      inner.style.webkitTransform = 'translate3d(0,0,0)'
      inner.style.transform = 'translate3d(0,0,0)'
      console.log(inner.style)
      // transitionend 完成过渡后触发
      el.addEventListener('transitionend', done)
    },
    afterDrop (el) { /* 初始化小球 */
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
            