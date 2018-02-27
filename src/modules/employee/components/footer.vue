<template>
  <div>
    <div id="footer_box">		
      <div class="footer" >
        <router-link to="/productList">
          <div class="nav_icon"><img  src="../static/image/icon_a (1).png"  /></div>
          <span class="nav_name active" >首页</span>
        </router-link>
        <a @click="showPay()">
        <div class="nav_icon" id="payNum">
          <span class="tab-sub J-count" v-show="isOrder">{{order}}</span>
          <img src="../static/image/icon_b (2).png"   />
        </div>
        <span class="nav_name">支付</span>
        </a>
        <a  @click="showOrder()"> 
        <div class="nav_icon" id="orderNum">
          <span class="tab-sub J-count" v-show="isCount">{{count}}</span>
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
import Vue from 'vue'
import { validate } from 'utils/validate'
import { Toast } from 'mint-ui'

Vue.component(Toast)

export default {
  data () {
    return {
      count: '',
      isCount: false,
      order: '',
      isOrder: false
    }
  },
  created: function () {
    this.showCount()
  },
  methods: {
    loadShopping: function () {
      this.$axios.post(
        'goods/shopping/listCount',
        {},
        r => {
          localStorage.setItem('shoppingCount', r.data)
          this.showCount()
        },
        r => {
          if (r.code === '101') {
            this.$router.push({path: '/login'})
          }
          localStorage.setItem('shoppingCount', '')
          this.showCount()
        }
      )
    },
    showCount: function () {
      let shoppingCount = localStorage.getItem('shoppingCount')
      if (!validate.isEmpty(shoppingCount) && shoppingCount !== '0') {
        this.count = shoppingCount
        this.isCount = true
      } else {
        this.isCount = false
      }

      let orderCount = localStorage.getItem('orderCount')
      if (!validate.isEmpty(shoppingCount) && orderCount !== '0') {
        this.order = orderCount
        this.isOrder = true
      } else {
        this.isOrder = false
      }
    },
    showOrder: function () {
      if (this.isCount) {
        this.$router.push({path: '/goodsCart'})
      } else {
        Toast('购物车是空的')
      }
    },
    loadOrder: function () {
      this.$axios.post(
        'goods/order/listCount',
        {},
        r => {
          localStorage.setItem('orderCount', r.data)
          this.showCount()
        },
        r => {
          if (r.code === '101') {
            this.$router.push({path: '/login'})
          }
          localStorage.setItem('shoppingCount', '')
          this.showCount()
        }
      )
    },
    showPay: function () {
      if (this.isOrder) {
        this.$router.push({path: '/orderList'})
      } else {
        Toast('没有未支付订单')
      }
    }
  }

}
</script>

<style lang="sass" scoped>
@import "../style/scss/footer"
</style>
            