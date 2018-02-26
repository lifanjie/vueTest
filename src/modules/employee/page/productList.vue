<template>
  <div>
    <div class="product_search">
      <div class="select_value_box">
      <span class="select_value" >全部</span>
      <span class="sanjiao_xia" ></span>
      </div>
      <select id="goodsType" ></select>
      <input type="text" placeholder='搜索条码'  autocapitalize="off" autocorrect="off" id="searchKey" />
      <img id="clear" src="images/close.png" 
      style="width: 20px;height: 20px;margin-top: 15px;margin-right: 15px;" />
      <button type="button" id="queryGoods">Search </button>
    </div>

    <div id="tempList"></div>

    <myFooter></myFooter>

  </div>
</template>

<script>
import myFooter from '../components/footer'

export default {
  components: {myFooter},
  data () {
    return {

    }
  }

}
</script>

<style lang="sass" scoped>
@import "../style/scss/productList"
</style>


