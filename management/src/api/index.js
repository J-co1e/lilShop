import request from '@/request'
export function handleLogin(data) {
  // 登录接口
  return request({
    url: '/user/login',
    method: 'post',
    data,
  })
}
