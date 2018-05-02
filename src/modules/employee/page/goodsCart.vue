<template>
  <div id="goodsCart">
    <div class="tab-content">
			
      <div class="page-field">
        <mt-header fixed title="订单">
          <router-link to="/productList"  slot="left">
            <mt-button icon="back">返回</mt-button>
          </router-link>
          <mt-button @click="sureOrder()" slot="right">提交</mt-button>
        </mt-header>
      </div>	

      <div id="bill_List">
        <div class=" billxinxi" v-for="(item,index) in goodsList" >
          <input type="hidden"  class="GoodsInfo"/>
          <div class="col-md-13 margin-bottom-15" style="margin-bottom:15px;padding-bottom:15px;">
            <span class="product_title">【{{item.goodsTypeName}}】{{item.goodsName}}
            </span>
            <div class="product">
              <div>
              <router-link :to="{ path: '/productDetail', query: { id: item.id}}">	
              <img v-if="item.images === ''" class="hideimage goodsImg" src="../static/image/storage_camera1_03.png">
              <img v-else class="goodsImg" :src="item.images" style="width:230px;height:130px;">                      
              </router-link>
              <ul class="Attribute_list" style="max-width:140px;">
              <li>条码：{{item.goodsCode}} </li>
              <li>净度：{{item.cleanliness}} </li>
              <li>重量：{{item.weight}} </li>
              <li>标价：<span style="color:#fb366b;font-size:18px;"> {{item.tagPrice}}</span> </li>
              </ul>
              </div>
              <div style="position:absolute;right:5px;bottom:0;">
                  <ul class="margin-bottom_20">
                    <li style="margin-bottom:0;">
                        <button type="button" style="background-color:#aaa; margin-right:5px;" class="button_style2 " @click="deletebill(item.shoppingId,index)">删除</button>
                    </li>
                  </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
 
		</div>
   


  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'mint-ui'
Vue.component(Toast)

export default {
  data () {
    return {
      goodsList: []
    }
  },
  created: function () {
    this.loadOrder()
  },
  methods: {
    loadOrder: function () {
      this.$axios.post(
        'goods/shopping/list',
        {},
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
    deletebill: function (id, index) {
      this.$axios.post(
        'goods/deleteShopping',
        {
          id: id
        },
        r => {
          this.$store.commit('addOrders', -1)
          this.goodsList.splice(index, 1)
          if (this.goodsList.length === 0) {
            this.$router.push({path: '/productList'})
          }
        },
        r => {
          if (r.code === '101') {
            this.$router.push({path: '/login'})
          }
          Toast(r)
        }
      )
    },
    sureOrder: function () {
      this.$router.push({path: '/orderAdd'})
    }
  }
}
</script>

<style lang="scss">
</style>

<style lang="scss" scoped>
  @import "../style/scss/goodsCart";
</style>