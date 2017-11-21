<template>
  <div>
    <div class="tabs">
      <mt-navbar fixed v-model="selected">
        <mt-tab-item id="1">礼品劵</mt-tab-item>
        <mt-tab-item id="2">电子劵</mt-tab-item>
      </mt-navbar> 

      <div class="context">
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
          <div class="list_A" v-for="item in giftItems">
            <div class="list"></div>
            <div class="list_box">
              <div class="list_boxa">
                  <router-link :to="{ path: '/exchangeDetail', query: { id: item.id,orgId:orgId,openId:openId}}">
                    <img :src="item.giftImage">
                  </router-link>   
              </div>
              <div class="div_title">    
                <p class="dt_title">{{item.giftName}}</p>
                <p class="dt_text">价值：{{item.price}}</p>
                <p class="dt_text">所需积分：<span>{{item.spendPoints}}</span></p>	
                <p class="dt_text">剩余数量：{{item.number}}
                  <button type="button" class="exchange" @click="sureGift(item.id)">兑换</button>
                </p>
              </div>		
            </div>
          </div>

          </mt-tab-container-item>
          <mt-tab-container-item id="2">
          <div class="list_A" v-for="item in couponItems">
            <div class="list"></div>
            <div class="list_box">
              <div class="list_boxa">
                  <router-link :to="{ path: '/exchangeDetail', query: { id: item.id,orgId: orgId,openId: openId}}">
                    <img :src="item.images">
                  </router-link>    
                </div>
                  <div class="div_title">    
                  <p class="dt_title">{{item.title}}</p>
                  <p class="dt_text">价值：{{item.price}}</p>
                  <p class="dt_text">所需积分：<span>{{item.spendPoints}}</span></p>	
                  <p class="dt_text">剩余数量：{{item.number}}
                    <button type="button" class="exchange" @click="sureCoupon(item.id)">兑换</button>
                  </p>	
                </div>		
            </div>
                  
          </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>      
    
    </div>

    <div class="bottom">
      <div class="gift_b">
        <p class="event"><img src="../../static/image/lp_icon_66.png"/>活动中心</p>
      </div>
      <div class="user_b">
        <p class="selfcenter"><img src="../../static/image/hy_43.png"/> 会员中心</p>
      </div>
    </div>    
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast, Navbar, TabItem } from 'mint-ui'

Vue.component(Toast)
Vue.component(Navbar)
Vue.component(TabItem)

export default {
  data () {
    return {
      selected: '1',
      orgId: '',
      openId: '',
      giftItems: [],
      couponItems: []
    }
  },
  created: function () {
    this.orgId = this.$route.query.orgId
    this.openId = this.$route.query.openId

    this.giftList()
    this.couponList()
  },
  methods: {
    giftList: function () {
      this.$api.post(
        'gift/list',
        {
          orgId: this.orgId
        },
        r => {
          this.giftItems = r.data
        },
        r => {
          Toast(r)
        }
      )
    },
    couponList: function () {
      this.$api.post(
        'coupon/list',
        {
          orgId: this.orgId
        },
        r => {
          this.couponItems = r.data
        },
        r => {
          Toast(r)
        }
      )
    },
    sureGift: function (id) {
      this.$api.post(
        'gift/addOrder',
        {
          id: id,
          orgId: this.orgId,
          openId: this.openId
        },
        r => {
          this.couponItems = r.data
        },
        r => {
          Toast(r)
        }
      )
    },
    sureCoupon: function (id) {
      this.$api.post(
        'coupon/addOrder',
        {
          id: id,
          openId: this.openId
        },
        r => {
          this.couponItems = r.data
        },
        r => {
          Toast(r)
        }
      )
    },
    getGiftDetail: function (id) {
      this.$api.post(
        'gift/list',
        {
          id: id,
          orgId: this.orgId
        },
        r => {
          this.couponItems = r.data
        },
        r => {
          Toast(r)
        }
      )
    },
    getCouponDetail: function (id) {
      this.$api.post(
        'gift/list',
        {
          id: id
        },
        r => {
          this.couponItems = r.data
        },
        r => {
          Toast(r)
        }
      )
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../style/scss/_exchange";
</style>


