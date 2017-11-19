<template>
  <div>  

    <div class="page-tab-container">
      <mt-tab-container v-model="active">
      
      <mt-tab-container-item id="tab-container1">
          <div class="page-field">
            <mt-header fixed title="会员注册"></mt-header>
          </div>
        <div class="page-part">
          <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="mobile"></mt-field>
          <mt-field label="验证码" placeholder="请输入验证码" v-model="captcha">
            <div class="cond_num" v-bind:class="{cond_num_actinve: isActive }" @click="getSMS()">
              <span class="valiCode">{{codeText}}</span></div>
          </mt-field>
        </div>
        <div class="page-button">
          <mt-button  type="primary" @click.native="sureCode()" size="large">验证</mt-button>
        </div>
      </mt-tab-container-item>
      
      <mt-tab-container-item id="tab-container2">
        <div class="page-field">
          <mt-header fixed title="会员注册"></mt-header>
        </div>        
        <div class="org_box" v-for="item in orgList">
          <div class="org_box_a">
            <div class="images"><img :src="item.imageOrg"></div>
            <div class="info">
              <p class="org_name">{{item.name}}<a class="page_c fl page_next"  @click="selectOrg(item.id)" data-page="page_c"></a></p>
              <div class="xian"></div>
              <p class="org_info">地址：{{item.address}}</p>
              <p class="org_phone">电话：{{item.phone}}</p>
            </div>
          </div>
        </div>
      </mt-tab-container-item> 

      <mt-tab-container-item id="tab-container3">
        <div class="page-field">
          <mt-header fixed title="会员注册">
            <router-link to="" @click.native="activeTab()" slot="left">
              <mt-button icon="back">返回</mt-button>
            </router-link>
          </mt-header>
        </div>        
        <div class="page-part">
          <mt-field label="姓名" placeholder="请输入姓名" v-model="username"></mt-field>
          
          <a class="mint-cell mint-field">
            <div class="mint-cell-wrapper">
              <label class="mint-cell-title">性别</label>  
                
                <label class="radio_label">
                  <input class="radio_input" type="radio" v-model="sex" value="1" alt="男">
                  <span class="radio_span"></span>男
                </label>
        
                <label class="radio_label">
                  <input class="radio_input" type="radio" v-model="sex" value="2" alt="女" checked="checked">
                  <span class="radio_span"></span>女
              </label> 

            </div>
           </a>
          <mt-datetime-picker ref="picker" type="date" :startDate="startDate" :endDate="endDate" @confirm="handleConfirm" 
          v-model="select_birthday"></mt-datetime-picker>
          <mt-field label="生日" placeholder="请输入生日" type="text" v-model="birthday" 
          @click.native="openPicker()" readonly="readonly"></mt-field>
          <mt-field label="推荐人" placeholder="请输入推荐人手机号(可选)" type="tel" v-model="referee"></mt-field>
        </div>
        <div class="page-button">
          <mt-button  type="primary" @click.native="sureRigister()" size="large">完成</mt-button>
        </div>
      </mt-tab-container-item>      

      </mt-tab-container>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import { Field, Button, Toast, DatetimePicker } from 'mint-ui'
import { validate } from '../utils/validate'
import { formatDate } from '../utils/dateUtils'

Vue.component(Field)
Vue.component(Button)
Vue.component(Toast)
Vue.component(DatetimePicker)

export default {
  components: { },
  data () {
    return {
      orgId: '2f28d353c39b45e9bceb9bbe055d471b',
      openId: 'oA5XNjnip9eUqUSdrCAKYnwLymXc',
      active: 'tab-container1',
      captcha: '',
      mobile: '',
      username: '',
      sex: '2',
      select_birthday: new Date(),
      birthday: '',
      startDate: new Date('1950-01-01'),
      endDate: new Date(),
      referee: '',
      orgList: [
        {name: '1', address: '23'},
        {name: '2', address: '33'}
      ],
      codeText: '免费获取',
      countdown: 60,
      timeFlag: false,
      isActive: false
    }
  },
  created: function () {
    this.orgId = this.$route.params.orgId
    this.openId = this.$route.params.openId
    this.getOrgList()
  },
  methods: {
    settime: function () {
      if (this.countdown === 0) {
        this.isActive = false
        this.codeText = '免费获取'
        this.countdown = 60
        this.timeFlag = false
        return
      } else {
        this.timeFlag = true
        this.isActive = true
        this.codeText = `(${this.countdown})`
        this.countdown--
      }
      setTimeout(() => {
        this.settime()
      }, 1000)
    },
    // 获得验证码短信
    getSMS: function () {
      if (this.timeFlag) {
        Toast('请勿频繁获取')
        return
      }
      // 验证手机号码
      let mobile = this.mobile
      if (!validate.isMobile(mobile)) {
        return
      }

      this.$api.post(
        'sms/send',
        {
          mobile: this.mobile,
          orgId: this.orgId,
          openId: this.openId
        },
        r => {
          // 获得验证码
          this.settime()
        },
        r => {
          Toast(r)
        }
      )
    },
    sureCode: function () {
      let captcha = this.captcha
      // 检查验证码输入
      if (!validate.isRequired(captcha, '验证码')) {
        return
      }
      if (!validate.isLength(captcha)) {
        return
      }
      // 验证手机号码
      let mobile = this.mobile
      if (!validate.isMobile(mobile)) {
        return
      }

      this.$api.post(
        'sms/validate',
        {
          phone: this.mobile,
          captcha: this.captcha
        },
        r => {
          // 进入选择门店界面
          this.active = 'tab-container2'
        },
        r => {
          Toast(r)
        }
      )
    },
    // 生成门店选择模板
    getOrgList: function () {
      this.$api.post(
        'customer/getweixinOrgId',
        {
          orgId: this.orgId
        },
        r => {
          this.orgList = r.data
        },
        r => {
          Toast(r)
        }
      )
    },
    activeTab: function () {
      this.active = 'tab-container2'
    },
    selectOrg: function (orgId) {
      this.orgId = orgId
      // 进入选择门店界面
      this.active = 'tab-container3'
    },
    // 弹出生日选择
    openPicker: function () {
      this.$refs.picker.open()
    },
    handleConfirm: function (value) {
      // Toast(formatDate(this.select_birthday, 'yyyy-MM-dd'))
      this.birthday = formatDate(value, 'yyyy-MM-dd')
    },
    sureRigister: function () {
      let mobile = this.mobile
      let username = this.username
      let birthday = this.birthday
      let referee = this.referee
      let sex = this.sex

      if (!validate.isMobile(mobile)) {
        return
      }

      if (!validate.isRequired(username, '姓名')) {
        return
      }

      if (!validate.isRequired(birthday, '生日')) {
        return
      }

      if (referee.length > 0 && referee === mobile) {
        Toast('推荐人不能填本人手机号')
        return
      }

      this.$api.post(
        'customer/register',
        {
          mobile: mobile,
          username: username,
          birthdayStr: birthday,
          refereeMobile: referee,
          openIdStr: this.openId,
          orgId: this.orgId,
          sex: sex
        },
        r => {
          // Toast('注册成功')
          this.$route.push({
            path: '/',
            query: {
              orgId: this.orgId,
              openId: this.openId
            }
          })
        },
        r => {
          Toast(r)
        }
      )
    }
  }
}
</script>

<style lang="scss">
@import "../style/scss/_register";
</style>


