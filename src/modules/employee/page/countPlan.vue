<template>
  <div id="countPlan">
    <div class="page-field">
      <mt-header fixed title="盘点">
        <router-link to="/more" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button @click.native="clearCount()" slot="right">清零</mt-button>
      </mt-header>
    </div>

    <group label-width="4.5em" label-align="left">
      <popup-picker class="weui-vcode" title="盘点计划" placeholder="请选择盘点计划" :data="selcountPlan" v-model="countPlanValue" @on-change="setCountPlan" value-text-align="left"></popup-picker>
      <x-input title="商品条码" ref="goodsCode" @on-enter="saveCountPlan()" placeholder="请输入商品条码" v-model="goodsCode" type="text" class="weui-vcode">
        <x-button slot="right" type="primary" @click.native="saveCountPlan()" mini>盘点</x-button>
      </x-input>
      <x-input title="盘点数" placeholder="请输入盘点数" v-model="countQuantityBu" type="number" class="weui-vcode"></x-input>
      <cell-form-preview :list="countList" class="weui-vcode"></cell-form-preview>
      <cell-form-preview :list="countPlanList" class="weui-vcode"></cell-form-preview>
    </group>

    <div id="returnlist" v-for="item in messages">
      <p class="returnstr" v-bind:style="{color:item.color}">{{item.message}}</p>
    </div>
  </div>
</template>

<script>

import { validate } from 'utils/validate'
import { Toast } from 'mint-ui'

export default {

  data () {
    return {
      countPlan: [],
      selcountPlan: [['']],
      countPlanValue: [''],
      messages: [],
      color: '#00a7df',
      countPlanId: '',
      goodsCode: '',
      oldgoodsCode: '',
      countQuantityBu: 1,
      countNumber: 0,
      countWeight: 0,
      countPlanNumber: 0,
      countPlanWeight: 0,
      countPlanPrice: 0,
      timeout: 55000,        // 9分钟发一次心跳，比server端设置的连接时间稍微小一点，在接近断开的情况下以通信的方式去重置连接时间。
      serverTimeoutObj: null,
      websocket_connected_count: 0,
      onclose_connected_count: 0
    }
  },
  computed: {
    countList: function () {
      let list = [{
        label: '当前件数',
        value: this.countNumber
      }, {
        label: '当前重量',
        value: this.countWeight.toFixed(2)
      }]

      return list
    },
    countPlanList: function () {
      let list = [{
        label: '总盘件数',
        value: this.countPlanNumber
      }, {
        label: '总盘重量',
        value: this.countPlanWeight.toFixed(2)
      }, {
        label: '总盘金额',
        value: this.countPlanPrice.toFixed(2)
      }]

      return list
    }
  },
  created: function () {
    this.selCountPlan()
    this.initWebSocket()
  },
  methods: {
    connWebSocket () {
      const wsuri = process.env.WS + `/inventory/${localStorage.getItem('userId')}`// 这个地址由后端童鞋提供
      this.websock = new WebSocket(wsuri)
    },
    initWebSocket () { // 初始化weosocket
      this.connWebSocket()
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose

      // 路由跳转时结束websocket链接
      var that = this
      this.$router.afterEach(function () {
        that.websock.close()
        clearTimeout(that.serverTimeoutObj)
      })
    },
    reset () {
      clearTimeout(this.serverTimeoutObj)
      return this
    },
    start () {
      this.serverTimeoutObj = setInterval(() => {
        if (this.websock.readyState === 1) {
          console.log('ping')
          this.websock.send('ping')
          this.reset().start()    // 如果获取到消息，说明连接是正常的，重置心跳检测
        } else {
          console.log('断开状态，尝试重连')
          this.connWebSocket()
        }
      }, this.timeout)
    },
    websocketonopen () { // 连接建立之后执行send方法发送数据
      this.reset().start()   // 成功建立连接后，重置心跳检测
      console.log('连接成功')
    },
    websocketonerror () { // 连接建立失败重连
      this.websocket_connected_count++
      if (this.websocket_connected_count <= 5) {
        this.connWebSocket()
      }
    },
    websocketonmessage (e) {
      this.reset().start()    // 如果获取到消息，说明连接是正常的，重置心跳检测
      var r = JSON.parse(e.data)
      if (r.success) {
        this.color = '#ff4582'
        this.setMessage(r.data.goodsCode, '类别--' + r.data.goodsTypeName + '  名称--' + r.data.goodsName + '  重量：' + r.data.weight + '  标价：' + r.data.tagPrice + '  盘点成功')
        this.countPlanNumber += 1
        this.countPlanWeight += Number(r.data.weight)
        this.countPlanPrice += Number(r.data.tagPrice)

        this.countNumber += 1
        this.countWeight += Number(r.data.weight)
      } else {
        this.color = '#00a7df'
        this.setMessage(r.data.goodsCode, '类别--' + r.data.goodsTypeName + '  名称--' + r.data.goodsName + '  ' + r.message)
      }
    },
    websocketclose (e) {  // 关闭
      console.log('断开连接', e)
    },
    clearCount: function () {
      this.countNumber = 0
      this.countWeight = 0
    },
    setCountPlanSum: function () {
      this.$axios.post(
        'countPlanSum',
        {
          countPlanId: this.countPlanId
        },
        r => {
          this.countPlanNumber = Number(r.data.countPlanNumber)
          this.countPlanWeight = Number(r.data.countPlanWeight)
          this.countPlanPrice = Number(r.data.countPlanPrice)
        }
      )
    },
    setCountPlan: function (values) {
      if (!validate.isEmpty(values.toString())) {
        for (let item of this.countPlan) {
          if (item.countplantitle === values.toString()) {
            this.countPlanId = item.id
            this.countPlanValue[0] = item.countplantitle
            this.setCountPlanSum()
          }
        }
      }
    },
    selCountPlan: function () {
      this.$axios.post(
        'goods/countPlan',
        {},
        r => {
          this.countPlan = r.data

          // 清空数组
          this.selcountPlan[0].splice(0, this.selcountPlan[0].length)
          if (this.countPlan.length > 0) {
            for (let item of this.countPlan) {
              this.selcountPlan[0].push(item.countplantitle)
            }
            if (this.selcountPlan[0].length > 0) {
              this.setCountPlan(this.selcountPlan[0][0])
            }
          } else {
            this.selcountPlan[0].splice(0, this.selcountPlan[0].length, '')
          }
        },
        r => {
          if (r.code === '101') {
            this.$router.push({ path: '/login' })
          }
          Toast(r)
        }
      )
    },
    setMessage: function (goodsCode, text) {
      // 设置颜色
      // if (this.color === '#ff4582') {
      //   this.color = '#00a7df'
      // } else {
      //   this.color = '#ff4582'
      // }
      var mydate = new Date()
      var mytime = mydate.toLocaleTimeString()

      this.messages.unshift({
        'color': this.color,
        'message': mytime + '：' + goodsCode + ' ' + text
      })

      // 删除最后一个
      if (this.messages.length > 12) {
        this.messages.splice(this.messages.length - 1, 1)
      }
    },
  /**
   * 防止过多提交
   */
    throttle: function (fn, gapTime) {
      let _nowTime = new Date().getTime()
      if (_nowTime - this._lastTime > gapTime || !this._lastTime) {
        fn.apply()
        this._lastTime = _nowTime
      }
    },
    saveCountPlan () {
      this.$nextTick(() => {
        // 这里的代码会在dom渲染完毕运行

        let goodsCode = this.goodsCode
        let oldgoodsCode = this.oldgoodsCode
        let countQuantityBu = this.countQuantityBu

        let gapTime = 500
        // 同一个单号，5秒才能提交一次
        if (goodsCode === oldgoodsCode) {
          gapTime = 5000
        }

        this.throttle(() => {
          if (validate.isEmpty(goodsCode)) {
            Toast('商品条码不能为空')
            return
          }

          if (countQuantityBu <= 0) {
            Toast('盘点数必须大于0')
            return
          }

          let data = {
            countPlanId: this.countPlanId,
            goodsCode: goodsCode,
            countQuantityBu: countQuantityBu
          }
          // 数据发送
          this.websock.send(JSON.stringify(data))
          this.oldgoodsCode = goodsCode
        }, gapTime)

        // this.$axios.post(
        //   'goods/countRecord',
        //   {
        //     countPlanId: this.countPlanId,
        //     goodsCode: goodsCode,
        //     countQuantityBu: countQuantityBu
        //   },
        //   r => {
        //     this.color = '#ff4582'
        //     this.setMessage(r.data.goodsCode, '类别--' + r.data.goodsTypeName + '  名称--' + r.data.goodsName + '  重量：' + r.data.weight + '  标价：' + r.data.tagPrice + '  盘点成功')
        //     this.countPlanNumber += 1
        //     this.countPlanWeight += Number(r.data.weight)
        //     this.countPlanPrice += Number(r.data.tagPrice)

        //     this.countNumber += 1
        //     this.countWeight += Number(r.data.weight)
        //   },
        //   r => {
        //     this.color = '#00a7df'
        //     this.setMessage(r.data.goodsCode, '类别--' + r.data.goodsTypeName + '  名称--' + r.data.goodsName + '  ' + r.message)
        //   }
        // )

        // 清空商品货号栏位
        this.goodsCode = ''
        this.countQuantityBu = 1
      })
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../style/scss/countPlan";
</style>




