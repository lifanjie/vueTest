<template>
  <div>
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
      <a class="exchange"><div class="add_new_address_body">兑换</div></a> 
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: '1',
      id: '',
      orgId: '',
      openId: '',
      giftName: '',
      price: '',
      spendPoints: ''
    }
  },
  created: function () {
    this.id = this.$route.query.id
    this.orgId = this.$route.query.orgId
    this.openId = this.$route.query.openId
  },
  methods: {

  }
}
</script>

<<style lang="sass" scoped>
@import "../style/scss/_exchange_detail";
</style>


