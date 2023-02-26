import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/Main/Main.vue').then(err => err),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home').then(err => err),
      },
      {
        path: '/user',
        name: "user",
        component: () => import('../views/User').then(err => err),
      },
      {
        path: '/foods',
        name: "foods",
        component: () => import('../views/Foods').then(err => err),
      },
      {
        path: '/shop',
        name: "shop",
        component: () => import('../views/Shop').then(err => err),
      },
      {
        path: '/orders',
        name: "orders",
        component: () => import('../views/Orders').then(err => err),
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login').then(err => err)
  }

]
const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
export default router