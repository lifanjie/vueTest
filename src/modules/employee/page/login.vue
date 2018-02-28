<template>
<div>
  <div class="header">
    <img src="../static/image/img_02.png" />
    <div class='header_title'>
        <img src="../static/image/icon_0_03.png" />
        <p class="tit">柜台登录</p>
    </div>
  </div> 

  <div class="login_con">
    <div class="login_zh">
        <div>
         <img src="../static/image/icon_0_07.png" />
        </div>
        <div style="width:100%">
          <input style="padding-top:12px;width:100%" type="text" class="username" v-model="username"
          autocapitalize="off" autocorrect="off" @click="isSelectName = true" @keydown="isSelectName = false"
          placeholder="请输入您的账号" autofocus maxlength="20"/>
          <ul class="select_username" v-show="isSelectName">
            <li class="getname" @click="selectName(key)" v-for="(value,key) in localList" >{{ key }}</li>
          </ul>
		    </div>
    </div>

    <div class="login_mm" >
      <img src="../static/image/icon_0_11.png" />
      <input type="password" class="password" v-model="password" placeholder="请输入您的密码" maxlength="20"> 
    </div>
  </div> 

  <div class="page_bot"> 
    <a @click="login()" class="login_btn">登&nbsp;&nbsp;&nbsp;录</a>  
  </div>

</div>  
</template>

<script>
import { validate } from 'utils/validate'
import { commonUtil } from 'utils/commonUtil'
import Vue from 'vue'
import { Toast } from 'mint-ui'

Vue.component(Toast)

export default {
  data () {
    return {
      localList: {},
      username: '',
      password: '',
      isSelectName: false
    }
  },
  created: function () {
    this.getLocalList()
  },
  methods: {
    getLocalList: function () {
      let username = ''
      let password = ''
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)

        if (validate.isContains(key, '_login')) {
          username = key.replace(/_login/, '')
          password = localStorage.getItem(key)
          this.localList[username] = password
        }
      }

      // 设置默认的账号密码
      this.username = username
      this.password = password
    },
    setLocal: function (username, password) {
      var a = 0
      for (let key in this.localList.keys) {
        if (a++ === 5 && key !== username) {
          localStorage.removeItem(username + '_login')
        }
      }

      localStorage.setItem(username + '_login', password)
    },
    selectName: function (username) {
      this.username = username
      this.password = localStorage.getItem(username + '_login')
      this.isSelectName = false
    },
    login: function () {
      if (!validate.isEmptyWarn(this.username, '账号')) {
        return
      }

      if (!validate.isEmptyWarn(this.password, '密码')) {
        return
      }

      commonUtil.indicatorOpen('登录中...')
      this.$axios.post(
        'syslogin',
        {
          username: this.username,
          password: this.password
        },
        r => {
          // 设置全局变量
          localStorage.setItem('orgId', r.data.office.id)
          localStorage.setItem('userId', r.data.id)
          localStorage.setItem('faceBoxIp', r.data.office.faceBoxIp)
          // 首页地址
          // 开通人脸识别
          localStorage.setItem('isface', r.data.office.isface)

          // 设置登录信息
          this.setLocal(this.username, this.password)

          // 是否绑定平板
          if (r.data.office.isbind === '1') {
            this.bindDrivice()
          } else {
            this.$router.push({path: '/productList'})
          }
        },
        r => {
          Toast(r)
        }
      )
    },
    bindDrivice: function () {
      this.$axios.post(
        'check/checkDriveId',
        {
          deviceId: this.WebApp.getDeviceID()
        },
        r => {
          this.$router.push({path: '/productList'})
        },
        r => {
          Toast(r)
          this.$router.push({path: '/errorBind'})
        }
      )
    }
  }

}
</script>

<style lang="scss" scoped>
  @import "../style/scss/login";
</style>


