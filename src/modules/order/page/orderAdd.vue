<template>
  <div>
    <el-table :data="tableData" border  @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut" style="width: 100%"> 
       <el-table-column  label="日期"  width="180">  
          <template scope="scope">  
             <span v-if="!scope.row.editFlag">{{ scope.row.name }}</span>  
              <span v-if="scope.row.editFlag" class="cell-edit-input">
                <el-input v-model="inputColumn1" placeholder="请输入内容"></el-input>
              </span>   
              <span v-if="!scope.row.editFlag" style="margin-left:10px;" class="cell-icon" @click="handleEdit(scope.row)"> 
                <i class="el-icon-edit"></i> 
              </span>   
              <span v-if="scope.row.editFlag" style="margin-left:10px;" class="cell-icon" @click="handleSave(scope.row)"> 
                <i class="el-icon-document"></i> 
              </span>  
          </template>  
        </el-table-column>  
    </el-table> 
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [ { name: 'test', editeFlage: false }, { name: 'test', editeFlage: false },
       { name: 'test', editeFlage: false },
        { name: 'test', editeFlage: false } ],
      inputColumn1: '' }
  },
  methods: {
    handleEdit: function (row) { },
    handleSave: function (row) { },
    handleMouseEnter: function (row, column, cell, event) {
      cell.children[0].children[1].style.color = 'black'
    },
    handleMouseOut: function (row, column, cell, event) {
      cell.children[0].children[1].style.color = '#ffffff'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>


