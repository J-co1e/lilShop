import axios from "axios";
import router from "@/router";
import { MessageBox } from 'element-ui'
import config from "@/config";
const request = axios.create({
  baseURL: config.baseUrl,
  timeout: 600000
})
request.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  (error) => Promise.reject(error)
)
request.interceptors.response.use(
  (response) => {
    const { code } = response.data
    if (code === '200' || response.status === 200) {
      return response
    } else if (code === '401') {
      MessageBox.alert('用户状态已失效，请重新登录', '提示', {
        confirmButtonText: '确定',
        callback: () => {
          MessageBox.close()
          router.push('/login')
          MessageBox.close()
        }
      })
    }
  },
  (error) => {
    console.log(error)
  }
)
export default request