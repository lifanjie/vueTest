<template>
  <div id="#cusInfo">
    <div class="page-field">
      <mt-header fixed title="客流信息">
        <router-link to="/more"  slot="left">
          <mt-button icon="back">客流信息</mt-button>
        </router-link>          
      </mt-header>
    </div>
  </div>

  <div class='product' v-for="item in cusInfo">
		<p class='product_title'><span>【{{cusInfo.level}}】{{cusInfo.customerName}}</span>{{cusInfo.levelImg}}</p>
		<div class='product_detail_box'>
		<span class='product_title2'>识别头像</span>
		<a href='#' style='position: relative;'>
		<img class='hideimage goodsImg' :src="cusInfo.faceImageUrl" :style="cusInfo.styleStr" /></a>		
		</div>
		
		<div class='product_detail_box'>   
		<span class='product_title2'>抓拍头像</span>
		<a href='#' style='position: relative;'>
		<img class='hideimage goodsImg' :src="cusInfo.catchImageUrl" /></a>	
		</div>
		
		<div class='product_detail_box' style='width:35%'>   
		<ul>
		<li>电话：{{cusInfo.mobile}}</li>   
		<li>积分：{{cusInfo.point}}</li>
		<li>消费次数：{{cusInfo.buyCount}}</li>
		<li>平均消费：{{cusInfo.buyAvgMoney}}</li>
		<li>最高消费：{{cusInfo.buyMaxMoney}}</li>
		<li>最爱商品：{{cusInfo.favoriteGoodType}}</li>
		<li>入店：{{cusInfo.timeStr}}</li>
		</ul> 
		<!-- <a onclick='opendOrder(\""+customerId+"\",\""+faceId+"\")' class='exchange_buy'>立即下单</a> -->
		</div> 	
		</div>


</template>

<script>
export default {

  data () {
    return {
      cusInfo: []
    }
  },
  methods: {
    getlocalToDay () {
      // cnpm install vue-jsonp --save
      this.$jsonp('http://' + localStorage.getItem('faceBoxIp') + ':8080/faces',
        {
          member: '1', // jsonp key //请求传递参数 1
          mins: '30', // jsonp key //请求传递参数 2
          group: '1' // 请求传递参数 3
        }
      ).then(json => {

      }).catch(err => {
        console.log(err)
      })
    }
  }

}
</script>

<style lang="scss" scoped>

</style>


