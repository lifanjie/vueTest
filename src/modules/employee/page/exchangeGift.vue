<template>
  <div id="exchangeGift">
    <div class="page-field">
      <mt-header fixed title="礼品兑换">
        <router-link to="/more"  slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>          
      </mt-header>
    </div>

    <group label-width="4.5em" label-align="left">
      <x-input title="客户电话"  @on-enter="getGiftList()" placeholder="请输入客户电话" v-model="mobile" type="tel" class="weui-vcode">
        <x-button slot="right" type="primary" @click.native="getGiftList()" mini>验证</x-button>
      </x-input>        
      <popup-picker title="劵号" placeholder="请选择劵号" :data="selgiftList" v-model="code" @on-change="setCode" value-text-align="left"></popup-picker>                    
    
      <x-input title="礼品名称" ref="giftName" :readonly="true" v-model="giftName" type="text" class="weui-vcode">
        <x-button slot="right" type="primary" @click.native="sureSpend()" mini>兑换</x-button>
      </x-input> 
    </group>


  </div>
</template>

<script>

import { validate } from 'utils/validate'
import { Toast } from 'mint-ui'

export default {
  data () {
    return {
      mobile: '',
      giftName: '',
      giftList: [],
      selgiftList: [['']],
      code: ['']
    }
  },
  created: function () {

  },
  methods: {
    setCode: function (values) {
      if (!validate.isEmpty(values.toString())) {
        for (let item of this.giftList) {
          if (item.code === values.toString()) {
            this.giftName = item.name
            this.code[0] = item.code
          }
        }
      }
    },
    getGiftList: function () {
      if (validate.isEmpty(this.mobile)) {
        Toast('电话号码不能为空')
        return
      }
      this.$axios.post(
        'exchange/order',
        {
          type: 'gift',
          mobile: this.mobile
        },
        r => {
          this.giftList = r.data

          // 清空数组
          this.selgiftList[0].splice(0, this.selgiftList[0].length)
          if (this.giftList.length > 0) {
            for (let item of this.giftList) {
              this.selgiftList[0].push(item.code)
            }
            if (this.selgiftList[0].length > 0) {
              this.setCode(this.selgiftList[0][0])
            }
          } else {
            this.selgiftList[0].splice(0, this.selgiftList[0].length, '')
          }

          Toast('验证成功')
        }
      )
    },
    sureSpend: function () {
      if (validate.isEmpty(this.code[0])) {
        Toast('劵号不能为空')
        return
      }

      if (validate.isEmpty(this.mobile)) {
        Toast('电话号码不能为空')
        return
      }
      this.$axios.post(
        'gift/exchange',
        {
          code: this.code[0],
          mobile: this.mobile
        },
        r => {
          Toast('兑换成功')
          // 情况商品货号栏位
          this.giftName = ''
          this.code.splice(0, 1, '')
        },
        r => {
          Toast(r.message)
        }
      )
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../style/scss/exchangeGift"
</style>



