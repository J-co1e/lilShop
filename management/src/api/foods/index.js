import request from "@/request";

export function getFoods (data) {
  return request({
    url: '/goods/getGoods',
    method: 'get',
    params: data
  })
}
export function updateFoods (data) {
  return request({
    url: '/goods/updateGoods',
    method: 'post',
    data
  })
}
export function searchFoods(data) {
  return request({
    url: '/goods/searchGoods',
    method: 'post',
    data
  })
}
export function addFoods(data) {
  return request({
    url: '/goods/addGoods',
    method: 'post',
    data
  })
}
export function deleteFoods(data) {
  return request({
    url: '/goods/deleteGoods',
    method: 'post',
    data
  })
}
export function uploadFoodPic(data) {
  return request({
    url: '/goods/uploadFoodPic',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}