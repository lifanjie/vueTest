import Vue from 'vue'
import { Toast } from 'mint-ui'

Vue.component(Toast)

var validate = {

  // 判断不为空
  isEmpty (data) {
    if (typeof data === 'undefined' || data == null || data === '') {
      return true
    } else {
      return false
    }
  },
  // 验证字符串长度
  isLength (data, field, length) {
    if (data.length !== length) {
      Toast(`${field}长度不符合规则`)
    } else {
      return true
    }
  },
  // 验证必填项
  isRequired (data, field) {
    if (typeof data === 'undefined' || data == null || data.length <= 0 || data === '') {
      Toast(`请填入${field}`)
    } else {
      return true
    }
  },
  // 验证手机号码
  isMobile (data) {
    let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
    if (data === '') {
      Toast('请输入手机号码')
    } else if (!reg.test(data)) {
      Toast('手机格式不正确')
    } else {
      return true
    }
  },
  // 验证邮箱号
  isEmail (data) {
    let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
    if (data === '') {
      Toast('请输入手机号码')
    } else if (!reg.test(data)) {
      Toast('手机格式不正确')
    } else {
      return true
    }
  }
}

export { validate }
