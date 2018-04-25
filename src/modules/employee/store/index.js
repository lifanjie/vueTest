// 我们组装模块并导出 store 的地方
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate' // 将vuex的state保存在localstorage

Vue.use(Vuex)

const state = {
  pays: 0,
  orders: 0
}

const mutations = {
  setPays (state, pays) {
    state.pays = pays
    localStorage.setItem('pays', state.pays)
  },
  addPays (state, pays) {
    state.pays += pays
    localStorage.setItem('pays', state.pays)
  },
  setOrders (state, orders) {
    state.orders = orders
    localStorage.setItem('orders', state.orders)
  },
  addOrders (state, orders) {
    state.orders += orders
    localStorage.setItem('orders', state.orders)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  plugins: [createPersistedState()]
})
