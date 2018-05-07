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
        <div class="nav_icon" id="orderNum">
          <span class="tab-sub J-count" v-show="orderNum > 0">{{orderNum}}</span>
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
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../style/scss/footer";
</style>
            