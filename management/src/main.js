import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import router from "@/router"
import '@/style/common.css'
import '@/mock/index'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VXETable)
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    if (store.state.permission.addRouters.length === 0) {
      const form = JSON.parse(sessionStorage.getItem('userObj'))
      store.dispatch('Login', form).then((res) => {
        store.dispatch('permission/GenerateRoutes', res)
        const addRouters = store.state.permission.addRouters
        if (addRouters.length > 0) {
          for (let i = 0; i < addRouters.length; i++) {
            router.addRoute('main', addRouters[i])
          }
        }
        router.push({ path: to.path });
      })
    } else {
      if (to.path === '/login') {
        sessionStorage.clear()
        store.commit('clearMenu')
      }
      next()
    }
  } else {
    if (to.path === '/login') {
      store.commit('clearMenu')
      sessionStorage.clear()
      next()
    } else {
      next('/login')
    }
  }
})
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate () {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
