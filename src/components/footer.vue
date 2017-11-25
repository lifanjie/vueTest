<template>
  <div>
    <div class="bottom">
      <div class="gift_b" @click="goCenter()">
        <p class="event">
            <img src="../../static/image/lp_icon_66.png"/>活动中心
        </p>      
      </div>
      <div class="user_b" @click="goCenter()">
        <p class="selfcenter">
            <img src="../../static/image/hy_43.png"/> 会员中心
        </p>
      </div>
    </div> 
  </div>
</template>

<script>

export default {
  methods: {
    goCenter: function () {
      this.$router.push({path: '/cusCenter'})
    }
  }

}
</script>

<style lang="css">
.bottom{
	width: 100%; 
	height:2.5rem;
	position:fixed; 
	bottom:0; 
	border-top: 1px solid #dfdfdf;
	background: #fff; 
	}
.bottom .gift_b{
	width: 49%;
	height: 3.5rem;
	float:left;
	border-right: 0.5px solid #dfdfdf;
	}
.bottom .user_b{
	width: 50%;
	height: 3.5rem;
	float:left;
/* 	border-right: 0.5px solid #dfdfdf; */
	}
.bottom img{
    margin-left:3.5rem;
	height: 1.5rem;
	width:1.5rem;
	vertical-align:text-bottom;
	}
.bottom p{ 
	font-size: 0.8rem;
	margin-top: 0.3rem;
  }	  
</style>
            