<template>
  <div id="#cusInfo">
    <div class="page-field">
      <mt-header fixed title="客流信息">
        <router-link to="/more"  slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>          
      </mt-header>
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

  </div>

</template>
<script>
import { validate } from 'utils/validate'
// import Stomp from 'stompjs'

export default {
  data () {
    return {
      cusInfo: []
     // client: Stomp.client('ws://' + localStorage.getItem('faceBoxIp') + ':8080/' + 'gs-guide-websocket')
    }
  },
  created () {
    this.connect()
  },
  methods: {

    // onConnected: function (frame) {
    //   console.log('Connected: ' + frame)
    //   var topic = '/topic/greetings'

    //   this.client.subscribe(topic, this.responseCallback, this.onFailed)
    // },
    // onFailed: function (frame) {
    //   console.log('Failed: ' + frame)
    // },
    // responseCallback: function (frame) {
    //   console.log('responseCallback msg=>' + frame.body)
    //   this.formatInfo(JSON.parse(frame.body))
    // },
    connect: function () {
      // this.client.connect({}, this.onConnected, this.onFailed)

    },
    formatInfo (jsonData) {
      console.log(JSON.stringify(jsonData))
        // 陌生人的时候
      let group = jsonData.face.group
      if (validate.isEmpty(jsonData.member) ||	group !== '1') {
        return
      }

      var json = JSON.parse(decodeURIComponent(decodeURI(decodeURI(jsonData.member))))

      let obj = {}

      let cusLevel = validate.isEmpty(json.cusLevel) ? '' : json.cusLevel
      let customerId = json.customerId
      let timeStr = jsonData.face.time
      let confidence = jsonData.face.confidence

      let how = new Date(timeStr)
      let today = new Date()
      let interval = parseInt((today.getTime() - how.getTime()) / 1000 / 60 / 60)
      let level = validate.isEmpty(customerId) ? '游客' : cusLevel

      let levelImg = ''
      if (level === '白银会员') {
        levelImg = "<img src='../static/image/baiyin.png' style='width:25px;margin-left: 5px;' />"
      } else if (level === '黄金会员') {
        levelImg = "<img src='../static/image/huangjin.png' style='width:25px;margin-left: 5px;' />"
      } else if (level === '钻石会员') {
        levelImg = "<img src='../static/image/zuanshi.png' style='width:25px;margin-left: 5px;' />"
      }

      if (Number(confidence) <= 70) {
        return
      }

      // 只查看顾客
      if (json.type !== 'NORMAL' || customerId === '' || interval > 1) {
        return
      }

      // 删除旧信息
      this.cusInfo.forEach((key, item) => {
        if (item.faceId === json.faceId) {
          this.cusInfo.splice(key, 1)
        }
      })

      obj = {
        faceId: json.faceId,
        confidence: confidence,
        catchImageUrl: jsonData.face.photo,
        timeStr: timeStr,
        group: group,
        customerId: customerId,
        customerName: validate.isEmpty(json.customerName) ? '' : json.customerName,
        mobile: json.mobile,
        faceImageUrl: json.faceImageUrl,
        point: validate.isEmpty(json.point) ? '' : json.point,
        buyCount: validate.isEmpty(json.buyCount) ? '0' : json.buyCount,
        buyAvgMoney: validate.isEmpty(json.buyAvgMoney) ? '0' : json.buyAvgMoney,
        buyMaxMoney: validate.isEmpty(json.buyMaxMoney) ? '0' : json.buyMaxMoney,
        favoriteGoodType: validate.isEmpty(json.favoriteGoodType) ? '0' : json.favoriteGoodType,
        cusLevel: cusLevel,
        level: level,
        sex: json.sex === '2' ? '女' : '男',
        styleStr: validate.isEmpty(customerId) ? 'display:none;' : '',
        type: json.type,
        interval: interval,
        audio: validate.isEmpty(json.audio) ? '' : json.audio,
        levelImg: levelImg
      }

      this.cusInfo.unshift(obj)
    },
    getlocalToDay () {
      // cnpm install vue-jsonp --save
      this.$jsonp('http://' + localStorage.getItem('faceBoxIp') + ':8080/faces',
        {
          member: '1', // jsonp key //请求传递参数 1
          mins: '30', // jsonp key //请求传递参数 2
          group: '1' // 请求传递参数 3
        }
        ).then(json => {
          this.formatInfo(json)
        }).catch(err => {
          console.log(err)
        })
    }

  }

}
</script>

<style lang="scss" scoped>

</style>


