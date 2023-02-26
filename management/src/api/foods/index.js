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