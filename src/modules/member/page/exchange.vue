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
                  <router-link :to="{ path: '/exchangeDetail', query: { id: item.id,type:'gift'}}">
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
                  <router-link :to="{ path: '/exchangeDetail', query: { id: item.id,type:'coupon'}}">
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
    <myFooter></myFooter>
  </div>
</template>

<script>
import Vue from 'vue'
import myFooter from '../components/footer'
import { Toast, Navbar, TabItem } from 'mint-ui'

Vue.component(Toast)
Vue.component(Navbar)
Vue.component(TabItem)

export default {
  components: {myFooter},
  data () {
    return {
      selected: '1',
      giftItems: [],
      couponItems: []
    }
  },
  created: function () {
    this.giftList()
    this.couponList()
  },
  methods: {
    giftList: function () {
      this.$axios.post(
        'gift/list',
        {
          orgId: this.$store.state.orgId
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
      this.$axios.post(
        'coupon/list',
        {
          orgId: this.$store.state.orgId
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
      this.$axios.post(
        'gift/addOrder',
        {
          id: id,
          orgId: this.$store.state.orgId,
          openId: this.$store.state.openId
        },
        r => {
          this.$router.push({path: '/exchangeSure', query: {code: r.data.code}})
        },
        r => {
          Toast(r)
        }
      )
    },
    sureCoupon: function (id) {
      this.$axios.post(
        'coupon/addOrder',
        {
          id: id,
          openId: this.$store.state.openId
        },
        r => {
          this.$router.push({path: '/exchangeSure', query: {code: r.data.code}})
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


