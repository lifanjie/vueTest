<template>
  <div id="msg">
    <msg :title="msg.title" :description="msg.description" :buttons="buttons" :icon="msg.icon"></msg>
  </div>
  
</template>

<script>
export default {
  data () {
    return {
      msg: {},
      buttons: [{
        type: 'primary',
        text: '',
        link: '/msg'
      }]
    }
  },
  created: function () {
    this.msg = this.$store.state.msg
    this.buttons[0] = {
      type: this.msg.butType,
      text: this.msg.butText,
      link: this.msg.butLink
    }
  }
}
</script>

<style lang="scss" scoped>

#msg{
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  position: absolute;
}

</style>


