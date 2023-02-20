import Vue from 'vue'
import VueRouter from 'vue-router'

import myDetail from '@/views/Detail/myDetail'
import myGoods from '@/views/Goods/myGoods'
import myOrder from '@/views/Order/myOrder'
import foodsDetail from '@/views/foodsDetail/foodsDetail'
import mySearch from '@/views/Search/mySearch'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'goods',
      component: myGoods
    },
    {
      path: '/myOrder',
      name: 'order',
      component: myOrder
    },
    {
      path: '/myDetail',
      name: 'detail',
      component: myDetail
    },
    {
      path: '/foodsDetail',
      name: 'foodsDetail',
      component: foodsDetail
    },
    {
      path: '/search',
      name: 'search',
      component: mySearch
    }
  ]
})
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
export default router