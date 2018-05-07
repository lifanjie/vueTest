<template>
<div id="reserve">

    <div class="page-field">
      <mt-header fixed title="预定">
      <router-link to="/productList"  slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      </mt-header>
    </div>

    <group :gutter=0 label-width="4.5em" label-align="left">
      <x-input title="客户电话" placeholder="请输入客户电话" @on-blur="getcusInfo()" v-model="mobile" type="text" class="weui-vcode"></x-input> 
      <x-input title="客户姓名" placeholder="请输入客户姓名" v-model="username" type="text" class="weui-vcode"></x-input> 
      <x-input title="预存定金" placeholder="请输入预存定金" v-model="money" type="text" class="weui-vcode"></x-input>   
    </group>
    
    <div class="sure_div">
      <x-button @click.native="reserve()" class="sure_button sure_btn">确定</x-button>
    </div>
   
</div>
  
</template>

<script>

import { Toast } from 'mint-ui'
import { validate } from 'utils/validate'

export default {
  data () {
    return {
      mobile: '',
      username: '',
      money: '',
      goodsId: ''
    }
  },
  created: function () {
    this.goodsId = this.$route.query.id
  },
  methods: {
    reserve: function () {
      if (validate.isEmpty(this.mobile)) {
        Toast('客户电话不能为空')
        return
      }

      if (validate.isEmpty(this.username)) {
        Toast('客户姓名不能为空')
        return
      }
      if (validate.isEmpty(this.money)) {
        Toast('预存定金不能为空')
        return
      }

      if (validate.isEmpty(this.goodsId)) {
        Toast('请选择商品')
        return
      }
      this.$axios.post(
        'goods/reserve',
        {
          mobile: this.mobile,
          username: this.username,
          money: this.money,
          goodsId: this.goodsId
        },
        r => {
          this.$store.commit('setMsg', {
            title: '预定成功',
            description: '请去收银台付款',
            icon: 'success',
            butType: 'primary',
            butText: '返回首页',
            butLink: '/productList'
          })

          this.$router.push({path: '/msg'})
        },
        r => {
          if (r.code === '101') {
            this.$router.push({path: '/login'})
          }
          Toast('请先注册会员')
          this.username = ''
        }
      )
    },
    getcusInfo: function () {
      if (validate.isEmpty(this.mobile)) {
        return
      }

      this.$axios.post(
        'customer/list',
        {
          mobile: this.mobile
        },
        r => {
          this.username = r.data.username
        },
        r => {
          if (r.code === '101') {
            this.$router.push({path: '/login'})
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
#reserve{
  width: 100%;
  height: 100%;
  position: absolute;
}

</style>

<style lang="less">

</style>



