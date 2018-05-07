
import {Indicator} from 'mint-ui'

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
