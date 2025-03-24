import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import {
  AndroidOutlined,
  CrownOutlined,
  EditOutlined,
  HomeOutlined,
  IdcardOutlined,
  PieChartOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons-vue'
import { h } from 'vue'
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    redirect: '/home',
    meta: {
      key: 'Main',
      icon: null,
      label: '',
      title: ''
    },
    component: () => import('@/layout/RouteMain.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          key: 'Home',
          icon: h(HomeOutlined),
          title: 'QATRRezw' /* 主页 */
        }
      },
      {
        path: '/test',
        name: 'Test',
        meta: {
          key: 'Test',
          icon: h(AndroidOutlined),
          title: 'XJIRCfkW' /* 测试 */
        },
        children: [
          {
            path: '/child',
            name: 'Child',
            component: () => import('@/views/child/index.vue'),
            meta: {
              key: 'Child',
              icon: h(UsergroupAddOutlined),
              title: 'uDaSYUAa' /* 子节点 */
            }
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      key: 'Login',
      icon: null,
      title: 'kLfVdtty' /* 登录 */
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue')
  }
]
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/manage',
    name: 'Manage',
    component: () => import('@/views/manage/index.vue'),
    meta: {
      key: 'Manage',
      icon: h(CrownOutlined),
      title: 'FJPveQht' /* 管理 */,
      roles: ['admin']
    }
  },
  {
    path: '/charts',
    name: 'Charts',
    component: () => import('@/views/charts/index.vue'),
    meta: {
      key: 'Charts',
      icon: h(PieChartOutlined),
      title: 'slZGsGCD' /* 图表 */,
      roles: ['admin']
    }
  },
  {
    path: '/info',
    name: 'Info',
    component: () => import('@/views/info/index.vue'),
    meta: {
      key: 'Info',
      icon: h(IdcardOutlined),
      title: 'WsfjHxfh' /* 个人信息 */,
      roles: ['user']
    }
  },
  {
    path: '/edit',
    name: 'Edit',
    component: () => import('@/views/edit/index.vue'),
    meta: {
      key: 'Edit',
      icon: h(EditOutlined),
      title: 'AofOytXE' /* 编辑 */,
      roles: ['admin', 'super']
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

export default router
