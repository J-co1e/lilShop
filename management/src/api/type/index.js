import request from "@/request";

export function getTypes (data) {
  return request({
    url: '/type/getAllTypes',
    method: 'get',
    params: data
  })
}
export function addType (data) {
  return request({
    url: '/type/addType',
    method: 'post',
    data
  })
}
export function updateType (data) {
  return request({
    url: '/type/updateType',
    method: 'post',
    data
  })
}
export function deleteType (data) {
  return request({
    url: '/type/deleteType',
    method: 'post',
    data
  })
}