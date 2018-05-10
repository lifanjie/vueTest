<template>
  <div>
    <div class="more_head_img">
         <img src="../static/image/icon_d2_02.png" />
         <div class="loginName_box">
            <img src="../static/image/icon_d_03.png" />
            <p id="loginName">{{userName}}</p>
         </div>
         
    </div>

    <div id="bill_List">

      <group :gutter=0 label-width="4.5em" label-align="left">
        <cell class="weui-vcode" title="客流信息" is-link link="/cusInfo">
          <img slot="icon" class="img-icon" src="../static/image/icon_d_14.png">
        </cell>
        <cell class="weui-vcode" title="盘 点" is-link link="/countPlan">
          <img slot="icon" class="img-icon" src="../static/image/icon_1_03.png">
        </cell>
        <cell class="weui-vcode" title="兑 换" is-link link="/exchangeGift">
          <img slot="icon" class="img-icon" src="../static/image/icon_1_03.png">
        </cell>
        <cell class="weui-vcode" title="返 现" is-link link="/exchangeCash">
          <img slot="icon" class="img-icon" src="../static/image/icon_1_03.png">
        </cell>
        <cell class="weui-vcode" title="话术学习" is-link link="/audio">
          <img slot="icon" class="img-icon" src="../static/image/icon_d_16.png">
        </cell>
        <!-- <cell class="weui-vcode" title="常见问题" is-link>
          <img slot="icon" class="img-icon" src="../static/image/icon_d_16.png">
        </cell> -->
      </group>

      <group :gutter=10 label-width="4.5em" label-align="left">
        <x-button class="footer_button" @click.native="outlogin()">退出登陆</x-button>
      </group>

    </div>

  </div>
</template>

<script>

export default {
  data () {
    return {
      userName: ''
    }
  },
  created: function () {
    this.userName = localStorage.getItem('userName')
  },
  methods: {
    outlogin: function () {
      this.$axios.post(
        '/outlogin',
        {},
        r => {
          this.$router.push({path: '/login'})
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
  @import "../style/scss/more";
</style>


