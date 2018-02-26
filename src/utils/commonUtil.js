import Vue from 'vue'
import {Toast, Indicator} from 'mint-ui'

Vue.component(Toast)
Vue.component(Indicator)

var commonUtil = {

  indicatorOpen () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
  },
  indicatorClose () {
    Indicator.close()
  }
}

export {commonUtil}
