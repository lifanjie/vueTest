// 我们组装模块并导出 store 的地方
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  orgId: '',
  openId: ''
}

const mutations = {
  setOrgId (state, orgId) {
    state.orgId = orgId
  },
  setOpenId (state, openId) {
    state.openId = openId
  }
}

export default new Vuex.Store({
  state,
  mutations
})
