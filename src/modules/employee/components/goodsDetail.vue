<template>
  <div id="goodsDetail">

    <group :gutter=0 label-width="4.5em" label-align="left">
      <cell title="商品条码" :value="goodsInfo.goodsCode" value-align="left"></cell> 
      <cell title="商品名称" :value="goodsInfo.goodsName" value-align="left"></cell>
      <cell title="商品类别" :value="goodsInfo.goodsTypeName" value-align="left"></cell>
      <cell title="证 书 号" :value="goodsInfo.certNo" value-align="left"></cell>
      <cell title="总 重 量" :value="goodsInfo.weight" value-align="left"></cell>
      <cell title="标    价" :value="goodsInfo.tagPrice" value-align="left"></cell>
      <cell title="金属材质" :value="goodsInfo.materialMetal" value-align="left"></cell>
      <cell title="工    费" :value="goodsInfo.fee" value-align="left"></cell>
      <cell title="颜    色" :value="goodsInfo.color" value-align="left"></cell>
      <cell title="净    度" :value="goodsInfo.cleanliness" value-align="left"></cell>
      <cell title="指    圈" :value="goodsInfo.ringSize" value-align="left"></cell>
      <cell title="品    牌" :value="goodsInfo.manufacturer" value-align="left"></cell>
    </group>    

  </div>
</template>

<script>
import { validate } from 'utils/validate'

export default {
  props: {
    goods: {
      type: Object
    }
  },
  computed: {
    goodsInfo: function () {
      if (!validate.isEmpty(this.goods)) {
        return this.goods
      } else {
        return {
          goodsCode: '',
          goodsName: '',
          goodsTypeName: '',
          certNo: '',
          weight: '',
          tagPrice: '',
          materialMetal: '',
          fee: '',
          color: '',
          cleanliness: '',
          ringSize: '',
          manufacturer: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>


