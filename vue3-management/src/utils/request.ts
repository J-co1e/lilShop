import useUserStore from '@/store/modules/user'
import { Modal, notification } from 'ant-design-vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
export const request = axios.create({
  baseURL: 'http://127.0.0.1:88/api',
  timeout: 60000
})
const router = useRouter()
request.interceptors.response.use(
  (response) => {
    const { code, msg } = response.data
    if (code === '200' || response.status === 200) {
      return response
    } else if (code === '401') {
      Modal.confirm({
        title: 'Do you Want to delete these items?',
        content: '用户状态已失效，请重新登录',
        onOk() {
          router.push('/login')
        },
        onCancel() {
          router.push('/login')
        },
        class: 'test'
      })
    } else {
      notification.error({
        message: '发生错误',
        description: msg
      })
    }
    return response.data
  },
  (error) => {
    notification.error({
      message: '错误',
      description: error.message
    })
    return Promise.reject(error)
  }
)
request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const token = userStore.token
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
