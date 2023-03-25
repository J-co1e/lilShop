import axios from 'axios'
import config from '@/config'
const request = axios.create({
  baseURL: config.baseUrl,
  timeout: 3000
})
request.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token')
    config.headers['Authorization'] = 'Bearer ' + token
    return config
  },
  (error) => Promise.reject(error)
)
export default request