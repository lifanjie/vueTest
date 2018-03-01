<template>
  <div>  

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
            <input type="number" placeholder="请输入客户电话"  class="mobile" maxlength="11" onblur="getcusInfo(this)">
            </span>
					</div>

          <div class="storage_body_line">
            <span class="storage_body_line_title">客户姓名</span> 
            <span class="storage_body_line_info xingming"> 
            <input type="text" placeholder="请输入客户姓名" class="username" maxlength="20" />
            </span>
          </div>

 					<div class="storage_img_line">
						<span class="storage_img_line_title">客户头像</span> 
            <span class="storage_img_line_info touxiang" style="width:70%;">
              <div class="fileUpload btn btn-primary" id="fileUpload">
                <span></span> 
                <input id="uploadBtn" type="file" 
                class="upload" name="myfiles" @change="uploadPicture()" />
                <input type="hidden" id="thumbHeadPic" />
              </div>
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
            <router-link to="" @click.native="activeTab()" slot="left">
            <mt-button icon="back">返回</mt-button>
          </router-link>
          </mt-header>
        </div>
      </mt-tab-container-item>      
    </mt-tab-container>

  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 'tab-container1'

    }
  },
  creates: function () {

  },
  methods: {
    activeTab: function () {
      this.active = 'tab-container1'
    },
    cusOver: function () {

    },
    cusNext: function () {

    },
    uploadPicture: function () {

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
  @import "../style/scss/orderAdd";
</style>
