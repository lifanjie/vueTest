<template>
  <div id="storageSuccess">
    <div class="storgeContainer registered_success">
       <div class="row">
           <div class="col-md-12 registered_success_title">
              <img src="../static/image/bg-succeed.png">
              <p>下单成功！</p>
           </div>
            <router-link class="storge-a" :to="{ path: '/productList'}">
                <div class="col-md-12" style="  margin: 5rem auto 2rem;">
                  <div class="go_index">回到产品列表</div>
               </div>
            </router-link>                     
       </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  created: function () {

  }
}
</script>

<style lang="scss" scoped>
@import "../style/scss/storageSuccess"
</style>


