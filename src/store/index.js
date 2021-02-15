import { createStore } from 'vuex'
import request from '@/utils/api'

export default createStore({
  state: {
    token: ''
  },
  mutations: {
    login(state, payload) {
      window.sessionStorage.setItem('token', payload.token)
      state.token = payload.token
    }
  },
  actions: {
    login({ commit }) {
      return request.get('/data/user.json').then((response) => {
        // 处理返回的 token
        commit('login', response.data)
      })
    }
  },
  getters: {
    token(state, getters) {
      return state.token || window.sessionStorage.getItem('token') || ''
    }
  }
})
