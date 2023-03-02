import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import permission from './permission'
import { handleLogin } from "@/api";
import Cookies from 'js-cookie';
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    tab, permission
  },
  state: {
    token: ''
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    Login({ commit }, form) {
      return new Promise((resolve,rej)=>{
        handleLogin(form).then(({data:res})=>{
          if (res.code === "9999") {
            rej('用户名或密码错误，请重新输入')
          } else {
            Cookies.set('token',res.token)
            commit('SET_TOKEN',res.token)
            resolve(res.roles)
          }
        })
      })
    }
  }
})