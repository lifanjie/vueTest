<template>
  <div id="orderAdd">  
    <mt-tab-container v-model="active">
    
      <mt-tab-container-item id="tab-container1">
        <div class="page-field">
          <mt-header fixed title="会员信息">
          <router-link to="/goodsCart"  slot="left">
            <mt-button icon="back">返回</mt-button>
          </router-link>
          </mt-header>
        </div>

        <div class="page-part">
          <div class="storage_body_line" style="border-top:1px solid #e5e5e5;">
            <span class="storage_body_line_title">客户电话</span> 
            <span class="storage_body_line_info dianhuahaoma"> 
            <input type="number" placeholder="请输入客户电话"  class="mobile" v-model="mobile" maxlength="11" @blur="getcusInfo()">
            </span>
					</div>

          <div class="storage_body_line">
            <span class="storage_body_line_title">客户姓名</span> 
            <span class="storage_body_line_info xingming"> 
            <input type="text" placeholder="请输入客户姓名" v-model="username" class="username" maxlength="20" />
            </span>
          </div>

 					<div class="storage_img_line">
						<span class="storage_img_line_title">客户头像</span> 
            <span class="storage_img_line_info touxiang" style="width:70%;">
              <div class="fileUpload btn btn-primary" id="fileUpload">
                <span></span> 
                <input id="uploadBtn" type="file" ref="myfiles"
                class="upload" name="myfiles" @change="uploadPicture()" />
              </div>
              <img :src="headPic" v-show="isHeadPic" alt="" id="viewImg" class="storage_img_line_img"/>
            </span> 
					</div>

          <div class="add_new_address3">
            <a class="page_next2" @click="cusOver()" style="display:block;">
            <div class="add_new_address_body" style="background-color: #ccc!important;background-image: none!important;">跳过</div>
            </a> 
            <a class="page_next" data-page="page_b" style="display:block;" @click="cusNext()">
            <div class="add_new_address_body">下一步</div>
            </a> 
          </div>          

        </div>
        
      </mt-tab-container-item>

      <mt-tab-container-item id="tab-container2">
        <div class="page-field">
          <mt-header fixed title="订单信息">
            <router-link to="" @click.native="activeTab('tab-container1')" slot="left">
            <mt-button icon="back">返回</mt-button>
          </router-link>
          </mt-header>
        </div>

        <div id="billTemplate">

          <div class="storage_choose_place GoodsInfo" v-for="item in goodsList">

            <div class="col-md-12 margin-bottom-15" style="margin-bottom:15px;padding-bottom:3px;">
              <span class="product_title">【{{item.goodsTypeName}}】{{item.goodsName}}</span>
              <div class="product">
                <div>  
                  <a @click="checkGoods(item.id)" >
                  <img v-if="item.images === ''" src="../static/image/storage_camera1_03.png" class="goodsImg">
                  <img v-else :src="item.images" style="width:230px;height:130px;">
                  </a>
                  <ul class="Attribute_list" style="max-width:140px;">
                  <li>条码：{{item.goodsCode}} </li>
                  <li>净度：{{item.cleanliness}} </li>
                  <li>重量：{{item.weight}} </li>
                  <li>标价：<span style="color:#fb366b;font-size:18px;"> {{item.tagPrice}}</span> </li>
                  </ul>
                </div> 

                <div style="position:absolute;right:5px;bottom:0;"> 
                  <ul class="margin-bottom_20">    
                    <li style="margin-bottom:0;"><button type="button" style="background-color:#aaa; margin-right:5px;" class="button_style2"  
                    @click="deletebill('${id}GoodsInfo','${shoppingId}')">删除</button>
                    </li>
                  </ul> 
                </div> 
              </div> 	
            </div>
              
    
            <div class="storage_body_line" v-if="item.number > 1">
              <span class="storage_body_line_title">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量</span> 
              <span class="storage_body_line_info shuliang">
              <input type="hidden" class="numberCount" value="${number}"/>
              <input type="number" placeholder="请输入数量" class="number" maxlength="11"  @blur="numPriceSum()">
              </span>
            </div>

            <div v-if="item.tagPrice === '' && item.weight != ''">
              <div class="storage_body_line">
                <span class="storage_body_line_title">商品实重</span> 
                <span class="storage_body_line_info">
                  <input class="realWeight" type="number" placeholder="请输入商品实重" value="${weight}" @blur="countspend()">
                </span>
              </div>
				
              <div class="storage_body_line">
                <span class="storage_body_line_title">销售单价</span> 
                <span class="storage_body_line_info">
                  <input class="quoteprice" v-model="item.quoteprice" type="hidden" />
                  <input class="nowPrice" type="number" placeholder="今日牌价:item.quoteprice" maxlength="11"  v-modal="item.nowPrice" @blur="countspend()">
                </span>
              </div> 
				
              <div class="storage_body_line" v-if="isExcludeFee === true">
                <span class="storage_body_line_title">工费单价</span> 
                <span class="storage_body_line_info">
                  <input class="fee" type="number" placeholder="请输入工费单价" maxlength="11" @blur="setFee()">
                </span>
              </div>

              <div class="storage_body_line" v-if="isExcludeFee === true">
                <span class="storage_body_line_title">工费</span> 
                <span class="storage_body_line_info">
                  <input class="feePrice" type="number" placeholder="请输入工费" maxlength="11"  v-model="item.fee" @blur="countspend()">
                </span>
              </div>
            </div>        

            <div class="storage_body_line" v-if="item.tagPrice != '' && item.isFictitious != '1'">
              <span class="storage_body_line_title">折扣(%)</span>
              <span class="storage_body_line_info">
                <input type="hidden" class="tagPrice" value="${tagPrice}" />
                <input class="discount" type="number" placeholder="标价*折扣=成交价格" maxlength="11" @blur="setDiscount(this)">
              </span>
            </div>

            <div class="storage_body_line">
              <span class="storage_body_line_title">优惠金额</span> 
              <span class="storage_body_line_info">
                <input class="differPrice" type="number" placeholder="请输入优惠金额" maxlength="11" @blur="setDifferPrice(this)">
              </span>
            </div>

            <div class="storage_body_line">
              <span class="storage_body_line_title">销售金额</span> 
              <span class="storage_body_line_info">
                <input v-if="item.tagPrice != ''" type="hidden" class="noSuJin" />
                <input class="goodsTagPrice" value="${tagPrice}" type="hidden" />
                <input class="receMoney" value="${tagPrice}" type="hidden" />
                <input class="receMon" type="hidden" />
                <input class="strikePrice" type="number" placeholder="请输入销售金额" maxlength="11"  v-model="item.tagPrice" @blur="setTotalBill()">
              </span>
            </div>

            <div class="storage_body_line" v-if="item.isReserve === '1'">
              <span class="storage_body_line_title">已收订金</span> 
              <span class="storage_body_line_info">
                <input class="deposit" type="number" value="${deposit}" readonly="true" style="color:#fb366b;">
              </span>
            </div>

            <div class="storage_body_line">
              <span class="storage_body_line_title">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</span> 
              <span class="storage_body_line_info beizhu">
                <input class="remarks" type="text" placeholder="请输入备注" maxlength="200" />         
              </span>
            </div>

            <div class="storage_img_line" >
              <span class="storage_img_line_title">商品图片</span> 
              <span class="storage_img_line_info touxiang" style="width:50%;">
                <div class="fileUpload btn btn-primary">
                  <span></span>
                  <input id="uploadBtn${id}" type="file" class="upload"  name="myfiles"  @change="uploadGoodsPicture(item.id)"/>
                  <input type="hidden" class="photo"/>
                </div>
                <img style="display:none" src="" alt=""  class="storage_img_line_img"/>	
              </span>
            </div>

        </div>  

        <div class="storage_body_line_box">
          <div class="storage_body_line">
            <span class="storage_body_line_title" >换货记录</span> 
            <span class="storage_img_line_info huanhuoNo" >
            <div style="text-align: right;padding-right: 10px;">
              <input type="text" readOnly="true"  maxlength="50" class="input_button" id="barterNo" style="width:15px!important;color:#999;">
                <button type="button" class="button_style2 button_jisuan" @click="insertBarter()">新增</button>
            </div>
            </span> 											
          </div>						
          <div id="xinzeng_huanhuo_List" style="background-color: #ececec;"></div>														
				</div> 

        <div class="storage_body_line_box">
          <div class="storage_body_line">
          <span class="storage_body_line_title" >赠品记录</span> 
          <span class="storage_img_line_info zengpinNo">
          <div style="text-align: right;padding-right: 10px;">
            <input type="text" readOnly="true"  maxlength="50" class="input_button" id="giveNo"  style="width: 15px!important; color: #999;">
            <button type="button" class="button_style2 button_jisuan" @click="insertGive()">新增</button>
          </div>
          </span>											
        </div>				
        <div id="xinzeng_zengpin_List"></div>																				
        </div>

        <div class="storage_body_line" id="prestoreDiv" style="display:none">
          <span class="storage_body_line_title">预存金额</span> 
          <span class="storage_body_line_info">
            <input type="number" placeholder="" id="prestore"  maxlength="11" @blur="setPrestore()" >
          </span>  
        </div> 
        
        <div class="storage_body_line">
          <span class="storage_body_line_title">订单备注</span> 
          <span class="storage_body_line_info beizhu">
            <input id="orderRemarks" type="text" placeholder="请输入订单备注" maxlength="120">
          </span>
        </div> 

        <div class="storage_body_line" style="border-top:1px solid #e5e5e5;">
          <span class="storage_body_line_title">总折扣</span> 
          <span class="storage_body_line_info "> 
            <input type="number" placeholder="总折扣(%)" id="discountSum" o@blur="setDiscountSum()" class="input_button" maxlength="11">	
          </span>  									
        </div> 

        <div class="container my_total_assets_list">
          <div class="row">
            <div class="col-md-12" style="margin-bottom:0!important;">
              商品金额 <span id="goodsTagPriceSum" style="margin-left:15px;"></span>
              <span id="spendSum" style="display:none;"></span>
            </div>												
            <div class="col-md-12" style="margin-bottom:0!important;">
              现&ensp;金&ensp;劵 <span id="price" style="margin-left:15px;"></span>
            </div>
            <div class="col-md-12" id="prestoreSumDiv" style="margin-bottom:0!important;display:none">
              预存金额 <span id="prestoreSum" style="margin-left:15px;"></span>
            </div>
            <div class="col-md-12" id="depositDiv" style="margin-bottom:0!important;display:none">
              已收订金 <span id="depositSum" style="margin-left:15px;color:#fb366b;"></span>
            </div>
            <div class="col-md-12" style="margin-bottom:0!important;">
              换货金额 <span id="barterMoneySum" style="margin-left:15px;"></span>	
            </div>
            <div class="col-md-12" style="margin-bottom:0!important;">
              折&ensp;旧&ensp;费 <span id="depreciationSum" style="margin-left:15px;"></span>
            </div>
            <div class="col-md-12" id="DiscountsDiv" style="margin-bottom:0!important;">
              优惠总额 <span id="Discounts" style="margin-left:15px;"></span>
            </div>
            <div class="col-md-12" id="RealCollection" style="margin-bottom:0!important;">
              实收金额 <span id="receivable" style="margin-left:15px;color:#fb366b;"></span>
              <span id="TotalBill" style="display:none;"></span>
            </div>
          </div>
        </div> 

        <div class="add_new_address2 sure_button" @click="sureOrder()">
          <div class="add_new_address_body " >
          立即下单
          </div>
        </div>                                                   

      </div>  




      </mt-tab-container-item>  

      <mt-tab-container-item id="tab-container3">
        <div class="page-field">
          <mt-header fixed title="商品信息">
            <router-link to="" @click.native="activeTab('tab-container3')" slot="left">
            <mt-button icon="back">返回</mt-button>
          </router-link>
          </mt-header>
        </div>

        <div id="goodsTemplate">

          <div class="storage_choose_place" v-for="item in goodsList">

            <div class="storage_body_line ">
              <span class="storage_body_line_title">品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span> <span
                class="storage_body_line_info">{{item.goodsName}} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">商品分类</span> <span
                class="storage_body_line_info">${goodsTypeName} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">证&nbsp;&nbsp;书&nbsp;&nbsp;号</span> <span
                class="storage_body_line_info"> ${certNo}</span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">货&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</span> <span
                class="storage_body_line_info">${goodsCode} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">金属材质</span> <span
                class="storage_body_line_info">${materialMetal} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">总重量</span> <span
                class="storage_body_line_info"> ${weight}</span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费</span> <span
                class="storage_body_line_info"> ${fee}</span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">精&nbsp;&nbsp;品&nbsp;&nbsp;费</span> <span
                class="storage_body_line_info"> ${qualityCost}</span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价</span> <span
                class="storage_body_line_info">${tagPrice}</span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">主石大小</span> <span
                class="storage_body_line_info">${mainStone} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">颜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</span> <span
                class="storage_body_line_info">${color} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">净&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度</span> <span
                class="storage_body_line_info">${cleanliness} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">质&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地</span> <span
                class="storage_body_line_info">${texture} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">形&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;状</span> <span
                class="storage_body_line_info">${shape} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">透&nbsp;&nbsp;明&nbsp;&nbsp;度</span> <span
                class="storage_body_line_info">${transparency} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">瑕&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;疵</span> <span
                class="storage_body_line_info">${flaw} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">光&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;泽</span> <span
                class="storage_body_line_info">${gloss} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">证&nbsp;&nbsp;书&nbsp;&nbsp;费</span> <span
                class="storage_body_line_info">${certFee} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">指&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;圈</span> <span
                class="storage_body_line_info">${ringSize} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家</span> <span
                class="storage_body_line_info">${manufacturer} </span>
            </div>							
          </div>          
          
        </div>
      </mt-tab-container-item>  

    </mt-tab-container>

  </div>
</template>

<script>
import Vue from 'vue'
import {Toast} from 'mint-ui'
import { validate } from 'utils/validate'

Vue.component(Toast)

export default {
  data () {
    return {
      active: 'tab-container1',
      mobile: '',
      username: '',
      headPic: '',
      thumbHeadPic: '',
      isHeadPic: false,
      goodsList: [],
      saleGoodsList: [],
      exchangeList: [],
      goodsTypeList: [],
      barterModeList: [],
      isOneselfList: [],
      diamondColorList: [],
      cleanlinessList: [],
      giveList: [],
      priceTypeList: [],
      isPriceType: true,
      manufacturerList: [],
      isManufacturer: true,
      remarksList: [],
      isRemarks: true,
      isExcludeFee: true
    }
  },
  created: function () {
    this.loadOrder()
  },
  computed: {
    weightCount: function () {

    }
  },
  methods: {
    activeTab: function (tab) {
      this.active = tab
    },
    loadOrder: function () {
      this.$axios.post(
        'goods/dicList',
        {},
        r => {
          console.log(r.data)
          this.goodsList = r.data.goodsList
          this.goodsTypeList = r.data.goodsTypeList
          this.barterModeList = r.data.barterModeList
          this.isOneselfList = r.data.isOneselfList
          this.diamondColorList = r.data.diamondColorList
          this.cleanlinessList = r.data.cleanlinessList
          this.giveList = r.data.giveList
          this.priceTypeList = r.data.priceType
          if (validate.isEmpty(this.priceTypeList)) {
            this.isPriceType = false
          }
          this.manufacturerList = r.data.manufacturer
          if (validate.isEmpty(this.manufacturerList)) {
            this.isManufacturer = false
          }
          this.remarksList = r.data.orderRemarks
          if (validate.isEmpty(this.remarksList)) {
            this.isRemarks = false
          }
          if (validate.isEmpty(r.data.isExcludeFee) || r.data.isExcludeFee === '0') {
            // 商品售价不含工费
            this.isExcludeFee = false
          }

          if (!validate.isEmpty(r.data.goodsShopping.thumbHeadPic)) {
            // 如果有会员头像，显示出来
            this.headPic = r.data.goodsShopping.thumbHeadPic
            this.isHeadPic = true
          } else {
            this.isHeadPic = false
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
    getcusInfo: function () {
      this.$axios.post(
        'customer/list',
        {
          mobile: this.mobile
        },
        r => {
          this.username = r.data.username
          if (!validate.isEmpty(r.data.thumbHeadPic)) {
            this.headPic = r.data.thumbHeadPic
            this.isHeadPic = true
          } else {
            this.isHeadPic = false
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
    cusOver: function () {
      this.mobile = ''
      this.username = ''
      this.isHeadPic = false
      this.active = 'tab-container2'
    },
    cusNext: function () {
      if (!validate.isEmptyWarn(this.mobile, '客户电话')) {
        return
      }
      if (!validate.isEmptyWarn(this.username, '客户姓名')) {
        return
      }

      this.active = 'tab-container2'
      this.getSaleGoods()
      this.getExchange()
    },
    getSaleGoods: function (mobile) {
      this.$axios.post(
        'goods/saleGoods',
        {
          mobile: this.mobile
        },
        r => {
          this.saleGoodsList = r.dada
        },
        r => {
          if (r.code === '101') {
            this.$router.push({path: '/login'})
          }
          Toast(r)
        }
      )
    },
    getExchange: function (mobile) {
      this.$axios.post(
        'exchange/order',
        {
          mobile: this.mobile,
          type: 'coupon',
          couponType: 'cash'
        },
        r => {
          this.saleGoodsList = r.dada
        },
        r => {
          if (r.code === '101') {
            this.$router.push({path: '/login'})
          }
          Toast(r)
        }
      )
    },
    uploadPicture: function () {

    },
    numPriceSum: function () {

    },
    insertBarter: function () {

    },
    insertGive: function () {

    },
    setPrestore: function () {

    },
    setDiscountSum: function () {

    },
    sureOrder: function () {

    }
  }

}
</script>

<style lang="scss">
#orderAdd {
   font-family: "Microsoft YaHei";
   position: absolute;
   width: 100%;
   height: 100%;
	 background-color: #f3f3f3;
	 padding-bottom: 90px;
}
</style>

<style lang="scss" scoped>
  @import "../style/scss/orderAdd";
</style>
