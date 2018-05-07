<template>
  <div>
    <div class="page-field">
      <mt-header fixed title="说明">
        <router-link to="/exchange"  slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
    </div>    
    <div class="head">
	    <div class="head_left">
		    <p class="giftName_p"><span id="giftName">{{giftName}}</span></p>
		    <p class="price_p">原价 <span id="price">{{price}}</span></p>
	    </div>
	    <div class="head_right">
		    <p><span id="spendPoints">{{spendPoints}}</span> 积分</p>
	    </div>
    </div>
    
    <div class="list"></div>
    <div class="free"><p>详情介绍</p></div>


    <section class="wrap">
          <div class="fgray" id="recommend"></div>
    </section>
	
    <div class="add_new_address">
      <a class="exchange"><div class="add_new_address_body" @click="sure()">兑换</div></a> 
    </div>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'

export default {
  data () {
    return {
      selected: '1',
      id: '',
      type: '',
      giftName: '',
      price: '',
      spendPoints: ''
    }
  },
  created: function () {
    this.id = this.$route.query.id
    this.type = this.$route.query.type

    this.getDetail()
  },
  methods: {
    getDetail: function () {
      let url = ''

      if (this.type === 'gift') {
        url = 'gift/list'
      } else {
        url = 'coupon/list'
      }
      this.$axios.post(
        url,
        {
          id: this.id,
          orgId: this.$store.state.orgId
        },
        r => {
          if (this.type === 'gift') {
            this.giftName = r.data.giftName
          } else {
            this.giftName = r.data.title
          }
          this.price = r.data.price
          this.spendPoints = r.data.spendPoints
          this.recommend = r.data.detail
        },
        r => {
          Toast(r)
        }
      )
    },
    sure: function () {
      let url = ''
      if (this.type === 'gift') {
        url = 'gift/addOrder'
      } else {
        url = 'coupon/addOrder'
      }

      this.$axios.post(
        url,
        {
          id: this.id,
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
    }
  }
}
</script>

<<style lang="scss" scoped>
@import "../style/scss/_exchange_detail";
</style>


