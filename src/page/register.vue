<template>
  <div>
    <div class="page-field">
      <myHeader></myHeader>
    </div>  

    <div class="page-tab-container">
      <mt-tab-container v-model="active">
      
      <mt-tab-container-item id="tab-container1">
        <div class="page-part">
          <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
          <mt-field label="验证码" placeholder="请输入验证码" v-model="captcha">
            <div class="cond_num"><span class="valiCode">免费获取</span></div>
          </mt-field>
        </div>
        <div class="page-button">
          <mt-button  type="primary" @click.native="validate()" size="large">验证</mt-button>
        </div>
      </mt-tab-container-item>
      
      <mt-tab-container-item id="tab-container2">

      </mt-tab-container-item> 

      </mt-tab-container>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import myHeader from '../components/header'
import { Field, Toast, Button } from 'mint-ui'

Vue.component(Field)
Vue.component(Button)
Vue.component(Toast)

export default {
  components: {myHeader},
  data () {
    return {
      active: 'tab-container1',
      captcha: '',
      phone: ''
    }
  },
  methods: {
    validate: function () {
      Toast(this.active)
    }
  }
}
</script>

<style lang="scss">
  @import "../style/scss/_register";
</style>


