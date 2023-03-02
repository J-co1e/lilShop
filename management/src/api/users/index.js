import request from "@/request";

export function getUsers (data) {
  return request({
    url: '/user/getUsers',
    method: 'get',
    params: data
  })
}
export function updateUsers (data) {
  return request({
    url: '/user/updateUser',
    method: 'post',
    data
  })
}
export function addUsers (data) {
  return request({
    url: '/user/addUsers',
    method: 'post',
    data
  })
}
export function searchUsers (data) {
  return request({
    url: '/user/searchUsers',
    method: 'post',
    data
  })
}