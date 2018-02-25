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
          <input style="padding-top:12px;width:100%" type="text" class="username" 
          autocapitalize="off" autocorrect="off"
          placeholder="请输入您的账号" autofocus maxlength="20"/>
          <ul class="select_username"></ul>
		    </div>
    </div>

    <div class="login_mm" >
      <img src="../static/image/icon_0_11.png" />
      <input type="password" class="password"  placeholder="请输入您的密码" maxlength="20"> 
    </div>
  </div> 

  <div class="page_bot"> 
    <a class="login_btn">登&nbsp;&nbsp;&nbsp;录</a>  
  </div>

</div>  
</template>

<script>
export default {

}
</script>

<style lang="sass" scoped>
@import "../style/scss/login";
</style>


