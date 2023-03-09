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
    url: '/api/order/orderFind',
    method: 'post',
    data: data
  })
}
export function pushGoods (data) { // 将菜品加入订单库
  return request({
    url: '/orderInsert',
    method: 'post',
    data: data
  })
}
export function pay (data) { // 结算
  return request({
    url: '/orderInsert',
    method: 'post',
    data: data
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
