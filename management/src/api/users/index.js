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
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function searchUsers (data) {
  return request({
    url: '/user/searchUsers',
    method: 'post',
    data
  })
}
export function uploadAvatar(data) {
  return request({
    url: '/user/uploadAvatar',
    method: 'post',
    data
  })
}
export function deleteUser(data) {
  return request({
    url: '/user/deleteUser',
    method: 'post',
    data
  })
}