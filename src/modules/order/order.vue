<template>
  <div id="app">
    <audio ref="audio"></audio>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" >
  @import "./style/style";
</style>


<style lang="less">

.weui-cell_access .weui-cell__ft:after{
  height: 12px !important;
  width: 12px !important;
}

.previewValue .weui-form-preview__value{
  text-align: left !important;
}

.sure_button{
  color: #ffffff !important;

}
.sure_div{
  margin: 10px;
}

.sure_btn{
  background-color: #26a2ff !important;
}

.next_btn {
  background-color: #ccc !important;
}

.weui-form-preview__bd,.weui-form-preview__label{
  color: black !important;
}



 .vux-cell-value{
   color:black !important;
 }
</style>
