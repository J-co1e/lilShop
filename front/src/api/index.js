import request from './request'

export function getFoods(data) { // 获取所有菜品信息
  return request({
    url: '/foodsFind',
    method: 'post',
    data: data
  })
}

export function getOrders(data) { // 获取订单信息
  return request({
    url: '/orderFind',
    method: 'post',
    data: data
  })
}

export function pushGoods(data) { // 将菜品加入订单库
  return request({
    url: '/orderInsert',
    method: 'post',
    data: data
  })
}

export function pay(data) { // 结算
  return request({
    url: '/orderInsert',
    method: 'post',
    data: data
  })
}
