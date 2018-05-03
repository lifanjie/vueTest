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
                <input id="uploadBtn" type="file"
                class="upload" name="myfiles" @change="uploadPicture" />
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

          <div class="storage_choose_place GoodsInfo" v-for="(item,index) in tbgoodsStr">

            <div class="col-md-12 margin-bottom-15" style="margin-bottom:15px;padding-bottom:3px;">
              <span class="product_title">【{{item.goods.goodsTypeName}}】{{item.goods.goodsName}}</span>
              <div class="product">
                <div>  
                  <a @click="checkGoods(item.goods.id)" >
                  <img v-if="item.goods.images === ''" src="../static/image/storage_camera1_03.png" class="goodsImg">
                  <img v-else :src="item.goods.images" style="width:230px;height:130px;">
                  </a>
                  <ul class="Attribute_list" style="max-width:140px;">
                  <li>条码：{{item.goods.goodsCode}} </li>
                  <li>净度：{{item.goods.cleanliness}} </li>
                  <li>重量：{{item.goods.weight}} </li>
                  <li>标价：<span style="color:#fb366b;font-size:18px;"> {{item.goods.tagPrice}}</span> </li>
                  </ul>
                </div> 

                <div style="position:absolute;right:5px;bottom:0;"> 
                  <ul class="margin-bottom_20">    
                    <li style="margin-bottom:0;"><button type="button" style="background-color:#aaa; margin-right:5px;" 
                    class="button_style2"  @click="deletebill(item.goods.shoppingId,index)">删除</button>
                    </li>
                  </ul> 
                </div> 
              </div> 	
            </div>
              
    
            <div class="storage_body_line" v-if="item.goods.number > 1">
              <span class="storage_body_line_title">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量</span> 
              <span class="storage_body_line_info shuliang">
              <input type="number" placeholder="请输入数量" v-model="tbgoodsStr[index].number" 
              class="number" maxlength="11">
              </span>
            </div>

            <div v-if="item.goods.tagPrice === '' && item.goods.weight != ''">
              <div class="storage_body_line">
                <span class="storage_body_line_title">商品实重</span> 
                <span class="storage_body_line_info">
                  <input class="realWeight" type="number" placeholder="请输入商品实重" v-model="tbgoodsStr[index].realWeight">
                </span>
              </div>
				
              <div class="storage_body_line">
                <span class="storage_body_line_title">销售单价</span> 
                <span class="storage_body_line_info">
                  <input class="quoteprice" v-model="item.quoteprice" type="hidden" />
                  <input class="nowPrice" type="number" :placeholder="'今日牌价:'+item.goods.quoteprice" maxlength="11" 
                  v-model="tbgoodsStr[index].nowPrice">
                </span>
              </div> 
				
              <div class="storage_body_line" v-if="isExcludeFee === true">
                <span class="storage_body_line_title">工费单价</span> 
                <span class="storage_body_line_info">
                  <input class="fee" type="number" v-model="tbgoodsStr[index].fee" placeholder="请输入工费单价" maxlength="11" >
                </span>
              </div>

              <div class="storage_body_line" v-if="isExcludeFee === true">
                <span class="storage_body_line_title">工费</span> 
                <span class="storage_body_line_info">
                  <input class="feePrice" type="number" v-model="tbgoodsStr[index].feePrice" placeholder="请输入工费"  maxlength="11">
                </span>
              </div>
            </div>        

            <div class="storage_body_line" v-if="item.goods.tagPrice != '' && item.goods.isFictitious != '1'">
              <span class="storage_body_line_title">折扣(%)</span>
              <span class="storage_body_line_info">
                <input class="discount" type="number" v-model="tbgoodsStr[index].discount" placeholder="标价*折扣=成交价格" maxlength="11">
              </span>
            </div>

            <div class="storage_body_line">
              <span class="storage_body_line_title">优惠金额</span> 
              <span class="storage_body_line_info">
                <input class="differPrice" type="number" v-model="tbgoodsStr[index].differPrice" placeholder="请输入优惠金额" maxlength="11">
              </span>
            </div>

            <div class="storage_body_line">
              <span class="storage_body_line_title">销售金额</span> 
              <span class="storage_body_line_info">
                <input v-if="item.goods.tagPrice != ''" type="hidden" class="noSuJin" />
                <input class="strikePrice" type="number" placeholder="请输入销售金额" maxlength="11" 
                 v-model="tbgoodsStr[index].strikePrice" readonly="true" style="color:#fb366b;">
              </span>
            </div>

            <div class="storage_body_line" v-if="item.goods.isReserve === '1'">
              <span class="storage_body_line_title">已收订金</span> 
              <span class="storage_body_line_info">
                <input class="deposit" type="number" v-model="item.goods.deposit" readonly="true" style="color:#fb366b;">
              </span>
            </div>

            <div class="storage_body_line">
              <span class="storage_body_line_title">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</span> 
              <span class="storage_body_line_info beizhu">
                <input class="remarks" v-model="tbgoodsStr[index].remarks" type="text" placeholder="请输入备注" maxlength="200" />  
                <popup-picker :show.sync="goodsremarksVisible" :data="selremarksList"  @on-change="selGoodsRemarks"  value-text-align="left"></popup-picker>                       
              </span>
              <img class="search" style="height: 35px;vertical-align: middle;" @click="setGoodsRemarks(index)"  v-if="isRemarks" src="../static/image/search.png"/> 
            </div>

            <div class="storage_img_line" >
              <span class="storage_img_line_title">商品图片</span> 
              <span class="storage_img_line_info touxiang" style="width:50%;">
                <div class="fileUpload btn btn-primary">
                  <span></span>
                  <input type="file" class="upload"  name="myfiles"  @change="uploadGoodsPicture(item.id,index,$event)"/>
                </div>
                <img v-show="item.photosrc != ''" :src="item.photosrc" alt=""  class="storage_img_line_img"/>	
              </span>
            </div>

        </div>  

        <div class="storage_body_line_box">
          <div class="storage_body_line">
            <span class="storage_body_line_title" >换货记录</span> 
            <span class="storage_img_line_info huanhuoNo" >
            <div style="text-align: right;padding-right: 2px;">
              <input type="text" readOnly="true"  maxlength="50" class="input_button" v-model="tbBarter.length" style="width:15px!important;color:#999;">
              <button type="button" class="button_style2 button_jisuan" @click="insertBarter()">新增</button>
            </div>
            </span> 											
          </div>						
          <div id="xinzeng_huanhuo_List" style="background-color: #ececec;">
            
            <div class="barterInfo" v-for="(item,index) in tbBarter" >  

              <div class="storage_body_line bgc_opcity">
                <span class="storage_body_line_title ">换货方式</span> 
                  <span>
                    <label v-for="barterMode in barterModeList">
                      <input class="barterMode" type="radio" v-model="tbBarter[index].barterMode" :value="barterMode.value">{{barterMode.label}}
                    </label> 
                  </span>
              </div>

              <div class="storage_body_line bgc_opcity">
                <span class="storage_body_line_title ">回收方式</span> 
                  <span>
                    <label v-for="isOneself in isOneselfList">
                      <input class="isOneself" @click="" type="radio" 
                      v-model="tbBarter[index].isOneself" :value="isOneself.value">{{isOneself.label}}
                    </label>
                  </span>        
              </div>

              <div class="storage_body_line bgc_opcity" v-if="isManufacturer">
					      <span class="storage_body_line_title">品牌</span>
                <span class="storage_body_line_info" @click="setManufacturer(index)">
                  <popup-picker placeholder="请选择品牌" :data="selmanufacturerList" v-model="tbBarter[index].seloldmanufacturer"  @on-change="selectManufacturer"  value-text-align="left"></popup-picker>                    
                </span> 
				      </div>

              <div class="storage_body_line bgc_opcity goodsCodeDiv">
                <span class="storage_body_line_title">回收条码</span>
                <span class="storage_body_line_info beizhu">
                <input class="goodsCode" v-model="tbBarter[index].goodsCode" maxlength="255" style="z-index:9999"
                type="text" placeholder="请输入条码">
                <popup-picker :show.sync="saleGoodsVisible" :data="selsaleGoodsList"  @on-change="selectSaleGoods"  value-text-align="left"></popup-picker>               
                </span>
                <img class="search" style="height: 35px;vertical-align: middle;" @click="setSaleGoods(index)" src="../static/image/search.png" />
              </div>
			
              <div class="storage_body_line bgc_opcity addold">
                <span class="storage_body_line_title">旧料品类</span>
                <span class="storage_body_line_info" @click="setOldType(index)">
                  <popup-picker placeholder="请选择旧料品类" :data="seloldTypeList" v-model="tbBarter[index].seloldType"  @on-change="selectOldType"  value-text-align="left"></popup-picker>                    
                </span>  
                <button type="button" class="button_style2 button_jisuan" @click="insertOld(index)">抵换</button>                                      
              </div>

              <div class="storage_body_line bgc_opcity">
                <span class="storage_body_line_title">总&ensp;重&ensp;量</span> 
                <span class="storage_body_line_info">
                  <input class="barterWeightNum" v-model="tbBarter[index].barterWeightNum" type="number" placeholder="请输入总重量" maxlength="11" >
                  
                </span>          
              </div>

              <div class="diamond" v-show="tbBarter[index].oldTypeName === '钻石'">   

                <div class="storage_body_line bgc_opcity" v-show="isPriceType">
                  <span class="storage_body_line_title">价格类型</span>
                  <span class="storage_body_line_info" @click="setOldPriceType(index)">
                  <popup-picker placeholder="请选择价格类型" :data="selpriceTypeList" v-model="tbBarter[index].seloldpriceType"  @on-change="selectOldPriceType"  value-text-align="left"></popup-picker>                                       
                  </span>                
                </div>

                <div class="storage_body_line bgc_opcity">
                  <span class="storage_body_line_title">证&ensp;书&ensp;号</span> 
                  <span class="storage_body_line_info">
                    <input class="certNo" type="text" placeholder="请输入证书号" v-model="tbBarter[index].certNo" maxlength="64">  
                  </span>                       
                </div>
          
                <div class="storage_body_line bgc_opcity">
                  <span class="storage_body_line_title">主&ensp;石&ensp;重</span> 
                  <span class="storage_body_line_info">
                    <input class="mainStone" v-model="tbBarter[index].mainStone"type="number" placeholder="请输入主石重" maxlength="64" >  
                  </span>                  
                </div>

                <div class="storage_body_line bgc_opcity">
                  <span class="storage_body_line_title">颜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</span>
                </div>

                <div class="storage_body_line bgc_opcity">
                  <span class="storage_body_line_title">净&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度</span>
                </div>

              </div>

              <div class="xinzeng_old_List">

                <div style="margin-top: 5px;" v-for="(item2,index2) in tbBarter[index].tbOld">

                  <div class="storage_body_line bgc_opcity addold">
                    <span class="storage_body_line_title">换货商品</span>
                    <span class="storage_body_line_info" @click="setBarterGoods(index,index2)">
                      <popup-picker placeholder="请选择换货商品" :data="selbarterGoodsList" 
                      v-model="tbBarter[index].tbOld[index2].selbarterGoods"  @on-change="selectBarterGoods"  value-text-align="left"></popup-picker>       
                    </span>
                    <button type="button" class="button_style2 button_jisuan" @click="deleteOld(index,index2)">删除</button>
                  </div>
                 
                  <div class="storage_body_line bgc_opcity" v-show="tbBarter[index].isOneself === '按克'">
                    <span class="storage_body_line_title">抵扣重量</span> 
                    <span class="storage_body_line_info">
                      <input class="barterWeight" type="number" placeholder="请输入抵扣重量"  maxlength="11" 
                      v-model="tbBarter[index].tbOld[index2].barterWeight" > 
                    </span>              
                  </div>

                  <div class="storage_body_line bgc_opcity" v-show="tbBarter[index].isOneself === '按克'">
                    <span class="storage_body_line_title">旧料单价</span> 
                    <span class="storage_body_line_info">
                    <input class="unitPrice" placeholder="金重*单价=换货金额" maxlength="11" type="number"
                    v-model="tbBarter[index].tbOld[index2].unitPrice">  
                    </span>       
                  </div>

                  <div class="storage_body_line bgc_opcity" v-show="tbBarter[index].isOneself === '标价'">
                    <span class="storage_body_line_title">回收标价</span> 
                    <span class="storage_body_line_info">
                      <input type="number" placeholder="请输入回收标价" class="oldPrice" maxlength="11" 
                      v-model="tbBarter[index].tbOld[index2].oldPrice">
                    </span>  
                  </div>
                          
                  <div class="storage_body_line bgc_opcity">
                    <span class="storage_body_line_title">折扣(%)</span> 
                    <span class="storage_body_line_info">
                      <input class="barterDiscount" type="number" placeholder="折扣*标价=换货金额" maxlength="11" 
                      v-model="tbBarter[index].tbOld[index2].barterDiscount">
                    </span>    
                  </div>

                  <div class="storage_body_line bgc_opcity" v-if="isExcludeFee">
                    <span class="storage_body_line_title">工费</span> 
                    <span class="storage_body_line_info">
                      <input class="feePrice" type="number" placeholder="请输入工费" maxlength="11"  
                      v-model="tbBarter[index].tbOld[index2].feePrice">   
                    </span>        
                  </div>

                  <div class="storage_body_line bgc_opcity">
                    <span class="storage_body_line_title">换货金额</span> 
                    <span class="storage_body_line_info">
                      <input class="barterMoney" type="number" placeholder="请输入换货金额" maxlength="11"  
                      :readonly="tbBarter[index].isOneself === '标价'"
                      v-model="tbBarter[index].tbOld[index2].barterMoney">
                    </span>          
                  </div>
                          
                  <div class="storage_body_line bgc_opcity" v-show="tbBarter[index].isOneself === '按克'">
                    <span class="storage_body_line_title ">折旧单价</span> 
                    <span class="storage_body_line_info">
                    <input class="unitDepreciation" type="number" placeholder="请输入折旧费单价"  maxlength="11" 
                    v-model="tbBarter[index].tbOld[index2].unitDepreciation">
                    </span>
                  </div>

                  <div class="storage_body_line bgc_opcity">
                    <span class="storage_body_line_title ">折&ensp;旧&ensp;费</span> 
                    <span class="storage_body_line_info">
                      <input class="depreciationMoney" type="number" placeholder="请输入折旧费" maxlength="11" 
                      v-model="tbBarter[index].tbOld[index2].depreciation">
                    </span>  
                  </div>

                  <div class="storage_body_line bgc_opcity">
                    <span class="storage_body_line_title">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</span>
                    <span class="storage_body_line_info">
                      <input class="barterRemarks"  type="text" placeholder="请输入备注" v-model="tbBarter[index].tbOld[index2].barterRemarks" maxlength="200">      
                      <popup-picker :show.sync="barterremarksVisible" :data="selremarksList"  @on-change="selBarterRemarks"  value-text-align="left"></popup-picker>                       
                    </span>
                    <img class="search" style="height: 35px;vertical-align: middle;" @click="setBarterRemarks(index,index2)" v-if="isRemarks" src="../static/image/search.png"/>
                  </div>

                </div>
              </div>

              <div class="Info_title storage_body_line" >
                <button style=" width: 100%;color: #fff;background-color: #c9c9c9;font: inherit;" type="button"  class="" 
                @click="deletebarter(index)">删除<img class="botton_delete" src="../static/image/botton_delete.png" /></button>
              </div>

			      </div>

          </div>														
				</div> 

        <div class="storage_body_line_box" v-if="giveLength > 0">
          <div class="storage_body_line">
            <span class="storage_body_line_title" >赠品记录</span> 
            <span class="storage_img_line_info zengpinNo">
            <div style="text-align: right;padding-right: 10px;">
              <input type="text" readOnly="true"  maxlength="50" class="input_button" id="giveNo"  style="width: 15px!important; color: #999;">
              <button type="button" class="button_style2 button_jisuan" @click="insertGive()">新增</button>
            </div>
            </span>											
          </div>	

          <div id="xinzeng_zengpin_List">
            <div class="GiveInfo" v-for="(item,index) in giveList">  
            <div class="storage_body_line bgc_opcity">
              <span class="storage_body_line_title">赠&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品</span> 
              <span class="storage_body_line_info" @click="setGive(index)">
                <popup-picker placeholder="请选择赠品" :data="selgiveList" v-model="giveList[index].selgiveName"  @on-change="selectGive"  value-text-align="left"></popup-picker>       
              </span>                        
            </div>

            <div class="storage_body_line bgc_opcity">
              <span class="storage_body_line_title">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量</span> 
                <input type="number" placeholder="请输入数量" class="giveCount" maxlength="11" v-model="giveList[index].giveCount">
            </div>

            <div class="Info_title storage_body_line" >
              <button style=" width: 100%;color: #fff;background-color: #c9c9c9;font: inherit;" type="button"  class="" @click="deleteGive(index)">删除
              <img class="botton_delete" src="../static/image/botton_delete.png" /></button>
            </div>
            </div>
          </div>

        </div>

        <div class="storage_body_line" v-show="exchangeList.length > 0">
          <span class="storage_body_line_title">代&ensp;金&ensp;劵</span> 
          <span class="storage_body_line_info">
          <input placeholder="点击选择代金券" maxlength="11" style="z-index:9999" type="text" v-model="voucherCode" >
            <popup-picker :show.sync="exchangeVisible" :data="selexchangeList"  @on-change="selectExchange"  value-text-align="left"></popup-picker> 
          </span> 
          <img class="search" style="height: 35px;vertical-align: middle;" @click="exchangeVisible = true" src="../static/image/search.png" />      
        </div>

        <div class="storage_body_line" v-show="prestoreCount > 0">
          <span class="storage_body_line_title">预存金额</span> 
          <span class="storage_body_line_info">
            <input type="number" :placeholder="'可用预存金额:'+prestoreCount" v-model="prestore"  maxlength="11">
          </span>  
        </div>  
        
        <div class="storage_body_line">
          <span class="storage_body_line_title">订单备注</span> 
          <span class="storage_body_line_info beizhu">
            <input type="text" v-model="orderRemarks" placeholder="请输入订单备注" maxlength="120">
            <popup-picker :show.sync="ordersremarksVisible" :data="selremarksList"  @on-change="selordersRemarks"  value-text-align="left"></popup-picker>  
          </span>
          <img class="search" style="height: 35px;vertical-align: middle;" @click="setordersRemarks()"  v-if="isRemarks" src="../static/image/search.png"/> 
        </div> 

        <div class="storage_body_line" style="border-top:1px solid #e5e5e5;">
          <span class="storage_body_line_title">总折扣</span> 
          <span class="storage_body_line_info "> 
            <input type="number" placeholder="总折扣(%)" v-model="discountSum" @blur="setDiscountSum()" class="input_button" maxlength="11">	
          </span>  									
        </div> 

        <div class="container my_total_assets_list">
          <div class="row">
            <div class="col-md-12" style="margin-bottom:0!important;">
              商品金额 <span style="margin-left:15px;">{{strikePriceSum}}</span>
            </div>												
            <div class="col-md-12" style="margin-bottom:0!important;" v-show="voucherNum > 0">
              现&ensp;金&ensp;劵 <span style="margin-left:15px;">{{voucherNum}}</span>
            </div>
            <div class="col-md-12"  style="margin-bottom:0!important;"  v-show="prestoreCount > 0">
              预存金额 <span style="margin-left:15px;">{{prestoreSum}}</span>
            </div>
            <div class="col-md-12" id="depositDiv" v-if="reserveSum > 0" style="margin-bottom:0!important;">
              已收订金 <span id="depositSum" style="margin-left:15px;color:#fb366b;">{{reserveSum}}</span>
            </div>
            <div class="col-md-12" style="margin-bottom:0!important;">
              换货金额 <span style="margin-left:15px;">{{barterMoneySum}}</span>	
            </div>
            <div class="col-md-12" style="margin-bottom:0!important;">
              折&ensp;旧&ensp;费 <span id="depreciationSum" style="margin-left:15px;">{{depreciationSum}}</span>
            </div>
            <div class="col-md-12" style="margin-bottom:0!important;">
              优惠金额 <span id="Discounts" style="margin-left:15px;">{{differPriceSum}}</span>
            </div>
            <div class="col-md-12" style="margin-bottom:0!important;">
              实收金额 <span id="receivable" style="margin-left:15px;color:#fb366b;">{{receivable}}</span>
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
            <router-link to="" @click.native="activeTab('tab-container2')" slot="left">
            <mt-button icon="back">返回</mt-button>
          </router-link>
          </mt-header>
        </div>

        <div id="goodsTemplate">

          <div class="storage_choose_place" v-for="item in goodsList" v-if="item.id === checkGoodsId">

            <div class="storage_body_line ">
              <span class="storage_body_line_title">品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span> <span
                class="storage_body_line_info">{{item.goodsName}} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">商品分类</span> <span
                class="storage_body_line_info">{{item.goodsTypeName}} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">证&nbsp;&nbsp;书&nbsp;&nbsp;号</span> <span
                class="storage_body_line_info"> {{item.certNo}}</span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">货&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</span> <span
                class="storage_body_line_info">{{item.goodsCode}} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">金属材质</span> <span
                class="storage_body_line_info">{{item.materialMetal}} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">总重量</span> <span
                class="storage_body_line_info"> {{item.weight}}</span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费</span> <span
                class="storage_body_line_info"> {{item.ee}}</span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">精&nbsp;&nbsp;品&nbsp;&nbsp;费</span> <span
                class="storage_body_line_info"> {{item.qualityCost}}</span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价</span> <span
                class="storage_body_line_info">{{item.tagPrice}}</span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">主石大小</span> <span
                class="storage_body_line_info">{{item.mainStone}} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">颜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</span> <span
                class="storage_body_line_info">{{item.color}} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">净&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度</span> <span
                class="storage_body_line_info">{{item.cleanliness}} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">质&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地</span> <span
                class="storage_body_line_info">{{item.texture}} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">形&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;状</span> <span
                class="storage_body_line_info">{{item.shape}} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">透&nbsp;&nbsp;明&nbsp;&nbsp;度</span> <span
                class="storage_body_line_info">{{item.transparency}} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">瑕&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;疵</span> <span
                class="storage_body_line_info">{{item.flaw}} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">光&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;泽</span> <span
                class="storage_body_line_info">{{item.gloss}} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">证&nbsp;&nbsp;书&nbsp;&nbsp;费</span> <span
                class="storage_body_line_info">{{item.certFee}} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">指&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;圈</span> <span
                class="storage_body_line_info">{{item.ringSize}} </span>
            </div>
            <div class="storage_body_line">
              <span class="storage_body_line_title">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家</span> <span
                class="storage_body_line_info">{{item.manufacturer}} </span>
            </div>							
          </div>          
          
        </div>
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
import {focus} from 'utils/directives'
import { PopupPicker } from 'vux'

Vue.component(Toast)
Vue.use(focus)

export default {
  components: {
    PopupPicker
  },
  data () {
    return {
      checkGoodsId: '',
      active: 'tab-container1',
      mobile: '',
      username: '',
      headPic: '',
      orderRemarks: '',
      discountSum: '',
      giveLength: 0,
      prestoreCount: 0,
      prestore: '',
      thumbHeadPic: '',
      isHeadPic: false,
      voucherCode: '',
      voucherNum: 0,
      voucherId: '',
      goodsList: [],
      goodsTypeList: [],
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
      seloldTypeList: [['']],
      barterGoodsList: [],
      selbarterGoodsList: [['']],
      saleGoodsList: [],
      selsaleGoodsList: [['']],
      exchangeList: [],
      selexchangeList: [['']],
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
      tbgoodsStr: [],
      tbBarter: []
    }
  },
  computed: {
    receivable: function () {
      return Number(this.strikePriceSum) + Number(this.barterMoneySum) + Number(this.depreciationSum) + Number(this.voucherNum) + Number(this.prestoreSum)
    },
    totalBill: function () {
      return Number(this.spendSum) + Number(this.barterMoneySum) + Number(this.depreciationSum) + Number(this.voucherNum) + Number(this.prestoreSum)
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
        for (let old of barter.tbOld) {
          let unitPrice = validate.isEmpty(old.unitPrice) ? 0 : old.unitPrice
          let barterWeight = validate.isEmpty(old.barterWeight) ? 0 : old.barterWeight
          let barterMoney = validate.isEmpty(old.barterMoney) ? 0 : old.barterMoney
          let unitDepreciation = validate.isEmpty(old.unitDepreciation) ? 0 : old.unitDepreciation
          let oldPrice = validate.isEmpty(old.oldPrice) ? 0 : old.oldPrice
          let feePrice = validate.isEmpty(old.feePrice) ? 0 : old.feePrice
          let barterDiscount = validate.isEmpty(old.barterDiscount) ? 100 : old.barterDiscount

          if (isOneself === '按克') {
            // 旧料标价
            oldPrice = Math.round(unitPrice * barterWeight)
            old.oldPrice = oldPrice > 0 ? oldPrice : ''
            // 折旧费
            if (unitDepreciation !== 0 && barterWeight !== 0) {
              old.depreciation = Math.round(unitDepreciation * barterWeight)
            } else {
              old.depreciation = ''
            }

            if (barterWeight === 0 && barterMoney > 0 && unitPrice > 0) {
              // old.barterWeight = number.accDiv(barterMoney, unitPrice).toFixed(2)
            }
          }
          let barterMoney2 = Math.round(oldPrice * barterDiscount / 100 + feePrice)
          old.barterMoney = barterMoney2 === 0 ? '' : barterMoney2
          barterMoneySum += barterMoney2
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
        let fee = validate.isEmpty(item.fee) ? 0 : item.fee
        let differPrice = validate.isEmpty(item.differPrice) ? 0 : item.differPrice

        if (realWeight > 0 && fee > 0) {
            // 计算工费
          item.feePrice = Math.round(realWeight * fee)
        }
        let feePrice = validate.isEmpty(item.feePrice) ? 0 : item.feePrice

        if (nowPrice > 0 && realWeight > 0) {
            // 按克销售
          item.receMoney = Math.round((nowPrice * realWeight + feePrice) * number)
        } else {
            // 按件销售
          item.receMoney = Math.round(number * tagPrice * discount / 100)
        }
        item.strikePrice = item.receMoney - differPrice

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
              barterIsWeightCal: goods.isWeightCal,
              weight: goods.weight,
              select: 0
            })
          }

          // 设置换货商品选择
          this.selbarterGoodsList[0].splice(0, this.selbarterGoodsList[0].length)
          for (let elem of this.barterGoodsList) {
            this.selbarterGoodsList[0].push(elem.barterGoodsCode)
          }

          // 设置旧料类别选择
          this.goodsTypeList = r.data.goodsTypeList
          this.oldTypeList = this.goodsTypeList

          this.seloldTypeList[0].splice(0, this.seloldTypeList[0].length)
          for (let elem of this.oldTypeList) {
            this.seloldTypeList[0].push(elem.goodsType)
          }

          this.barterModeList = r.data.barterModeList
          this.isOneselfList = r.data.isOneselfList
          this.diamondColorList = r.data.diamondColorList
          this.cleanlinessList = r.data.cleanlinessList

          // 设置赠品选择
          this.giveList = r.data.giveList
          this.giveLength = this.giveList.length
          this.selgiveList[0].splice(0, this.selgiveList[0].length)
          for (let elem of this.giveList) {
            this.selgiveList[0].push(elem.giveName)
          }

          // 价格类型选
          this.priceTypeList = r.data.priceType
          if (!validate.isEmpty(this.priceTypeList)) {
            this.isPriceType = true
          }
          this.selpriceTypeList[0].splice(0, this.selpriceTypeList[0].length)
          for (let item of this.priceTypeList) {
            this.selpriceTypeList[0].push(item.priceType)
          }

          // 品牌选择
          if (!validate.isEmpty(r.data.manufacturer)) {
            this.isManufacturer = true
            this.manufacturerList = r.data.manufacturer
          }
          this.selmanufacturerList[0].splice(0, this.selmanufacturerList[0].length)
          for (let item of this.manufacturerList) {
            this.selmanufacturerList[0].push(item.manufacturer)
          }

          // 订单备注选择
          this.remarksList = r.data.orderRemarks
          if (!validate.isEmpty(this.remarksList)) {
            this.isRemarks = true
          }
          this.selremarksList[0].splice(0, this.selremarksList[0].length)
          for (let item of this.remarksList) {
            this.selremarksList[0].push(item.remarks)
          }

          if (validate.isEmpty(r.data.isExcludeFee) || r.data.isExcludeFee === '0') {
            // 商品售价不含工费
            this.isExcludeFee = false
          }

          this.setCusImager(r.data.goodsShopping.thumbHeadPic)
        },
        r => {
          if (r.code === '101') {
            this.$router.push({path: '/login'})
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
            this.$router.push({path: '/login'})
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
            this.$router.push({path: '/login'})
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
            this.$router.push({path: '/login'})
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
            this.$router.push({path: '/login'})
          }
          Toast(r)
        }
      )
    },
    selectExchange: function (values) {
      if (!validate.isEmpty(values)) {
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
      this.barterGoodsVisible	 = true
    },
    selectBarterGoods: function (values) {
      if (!validate.isEmpty(values.toString())) {
        for (let [index, item] of this.barterGoodsList.entries()) {
          if (item.barterGoodsCode === values.toString()) {
            this.barterGoodsList[index].select = 1
            this.tbBarter[this.oldTypeIndex].tbOld[this.barterGoodsIndex].selbarterGoods[0] = values.toString()
            this.tbBarter[this.oldTypeIndex].tbOld[this.barterGoodsIndex].barterType = item.barterType
            this.tbBarter[this.oldTypeIndex].tbOld[this.barterGoodsIndex].barterGoods = item.barterGoods
            this.tbBarter[this.oldTypeIndex].tbOld[this.barterGoodsIndex].barterIsWeightCal = item.barterIsWeightCal
            this.tbBarter[this.oldTypeIndex].tbOld[this.barterGoodsIndex].barterWeight = item.weight

            let barterIsWeightCal = validate.isEmpty(this.tbBarter[this.oldTypeIndex].tbOld[this.barterGoodsIndex].barterIsWeightCal) ? 0 : this.tbBarter[this.oldTypeIndex].tbOld[this.barterGoodsIndex].barterIsWeightCal
            let barterWeight = validate.isEmpty(this.tbBarter[this.oldTypeIndex].tbOld[this.barterGoodsIndex].barterWeight) ? 0 : this.tbBarter[this.oldTypeIndex].tbOld[this.barterGoodsIndex].barterWeight
            let isOneself = this.tbBarter[this.oldTypeIndex].isOneself
            let barterWeightNum = this.tbBarter[this.oldTypeIndex].barterWeightNum

            // 剩余重量
            let surplusWeight = 0
            for (let [index, elem] of this.tbBarter[this.oldTypeIndex].tbOld.entries()) {
              if (index !== this.barterGoodsIndex) {
                surplusWeight += Number(elem.barterWeight)
              }
            }

            surplusWeight = number.accSub(barterWeightNum, surplusWeight)

            if (isOneself === '按克') {
            // 换货商品按件卖的
              if (barterIsWeightCal === '0') {
                this.tbBarter[this.oldTypeIndex].tbOld[this.barterGoodsIndex].barterWeight = surplusWeight
              } else {
                if (Number(surplusWeight) >= Number(barterWeight)) {
                  this.tbBarter[this.oldTypeIndex].tbOld[this.barterGoodsIndex].barterWeight = barterWeight
                } else {
                  this.tbBarter[this.oldTypeIndex].tbOld[this.barterGoodsIndex].barterWeight = surplusWeight
                }
              }
            } else {
              this.tbBarter[this.oldTypeIndex].tbOld[this.barterGoodsIndex].barterWeight = barterWeightNum
            }
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
            this.giveList[this.giveIndex].giveId = item.giveId
            this.giveList[this.giveIndex].giveName = item.giveName
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
            this.tbBarter[this.oldTypeIndex].barterWeightNum = item.goodsWeight
            // 钻石的旧料信息
            this.tbBarter[this.oldTypeIndex].certNo = item.certNo
            this.tbBarter[this.oldTypeIndex].mainStone = item.mainStone
            this.tbBarter[this.oldTypeIndex].color = item.color
            this.tbBarter[this.oldTypeIndex].cleanliness = item.cleanliness
            // 旧料信息
            this.selectOldType(item.goodsTypeName)
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
    setOldType: function (index) {
      this.oldTypeIndex = index
    },
    selectOldType: function (values) {
      if (!validate.isEmpty(values.toString())) {
        for (let item of this.oldTypeList) {
          if (item.goodsType === values.toString()) {
            this.tbBarter[this.oldTypeIndex].seloldType.length = 0
            this.tbBarter[this.oldTypeIndex].seloldType.push(values.toString())
            this.tbBarter[this.oldTypeIndex].oldType = item.id
            this.tbBarter[this.oldTypeIndex].oldTypeName = item.goodsType
            this.tbBarter[this.oldTypeIndex].oldIsWeightCal = item.isWeightCal

            if (this.tbBarter[this.oldTypeIndex].oldIsWeightCal === '1') {
              this.tbBarter[this.oldTypeIndex].isOneself = '按克'
            } else {
              this.tbBarter[this.oldTypeIndex].isOneself = '标价'
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
          barterWeight += Number(old.barterWeight)
          old.barterMode = barter.barterMode
          old.isOneself = barter.isOneself
          old.goodsCode = barter.goodsCode
          old.oldType = barter.oldType
          old.oldTypeName = barter.oldTypeName
        }

        if (barter.barterWeightNum !== barterWeight.toString()) {
          Toast(`${barter.oldTypeName}的抵扣重量合计不等于总重量`)
          return
        }

        if (barter.barterMode === '上柜' && validate.isEmpty(barter.goodsCode)) {
          Toast(`${barter.oldTypeName}的回收条码不能为空`)
          return
        }
      }
      // 赠品信息
      for (let give of this.giveList) {
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
          tbgiveStr: JSON.stringify(this.giveList)
        },
        r => {
          this.$store.commit('setOrders', 0)
          this.$router.push({path: '/storageSuccess'})
        },
        r => {
          if (r.code === '101') {
            this.$router.push({path: '/login'})
          }
          Toast(r)
        }
      )
    },
    insertGive: function () {
      this.giveList.push({
        giveId: '',
        giveName: '',
        selgiveName: [],
        giveCount: ''
      })
    },
    deleteGive: function (index) {
      this.giveList.splice(index, 1)
    },
    deleteOld: function (index, index2) {
      this.tbBarter[index].tbOld.splice(index2, 1)
    },
    // 添加抵换记录
    insertOld: function (index) {
      if (validate.isEmpty(this.tbBarter[index].barterWeightNum)) {
        Toast('总重量不能为空')
        return
      }

      this.tbBarter[index].tbOld.push({
        depreciation: '',
        unitDepreciation: '',
        selbarterGoods: [],
        barterGoodsCode: '',
        barterGoods: '',
        barterType: '',
        barterMoney: '',
        unitPrice: '',
        barterDiscount: '',
        barterIsWeightCal: '1',
        barterWeight: '',
        oldType: '',
        oldTypeName: '',
        oldIsWeightCal: '',
        oldPrice: '',
        feePrice: '',
        barterRemarks: ''
      })

      this.oldTypeIndex = index
      this.barterGoodsIndex = this.tbBarter[this.oldTypeIndex].tbOld.length - 1
      // 设置默认的换货商品
      var barterGoodsCode = this.barterGoodsList[0].barterGoodsCode
      for (let item of this.barterGoodsList) {
        if (item.select === 0) {
          barterGoodsCode = item.barterGoodsCode
          break
        }
      }

      this.selectBarterGoods(barterGoodsCode)
    },
    // 添加换货记录
    insertBarter: function () {
      this.tbBarter.push({
        tbOld: [],
        barterMode: '回收',
        isOneself: '按克',
        goodsCode: '',
        barterWeightNum: '',
        oldType: '',
        seloldType: [],
        oldTypeName: '',
        oldpriceType: '',
        seloldpriceType: [],
        oldmanufacturer: '',
        seloldmanufacturer: [],
        certNo: '',
        mainStone: '',
        color: '',
        cleanliness: ''
      })

      this.oldTypeIndex = this.tbBarter.length - 1
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
            this.$router.push({path: '/productList'})
          }
          this.tbgoodsStr.splice(index, 1)
        },
        r => {
          if (r.code === '101') {
            this.$router.push({path: '/login'})
          }
          Toast(r)
        }
      )
    },
    checkGoods: function (checkGoodsId) {
      this.checkGoodsId = checkGoodsId
      this.active = 'tab-container3'
    }
  }

}
</script>

<style lang="scss" scoped>
  @import "../style/scss/orderAdd";
</style>
