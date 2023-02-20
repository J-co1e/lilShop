import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:8082/',
  timeout: 3000
})

export default request