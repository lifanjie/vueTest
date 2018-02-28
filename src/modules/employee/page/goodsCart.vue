<template>
  <div>
    <div class="tab-content">
			
      <div role="tabpanel" class="tab-pane active" id="home">
				<div class="container">
					<div class="row storage_body">
						<div class=" mendian_body">
							<div class="page_hd">
                <mt-header fixed title="订单">
                  <router-link to="/exchange"  slot="left">
                    <mt-button icon="back">返回</mt-button>
                  </router-link>
                </mt-header>
							</div>	

							<div id="bill_List">
                <div class=" billxinxi" v-for="item in goodsList" >
                  <input type="hidden"  class="GoodsInfo"/>
                  <div class="col-md-12 margin-bottom-15" style="margin-bottom:15px;padding-bottom:15px;">
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
                                <button type="button" style="background-color:#aaa; margin-right:5px;" class="button_style2 " @click="deletebill(item.id,$index)">删除</button>
                            </li>
                          </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
					</div>
				</div>
			</div>
		</div>

    <div class="con_footer" >
      <a class="submit_button"><button type="button"  class="button_style2 " @click="sureOrder()" >提交订单</button></a>
		</div>
    <myFooter ref="myFooter"></myFooter>
  </div>
</template>

<script>
import myFooter from '../components/footer'
import Vue from 'vue'
import { Toast } from 'mint-ui'
Vue.component(Toast)

export default {
  data () {
    return {
      goodsList: []
    }
  },
  components: {myFooter},
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
          this.$refs.myFooter.minusCount()
          this.goodsList.splice(index, 1)
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
body {
	font-family: "Microsoft YaHei";
    background-color: #f3f3f3;
    padding-bottom: 4rem;
}
</style>

<style lang="scss" scoped>
  @import "../style/scss/goodsCart";
</style>