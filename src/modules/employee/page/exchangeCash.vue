<template>
  <div id="exchangeGift">
    <div class="page-field">
      <mt-header fixed title="返现">
        <router-link to="/more"  slot="left">
          <mt-button icon="back">返现</mt-button>
        </router-link>          
      </mt-header>
    </div>

    <group label-width="4.5em" label-align="left">
      <x-input title="客户电话"  @on-enter="getGiftList()" placeholder="请输入客户电话" v-model="mobile" type="tel" class="weui-vcode">
        <x-button slot="right" type="primary" @click.native="getGiftList()" mini>验证</x-button>
      </x-input>        
      <popup-picker title="劵号" placeholder="请选择劵号" :data="selgiftList" v-model="code" @on-change="setCode" value-text-align="left"></popup-picker>                    
    
      <x-input title="返现金额" ref="price" :readonly="true" v-model="price" type="text" class="weui-vcode">
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
      price: '',
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
            this.price = item.price
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
          type: 'coupon',
          couponType: 'gift',
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
        'coupon/spend',
        {
          code: this.code[0],
          mobile: this.mobile,
          setStatus: '1',
          setCouponType: 'gift'
        },
        r => {
          Toast('兑换成功')
          // 情况商品货号栏位
          this.price = ''
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


