<template>
  <div>
    <div class="tab-content">
      <div class="page-field">
        <mt-header fixed title="支付">
          <router-link to="/productList"  slot="left">
            <mt-button icon="back">返回</mt-button>
          </router-link>          
        </mt-header>
      </div>	
    </div> 
    
    <div id="bill_List">  
      <div class=" billxinxi" v-for="(item,index) in goodsList">         
        <div class="col-md-12 margin-bottom-15" style="margin-bottom:15px;padding-bottom:15px;">
              <span class="product_title">【{{item.orderCode}}】</span>
              
              <div class="product">
              
              <div>
              <ul class="Attribute_list" style="max-width:250px;">
                <li>下单日期：{{item.tradeDate}} </li>
                <li>会员姓名：{{item.cusName}} </li>
                <li>会员电话：{{item.mobile}} </li>
                <li>实收金额：<span style="color:#fb366b;font-size:18px;"> {{item.receivable}}</span> </li>
              </ul>
              </div>

              <div style="position:absolute;right:0%;bottom:0;display:none;">
                    <ul class="margin-bottom_20">
                      <li style="margin-bottom:0;">
                        <button type="button" style="margin-right:5px;" class="button_style2" @click="payOrder(item.id)">支付</button>
                      </li>
                    </ul>
              </div>
                
              <div style="position:absolute;right:10%;bottom:0;">
                    <ul class="margin-bottom_20">
                      <li style="margin-bottom:0;">
                        <button type="button" style="background-color:#aaa; margin-right:5px;" class="button_style2" @click="deleteOrder(item.id,index)">取消</button>
                      </li>
                    </ul>
              </div>

            </div>
        </div>
      </div>      
		</div>

  </div>
</template>

<script>
import { Toast } from 'mint-ui'

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
        'goods/order/orderInfolist',
        {},
        r => {
          this.goodsList = r.data

          let pays = Number(this.goodsList.length)

          this.$store.commit('setPays', pays)
          if (pays === 0) {
            Toast('没有未支付的订单')
            this.$router.push({path: '/productList'})
          }
        }
      )
    },
    deleteOrder: function (id, index) {
      this.$axios.post(
        'goods/deleteOrder',
        {
          id: id
        },
        r => {
          Toast(r.message)
          this.$store.commit('addPays', -1)
          this.goodsList.splice(index, 1)
          if (this.goodsList.length === 0) {
            this.$router.push({path: '/productList'})
          }
        }
      )
    },
    payOrder: function () {

    }
  }

}
</script>

<style lang="scss" scoped>
@import "../style/scss/orderPay";
</style>


