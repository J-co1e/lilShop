import VueRouter from "vue-router";
import Vue from "vue";
import Cookies from "js-cookie";
Vue.use(VueRouter)

export const constanceRoutes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/Main/Main.vue').then(err => err),
    children: [
      {
        path: '/home',
        name: 'home',
        icon: 's-home',
        label: '首页',
        component: () => import('../views/Home').then(err => err),
      },
      {
        path: '/foods',
        name: "foods",
        icon: 'burger',
        label: '菜品管理',
        component: () => import('../views/Foods').then(err => err),
      },
      {
        path: '/orders',
        name: "orders",
        icon: 'dish',
        label: '订单管理',
        component: () => import('../views/Orders').then(err => err),
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login').then(err => err)
  },
  {
    path: '/*',
    name: '404',
    hidden: true,
    component: () => import('../views/404').then(err => err)
  }
]
export const asyncRoutes = [
  {
    path: '/user',
    name: "user",
    icon: 'user',
    label: '人员管理',
    component: () => import('../views/User').then(err => err),
    meta: { role: ['admin'] }
  },
  {
    path: '/shop',
    name: "shop",
    icon: 's-shop',
    label: '店铺详情',
    component: () => import('../views/Shop').then(err => err),
    meta: { role: ['admin'] }
  }
]
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
  routes: constanceRoutes
})
router.beforeEach((to, from, next) => {
  const token = Cookies.get('token')
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