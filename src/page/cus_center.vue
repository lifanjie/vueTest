<template>
<div>
 	<div class="top">
		<div class="avatar">
		 <img class="photo" :src="photo"/>
 		<input id="uploadBtn" type="file" class="upload"  name="myfiles" style="display:none;"/>
        <input type="hidden" id="headPic" />
		</div> 
		 <p><span class="username">{{username}}</span><br><span>积分：</span><span class="integral">{{integral}}</span></p>
			
	</div>
 	
 	 <div class="one">
 		<ul>
			<li class="order"><img class="" src="../../static/image/hy_03.png"/><p>我的订单</p></li>
			<li class="exchange" @click="selExchange()">
          <img src="../../static/image/hy_05.png"/>
      <p>积分兑换</p></li>
			<li><img src="../../static/image/hy_07.png"/><p>我的福券</p></li> 
		</ul> 
	</div> 

 	<div class="spaning"></div> 

 	<div class="main">
		<ul>
			<li><img src="../../static/image/hy_13.png"/><p>积分明细</p></li>
			<li class="exchange_order"><img src="../../static/image/hy_15.png"/><p>已领礼品</p></li>
			<li class="hl"><img src="../../static/image/hy_17.png"/><p>活动参与</p></li>
			<li><img src="../../static/image/hy_27.png"/><p>会员权益</p></li>
			<li><img src="../../static/image/hy_33.png"/><p>售后服务</p></li>
			<li class="hl"><img src="../../static/image/hy_35.png"/><p>投诉建议</p></li>
			<li class="info"><img src="../../static/image/hy_25.png"/><p>我的资料</p></li>
			<li><img src="../../static/image/hy_23.png"/><p>我的好友</p></li>
			<li class="hl"><img src="../../static/image/hy_31.png"/><p>足迹记录</p></li>
			
		</ul>
		
	</div> 

 	<div class="bottom">
		<div class="gift_b">
			<p class="event">
			  <img src="../../static/image/lp_icon_66.png"/>
			      活动中心
			</p>
		</div>
		<div class="user_b">
			<p class="selfcenter">
			  <img src="../../static/image/hy_43.png"/>
			     会员中心
			</p>
		</div>
	</div>
</div>	  
</template>

<script>
import Vue from 'vue'
import { Toast } from 'mint-ui'

Vue.component(Toast)

export default {
  data () {
    return {
      orgId: '',
      openId: '',
      photo: '../../static/image/ft_03.png',
      integral: 0,
      username: ''
    }
  },
  created: function () {
    this.orgId = this.$route.query.orgId
    this.openId = this.$route.query.openId

    this.getCusInfo()
  },
  methods: {
    getCusInfo: function () {
    // 如果缓存有头像先用缓存
      let dt = localStorage.getItem('userImg')

      if (dt) {
        this.photo = dt
      }

      this.$api.post(
        'customer/info',
        {
          orgId: this.orgId,
          openId: this.openId
        },
        r => {
          this.username = r.data.username
          this.integral = r.data.integral

          if (r.data.thumbHeadPic.length > 0) {
            this.photo = r.data.thumbHeadPic
            localStorage.setItem('userImg', r.data.thumbHeadPic)
          }
        },
        r => {
          Toast(r)
        }
      )
    },
    selExchange: function () {
      this.$router.push({path: '/exchange', query: {orgId: this.orgId, openId: this.openId}})
    }
  }
}
</script>


<style lang="scss" scoped>
@import "../style/scss/_cus_center";
</style>


