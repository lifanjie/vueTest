<template>
  <div>
    <div class="more_head">
      <span>更多</span>
    </div>
    <div class="more_head_img">
         <img src="../static/image/icon_d2_02.png" />
         <div class="loginName_box">
            <img src="../static/image/icon_d_03.png" />
            <p id="loginName">{{userName}}</p>
         </div>
         
    </div>



    <group label-width="4.5em" label-align="left">
      <cell title="销售报表"  is-link>
        <img slot="icon" class="img-icon" src="../static/image/icon_d_14.png">
      </cell>      
      <cell title="客流信息" is-link>
        <img slot="icon" class="img-icon" src="../static/image/icon_d_14.png">
      </cell>
      <cell title="盘 点" is-link link="/countPlan">
        <img slot="icon" class="img-icon" src="../static/image/icon_1_03.png">
      </cell>
      <cell title="兑 换" is-link>
        <img slot="icon" class="img-icon" src="../static/image/icon_1_03.png">
      </cell>
      <cell title="返 现" is-link>
        <img slot="icon" class="img-icon" src="../static/image/icon_1_03.png">
      </cell>
      <cell title="音频注释" is-link>
        <img slot="icon" class="img-icon" src="../static/image/icon_d_16.png">
      </cell>
      <cell title="常见问题" is-link>
        <img slot="icon" class="img-icon" src="../static/image/icon_d_16.png">
      </cell>
    </group>

    <div class="out_button" @click="outlogin()">退出登陆</div>

  </div>
</template>

<script>
import { Group, Cell } from 'vux'

export default {
  components: {
    Group,
    Cell
  },
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
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/scss/more";
</style>

<style lang="less">

.weui-cell_access .weui-cell__ft:after{
  height: 12px !important;
  width: 12px !important;
}

</style>



