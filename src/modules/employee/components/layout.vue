<template>
  <div>
    <router-view></router-view>
    <keep-alive>
    <myFooter></myFooter>
    </keep-alive> 
  </div>
</template>

<script>
import myFooter from '../components/footer'

export default {
  components: {
    myFooter
  },
  created: function () {
    this.$nextTick(function () {

    })
  }
}
</script>

