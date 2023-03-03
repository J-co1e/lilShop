import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import router from "@/router";

Vue.config.productionTip = false
Vue.use(ElementUI);
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    if (store.state.permission.addRouters.length === 0) {
      const form = JSON.parse(sessionStorage.getItem('userObj'))
      store.dispatch('Login', form).then((res) => {
        store.dispatch('permission/GenerateRoutes', res)
        const addRouters = store.state.permission.addRouters
        if (addRouters.length > 0) {
          router.addRoute('main', ...addRouters)
        }
        router.push({ path: to.path });
      })
    } else {
      if (to.path === '/login') {
        sessionStorage.removeItem('userObj')
        sessionStorage.removeItem('routers')
      }
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
