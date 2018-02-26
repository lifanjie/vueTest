<template>
  <div>
    <div class="product_search">
      <div class="select_value_box">
      <span class="select_value" >{{selectValue}}</span>
      <span class="sanjiao_xia" ></span>
      </div>
      <select id="goodsType" @change="selectValue==goodsType" ></select>
      <input type="text" placeholder='搜索条码' @keydown.13="queryGoods()"  v-model="searchKey" autocapitalize="off" autocorrect="off" id="searchKey" />
      <img id="clear" src="images/close.png" 
      style="width: 20px;height: 20px;margin-top: 15px;margin-right: 15px;" />
      <button type="button" id="queryGoods" @click="queryGoods()">Search </button>
    </div>

    <div id="tempList"></div>

    <myFooter></myFooter>

  </div>
</template>

<script>
import Vue from 'vue'
import {directives} from 'utils/directives'
import myFooter from '../components/footer'

Vue.use(directives)

export default {
  components: {myFooter},
  data () {
    return {
      selectValue: '全部',
      goodsType: '',
      searchKey: '',
      isfocus: true
    }
  },
  methods: {
    queryGoods: () => {
    },
    clear: () => {
      this.searchKey = ''
    }
  }

}
</script>

<style lang="sass" scoped>
@import "../style/scss/productList"
</style>


