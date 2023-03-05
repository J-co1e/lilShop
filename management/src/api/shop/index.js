import request from "@/request";
export function getStoreInfo (data) {
  return request({
    url: '/shop/getShopInfo',
    method: 'get',
    params: data
  })
}
export function updateStoreInfo (data) {
  return request({
    url: '/shop/updateShopInfo',
    method: 'post',
    data
  })
}
export function uploadShopPic (data) {
  return request({
    url: '/shop/uploadShopPic',
    method: 'post',
    data
  })
}