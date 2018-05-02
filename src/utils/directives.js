import Vue from 'vue'

const focus = Vue.directive('focus', {
  inserted: (el, isfocus) => {
    // 当被绑定的元素插入到 DOM 中时……

    if (isfocus) {
    // 聚焦元素
      el.focus()
    }
  },
  update: (el, {value, oldValue}) => {
    // 更新时……

    if (value !== oldValue) {
    // 聚焦元素
      el.focus()
    }
  }
})

export {focus}
