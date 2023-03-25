import request from './request'

export function getFoods (data) { // 获取所有菜品信息
  return request({
    url: '/api/goods/getGoods',
    method: 'get',
    params: data
  })
}
export function getOrders (data) { // 获取订单信息
  return request({
    url: '/api/orders/searchOrders',
    method: 'post',
    data: data
  })
}
export function addOrders (data) { // 下单
  return request({
    url: '/api/orders/addOrders',
    method: 'post',
    data
  })
}
export function getShopInfo (data) { // 获取商家信息
  return request({
    url: '/api/shop/getShopInfo',
    method: 'get',
    params: data
  })
}
export function getTypes (data) {
  return request({
    url: '/api/type/getAllTypes',
    method: 'get',
    params: data
  })
}
export function settleOrder (data) {
  return request({
    url: '/api/orders/settleOrder',
    method: 'post',
    data
  })
}
export function queryPaidStatus (data) {
  return request({
    url: '/api/orders/getPaidResult',
    method: 'post',
    data
  })
}
export function paidOrder (data) {
  return request({
    url: '/api/orders/paidOrder',
    method: 'post',
    data
  })
}