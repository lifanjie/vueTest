<template>

<div>
      <div class="head">
	    <div>
	    <p class="p1">兑换成功&ensp;！</p>
	    <p class="p2">兑换劵码：<span id="code">{{codestr}}</span></p>
	    <p class="p3">（凭此劵码在店内兑换）</p>
	    </div>
	    <div>
        <router-link to="/exchangeOrder">
          <div class="left_button">
              <div class="left_button_body">查看兑换记录</div>
          </div>
        </router-link>
        <router-link to="/exchange">
 		      <div class="right_button"> 
				    <div class="right_button_body">返回积分商城</div>
		      </div> 
        </router-link> 
	    </div>
    </div>
</div>
  
</template>

<script>
export default {
  data () {
    return {
      code: ''

    }
  },
  computed: {
    codestr: function () {
      return this.code.substr(0, 3) + ' ' + this.code.substr(3, 3) + ' ' + this.code.substr(6)
    }
  },
  created: function () {
    this.code = this.$route.query.code
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/scss/member/_exchange_sure"
</style>


