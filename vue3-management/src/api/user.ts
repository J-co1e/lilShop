import { request } from '@/utils/request'
import { UserLoginParams } from './model/userModel'

export function userLogin(data: UserLoginParams) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
export function searchUsers(data: any) {
  return request({
    url: '/user/searchUsers',
    method: 'post',
    data
  })
}
