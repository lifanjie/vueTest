<template>
  <div id="orderAdd">

    <mt-tab-container v-model="active">

      <mt-tab-container-item id="tab-container1">
        <div class="page-field">
          <mt-header fixed title="会员信息">
            <router-link to="/productList" slot="left">
              <mt-button icon="back">返回</mt-button>
            </router-link>
          </mt-header>
        </div>

        <group :gutter=0 label-width="4.5em" label-align="left">
          <x-input title="客户电话" placeholder="请输入客户电话" @on-blur="getcusInfo()" v-model="mobile" type="text" class="weui-vcode"></x-input>
          <x-input title="客户姓名" placeholder="请输入客户姓名" v-model="username" type="text" class="weui-vcode"></x-input>
          <cell class="weui-vcode" title="客户头像" value-align="left">
            <div class="fileUpload btn btn-primary" id="fileUpload">
              <span></span>
              <input id="uploadBtn" type="file" class="upload" name="myfiles" @change="uploadPicture" />
            </div>
            <img :src="headPic" v-show="isHeadPic" id="viewImg" />
          </cell>
        </group>

        <div class="sure_div">
          <x-button @click.native="cusOver()" class="sure_button next_btn">跳过</x-button>
        </div>

        <div class="sure_div">
          <x-button @click.native="cusNext()" class="sure_button sure_btn">下一步</x-button>
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

        <p style="text-align:center;margin:10px" v-show="goodsList.length === 0">
          <span style="vertical-align:middle;display:inline-block;font-size:18px;">加载中&nbsp;&nbsp;</span>
          <inline-loading></inline-loading>
        </p>

        <div class="storage_choose_place GoodsInfo" v-for="(item,index) in tbgoodsStr">

          <div class="col-md-12 margin-bottom-15" style="margin-bottom:15px;padding-bottom:3px;">
            <span class="product_title">【{{item.goods.goodsTypeName}}】{{item.goods.goodsName}}</span>
            <div class="product">
              <div>
                <a @click="checkGoods(item.goods)">
                  <img v-if="item.goods.images === ''" src="../static/image/storage_camera1_03.png" class="goodsImg">
                  <img v-else :src="item.goods.images" style="width:230px;height:130px;">
                </a>
                <ul class="Attribute_list" style="max-width:140px;">
                  <li>条码：{{item.goods.goodsCode}} </li>
                  <li>净度：{{item.goods.cleanliness}} </li>
                  <li>重量：<span v-show="item.goods.tagPrice === ''">{{item.goods.weight}}</span></li>
                  <li>标价：
                    <span style="color:#fb366b;font-size:18px;"> {{item.goods.tagPrice}}</span>
                  </li>
                </ul>
              </div>

              <div style="position:absolute;right:5px;bottom:0;">
                <ul class="margin-bottom_20">
                  <li style="margin-bottom:0;">
                    <button type="button" style="background-color:#aaa; margin-right:5px;" class="button_style2" @click="deletebill(item.goods.shoppingId,index)">删除</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <group :gutter=0 label-width="4.5em" label-align="left">

            <x-input title="数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量" @on-change="tbgoodsStr[index].autoEdit = true" v-if="item.goods.number > 1" placeholder="请输入数量" v-model="tbgoodsStr[index].number" type="number" class="weui-vcode"></x-input>

            <div v-if="item.goods.tagPrice === '' && item.goods.weight != ''">

              <x-input title="商品实重" placeholder="请输入商品实重" @on-change="tbgoodsStr[index].autoEdit = true" v-model="tbgoodsStr[index].realWeight" type="number" class="weui-vcode"></x-input>

              <x-input title="销售单价" :placeholder="'今日牌价:'+item.goods.quoteprice" @on-change="tbgoodsStr[index].autoEdit = true" v-model="tbgoodsStr[index].nowPrice" type="number" class="weui-vcode"></x-input>

              <x-input title="工费单价" v-if="isExcludeFee === true" placeholder="请输入工费单价" @on-change="tbgoodsStr[index].autoEdit = true" v-model="tbgoodsStr[index].fee" type="number" class="weui-vcode"></x-input>

              <x-input title="工费" v-if="isExcludeFee === true" placeholder="请输入工费" @on-change="tbgoodsStr[index].autoEdit = true" v-model="tbgoodsStr[index].feePrice" type="number" class="weui-vcode"></x-input>

            </div>

            <x-input title="折扣(%)" v-if="item.goods.tagPrice != '' && item.goods.isFictitious != '1'" placeholder="标价*折扣=成交价格" @on-change="tbgoodsStr[index].autoEdit = true" v-model="tbgoodsStr[index].discount" type="number" class="weui-vcode"></x-input>

            <x-input title="优惠金额" placeholder="请输入优惠金额" @on-change="tbgoodsStr[index].autoEdit = true" v-model="tbgoodsStr[index].differPrice" type="number" class="weui-vcode"></x-input>

            <x-input title="销售金额" placeholder="请输入销售金额" :readonly="tbgoodsStr[index].differPrice !== ''" v-model="tbgoodsStr[index].strikePrice" type="number" class="weui-vcode red"></x-input>

            <x-input title="已收订金" v-if="item.goods.isReserve === '1'" v-model="item.goods.deposit" type="number" :readonly="true" class="weui-vcode red"></x-input>

            <x-input title="商品备注" placeholder="请输入商品备注" value-align="left" v-model="tbgoodsStr[index].remarks" type="text" class="weui-vcode">
              <img slot="right-full-height" @click="setGoodsRemarks(index)" v-if="isRemarks" src="../static/image/search.png">
            </x-input>
            <popup-picker :show.sync="goodsremarksVisible" :show-cell="false" :data="selremarksList" @on-change="selGoodsRemarks" value-text-align="left"></popup-picker>

            <cell class="weui-vcode" title="商品图片" value-align="left">
              <div class="fileUpload btn btn-primary">
                <span></span>
                <input type="file" class="upload" name="myfiles" @change="uploadGoodsPicture(item.id,index,$event)" />
              </div>
              <img v-show="item.photosrc != ''" :src="item.photosrc" />
            </cell>
          </group>
        </div>

        <group :gutter=10 label-width="4.5em" label-align="left">
          <cell title="旧料记录" class="weui-vcode">
            <div class="badge-value">
              <badge :text="tbBarter.length"></badge>
              <x-button slot="right" type="primary" @click.native="insertBarter()" mini>添加旧料</x-button>
            </div>
          </cell>
        </group>

        <div v-for="(item,index) in tbBarter">

          <group :gutter=0 label-width="4.5em" label-align="left">

            <cell title="换货方式" value-align="left" class="weui-vcode">
              <label v-for="barterMode in barterModeList">
                <input class="barterMode" type="radio" v-model="tbBarter[index].barterMode" :value="barterMode.value">{{barterMode.label}}
              </label>
            </cell>

            <cell title="回收方式" value-align="left" class="weui-vcode">
              <label v-for="isOneself in isOneselfList">
                <input class="isOneself" @click="" type="radio" v-model="tbBarter[index].isOneself" :value="isOneself.value">{{isOneself.label}}
              </label>
            </cell>

            <popup-picker title="品牌" placeholder="请选择品牌" v-if="isManufacturer" @click.native="setManufacturer(index)" :data="selmanufacturerList" v-model="tbBarter[index].seloldmanufacturer" @on-change="selectManufacturer" value-text-align="left"></popup-picker>

            <x-input title="回收条码" placeholder="请输入回收条码" value-align="left" v-model="tbBarter[index].goodsCode" type="text" class="weui-vcode">
              <img slot="right-full-height" @click="setSaleGoods(index)" src="../static/image/search.png">
            </x-input>
            <popup-picker :show.sync="saleGoodsVisible" :show-cell="false" :data="selsaleGoodsList" @on-change="selectSaleGoods" value-text-align="left">
            </popup-picker>

            <popup-radio v-show="tbBarter[index].barterMode === '回收'" value-align="left" title="旧料品类" placeholder="请选择旧料品类" @on-change="selectOldType(index,tbBarter[index].oldTypeName)" :options="seloldTypeList" v-model="tbBarter[index].oldTypeName">              
            </popup-radio>

            <x-input title="总&ensp;重&ensp;量" placeholder="请输入总重量" v-model="tbBarter[index].barterWeightNum" type="number" class="weui-vcode"></x-input>

            <div class="diamond" v-show="tbBarter[index].material === '钻石' && tbBarter[index].barterMode === '回收'">

              <popup-picker v-show="isPriceType" title="价格类型" placeholder="请选择价格类型" @click.native="setOldPriceType(index)" :data="selpriceTypeList" v-model="tbBarter[index].seloldpriceType" @on-change="selectOldPriceType" value-text-align="left"></popup-picker>

              <x-input title="证&ensp;书&ensp;号" placeholder="请输入证书号" v-model="tbBarter[index].certNo" type="text" class="weui-vcode"></x-input>

              <x-input title="主&ensp;石&ensp;重" placeholder="请输入主石重" v-model="tbBarter[index].mainStone" type="number" class="weui-vcode"></x-input>

              <x-input title="颜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色" placeholder="请输入颜色" v-model="tbBarter[index].color" type="text" class="weui-vcode"></x-input>

              <x-input title="净&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度" placeholder="请输入净度" v-model="tbBarter[index].cleanliness" type="text" class="weui-vcode"></x-input>

            </div>

            <cell title="抵换记录" v-show="isAutoBonus" class="weui-vcode">
              <div class="badge-value">
                <badge :text="tbBarter[index].tbOld.length"></badge>
                <x-button slot="right-full-height" type="primary" @click.native="insertOld(index)" mini>添加抵换</x-button>
              </div>
            </cell>

          </group>

          <div v-for="(item2,index2) in tbBarter[index].tbOld">

            <group :gutter=5 label-width="4.5em" label-align="left">

              <popup-radio value-align="left" title="换货商品" v-show="isAutoBonus" placeholder="请选择换货商品" @on-change="selectBarterGoods(index,index2,tbBarter[index].tbOld[index2].barterGoodsCode)" :options="selbarterGoodsList" v-model="tbBarter[index].tbOld[index2].barterGoodsCode"></popup-radio>

              <x-input title="抵扣重量" v-show="tbBarter[index].isOneself === '按克' && isAutoBonus" placeholder="请输入抵扣重量" @on-change="tbBarter[index].tbOld[index2].autoEdit = true" v-model="tbBarter[index].tbOld[index2].barterWeight" type="number" class="weui-vcode"></x-input>

              <x-input title="旧料单价" v-show="tbBarter[index].isOneself === '按克'" placeholder="金重*单价=换货金额" @on-change="tbBarter[index].tbOld[index2].autoEdit = true" v-model="tbBarter[index].tbOld[index2].unitPrice" type="number" class="weui-vcode"></x-input>

              <x-input title="回收标价" v-show="tbBarter[index].isOneself === '标价'" placeholder="请输入回收标价" @on-change="tbBarter[index].tbOld[index2].autoEdit = true" v-model="tbBarter[index].tbOld[index2].oldPrice" type="number" class="weui-vcode"></x-input>

              <x-input title="折扣(%)" placeholder="折扣*标价=换货金额" @on-change="tbBarter[index].tbOld[index2].autoEdit = true" v-model="tbBarter[index].tbOld[index2].barterDiscount" type="number" class="weui-vcode"></x-input>

              <x-input title="工费" placeholder="请输入工费" v-if="isExcludeFee" @on-change="tbBarter[index].tbOld[index2].autoEdit = true" v-model="tbBarter[index].tbOld[index2].feePrice" type="number" class="weui-vcode"></x-input>

              <x-input title="换货金额" placeholder="请输入换货金额" :readonly="tbBarter[index].tbOld[index2].oldPrice === ''" v-model="tbBarter[index].tbOld[index2].barterMoney" type="number" class="weui-vcode red">
                <x-button slot="right" v-show="isAutoBonus" type="primary" @click.native="deleteOld(index,index2)" mini>删除抵换</x-button>
              </x-input>

              <x-input title="折旧单价" v-show="tbBarter[index].isOneself === '按克'" placeholder="请输入折旧费单价" @on-change="tbBarter[index].tbOld[index2].autoEdit2 = true" v-model="tbBarter[index].tbOld[index2].unitDepreciation" type="number" class="weui-vcode"></x-input>

              <x-input title="折&ensp;旧&ensp;费" placeholder="请输入折旧费" v-model="tbBarter[index].tbOld[index2].depreciation" type="number" class="weui-vcode"></x-input>

              <x-input title="换货备注" placeholder="请输入换货备注" value-align="left" v-model="tbBarter[index].tbOld[index2].barterRemarks" type="text" class="weui-vcode">
                <img slot="right-full-height" @click="setBarterRemarks(index,index2)" v-if="isRemarks" src="../static/image/search.png">
              </x-input>
              <popup-picker :show.sync="barterremarksVisible" :show-cell="false" :data="selremarksList" @on-change="selBarterRemarks" value-text-align="left"></popup-picker>

            </group>

          </div>

          <div class="Info_title storage_body_line">
            <button style=" width: 100%;color: #fff;background-color: #c9c9c9;font: inherit;" type="button" class="" @click="deletebarter(index)">删除旧料
              <img class="botton_delete" src="../static/image/botton_delete.png" />
            </button>
          </div>

        </div>

        <group :gutter=10 label-width="4.5em" label-align="left">
          <cell title="赠品记录" class="weui-vcode">
            <div class="badge-value">
              <badge :text="tbgiveStr.length"></badge>
              <x-button slot="right-full-height" type="primary" @click.native="insertGive()" mini>添加赠品</x-button>
            </div>
          </cell>
        </group>

        <div v-for="(item,index) in tbgiveStr">
          <group :gutter=0 label-width="4.5em" label-align="left">
            <popup-picker title="赠&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品" placeholder="请选择赠品" @click.native="setGive(index)" :data="selgiveList" v-model="tbgiveStr[index].selgiveName" @on-change="selectGive" value-text-align="left">
            </popup-picker>

            <x-input title="数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量" placeholder="请输入数量" v-model="tbgiveStr[index].giveCount" type="number" class="weui-vcode">
              <x-button slot="right" type="primary" @click.native="deleteGive(index)" mini>删除赠品</x-button>
            </x-input>
          </group>
        </div>

        <group :gutter=10 label-width="4.5em" label-align="left">

          <x-input title="代&ensp;金&ensp;劵" placeholder="请输入代金券" value-align="left" v-model="voucherCode" type="text">
            <img slot="right-full-height" v-show="exchangeList.length > 0" @click="exchangeVisible = true" src="../static/image/search.png">
          </x-input>
          <popup-picker :show.sync="exchangeVisible" :show-cell="false" :data="selexchangeList" @on-change="selectExchange" value-text-align="left"></popup-picker>

          <x-input title="抵扣金额" placeholder="请输入抵扣金额" v-model="voucherNum" type="number" class="weui-vcode"></x-input>

        </group>

        <group :gutter=10 label-width="4.5em" label-align="left">

          <x-input title="预存金额" v-show="prestoreCount > 0" :placeholder="'可用预存金额:'+prestoreCount" v-model="prestore" type="number" class="weui-vcode"></x-input>

          <x-input title="总折扣" placeholder="总折扣(%)" v-model="discountSum" type="number" @on-blur="setDiscountSum()" class="weui-vcode"></x-input>

          <x-input title="订单备注" placeholder="请输入订单备注" value-align="left" v-model="orderRemarks" type="text" class="weui-vcode">
            <img slot="right-full-height" @click="setordersRemarks()" v-show="isRemarks" src="../static/image/search.png">
          </x-input>
          <popup-picker :show.sync="ordersremarksVisible" :show-cell="false" :data="selremarksList" @on-change="selordersRemarks" value-text-align="left"></popup-picker>

        </group>

        <group :gutter=10 label-width="4.5em" label-align="left">
          <cell title="实收金额" value-align="left" class="red" :value="receivable"></cell>
          <cell-form-preview class="previewValue" value-align="left" :list="preview"></cell-form-preview>
        </group>

        <div class="sure_div">
          <x-button @click.native="sureOrder()" class="sure_button sure_btn">立即下单</x-button>
        </div>

      </mt-tab-container-item>

      <mt-tab-container-item id="tab-container3">
        <div class="page-field">
          <mt-header fixed title="商品信息">
            <router-link to="" @click.native="activeTab('tab-container2')" slot="left">
              <mt-button icon="back">返回</mt-button>
            </router-link>
          </mt-header>
        </div>

        <keep-alive>
          <goodsDetail :goods="goods"></goodsDetail>
        </keep-alive>

      </mt-tab-container-item>

    </mt-tab-container>
    <form enctype="multipart/form-data" method="post" name="fileinfo">
    </form>

  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'mint-ui'
import { validate } from 'utils/validate'
import { number } from 'utils/number'
import { focus } from 'utils/directives'
import goodsDetail from '../components/goodsDetail'

Vue.use(focus)

export default {
  components: {
    goodsDetail
  },
  data () {
    return {
      active: 'tab-container1',
      mobile: '',
      username: '',
      headPic: '',
      orderRemarks: '',
      discountSum: '',
      prestoreCount: 0,
      prestore: '',
      thumbHeadPic: '',
      isHeadPic: false,
      voucherCode: '',
      voucherId: '',
      voucherNum: null,
      goods: {},
      goodsList: [],
      barterModeList: [],
      isOneselfList: [],
      diamondColorList: [],
      cleanlinessList: [],
      giveList: [],
      selgiveList: [['']],
      isPriceType: false,
      priceTypeList: [],
      selpriceTypeList: [['']],
      manufacturerList: [],
      selmanufacturerList: [['']],
      oldTypeList: [],
      seloldTypeList: [''],
      barterGoodsList: [],
      selbarterGoodsList: [],
      saleGoodsList: [],
      selsaleGoodsList: [['']],
      exchangeList: [],
      selexchangeList: [[' ']],
      giveIndex: '',
      goodsremarksVisible: false,
      barterremarksVisible: false,
      ordersremarksVisible: false,
      exchangeVisible: false,
      saleGoodsVisible: false,
      barterGoodsVisible: false,
      isManufacturer: false,
      oldTypeIndex: '',
      remarksIndex: '',
      ordersIndex: '',
      barterGoodsIndex: '',
      remarksList: [],
      selremarksList: [['']],
      isRemarks: false,
      isExcludeFee: true,
      isAutoBonus: true,
      tbgiveStr: [],
      tbgoodsStr: [],
      tbBarter: []
    }
  },
  computed: {
    preview: function () {
      return [{
        label: '商品金额',
        value: this.strikePriceSum
      }, {
        label: '抵扣金额',
        value: this.getVoucherNum
      }, {
        label: '预存金额',
        value: this.prestoreSum
      }, {
        label: '已收金额',
        value: this.reserveSum
      }, {
        label: '换货金额',
        value: this.barterMoneySum
      }, {
        label: '折旧费',
        value: this.depreciationSum
      }, {
        label: '优惠金额',
        value: this.differPriceSum
      }]
    },
    getVoucherNum: function () {
      return 0 - Number(this.voucherNum)
    },
    receivable: function () {
      return Number(this.strikePriceSum) + Number(this.barterMoneySum) + Number(this.depreciationSum) - Number(this.voucherNum) + Number(this.prestoreSum)
    },
    totalBill: function () {
      return Number(this.spendSum) + Number(this.barterMoneySum) + Number(this.depreciationSum) - Number(this.voucherNum) + Number(this.prestoreSum)
    },
    prestoreSum: function () {
      return 0 - (validate.isEmpty(this.prestore) ? 0 : this.prestore)
    },
    spendSum: function () {
      let spendSum = 0
      for (let item of this.tbgoodsStr) {
        let receMoney = validate.isEmpty(item.receMoney) ? 0 : item.receMoney
        spendSum += Number(receMoney)
      }
      return spendSum
    },
    differPriceSum: function () {
      let differPriceSum = 0
      for (let item of this.tbgoodsStr) {
        let differPrice = validate.isEmpty(item.differPrice) ? 0 : item.differPrice
        differPriceSum += Number(differPrice)
      }
      return differPriceSum
    },
    depreciationSum: function () {
      let depreciation = 0
      for (let barter of this.tbBarter) {
        for (let old of barter.tbOld) {
          depreciation += Number(old.depreciation)
        }
      }
      return depreciation
    },
    barterMoneySum: function () {
      let barterMoneySum = 0
      for (let barter of this.tbBarter) {
        let isOneself = barter.isOneself
        let barterWeightNum = barter.barterWeightNum
        for (let old of barter.tbOld) {
          if (!this.isAutoBonus) {
            old.barterWeight = barterWeightNum
          }
          let unitPrice = validate.isEmpty(old.unitPrice) ? 0 : old.unitPrice
          let barterWeight = validate.isEmpty(old.barterWeight) ? 0 : old.barterWeight
          let barterMoney = validate.isEmpty(old.barterMoney) ? 0 : old.barterMoney
          let unitDepreciation = validate.isEmpty(old.unitDepreciation) ? 0 : old.unitDepreciation
          let oldPrice = validate.isEmpty(old.oldPrice) ? 0 : old.oldPrice
          let feePrice = validate.isEmpty(old.feePrice) ? 0 : Number(old.feePrice)
          let barterDiscount = validate.isEmpty(old.barterDiscount) ? 100 : old.barterDiscount

          if (isOneself === '按克') {
            // 旧料标价
            oldPrice = Math.round(unitPrice * barterWeight)
            old.oldPrice = oldPrice > 0 ? oldPrice : ''
            // 折旧费
            if (unitDepreciation !== 0 && barterWeight !== 0) {
              if (old.autoEdit2) {
                old.depreciation = Math.round(unitDepreciation * barterWeight)
                old.autoEdit2 = false
              }
            } else {
              old.depreciation = ''
            }

            if (barterWeight === 0 && barterMoney > 0 && unitPrice > 0) {
              // old.barterWeight = number.accDiv(barterMoney, unitPrice).toFixed(2)
            }
          }
          let barterMoney2 = Math.round(oldPrice * barterDiscount / 100 + feePrice)

          // 如果手动修改，就不自动赋值了
          if (old.autoEdit) {
            old.barterMoney = barterMoney2 === 0 ? '' : barterMoney2
            old.autoEdit = false
          }

          barterMoneySum += Number(old.barterMoney)
        }
      }
      barterMoneySum = 0 - barterMoneySum
      return barterMoneySum
    },
    strikePriceSum: function () {
      let strikePriceSum = 0

      for (let item of this.tbgoodsStr) {
        let discount = validate.isEmpty(item.discount) ? 100 : item.discount
        let number = validate.isEmpty(item.number) ? 1 : item.number
        let nowPrice = validate.isEmpty(item.nowPrice) ? 0 : item.nowPrice
        let realWeight = validate.isEmpty(item.realWeight) ? 0 : item.realWeight
        let tagPrice = validate.isEmpty(item.tagPrice) ? 0 : item.tagPrice
        let fee = validate.isEmpty(item.fee) ? 0 : Number(item.fee)
        let differPrice = validate.isEmpty(item.differPrice) ? 0 : item.differPrice

        if (realWeight > 0 && fee > 0) {
          // 计算工费
          item.feePrice = Math.round(realWeight * fee)
        }
        let feePrice = validate.isEmpty(item.feePrice) ? 0 : Number(item.feePrice)

        if (nowPrice > 0 && realWeight > 0) {
          // 按克销售
          item.receMoney = Math.round((nowPrice * realWeight + feePrice) * number)
        } else {
          // 按件销售
          item.receMoney = Math.round(number * tagPrice * discount / 100)
        }

        // 如果手动修改，就不自动赋值了
        if (item.autoEdit) {
          item.strikePrice = item.receMoney - differPrice
          item.autoEdit = false
        }

        strikePriceSum += Number(item.strikePrice)
      }
      return strikePriceSum
    },
    reserveSum: function () {
      let deposit = 0
      for (let item of this.tbgoodsStr) {
        deposit += Number(item['goods']['deposit'])
      }
      return deposit
    }
  },
  created: function () {
    this.loadOrder()
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
          this.goodsList = r.data.goodsList
          for (let goods of this.goodsList) {
            this.tbgoodsStr.push({
              goods: goods,
              goodsId: goods.id,
              receivable: 0,
              spendSum: 0,
              differPrice: '',
              voucherNum: 0,
              voucherId: '',
              barterMoneySum: 0,
              prestoreSum: '',
              depositSum: 0,
              discountSum: '',
              totalBill: 0,
              orderRemarks: '',
              discount: '',
              tagPrice: goods.tagPrice,
              strikePrice: goods.tagPrice,
              autoEdit: false,
              receMoney: 0,
              priceType: '',
              number: 1,
              nowPrice: goods.nowPrice,
              fee: '',
              feePrice: goods.fee,
              remarks: '',
              selremarks: [],
              photo: '',
              photosrc: '',
              realWeight: goods.weight
            })

            this.barterGoodsList.push({
              barterGoodsCode: goods.goodsCode + '-' + goods.goodsTypeName,
              barterType: goods.goodsType,
              barterGoods: goods.id,
              barterTagPrice: goods.tagPrice,
              weight: goods.weight,
              select: 0
            })
          }
          // 设置换货商品选择
          this.selbarterGoodsList.splice(0, this.selbarterGoodsList.length)
          for (let elem of this.barterGoodsList) {
            this.selbarterGoodsList.push(elem.barterGoodsCode)
          }

          // 设置旧料类别选择
          this.oldTypeList = r.data.goodsTypeList
          this.seloldTypeList.splice(0, this.seloldTypeList.length)
          for (let elem of this.oldTypeList) {
            this.seloldTypeList.push(elem.goodsType)
          }

          this.barterModeList = r.data.barterModeList
          this.isOneselfList = r.data.isOneselfList
          this.diamondColorList = r.data.diamondColorList
          this.cleanlinessList = r.data.cleanlinessList

          // 设置赠品选择
          this.giveList = r.data.giveList
          if (this.giveList.length > 0) {
            this.selgiveList[0].splice(0, this.selgiveList[0].length)
            for (let item of this.giveList) {
              this.selgiveList[0].push(item.giveName)
            }
          }

          // 价格类型选
          this.priceTypeList = r.data.priceType
          if (this.priceTypeList.length > 0) {
            this.isPriceType = true

            this.selpriceTypeList[0].splice(0, this.selpriceTypeList[0].length)
            for (let item of this.priceTypeList) {
              this.selpriceTypeList[0].push(item.priceType)
            }
          }

          // 品牌选择
          this.manufacturerList = r.data.manufacturer
          if (this.manufacturerList.length > 0) {
            this.isManufacturer = true
            this.selmanufacturerList[0].splice(0, this.selmanufacturerList[0].length)
            for (let item of this.manufacturerList) {
              this.selmanufacturerList[0].push(item.manufacturer)
            }
          }

          // 订单备注选择
          this.remarksList = r.data.orderRemarks
          if (this.remarksList.length > 0) {
            this.isRemarks = true

            this.selremarksList[0].splice(0, this.selremarksList[0].length)
            for (let item of this.remarksList) {
              this.selremarksList[0].push(item.remarks)
            }
          }

          if (validate.isEmpty(r.data.isExcludeFee) || r.data.isExcludeFee === '0') {
            // 商品售价不含工费
            this.isExcludeFee = false
          }

          if (validate.isEmpty(r.data.isAutoBonus) || r.data.isAutoBonus === '0') {
            // 是否自动算提成
            this.isAutoBonus = false
          }

          this.setCusImager(r.data.goodsShopping.thumbHeadPic)
        },
        r => {
          if (r.code === '101') {
            this.$router.push({ path: '/login' })
          }
          Toast(r)
        }
      )
    },
    setCusImager: function (headPic) {
      if (!validate.isEmpty(headPic)) {
        this.headPic = headPic
        this.thumbHeadPic = headPic
        this.isHeadPic = true
      } else {
        this.isHeadPic = false
      }
    },
    getcusInfo: function () {
      if (validate.isEmpty(this.mobile)) {
        return
      }

      this.$axios.post(
        'customer/list',
        {
          mobile: this.mobile
        },
        r => {
          this.username = r.data.username
          this.setCusImager(r.data.thumbHeadPic)

          // 可用预存金额
          if (r.data.prestore) {
            this.prestoreCount = Number(r.data.prestore)
          }
        },
        r => {
          if (r.code === '101') {
            this.$router.push({ path: '/login' })
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
      this.getSaleGoods(this.mobile)
      this.getExchange(this.mobile)
    },
    getSaleGoods: function (mobile) {
      this.$axios.post(
        'goods/saleGoods',
        {
          mobile: this.mobile
        },
        r => {
          this.saleGoodsList = r.data
          this.selsaleGoodsList[0].splice(0, this.selsaleGoodsList[0].length)
          for (let item of this.saleGoodsList) {
            this.selsaleGoodsList[0].push(item.goodsCode + '-' + item.goodsTypeName)
          }
        },
        r => {
          if (r.code === '101') {
            this.$router.push({ path: '/login' })
          }
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
          this.exchangeList = r.data
          this.selexchangeList[0].splice(0, this.selexchangeList[0].length)
          for (let item of this.exchangeList) {
            this.selexchangeList[0].push(item.code)
          }
        },
        r => {
          if (r.code === '101') {
            this.$router.push({ path: '/login' })
          }
        }
      )
    },
    uploadGoodsPicture: function (id, index, event) {
      let file = event.target.files[0]
      let param = new FormData()
      param.append('myfiles', file)
      param.append('id', id)

      this.$axios.upload(
        'goods/upload',
        param,
        r => {
          this.tbgoodsStr[index].photo = r.data
          this.tbgoodsStr[index].photosrc = URL.createObjectURL(file)
        },
        r => {
          if (r.code === '101') {
            this.$router.push({ path: '/login' })
          }
          Toast(r)
        }
      )
    },
    uploadPicture: function (event) {
      let file = event.target.files[0]
      let param = new FormData()
      param.append('myfiles', file)

      this.$axios.upload(
        'user/upload',
        param,
        r => {
          this.setCusImager(r.data.thumbSaveUrl)
          this.headPic = URL.createObjectURL(file)
        },
        r => {
          if (r.code === '101') {
            this.$router.push({ path: '/login' })
          }
          Toast(r)
        }
      )
    },
    selectExchange: function (values) {
      if (!validate.isEmpty(values.toString())) {
        for (let item of this.exchangeList) {
          if (item.code === values.toString()) {
            this.voucherId = item.id
            this.voucherCode = item.code
            this.voucherNum = item.price
          }
        }
      }
    },
    setBarterRemarks: function (index, index2) {
      this.oldTypeIndex = index
      this.barterGoodsIndex = index2
      this.barterremarksVisible = true
    },
    selBarterRemarks: function (values) {
      if (!validate.isEmpty(values.toString())) {
        this.tbBarter[this.oldTypeIndex].tbOld[this.barterGoodsIndex].barterRemarks = values.toString()
      }
    },
    setBarterGoods: function (index, index2) {
      this.oldTypeIndex = index
      this.barterGoodsIndex = index2
      this.barterGoodsVisible = true
    },
    selectBarterGoods: function (index2, index3, values) {
      if (!validate.isEmpty(values)) {
        for (let [index, item] of this.barterGoodsList.entries()) {
          if (item.barterGoodsCode === values) {
            this.barterGoodsList[index].select = 1
            this.tbBarter[index2].tbOld[index3].barterGoodsCode = values
            this.tbBarter[index2].tbOld[index3].barterType = item.barterType
            this.tbBarter[index2].tbOld[index3].barterGoods = item.barterGoods
            this.tbBarter[index2].tbOld[index3].barterTagPrice = item.barterTagPrice
            this.tbBarter[index2].tbOld[index3].barterWeight = item.weight

            let barterTagPrice = item.barterTagPrice
            let barterWeight = Number(item.weight)
            let isOneself = this.tbBarter[index2].isOneself
            let barterWeightNum = this.tbBarter[index2].barterWeightNum

            // 剩余重量
            let surplusWeight = 0
            for (let [index, elem] of this.tbBarter[index2].tbOld.entries()) {
              if (index !== index3) {
                surplusWeight += Number(elem.barterWeight)
              }
            }

            surplusWeight = number.accSub(barterWeightNum, surplusWeight)

            if (isOneself === '按克') {
              // 换货商品按件卖的
              if (!validate.isEmpty(barterTagPrice)) {
                this.tbBarter[index2].tbOld[index3].barterWeight = surplusWeight
              } else {
                if (Number(surplusWeight) >= Number(barterWeight)) {
                  this.tbBarter[index2].tbOld[index3].barterWeight = barterWeight
                } else {
                  this.tbBarter[index2].tbOld[index3].barterWeight = surplusWeight
                }
              }
            } else {
              this.tbBarter[index2].tbOld[index3].barterWeight = barterWeightNum
            }

            console.log(this.tbBarter[index2].tbOld[index3].barterWeight)
          }
        }
      }
    },
    setordersRemarks: function (indx) {
      this.ordersremarksVisible = true
    },
    selordersRemarks: function (values) {
      if (!validate.isEmpty(values.toString())) {
        this.orderRemarks = values.toString()
      }
    },
    setGive: function (index) {
      this.giveIndex = index
    },
    selectGive: function (values) {
      if (!validate.isEmpty(values.toString())) {
        for (let item of this.giveList) {
          if (item.giveName === values.toString()) {
            this.tbgiveStr[this.giveIndex].giveId = item.giveId
            this.tbgiveStr[this.giveIndex].giveName = item.giveName
          }
        }
      }
    },
    setSaleGoods: function (index) {
      this.oldTypeIndex = index
      this.saleGoodsVisible = true
    },
    selectSaleGoods: function (values) {
      if (!validate.isEmpty(values.toString())) {
        for (let item of this.saleGoodsList) {
          let goods = item.goodsCode + '-' + item.goodsTypeName
          if (goods === values.toString()) {
            this.tbBarter[this.oldTypeIndex].goodsCode = item.goodsCode
            this.tbBarter[this.oldTypeIndex].barterWeightNum = item.realWeight
            // 钻石的旧料信息
            this.tbBarter[this.oldTypeIndex].certNo = item.certNo
            this.tbBarter[this.oldTypeIndex].mainStone = item.mainStone
            this.tbBarter[this.oldTypeIndex].color = item.color
            this.tbBarter[this.oldTypeIndex].cleanliness = item.cleanliness
            // 添加抵扣记录

            this.tbBarter[this.oldTypeIndex].tbOld.splice(0, this.tbBarter[this.oldTypeIndex].tbOld.length)

            let oldPrice = 0
            let unitPrice = ''
            let discount = validate.isEmpty(item.discount) ? 100 : item.discount
            if (Number(item.nowPrice) > 0) {
              unitPrice = Number(item.nowPrice)
              oldPrice = unitPrice * item.realWeight
              this.tbBarter[this.oldTypeIndex].isOneself = '按克'
            } else {
              oldPrice = item.goodsTagPrice
              this.tbBarter[this.oldTypeIndex].isOneself = '标价'
            }

            let barterGoodsCode = this.barterGoodsList[0].barterGoodsCode
            let barterGoods = this.barterGoodsList[0].barterGoods
            let barterType = this.barterGoodsList[0].barterType

            for (let barter of this.barterGoodsList) {
              if (barter.barterType === item.goodsType) {
                barterGoodsCode = barter.barterGoodsCode
                barterGoods = barter.barterGoods
                break
              }
            }

            this.tbBarter[this.oldTypeIndex].tbOld.unshift({
              depreciation: '',
              autoEdit2: false,
              unitDepreciation: '',
              barterGoodsCode: barterGoodsCode,
              barterGoods: barterGoods,
              barterType: barterType,
              barterMoney: item.strikePrice,
              autoEdit: false,
              unitPrice: unitPrice,
              barterDiscount: discount !== 100 ? discount : '',
              barterWeight: item.realWeight,
              oldType: '',
              oldTypeName: '',
              oldIsWeightCal: '',
              oldPrice: oldPrice,
              feePrice: item.feePrice,
              barterRemarks: ''
            })
          }
        }
      }
    },
    setGoodsRemarks: function (index) {
      this.ordersIndex = index
      this.goodsremarksVisible = true
    },
    selGoodsRemarks: function (values) {
      if (!validate.isEmpty(values.toString())) {
        this.tbgoodsStr[this.ordersIndex].remarks = values.toString()
      }
    },
    setManufacturer: function (index) {
      this.oldTypeIndex = index
    },
    selectManufacturer: function (values) {
      if (!validate.isEmpty(values.toString())) {
        this.tbBarter[this.oldTypeIndex].oldmanufacturer = values.toString()
      }
    },
    setOldPriceType: function (index) {
      this.oldTypeIndex = index
    },
    selectOldPriceType: function (values) {
      if (!validate.isEmpty(values.toString())) {
        this.tbBarter[this.oldTypeIndex].oldpriceType = values.toString()
      }
    },
    selectOldType: function (index, values) {
      if (!validate.isEmpty(values)) {
        for (let item of this.oldTypeList) {
          if (item.goodsType === values) {
            this.tbBarter[index].oldType = item.id
            this.tbBarter[index].oldTypeName = values
            this.tbBarter[index].material = item.material
            this.tbBarter[index].oldIsWeightCal = item.isWeightCal
            if (this.tbBarter[index].oldIsWeightCal === '1') {
              this.tbBarter[index].isOneself = '按克'
            } else {
              this.tbBarter[index].isOneself = '标价'
            }
          }
        }
      }
    },
    setDiscountSum: function () {
      for (let item of this.tbgoodsStr) {
        if (item.goods.tagPrice !== '' && item.goods.isFictitious !== '1') {
          item.discount = this.discountSum
        }
      }

      for (let barter of this.tbBarter) {
        for (let old of barter.tbOld) {
          old.barterDiscount = this.discountSum
        }
      }
    },
    sureOrder: function () {
      // 销售信息
      for (let item of this.tbgoodsStr) {
        item.spendSum = this.spendSum
        item.voucherNum = this.voucherNum
        item.receivable = this.receivable
        item.barterMoneySum = Math.abs(this.barterMoneySum)
        item.prestoreSum = this.prestoreSum
        item.discountSum = this.discountSum
        item.totalBill = this.totalBill
        item.orderRemarks = this.orderRemarks
      }
      // 换货信息
      for (let barter of this.tbBarter) {
        let barterWeight = 0
        barter.goodsCode = barter.goodsCode.toUpperCase()
        barter.certNo = barter.certNo.toUpperCase()
        for (let old of barter.tbOld) {
          barterWeight = number.accAdd(barterWeight, old.barterWeight)
          old.barterMode = barter.barterMode
          old.isOneself = barter.isOneself
          old.goodsCode = barter.goodsCode
          old.oldType = barter.oldType
          old.oldTypeName = barter.oldTypeName

          if (validate.isEmpty(old.barterType)) {
            old.barterType = barter.oldType
          }
        }

        if (barter.barterMode === '回收' && validate.isEmpty(barter.oldType)) {
          Toast('旧料品类不能为空')
          return
        }

        let barterWeightNum = Number(barter.barterWeightNum)
        // console.log(barterWeightNum + '--' + barterWeight.toString())
        if (barterWeightNum.toString() !== barterWeight.toString() && this.isAutoBonus && barter.isOneself === '按克') {
          Toast(`${barter.oldTypeName}的抵扣重量合计不等于总重量`)
          return
        }

        if (barter.barterMode === '上柜' && validate.isEmpty(barter.goodsCode)) {
          Toast(`${barter.oldTypeName}的回收条码不能为空`)
          return
        }
      }
      // 赠品信息
      for (let give of this.tbgiveStr) {
        if (validate.isEmpty(give.giveId)) {
          Toast('请选择赠品')
          return
        }

        if (validate.isEmpty(give.giveCount)) {
          Toast('请输入赠品数量')
          return
        }
      }

      // 保存订单
      this.$axios.post(
        'orders/add',
        {
          mobile: this.mobile,
          thumbHeadPic: this.thumbHeadPic,
          username: this.username,
          tbBarterStr: JSON.stringify(this.tbBarter),
          tbgoodsStr: JSON.stringify(this.tbgoodsStr),
          tbgiveStr: JSON.stringify(this.tbgiveStr)
        },
        r => {
          this.$store.commit('setOrders', 0)
          this.$store.commit('setMsg', {
            title: '下单成功',
            description: '请去收银台付款',
            icon: 'success',
            butType: 'primary',
            butText: '返回首页',
            butLink: '/productList'
          })

          this.$router.push({ path: '/msg' })
        },
        r => {
          if (r.code === '101') {
            this.$router.push({ path: '/login' })
          }
          Toast(r)
        }
      )
    },
    insertGive: function () {
      this.tbgiveStr.push({
        giveId: '',
        giveName: '',
        selgiveName: [],
        giveCount: ''
      })
    },
    deleteGive: function (index) {
      this.tbgiveStr.splice(index, 1)
    },
    deleteOld: function (index, index2) {
      this.tbBarter[index].tbOld.splice(index2, 1)
    },
    // 添加抵换记录
    insertOld: function (index) {
      if (validate.isEmpty(this.tbBarter[index].barterWeightNum) &&
        this.tbBarter[index].isOneself === '按克' && this.isAutoBonus) {
        Toast('总重量不能为空')
        return
      }

      this.tbBarter[index].tbOld.unshift({
        depreciation: '',
        autoEdit2: false,
        unitDepreciation: '',
        barterGoodsCode: '',
        barterGoods: '',
        barterType: '',
        barterMoney: '',
        autoEdit: false,
        unitPrice: '',
        barterDiscount: '',
        barterWeight: '',
        oldType: '',
        oldTypeName: '',
        oldIsWeightCal: '',
        oldPrice: '',
        feePrice: '',
        barterRemarks: ''
      })

      this.oldTypeIndex = index
      this.barterGoodsIndex = 0

      if (this.isAutoBonus) {
        // 设置默认的换货商品
        var barterGoodsCode = this.barterGoodsList[0].barterGoodsCode
        for (let item of this.barterGoodsList) {
          if (item.select === 0) {
            barterGoodsCode = item.barterGoodsCode
            break
          }
        }

        this.selectBarterGoods(this.oldTypeIndex, this.barterGoodsIndex, barterGoodsCode)
      }
    },
    // 添加换货记录
    insertBarter: function () {
      this.tbBarter.unshift({
        tbOld: [],
        barterMode: '回收',
        isOneself: '按克',
        goodsCode: '',
        barterWeightNum: '',
        oldType: '',
        oldTypeName: '',
        material: '',
        oldpriceType: '',
        seloldpriceType: [],
        oldmanufacturer: '',
        seloldmanufacturer: [],
        certNo: '',
        mainStone: '',
        color: '',
        cleanliness: ''
      })

      this.oldTypeIndex = 0

      // 如果不采用自动算提成，自动添加抵换记录
      if (!this.isAutoBonus) {
        this.insertOld(0)
      }
    },
    deletebarter: function (index) {
      this.tbBarter.splice(index, 1)
    },
    deletebill: function (id, index) {
      this.$axios.post(
        'goods/deleteShopping',
        {
          id: id
        },
        r => {
          this.$store.commit('addOrders', -1)
          if (this.tbgoodsStr.length === 1) {
            this.$router.push({ path: '/productList' })
          }
          this.tbgoodsStr.splice(index, 1)
        },
        r => {
          if (r.code === '101') {
            this.$router.push({ path: '/login' })
          }
          Toast(r)
        }
      )
    },
    checkGoods: function (goods) {
      this.active = 'tab-container3'
      this.goods = goods
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../style/scss/orderAdd";
</style>

<style lang="less">
.red .weui-cell__ft,
.red .weui-cell__bd {
  color: #fb366b;
}
</style>

