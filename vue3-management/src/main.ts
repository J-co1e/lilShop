// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vSchema from './directives/schema'
import vTyping from './directives/typing'
import App from './App.vue'
import router from './router'
import store from './store'
import './style.scss'
import 'virtual:uno.css'
import 'ant-design-vue/dist/reset.css'
import useAppStore from './store/modules/app'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import useUserStore from './store/modules/user'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(router).use(store).use(pinia).mount('#app')
app.directive('schema', vSchema)
app.directive('typing', vTyping)

router.beforeEach(async (to, from, next) => {
  const appStore = useAppStore()
  const userStore = useUserStore()
  const token = userStore.token

  if (token) {
    if (!appStore.addRoutes.length) {
      const roles = userStore.role
      if (!roles.length) {
        sessionStorage.clear()
        next('/login')
        return
      }
      await appStore.setIdentityRoutes(roles)
      // 重要：重新导航到目标路由
      next({ ...to, replace: true })
      return
    }

    if (to.path === '/login') {
      sessionStorage.clear()
      next()
      return
    }

    // 确保动态路由已添加
    if (!router.hasRoute(to.name as string) && appStore.addRoutes.length) {
      await appStore.reloadRoutes()
      next({ ...to, replace: true })
      return
    }

    next()
  } else {
    if (to.path === '/login') {
      sessionStorage.clear()
      next()
    } else {
      next('/login')
    }
  }
})
