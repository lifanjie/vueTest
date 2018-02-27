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
			<li class="order"><img class="" src="../static/image/hy_03.png"/><p>我的订单</p></li>
      <router-link to="/exchange">
			<li class="exchange" ><img src="../static/image/hy_05.png"/><p>积分兑换</p></li>
      </router-link>  
			<li><img src="../static/image/hy_07.png"/><p>我的福券</p></li> 
		</ul> 
	</div> 

 	<div class="spaning"></div> 

 	<div class="main">
		<ul>
			<li><img src="../static/image/hy_13.png"/><p>积分明细</p></li>
      <router-link to="/exchangeOrder">
			<li class="exchange_order"><img src="../static/image/hy_15.png"/><p>已领礼品</p></li>
      </router-link>
			<li class="hl"><img src="../static/image/hy_17.png"/><p>活动参与</p></li>
			<li><img src="../static/image/hy_27.png"/><p>会员权益</p></li>
			<li><img src="../static/image/hy_33.png"/><p>售后服务</p></li>
			<li class="hl"><img src="../static/image/hy_35.png"/><p>投诉建议</p></li>
      <router-link to="/selfInfo">
			<li class="info"><img src="../static/image/hy_25.png"/><p>我的资料</p></li>
      </router-link>
			<li><img src="../static/image/hy_23.png"/><p>我的好友</p></li>
			<li class="hl"><img src="../static/image/hy_31.png"/><p>足迹记录</p></li>
			
		</ul>
		
	</div> 

 	<myFooter></myFooter>
</div>	  
</template>

<script>
import Vue from 'vue'
import myFooter from '../components/footer'
import { Toast } from 'mint-ui'
import { validate } from 'utils/validate'

Vue.component(Toast)

export default {
  components: {myFooter},
  data () {
    return {
      photo: '../static/image/ft_03.png',
      integral: 0,
      username: ''
    }
  },
  created: function () {
    let orgId = this.$route.query.orgId
    let openId = this.$route.query.openId
    if (!validate.isEmpty(orgId)) {
      this.$store.commit('setOrgId', orgId)
    }
    if (!validate.isEmpty(openId)) {
      this.$store.commit('setOpenId', openId)
    }

    this.getCusInfo()
  },
  methods: {
    getCusInfo: function () {
    // 如果缓存有头像先用缓存
      let dt = localStorage.getItem('userImg')

      if (dt) {
        this.photo = dt
      }

      this.$axios.post(
        'customer/info',
        {
          orgId: this.$store.state.orgId,
          openId: this.$store.state.openId
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
    }
  }
}
</script>


<style lang="scss" scoped>
@import "../style/scss/_cus_center";
</style>


