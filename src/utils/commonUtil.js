import Vue from 'vue'
import {Toast, Indicator} from 'mint-ui'

Vue.component(Toast)
Vue.component(Indicator)

var commonUtil = {

  indicatorOpen (text) {
    Indicator.open({
      text: text,
      spinnerType: 'fading-circle'
    })
  },
  indicatorClose () {
    Indicator.close()
  }
}

export {commonUtil}
