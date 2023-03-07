import request from "@/request";

export function getOrders (data) {
  return request({
    url: '/orders/getOrders',
    method: 'get',
    params: data
  })
}
export function searchOrders (data) {
  return request({
    url: '/orders/searchOrders',
    method: 'post',
    data
  })
}
export function doneOrder (data) {
  return request({
    url: '/orders/doneOrder',
    method: 'post',
    data
  })
}

export function settleOrder (data) {
  return request({
    url: '/orders/settleOrder',
    method: 'post',
    data
  })
}