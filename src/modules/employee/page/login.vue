<template>
<div id='login'>
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
            <li class="getname" @click="selectName(item.username)" v-for="item in localList" >{{item.username}}</li>
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
import { Toast } from 'mint-ui'

export default {
  data () {
    return {
      localList: [],
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
          this.localList.push({
            username: username,
            password: password
          })
        }
      }
      // 设置默认的账号密码
      this.username = username
      this.password = password
    },
    setLocal: function (username, password) {
      for (let [index, item] of this.localList.entries()) {
        if (index > 3 && item.username !== username) {
          localStorage.removeItem(item.username + '_login')
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
          localStorage.setItem('userName', r.data.name)
          localStorage.setItem('faceBoxIp', r.data.office.faceBoxIp)
          // 首页地址
          // 开通人脸识别
          localStorage.setItem('isface', r.data.office.isface)

          // 设置登录信息
          this.setLocal(this.username, this.password)
          this.$router.push({path: '/productList'})
        },
        r => {
          if (r.code === '102' || r.code === '103' || r.code === '104') {
            this.$store.commit('setMsg', {
              title: '登录失败',
              description: r.message,
              icon: 'warn',
              butType: 'primary',
              butText: '返回登录',
              butLink: '/login'
            })
            this.$router.push({path: '/msg'})
          } else {
            Toast(r.message)
          }
        }
      )
    }
  }

}
</script>

<style lang="scss" scoped>
  @import "../style/scss/login";
</style>


