<template>
  <div>
      <div class="page-field">
        <mt-header fixed title="修改资料">
          <router-link to='/cusCenter'  slot="left">
            <mt-button icon="back">返回</mt-button>
          </router-link>
        </mt-header>
      </div>        
      <div class="page-part">
        <mt-field label="姓名" placeholder="请输入姓名" v-model="username"></mt-field>
        <mt-field label="电话" placeholder="请输入电话" v-model="mobile"></mt-field>
        <a class="mint-cell mint-field">
          <div class="mint-cell-wrapper">
            <label class="mint-cell-title">性别</label>  
              
              <label class="radio_label">
                <input class="radio_input" type="radio" v-model="sex" value="1" alt="男">
                <span class="radio_span"></span>男
              </label>
      
              <label class="radio_label">
                <input class="radio_input" type="radio" v-model="sex" value="2" alt="女">
                <span class="radio_span"></span>女
            </label> 

          </div>
          </a>

        <mt-field label="生日" placeholder="请输入生日" type="text" v-model="birthday" readonly="readonly" ></mt-field>
        <mt-field label="推荐人" placeholder="请输入推荐人手机号(可选)" type="tel" v-model="refereeMobile" :readonly="isReferee"></mt-field>
      </div>
      <div class="page-button">
        <mt-button  type="primary" @click.native="sure()" size="large">完成</mt-button>
      </div>
  </div>
</template>

<script>

import { Toast } from 'mint-ui'
import { validate } from 'utils/validate'

export default {
  data () {
    return {
      id: '',
      username: '',
      sex: '1',
      birthday: '',
      mobile: '',
      isReferee: false,
      refereeMobile: ''
    }
  },
  created: function () {
    this.getInfo()
  },
  methods: {
    getInfo: function () {
      this.$axios.post(
        'isLogin',
        {},
        r => {
          this.id = r.data.id
          this.username = r.data.username
          this.mobile = r.data.mobile
          this.refereeMobile = r.data.refereeMobile
          this.sex = r.data.sex
          this.birthday = r.data.birthday
          this.isReferee = validate.isEmpty(this.isReferee)
        },
        r => {
          Toast(r)
        }
      )
    },
    sure: function () {
      this.$axios.post(
        'customer/update',
        {
          id: this.id,
          username: this.username,
          sex: this.sex,
          mobile: this.mobile,
          refereeMobile: this.refereeMobile
        },
        r => {
          Toast(r)
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

</style>


