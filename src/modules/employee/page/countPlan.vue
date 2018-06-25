<template>
  <div id="countPlan">
    <div class="page-field">
      <mt-header fixed title="盘点">
        <router-link to="/more"  slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>          
      </mt-header>
    </div>

    <group label-width="4.5em" label-align="left">
      <popup-picker class="weui-vcode"  title="盘点计划" placeholder="请选择盘点计划" :data="selcountPlan" v-model="countPlanValue" @on-change="setCountPlan" value-text-align="left"></popup-picker>                    
      <x-input title="商品条码" ref="goodsCode"  @on-enter="saveCountPlan()" placeholder="请输入商品条码" v-model="goodsCode" type="text" class="weui-vcode">
        <x-button slot="right" type="primary" @click.native="saveCountPlan()" mini>盘点</x-button>
      </x-input>  
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
      countPlanNumber: 0,
      countPlanWeight: 0,
      countPlanPrice: 0
    }
  },
  computed: {
    countPlanList: function () {
      let list = [{
        label: '件数',
        value: this.countPlanNumber
      }, {
        label: '重量',
        value: this.countPlanWeight.toFixed(2)
      }, {
        label: '金额',
        value: this.countPlanPrice.toFixed(2)
      }]

      return list
    }
  },
  created: function () {
    this.selCountPlan()
  },
  methods: {
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
    saveCountPlan: function () {
      this.$nextTick(() => {
        // 这里的代码会在dom渲染完毕运行
        if (validate.isEmpty(this.goodsCode)) {
          Toast('商品条码不能为空')
          return
        }

        let goodsCode = this.goodsCode

        this.$axios.post(
        'goods/countRecord',
          {
            countPlanId: this.countPlanId,
            goodsCode: goodsCode
          },
        r => {
          this.color = '#ff4582'
          this.setMessage(r.data.goodsCode, '类别--' + r.data.goodsTypeName + '  名称--' + r.data.goodsName + '  重量：' + r.data.weight + '  标价：' + r.data.tagPrice + '  盘点成功')
          this.countPlanNumber += 1
          this.countPlanWeight += Number(r.data.weight)
          this.countPlanPrice += Number(r.data.tagPrice)
        },
        r => {
          this.color = '#00a7df'
          this.setMessage(r.data.goodsCode, '类别--' + r.data.goodsTypeName + '  名称--' + r.data.goodsName + '  ' + r.message)
        }
      )
      // 情况商品货号栏位
        this.$refs.goodsCode.clear()
      })
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../style/scss/countPlan";
</style>




