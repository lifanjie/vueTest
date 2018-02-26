import Vue from 'vue'
import qs from 'qs'
import axios from 'axios'
import { Toast } from 'mint-ui'
import { validate } from 'utils/validate'
// 配置API接口地址
// var root = 'http://ceshiht.zuanno.cn/wechat'
var root = 'http://localhost/jeesite/wechat'
// 引用axios

// 如果不设置全局
axios.defaults.withCredentials = true
Vue.component(Toast)

// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/

function apiAxios (method, url, params, success, failure) {
  if (params) {
    params = filterNull(params)
  }
  let orgId = params.orgId
  let openId = params.openId
  params = qs.stringify(params)

  // console.log(JSON.stringify(params))
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    withCredentials: true
  })
  .then(function (res) {
    if (res.data.success === true) {
      if (success) {
        // console.log(JSON.stringify(res.data))
        success(res.data)
      }
    } else {
      // 未注册
      if (res.data.code === '101' && !validate.isEmpty(orgId) && !validate.isEmpty(openId)) {
        this.$route.push({
          path: '/register',
          query: {
            orgId: orgId,
            openId: openId
          }
        })
      } else if (failure) {
        failure(res.data)
      } else {
        Toast('error: ' + JSON.stringify(res.data))
      }
    }
  })
  .catch(function (err) {
    if (validate.isEmpty(err.data)) {
      return
    }
    let res = err.response
    if (err) {
      Toast('api error, HTTP CODE: ' + res.status)
    }
  })
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  }
}
