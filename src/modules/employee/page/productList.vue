<template>
  <div id="productList">

    <mt-tab-container v-model="active">

      <mt-tab-container-item id="tab-container1">
        <div class="product_search">  
        <div class="select_value_box">
        <span class="select_value" >{{goodsType.goodsType}}</span>
        <span class="sanjiao_xia" ></span>
        </div> 
        <select id="goodsType" v-model="goodsType" @change="initGoodsType()">
          <option value="">全部</option>
          <option class="select_value_li" v-for="item in goodsTypeList" :value="item">{{item.goodsType}}</option>
        </select> 
      <input type="text" placeholder='请输入商品条码' @keydown.13="queryGoods()" v-focus="isfocus"  v-model="searchKey" autocapitalize="off" autocorrect="off" id="searchKey" />
        <img id="clear" src="../static/image/close.png" 
        style="width: 20px;height: 20px;margin-top: 15px;margin-right: 15px;" />
        <button type="button" id="queryGoods" @click="queryGoods()">Search</button> 
    
      </div>  

      <div id="tempList">
        <div v-for="item in goodsList" class="product">
          <span class="product_title">【{{item.goodsTypeName}}】{{item.goodsName}}<span v-if="item.number==='0'" style="color:red;">无货</span></span>
          <div class="product_detail_box">
            <a class="goodsDetail" @click="activeTab('tab-container2',item)" style="position: relative;">	
              <img v-if="item.images === ''" class="hideimage goodsImg" src="../static/image/storage_camera1_03.png" style="width:65px;height:53px;">
              <img v-else class="goodsImg" :src="item.images">
            </a>
            <ul>
              <li>条码：{{item.goodsCode}} </li>             
              <li>净度：{{item.cleanliness}} </li>
              <li>重量：{{item.weight}} </li>
              <li>标价：<span style="color:#fb366b"> {{item.tagPrice}}</span> </li>
            </ul>
            <div v-if="item.number>'0'">        
            <span class="exchange_add">
            <img @click="addShopping(item.id,$event)" src="../static/image/icon_c (3).png">
            </span>
            <span v-if="item.isReserve ==='0'" @click="reserve(item.id)" class="reserve">
              <router-link :to="{ path: '/reserve', query: { id: item.id}}">	
                <img src="../static/image/icon_c (6).png">
            </router-link>
            </span>
            </div>
          </div>
        </div>
      </div>
      </mt-tab-container-item>

      <mt-tab-container-item id="tab-container2">
        <div class="page-field">
          <mt-header fixed title="商品信息">
            <router-link to="" @click.native="active ='tab-container1'" slot="left">
            <mt-button icon="back">返回</mt-button>
          </router-link>
          <mt-button @click="play()" slot="right">播放</mt-button>
          </mt-header>
        </div>
      
        <keep-alive>
          <goodsDetail :goods="goods"></goodsDetail>
        </keep-alive> 
      </mt-tab-container-item>

    </mt-tab-container>    
  </div>

  
</template>

<script>
import Vue from 'vue'
import { validate } from 'utils/validate'
import { commonUtil } from 'utils/commonUtil'
import {focus} from 'utils/directives'
import { Toast } from 'mint-ui'
import goodsDetail from '../components/goodsDetail'

Vue.use(focus)

export default {
  components: {
    goodsDetail
  },
  data () {
    return {
      active: 'tab-container1',
      goodsType: {goodsType: '全部'},
      searchKey: '',
      isfocus: true,
      goods: {},
      goodsTypeList: [],
      goodsList: [],
      results: [],
      url: ''
    }
  },
  created: function () {
    this.setGoodsType()
    this.queryGoods2()
  },
  methods: {
    play: function () {
      this.url = this.goods.audio
      addEventListener('message', () => {
        this.$refs.audio.src = this.url
        this.$refs.audio.play()
      }, false)
      postMessage(1, '*')
    },
    activeTab: function (tab, goods) {
      this.goods = goods
      this.active = tab
    },
    getResult: function (val) {
      console.log('on-change', val)
      this.results = val ? this.aa(this.value) : []
    },
    aa: function (val) {
      let rs = []
      for (let i = 0; i < 20; i++) {
        rs.push({
          title: `${val} result: ${i + 1} `,
          other: i
        })
      }
      return rs
    },
    initGoodsType: function () {
      if (validate.isEmpty(this.goodsType)) {
        this.goodsType = {goodsType: '全部'}
      }
    },
    queryGoods: function () {
      if (validate.isEmpty(this.searchKey) && validate.isEmpty(this.goodsType.id)) {
        Toast('请输入要搜索的商品')
        return
      }
      commonUtil.indicatorOpen('搜索中...')
      this.$axios.post(
        'goods/list',
        {
          goodsCode: this.searchKey,
          goodsType: this.goodsType.id
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
      this.isfocus = true
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
    addShopping: function (goodsId, event) {
      // commonUtil.indicatorOpen('添加到购物车...')

      this.$root.eventHub.$emit('additem', event.target)
      this.$axios.post(
        'goods/addShopping',
        {
         // goodsId: goodsId
        },
        r => {
          this.$store.commit('addOrders', 1)
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

<style lang="scss">
#productList {
   font-family: "Microsoft YaHei";
  //  position: absolute;
	 padding-bottom: 90px;
}
</style>

<style lang="scss" scoped>
  @import "../style/scss/productList";
</style>

<style lang="less">
.weui-search-bar__cancel-btn{
  display: none !important;
}
</style>






