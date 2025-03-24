import { defineStore } from 'pinia'
import { getIdentity } from '@/mock'
import { asyncRoutes, constantRoutes } from '@/router'
import router from '@/router'
import { RouteRecordRaw, useRouter, RouteRecordNormalized } from 'vue-router'
import useUserStore from './user'
const useAppStore = defineStore('app', {
  state: () => ({
    isMobile: window.innerWidth < 768,
    schema: 'dark',
    isCollapse: false,
    isShowMenu: false,
    addRoutes: Array<RouteRecordRaw>(),
    routes: Array<RouteRecordRaw>()
  }),
  actions: {
    changeSchema() {
      document.documentElement.classList.toggle('dark')
      this.schema = this.schema === 'light' ? 'dark' : 'light'
    },
    changeCollapse() {
      this.isCollapse = !this.isCollapse
    },
    changeShowMenu() {
      this.isShowMenu = !this.isShowMenu
    },
    // 添加重新注册路由的方法
    reloadRoutes() {
      return new Promise((res) => {
        if (this.addRoutes.length) {
          for (let i = 0; i < this.addRoutes.length; i++) {
            const route = this.addRoutes[i]
            if (!router.hasRoute(route.name as string)) {
              router.addRoute('main', route)
            }
            if (i === this.addRoutes.length - 1) {
              res(true)
            }
          }
        }
      })
    },

    async setIdentityRoutes(identity: string[]) {
      return new Promise(async (res) => {
        const userStore = useUserStore()
        userStore.role = identity
        const transConstantRoutes = processRoutes(constantRoutes)
        const transAsyncRoutes = processRoutes(asyncRoutes)
        const accessRoutes = transAsyncRoutes.filter((route: RouteRecordRaw) => {
          if (route.meta && Array.isArray(route.meta.roles)) {
            return route.meta.roles.includes(identity[0])
          } else {
            return false
          }
        })
        transConstantRoutes[0].children?.push(...accessRoutes)
        this.addRoutes = accessRoutes
        this.routes = transConstantRoutes[0].children as Array<RouteRecordRaw>
        await this.reloadRoutes() // 使用新方法替代原来的 forEach
        res(transConstantRoutes[0])
      })
    }
  }
})
function processRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  return routes.map((route) => {
    const meta = route.meta
    route = { ...route, ...meta }
    if (route.children) {
      route.children = processRoutes(route.children)
    }
    return route
  })
}
export default useAppStore
