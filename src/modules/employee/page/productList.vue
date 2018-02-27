<template>
  <div>
    <div class="product_search">
      <div class="select_value_box">
      <span class="select_value" >{{goodsType}}</span>
      <span class="sanjiao_xia" ></span>
      </div>
      <select id="goodsType" v-model="goodsType">
        <option value="全部">全部</option>
        <option class="select_value_li" v-for="item in goodsTypeList" v-bind:value="item.id">{{item.goodsType}}</option>
      </select>
      <input type="text" placeholder='搜索条码' @keydown.13="queryGoods()" v-focus="isfocus"  v-model="searchKey" autocapitalize="off" autocorrect="off" id="searchKey" />
      <img id="clear" src="../static/image/close.png" 
      style="width: 20px;height: 20px;margin-top: 15px;margin-right: 15px;" />
      <button type="button" id="queryGoods" @click="queryGoods()">Search </button>
    </div>

    <div id="tempList">
      <div v-for="item in goodsList" class="product">
        <span class="product_title">【{{item.goodsTypeName}}】{{item.goodsName}}<span v-if="item.number==='0'" style="color:red;">无货</span></span>
        <div class="product_detail_box">
          <router-link :to="{ path: '/productDetail', query: { id: item.id}}" style="position: relative;">	
            <img v-if="item.images === ''" class="hideimage goodsImg" src="../static/image/storage_camera1_03.png" style="width:65px;height:53px;">
            <img v-else class="goodsImg" :src="item.images">
          </router-link>
          <ul>
            <li>条码：{{item.goodsCode}} </li>             
            <li>净度：{{item.cleanliness}} </li>
            <li>重量：{{item.weight}} </li>
            <li>标价：<span style="color:#fb366b"> {{item.tagPrice}}</span> </li>
          </ul>
          <div v-if="item.number>'0'">        
          <span @click="addShopping(item.id)" class="exchange_add">
          <img src="../static/image/icon_c (3).png">
          </span>
          <span v-if="item.isReserve ==='0'" @click="reserve(item.id)" class="reserve">
          <img src="../static/image/icon_c (6).png">
          </span>
          </div>
        </div>
      </div>
    </div>

    <myFooter ref="myFooter"></myFooter>

  </div>

  
</template>



<script>
import Vue from 'vue'
import { validate } from 'utils/validate'
import { commonUtil } from 'utils/commonUtil'
import {focus} from 'utils/directives'
import myFooter from '../components/footer'
import { Toast } from 'mint-ui'

Vue.component(Toast)
Vue.use(focus)

Vue.component('child1', {
  template: '#child1',
  data () {
    return {
      msg: '这是子组件1的信息'
    }
  }
})

export default {
  components: {myFooter},
  data () {
    return {
      goodsType: '全部',
      searchKey: '',
      isfocus: true,
      goodsTypeList: [],
      goodsList: []
    }
  },
  created: function () {
    this.queryGoods2()
   // console.log(this.$refs.myFooter)
   // this.$refs.myFooter.loadShopping()
  },
  methods: {
    queryGoods: function () {
      if (validate.isEmpty(this.searchKey) && validate.isEmpty(this.goodsType)) {
        Toast('请输入要搜索的商品')
        return
      }
      commonUtil.indicatorOpen('搜索中...')
      this.$axios.post(
        'goods/list',
        {
          goodsCode: this.searchKey,
          goodsType: this.goodsType === '全部' ? '' : this.goodsType
        },
        r => {
          this.clear()
          this.goodsList = r.data
        },
        r => {
          if (r.code === '101') {
            this.$router.push({path: '/login'})
          }
          Toast(r)
        }
      )
    },
    queryGoods2: function () {
      this.$axios.post(
        'goods/list',
        {
          goodsCode: ''
        },
        r => {
          this.goodsList = r.data
        },
        r => {
          if (r.code === '101') {
            this.$router.push({path: '/login'})
          }
          Toast(r)
        }
      )
    },
    clear: function () {
      this.searchKey = ''
    },
    setGoodsType: function () {
      this.$axios.post(
        'goods/goodsType',
        {},
        r => {
          this.goodsTypeList = r.data
        },
        r => {
          Toast(r)
        }
      )
    },
    addShopping: function (goodsId) {
      this.$refs.myFooter.loadShopping()
      commonUtil.indicatorOpen('添加到购物车...')
      this.$axios.post(
        'goods/addShopping',
        {
          goodsId: goodsId
        },
        r => {
        },
        r => {
          Toast(r)
        }
      )
    },
    reserve: function (id) {
      this.$router.push({path: '/reserve', query: {id: id}})
    }
  }

}
</script>

<style lang="sass" scoped>
@import "../style/scss/productList"
</style>


