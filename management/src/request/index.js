import axios from "axios";

const request = axios.create({
  baseURL: 'http://127.0.0.1:88/api',
  timeout: 600000
})
axios.interceptors.request.use(config => {
  config.headers['token'] = sessionStorage.getItem('token')
  return config
})

export default request